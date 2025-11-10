'use client';

import React from 'react';
import { motion } from 'framer-motion';

const OurStory = () => {
  const milestones = [
    {
      year: '2025',
      title: 'Kashora is Born',
      description: 'Launched with a vision to bridge Kashmir\'s timeless artistry with contemporary fashion. Every piece hand-crafted, heart-centered, and designed for the modern soul who values authenticity.'
    },
    {
      year: 'Present',
      title: 'Loved by Modern Souls',
      description: 'Our customers don\'t just wear Kashora—they feel it. Overwhelmed by heartfelt reviews celebrating the authentic craftsmanship and Kashmir\'s unmistakable aura in every stitch.'
    },
    {
      year: 'Future',
      title: 'Crafting Tomorrow',
      description: 'Expanding our collection while staying true to hand-made excellence, artisan partnerships, and the soulful elegance that makes Kashmiri-inspired fashion timeless.'
    }
  ];

  const values = [
    { title: 'Hand-Made with Heart', description: 'Every piece is crafted by skilled artisan hands—no machines, no mass production. Just pure devotion, patience, and human touch.' },
    { title: 'Authentic Kashmir Spirit', description: 'We don\'t imitate—we honor. Rooted in genuine Kashmiri techniques, patterns, and the valley\'s soulful aesthetic legacy.' },
    { title: 'Modern Soul, Timeless Art', description: 'Kashmiri-inspired fashion reimagined for today\'s conscious individual who seeks meaning, beauty, and authenticity in what they wear.' },
    { title: 'Heart-Crafted Stories', description: 'Each garment tells a story—of the artisan who made it, the tradition it honors, and the modern spirit who gives it life.' }
  ];

  return (
    <div id="our-story" className="bg-neutral-50 min-h-screen">

      {/* Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none"></div>
      
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-neutral-200">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent"></div>
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-emerald-300 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 py-24 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-1.5 h-1.5 bg-emerald-600"></div>
              <span className="text-xs font-medium text-neutral-700 tracking-widest uppercase">Kashmiri-Inspired Fashion for Modern Souls</span>
            </div>
            
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-light text-neutral-900 tracking-tight leading-none mb-8">
              Our Story
            </h1>
            
            <p className="text-xl sm:text-2xl text-neutral-600 leading-relaxed font-light tracking-wide border-l-2 border-emerald-400 pl-6 py-2">
              Where ancient Kashmiri artistry meets contemporary elegance. Hand-made, heart-crafted, and authentically designed for the modern soul.
            </p>
          </motion.div>
        </div>

        <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-neutral-300"></div>
      </section>

      {/* Main Story */}
      <section className="relative max-w-7xl mx-auto px-6 sm:px-8 py-20 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h2 className="text-4xl font-light text-neutral-900 tracking-tight">
                Hand-Made for the Modern Soul
              </h2>
              <div className="prose prose-lg text-neutral-600 font-light leading-relaxed space-y-4">
                <p>
                  Kashmir has always whispered elegance through centuries of craftsmanship. At Kashora, we listen—and translate that timeless language into fashion for today's conscious individual.
                </p>
                <p>
                  We're not preserving the past in a museum. We're bringing Kashmir's soul into your wardrobe—hand-crafted by skilled artisans, heart-centered in every detail, and designed for modern souls who refuse to compromise on authenticity.
                </p>
                <p>
                  Every garment is a collaboration between heritage and now. Between artisan hands and your unique spirit. Between what was, what is, and what fashion can truly mean.
                </p>
              </div>
            </div>

            <div className="border-l-2 border-emerald-400 pl-6 py-4">
              <p className="text-lg text-emerald-800 font-light italic tracking-wide">
                "Kashmiri-inspired fashion isn't about nostalgia. It's about wearing something real, crafted with care, and alive with meaning."
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-gradient-to-br from-emerald-900 to-neutral-700 border border-neutral-300 shadow-2xl">
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-white text-sm tracking-widest uppercase">Artisan Craftsmanship</span>
              </div>
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              viewport={{ once: true }}
              className="absolute -bottom-4 -right-4 w-full h-px bg-gradient-to-r from-emerald-400 to-transparent"
            />
          </motion.div>
        </div>
      </section>

      {/* The Kashora Difference */}
      <section className="relative border-y border-neutral-200 bg-white/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-20 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-1.5 h-1.5 bg-emerald-600"></div>
              <span className="text-xs font-medium text-neutral-700 tracking-widest uppercase">The Kashora Difference</span>
            </div>
            <h2 className="text-5xl font-light text-neutral-900 tracking-tight mb-6">
              Authentic. Hand-Made. Heart-Crafted.
            </h2>
            <p className="text-neutral-600 font-light leading-relaxed tracking-wide">
              In a world of fast fashion and factory lines, we choose the slow, sacred path of genuine craftsmanship.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Hand-Made',
                description: 'Every stitch by skilled artisan hands. No machines. No shortcuts. Just centuries-old techniques meeting modern design.',
                icon: '✋'
              },
              {
                title: 'Heart-Crafted',
                description: 'Made with devotion, not deadlines. Each piece receives the time, care, and attention it deserves.',
                icon: '❤️'
              },
              {
                title: 'Authentic',
                description: 'Real Kashmiri inspiration. Real artisan partnerships. Real stories woven into every thread.',
                icon: '✨'
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="text-center space-y-4"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-medium text-neutral-900 tracking-wide">
                  {item.title}
                </h3>
                <p className="text-neutral-600 font-light leading-relaxed tracking-wide text-sm">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative max-w-7xl mx-auto px-6 sm:px-8 py-20 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-1.5 h-1.5 bg-emerald-600"></div>
            <span className="text-xs font-medium text-neutral-700 tracking-widest uppercase">Our Journey</span>
          </div>
          <h2 className="text-5xl font-light text-neutral-900 tracking-tight">
            A Story in Motion
          </h2>
        </motion.div>

        <div className="space-y-12">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start border-l-2 border-emerald-400 pl-8 py-4"
            >
              <div className="md:col-span-1">
                <div className="text-4xl font-light text-neutral-900 mb-2">{milestone.year}</div>
                <div className="text-xs text-neutral-500 tracking-widest uppercase">{milestone.title}</div>
              </div>
              <div className="md:col-span-3">
                <p className="text-neutral-600 font-light leading-relaxed tracking-wide">
                  {milestone.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="relative border-y border-neutral-200 bg-white/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-20 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-1.5 h-1.5 bg-emerald-600"></div>
              <span className="text-xs font-medium text-neutral-700 tracking-widest uppercase">What Drives Us</span>
            </div>
            <h2 className="text-5xl font-light text-neutral-900 tracking-tight mb-4">
              Our Core Beliefs
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border border-neutral-200 bg-white p-8 hover:border-emerald-400 transition-all duration-300"
              >
                <h3 className="text-xl font-medium text-neutral-900 tracking-wide mb-3">
                  {value.title}
                </h3>
                <p className="text-neutral-600 font-light leading-relaxed tracking-wide text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
{/* Closing Statement */}
<section className="relative border-t border-neutral-200 bg-white">
  <div className="max-w-4xl mx-auto px-6 sm:px-8 py-20 text-center">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="space-y-8"
    >
      <h2 className="text-4xl sm:text-5xl font-light text-neutral-900 tracking-tight leading-tight">
        Wear Something Real.
        <span className="block text-emerald-700 text-2xl sm:text-3xl mt-4 font-normal tracking-widest">
          Wear Something Meaningful.
        </span>
      </h2>
      
      <p className="text-lg text-neutral-600 font-light leading-relaxed tracking-wide max-w-2xl mx-auto">
        Kashora is where Kashmir's soul meets your modern spirit. Every garment is hand-made, heart-crafted, and carries the aura of authentic artistry.
      </p>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="text-neutral-500 font-light tracking-wide border-t border-neutral-200 pt-8 text-sm"
      >
        Thank you for choosing fashion with meaning, crafted with heart.
      </motion.p>

      <motion.button
        whileHover={{ 
          scale: 1.02,
          backgroundColor: "#059669"
        }}
        className="mt-8 bg-neutral-900 text-white px-10 py-4 font-medium text-sm tracking-widest uppercase border border-neutral-900 shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-3"
      >
        <span>DISCOVER THE COLLECTION</span>
        <motion.svg
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="square" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </motion.svg>
      </motion.button>
    </motion.div>
  </div>

  {/* Corner Accents */}
  <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-neutral-300"></div>
  <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-neutral-300"></div>
</section>
    </div>
  );
};

export default OurStory;