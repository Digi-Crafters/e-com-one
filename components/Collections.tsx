"use client"
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

const Collections = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/categories?include=products`, {
          next: { revalidate: 60 }
        })
        
        if (response.ok) {
          const data = await response.json()
          setCategories(data)
        } else {
          throw new Error('Failed to fetch categories')
        }
      } catch (err) {
        console.error('Error fetching categories:', err)
        setError('Failed to load collections')
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return (
      <div className="relative bg-gradient-to-br from-white via-emerald-50/20 to-white backdrop-blur-sm border border-neutral-200/60 rounded-2xl p-8 shadow-sm overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" style={{
          backgroundSize: '200% 100%',
          animation: 'shimmer 2s infinite'
        }}></div>
        
        <div className="relative animate-pulse">
          {/* Header Skeleton */}
          <div className="flex justify-between items-center mb-10">
            <div className="space-y-3">
              <div className="h-10 bg-gradient-to-r from-neutral-200 to-neutral-100 rounded-lg w-56"></div>
              <div className="h-5 bg-gradient-to-r from-neutral-200 to-neutral-100 rounded-lg w-72"></div>
            </div>
            <div className="h-12 bg-gradient-to-r from-neutral-200 to-neutral-100 rounded-lg w-36 hidden md:block"></div>
          </div>
          
          {/* Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="space-y-4 bg-white rounded-xl p-1 border border-neutral-100">
                <div className="h-64 bg-gradient-to-br from-neutral-100 via-neutral-50 to-neutral-100 rounded-lg"></div>
                <div className="px-4 pb-4 space-y-3">
                  <div className="h-6 bg-gradient-to-r from-neutral-200 to-neutral-100 rounded"></div>
                  <div className="h-4 bg-gradient-to-r from-neutral-200 to-neutral-100 rounded w-3/4"></div>
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
      <div className="bg-gradient-to-br from-red-50/50 via-white to-red-50/30 backdrop-blur-sm border border-red-200/60 rounded-2xl p-16 text-center shadow-sm">
        <div className="max-w-md mx-auto">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
          >
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </motion.div>
          <h3 className="text-2xl font-light text-neutral-900 mb-3 tracking-tight">Unable to Load Collections</h3>
          <p className="text-neutral-600 mb-8 font-light leading-relaxed">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-8 py-3.5 bg-gradient-to-r from-neutral-900 to-neutral-800 text-sm font-medium tracking-wide text-white hover:from-neutral-800 hover:to-neutral-700 transition-all duration-300 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (categories.length === 0) {
    return (
      <div className="bg-gradient-to-br from-neutral-50 via-white to-emerald-50/20 backdrop-blur-sm border border-neutral-200/60 rounded-2xl p-16 text-center shadow-sm">
        <div className="max-w-md mx-auto">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="w-24 h-24 bg-gradient-to-br from-neutral-100 to-neutral-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
          >
            <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1M9 7h6" />
            </svg>
          </motion.div>
          <h3 className="text-2xl font-light text-neutral-900 mb-3 tracking-tight">No Collections Available</h3>
          <p className="text-neutral-600 mb-8 font-light leading-relaxed">
            Our collections are being carefully curated. Please check back soon for our natural product offerings.
          </p>
        </div>
      </div>
    )
  }

  const activeCategories = categories.filter(category => category.isActive)

  if (activeCategories.length === 0) {
    return (
      <div className="bg-gradient-to-br from-amber-50/50 via-white to-emerald-50/30 backdrop-blur-sm border border-amber-200/60 rounded-2xl p-16 text-center shadow-sm">
        <div className="max-w-md mx-auto">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="w-24 h-24 bg-gradient-to-br from-amber-100 to-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
          >
            <svg className="w-12 h-12 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </motion.div>
          <h3 className="text-2xl font-light text-neutral-900 mb-3 tracking-tight">Collections Coming Soon</h3>
          <p className="text-neutral-600 mb-8 font-light leading-relaxed">
            We&apos;re preparing something special for you. Our natural collections will be available shortly.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative bg-gradient-to-br from-white via-emerald-50/10 to-white backdrop-blur-sm border border-neutral-200/60 rounded-2xl shadow-sm overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }}></div>

      {/* Header */}
      <div className="relative px-8 py-8 border-b border-neutral-200/60 bg-gradient-to-r from-white/80 to-emerald-50/20">
        <div className="flex justify-between items-center">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-light text-neutral-900 tracking-tight mb-2"
            >
              Our Collections
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-neutral-600 font-light tracking-wide flex items-center gap-2"
            >
              <span className="inline-block w-1 h-1 bg-emerald-500 rounded-full"></span>
              Discover our carefully curated natural selections
            </motion.p>
          </div>
          <Link
            href="/categories"
            className="hidden md:inline-flex items-center gap-2 px-6 py-3 bg-white border border-neutral-200/80 text-sm font-medium tracking-wide text-neutral-700 hover:bg-neutral-50 hover:border-emerald-300/60 transition-all duration-300 rounded-lg shadow-sm hover:shadow-md group"
          >
            <span>View All</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="relative p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {activeCategories.map((category, index) => {
            const activeProducts = category.products?.filter(product => product.isActive) || []
            const productCount = activeProducts.length
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link 
                  href={`/categories/${category.id}`}
                  className="group block h-full"
                >
                  <div className="h-full bg-white border border-neutral-200/80 hover:border-emerald-400/60 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
                    {/* Category Image */}
                    <div className="aspect-w-16 aspect-h-12 bg-neutral-100 h-64 relative overflow-hidden">
                      {category.image ? (
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-50 via-neutral-50 to-emerald-100/50">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                              <span className="text-3xl">🌿</span>
                            </div>
                            <p className="text-neutral-400 text-sm font-light tracking-wide">Collection Image</p>
                          </div>
                        </div>
                      )}
                      
                      {/* Product Count Badge */}
                      <div className="absolute top-4 right-4 z-10">
                        <motion.span 
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: index * 0.08 + 0.3 }}
                          className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-black/90 text-white backdrop-blur-md tracking-wider shadow-lg"
                        >
                          {productCount} {productCount === 1 ? 'item' : 'items'}
                        </motion.span>
                      </div>

                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Shine effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                      </div>
                    </div>

                    {/* Category Content */}
                    <div className="p-6 bg-gradient-to-b from-white to-neutral-50/30">
                      <h3 className="text-xl font-light text-neutral-900 group-hover:text-emerald-700 transition-colors duration-300 mb-3 tracking-tight leading-tight">
                        {category.name}
                      </h3>
                      
                      {category.description && (
                        <p className="text-neutral-600 text-sm font-light mb-5 leading-relaxed line-clamp-2">
                          {category.description}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                        <span className="text-xs text-neutral-500 font-mono tracking-wider bg-neutral-100/80 px-3 py-1.5 rounded-md">
                          {category.slug}
                        </span>
                        <div className="flex items-center gap-1.5 text-emerald-600 font-medium text-sm group-hover:text-emerald-700 transition-colors">
                          <span className="tracking-wide">Explore</span>
                          <motion.svg 
                            className="w-4 h-4"
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </motion.svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* View All Footer */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center border-t border-neutral-200/60 pt-12"
        >
          <Link
            href="/categories"
            className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-base font-medium tracking-wide text-white hover:from-emerald-700 hover:to-emerald-600 transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 group"
          >
            <span>View All Collections</span>
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default Collections