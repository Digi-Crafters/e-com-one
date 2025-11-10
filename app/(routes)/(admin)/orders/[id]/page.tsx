// app/orders/[id]/page.tsx
import React from 'react'
import { prisma } from '@/utils/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { OrderStatus, OrderSource, PaymentMethod } from '@prisma/client'

interface OrderPageProps {
  params: Promise<{
    id: string
  }>
}

const OrderPage = async (props: OrderPageProps) => {
  const params = await props.params
  const { id } = params

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      customer: true,
      address: true,
      orderItems: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              images: true,
              sku: true
            }
          }
        }
      }
    }
  })

  if (!order) {
    notFound()
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

  const getSourceColor = (source: OrderSource) => {
    switch (source) {
      case OrderSource.WEBSITE: return 'bg-blue-50 text-blue-700'
      case OrderSource.WHATSAPP: return 'bg-green-50 text-green-700'
      case OrderSource.INSTAGRAM: return 'bg-pink-50 text-pink-700'
      default: return 'bg-gray-50 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <Link href="/orders" className="text-gray-400 hover:text-gray-500">
                <svg className="flex-shrink-0 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <span className="sr-only">Orders</span>
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <Link href="/orders" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                  All Orders
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="ml-4 text-sm font-medium text-gray-500">{order.orderNumber}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Order Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Order {order.orderNumber}</h1>
                <div className="flex items-center space-x-4 mt-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getSourceColor(order.source)}`}>
                    {order.source}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                  </span>
                </div>
              </div>
              <Link
                href={`/orders/${order.id}/edit`}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Edit Order
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            {/* Customer Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h2>
              <div className="space-y-2">
                <div>
                  <div className="text-sm font-medium text-gray-500">Name</div>
                  <div className="text-sm text-gray-900">{order.customer.name}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Email</div>
                  <div className="text-sm text-gray-900">{order.customer.email}</div>
                </div>
                {order.customer.phone && (
                  <div>
                    <div className="text-sm font-medium text-gray-500">Phone</div>
                    <div className="text-sm text-gray-900">{order.customer.phone}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h2>
              <div className="space-y-2">
                <div className="text-sm text-gray-900">{order.address.street}</div>
                <div className="text-sm text-gray-900">
                  {order.address.city}, {order.address.state} {order.address.zipCode}
                </div>
                <div className="text-sm text-gray-900">{order.address.country}</div>
              </div>
            </div>

            {/* Order Details */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h2>
              <div className="space-y-2">
                <div>
                  <div className="text-sm font-medium text-gray-500">Payment Method</div>
                  <div className="text-sm text-gray-900">{order.paymentMethod}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Total Amount</div>
                  <div className="text-lg font-bold text-gray-900">${Number(order.totalAmount).toFixed(2)}</div>
                </div>
                {order.notes && (
                  <div>
                    <div className="text-sm font-medium text-gray-500">Notes</div>
                    <div className="text-sm text-gray-900">{order.notes}</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="border-t border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h2>
            <div className="space-y-3">
              {order.orderItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{item.product.name}</div>
                    {item.product.sku && (
                      <div className="text-sm text-gray-500">SKU: {item.product.sku}</div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-900">
                      {item.quantity} × ${Number(item.price).toFixed(2)}
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      ${(item.quantity * Number(item.price)).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                <div className="text-lg font-bold text-gray-900">Total</div>
                <div className="text-lg font-bold text-gray-900">${Number(order.totalAmount).toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderPage