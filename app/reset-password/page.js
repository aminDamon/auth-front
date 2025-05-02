'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLock } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { FormInput } from './components/ui/FormInput';
import { Button } from './components/ui/Button';
import { BackgroundElements } from './components/ui/BackgroundElements';

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (newPassword !== confirmPassword) {
      toast.error('رمز عبور جدید و تکرار آن مطابقت ندارند');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          currentPassword,
          newPassword 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'خطا در تغییر رمز عبور');
      }

      toast.success('رمز عبور با موفقیت تغییر یافت');
      router.push('/login');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 font-[vazir] rtl">
      <BackgroundElements />

      <motion.div 
        className="max-w-md w-full space-y-8 relative bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/50 z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <motion.div 
            className="mx-auto h-16 w-16 relative"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#ff6600] to-[#ff8533] rounded-full opacity-20 blur-xl" />
            <div className="relative h-full w-full flex items-center justify-center">
              <FiLock className="h-8 w-8 text-[#ff6600]" />
            </div>
          </motion.div>
          
          <motion.h2 
            className="mt-6 text-center text-3xl font-extrabold text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            تغییر رمز عبور
          </motion.h2>
          <motion.p 
            className="mt-2 text-center text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            لطفاً رمز عبور فعلی و رمز عبور جدید خود را وارد کنید
          </motion.p>
        </div>
        
        <AnimatePresence>
          <motion.form 
            className="mt-8 space-y-6" 
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <motion.div 
              className="rounded-xl shadow-sm space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <FormInput
                id="currentPassword"
                name="currentPassword"
                type="password"
                required={true}
                placeholder="رمز عبور فعلی"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                label="رمز عبور فعلی"
                icon={
                  <FiLock className="h-5 w-5 text-gray-400 group-focus-within:text-[#ff6600] transition-colors duration-200" />
                }
              />

              <FormInput
                id="newPassword"
                name="newPassword"
                type="password"
                required={true}
                placeholder="رمز عبور جدید"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                label="رمز عبور جدید"
                icon={
                  <FiLock className="h-5 w-5 text-gray-400 group-focus-within:text-[#ff6600] transition-colors duration-200" />
                }
              />

              <FormInput
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required={true}
                placeholder="تکرار رمز عبور جدید"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                label="تکرار رمز عبور جدید"
                icon={
                  <FiLock className="h-5 w-5 text-gray-400 group-focus-within:text-[#ff6600] transition-colors duration-200" />
                }
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Button
                type="submit"
                disabled={loading}
                isLoading={loading}
                loadingText="در حال تغییر رمز عبور..."
              >
                تغییر رمز عبور
              </Button>
            </motion.div>
            
            <motion.div 
              className="flex items-center justify-center mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <a href="/login" className="font-medium text-sm text-gray-600 hover:text-[#ff6600] transition-colors duration-200">
                بازگشت به صفحه ورود
              </a>
            </motion.div>
          </motion.form>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}