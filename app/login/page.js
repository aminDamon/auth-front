"use client"
import { motion } from 'framer-motion';
import Head from 'next/head';
import { useState } from 'react';
import LoginForm from './auth/LoginForm';
import LoginTabs from './auth/LoginTabs';
import Header from '../components/Header';
import MotionCard from './components/ui/MotionCard';
import { pageVariants } from './styles/animations';

export default function Home() {
  const [loginMethod, setLoginMethod] = useState('email');
  
  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-amber-50 to-white flex flex-col font-vazir"
      initial={pageVariants.initial}
      animate={pageVariants.animate}
      transition={pageVariants.transition}
    >
      <Head>
        <title>ورود به شبکه امن</title>
        <link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css" rel="stylesheet" type="text/css" />
      </Head>

      <Header />

      <main className="flex-grow flex items-center justify-center p-4">
        <MotionCard>
          <LoginTabs loginMethod={loginMethod} setLoginMethod={setLoginMethod} />
          <LoginForm loginMethod={loginMethod} />
        </MotionCard>
      </main>
    </motion.div>
  );
}