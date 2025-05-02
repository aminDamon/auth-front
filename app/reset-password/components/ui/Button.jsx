import { motion } from 'framer-motion';

export const Button = ({
    type = 'button',
    onClick,
    disabled = false,
    isLoading = false,
    loadingText,
    children,
    className = ''
}) => {
    const themeColor = {
        button: 'bg-gradient-to-r from-[#ff6600] to-[#ff8533]',
        buttonHover: 'hover:from-[#e55a00] hover:to-[#ff7a1f]',
        accent: 'ring-[#ff6600]/30 focus:ring-[#ff6600]/50',
    };

    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white ${themeColor.button} ${themeColor.buttonHover} focus:outline-none focus:ring-2 focus:ring-offset-2 ${themeColor.accent} transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70 ${className}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {loadingText}
                </>
            ) : (
                children
            )}
        </motion.button>
    );
};