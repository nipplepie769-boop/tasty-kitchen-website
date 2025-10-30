import React from 'react';
import { motion } from 'framer-motion';

const FloatingBlob = ({ className = '', style = {} }: { className?: string; style?: React.CSSProperties }) => (
  <motion.div
    className={`absolute rounded-full filter blur-3xl opacity-30 ${className}`}
    style={style}
    animate={{ y: [0, -20, 0] }}
    transition={{ duration: 6 + Math.random() * 6, repeat: Infinity, ease: 'easeInOut' }}
  />
);

const AnimatedBackground: React.FC = () => {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* subtle animated radial blobs */}
      <FloatingBlob className="bg-gradient-to-tr from-emerald-300 via-lime-300 to-cyan-300" style={{ width: 420, height: 420, left: -80, top: -60 }} />
      <FloatingBlob className="bg-gradient-to-tr from-pink-300 via-rose-200 to-yellow-200" style={{ width: 360, height: 360, right: -100, top: 40 }} />
      <FloatingBlob className="bg-gradient-to-tr from-indigo-200 via-sky-200 to-teal-200" style={{ width: 300, height: 300, left: 40, bottom: -80 }} />

      {/* moving tiny particles */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <circle id="dot" r="2" />
        </defs>
        {[...Array(30)].map((_, i) => (
          <motion.use
            key={i}
            href="#dot"
            fill="rgba(255,255,255,0.08)"
            style={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
            }}
            animate={{ y: [0, -120 - Math.random() * 200] }}
            transition={{ repeat: Infinity, duration: 12 + Math.random() * 12, delay: Math.random() * 6 }}
          />
        ))}
      </svg>
    </div>
  );
};

export default AnimatedBackground;
