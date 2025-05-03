'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiShield, FiGlobe, FiHash, FiInfo, FiPlus, FiCalendar, FiLayers, FiMonitor, FiUserCheck, FiShieldOff, FiPackage, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function AddUserForm({ onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
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
                        <div className="space-y-2">
                            {formData.system_ip.map((ip, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <div className="relative flex-1">
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <FiGlobe className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            value={ip}
                                            onChange={(e) => {
                                                const newIps = [...formData.system_ip];
                                                newIps[index] = e.target.value;
                                                setFormData({ ...formData, system_ip: newIps });
                                            }}
                                            className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="IP سیستم"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newIps = formData.system_ip.filter((_, i) => i !== index);
                                            setFormData({ ...formData, system_ip: newIps });
                                        }}
                                        className="p-2 text-red-500 hover:text-red-600"
                                    >
                                        <FiX className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, system_ip: [...formData.system_ip, ''] })}
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
                            {formData.serial_number.map((sn, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <div className="relative flex-1">
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <FiHash className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            value={sn}
                                            onChange={(e) => {
                                                const newSns = [...formData.serial_number];
                                                newSns[index] = e.target.value;
                                                setFormData({ ...formData, serial_number: newSns });
                                            }}
                                            className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="شماره سریال"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newSns = formData.serial_number.filter((_, i) => i !== index);
                                            setFormData({ ...formData, serial_number: newSns });
                                        }}
                                        className="p-2 text-red-500 hover:text-red-600"
                                    >
                                        <FiX className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, serial_number: [...formData.serial_number, ''] })}
                                className="flex items-center gap-2 text-blue-500 hover:text-blue-600"
                            >
                                <FiPlus className="w-5 h-5" />
                                <span>افزودن شماره سریال جدید</span>
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                    >
                        <label className="block text-sm font-medium text-gray-700 mb-2">تاریخ انقضا</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <FiCalendar className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="datetime-local"
                                value={formData.expire_date}
                                onChange={(e) => setFormData({ ...formData, expire_date: e.target.value })}
                                className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                    >
                        <label className="block text-sm font-medium text-gray-700 mb-2">نوع برنامه</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <FiLayers className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={formData.type_app}
                                onChange={(e) => setFormData({ ...formData, type_app: e.target.value })}
                                className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="نوع برنامه"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                    >
                        <label className="block text-sm font-medium text-gray-700 mb-2">سیستم عامل</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <FiMonitor className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={formData.os}
                                onChange={(e) => setFormData({ ...formData, os: e.target.value })}
                                className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="سیستم عامل"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                    >
                        <label className="block text-sm font-medium text-gray-700 mb-2">شخص</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <FiUserCheck className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={formData.person}
                                onChange={(e) => setFormData({ ...formData, person: e.target.value })}
                                className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="شخص"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                    >
                        <label className="block text-sm font-medium text-gray-700 mb-2">مدل فایروال</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <FiShieldOff className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={formData.firewall_model}
                                onChange={(e) => setFormData({ ...formData, firewall_model: e.target.value })}
                                className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="مدل فایروال"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                    >
                        <label className="block text-sm font-medium text-gray-700 mb-2">نام محصول</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <FiPackage className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={formData.product_name}
                                onChange={(e) => setFormData({ ...formData, product_name: e.target.value })}
                                className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="نام محصول"
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

                <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                >
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={formData.is_verified}
                            onChange={(e) => setFormData({ ...formData, is_verified: e.target.checked })}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700">تایید شده</span>
                    </label>
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