// app/my-products/[id]/page.tsx
import React from 'react'
import { prisma } from '@/utils/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

interface AdminProductPageProps {
  params: Promise<{
    id: string
  }>
}

const AdminProductPage = async (props: AdminProductPageProps) => {
  const params = await props.params
  const { id } = params

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: {
        select: {
          id: true,
          name: true,
          slug: true
        }
      }
    }
  })

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <Link href="/my-products" className="text-gray-400 hover:text-gray-500">
                <svg className="flex-shrink-0 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <span className="sr-only">My Products</span>
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <Link href="/my-products" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                  All Products
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="ml-4 text-sm font-medium text-gray-500">{product.name}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="md:flex">
            {/* Product Images */}
            <div className="md:flex-1">
              <div className="h-96 md:h-full bg-gray-100 relative">
                {product.images && product.images.length > 0 ? (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                    <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="md:flex-1 p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                  <div className="flex items-center space-x-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      product.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {product.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <span className="text-sm text-gray-500">SKU: {product.sku || 'N/A'}</span>
                  </div>
                </div>
                <Link
                  href={`/my-products/${product.id}/edit`}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Edit Product
                </Link>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  ${Number(product.price).toFixed(2)}
                </span>
              </div>

              {product.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600">{product.description}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Category</h4>
                  <p className="text-sm text-gray-900">{product.category.name}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Stock</h4>
                  <p className={`text-sm font-medium ${
                    product.stock > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {product.stock} units
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Status</h4>
                  <p className="text-sm text-gray-900">
                    {product.isActive ? 'Available' : 'Unavailable'}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Created</h4>
                  <p className="text-sm text-gray-900">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Additional Images */}
              {product.images && product.images.length > 1 && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Additional Images</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {product.images.slice(1).map((image, index) => (
                      <div key={index} className="aspect-square bg-gray-100 rounded-md overflow-hidden">
                        <Image
                          src={image}
                          alt={`${product.name} ${index + 2}`}
                          width={100}
                          height={100}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminProductPage