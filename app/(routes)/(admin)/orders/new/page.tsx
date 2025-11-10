// app/orders/new/page.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { OrderStatus, OrderSource, PaymentMethod } from '@prisma/client'

interface Product {
  id: string
  name: string
  price: number
  stock: number
  category: {
    name: string
  }
}

interface Category {
  id: string
  name: string
  products: Product[]
}

const CreateOrderPage = () => {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedProducts, setSelectedProducts] = useState<Array<{
    productId: string
    quantity: number
    price: number
    name: string
  }>>([])
  const [isLoading, setIsLoading] = useState(false)

  type FormData = {
    customer: {
      name: string
      email: string
      phone: string
    }
    address: {
      street: string
      city: string
      state: string
      zipCode: string
      country: string
    }
    status: OrderStatus
    source: OrderSource
    paymentMethod: PaymentMethod
    notes: string
  }

  const [formData, setFormData] = useState<FormData>({
    customer: {
      name: '',
      email: '',
      phone: ''
    },
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'US'
    },
    status: OrderStatus.PENDING,
    source: OrderSource.WEBSITE,
    paymentMethod: PaymentMethod.CASH,
    notes: ''
  })

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories?include=products')
        if (response.ok) {
          const data = await response.json()
          setCategories(data)
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    
    fetchCategories()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedProducts.length === 0) {
      alert('Please add at least one product to the order')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          orderItems: selectedProducts.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          }))
        }),
      })

      if (response.ok) {
        router.push('/orders')
        router.refresh()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to create order')
      }
    } catch (error) {
      console.error('Error creating order:', error)
      alert('Failed to create order')
    } finally {
      setIsLoading(false)
    }
  }

  const addProduct = (product: Product) => {
    if (selectedProducts.find(p => p.productId === product.id)) {
      return
    }
    
    setSelectedProducts(prev => [...prev, {
      productId: product.id,
      quantity: 1,
      price: product.price,
      name: product.name
    }])
  }

  const removeProduct = (productId: string) => {
    setSelectedProducts(prev => prev.filter(p => p.productId !== productId))
  }

  const updateProductQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return
    setSelectedProducts(prev => prev.map(p => 
      p.productId === productId ? { ...p, quantity } : p
    ))
  }

  const totalAmount = selectedProducts.reduce((total, item) => 
    total + (item.price * item.quantity), 0
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link
              href="/orders"
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Orders
            </Link>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900">Create New Order</h1>
          <p className="mt-2 text-sm text-gray-600">
            Create a new customer order
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customer & Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.customer.name}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      customer: { ...prev.customer, name: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.customer.email}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      customer: { ...prev.customer, email: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={formData.customer.phone}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      customer: { ...prev.customer, phone: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Street Address *</label>
                  <input
                    type="text"
                    required
                    value={formData.address.street}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      address: { ...prev.address, street: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.address.city}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      address: { ...prev.address, city: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                  <input
                    type="text"
                    required
                    value={formData.address.state}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      address: { ...prev.address, state: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.address.zipCode}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      address: { ...prev.address, zipCode: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <input
                    type="text"
                    value={formData.address.country}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      address: { ...prev.address, country: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Product Selection */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Add Products</h2>
              <div className="space-y-4">
                {categories.map(category => (
                  <div key={category.id}>
                    <h3 className="text-md font-medium text-gray-900 mb-2">{category.name}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {category.products?.filter(p => p.stock > 0).map(product => (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => addProduct(product)}
                          disabled={!!selectedProducts.find(p => p.productId === product.id)}
                          className="flex justify-between items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="text-sm font-medium text-gray-900">{product.name}</span>
                          <span className="text-sm text-gray-500">${product.price} • {product.stock} in stock</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Order Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as OrderStatus }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {Object.values(OrderStatus).map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                  <select
                    value={formData.source}
                    onChange={(e) => setFormData(prev => ({ ...prev, source: e.target.value as OrderSource }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {Object.values(OrderSource).map(source => (
                      <option key={source} value={source}>{source}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                  <select
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value as PaymentMethod }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {Object.values(PaymentMethod).map(method => (
                      <option key={method} value={method}>{method}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Selected Products */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Selected Products</h2>
              {selectedProducts.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">No products selected</p>
              ) : (
                <div className="space-y-3">
                  {selectedProducts.map(item => (
                    <div key={item.productId} className="flex justify-between items-center p-3 border border-gray-200 rounded-md">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">${item.price} each</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => updateProductQuantity(item.productId, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50"
                        >
                          -
                        </button>
                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateProductQuantity(item.productId, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50"
                        >
                          +
                        </button>
                        <button
                          type="button"
                          onClick={() => removeProduct(item.productId)}
                          className="text-red-600 hover:text-red-800 ml-2"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-semibold text-gray-900">
                      <span>Total:</span>
                      <span>${totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading || selectedProducts.length === 0 || !formData.customer.name || !formData.customer.email}
              className="w-full bg-blue-600 text-white py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating Order...' : 'Create Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateOrderPage