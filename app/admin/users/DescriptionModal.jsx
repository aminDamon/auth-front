'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEdit2, FiSave } from 'react-icons/fi';

export default function DescriptionModal({ isOpen, onClose, user, onSuccess }) {
    const [description, setDescription] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            setDescription(user.description || '');
        }
    }, [user]);

    const getToken = () => {
        const tokenCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
        return tokenCookie ? tokenCookie.split('=')[1] : null;
    };

    const handleSave = async () => {
        setLoading(true);
        setError(null);

        try {
            const token = getToken();
            if (!token) {
                throw new Error('لطفاً ابتدا وارد شوید');
            }

            const response = await fetch(`https://ftp-safenet.liara.run/api/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    description: description
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'خطا در ذخیره توضیحات');
            }

            onSuccess('توضیحات با موفقیت ذخیره شد');
            setIsEditing(false);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

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
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">توضیحات کاربر</h2>
                        {!isEditing && (
                            <motion.button
                                onClick={() => setIsEditing(true)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                                title="ویرایش توضیحات"
                            >
                                <FiEdit2 className="w-5 h-5" />
                            </motion.button>
                        )}
                    </div>
                    
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
                        >
                            {error}
                        </motion.div>
                    )}

                    <div className="space-y-4">
                        {isEditing ? (
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 min-h-[150px]"
                                placeholder="توضیحات را وارد کنید"
                            />
                        ) : (
                            <div className="p-4 bg-gray-50 rounded-lg min-h-[150px]">
                                <p className="text-gray-700 whitespace-pre-wrap">{description || 'توضیحاتی ثبت نشده است'}</p>
                            </div>
                        )}

                        <div className="flex justify-end space-x-3">
                            {isEditing ? (
                                <>
                                    <motion.button
                                        type="button"
                                        onClick={() => {
                                            setIsEditing(false);
                                            setDescription(user.description || '');
                                        }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                                    >
                                        انصراف
                                    </motion.button>
                                    <motion.button
                                        type="button"
                                        onClick={handleSave}
                                        disabled={loading}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`px-4 py-2 text-white rounded-lg transition-colors duration-200 ${
                                            loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                                        }`}
                                    >
                                        {loading ? (
                                            <motion.span
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                className="inline-block w-5 h-5 border-2 border-white rounded-full border-t-transparent"
                                            />
                                        ) : (
                                            <>
                                                <FiSave className="inline-block w-5 h-5 ml-2" />
                                                ذخیره
                                            </>
                                        )}
                                    </motion.button>
                                </>
                            ) : (
                                <motion.button
                                    type="button"
                                    onClick={onClose}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                                >
                                    بستن
                                </motion.button>
                            )}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
} 