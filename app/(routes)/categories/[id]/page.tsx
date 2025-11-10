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
  category: {
    name: string
  }
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

  if (!category || !category.isActive) {
    notFound()
  }

  const activeProducts = category.products?.filter(product => product.isActive) || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-emerald-50/30 py-12 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-neutral-400 rounded-full blur-3xl"></div>
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
        backgroundSize: '48px 48px'
      }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-neutral-600">
          <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/categories" className="hover:text-emerald-600 transition-colors">Collections</Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-neutral-900 font-medium">{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="bg-gradient-to-br from-white via-neutral-50 to-emerald-50/20 rounded-3xl shadow-lg border border-neutral-200/60 overflow-hidden mb-12 backdrop-blur-sm">
          <div className="md:flex">
            {/* Category Image */}
            <div className="md:flex-shrink-0 md:w-96">
              {category.image ? (
                <div className="h-80 md:h-full relative">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
                </div>
              ) : (
                <div className="h-80 md:h-full bg-gradient-to-br from-emerald-50 via-neutral-50 to-emerald-100/50 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-sm text-neutral-500 font-light tracking-wide">No image</span>
                  </div>
                </div>
              )}
            </div>

            {/* Category Info */}
            <div className="p-8 md:p-12 flex-1">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100/80 rounded-full mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-sm font-medium text-emerald-900 tracking-wide">Collection</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-light text-neutral-900 tracking-tight mb-6">
                  {category.name} <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent font-normal">Collection</span>
                </h1>
                
                {category.description && (
                  <p className="text-lg text-neutral-600 leading-relaxed mb-8 font-light max-w-2xl">
                    {category.description}
                  </p>
                )}

                <div className="flex items-center space-x-6 text-sm text-neutral-600">
                  <span className="inline-flex items-center bg-neutral-100/80 px-4 py-2 rounded-xl font-mono text-sm border border-neutral-200/60">
                    /{category.slug}
                  </span>
                  <span className="inline-flex items-center">
                    <svg className="w-4 h-4 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Active Collection
                  </span>
                  <span className="inline-flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1M9 7h6" />
                    </svg>
                    {activeProducts?.length} {activeProducts?.length === 1 ? 'Product' : 'Products'}
                  </span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-neutral-200/60">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-emerald-600 mb-1">{activeProducts?.length}</div>
                  <div className="text-sm text-neutral-500 font-light">Total Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-green-600 mb-1">
                    {activeProducts?.filter(p => p.stock > 0).length}
                  </div>
                  <div className="text-sm text-neutral-500 font-light">In Stock</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-amber-600 mb-1">
                    ${activeProducts.reduce((total, product) => total + Number(product.price), 0).toFixed(2)}
                  </div>
                  <div className="text-sm text-neutral-500 font-light">Total Value</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">
                    {new Set(activeProducts.map(p => p.category?.name)).size}
                  </div>
                  <div className="text-sm text-neutral-500 font-light">Categories</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-light text-neutral-900 tracking-tight mb-3">
                Products in <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent font-normal">{category.name}</span>
              </h2>
              <p className="text-lg text-neutral-600 font-light max-w-2xl">
                Discover all our amazing products in this carefully curated collection
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm border border-neutral-200/60 rounded-xl px-6 py-3 shadow-sm">
              <span className="text-neutral-900 font-medium">
                {activeProducts.length} {activeProducts.length === 1 ? 'Product' : 'Products'} Available
              </span>
            </div>
          </div>

          {activeProducts.length === 0 ? (
            <div className="bg-gradient-to-br from-white via-neutral-50 to-emerald-50/20 rounded-3xl shadow-lg border border-neutral-200/60 p-16 text-center backdrop-blur-sm">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gradient-to-br from-neutral-100 to-neutral-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1M9 7h6" />
                  </svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-light text-neutral-900 mb-4 tracking-tight">No Products Available</h3>
                <p className="text-neutral-600 text-lg mb-8 font-light leading-relaxed">
                  We&apos;re currently updating this collection. Please check back soon for amazing products!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/categories"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-base font-medium rounded-xl text-white hover:from-emerald-700 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    Browse Collections
                  </Link>
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-3 px-8 py-4 border-2 border-neutral-300/80 text-base font-medium rounded-xl text-neutral-700 bg-white hover:bg-neutral-50 hover:border-emerald-400/60 transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    All Products
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {activeProducts.map((product) => (
                <Link 
                  key={product.id} 
                  href={`/products/${product.id}`}
                  className="group block transform hover:-translate-y-2 transition-all duration-500"
                >
                  <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 border border-neutral-200/80 group-hover:border-emerald-400/60 overflow-hidden h-full flex flex-col">
                    {/* Product Image */}
                    <div className="aspect-w-16 aspect-h-10 bg-gradient-to-br from-emerald-50 via-neutral-50 to-emerald-100/50 h-56 relative overflow-hidden">
                      {product.images && product.images.length > 0 ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                              <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <span className="text-sm text-neutral-400 font-light tracking-wide">No image</span>
                          </div>
                        </div>
                      )}
                      
                      {/* Stock Badge */}
                      <div className="absolute top-4 right-4 z-10">
                        <span className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold backdrop-blur-md shadow-lg transition-all duration-300 ${
                          product.stock > 0 
                            ? 'bg-emerald-600/90 text-white border border-emerald-400/30' 
                            : 'bg-red-600/90 text-white border border-red-400/30'
                        }`}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                        </span>
                      </div>

                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Shine effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                      </div>
                    </div>

                    {/* Product Content */}
                    <div className="p-6 flex-1 flex flex-col bg-gradient-to-b from-white to-neutral-50/30">
                      <div className="flex-1">
                        <h3 className="text-xl font-light text-neutral-900 group-hover:text-emerald-700 transition-colors duration-300 mb-3 line-clamp-2 tracking-tight">
                          {product.name}
                        </h3>
                        
                        {product.description && (
                          <p className="text-neutral-600 text-sm mb-4 line-clamp-3 leading-relaxed font-light">
                            {product.description}
                          </p>
                        )}
                      </div>
                      
                      <div className="mt-auto pt-4 border-t border-neutral-100">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-semibold text-neutral-900">
                            ${Number(product.price).toFixed(2)}
                          </span>
                          <div className="flex items-center gap-1.5 text-emerald-600 font-medium group-hover:text-emerald-700 transition-colors duration-300">
                            <span className="text-sm tracking-wide">View Details</span>
                            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Bottom Navigation */}
          {activeProducts.length > 0 && (
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-br from-white via-emerald-50/20 to-neutral-50 rounded-3xl shadow-xl border border-neutral-200/60 p-12 max-w-4xl mx-auto relative overflow-hidden backdrop-blur-sm">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-neutral-500/5 rounded-full blur-3xl"></div>
                
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100/80 rounded-full mb-6">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-emerald-900 tracking-wide">Explore More</span>
                  </div>

                  <h3 className="text-3xl font-light text-neutral-900 mb-4 tracking-tight">
                    Discover More <span className="font-normal text-emerald-600">Collections</span>
                  </h3>
                  <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
                    Found what you&apos;re looking for? Explore our other amazing collections and products.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/categories"
                      className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-base font-medium rounded-xl text-white hover:from-emerald-700 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                      All Collections
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <Link
                      href="/products"
                      className="group inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-neutral-300/80 text-base font-medium rounded-xl text-neutral-700 bg-white hover:bg-neutral-50 hover:border-emerald-400/60 transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-5 h-5 text-neutral-600 group-hover:text-emerald-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      All Products
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CategoryPage