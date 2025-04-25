"use client"
import { motion } from 'framer-motion';
import { tabVariants } from '../styles/animations';

const LoginTabs = ({ loginMethod, setLoginMethod }) => {
    return (
        <div className="flex border-b border-amber-100">
            <motion.button
                onClick={() => setLoginMethod('email')}
                className={`flex-1 py-4 px-2 text-center font-medium transition-all duration-300 ${loginMethod === 'email'
                        ? 'text-amber-600'
                        : 'text-gray-500 hover:text-amber-500 hover:bg-amber-50/50'
                    }`}
                variants={tabVariants}
                animate={loginMethod === 'email' ? 'active' : 'inactive'}
                whileHover={{ backgroundColor: "rgba(251, 191, 36, 0.1)" }}
                whileTap={{ scale: 0.98 }}
            >
                ورود با ایمیل
            </motion.button>

            <motion.button
                onClick={() => setLoginMethod('password')}
                className={`flex-1 py-4 px-2 text-center font-medium transition-all duration-300 ${loginMethod === 'password'
                        ? 'text-amber-600'
                        : 'text-gray-500 hover:text-amber-500 hover:bg-amber-50/50'
                    }`}
                variants={tabVariants}
                animate={loginMethod === 'password' ? 'active' : 'inactive'}
                whileHover={{ backgroundColor: "rgba(251, 191, 36, 0.1)" }}
                whileTap={{ scale: 0.98 }}
            >
                ورود با رمز عبور
            </motion.button>
        </div>
    );
};

export default LoginTabs;