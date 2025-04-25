"use client"
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';    

const Header = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Animation variants
    const headerVariants = {
        initial: { y: -100, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.5, ease: "easeOut" }
    };

    const logoVariants = {
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: { delay: 0.2, duration: 0.5 }
    };

    const navItemVariants = {
        initial: { y: -20, opacity: 0 },
        animate: (i) => ({
            y: 0,
            opacity: 1,
            transition: {
                delay: 0.3 + (i * 0.1),
                duration: 0.4,
                ease: "easeOut"
            }
        }),
        hover: {
            scale: 1.05,
            color: "#ff6600",
            transition: { duration: 0.2 }
        }
    };

    const contactBtnVariants = {
        initial: { scale: 0.9, opacity: 0 },
        animate: {
            scale: 1,
            opacity: 1,
            transition: { delay: 0.6, duration: 0.5 }
        },
        hover: {
            scale: 1.05,
            backgroundColor: "#ff6600",
            color: "#ffffff",
            boxShadow: "0 10px 15px -3px rgba(255, 102, 0, 0.3)"
        },
        tap: { scale: 0.98 }
    };

    return (
        <motion.header
            className={`z-50 transition-all duration-300 ${scrolled
                    ? "bg-white/95 backdrop-blur-md shadow-md py-3"
                    : "bg-white/80 backdrop-blur-sm py-4"
                }`}
            initial={headerVariants.initial}
            animate={headerVariants.animate}
            transition={headerVariants.transition}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                <div className="flex items-center space-x-6 space-x-reverse">
                    <motion.div
                        initial={logoVariants.initial}
                        animate={logoVariants.animate}
                        transition={logoVariants.transition}
                        className="flex items-center"
                    >
                        <Logo />

                        <motion.h1
                            className="text-2xl font-bold bg-gradient-to-l from-[#ff6600] to-[#ff8533] bg-clip-text text-transparent mr-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            شبکه امن
                        </motion.h1>
                    </motion.div>

                    <div className="hidden md:flex space-x-6 space-x-reverse">
                        {["خانه", "محصولات", "خدمات", "درباره ما"].map((item, i) => (
                            <motion.a
                                key={item}
                                href="#"
                                className="text-gray-700 hover:text-[#ff6600] font-medium transition-colors relative group"
                                custom={i}
                                initial="initial"
                                animate="animate"
                                whileHover="hover"
                                variants={navItemVariants}
                            >
                                {item}
                                <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-[#ff6600] transition-all duration-300 group-hover:w-full"></span>
                            </motion.a>
                        ))}
                    </div>
                </div>

                <div className="flex items-center space-x-3 space-x-reverse">
                    <motion.a
                        href="#"
                        className="text-[#ff6600] border-2 border-[#ff6600] px-5 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-[#ff6600] hover:text-white"
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                        whileTap="tap"
                        variants={contactBtnVariants}
                    >
                        تماس با شرکت
                    </motion.a>

                    <motion.button
                        className="md:hidden text-gray-700 hover:text-[#ff6600] transition-colors p-2 rounded-full hover:bg-orange-50"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </motion.button>

                    <motion.button
                        className="text-gray-700 hover:text-[#ff6600] transition-colors p-2 rounded-full hover:bg-orange-50 hidden md:flex"
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 102, 0, 0.1)" }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </motion.button>
                </div>
            </div>
        </motion.header>
    );
};

export default Header;