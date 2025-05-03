'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiFileText, FiCalendar, FiUser, FiShield, FiGlobe, FiHash, FiPackage, FiMonitor } from 'react-icons/fi';
import { format } from 'date-fns-jalali';

export default function ContractModal({ user, onClose }) {
    if (!user) return null;

    const formatDate = (dateString) => {
        if (!dateString) return 'نامشخص';
        try {
            return format(new Date(dateString), 'yyyy/MM/dd');
        } catch (error) {
            return 'نامشخص';
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-t-2xl">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <FiFileText className="w-8 h-8" />
                                <h2 className="text-2xl font-bold">قرارداد استفاده از نرم‌افزار</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <FiX className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Contract Content */}
                    <div className="p-8 space-y-8">
                        {/* Company Info */}
                        <div className="text-center border-b pb-6">
                            <h3 className="text-3xl font-bold text-gray-800 mb-2">Safenet</h3>
                            <p className="text-gray-600">شبکه امن اندیشه فردا سهامی خاص</p>
                        </div>

                        {/* Contract Details */}
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                                        <FiUser className="w-5 h-5" />
                                        <span className="font-medium">مشخصات کاربر</span>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-gray-800">
                                            <span className="font-medium">نام کاربری:</span> {user.username}
                                        </p>
                                        <p className="text-gray-800">
                                            <span className="font-medium">ایمیل:</span> {user.email}
                                        </p>
                                        <p className="text-gray-800">
                                            <span className="font-medium">نقش:</span> {user.role === 'admin' ? 'مدیر' : 'کاربر'}
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                                        <FiPackage className="w-5 h-5" />
                                        <span className="font-medium">مشخصات نرم‌افزار</span>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-gray-800">
                                            <span className="font-medium">نام محصول:</span> {user.product_name || 'نامشخص'}
                                        </p>
                                        <p className="text-gray-800">
                                            <span className="font-medium">نوع برنامه:</span> {user.type_app || 'نامشخص'}
                                        </p>
                                        <p className="text-gray-800">
                                            <span className="font-medium">سیستم عامل:</span> {user.os || 'نامشخص'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                                        <FiShield className="w-5 h-5" />
                                        <span className="font-medium">مشخصات فایروال</span>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-gray-800">
                                            <span className="font-medium">مدل فایروال:</span> {user.firewall_model || 'نامشخص'}
                                        </p>
                                        <p className="text-gray-800">
                                            <span className="font-medium">شماره سریال:</span>
                                            <ul className="list-disc list-inside mt-1">
                                                {user.serial_number && user.serial_number.length > 0 ? (
                                                    user.serial_number.map((sn, index) => (
                                                        <li key={index} className="text-gray-800">{sn}</li>
                                                    ))
                                                ) : (
                                                    <li className="text-gray-800">نامشخص</li>
                                                )}
                                            </ul>
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                                        <FiGlobe className="w-5 h-5" />
                                        <span className="font-medium">مشخصات شبکه</span>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-gray-800">
                                            <span className="font-medium">IP سیستم:</span>
                                            <ul className="list-disc list-inside mt-1">
                                                {user.system_ip && user.system_ip.length > 0 ? (
                                                    user.system_ip.map((ip, index) => (
                                                        <li key={index} className="text-gray-800">{ip}</li>
                                                    ))
                                                ) : (
                                                    <li className="text-gray-800">نامشخص</li>
                                                )}
                                            </ul>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-xl">
                                <div className="flex items-center gap-2 text-gray-600 mb-2">
                                    <FiCalendar className="w-5 h-5" />
                                    <span className="font-medium">مدت قرارداد</span>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-gray-800">
                                        <span className="font-medium">تاریخ انقضا:</span> {formatDate(user.expire_date)}
                                    </p>
                                </div>
                            </div>

                            {user.description && (
                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                                        <FiFileText className="w-5 h-5" />
                                        <span className="font-medium">توضیحات</span>
                                    </div>
                                    <p className="text-gray-800 whitespace-pre-line">{user.description}</p>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="border-t pt-6 text-center">
                            <p className="text-gray-600">
                                این قرارداد به صورت الکترونیکی صادر شده و معتبر می‌باشد.
                            </p>
                            <p className="text-gray-600 mt-2">
                                تاریخ صدور: {formatDate(new Date())}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
} 