import React from 'react';
import { motion, Variants } from 'framer-motion';

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.995 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, className = '', delay = 0, duration = 0.6 }) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={defaultVariants}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
