'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiShield, FiGlobe, FiHash, FiInfo, FiX, FiSave, FiCalendar, FiLayers, FiMonitor, FiUserCheck, FiShieldOff, FiPackage, FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function EditUserModal({ user, onClose, onSuccess }) {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        role: 'user',
        is_verified: false,
        system_ip: [],
        serial_number: [],
        description: '',
        expire_date: '',
        type_app: '',
        os: '',
        person: '',
        firewall_model: '',
        product_name: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            setUserData({
                username: user.username || '',
                email: user.email || '',
                role: user.role || 'user',
                is_verified: user.is_verified || false,
                system_ip: Array.isArray(user.system_ip) ? user.system_ip : [],
                serial_number: Array.isArray(user.serial_number) ? user.serial_number : [],
                description: user.description || '',
                expire_date: user.expire_date || '',
                type_app: user.type_app || '',
                os: user.os || '',
                person: user.person || '',
                firewall_model: user.firewall_model || '',
                product_name: user.product_name || ''
            });
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const tokenCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
            const token = tokenCookie ? tokenCookie.split('=')[1] : null;

            if (!token) {
                throw new Error('لطفاً ابتدا وارد شوید');
            }

            const response = await fetch(`https://ftp-safenet.liara.run/api/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'خطا در بروزرسانی اطلاعات کاربر');
            }

            toast.success('اطلاعات کاربر با موفقیت بروزرسانی شد');
            onSuccess();
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
                    className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                    onClick={e => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">ویرایش اطلاعات کاربر</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-500 focus:outline-none"
                        >
                            <FiX className="h-6 w-6" />
                        </button>
                    </div>
                    
                    {error && (
                        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">نام کاربری</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <FiUser className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={userData.username}
                                        onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                                        required
                                        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">ایمیل</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <FiMail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        value={userData.email}
                                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                        required
                                        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">نقش</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <FiShield className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <select
                                        value={userData.role}
                                        onChange={(e) => setUserData({ ...userData, role: e.target.value })}
                                        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="user">کاربر</option>
                                        <option value="admin">مدیر</option>
                                    </select>
                                </div>
                            </div>

                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                            >
                                <label className="block text-sm font-medium text-gray-700 mb-2">IP سیستم</label>
                                <div className="space-y-2">
                                    {userData.system_ip.map((ip, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <div className="relative flex-1">
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                    <FiGlobe className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    type="text"
                                                    value={ip}
                                                    onChange={(e) => {
                                                        const newIps = [...userData.system_ip];
                                                        newIps[index] = e.target.value;
                                                        setUserData({ ...userData, system_ip: newIps });
                                                    }}
                                                    className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                    placeholder="IP سیستم"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newIps = userData.system_ip.filter((_, i) => i !== index);
                                                    setUserData({ ...userData, system_ip: newIps });
                                                }}
                                                className="p-2 text-red-500 hover:text-red-600"
                                            >
                                                <FiX className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => setUserData({ ...userData, system_ip: [...userData.system_ip, ''] })}
                                        className="flex items-center gap-2 text-blue-500 hover:text-blue-600"
                                    >
                                        <FiPlus className="w-5 h-5" />
                                        <span>افزودن IP جدید</span>
                                    </button>
                                </div>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                            >
                                <label className="block text-sm font-medium text-gray-700 mb-2">شماره سریال</label>
                                <div className="space-y-2">
                                    {userData.serial_number.map((sn, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <div className="relative flex-1">
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                    <FiHash className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    type="text"
                                                    value={sn}
                                                    onChange={(e) => {
                                                        const newSns = [...userData.serial_number];
                                                        newSns[index] = e.target.value;
                                                        setUserData({ ...userData, serial_number: newSns });
                                                    }}
                                                    className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                    placeholder="شماره سریال"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newSns = userData.serial_number.filter((_, i) => i !== index);
                                                    setUserData({ ...userData, serial_number: newSns });
                                                }}
                                                className="p-2 text-red-500 hover:text-red-600"
                                            >
                                                <FiX className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => setUserData({ ...userData, serial_number: [...userData.serial_number, ''] })}
                                        className="flex items-center gap-2 text-blue-500 hover:text-blue-600"
                                    >
                                        <FiPlus className="w-5 h-5" />
                                        <span>افزودن شماره سریال جدید</span>
                                    </button>
                                </div>
                            </motion.div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">تاریخ انقضا</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <FiCalendar className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="datetime-local"
                                        value={userData.expire_date ? new Date(userData.expire_date).toISOString().slice(0, 16) : ''}
                                        onChange={(e) => setUserData({ ...userData, expire_date: e.target.value })}
                                        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">نوع برنامه</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <FiLayers className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={userData.type_app}
                                        onChange={(e) => setUserData({ ...userData, type_app: e.target.value })}
                                        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">سیستم عامل</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <FiMonitor className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={userData.os}
                                        onChange={(e) => setUserData({ ...userData, os: e.target.value })}
                                        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">شخص</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <FiUserCheck className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={userData.person}
                                        onChange={(e) => setUserData({ ...userData, person: e.target.value })}
                                        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">مدل فایروال</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <FiShieldOff className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={userData.firewall_model}
                                        onChange={(e) => setUserData({ ...userData, firewall_model: e.target.value })}
                                        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">نام محصول</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <FiPackage className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={userData.product_name}
                                        onChange={(e) => setUserData({ ...userData, product_name: e.target.value })}
                                        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">توضیحات</label>
                                <div className="relative">
                                    <div className="absolute top-3 right-3 pointer-events-none">
                                        <FiInfo className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <textarea
                                        value={userData.description}
                                        onChange={(e) => setUserData({ ...userData, description: e.target.value })}
                                        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
                                    />
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={userData.is_verified}
                                        onChange={(e) => setUserData({ ...userData, is_verified: e.target.checked })}
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm font-medium text-gray-700">تایید شده</span>
                                </label>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                            >
                                انصراف
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                        در حال ذخیره...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center">
                                        <FiSave className="ml-2" />
                                        ذخیره تغییرات
                                    </span>
                                )}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
} 