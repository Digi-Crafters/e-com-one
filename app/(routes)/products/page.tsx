// app/products/page.tsx
'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { addToCart, getProductQuantity, updateCartQuantity, removeFromCart } from '@/utils/cart'

interface Product {
  id: string
  name: string
  description: string | null
  price: number
  images: string[]
  stock: number
  isActive: boolean
  category: {
    name: string
    slug: string
  }
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [cartQuantities, setCartQuantities] = useState<Record<string, number>>({})

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products')
        if (response.ok) {
          const data = await response.json()
          // Handle different possible response structures
          const productsArray = Array.isArray(data) ? data : 
                               data.products ? data.products : 
                               data.items ? data.items : []
          setProducts(productsArray)
        } else {
          console.error('Failed to fetch products')
          setProducts([])
        }
      } catch (error) {
        console.error('Error fetching products:', error)
        setProducts([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Update cart quantities when component mounts or cart changes
  useEffect(() => {
    const updateCartQuantities = () => {
      const quantities: Record<string, number> = {}
      if (Array.isArray(products)) {
        products.forEach(product => {
          quantities[product.id] = getProductQuantity(product.id)
        })
      }
      setCartQuantities(quantities)
    }

    if (Array.isArray(products) && products.length > 0) {
      updateCartQuantities()
    }

    // Listen for cart updates
    window.addEventListener('cartUpdated', updateCartQuantities)
    return () => window.removeEventListener('cartUpdated', updateCartQuantities)
  }, [products])

  const handleAddToCart = async (product: Product) => {
    try {
      await addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        images: product.images,
        stock: product.stock
      })
      
      // Update cart quantity display
      setCartQuantities(prev => ({
        ...prev,
        [product.id]: getProductQuantity(product.id)
      }))
      
      // Trigger cart update event for header
      window.dispatchEvent(new Event('cartUpdated'))
      
    } catch (error) {
      console.error('Error adding to cart:', error)
      alert(error instanceof Error ? error.message : 'Failed to add to cart')
    }
  }

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId)
      setCartQuantities(prev => ({ ...prev, [productId]: 0 }))
    } else {
      updateCartQuantity(productId, newQuantity)
      setCartQuantities(prev => ({ ...prev, [productId]: newQuantity }))
    }
    
    window.dispatchEvent(new Event('cartUpdated'))
  }

  // Safe array check for products
  const safeProducts = Array.isArray(products) ? products : []
  const inStockCount = safeProducts.filter(p => p.stock > 0).length

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-emerald-50/30 py-12 relative overflow-hidden mt-2">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-neutral-400 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header Skeleton */}
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100/50 rounded-full mb-4 animate-pulse">
              <div className="h-2 w-2 bg-emerald-300 rounded-full"></div>
              <div className="h-4 w-40 bg-emerald-200 rounded"></div>
            </div>
            <div className="h-14 bg-gradient-to-r from-neutral-200 to-neutral-100 rounded-xl w-96 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gradient-to-r from-neutral-200 to-neutral-100 rounded-lg w-2/3 mx-auto animate-pulse"></div>
          </div>

          {/* Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-md border border-neutral-200/80 overflow-hidden animate-pulse">
                <div className="h-56 bg-gradient-to-br from-neutral-100 via-neutral-50 to-neutral-100"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gradient-to-r from-neutral-200 to-neutral-100 rounded w-3/4"></div>
                  <div className="h-4 bg-gradient-to-r from-neutral-200 to-neutral-100 rounded w-full"></div>
                  <div className="h-4 bg-gradient-to-r from-neutral-200 to-neutral-100 rounded w-2/3"></div>
                  <div className="h-8 bg-gradient-to-r from-neutral-200 to-neutral-100 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-emerald-50/30 py-12 relative overflow-hidden mt-10">
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
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100/80 rounded-full mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-medium text-emerald-900 tracking-wide">All Products</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-light text-neutral-900 tracking-tight mb-4">
            Our <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent font-normal">Collection</span>
          </h1>
          
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto font-light leading-relaxed">
            Discover our complete range of amazing products. 
            <span className="block mt-2 text-emerald-600">Everything you need in one place.</span>
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-6 flex-wrap mt-12">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm border border-neutral-200/60 rounded-xl shadow-sm">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-lg">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-neutral-500 font-light">Total Products</p>
                <p className="text-2xl font-semibold text-neutral-900">{safeProducts.length}</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm border border-neutral-200/60 rounded-xl shadow-sm">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-green-100 to-green-50 rounded-lg">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-neutral-500 font-light">In Stock</p>
                <p className="text-2xl font-semibold text-neutral-900">
                  {inStockCount}
                </p>
              </div>
            </div>
          </div>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 pt-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-neutral-300"></div>
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-neutral-300"></div>
          </div>
        </div>

        {/* Products Grid */}
        {safeProducts.length === 0 ? (
          <div className="bg-gradient-to-br from-white via-neutral-50 to-emerald-50/20 rounded-3xl shadow-lg border border-neutral-200/60 p-16 text-center backdrop-blur-sm">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-neutral-100 to-neutral-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1M9 7h6" />
                </svg>
              </div>
              <h3 className="text-3xl font-light text-neutral-900 mb-3 tracking-tight">No Products Available</h3>
              <p className="text-neutral-600 text-lg mb-8 font-light leading-relaxed">
                We&apos;re currently updating our inventory. Please check back soon for amazing products!
              </p>
              <Link
                href="/categories"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-base font-medium rounded-xl text-white hover:from-emerald-700 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Browse Categories
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {safeProducts.map((product) => {
              const cartQuantity = cartQuantities[product.id] || 0
              
              return (
                <div key={product.id} className="group transform hover:-translate-y-2 transition-all duration-500">
                  <Link 
                    href={`/products/${product.id}`}
                    className="block"
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
                            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
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
                        <div className="flex-1 mb-4">
                          <h3 className="text-xl font-light text-neutral-900 group-hover:text-emerald-700 transition-colors duration-300 mb-3 line-clamp-2 tracking-tight">
                            {product.name}
                          </h3>
                          
                          <p className="text-sm text-neutral-500 font-light mb-2">{product.category.name}</p>
                          
                          {product.description && (
                            <p className="text-neutral-600 text-sm mb-4 line-clamp-3 leading-relaxed font-light">
                              {product.description}
                            </p>
                          )}
                        </div>
                        
                        <div className="mt-auto pt-4 border-t border-neutral-100">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-2xl font-semibold text-neutral-900">
                              ${Number(product.price).toFixed(2)}
                            </span>
                            <span className="text-sm text-neutral-500">
                              {product.stock} available
                            </span>
                          </div>

                          {/* View Details Link */}
                          <div className="flex items-center gap-1.5 text-emerald-600 font-medium group-hover:text-emerald-700 transition-colors duration-300">
                            <span className="text-sm tracking-wide">View Details</span>
                            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                  
                  {/* Cart Button */}
                  <div className="mt-3 px-1">
                    {cartQuantity === 0 ? (
                      <button 
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock === 0}
                        className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-2 px-4 rounded-xl text-sm font-medium hover:from-emerald-700 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Add to Cart
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 bg-white border border-emerald-200 rounded-xl p-1 shadow-sm">
                        <button
                          onClick={() => handleUpdateQuantity(product.id, cartQuantity - 1)}
                          className="w-7 h-7 flex items-center justify-center bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-all duration-200"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        
                        <span className="text-sm font-bold text-neutral-900 min-w-[20px] text-center">
                          {cartQuantity}
                        </span>
                        
                        <button
                          onClick={() => handleUpdateQuantity(product.id, cartQuantity + 1)}
                          disabled={cartQuantity >= product.stock}
                          className="w-7 h-7 flex items-center justify-center bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 disabled:opacity-50 transition-all duration-200"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductsPage