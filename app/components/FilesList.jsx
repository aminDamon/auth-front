"use client"
import { motion, AnimatePresence } from 'framer-motion';
import FileCard from './FileCard';

// Container animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3
        }
    }
};

const FilesList = ({ files, isLoading }) => {
    return (
        <AnimatePresence>
            {isLoading ? (
                <motion.div
                    className="flex justify-center items-center py-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="w-12 h-12 rounded-full border-4 border-[#ff6600] border-t-transparent animate-spin"></div>
                </motion.div>
            ) : (
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    {files.length > 0 ? (
                        files.map((file, index) => (
                            <FileCard key={file.id} file={file} index={index} />
                        ))
                    ) : (
                        <motion.div
                            className="col-span-full text-center py-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <div className="text-4xl mb-4">😕</div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">هیچ فایلی یافت نشد</h3>
                            <p className="text-gray-500">لطفا عبارت جستجوی خود را تغییر دهید</p>
                        </motion.div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FilesList;