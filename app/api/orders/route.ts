// app/api/orders/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/utils/prisma'
import { OrderStatus, OrderSource, PaymentMethod, Prisma } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status') as OrderStatus | null
    const source = searchParams.get('source') as OrderSource | null
    const skip = (page - 1) * limit

    const where: Prisma.OrderWhereInput = {}
    
    if (status && Object.values(OrderStatus).includes(status)) {
      where.status = status
    }
    
    if (source && Object.values(OrderSource).includes(source)) {
      where.source = source
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          customer: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true
            }
          },
          address: true,
          orderItems: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  price: true
                }
              }
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limit
      }),
      prisma.order.count({ where })
    ])

    return NextResponse.json({
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}

interface OrderItemData {
  productId: string
  quantity: number
  price: number
}

interface AddressData {
  street: string
  city: string
  state: string
  zipCode: string
  country?: string
}

interface CustomerData {
    id: string
  name: string
  email: string
  phone?: string
}

interface CreateOrderData {
  customer: CustomerData
  address: AddressData
  orderItems: OrderItemData[]
  paymentMethod: PaymentMethod
  status?: OrderStatus
  source?: OrderSource
  notes?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateOrderData = await request.json()

    // Validate required fields
    if (!body.customer || !body.address || !body.orderItems || !body.paymentMethod) {
      return NextResponse.json(
        { error: 'Customer, address, order items, and payment method are required' },
        { status: 400 }
      )
    }

    // Validate payment method
    if (!Object.values(PaymentMethod).includes(body.paymentMethod)) {
      return NextResponse.json(
        { error: 'Invalid payment method' },
        { status: 400 }
      )
    }

    // Calculate total amount
    const totalAmount = body.orderItems.reduce((total: number, item: OrderItemData) => {
      return total + (Number(item.price) * Number(item.quantity))
    }, 0)

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // ensure we have a customer record (email is not a unique where key in the schema)
    let customerRecord = await prisma.customer.findFirst({
      where: { email: body.customer.email }
    })

    if (!customerRecord) {
      customerRecord = await prisma.customer.create({
        data: {
          name: body.customer.name,
          email: body.customer.email,
          phone: body.customer.phone
        }
      })
    }

    const order = await prisma.order.create({
      data: {
        orderNumber,
        totalAmount,
        status: body.status || OrderStatus.PENDING,
        source: body.source || OrderSource.WEBSITE,
        paymentMethod: body.paymentMethod,
        notes: body.notes,
        customer: {
          connect: { id: customerRecord.id }
        },
        address: {
          create: {
            street: body.address.street,
            city: body.address.city,
            state: body.address.state,
            zipCode: body.address.zipCode,
            country: body.address.country || 'US',
            customer: {
              connect: { id: customerRecord.id }
            }
          }
        },
        orderItems: {
          create: body.orderItems.map((item: OrderItemData) => ({
            quantity: item.quantity,
            price: item.price,
            product: { connect: { id: item.productId } }
          }))
        }
      },
      include: {
        customer: true,
        address: true,
        orderItems: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true
              }
            }
          }
        }
      }
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}