"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiX } from 'react-icons/fi';

const SearchBox = ({ onSearch, searchTerm, darkMode }) => {
  const [isFocused, setIsFocused] = useState(false);
  
  // Animation variants
  const searchVariants = {
    initial: { 
      scale: 0.97, 
      opacity: 0,
      y: 20
    },
    animate: { 
      scale: 1, 
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 15
      }
    }
  };

  const iconVariants = {
    initial: { scale: 0.5, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 300
      }
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={searchVariants}
      className="w-full max-w-2xl mx-auto"
    >
      <div 
        className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${
          isFocused 
            ? darkMode 
              ? 'shadow-[0_0_15px_rgba(255,102,0,0.4)] border-orange-400/40' 
              : 'shadow-[0_0_20px_rgba(255,102,0,0.2)] border-orange-400/40' 
            : darkMode 
              ? 'shadow-lg border-gray-700' 
              : 'shadow-md border-gray-200'
        } ${
          darkMode ? 'bg-gray-800/50 backdrop-blur-lg' : 'bg-white/80 backdrop-blur-lg'
        } border`}
      >
        {/* Glowing effect when focused */}
        {isFocused && (
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-orange-500/5 to-red-500/5 animate-pulse"></div>
        )}
        
        <div className="relative flex items-center">
          {/* Search icon */}
          <motion.div 
            variants={iconVariants}
            className={`absolute right-5 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            <FiSearch className="h-5 w-5" />
          </motion.div>
          
          {/* Input field */}
          <input
            type="text"
            placeholder="جستجوی فایل..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`w-full py-4 px-6 pr-14 outline-none transition-all duration-300 ${
              darkMode 
                ? 'bg-transparent text-white placeholder-gray-400' 
                : 'bg-transparent text-gray-800 placeholder-gray-500'
            }`}
          />
          
          {/* Clear button */}
          {searchTerm && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onSearch('')}
              className={`absolute left-5 p-1 rounded-full ${
                darkMode 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
              } transition-all duration-200`}
            >
              <FiX className="h-4 w-4" />
            </motion.button>
          )}
        </div>
        
        {/* Animated bottom bar */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isFocused ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="h-0.5 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500"
        ></motion.div>
      </div>
      
      {/* Search suggestions would go here */}
      {isFocused && searchTerm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`mt-2 rounded-xl overflow-hidden ${
            darkMode 
              ? 'bg-gray-800/90 backdrop-blur-lg text-gray-200' 
              : 'bg-white/90 backdrop-blur-lg text-gray-700'
          } shadow-lg border ${
            darkMode ? 'border-gray-700' : 'border-gray-100'
          }`}
        >
          <div className="p-2">
            <p className="text-xs px-3 py-2 text-center">
              {darkMode ? (
                <span className="text-gray-400">جستجو برای: </span>
              ) : (
                <span className="text-gray-500">جستجو برای: </span>
              )}
              <span className="font-medium">{searchTerm}</span>
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
export default SearchBox;