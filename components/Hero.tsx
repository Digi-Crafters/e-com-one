"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="min-h-screen bg-neutral-50 relative overflow-hidden">
      {/* Premium Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

      {/* Accent Lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent"></div>
      <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-emerald-300 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center w-full py-16">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-10"
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-3 px-4 py-3 bg-white border border-neutral-200 shadow-sm"
            >
              <div className="w-1.5 h-1.5 bg-emerald-600"></div>
              <span className="text-xs font-medium text-neutral-700 tracking-widest uppercase">
                ELEVATED NATURAL ESSENCE
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-6xl sm:text-7xl lg:text-8xl font-light text-neutral-900 tracking-tight leading-none"
            >
              KASHORA
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="block text-xl sm:text-2xl font-normal text-emerald-700 tracking-widest mt-6 ml-1"
              >
                THE AURA OF KASHMIR
              </motion.span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg text-neutral-600 leading-relaxed max-w-md font-light tracking-wide border-l-2 border-emerald-400 pl-6 py-2"
            >
              Precision-crafted natural solutions for the discerning. Where
              organic purity meets architectural sophistication.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 pt-8"
            >
              <Link href="/categories">
                <motion.button
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: "#059669",
                    transition: { duration: 0.2 },
                  }}
                  className="bg-neutral-900 text-white px-10 py-4 font-medium text-sm tracking-widest uppercase border border-neutral-900 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <span>DISCOVER</span>

                  <motion.svg
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="square"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </motion.svg>
                </motion.button>
              </Link>

              <motion.button
                whileHover={{
                  backgroundColor: "white",
                  borderColor: "#059669",
                  color: "#059669",
                }}
                className="bg-transparent border border-neutral-400 text-neutral-700 hover:text-emerald-700 px-10 py-4 font-medium text-sm tracking-widest uppercase transition-all duration-300"
              >
                EXPLORE
              </motion.button>
            </motion.div>

            {/* Premium Features */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="grid grid-cols-2 gap-8 pt-12 border-t border-neutral-200"
            >
              {[
                { label: "Sustainable Sourcing", value: "100%" },
                { label: "Artisanal Craft", value: "Premium" },
                { label: "Natural Integrity", value: "Preserved" },
                { label: "Modern Design", value: "Architected" },
              ].map((feature, index) => (
                <div key={index} className="flex flex-col">
                  <div className="text-2xl font-light text-neutral-900 mb-1">
                    {feature.value}
                  </div>
                  <div className="text-xs text-neutral-500 tracking-widest uppercase">
                    {feature.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image Gallery - Sharp Edges */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[600px]"
          >
            {/* Main Image Container */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 right-0 w-4/5 h-4/5 bg-neutral-800 shadow-2xl border border-neutral-300 overflow-hidden"
            >
              {/* Replace with actual Image component */}
              <Image
                src="https://images.unsplash.com/photo-1679006831648-7c9ea12e5807?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687"
                alt="Kashora Premium Product"
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />

              {/* Overlay Text */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-6">
                <div className="text-white text-sm tracking-widest uppercase">
                  Kashora Signature Collection
                </div>
                <div className="text-emerald-300 text-xs mt-1">
                  Architectural Natural Design
                </div>
              </div>
            </motion.div>

            {/* Secondary Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute bottom-0 left-0 w-2/5 h-2/5 bg-neutral-600 shadow-xl border border-neutral-300 overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1609748340041-f5d61e061ebc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=709"
                alt="Kashora Premium Product"
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Accent Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 1 }}
              className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-emerald-400 to-transparent transform -translate-y-1/2"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - Premium */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-xs text-neutral-500 tracking-widest uppercase"
          >
            Scroll
          </motion.span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-12 bg-neutral-400"
          />
        </div>
      </motion.div>

      {/* Corner Accents */}
      <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-neutral-300"></div>
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-neutral-300"></div>
    </section>
  );
};

export default Hero;
