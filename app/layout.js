import './globals.css'
import { Vazirmatn } from 'next/font/google'
import Footer from "./components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from 'react-hot-toast';

const vazir = Vazirmatn({ 
  subsets: ['arabic'],
  display: 'swap',
})

export const metadata = {
  title: 'سامانه مدیریت فایل',
  description: 'سیستم مدیریت و اشتراک‌گذاری فایل‌ها',
}

export default function RootLayout({ children }) {
  // اضافه کردن لاگ برای بررسی نسخه
  console.log("Version: 1.0.1 - New Cookie System");
  
  // فقط در محیط توسعه لاگ نمایش داده شود
  if (process.env.NODE_ENV === 'development') {
    console.log("Page loaded - amin");
  }

  return (
    <html lang="fa" dir="rtl">
      <body className={vazir.className}>
        <Toaster position="top-right" />
        <main>{children}</main>
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={true}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}
