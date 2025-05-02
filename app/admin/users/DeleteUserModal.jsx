'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

export default function DeleteUserModal({ onClose, user, onSuccess }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getToken = () => {
        const tokenCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
        return tokenCookie ? tokenCookie.split('=')[1] : null;
    };

    const handleDelete = async () => {
        setError(null);
        setLoading(true);

        try {
            const token = getToken();
            if (!token) {
                throw new Error('لطفاً ابتدا وارد شوید');
            }

            const response = await fetch(`https://ftp-safenet.liara.run/api/users/${user.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'خطا در حذف کاربر');
            }

            toast.success('کاربر با موفقیت حذف شد');
            onSuccess();
            onClose();
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-xl p-6 w-full max-w-md"
                    onClick={e => e.stopPropagation()}
                >
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">حذف کاربر</h2>
                    
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
                        >
                            {error}
                        </motion.div>
                    )}

                    <p className="text-gray-700 mb-6">
                        آیا از حذف کاربر <span className="font-semibold">{user?.username}</span> با ایمیل <span className="font-semibold">{user?.email}</span> اطمینان دارید؟
                    </p>

                    <div className="flex justify-end space-x-3">
                        <motion.button
                            type="button"
                            onClick={onClose}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                        >
                            انصراف
                        </motion.button>
                        <motion.button
                            type="button"
                            onClick={handleDelete}
                            disabled={loading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`px-4 py-2 text-white rounded-lg transition-colors duration-200 ${
                                loading ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
                            }`}
                        >
                            {loading ? (
                                <motion.span
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="inline-block w-5 h-5 border-2 border-white rounded-full border-t-transparent"
                                />
                            ) : 'حذف کاربر'}
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
} 