import { motion } from 'framer-motion';

export const BackgroundElements = () => {
  const themeColor = {
    primary: 'from-[#ff6600] to-[#ff8533]',
    secondary: 'from-[#ffefe5] to-[#fff6f0]',
  };
  
  return (
    <>
      {/* Main background effect */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -inset-[10%] opacity-10"
          initial={{ rotate: 0, scale: 0.9 }}
          animate={{ 
            rotate: 360, 
            scale: 1.1,
            transition: { duration: 100, repeat: Infinity, repeatType: "loop", ease: "linear" } 
          }}
        >
          <div className="w-full h-full bg-gradient-to-r from-[#ff6600]/20 via-[#ff6600]/10 to-[#ff6600]/30 rounded-full blur-3xl" />
        </motion.div>
      </div>
      
      {/* Floating shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-[150px] h-[150px] bg-gradient-to-br ${themeColor.secondary} rounded-full opacity-20`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            initial={{
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 40 - 20, 0],
              scale: [Math.random() * 0.5 + 0.5, Math.random() * 0.7 + 0.3, Math.random() * 0.5 + 0.5],
              transition: {
                duration: Math.random() * 5 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
          />
        ))}
      </div>
    </>
  );
};