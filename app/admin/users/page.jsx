'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiLock, FiFileText } from 'react-icons/fi';
import AddUserForm from './AddUserForm';
import EditUserModal from './EditUserModal';
import ChangePasswordModal from './ChangePasswordModal';
import DeleteUserModal from './DeleteUserModal';
import DescriptionModal from './DescriptionModal';
import Sidebar from '../../components/Sidebar';

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddUser, setShowAddUser] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            // Get token from cookie
            const tokenCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
            const token = tokenCookie ? tokenCookie.split('=')[1] : null;

            if (!token) {
                throw new Error('لطفاً ابتدا وارد شوید');
            }

            const response = await fetch('https://ftp-safenet.liara.run/api/users', {
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('خطا در دریافت اطلاعات کاربران');
            }
            const data = await response.json();
            // Ensure data is an array
            setUsers(Array.isArray(data) ? data : []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            setUsers([]); // Set empty array on error
            setLoading(false);
        }
    };

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    };

    const handlePasswordClick = (user) => {
        setSelectedUser(user);
        setIsPasswordModalOpen(true);
    };

    const handleDeleteClick = (user) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    };

    const handleDescriptionClick = (user) => {
        setSelectedUser(user);
        setIsDescriptionModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-vazir">
            <Sidebar />
            <main className="mr-64 p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-800">مدیریت کاربران</h1>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowAddUser(true)}
                            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <FiPlus />
                            <span>افزودن کاربر</span>
                        </motion.button>
                    </div>

                    {showAddUser && (
                        <AddUserForm
                            onClose={() => setShowAddUser(false)}
                            onSuccess={() => {
                                setShowAddUser(false);
                                fetchUsers();
                            }}
                        />
                    )}

                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">نام کاربری</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ایمیل</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">نقش</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">IP سیستم</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">شماره سریال</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">عملیات</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.map((user) => (
                                        <motion.tr
                                            key={user._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.username}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                                                }`}>
                                                    {user.role === 'admin' ? 'مدیر' : 'کاربر'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.system_ip || '-'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.serial_number || '-'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <div className="flex items-center gap-2">
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => handleDescriptionClick(user)}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                                                        title="مشاهده توضیحات"
                                                    >
                                                        <FiFileText />
                                                    </motion.button>
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => handleEditClick(user)}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                                                        title="ویرایش"
                                                    >
                                                        <FiEdit2 />
                                                    </motion.button>
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => handlePasswordClick(user)}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                                                        title="تغییر رمز"
                                                    >
                                                        <FiLock />
                                                    </motion.button>
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => handleDeleteClick(user)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                                        title="حذف"
                                                    >
                                                        <FiTrash2 />
                                                    </motion.button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <AnimatePresence>
                        {isEditModalOpen && (
                            <EditUserModal
                                user={selectedUser}
                                onClose={() => {
                                    setIsEditModalOpen(false);
                                    setSelectedUser(null);
                                }}
                                onSuccess={() => {
                                    setIsEditModalOpen(false);
                                    setSelectedUser(null);
                                    fetchUsers();
                                }}
                            />
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {isPasswordModalOpen && (
                            <ChangePasswordModal
                                user={selectedUser}
                                onClose={() => {
                                    setIsPasswordModalOpen(false);
                                    setSelectedUser(null);
                                }}
                                onSuccess={() => {
                                    setIsPasswordModalOpen(false);
                                    setSelectedUser(null);
                                    fetchUsers();
                                }}
                            />
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {isDeleteModalOpen && (
                            <DeleteUserModal
                                user={selectedUser}
                                onClose={() => {
                                    setIsDeleteModalOpen(false);
                                    setSelectedUser(null);
                                }}
                                onSuccess={() => {
                                    setIsDeleteModalOpen(false);
                                    setSelectedUser(null);
                                    fetchUsers();
                                }}
                            />
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {isDescriptionModalOpen && (
                            <DescriptionModal
                                user={selectedUser}
                                onClose={() => {
                                    setIsDescriptionModalOpen(false);
                                    setSelectedUser(null);
                                }}
                                onSuccess={() => {
                                    setIsDescriptionModalOpen(false);
                                    setSelectedUser(null);
                                    fetchUsers();
                                }}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
} 