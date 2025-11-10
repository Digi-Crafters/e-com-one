// app/api/categories/[id]/products/route.ts
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
        { error: 'Category ID is required' },
        { status: 400 }
      )
    }

    const categoryWithProducts = await prisma.category.findUnique({
      where: {
        id: id,
        isActive: true
      },
      include: {
        products: {
          where: {
            isActive: true
          },
          include: {
            category: {
              select: {
                id: true,
                name: true,
                slug: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })

    if (!categoryWithProducts) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(categoryWithProducts)
  } catch (error) {
    console.error('Error fetching category with products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch category' },
      { status: 500 }
    )
  }
}