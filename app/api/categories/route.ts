// app/api/categories/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/utils/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const category = await prisma.category.create({
      data: {
        name: body.name,
        description: body.description,
        slug: body.slug,
        image: body.image,
        isActive: body.isActive
      }
    })
    
    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    )
  }
}

// app/api/categories/route.ts

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const includeProducts = searchParams.get('include') === 'products'

    const categories = await prisma.category.findMany({
      where: {
        isActive: true
      },
      include: {
        products: includeProducts ? {
          where: {
            isActive: true
          }
        } : false
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}