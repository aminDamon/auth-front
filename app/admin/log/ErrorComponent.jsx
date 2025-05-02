import React from 'react';
import { motion } from 'framer-motion';

const ErrorComponent = ({ error }) => {
    return (
        <>
            {error && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="error"
                >
                    {error}
                </motion.div>
            )}
        </>
    );
};

export default ErrorComponent;