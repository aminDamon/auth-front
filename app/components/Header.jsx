"use client"
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { FiHome, FiPhone, FiUser, FiLogOut, FiDownload, FiSettings, FiLock } from 'react-icons/fi';

const Header = ({ darkMode, setDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const tokenCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
        const token = tokenCookie ? tokenCookie.split('=')[1] : null;

        if (!token) {
          throw new Error('لطفاً ابتدا وارد شوید');
        }

        const response = await fetch('https://ftp-safenet.liara.run/api/auth/me', {
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          throw new Error('خطا در دریافت اطلاعات کاربر');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('https://ftp-safenet.liara.run/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };


  const menuVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } }
  };

  return (
    <header
      className={`w-full z-50 transition-all duration-500 fixed top-0 backdrop-blur-md ${scrolled
        ? 'bg-white/15 shadow-lg py-2 border-b border-white/10'
        : 'bg-transparent py-4'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Back Link */}
          <div className="flex items-center">
            <Link
              href="https://www.safenet-co.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-xl px-5 py-2.5"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-amber-600/10 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl"></span>
              <div className="relative flex items-center gap-3 z-10">
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-2 rounded-lg shadow-md group-hover:shadow-amber-500/20 transition-all duration-300">
                  <FiHome className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600 group-hover:from-amber-600 group-hover:to-orange-600 transition-all duration-300">
                  بازگشت به safenet
                </span>
              </div>
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-5">
            {/* Downloads Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl transition-all duration-300 group"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-1.5 rounded-lg">
                <FiDownload className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">دانلود فایل‌ها</span>
            </motion.button>

            {/* Contact Button */}
            <motion.a
              href="tel:88934093"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 px-5 py-2.5 rounded-xl shadow-md hover:shadow-amber-500/30 transition-all duration-300 group"
            >
              <div className="bg-white/20 p-1.5 rounded-lg backdrop-blur-sm">
                <FiPhone className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-white" dir="ltr">۸۸۹۳۴۰۹۳-۵</span>
            </motion.a>

            {/* Profile Dropdown */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="relative group rounded-xl p-2.5 hover:bg-gray-100 transition-all duration-300"
              >
                <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl overflow-hidden shadow-md group-hover:shadow-amber-500/20 transition-all duration-300">
                  <FiUser className="w-5 h-5 text-white" />
                  {userData && (
                    <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                  )}
                </div>
              </motion.button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={menuVariants}
                    className="absolute left-0 mt-2 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100/50 overflow-hidden z-50"
                  >
                    <div className="p-6 border-b border-gray-100/50 bg-gradient-to-r from-amber-50 to-orange-50">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
                          <FiUser className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-base font-bold text-gray-900">{userData?.username || 'کاربر'}</p>
                          <p className="text-xs text-gray-500 truncate">{userData?.email || 'guest@safenet.com'}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-xs px-3 py-1 bg-gradient-to-r from-amber-100 to-orange-100 text-orange-700 rounded-full font-medium">
                          {userData?.role || 'کاربر عادی'}
                        </span>
                        {userData?.createdAt && (
                          <span className="text-xs text-gray-500">
                            {new Date(userData.createdAt).toLocaleDateString('fa-IR')}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-2">
                      <button
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200"
                      >
                        <FiSettings className="w-4 h-4 text-gray-500" />
                        <span>تنظیمات حساب کاربری</span>
                      </button>

                      <Link
                        href="/reset-password"
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-amber-600 hover:bg-amber-50 rounded-xl transition-all duration-200"
                      >
                        <FiLock className="w-4 h-4" />
                        <span>تغییر رمز عبور</span>
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 mt-1 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
                      >
                        <FiLogOut className="w-4 h-4" />
                        <span>خروج از حساب کاربری</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Downloads Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            className="absolute top-20 right-1/2 transform translate-x-1/2 w-11/12 max-w-3xl bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100/50 z-40 overflow-hidden"
          >
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">دانلود نرم‌افزارهای شرکت safenet</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  // { name: 'نرم‌افزار مدیریت شبکه', version: '3.2.1', size: '45MB' },
                  // { name: 'نرم‌افزار امنیت اطلاعات', version: '2.0.5', size: '32MB' },
                  // { name: 'نرم‌افزار پشتیبان‌گیری', version: '1.7.3', size: '28MB' },
                  // { name: 'نرم‌افزار مانیتورینگ', version: '4.1.0', size: '38MB' }
                  { name: 'نرم‌افزار Safeupdate ', version: '4.2.2', size: '112MB' },
                ].map((app, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-gray-800">{app.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">v{app.version}</span>
                          <span className="text-xs text-gray-500">{app.size}</span>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg shadow-md hover:shadow-amber-500/20"
                      >
                        <FiDownload className="w-4 h-4 text-white" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;