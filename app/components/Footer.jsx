"use client"
import { motion } from 'framer-motion';
import Link from 'next/link';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const persianYear = currentYear - 621;

    return (
        <motion.footer
            className="bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-12 pb-6 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Company Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h3 className="text-xl font-bold mb-4 text-[#ff6600]">شرکت شبکه امن اندیشه فردا</h3>
                        <p className="text-gray-300 mb-4 leading-relaxed">
                            ارائه دهنده راهکارهای امنیتی و شبکه‌ای با کیفیت و استانداردهای بین‌المللی
                        </p>
                        <div className="flex items-center gap-2 text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <span>خیابان ولیعصر، بالاتر از زرتشت، کوچه جاوید، پلاک 9</span>
                        </div>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-4"
                    >
                        <h3 className="text-xl font-bold mb-4 text-[#ff6600]">راه های ارتباطی</h3>
                        <div className="flex items-center gap-2 text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            <span dir="ltr">۵-۸۸۹۳۴۰۹۳ :تلفکس</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            <span>info@safenet-co.net</span>
                        </div>
                    </motion.div>
                </div>

                {/* Copyright */}
                <motion.div
                    className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <p>
                        © {persianYear} تمامی حقوق مادی و معنوی این سایت متعلق به شرکت شبکه امن اندیشه فردا می باشد
                    </p>
                </motion.div>
            </div>
        </motion.footer>
    );
};

export default Footer;