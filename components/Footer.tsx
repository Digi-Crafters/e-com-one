'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const footerLinks = {
  collections: [
    { name: 'New Arrivals', href: '#' },
    { name: 'Best Sellers', href: '#' },
    { name: 'Signature Series', href: '#' },
    { name: 'Limited Edition', href: '#' },
  ],
  about: [
    { name: 'Our Story', href: '/our-story' }, // Updated to actual route
    { name: 'Artisans', href: '#' },
    { name: 'Sustainability', href: '#' },
    { name: 'Craftsmanship', href: '#' },
  ],
  support: [
    { name: 'Contact', href: '/contact' }, // Updated to actual route
    { name: 'Shipping', href: '#' },
    { name: 'Returns', href: '#' },
    { name: 'Care Guide', href: '#' },
  ],
  social: [
    { name: 'Instagram', href: '#', icon: 'instagram' },
    { name: 'Facebook', href: '#', icon: 'facebook' },
    { name: 'Twitter', href: '#', icon: 'twitter' },
    { name: 'Pinterest', href: '#', icon: 'pinterest' },
  ],
};

const Footer = () => {
  return (
    <footer id="footer" className="relative overflow-hidden bg-neutral-50 border-t border-neutral-200">
      {/* Premium Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      
      {/* Accent Lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 py-12 sm:py-16">
        {/* Newsletter Section */}
        <motion.div 
          className="mb-12 sm:mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 mb-6"
          >
            <div className="w-1.5 h-1.5 bg-emerald-600"></div>
            <span className="text-xs font-medium text-neutral-700 tracking-widest uppercase">Exclusive Updates</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-light text-neutral-900 mb-4 tracking-tight"
          >
            Join Our Newsletter
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-neutral-600 mb-8 text-sm tracking-wide max-w-md mx-auto leading-relaxed"
          >
            Stay updated with our latest collections and artisanal stories
          </motion.p>
          
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="mx-auto flex flex-col sm:flex-row max-w-md gap-4"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-auto border border-neutral-300 bg-white px-4 py-3 text-neutral-900 text-sm tracking-wide placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-all duration-300"
            />
            <motion.button
              type="submit"
              className="group relative overflow-hidden bg-neutral-900 border border-neutral-900 px-8 py-3 text-white font-medium text-sm tracking-widest uppercase hover:bg-emerald-700 hover:border-emerald-700 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Subscribe</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            </motion.button>
          </motion.form>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div 
            className="space-y-4 sm:space-y-6 text-center sm:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link href="/" className="block">
              <motion.h1 
                className="text-3xl sm:text-4xl font-light text-neutral-900 tracking-tight mb-2"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                KASHORA
                <span className="block text-emerald-700 text-sm tracking-widest mt-2 font-normal">
                  ARCHITECTURAL NATURE
                </span>
              </motion.h1>
            </Link>
            <p className="text-neutral-600 text-sm leading-relaxed tracking-wide max-w-xs border-l-2 border-emerald-400 pl-4 py-1">
              Crafting timeless pieces that blend traditional Kashmiri artistry with contemporary elegance.
            </p>
            
            {/* Social Links */}
            <motion.div 
              className="flex space-x-4 justify-center sm:justify-start"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {footerLinks.social.map((item) => (
                <motion.div key={item.name} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    href={item.href}
                    className="text-neutral-600 hover:text-emerald-600 transition-colors duration-300 border border-neutral-300 p-2 hover:border-emerald-400"
                  >
                    <span className="sr-only">{item.name}</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      {item.icon === 'facebook' && (
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      )}
                      {item.icon === 'instagram' && (
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      )}
                      {item.icon === 'twitter' && (
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      )}
                      {item.icon === 'pinterest' && (
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.182-.78 1.172-4.97 1.172-4.97s-.299-.6-.299-1.486c0-1.39.806-2.428 1.81-2.428.852 0 1.264.64 1.264 1.408 0 .858-.546 2.14-.828 3.33-.236.995.5 1.807 1.48 1.807 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.177-4.068-2.845 0-4.515 2.135-4.515 4.34 0 .859.331 1.781.745 2.281a.3.3 0 01.069.288l-.278 1.133c-.044.183-.145.223-.335.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.965-.525-2.291-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                      )}
                    </svg>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          {[
            { title: 'Collections', links: footerLinks.collections },
            { title: 'About', links: footerLinks.about },
            { title: 'Support', links: footerLinks.support },
          ].map((section, index) => (
            <motion.div 
              key={section.title}
              className="text-center sm:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-sm font-medium text-neutral-900 tracking-widest uppercase mb-4 sm:mb-6 border-b border-neutral-200 pb-2">
                {section.title}
              </h3>
              <ul className="space-y-3 sm:space-y-4 text-sm">
                {section.links.map((item) => (
                  <li key={item.name}>
                    <motion.div whileHover={{ x: 2 }} transition={{ duration: 0.2 }}>
                      <Link 
                        href={item.href} 
                        className="text-neutral-600 hover:text-emerald-700 transition-colors duration-300 block"
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-neutral-200"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-neutral-500 text-xs sm:text-sm text-center">
              © 2025 Kashora. All rights reserved.
            </p>
            <div className="flex gap-4 sm:gap-6">
              <Link href="#" className="text-neutral-500 hover:text-emerald-700 transition-colors duration-300 text-xs sm:text-sm">
                Privacy Policy
              </Link>
              <Link href="#" className="text-neutral-500 hover:text-emerald-700 transition-colors duration-300 text-xs sm:text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-neutral-300"></div>
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-neutral-300"></div>
    </footer>
  );
};

export default Footer;