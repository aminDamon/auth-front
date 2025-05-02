"use client"
import { motion } from 'framer-motion';

const PageTitle = ({ darkMode }) => {
    return (
        <motion.div
            className="text-center mb-12 relative"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 100
            }}
        >
            {/* Decorative elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-600/20 blur-xl z-0"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-12 rounded-full bg-gradient-to-r from-orange-500/10 to-red-500/10 blur-xl rotate-45 z-0"></div>

            {/* Content */}
            <div className="relative z-10">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.7 }}
                >
                    <h1 className={`text-5xl h-[60px] font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'
                        } bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-600`}>
                        مرکز دانلود فایل‌ها
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}
                >
                    تمامی فایل‌های مورد نیاز خود را در اینجا پیدا و دانلود کنید
                </motion.p>
            </div>
        </motion.div>
    );
};

export default PageTitle;