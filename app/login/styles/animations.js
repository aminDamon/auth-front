// animations.js - فایل مربوط به تعریف انیمیشن ها

export const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1,
        transition: { 
            duration: 0.5,
            when: "beforeChildren",
            staggerChildren: 0.1
        }
    }
};

export const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
        y: 0, 
        opacity: 1,
        transition: { type: "spring", stiffness: 300, damping: 24 }
    }
};

export const tabVariants = {
    inactive: { borderBottom: "0px solid #d97706", backgroundColor: "transparent" },
    active: { 
        borderBottom: "2px solid #d97706", 
        backgroundColor: "rgba(251, 191, 36, 0.1)",
        transition: { type: "spring", stiffness: 500, damping: 30 }
    }
};

export const formVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
        opacity: 1, 
        x: 0,
        transition: { 
            type: "spring", 
            stiffness: 300, 
            damping: 25,
            duration: 0.3
        }
    },
    exit: { 
        opacity: 0, 
        x: 20,
        transition: { duration: 0.2 } 
    }
};

export const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.8 }
};

export const headerVariants = {
    initial: { y: -50 },
    animate: { y: 0 },
    transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20,
        delay: 0.2 
    }
};

export const logoVariants = {
    initial: { rotate: -180, scale: 0.5, opacity: 0 },
    animate: { rotate: 0, scale: 1, opacity: 1 },
    transition: { 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: 0.3 
    },
    hover: { 
        scale: 1.1,
        boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)" 
    }
};

export const buttonHoverVariants = {
    hover: { 
        scale: 1.02, 
        boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
        y: -2
    },
    tap: { scale: 0.98, y: 0 }
};