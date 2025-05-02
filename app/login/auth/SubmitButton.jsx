"use client"
import { motion } from 'framer-motion';
import { buttonHoverVariants, itemVariants } from '../styles/animations';
import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { setCookie, deleteCookie, getCookie } from '../../utils/cookies';

const SubmitButton = ({
    loginMethod,
    username,
    password,
    onError,
    onSuccess
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();
    const redirect = searchParams.get('redirect') || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const endpoint = loginMethod === 'password'
                ? 'api/auth/login-password'
                : 'api/auth/request-verification';

            const response = await fetch(`https://ftp-safenet.liara.run/${endpoint}`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Request failed');
            }

            if (loginMethod === 'password') {
                // پاک کردن کوکی‌های قبلی
                deleteCookie('token');
                deleteCookie('isAdmin');

                // بررسی اعتبار توکن
                if (!data.token) {
                    console.error('No token in response:', data);
                    throw new Error('No token received from server');
                }

                // ذخیره کوکی‌های جدید
                setCookie('token', data.token, 1); // 1 day expiration
                setCookie('isAdmin', data.user?.role === 'admin', 1);

                // تأیید ذخیره شدن کوکی‌ها
                const storedToken = getCookie('token');
                if (!storedToken) {
                    console.error('Failed to store token. Current cookies:', document.cookie);
                    throw new Error('Failed to store token');
                }

                // لاگ کردن کوکی‌ها برای دیباگ
                console.log('Login successful:', {
                    user: data.user,
                    token: storedToken,
                    isAdmin: getCookie('isAdmin'),
                    domain: window.location.hostname,
                    allCookies: document.cookie
                });
                
                // تأخیر کوتاه برای اطمینان از ذخیره کوکی‌ها
                await new Promise(resolve => setTimeout(resolve, 100));
                
                onSuccess('ورود با موفقیت انجام شد');
                router.push(redirect);
            } else {
                onSuccess(`کد تأیید به ایمیل شما ارسال شد`);
            }

            // بعد از موفقیت‌آمیز بودن لاگین، به صفحه اصلی هدایت شود
            window.location.href = '/';
        } catch (error) {
            console.error('Login error:', error);
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