"use client"
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UsernameInput from './UsernameInput';
import PasswordInput from './PasswordInput';
import SubmitButton from './SubmitButton';
import { formVariants, itemVariants } from '../styles/animations';

const LoginForm = ({ loginMethod }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // تابع مدیریت خطاها
    const handleError = (error) => {
        let errorMessage = 'خطایی رخ داده است';

        if (error.includes('Invalid credentials')) {
            errorMessage = 'نام کاربری یا رمز عبور نادرست است';
        } else if (error.includes('User not found')) {
            errorMessage = 'کاربری با این مشخصات یافت نشد';
        } else if (error.includes('Network Error')) {
            errorMessage = 'خطا در ارتباط با سرور';
        } else if (error.includes('password must be a string')) {
            errorMessage = 'رمز عبور نامعتبر است';
        }

        setError(errorMessage);
        setSuccess(null);
    };

    // تابع مدیریت موفقیت
    const handleSuccess = (message) => {
        setSuccess(message);
        setError(null);
    };

    return (
        <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-md">
            <motion.div
                className="text-center mb-8"
                variants={itemVariants}
            >
                <motion.h2
                    className="text-2xl font-bold text-gray-800 mb-3"
                    variants={itemVariants}
                >
                    به شبکه امن خوش آمدید
                </motion.h2>
                <motion.p
                    className="text-gray-600 leading-relaxed"
                    variants={itemVariants}
                >
                    {loginMethod === 'password'
                        ? 'لطفاً نام کاربری و رمز عبور خود را وارد کنید'
                        : 'لطفاً نام کاربری خود را وارد کنید تا کد تأیید برای شما ارسال شود'}
                </motion.p>
            </motion.div>

            {/* نمایش پیام‌های وضعیت */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg"
                    >
                        {error}
                    </motion.div>
                )}

                {success && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mb-4 p-4 bg-green-50 text-green-700 rounded-lg"
                    >
                        {success}
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
                <motion.div
                    key={loginMethod}
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <UsernameInput
                            username={username}
                            setUsername={setUsername}
                            hasError={Boolean(error)}
                        />

                        {loginMethod === 'password' && (
                            <PasswordInput
                                password={password}
                                setPassword={setPassword}
                                hasError={Boolean(error)}
                            />
                        )}

                        <SubmitButton
                            loginMethod={loginMethod}
                            username={username}
                            password={password}
                            onError={handleError}
                            onSuccess={handleSuccess}
                        />
                    </form>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default LoginForm;