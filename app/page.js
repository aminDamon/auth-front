"use client"
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './layout/Header';
import PageTitle from './components/PageTitle';
import SearchBox from './components/SearchBox';
import FilesList from './components/FilesList';
import Footer from './components/Footer';
import { containerVariants } from './login/styles/animations';
import FileCard from './components/FileCard';
import UserManagement from './components/UserManagement';
import { useRouter } from 'next/navigation';

// تابع کمکی برای خواندن کوکی
const getCookie = (name) => {
  if (typeof document === 'undefined') return null;
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
};

export default function FilesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const router = useRouter();

  // Fetch files from API
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        // دریافت توکن از کوکی‌ها
        const token = getCookie('token');
        console.log('All cookies:', document.cookie); // برای دیباگ
        console.log('Token from cookies:', token); // برای دیباگ

        if (!token) {
          throw new Error('No token found in cookies');
        }

        const response = await fetch('http://localhost:5000/api/ftp/list', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          credentials: 'include' // ارسال کوکی‌ها با درخواست
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch files: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched files:', data);

        // تبدیل داده‌های FTP به فرمت مورد نیاز
        const formattedFiles = data.files.map(file => ({
          id: file.name,
          name: file.name,
          type: file.name.split('.').pop(),
          size: formatFileSize(file.size),
          date: formatFileDate(file.date),
          url: `http://localhost:5000/api/ftp/download/${encodeURIComponent(file.name)}`
        }));

        setFiles(formattedFiles);
        setFilteredFiles(formattedFiles);
      } catch (error) {
        console.error('Error fetching files:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFiles();
    checkUserRole();
  }, []);

  // Handle search
  useEffect(() => {
    setFilteredFiles(
      files.filter(file =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.type.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, files]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Helper function to format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Helper function to format file date
  const formatFileDate = (dateString) => {
    if (!dateString) return 'نامشخص';
    const date = new Date(dateString);
    return date.toLocaleDateString('fa-IR'); // فرمت تاریخ شمسی
  };

  const checkUserRole = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/me', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setUserRole(data.role);
      }
    } catch (error) {
      console.error('Error checking user role:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <PageTitle />
          <SearchBox onSearch={handleSearch} searchTerm={searchTerm} />
          {userRole === 'admin' && (
            <div className="mb-8">
              <UserManagement />
            </div>
          )}
          <FilesList files={filteredFiles} isLoading={isLoading} />
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}