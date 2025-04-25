"use client"
import { motion } from 'framer-motion';

const PageTitle = () => {
    return (
        <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h1 className="text-4xl font-bold text-gray-800 mb-2">مرکز دانلود فایل‌ها</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">تمامی فایل‌های مورد نیاز خود را در اینجا پیدا و دانلود کنید</p>
        </motion.div>
    );
};

export default PageTitle;