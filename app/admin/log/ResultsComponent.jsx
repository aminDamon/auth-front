import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    HiDownload, HiClock, HiUser, HiKey, HiGlobe, 
    HiExclamationCircle, HiChevronDown, HiChevronUp,
    HiClipboard, HiSearch
} from 'react-icons/hi';

const ResultsComponent = ({ logs, isLoading }) => {
    const [expandedLog, setExpandedLog] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [copiedIndex, setCopiedIndex] = useState(null);

    const downloadLogs = () => {
        const blob = new Blob([logs.join('\n')], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'filtered_logs.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('fa-IR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const getStatusColor = (status) => {
        if (!status) return 'text-gray-600';
        if (status.startsWith('2')) return 'text-green-600';
        if (status.startsWith('3')) return 'text-blue-600';
        if (status.startsWith('4')) return 'text-yellow-600';
        if (status.startsWith('5')) return 'text-red-600';
        return 'text-gray-600';
    };

    const getStatusLabel = (status) => {
        if (!status) return 'نامشخص';
        if (status.startsWith('2')) return 'موفق';
        if (status.startsWith('3')) return 'تغییر مسیر';
        if (status.startsWith('4')) return 'خطای کلاینت';
        if (status.startsWith('5')) return 'خطای سرور';
        return 'نامشخص';
    };

    const copyToClipboard = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const filteredLogs = logs.filter(log => {
        if (!searchTerm) return true;
        const searchLower = searchTerm.toLowerCase();
        return (
            log.ip.toLowerCase().includes(searchLower) ||
            (log.serial && log.serial.toLowerCase().includes(searchLower)) ||
            log.path.toLowerCase().includes(searchLower) ||
            log.status.includes(searchTerm)
        );
    });

    return (
        <AnimatePresence>
            {logs.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="results-section"
                >
                    <div className="results-header">
                        <h2 className="results-title">نتایج جستجو</h2>
                        <div className="results-actions">
                            <div className="search-box">
                                <HiSearch className="search-icon" />
                                <input
                                    type="text"
                                    placeholder="جستجو در نتایج..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="search-input"
                                />
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={downloadLogs}
                                className="download-button"
                            >
                                <HiDownload className="download-icon" /> دانلود نتایج
                            </motion.button>
                        </div>
                    </div>

                    <div className="results-stats">
                        <span className="stats-item">
                            <span className="stats-label">تعداد کل:</span>
                            <span className="stats-value">{logs.length}</span>
                        </span>
                        <span className="stats-item">
                            <span className="stats-label">نمایش:</span>
                            <span className="stats-value">{filteredLogs.length}</span>
                        </span>
                    </div>

                    <div className="results-container">
                        {filteredLogs.map((log, index) => (
                            <motion.div
                                key={index}
                                className={`log-card ${expandedLog === index ? 'expanded' : ''}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <div 
                                    className="log-header"
                                    onClick={() => setExpandedLog(expandedLog === index ? null : index)}
                                >
                                    <div className="log-status">
                                        <HiExclamationCircle className={`status-icon ${getStatusColor(log.status)}`} />
                                        <span className={`status-code ${getStatusColor(log.status)}`}>
                                            {log.status}
                                        </span>
                                        <span className="status-label">{getStatusLabel(log.status)}</span>
                                    </div>
                                    <div className="log-timestamp">
                                        <HiClock className="timestamp-icon" />
                                        <span>{formatDate(log.timestamp)}</span>
                                    </div>
                                    <div className="expand-icon">
                                        {expandedLog === index ? <HiChevronUp /> : <HiChevronDown />}
                                    </div>
                                </div>
                                
                                <AnimatePresence>
                                    {expandedLog === index && (
                                        <motion.div
                                            className="log-details"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                        >
                                            <div className="log-row">
                                                <HiUser className="detail-icon" />
                                                <span className="detail-label">IP:</span>
                                                <span className="detail-value">{log.ip}</span>
                                                <button
                                                    className="copy-button"
                                                    onClick={() => copyToClipboard(log.ip, index)}
                                                >
                                                    <HiClipboard className="copy-icon" />
                                                    {copiedIndex === index ? 'کپی شد!' : 'کپی'}
                                                </button>
                                            </div>
                                            
                                            {log.serial && (
                                                <div className="log-row">
                                                    <HiKey className="detail-icon" />
                                                    <span className="detail-label">سریال:</span>
                                                    <span className="detail-value">{log.serial}</span>
                                                    <button
                                                        className="copy-button"
                                                        onClick={() => copyToClipboard(log.serial, index)}
                                                    >
                                                        <HiClipboard className="copy-icon" />
                                                        {copiedIndex === index ? 'کپی شد!' : 'کپی'}
                                                    </button>
                                                </div>
                                            )}
                                            
                                            <div className="log-row path-row">
                                                <HiGlobe className="detail-icon" />
                                                <span className="detail-label">مسیر:</span>
                                                <span className="detail-value path-value">{log.path}</span>
                                                <button
                                                    className="copy-button"
                                                    onClick={() => copyToClipboard(log.path, index)}
                                                >
                                                    <HiClipboard className="copy-icon" />
                                                    {copiedIndex === index ? 'کپی شد!' : 'کپی'}
                                                </button>
                                            </div>

                                            <div className="log-raw">
                                                <pre className="raw-content">{log.raw}</pre>
                                                <button
                                                    className="copy-button"
                                                    onClick={() => copyToClipboard(log.raw, index)}
                                                >
                                                    <HiClipboard className="copy-icon" />
                                                    {copiedIndex === index ? 'کپی شد!' : 'کپی کل لاگ'}
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ResultsComponent;