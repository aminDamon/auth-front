"use client"
import { motion } from 'framer-motion';
import { logoVariants } from '../login/styles/animations';

const Logo = () => {
  return (
    <motion.div 
      className="h-12 w-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg"
      initial={logoVariants.initial}
      animate={logoVariants.animate}
      transition={logoVariants.transition}
      whileHover={logoVariants.hover}
    >
      SE
    </motion.div>
  );
};

export default Logo;