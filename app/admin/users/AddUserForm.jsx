'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiShield, FiGlobe, FiHash, FiInfo, FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function AddUserForm({ onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'user',
        system_ip: '',
        serial_number: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getToken = () => {
        const tokenCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
        return tokenCookie ? tokenCookie.split('=')[1] : null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const token = getToken();
            if (!token) {
                throw new Error('لطفاً ابتدا وارد شوید');
            }

            const response = await fetch('https://ftp-safenet.liara.run/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'خطا در ایجاد کاربر');
            }

            const newUser = await response.json();
            toast.success('کاربر جدید با موفقیت اضافه شد');
            setFormData({
                username: '',
                email: '',
                password: '',
                role: 'user',
                system_ip: '',
                serial_number: '',
                description: ''
            });
            
            if (onSuccess) {
                onSuccess();
            }
            if (onClose) {
                onClose();
            }
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-8 mb-8 border border-gray-100"
        >
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">افزودن کاربر جدید</h2>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center"
                >
                    <FiPlus className="w-5 h-5 text-blue-600" />
                </motion.div>
            </div>
            
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl shadow-sm"
                    >
                        {error}
                    </motion.div>
                )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                    >
                        <label className="block text-sm font-medium text-gray-700 mb-2">نام کاربری</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <FiUser className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                required
                                className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="نام کاربری"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                    >
                        <label className="block text-sm font-medium text-gray-700 mb-2">ایمیل</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <FiMail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="ایمیل"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                    >
                        <label className="block text-sm font-medium text-gray-700 mb-2">رمز عبور</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <FiLock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                                minLength={6}
                                className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="رمز عبور"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                    >
                        <label className="block text-sm font-medium text-gray-700 mb-2">نقش</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <FiShield className="h-5 w-5 text-gray-400" />
                            </div>
                            <select
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
                            >
                                <option value="user">کاربر</option>
                                <option value="admin">مدیر</option>
                            </select>
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                    >
                        <label className="block text-sm font-medium text-gray-700 mb-2">IP سیستم</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <FiGlobe className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={formData.system_ip}
                                onChange={(e) => setFormData({ ...formData, system_ip: e.target.value })}
                                className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="IP سیستم"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                    >
                        <label className="block text-sm font-medium text-gray-700 mb-2">شماره سریال</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <FiHash className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={formData.serial_number}
                                onChange={(e) => setFormData({ ...formData, serial_number: e.target.value })}
                                className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="شماره سریال"
                            />
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                >
                    <label className="block text-sm font-medium text-gray-700 mb-2">توضیحات</label>
                    <div className="relative">
                        <div className="absolute top-3 right-3 pointer-events-none">
                            <FiInfo className="h-5 w-5 text-gray-400" />
                        </div>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 min-h-[120px]"
                            placeholder="توضیحات"
                        />
                    </div>
                </motion.div>

                <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full px-6 py-3 text-white rounded-xl transition-all duration-200 shadow-lg ${
                        loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                    }`}
                >
                    {loading ? (
                        <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="inline-block w-6 h-6 border-3 border-white rounded-full border-t-transparent"
                        />
                    ) : (
                        <span className="flex items-center justify-center">
                            <FiPlus className="ml-2 w-5 h-5" />
                            افزودن کاربر
                        </span>
                    )}
                </motion.button>
            </form>
        </motion.div>
    );
} 