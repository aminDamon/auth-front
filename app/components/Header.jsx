"use client"
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.header
            className={`w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-lg py-2" : "bg-white/90 backdrop-blur-sm py-3"
                }`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo and Back Link */}
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <Link href="https://www.safenet-co.net/" target="_blank" rel="noopener noreferrer">
                            <motion.div
                                className="flex items-center group"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                                    <Image
                                        src="/pic/logo-1030x594-1.png"
                                        alt="شبکه امن"
                                        fill
                                        className="object-contain"
                                        priority
                                    />
                                </div>
                                <span className="mr-2 sm:mr-3 text-sm sm:text-base text-gray-700 font-medium group-hover:text-[#ff6600] transition-colors">
                                    بازگشت به safenet
                                </span>
                            </motion.div>
                        </Link>
                    </motion.div>

                    {/* Contact Button */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        <motion.a
                            href="tel:88934093"
                            className="flex items-center gap-1 text-[#ff6600] border-2 border-[#ff6600] px-4 py-1.5 sm:px-5 sm:py-2 rounded-lg font-medium transition-all duration-300 hover:bg-[#ff6600] hover:text-white"
                            whileHover={{
                                scale: 1.05,
                                backgroundColor: "#ff6600",
                                color: "#ffffff",
                                boxShadow: "0 4px 12px -2px rgba(255, 102, 0, 0.4)"
                            }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            <span dir="ltr">۸۸۹۳۴۰۹۳-۵</span>
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </motion.header>
    );
};

export default Header;