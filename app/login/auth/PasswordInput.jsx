"use client"
import { motion } from 'framer-motion';
import { itemVariants } from '../styles/animations';

const PasswordInput = ({ password, setPassword }) => {
    return (
        <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
        >
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                رمز عبور
            </label>
            <motion.input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all text-left"
                placeholder="••••••••"
                dir="ltr"
                whileFocus={{ boxShadow: "0 0 0 2px rgba(217, 119, 6, 0.2)" }}
            />
        </motion.div>
    );
};

export default PasswordInput;