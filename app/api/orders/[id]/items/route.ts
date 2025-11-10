// app/api/orders/[id]/items/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/utils/prisma'

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

    const orderItems = await prisma.orderItem.findMany({
      where: { orderId: id },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            images: true,
            sku: true
          }
        }
      }
    })

    return NextResponse.json(orderItems)
  } catch (error) {
    console.error('Error fetching order items:', error)
    return NextResponse.json(
      { error: 'Failed to fetch order items' },
      { status: 500 }
    )
  }
}

interface AddOrderItemData {
  productId: string
  quantity: number
}

export async function POST(
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

    const body: AddOrderItemData = await request.json()

    if (!body.productId || !body.quantity) {
      return NextResponse.json(
        { error: 'Product ID and quantity are required' },
        { status: 400 }
      )
    }

    // Get product price
    const product = await prisma.product.findUnique({
      where: { id: body.productId },
      select: { price: true }
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    const orderItem = await prisma.orderItem.create({
      data: {
        quantity: body.quantity,
        price: product.price,
        order: { connect: { id } },
        product: { connect: { id: body.productId } }
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true
          }
        }
      }
    })

    // Update order total amount
    await updateOrderTotal(id)

    return NextResponse.json(orderItem, { status: 201 })
  } catch (error) {
    console.error('Error adding order item:', error)
    return NextResponse.json(
      { error: 'Failed to add order item' },
      { status: 500 }
    )
  }
}

interface UpdateOrderItemsData {
  items: Array<{
    id: string
    quantity: number
  }>
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

    const body: UpdateOrderItemsData = await request.json()

    // Update multiple order items
    const updatePromises = body.items.map((item) =>
      prisma.orderItem.updateMany({
        where: {
          id: item.id,
          orderId: id
        },
        data: {
          quantity: item.quantity
        }
      })
    )

    await Promise.all(updatePromises)

    // Update order total amount
    await updateOrderTotal(id)

    const updatedItems = await prisma.orderItem.findMany({
      where: { orderId: id },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true
          }
        }
      }
    })

    return NextResponse.json(updatedItems)
  } catch (error) {
    console.error('Error updating order items:', error)
    return NextResponse.json(
      { error: 'Failed to update order items' },
      { status: 500 }
    )
  }
}

// Helper function to update order total
async function updateOrderTotal(orderId: string) {
  const orderItems = await prisma.orderItem.findMany({
    where: { orderId },
    select: {
      quantity: true,
      price: true
    }
  })

  const totalAmount = orderItems.reduce((total, item) => {
    return total + (Number(item.price) * item.quantity)
  }, 0)

  await prisma.order.update({
    where: { id: orderId },
    data: { totalAmount }
  })
}