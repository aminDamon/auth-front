"use client"
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
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

// انیمیشن‌های جدید
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const slideIn = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const scale = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

export default function FilesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const router = useRouter();

  // Fetch files from API
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const token = getCookie('token');
        if (!token) {
          throw new Error('No token found in cookies');
        }

        const response = await fetch('https://ftp-safenet.liara.run/api/ftp/list', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch files: ${response.status}`);
        }

        const data = await response.json();
        const formattedFiles = data.files
          .filter(file => file.name.toLowerCase().endsWith('.zip'))
          .map(file => ({
            id: file.name,
            name: file.name,
            type: 'zip',
            size: formatFileSize(file.size),
            date: formatFileDate(file.date),
            url: `https://ftp-safenet.liara.run/api/ftp/download/${encodeURIComponent(file.name)}`
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
    // بررسی حالت تاریک/روشن سیستم
    if (typeof window !== 'undefined') {
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  // Handle search and sorting
  useEffect(() => {
    let result = files.filter(file =>
      file.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // مرتب‌سازی
    result.sort((a, b) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortBy === 'date') {
        return sortOrder === 'asc'
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      } else if (sortBy === 'size') {
        return sortOrder === 'asc'
          ? parseFloat(a.size) - parseFloat(b.size)
          : parseFloat(b.size) - parseFloat(a.size);
      }
      return 0;
    });

    setFilteredFiles(result);
  }, [searchTerm, files, sortBy, sortOrder]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatFileDate = (dateString) => {
    if (!dateString) return 'نامشخص';
    const date = new Date(dateString);
    return date.toLocaleDateString('fa-IR');
  };

  const checkUserRole = async () => {
    try {
      const response = await fetch('https://ftp-safenet.liara.run/api/auth/me', {
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
      <div className={`flex justify-center items-center h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }


  return (
    <div
      className={`min-h-screen transition-all duration-500 ${darkMode
        ? 'bg-gradient-to-br from-gray-900 to-orange-950 text-white'
        : 'bg-gradient-to-br from-amber-50 to-orange-50 text-gray-800'
        } font-vazir relative overflow-hidden`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {!darkMode ? (
          <>
            <div className="absolute top-0 left-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          </>
        ) : (
          <>
            <div className="absolute top-0 left-0 w-96 h-96 bg-amber-700/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          </>
        )}
      </div>

      {/* Header */}
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-24 relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          {/* Page Title */}
          <motion.div variants={fadeIn} className='mt-[120px]'>
            <PageTitle darkMode={darkMode} />
          </motion.div>

          {/* Search Box */}
          <motion.div variants={fadeIn} className="mb-12">
            <SearchBox
              onSearch={handleSearch}
              searchTerm={searchTerm}
              darkMode={darkMode}
            />
          </motion.div>

          {/* Admin Panel */}
          {userRole === 'admin' && (
            <motion.div
              variants={fadeIn}
              className="mb-12"
            >
              <UserManagement darkMode={darkMode} />
            </motion.div>
          )}

          {/* Files List */}
          <AnimatePresence mode="wait">
            <FilesList
              files={filteredFiles}
              isLoading={isLoading}
              darkMode={darkMode}
            />
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
}