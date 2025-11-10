'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle authentication logic here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-neutral-50 relative overflow-hidden">
      {/* Premium Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      
      {/* Accent Lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent"></div>
      <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-emerald-300 to-transparent"></div>

      <div className="relative min-h-screen flex items-center justify-center px-6 sm:px-8 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-3 px-4 py-3 bg-white border border-neutral-200 shadow-sm mb-8"
            >
              <div className="w-1.5 h-1.5 bg-emerald-600"></div>
              <span className="text-xs font-medium text-neutral-700 tracking-widest uppercase">
                {isLogin ? 'Welcome Back' : 'Join Kashora'}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl font-light text-neutral-900 tracking-tight leading-none mb-4"
            >
              KASHORA
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-emerald-700 text-sm tracking-widest uppercase font-normal mb-2"
            >
              ARCHITECTURAL NATURE
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-neutral-600 text-sm font-light tracking-wide"
            >
              {isLogin ? 'Sign in to your account' : 'Create your account'}
            </motion.p>
          </motion.div>

          {/* Toggle Switch */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex bg-white border border-neutral-200 rounded-lg p-1 mb-8 shadow-sm"
          >
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-4 text-sm font-medium tracking-wide transition-all duration-300 ${
                isLogin
                  ? 'bg-neutral-900 text-white shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-4 text-sm font-medium tracking-wide transition-all duration-300 ${
                !isLogin
                  ? 'bg-neutral-900 text-white shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Sign Up
            </button>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.5 }}
              >
                <label htmlFor="name" className="block text-xs font-medium text-neutral-700 tracking-widest uppercase mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-neutral-300 bg-white text-neutral-900 text-sm tracking-wide placeholder-neutral-400 focus:outline-none focus:border-emerald-500 transition-all duration-300"
                  placeholder="Enter your full name"
                  required={!isLogin}
                />
              </motion.div>
            )}

            <div>
              <label htmlFor="email" className="block text-xs font-medium text-neutral-700 tracking-widest uppercase mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-neutral-300 bg-white text-neutral-900 text-sm tracking-wide placeholder-neutral-400 focus:outline-none focus:border-emerald-500 transition-all duration-300"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-medium text-neutral-700 tracking-widest uppercase mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-neutral-300 bg-white text-neutral-900 text-sm tracking-wide placeholder-neutral-400 focus:outline-none focus:border-emerald-500 transition-all duration-300"
                placeholder="Enter your password"
                required
              />
            </div>

            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.5 }}
              >
                <label htmlFor="confirmPassword" className="block text-xs font-medium text-neutral-700 tracking-widest uppercase mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-neutral-300 bg-white text-neutral-900 text-sm tracking-wide placeholder-neutral-400 focus:outline-none focus:border-emerald-500 transition-all duration-300"
                  placeholder="Confirm your password"
                  required={!isLogin}
                />
              </motion.div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-emerald-600 border-neutral-300 rounded focus:ring-emerald-500"
                  />
                  <span className="ml-2 text-sm text-neutral-600 tracking-wide">Remember me</span>
                </label>
                <a href="#" className="text-sm text-emerald-700 hover:text-emerald-800 transition-colors duration-300 tracking-wide">
                  Forgot password?
                </a>
              </div>
            )}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-neutral-900 text-white py-4 font-medium text-sm tracking-widest uppercase border border-neutral-900 hover:bg-emerald-700 hover:border-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </motion.button>

            {isLogin && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="text-center text-neutral-600 text-sm tracking-wide"
              >
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className="text-emerald-700 hover:text-emerald-800 font-medium transition-colors duration-300"
                >
                  Sign up
                </button>
              </motion.p>
            )}
          </motion.form>

          {/* Social Login */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-8 pt-8 border-t border-neutral-200"
          >
            <p className="text-center text-xs text-neutral-500 tracking-widest uppercase mb-4">
              Or continue with
            </p>
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="flex items-center justify-center gap-2 py-3 px-4 border border-neutral-300 bg-white text-neutral-700 text-sm tracking-wide hover:border-neutral-400 transition-all duration-300"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="flex items-center justify-center gap-2 py-3 px-4 border border-neutral-300 bg-white text-neutral-700 text-sm tracking-wide hover:border-neutral-400 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
                Twitter
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-neutral-300"></div>
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-neutral-300"></div>
    </div>
  );
};

export default LoginPage;