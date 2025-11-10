'use client';

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface Product {
  id: string
  name: string
  price: number
  images: string[]
  stock: number
  isActive: boolean
}

interface Category {
  id: string
  name: string
  description: string | null
  slug: string
  image: string | null
  isActive: boolean
  products: Product[]
  _count?: {
    products: number
  }
}

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/categories?include=products`, {
          cache: 'no-store'
        })
        
        if (response.ok) {
          const data = await response.json()
          setCategories(data)
        } else {
          throw new Error('Failed to fetch categories')
        }
      } catch (err) {
        console.error('Error fetching categories:', err)
        setError('Failed to load categories')
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  // Only show active categories for users
  const activeCategories = categories.filter(category => category.isActive)
  const totalProducts = activeCategories.reduce((acc, cat) => acc + cat.products.filter(p => p.isActive).length, 0)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-emerald-50/30 py-12 relative overflow-hidden">
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

          {/* Stats Skeleton */}
          <div className="mb-10 flex items-center justify-center gap-6 flex-wrap">
            {[1, 2].map((i) => (
              <div key={i} className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm border border-neutral-200/60 rounded-xl shadow-sm animate-pulse">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-lg"></div>
                <div className="space-y-2">
                  <div className="h-3 w-24 bg-neutral-200 rounded"></div>
                  <div className="h-6 w-12 bg-neutral-300 rounded"></div>
                </div>
              </div>
            ))}
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-emerald-50/30 py-12 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-br from-red-50/50 via-white to-red-50/30 backdrop-blur-sm border border-red-200/60 rounded-2xl p-16 text-center shadow-lg"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-2xl font-light text-neutral-900 mb-3 tracking-tight">Unable to Load Categories</h3>
            <p className="text-neutral-600 mb-8 font-light leading-relaxed">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-8 py-3.5 bg-gradient-to-r from-neutral-900 to-neutral-800 text-sm font-medium tracking-wide text-white hover:from-neutral-800 hover:to-neutral-700 transition-all duration-300 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Try Again
            </button>
          </motion.div>
        </div>
      </div>
    )
  }

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
        <motion.nav 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center gap-2 text-sm text-neutral-600"
        >
          <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-neutral-900 font-medium">Collections</span>
        </motion.nav>

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100/80 rounded-full mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-medium text-emerald-900 tracking-wide">Explore Our Collections</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-light text-neutral-900 tracking-tight mb-4">
            Shop by <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent font-normal">Category</span>
          </h1>
          
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto font-light leading-relaxed">
            Discover amazing products across all our carefully curated collections. 
            <span className="block mt-2 text-emerald-600">Find exactly what you&apos;re looking for.</span>
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 pt-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-neutral-300"></div>
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-neutral-300"></div>
          </div>
        </motion.div>

        {/* Categories Grid */}
        {activeCategories.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-br from-white via-neutral-50 to-emerald-50/20 rounded-2xl shadow-lg border border-neutral-200/60 p-16 text-center backdrop-blur-sm"
          >
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-neutral-100 to-neutral-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1M9 7h6" />
                </svg>
              </div>
              <h3 className="text-3xl font-light text-neutral-900 mb-3 tracking-tight">No Categories Available</h3>
              <p className="text-neutral-600 text-lg mb-8 font-light leading-relaxed">
                We&apos;re currently updating our collections. Please check back soon for amazing products!
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-base font-medium rounded-xl text-white hover:from-emerald-700 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Browse All Products
              </Link>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Categories Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-10 flex items-center justify-center gap-6 flex-wrap"
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm border border-neutral-200/60 rounded-xl shadow-sm">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-lg">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-neutral-500 font-light">Total Collections</p>
                  <p className="text-2xl font-semibold text-neutral-900">{activeCategories.length}</p>
                </div>
              </div>

              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm border border-neutral-200/60 rounded-xl shadow-sm">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-neutral-100 to-neutral-50 rounded-lg">
                  <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-neutral-500 font-light">Products Available</p>
                  <p className="text-2xl font-semibold text-neutral-900">{totalProducts}</p>
                </div>
              </div>
            </motion.div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
              {activeCategories.map((category, index) => {
                const activeProducts = category.products?.filter(product => product.isActive) || []
                const productCount = activeProducts.length
                const hasProducts = productCount > 0

                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link 
                      href={`/categories/${category.id}`}
                      className="group block transform hover:-translate-y-2 transition-all duration-500"
                    >
                      <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 border border-neutral-200/80 group-hover:border-emerald-400/60 overflow-hidden h-full flex flex-col relative">
                        {/* Category Image */}
                        <div className="aspect-w-16 aspect-h-10 bg-gradient-to-br from-emerald-50 via-neutral-50 to-emerald-100/50 h-56 relative overflow-hidden">
                          {category.image ? (
                            <Image
                              src={category.image}
                              alt={category.name}
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
                          
                          {/* Overlay Gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          
                          {/* Shine effect */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                          </div>
                          
                          {/* Product Count Badge */}
                          <div className="absolute top-4 right-4 z-10">
                            <span className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold backdrop-blur-md shadow-lg transition-all duration-300 ${
                              hasProducts 
                                ? 'bg-emerald-600/90 text-white border border-emerald-400/30' 
                                : 'bg-neutral-600/90 text-white border border-neutral-400/30'
                            }`}>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1M9 7h6" />
                              </svg>
                              {productCount}
                            </span>
                          </div>
                        </div>

                        {/* Category Content */}
                        <div className="p-6 flex-1 flex flex-col bg-gradient-to-b from-white to-neutral-50/30">
                          <div className="flex-1">
                            <h3 className="text-xl font-light text-neutral-900 group-hover:text-emerald-700 transition-colors duration-300 mb-3 line-clamp-2 tracking-tight">
                              {category.name}
                            </h3>
                            
                            {category.description && (
                              <p className="text-neutral-600 text-sm mb-4 line-clamp-3 leading-relaxed font-light">
                                {category.description}
                              </p>
                            )}
                          </div>
                          
                          <div className="mt-auto pt-4 border-t border-neutral-100">
                            <div className="flex items-center justify-between">
                              <span className="bg-neutral-100/80 px-3 py-1.5 rounded-lg text-xs font-mono text-neutral-600 border border-neutral-200/50 tracking-wider">
                                /{category.slug}
                              </span>
                              <div className="flex items-center gap-1.5 text-emerald-600 font-medium group-hover:text-emerald-700 transition-colors duration-300">
                                <span className="text-sm tracking-wide">Explore</span>
                                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            {/* Bottom CTA */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-20"
            >
              <div className="bg-gradient-to-br from-white via-emerald-50/20 to-neutral-50 rounded-3xl shadow-xl border border-neutral-200/60 p-12 max-w-4xl mx-auto relative overflow-hidden backdrop-blur-sm">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-neutral-500/5 rounded-full blur-3xl"></div>
                
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100/80 rounded-full mb-6">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-emerald-900 tracking-wide">Need Help?</span>
                  </div>

                  <h2 className="text-4xl font-light text-neutral-900 mb-4 tracking-tight">
                    Can&apos;t Find What You&apos;re <span className="font-normal text-emerald-600">Looking For?</span>
                  </h2>
                  <p className="text-lg text-neutral-600 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                    Browse through all our products or reach out to us for special requests and personalized assistance.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/products"
                      className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-base font-medium rounded-xl text-white hover:from-emerald-700 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <span>Browse All Products</span>
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    
                    <Link
                      href="/contact"
                      className="group inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-neutral-300/80 text-base font-medium rounded-xl text-neutral-700 bg-white hover:bg-neutral-50 hover:border-emerald-400/60 transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-5 h-5 text-neutral-600 group-hover:text-emerald-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>Contact Us</span>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}

export default CategoriesPage