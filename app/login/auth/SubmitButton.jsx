"use client"
import { motion } from 'framer-motion';
import { buttonHoverVariants, itemVariants } from '../styles/animations';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';

const SubmitButton = ({
    loginMethod,
    username,
    password,
    onError,
    onSuccess
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const endpoint = loginMethod === 'password'
                ? '/api/auth/login-password'
                : '/api/auth/request-verification';

            const response = await fetch(`http://localhost:5000${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
                credentials: 'include' // برای کوکی‌های HttpOnly
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Request failed');
            }

            if (loginMethod === 'password') {
                // ذخیره توکن در کوکی
                setCookie('token', data.token, {
                    maxAge: 60 * 60 * 24 * 7, // 1 هفته
                    path: '/',
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict'
                });

                onSuccess('ورود با موفقیت انجام شد');
                router.push('/'); // ریدایرکت به صفحه اصلی
            } else {
                onSuccess(`کد تأیید به ایمیل شما ارسال شد`);
            }
        } catch (error) {
            onError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.button
            onClick={handleSubmit}
            disabled={isLoading || !username || (loginMethod === 'password' && !password)}
            className={`w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${isLoading ? 'opacity-70' : 'hover:from-amber-600 hover:to-amber-700 hover:shadow-xl'
                }`}
            variants={itemVariants}
            whileHover={!isLoading ? buttonHoverVariants.hover : {}}
            whileTap={!isLoading ? buttonHoverVariants.tap : {}}
        >
            {isLoading ? (
                <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25" />
                        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {loginMethod === 'password' ? 'در حال ورود...' : 'در حال ارسال...'}
                </span>
            ) : (
                loginMethod === 'password' ? 'ورود به حساب' : 'دریافت کد تأیید'
            )}
        </motion.button>
    );
};

export default SubmitButton;