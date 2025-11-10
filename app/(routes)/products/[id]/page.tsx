// app/products/[id]/page.tsx
'use client';

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { addToCart, getProductQuantity, updateCartQuantity, removeFromCart, type CartItem } from '@/utils/cart'

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
    id: string
    name: string
    slug: string
  }
}

interface SimilarProduct {
  id: string
  name: string
  price: number
  images: string[]
  stock: number
  isActive: boolean
  category: {
    name: string
  }
}

interface CustomerProductPageProps {
  params: Promise<{
    id: string
  }>
}

const CustomerProductPage = (props: CustomerProductPageProps) => {
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [similarProducts, setSimilarProducts] = useState<SimilarProduct[]>([])
  const [currentCartQuantity, setCurrentCartQuantity] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Await the params in Next.js 15
        const params = await props.params
        const { id } = params

        const response = await fetch(`/api/products/${id}`)
        if (response.ok) {
          const productData = await response.json()
          setProduct(productData)
          
          // Fetch similar products
          const similarResponse = await fetch(`/api/products/category/${productData.category.id}?limit=4`)
          if (similarResponse.ok) {
            const similarData = await similarResponse.json()
            setSimilarProducts(similarData.products.filter((p: SimilarProduct) => p.id !== id))
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [props.params])

  // Update cart quantity when component mounts or cart changes
  useEffect(() => {
    const updateCartInfo = () => {
      if (product) {
        setCurrentCartQuantity(getProductQuantity(product.id))
      }
    }

    updateCartInfo()

    // Listen for cart updates
    window.addEventListener('cartUpdated', updateCartInfo)
    return () => window.removeEventListener('cartUpdated', updateCartInfo)
  }, [product])

  const handleAddToCart = async () => {
    if (!product) return

    setIsAddingToCart(true)
    try {
      await addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        images: product.images,
        stock: product.stock
      })
      
      // Update cart quantity display
      setCurrentCartQuantity(getProductQuantity(product.id))
      
      // Trigger cart update event for header
      window.dispatchEvent(new Event('cartUpdated'))
      
      // Show success feedback
      // You could add a toast notification here
    } catch (error) {
      console.error('Error adding to cart:', error)
      alert(error instanceof Error ? error.message : 'Failed to add to cart')
    } finally {
      setIsAddingToCart(false)
    }
  }

  const handleUpdateQuantity = (newQuantity: number) => {
    if (!product) return

    if (newQuantity < 1) {
      removeFromCart(product.id)
      setCurrentCartQuantity(0)
    } else {
      updateCartQuantity(product.id, newQuantity)
      setCurrentCartQuantity(newQuantity)
    }
    
    window.dispatchEvent(new Event('cartUpdated'))
  }

  const handleBuyNow = async () => {
    if (!product) return

    setIsAddingToCart(true)
    try {
      await addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        images: product.images,
        stock: product.stock
      })
      
      window.dispatchEvent(new Event('cartUpdated'))
      // Redirect to cart page or open cart dropdown
      // For now, just show success
      alert('Added to cart! Check your cart in the header.')
    } catch (error) {
      console.error('Error adding to cart:', error)
      alert(error instanceof Error ? error.message : 'Failed to add to cart')
    } finally {
      setIsAddingToCart(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-emerald-50/30 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="aspect-square bg-gray-200 rounded-3xl"></div>
              <div className="space-y-6">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-12 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-emerald-50/30 py-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/products" className="text-emerald-600 hover:text-emerald-700">
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-emerald-50/30 py-8 relative overflow-hidden">
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
        <nav className="flex mb-8 items-center gap-2 text-sm text-neutral-600">
          <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/products" className="hover:text-emerald-600 transition-colors">Products</Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-neutral-900 font-medium truncate max-w-[200px] md:max-w-none">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-gradient-to-br from-white via-neutral-50 to-emerald-50/20 rounded-3xl shadow-lg border border-neutral-200/60 overflow-hidden backdrop-blur-sm">
              <div className="aspect-square bg-gradient-to-br from-emerald-50 via-neutral-50 to-emerald-100/50 relative">
                {product.images && product.images.length > 0 ? (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="text-sm text-neutral-500 font-light tracking-wide">No image available</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Images */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.slice(1).map((image, index) => (
                  <div 
                    key={index} 
                    className="aspect-square bg-gradient-to-br from-white to-neutral-50 rounded-2xl overflow-hidden border border-neutral-200/60 shadow-sm hover:shadow-md transition-all duration-300 hover:border-emerald-400/60"
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 2}`}
                      width={120}
                      height={120}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-white via-neutral-50 to-emerald-50/20 rounded-3xl shadow-lg border border-neutral-200/60 p-6 lg:p-8 backdrop-blur-sm">
              {/* Category & Status */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Link 
                  href={`/categories/${product.category.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100/80 text-emerald-900 text-sm font-medium rounded-xl border border-emerald-200/60 hover:bg-emerald-200/60 transition-all duration-300"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  {product.category.name}
                </Link>
                
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold backdrop-blur-sm border ${
                  product.stock > 0 
                    ? 'bg-green-500/20 text-green-800 border-green-400/30' 
                    : 'bg-red-500/20 text-red-800 border-red-400/30'
                }`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {/* Product Name */}
              <h1 className="text-3xl lg:text-4xl font-light text-neutral-900 mb-4 tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* Stock Info */}
              <div className="flex items-center gap-4 mb-6 text-sm text-neutral-600">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  {product.stock} units available
                </span>
                {product.sku && (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    SKU: {product.sku}
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl lg:text-5xl font-bold text-neutral-900">
                  Rs:- {Number(product.price).toFixed(2)}
                </span>
              </div>

              {/* Description */}
              {product.description && (
                <div className="mb-8">
                  <h3 className="text-xl font-light text-neutral-900 mb-4 tracking-tight">Product Description</h3>
                  <p className="text-neutral-600 leading-relaxed font-light text-lg">{product.description}</p>
                </div>
              )}

              {/* Cart Quantity Controls */}
              {currentCartQuantity > 0 && (
                <div className="mb-6 p-4 bg-emerald-50/50 border border-emerald-200/50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-emerald-800 font-medium">In your cart: {currentCartQuantity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateQuantity(currentCartQuantity - 1)}
                        className="w-8 h-8 flex items-center justify-center border border-emerald-300 bg-white text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">{currentCartQuantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(currentCartQuantity + 1)}
                        disabled={currentCartQuantity >= product.stock}
                        className="w-8 h-8 flex items-center justify-center border border-emerald-300 bg-white text-emerald-600 rounded-lg hover:bg-emerald-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleUpdateQuantity(0)}
                        className="ml-2 px-3 py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {currentCartQuantity === 0 ? (
                  <>
                    <button 
                      onClick={handleAddToCart}
                      disabled={product.stock === 0 || isAddingToCart}
                      className="flex-1 inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-4 px-8 rounded-2xl font-semibold hover:from-emerald-700 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:hover:transform-none"
                    >
                      {isAddingToCart ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Adding...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                        </>
                      )}
                    </button>
                    <button 
                      onClick={handleBuyNow}
                      disabled={product.stock === 0 || isAddingToCart}
                      className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-emerald-600 text-emerald-600 bg-white hover:bg-emerald-50 hover:border-emerald-700 rounded-2xl font-semibold transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Buy Now
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={handleBuyNow}
                    className="flex-1 inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-green-500 text-white py-4 px-8 rounded-2xl font-semibold hover:from-green-700 hover:to-green-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Proceed to Checkout
                  </button>
                )}
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-br from-white via-neutral-50 to-emerald-50/20 rounded-3xl shadow-lg border border-neutral-200/60 p-6 lg:p-8 backdrop-blur-sm">
              <h3 className="text-xl font-light text-neutral-900 mb-4 tracking-tight">Product Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-3 text-neutral-600">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Active Product</span>
                </div>
                <div className="flex items-center gap-3 text-neutral-600">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Updated recently</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-light text-neutral-900 tracking-tight mb-2">
                  Similar <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent font-normal">Products</span>
                </h2>
                <p className="text-neutral-600 font-light text-lg">
                  Discover more amazing products from this collection
                </p>
              </div>
              <Link 
                href={`/categories/${product.category.id}`}
                className="hidden sm:inline-flex items-center gap-2 px-6 py-3 border border-neutral-300/80 text-neutral-700 bg-white hover:bg-neutral-50 rounded-xl font-medium transition-all duration-300"
              >
                View All
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map((similarProduct) => (
                <Link 
                  key={similarProduct.id} 
                  href={`/products/${similarProduct.id}`}
                  className="group block transform hover:-translate-y-2 transition-all duration-500"
                >
                  <div className="bg-gradient-to-br from-white via-neutral-50 to-emerald-50/20 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 border border-neutral-200/80 group-hover:border-emerald-400/60 overflow-hidden h-full flex flex-col backdrop-blur-sm">
                    {/* Product Image */}
                    <div className="aspect-w-16 aspect-h-10 bg-gradient-to-br from-emerald-50 via-neutral-50 to-emerald-100/50 h-48 relative overflow-hidden">
                      {similarProduct.images && similarProduct.images.length > 0 ? (
                        <Image
                          src={similarProduct.images[0]}
                          alt={similarProduct.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
                      )}
                      
                      {/* Stock Badge */}
                      <div className="absolute top-3 right-3 z-10">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold backdrop-blur-sm border ${
                          similarProduct.stock > 0 
                            ? 'bg-emerald-600/90 text-white border-emerald-400/30' 
                            : 'bg-red-600/90 text-white border-red-400/30'
                        }`}>
                          {similarProduct.stock > 0 ? `${similarProduct.stock} left` : 'Sold out'}
                        </span>
                      </div>
                    </div>

                    {/* Product Content */}
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex-1 mb-3">
                        <h3 className="text-lg font-light text-neutral-900 group-hover:text-emerald-700 transition-colors duration-300 line-clamp-2 mb-2 tracking-tight">
                          {similarProduct.name}
                        </h3>
                        <p className="text-sm text-neutral-500 font-light">{similarProduct.category.name}</p>
                      </div>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                        <span className="text-xl font-semibold text-neutral-900">
                          RS {Number(similarProduct.price).toFixed(2)}
                        </span>
                        <div className="flex items-center gap-1 text-emerald-600 font-medium group-hover:text-emerald-700 transition-colors duration-300">
                          <span className="text-sm">View</span>
                          <svg className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Mobile View All Button */}
            <div className="mt-8 text-center sm:hidden">
              <Link 
                href={`/categories/${product.category.id}`}
                className="inline-flex items-center gap-2 px-6 py-3 border border-neutral-300/80 text-neutral-700 bg-white hover:bg-neutral-50 rounded-xl font-medium transition-all duration-300"
              >
                View All Similar Products
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CustomerProductPage