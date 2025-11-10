// app/api/orders/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/utils/prisma'
import { OrderStatus, OrderSource, PaymentMethod } from '@prisma/client'

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const { id } = params

    if (!id) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      )
    }

    const order = await prisma.order.findUnique({
      where: { id },
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
                description: true,
                price: true,
                images: true
              }
            }
          }
        }
      }
    })

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error('Error fetching order:', error)
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    )
  }
}

interface UpdateOrderData {
  status?: OrderStatus
  notes?: string
  paymentMethod?: PaymentMethod
  source?: OrderSource
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const { id } = params

    if (!id) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      )
    }

    const body: UpdateOrderData = await request.json()

    const updateData: Partial<UpdateOrderData> = {}
    
    if (body.status && Object.values(OrderStatus).includes(body.status)) {
      updateData.status = body.status
    }
    
    if (body.paymentMethod && Object.values(PaymentMethod).includes(body.paymentMethod)) {
      updateData.paymentMethod = body.paymentMethod
    }
    
    if (body.source && Object.values(OrderSource).includes(body.source)) {
      updateData.source = body.source
    }
    
    if (body.notes !== undefined) {
      updateData.notes = body.notes
    }

    const order = await prisma.order.update({
      where: { id },
      data: updateData,
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

    return NextResponse.json(order)
  } catch (error) {
    console.error('Error updating order:', error)
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const { id } = params

    if (!id) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      )
    }

    // Delete order items first (due to foreign key constraint)
    await prisma.orderItem.deleteMany({
      where: { orderId: id }
    })

    // Then delete the order
    await prisma.order.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Order deleted successfully' })
  } catch (error) {
    console.error('Error deleting order:', error)
    return NextResponse.json(
      { error: 'Failed to delete order' },
      { status: 500 }
    )
  }
}