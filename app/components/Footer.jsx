"use client"
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <motion.footer
            className="bg-gray-800 text-white py-8 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
        >
            <div className="container mx-auto px-4 text-center">
                <p className="text-gray-400 mb-2">تمامی حقوق محفوظ است &copy; ۱۴۰۳</p>
                <div className="flex justify-center space-x-4 space-x-reverse">
                    <a href="#" className="text-gray-400 hover:text-[#ff6600] transition-colors">
                        قوانین و مقررات
                    </a>
                    <a href="#" className="text-gray-400 hover:text-[#ff6600] transition-colors">
                        حریم خصوصی
                    </a>
                    <a href="#" className="text-gray-400 hover:text-[#ff6600] transition-colors">
                        تماس با ما
                    </a>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;