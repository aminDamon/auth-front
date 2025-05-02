'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUsers, FiList, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeItem, setActiveItem] = useState('users');
    const router = useRouter();

    const menuItems = [
        { id: 'users', label: 'مدیریت کاربران', icon: FiUsers, path: '/admin/users' },
        { id: 'logs', label: 'مشاهده لاگ‌ها', icon: FiList, path: '/admin/log' }
    ];

    const handleLogout = () => {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'isAdmin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        router.push('/login');
    };

    return (
        <motion.div
            initial={{ x: -300 }}
            animate={{ x: isOpen ? 0 : -300 }}
            transition={{ type: 'spring', damping: 20 }}
            className={`fixed top-0 right-0 h-full bg-white shadow-lg z-50 ${
                isCollapsed ? 'w-20' : 'w-64'
            }`}
        >
            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    {!isCollapsed && (
                        <motion.h2
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xl font-bold text-gray-800"
                        >
                            پنل مدیریت
                        </motion.h2>
                    )}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        {isCollapsed ? <FiMenu size={20} /> : <FiX size={20} />}
                    </button>
                </div>

                {/* Menu Items */}
                <div className="flex-1 py-4">
                    {menuItems.map((item) => (
                        <motion.button
                            key={item.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                                setActiveItem(item.id);
                                router.push(item.path);
                            }}
                            className={`w-full flex items-center p-4 transition-colors ${
                                activeItem === item.id
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            <item.icon size={20} className="ml-3" />
                            {!isCollapsed && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-sm font-medium"
                                >
                                    {item.label}
                                </motion.span>
                            )}
                        </motion.button>
                    ))}
                </div>

                {/* Logout Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLogout}
                    className="flex items-center p-4 text-red-600 hover:bg-red-50 transition-colors"
                >
                    <FiLogOut size={20} className="ml-3" />
                    {!isCollapsed && (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-sm font-medium"
                        >
                            خروج
                        </motion.span>
                    )}
                </motion.button>
            </div>
        </motion.div>
    );
} 