"use client"
import { motion } from 'framer-motion';

// Search filter animation variants
const searchVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.2,
            duration: 0.5
        }
    }
};

const SearchBox = ({ onSearch, searchTerm }) => {
    return (
        <motion.div
            className="mb-8"
            variants={searchVariants}
        >
            <div className="relative max-w-md mx-auto">
                <input
                    type="text"
                    placeholder="جستجوی فایل..."
                    value={searchTerm}
                    onChange={(e) => onSearch(e.target.value)}
                    className="w-full px-5 py-3 pe-12 rounded-xl shadow-sm border border-gray-200 focus:border-[#ff6600] focus:ring focus:ring-[#ff6600] focus:ring-opacity-30 transition-all duration-300 outline-none"
                />
                <div className="absolute left-4 top-3 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>
        </motion.div>
    );
};

export default SearchBox;