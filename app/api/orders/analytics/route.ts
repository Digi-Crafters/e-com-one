// app/api/orders/analytics/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/utils/prisma'
import { OrderStatus, OrderSource, PaymentMethod } from '@prisma/client'

interface OrdersByStatusResult {
  status: OrderStatus
  _count: {
    id: number
  }
}

interface OrdersBySourceResult {
  source: OrderSource
  _count: {
    id: number
  }
}

interface OrdersByPaymentMethodResult {
  paymentMethod: PaymentMethod
  _count: {
    id: number
  }
}

interface AnalyticsData {
  period: string
  totalOrders: number
  totalRevenue: number
  pendingOrders: number
  completedOrders: number
  ordersByStatus: Record<OrderStatus, number>
  ordersBySource: Record<OrderSource, number>
  ordersByPaymentMethod: Record<PaymentMethod, number>
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || 'month' // day, week, month, year

    // Date range calculation based on period
    const now = new Date()
    const startDate = new Date()

    switch (period) {
      case 'day':
        startDate.setDate(now.getDate() - 1)
        break
      case 'week':
        startDate.setDate(now.getDate() - 7)
        break
      case 'month':
        startDate.setMonth(now.getMonth() - 1)
        break
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1)
        break
      default:
        startDate.setMonth(now.getMonth() - 1)
    }

    const [
      totalOrders,
      totalRevenue,
      pendingOrders,
      completedOrders,
      ordersByStatus,
      ordersBySource,
      ordersByPaymentMethod
    ] = await Promise.all([
      // Total orders count
      prisma.order.count({
        where: {
          createdAt: {
            gte: startDate
          }
        }
      }),

      // Total revenue
      prisma.order.aggregate({
        where: {
          createdAt: {
            gte: startDate
          },
          status: OrderStatus.DELIVERED
        },
        _sum: {
          totalAmount: true
        }
      }),

      // Pending orders count
      prisma.order.count({
        where: {
          status: OrderStatus.PENDING,
          createdAt: {
            gte: startDate
          }
        }
      }),

      // Completed orders count
      prisma.order.count({
        where: {
          status: OrderStatus.DELIVERED,
          createdAt: {
            gte: startDate
          }
        }
      }),

      // Orders by status
      prisma.order.groupBy({
        by: ['status'],
        _count: {
          id: true
        },
        where: {
          createdAt: {
            gte: startDate
          }
        }
      }) as Promise<OrdersByStatusResult[]>,

      // Orders by source
      prisma.order.groupBy({
        by: ['source'],
        _count: {
          id: true
        },
        where: {
          createdAt: {
            gte: startDate
          }
        }
      }) as Promise<OrdersBySourceResult[]>,

      // Orders by payment method
      prisma.order.groupBy({
        by: ['paymentMethod'],
        _count: {
          id: true
        },
        where: {
          createdAt: {
            gte: startDate
          }
        }
      }) as Promise<OrdersByPaymentMethodResult[]>
    ])

    // Initialize with all possible enum values set to 0
    const ordersByStatusMap: Record<OrderStatus, number> = Object.values(OrderStatus).reduce((acc, status) => {
      acc[status] = 0
      return acc
    }, {} as Record<OrderStatus, number>)

    const ordersBySourceMap: Record<OrderSource, number> = Object.values(OrderSource).reduce((acc, source) => {
      acc[source] = 0
      return acc
    }, {} as Record<OrderSource, number>)

    const ordersByPaymentMethodMap: Record<PaymentMethod, number> = Object.values(PaymentMethod).reduce((acc, method) => {
      acc[method] = 0
      return acc
    }, {} as Record<PaymentMethod, number>)

    // Fill with actual data
    ordersByStatus.forEach(item => {
      ordersByStatusMap[item.status] = item._count.id
    })

    ordersBySource.forEach(item => {
      ordersBySourceMap[item.source] = item._count.id
    })

    ordersByPaymentMethod.forEach(item => {
      ordersByPaymentMethodMap[item.paymentMethod] = item._count.id
    })

    const analytics: AnalyticsData = {
      period,
      totalOrders,
      totalRevenue: totalRevenue._sum.totalAmount || 0,
      pendingOrders,
      completedOrders,
      ordersByStatus: ordersByStatusMap,
      ordersBySource: ordersBySourceMap,
      ordersByPaymentMethod: ordersByPaymentMethodMap
    }

    return NextResponse.json(analytics)
  } catch (error) {
    console.error('Error fetching order analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch order analytics' },
      { status: 500 }
    )
  }
}