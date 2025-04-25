"use client"
import { motion } from 'framer-motion';
import { itemVariants } from '../styles/animations';

const UsernameInput = ({ username, setUsername }) => {
    return (
        <motion.div variants={itemVariants}>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                نام کاربری
            </label>
            <div className="relative">
                <motion.input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all text-left"
                    placeholder="نام کاربری خود را وارد کنید"
                    dir="ltr"
                    whileFocus={{ boxShadow: "0 0 0 2px rgba(217, 119, 6, 0.2)" }}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        initial={{ scale: 0.8, opacity: 0.5 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </motion.svg>
                </div>
            </div>
        </motion.div>
    );
};

export default UsernameInput;