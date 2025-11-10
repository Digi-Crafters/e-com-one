// app/api/categories/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/utils/prisma'

interface Params {
  params: Promise<{
    id: string
  }>
}

// GET /api/categories/[id] - Get single category
export async function GET(request: NextRequest, context: Params) {
  try {
    const params = await context.params
    const { id } = params

    if (!id) {
      return NextResponse.json(
        { error: 'Category ID is required' },
        { status: 400 }
      )
    }

    const category = await prisma.category.findUnique({
      where: {
        id: id
      }
    })

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(category)
  } catch (error) {
    console.error('Error fetching category:', error)
    return NextResponse.json(
      { error: 'Failed to fetch category' },
      { status: 500 }
    )
  }
}

// PUT /api/categories/[id] - Update category
export async function PUT(request: NextRequest, context: Params) {
  try {
    const params = await context.params
    const { id } = params

    if (!id) {
      return NextResponse.json(
        { error: 'Category ID is required' },
        {status: 400 }
      )
    }

    const body = await request.json()
    
    const category = await prisma.category.update({
      where: {
        id: id
      },
      data: {
        name: body.name,
        description: body.description,
        slug: body.slug,
        image: body.image,
        isActive: body.isActive
      }
    })
    
    return NextResponse.json(category)
  } catch (error) {
    console.error('Error updating category:', error)
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    )
  }
}

// DELETE /api/categories/[id] - Delete category
export async function DELETE(request: NextRequest, context: Params) {
  try {
    const params = await context.params
    const { id } = params

    if (!id) {
      return NextResponse.json(
        { error: 'Category ID is required' },
        { status: 400 }
      )
    }

    await prisma.category.delete({
      where: {
        id: id
      }
    })
    
    return NextResponse.json({ message: 'Category deleted successfully' })
  } catch (error) {
    console.error('Error deleting category:', error)
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    )
  }
}