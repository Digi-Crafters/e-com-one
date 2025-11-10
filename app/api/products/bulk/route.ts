// app/api/products/bulk/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/utils/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { products } = body

    if (!products || !Array.isArray(products)) {
      return NextResponse.json(
        { error: 'Products array is required' },
        { status: 400 }
      )
    }

    // Validate all products
    for (const product of products) {
      if (!product.name || !product.price || !product.categoryId) {
        return NextResponse.json(
          { error: 'Each product must have name, price, and categoryId' },
          { status: 400 }
        )
      }
    }

    const createdProducts = await prisma.product.createMany({
      data: products.map(product => ({
        name: product.name,
        description: product.description,
        price: parseFloat(product.price),
        images: product.images || [],
        sku: product.sku,
        stock: parseInt(product.stock) || 0,
        isActive: product.isActive !== undefined ? product.isActive : true,
        categoryId: product.categoryId
      }))
    })

    return NextResponse.json({
      message: `${createdProducts.count} products created successfully`,
      count: createdProducts.count
    })
  } catch (error) {
    console.error('Error creating bulk products:', error)
    return NextResponse.json(
      { error: 'Failed to create bulk products' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { updates } = body

    if (!updates || !Array.isArray(updates)) {
      return NextResponse.json(
        { error: 'Updates array is required' },
        { status: 400 }
      )
    }

    const updatePromises = updates.map(update =>
      prisma.product.update({
        where: { id: update.id },
        data: {
          ...(update.name && { name: update.name }),
          ...(update.description && { description: update.description }),
          ...(update.price && { price: parseFloat(update.price) }),
          ...(update.images && { images: update.images }),
          ...(update.sku && { sku: update.sku }),
          ...(update.stock && { stock: parseInt(update.stock) }),
          ...(update.isActive !== undefined && { isActive: update.isActive }),
          ...(update.categoryId && { categoryId: update.categoryId })
        }
      })
    )

    const updatedProducts = await Promise.all(updatePromises)

    return NextResponse.json({
      message: `${updatedProducts.length} products updated successfully`,
      products: updatedProducts
    })
  } catch (error) {
    console.error('Error updating bulk products:', error)
    return NextResponse.json(
      { error: 'Failed to update bulk products' },
      { status: 500 }
    )
  }
}