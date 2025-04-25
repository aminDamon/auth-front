"use client"
import { motion } from 'framer-motion';
import { FiDownload, FiFile, FiFileText, FiImage, FiVideo } from 'react-icons/fi';

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
    // Get file icon and color based on file type
    const getFileIcon = (type) => fileTypeIcons[type] || fileTypeIcons.default;
    const getFileColor = (type) => fileTypeColors[type] || fileTypeColors.default;

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

                    <motion.a
                        href={file.url}
                        download
                        className="flex items-center px-4 py-2 bg-[#ff6600] text-white rounded-lg"
                        initial={false}
                        whileHover="hover"
                        whileTap="tap"
                        variants={buttonHover}
                    >
                        <span>دانلود</span>
                        <FiDownload className="mr-2" />
                    </motion.a>
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