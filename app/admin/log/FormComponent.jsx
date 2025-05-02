import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { FiCalendar, FiClock, FiFilter, FiX } from 'react-icons/fi';

const FormComponent = ({ setLogs, setError, setIsLoading, isLoading }) => {
    const [ip, setIp] = useState('');
    const [serial, setSerial] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [errorCodes, setErrorCodes] = useState('');
    const [showDateFilter, setShowDateFilter] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLogs([]);
        setIsLoading(true);

        try {
            const response = await axios.get('https://ftp-safenet.liara.run/api/logs/filter-logs', {
                params: {
                    type: filterType,
                    errors: filterType === 'specific' ? errorCodes : undefined,
                    ip,
                    serial,
                    includeSuccess: filterType === 'success',
                    startDate: showDateFilter ? startDate : undefined,
                    endDate: showDateFilter ? endDate : undefined
                }
            });

            if (response.data.success) {
                // Convert each log object to a string format
                const formattedLogs = response.data.logs.map(log => {
                    return `IP: ${log.ip}, Serial: ${log.serial}, Status: ${log.status}, Date: ${log.date}, Path: ${log.path}`;
                });
                setLogs(formattedLogs);
            } else {
                setError(response.data.error);
            }
        } catch (err) {
            setError('Failed to fetch logs. Please check server.');
        } finally {
            setIsLoading(false);
        }
    };

    const resetDateFilter = () => {
        setStartDate('');
        setEndDate('');
        setShowDateFilter(false);
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
                <label className="label">IP Address</label>
                <input
                    type="text"
                    value={ip}
                    onChange={(e) => setIp(e.target.value)}
                    placeholder="e.g., 5.160.12.42"
                    className="input"
                />
            </div>

            <div className="form-group">
                <label className="label">Serial Number</label>
                <input
                    type="text"
                    value={serial}
                    onChange={(e) => setSerial(e.target.value)}
                    placeholder="e.g., FGT70FTK22029359"
                    className="input"
                />
            </div>

            <div className="form-group">
                <label className="label">Filter Type</label>
                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="input"
                >
                    <option value="all">All Error Logs</option>
                    <option value="specific">Specific Errors</option>
                    <option value="success">Success Logs</option>
                </select>
            </div>

            {filterType === 'specific' && (
                <div className="form-group">
                    <label className="label">Error Codes</label>
                    <input
                        type="text"
                        value={errorCodes}
                        onChange={(e) => setErrorCodes(e.target.value)}
                        placeholder="e.g., 400,500"
                        className="input"
                    />
                </div>
            )}

            <motion.div
                className="form-group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <motion.button
                    type="button"
                    onClick={() => setShowDateFilter(!showDateFilter)}
                    className={`date-filter-toggle ${showDateFilter ? 'active' : ''}`}
                >
                    <FiCalendar className="icon" />
                    {showDateFilter ? 'Hide Date Filter' : 'Add Date Filter'}
                </motion.button>
            </motion.div>

            <AnimatePresence>
                {showDateFilter && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="date-filter-container"
                    >
                        <div className="date-filter-header">
                            <h4 className="date-filter-title">
                                <FiFilter className="icon" />
                                Date Range Filter
                            </h4>
                            <button
                                type="button"
                                onClick={resetDateFilter}
                                className="date-filter-clear"
                            >
                                <FiX />
                            </button>
                        </div>

                        <div className="date-input-group">
                            <div className="date-input">
                                <label className="date-label">
                                    <FiClock className="icon" />
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="date-picker"
                                />
                            </div>

                            <div className="date-input">
                                <label className="date-label">
                                    <FiClock className="icon" />
                                    End Date
                                </label>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="date-picker"
                                    min={startDate}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isLoading}
                className="button"
            >
                {isLoading ? (
                    <span className="loading">
                        <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="loading-spinner"
                        />
                        Processing...
                    </span>
                ) : (
                    'Filter Logs'
                )}
            </motion.button>
        </form>
    );
};

export default FormComponent;