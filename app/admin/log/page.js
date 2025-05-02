'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FormComponent from './FormComponent';
import ErrorComponent from './ErrorComponent';
import './style.css';
import { HiFilter } from 'react-icons/hi';
import ResultsComponent from './ResultsComponent';

function App() {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="container" style={{ backgroundColor: 'transparent !important' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h1 className="title">
          <HiFilter className="title-icon" /> SafeUpdate Log Filter
        </h1>

        <FormComponent
          setLogs={setLogs}
          setError={setError}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
        />

        <ErrorComponent error={error} />

        <ResultsComponent
          logs={logs}
          isLoading={isLoading}
        />
      </motion.div>
    </div>
  );
}

export default App;