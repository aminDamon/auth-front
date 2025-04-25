"use client"
import { motion } from 'framer-motion';

const Header = () => {
    return (
        <motion.header 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10"
        >
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <motion.div 
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex items-center space-x-4 rtl:space-x-reverse"
                >
                    <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-gray-600 hover:text-amber-600 transition-colors p-2 rounded-full hover:bg-amber-50"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </motion.button>
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 260, damping: 20 }}
                        className="h-12 w-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg"
                    >
                        SE
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="text-2xl font-bold text-gray-800"
                    >
                        شبکه امن
                    </motion.h1>
                </motion.div>
                <motion.a 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="#" 
                    className="text-gray-600 hover:text-amber-600 transition-colors px-4 py-2 rounded-lg hover:bg-amber-50"
                >
                    تماس با شرکت
                </motion.a>
            </div>
        </motion.header>
    );
};

export default Header; 