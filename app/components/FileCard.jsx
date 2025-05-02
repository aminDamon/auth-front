"use client"
import { motion } from 'framer-motion';
import { FiDownload, FiFile, FiFileText, FiImage, FiVideo } from 'react-icons/fi';
import { useState } from 'react';

// File type icons
const fileTypeIcons = {
    pdf: <FiFileText className="w-6 h-6" />,
    doc: <FiFile className="w-6 h-6" />,
    docx: <FiFile className="w-6 h-6" />,
    jpg: <FiImage className="w-6 h-6" />,
    png: <FiImage className="w-6 h-6" />,
    mp4: <FiVideo className="w-6 h-6" />,
    default: <FiFile className="w-6 h-6" />
};

// Color mapping for different file types
const fileTypeColors = {
    pdf: 'bg-red-50 text-red-500',
    doc: 'bg-blue-50 text-blue-500',
    docx: 'bg-blue-50 text-blue-500',
    jpg: 'bg-emerald-50 text-emerald-500',
    png: 'bg-emerald-50 text-emerald-500',
    mp4: 'bg-purple-50 text-purple-500',
    default: 'bg-gray-50 text-gray-500'
};

// File card animation variants
const fileCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.5,
            ease: "easeOut"
        }
    }),
    hover: {
        y: -4,
        scale: 1.02,
        boxShadow: "0 8px 25px -5px rgba(255, 102, 0, 0.2)",
        transition: {
            duration: 0.2,
            ease: "easeOut"
        }
    }
};

// Button hover animation
const buttonHover = {
    hover: {
        backgroundColor: "#e55c00",
        boxShadow: "0 4px 12px rgba(255, 102, 0, 0.3)",
        transition: {
            duration: 0.2
        }
    },
    tap: {
        scale: 0.95,
        boxShadow: "0 2px 5px rgba(255, 102, 0, 0.2)"
    }
};

const FileCard = ({ file, darkMode }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [error, setError] = useState(null);

    // Get file icon and color based on file type
    const getFileIcon = (type) => fileTypeIcons[type] || fileTypeIcons.default;
    const getFileColor = (type) => fileTypeColors[type] || fileTypeColors.default;

    const handleDownload = async (e) => {
        e.preventDefault();
        setIsDownloading(true);
        setError(null);

        try {
            const token = document.cookie.split(';').find(c => c.trim().startsWith('token='))?.split('=')[1];
            const response = await fetch(file.url, {
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'خطا در دانلود فایل');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = file.name;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <motion.div
            variants={fileCardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className={`relative rounded-lg overflow-hidden shadow-lg transition-all duration-300 ${
                darkMode ? 'bg-gray-800' : 'bg-white'
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <div className={`p-2 rounded-lg ${getFileColor(file.type)}`}>
                        {getFileIcon(file.type)}
                        </div>
                        <div>
                            <h3 className={`text-lg font-vazir font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                {file.name}
                            </h3>
                            <p className={`text-sm font-vazir ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {file.size}
                            </p>
                        </div>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className={`p-2 rounded-lg transition-colors duration-200 ${
                            darkMode 
                                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                                : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                    >
                        {isDownloading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                        )}
                    </motion.button>
                </div>

                <div className={`text-sm font-vazir ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <p>تاریخ آپلود: {new Date(file.uploadDate).toLocaleDateString('fa-IR')}</p>
                    <p>نوع فایل: {file.type}</p>
                </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                        className="mt-2 p-2 bg-red-100 text-red-700 rounded-lg text-sm font-vazir"
                            >
                                {error}
                            </motion.div>
                        )}
            </div>
        </motion.div>
    );
};

export default FileCard;