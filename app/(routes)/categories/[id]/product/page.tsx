// app/categories/[id]/page.tsx
import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  description: string | null
  price: number
  images: string[]
  stock: number
  isActive: boolean
  sku: string | null
}

interface Category {
  id: string
  name: string
  description: string | null
  slug: string
  image: string | null
  isActive: boolean
  products: Product[]
}

interface CategoryPageProps {
  params: Promise<{
    id: string
  }>
}

const CategoryPage = async (props: CategoryPageProps) => {
  const params = await props.params
  const { id } = params

  let category: Category | null = null
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/categories/${id}/products`, {
      cache: 'no-store'
    })
    
    if (response.ok) {
      category = await response.json()
    }
  } catch (error) {
    console.error('Error fetching category:', error)
  }

  if (!category) {
    notFound()
  }

  const activeProducts = category.products.filter(product => product.isActive)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8">
          <Link href="/categories" className="text-blue-600 hover:text-blue-500 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Categories
          </Link>
        </nav>

        {/* Category Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-start space-x-6">
            {category.image && (
              <div className="w-24 h-24 relative rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}</h1>
              {category.description && (
                <p className="text-gray-600 mb-4">{category.description}</p>
              )}
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="bg-gray-100 px-2 py-1 rounded">/{category.slug}</span>
                <span>{activeProducts.length} products</span>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Products</h2>
          
          {activeProducts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1M9 7h6" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products available</h3>
              <p className="text-gray-500">There are no products in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {activeProducts.map((product) => (
                <Link 
                  key={product.id} 
                  href={`/products/${product.id}`}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
                >
                  {/* Product Image */}
                  <div className="aspect-w-16 aspect-h-10 bg-gray-100 h-48 relative">
                    {product.images && product.images.length > 0 ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    
                    {/* Stock Badge */}
                    <div className="absolute top-3 right-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.stock > 0 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                  </div>

                  {/* Product Content */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    
                    {product.description && (
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {product.description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-gray-900">
                        ${Number(product.price).toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500">
                        {product.stock} in stock
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CategoryPage