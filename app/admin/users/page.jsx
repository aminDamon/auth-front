'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import AddUserForm from './AddUserForm';
import ChangePasswordModal from './ChangePasswordModal';

export default function AdminUsersPage() {
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const getToken = () => {
            const tokenCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
            return tokenCookie ? tokenCookie.split('=')[1] : null;
        };

        const checkAdminAccess = async () => {
            const token = getToken();
            const isAdmin = document.cookie.split(';').some(cookie => cookie.trim().startsWith('isAdmin='));

            if (!token || !isAdmin) {
                router.push('/');
                return false;
            }

            try {
                const response = await fetch('http://localhost:5000/api/auth/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    router.push('/');
                    return false;
                }

                const data = await response.json();
                if (data.role !== 'admin') {
                    router.push('/');
                    return false;
                }

                return true;
            } catch (err) {
                router.push('/');
                return false;
            }
        };

        const fetchUsers = async () => {
            if (!(await checkAdminAccess())) return;

            try {
                const token = getToken();
                const response = await fetch('http://localhost:5000/api/users', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.status === 401) {
                    router.push('/login');
                    return;
                }

                if (response.status === 403) {
                    setError('شما دسترسی به این صفحه را ندارید');
                    return;
                }

                const data = await response.json();
                if (Array.isArray(data)) {
                    setUsers(data);
                } else {
                    setUsers([]);
                    setError('داده‌های دریافتی نامعتبر است');
                }
            } catch (err) {
                setError('خطا در دریافت اطلاعات کاربران');
                setUsers([]);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [router]);

    const handleUserAdded = (newUser) => {
        setUsers(prevUsers => [newUser, ...prevUsers]);
    };

    const handlePasswordChangeSuccess = () => {
        // می‌توانید یک پیام موفقیت نشان دهید یا لیست کاربران را به‌روزرسانی کنید
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent"
                />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-100 border border-red-400 text-red-700 px-8 py-4 rounded-lg shadow-lg"
                >
                    {error}
                </motion.div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold text-gray-900">مدیریت کاربران</h1>
                    <p className="mt-2 text-sm text-gray-600">مدیریت و نظارت بر کاربران سیستم</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <AddUserForm onUserAdded={handleUserAdded} />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-8 bg-white rounded-xl shadow-sm overflow-hidden"
                >
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">نام کاربری</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ایمیل</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">نقش</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">وضعیت</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">عملیات</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users && users.length > 0 ? (
                                    users.map((user, index) => (
                                        <motion.tr
                                            key={user.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="hover:bg-gray-50 transition-colors duration-150"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.username}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    user.role === 'admin' 
                                                        ? 'bg-purple-100 text-purple-800' 
                                                        : 'bg-blue-100 text-blue-800'
                                                }`}>
                                                    {user.role === 'admin' ? 'مدیر' : 'کاربر'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    user.isVerified 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {user.isVerified ? 'تأیید شده' : 'در انتظار تأیید'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <motion.button
                                                    onClick={() => {
                                                        setSelectedUserId(user.id);
                                                        setIsModalOpen(true);
                                                    }}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                                >
                                                    تغییر رمز عبور
                                                </motion.button>
                                            </td>
                                        </motion.tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                                            هیچ کاربری یافت نشد
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>

            <ChangePasswordModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                userId={selectedUserId}
                onSuccess={handlePasswordChangeSuccess}
            />
        </motion.div>
    );
} 