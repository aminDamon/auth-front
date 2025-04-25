"use client"
import { motion } from 'framer-motion';
import { FiDownload, FiFile, FiFileText, FiImage, FiVideo } from 'react-icons/fi';
import { useState } from 'react';

// File type icons with more vibrant colors
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

// Enhanced file card animation variants
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

const FileCard = ({ file, index }) => {
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
            const response = await fetch(file.url, {
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${document.cookie.split(';').find(c => c.trim().startsWith('token='))?.split('=')[1]}`
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
        } catch (error) {
            console.error('Download error:', error);
            // تبدیل خطاها به فارسی
            let errorMessage = 'خطا در دانلود فایل';
            if (error.message.includes('token')) {
                errorMessage = 'لطفاً ابتدا وارد شوید';
            } else if (error.message.includes('network')) {
                errorMessage = 'خطا در اتصال به سرور';
            } else if (error.message.includes('zip')) {
                errorMessage = 'فقط فایل‌های zip قابل دانلود هستند';
            }
            setError(errorMessage);
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <motion.div
            key={file.id}
            custom={index}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={fileCardVariants}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-orange-100"
        >
            <div className="p-6">
                <div className="flex items-center mb-4">
                    <motion.div
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        className={`w-12 h-12 flex items-center justify-center rounded-full ${getFileColor(file.type)}`}
                    >
                        {getFileIcon(file.type)}
                    </motion.div>
                    <div className="flex-1 min-w-0 ml-4">
                        <h3 className="text-lg font-semibold text-gray-800 truncate">{file.name}</h3>
                        <p className="text-sm text-gray-500">{file.type.toUpperCase()} • {file.size}</p>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">{file.date}</span>

                    <div className="relative">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute bottom-full mb-2 right-0 bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg shadow-lg border border-red-100"
                            >
                                {error}
                            </motion.div>
                        )}

                        <motion.button
                            onClick={handleDownload}
                            disabled={isDownloading}
                            className={`flex items-center px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                                isDownloading 
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                                    : 'bg-[#ff6600] text-white hover:bg-[#e55c00]'
                            }`}
                            initial={false}
                            whileHover={!isDownloading ? "hover" : {}}
                            whileTap={!isDownloading ? "tap" : {}}
                            variants={buttonHover}
                        >
                            {isDownloading ? (
                                <>
                                    <span>در حال دانلود...</span>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                </>
                            ) : (
                                <>
                                    <span>دانلود</span>
                                    <FiDownload className="mr-2" />
                                </>
                            )}
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Subtle glow effect on hover */}
            <motion.div
                className="absolute inset-0 rounded-xl pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                    boxShadow: "inset 0 0 0 1px rgba(255, 102, 0, 0.1)"
                }}
            />
        </motion.div>
    );
};

export default FileCard;