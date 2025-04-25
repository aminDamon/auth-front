"use client"
import { motion } from 'framer-motion';
import { containerVariants } from '../../styles/animations';

const MotionCard = ({ children, className, ...props }) => {
  return (
    <motion.div 
      className={`w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-amber-100 ${className || ''}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
      whileHover={{ boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)" }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default MotionCard;