"use client"
import React from 'react'
import Header from './Header'
import { motion } from 'framer-motion'

function Menu() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white flex flex-col font-vazir">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-amber-100 p-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">منوی اصلی</h2>
          {/* محتوای منو اینجا قرار می‌گیرد */}
        </motion.div>
      </main>
    </div>
  )
}

export default Menu