import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { FormInput } from './ui/FormInput';
import { Button } from './ui/Button';
import { BackgroundElements } from './ui/BackgroundElements';

export const ResetPasswordForm = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      toast.error('لینک بازیابی رمز عبور نامعتبر است');
      router.push('/login');
    } else {
      setIsValidToken(true);
    }
  }, [token, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!token) {
      toast.error('لینک بازیابی رمز عبور نامعتبر است');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('رمز عبور و تکرار آن مطابقت ندارند');
      return;
    }

    if (password.length < 6) {
      toast.error('رمز عبور باید حداقل ۶ کاراکتر باشد');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'خطایی رخ داد');
      }

      toast.success('رمز عبور با موفقیت تغییر کرد');
      router.push('/login');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isValidToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 font-[vazir] overflow-hidden rtl">
        <BackgroundElements />
        
        <motion.div 
          className="max-w-md w-full space-y-8 relative bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/50"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <motion.h2 
              className="mt-2 text-center text-3xl font-extrabold text-gray-900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              لینک نامعتبر
            </motion.h2>
            <motion.p 
              className="mt-2 text-center text-sm text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              لطفاً یک لینک بازیابی رمز عبور جدید درخواست کنید.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Button 
              onClick={() => router.push('/login')}
              className="text-[#ff6600] bg-white hover:bg-gray-50 group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 ring-[#ff6600]/30 focus:ring-[#ff6600]/50 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              بازگشت به صفحه ورود
            </Button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

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
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#ff6600]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
          </motion.div>
          
          <motion.h2 
            className="mt-6 text-center text-3xl font-extrabold text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            بازیابی رمز عبور
          </motion.h2>
          <motion.p 
            className="mt-2 text-center text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            لطفاً رمز عبور جدید خود را وارد کنید
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
                id="password"
                name="password"
                type="password"
                required={true}
                placeholder="رمز عبور جدید"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="رمز عبور جدید"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-focus-within:text-[#ff6600] transition-colors duration-200" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                }
              />
              
              <FormInput
                id="confirm-password"
                name="confirm-password"
                type="password"
                required={true}
                placeholder="تکرار رمز عبور"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                label="تکرار رمز عبور"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-focus-within:text-[#ff6600] transition-colors duration-200" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
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
                loadingText="در حال بازیابی..."
              >
                بازیابی رمز عبور
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
};