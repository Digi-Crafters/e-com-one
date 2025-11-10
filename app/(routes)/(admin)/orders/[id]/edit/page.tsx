// app/orders/[id]/edit/page.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { OrderStatus, OrderSource, PaymentMethod } from '@prisma/client'

interface Order {
  id: string
  orderNumber: string
  status: OrderStatus
  source: OrderSource
  paymentMethod: PaymentMethod
  notes: string | null
  totalAmount: number
  customer: {
    id: string
    name: string
    email: string
    phone: string | null
  }
  address: {
    id: string
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  orderItems: Array<{
    id: string
    quantity: number
    price: number
    product: {
      id: string
      name: string
      price: number
    }
  }>
}

interface EditOrderPageProps {
  params: Promise<{
    id: string
  }>
}

const EditOrderPage = (props: EditOrderPageProps) => {
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)

  const [formData, setFormData] = useState<{
    status: OrderStatus
    source: OrderSource
    paymentMethod: PaymentMethod
    notes: string
  }>({
    status: OrderStatus.PENDING,
    source: OrderSource.WEBSITE,
    paymentMethod: PaymentMethod.CASH,
    notes: ''
  })

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const params = await props.params
        const { id } = params

        const response = await fetch(`/api/orders/${id}`)
        if (response.ok) {
          const orderData = await response.json()
          setOrder(orderData)
          setFormData({
            status: orderData.status,
            source: orderData.source,
            paymentMethod: orderData.paymentMethod,
            notes: orderData.notes || ''
          })
        } else {
          throw new Error('Failed to fetch order')
        }
      } catch (error) {
        console.error('Error fetching order:', error)
        alert('Failed to load order data')
      }
    }

    fetchOrder()
  }, [props.params])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!order) return
    
    setIsLoading(true)

    try {
      const response = await fetch(`/api/orders/${order.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/orders')
        router.refresh()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to update order')
      }
    } catch (error) {
      console.error('Error updating order:', error)
      alert('Failed to update order')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!order) return
    
    if (!confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
      return
    }

    setIsDeleteLoading(true)
    
    try {
      const response = await fetch(`/api/orders/${order.id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        router.push('/orders')
        router.refresh()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to delete order')
      }
    } catch (error) {
      console.error('Error deleting order:', error)
      alert('Failed to delete order')
    } finally {
      setIsDeleteLoading(false)
    }
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING: return 'bg-yellow-100 text-yellow-800'
      case OrderStatus.CONFIRMED: return 'bg-blue-100 text-blue-800'
      case OrderStatus.PROCESSING: return 'bg-purple-100 text-purple-800'
      case OrderStatus.SHIPPED: return 'bg-indigo-100 text-indigo-800'
      case OrderStatus.DELIVERED: return 'bg-green-100 text-green-800'
      case OrderStatus.CANCELLED: return 'bg-red-100 text-red-800'
      case OrderStatus.REFUNDED: return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link
              href={`/orders/${order.id}`}
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Order
            </Link>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900">Edit Order</h1>
          <p className="mt-2 text-sm text-gray-600">
            Update order details for {order.orderNumber}
          </p>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium text-gray-500">Customer</div>
              <div className="text-sm text-gray-900">{order.customer.name}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">Email</div>
              <div className="text-sm text-gray-900">{order.customer.email}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">Total Amount</div>
              <div className="text-sm font-bold text-gray-900">${Number(order.totalAmount).toFixed(2)}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">Items</div>
              <div className="text-sm text-gray-900">{order.orderItems.length} products</div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Order Status
              </label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as OrderStatus }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {Object.values(OrderStatus).map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            {/* Source */}
            <div>
              <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-1">
                Order Source
              </label>
              <select
                id="source"
                value={formData.source}
                onChange={(e) => setFormData(prev => ({ ...prev, source: e.target.value as OrderSource }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {Object.values(OrderSource).map(source => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </select>
            </div>

            {/* Payment Method */}
            <div>
              <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1">
                Payment Method
              </label>
              <select
                id="paymentMethod"
                value={formData.paymentMethod}
                onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value as PaymentMethod }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {Object.values(PaymentMethod).map(method => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                id="notes"
                rows={4}
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add any notes about this order..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-blue-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Updating...' : 'Update Order'}
              </button>
              
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleteLoading}
                className="flex-1 bg-red-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleteLoading ? 'Deleting...' : 'Delete Order'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditOrderPage