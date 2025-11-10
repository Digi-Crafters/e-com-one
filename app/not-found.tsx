// app/not-found.tsx
"use client"
import Link from 'next/link'

import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-emerald-50/30 relative overflow-hidden flex items-center justify-center mt-10">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-neutral-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
        backgroundSize: '48px 48px'
      }}></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Animated 404 Number */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative"
          >
            <div className="text-9xl sm:text-[12rem] font-bold bg-gradient-to-br from-neutral-900 to-neutral-700 bg-clip-text text-transparent">
              404
            </div>
            <div className="absolute inset-0 text-9xl sm:text-[12rem] font-bold bg-gradient-to-br from-emerald-600 to-emerald-400 bg-clip-text text-transparent opacity-20 blur-lg">
              404
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-100/80 rounded-2xl border border-emerald-200/60 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-medium text-emerald-900 tracking-wide">Page Not Found</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-neutral-900 tracking-tight">
              Lost in <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent font-normal">Space</span>
            </h1>

            <p className="text-xl text-neutral-600 max-w-2xl mx-auto font-light leading-relaxed">
              The page you&apos;re looking for seems to have drifted off into the digital cosmos. 
              Don&apos;t worry, we&apos;ll help you find your way back home.
            </p>
          </motion.div>

          {/* Animated Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="relative w-64 h-64 mx-auto mb-8"
          >
            {/* Floating Planet */}
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full shadow-2xl border-4 border-emerald-400/30"
            >
              {/* Planet details */}
              <div className="absolute top-4 left-8 w-6 h-6 bg-emerald-700 rounded-full opacity-60"></div>
              <div className="absolute bottom-6 right-10 w-4 h-4 bg-emerald-300 rounded-full opacity-80"></div>
              <div className="absolute top-12 right-6 w-3 h-3 bg-emerald-400 rounded-full opacity-70"></div>
            </motion.div>

            {/* Floating Astronaut */}
            <motion.div
              animate={{ 
                x: [-30, 30, -30],
                y: [40, 20, 40],
                rotate: [-5, 5, -5]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-20 left-1/2 transform -translate-x-1/2"
            >
              <div className="w-16 h-20 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-2xl relative shadow-lg border border-neutral-300/50">
                {/* Helmet */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full border-2 border-blue-300/50">
                  <div className="absolute top-3 left-3 w-6 h-4 bg-blue-300/40 rounded-full"></div>
                </div>
                {/* Body */}
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-10 h-8 bg-gradient-to-br from-neutral-200 to-neutral-300 rounded"></div>
              </div>
            </motion.div>

            {/* Stars */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${((i * 17) % 100)}%`,
                  top: `${((i * 23) % 100)}%`,
                }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 2 + (i % 2),
                  repeat: Infinity,
                  delay: (i % 3) * 0.5,
                }}
              />
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-lg font-semibold rounded-2xl text-white hover:from-emerald-700 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Back to Home
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <Link
              href="/products"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-neutral-300/80 text-lg font-semibold rounded-2xl text-neutral-700 bg-white hover:bg-neutral-50 hover:border-emerald-400/60 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Browse Products
            </Link>

            <Link
              href="/categories"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-neutral-300/80 text-lg font-semibold rounded-2xl text-neutral-700 bg-white hover:bg-neutral-50 hover:border-emerald-400/60 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Explore Collections
            </Link>
          </motion.div>

          {/* Additional Help */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="pt-8 border-t border-neutral-200/60 mt-12"
          >
            <p className="text-neutral-600 font-light mb-4">
              Need immediate assistance?
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-4 py-2 text-neutral-600 hover:text-emerald-600 transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Support
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}