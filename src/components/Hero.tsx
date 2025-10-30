import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/main3.png';

const SvgLeaf = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M8 40c8-8 20-12 30-12s22 4 28 12c-10 10-20 14-28 14S18 50 8 40z" fill="#DFF3E0" />
    <path d="M10 38c7-6 18-10 26-10s19 4 24 10c-9 9-18 13-24 13S19 47 10 38z" fill="#BFE9C9" />
  </svg>
);

const Star = ({ className = '', size = 12 }: { className?: string; size?: number }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path d="M12 2l1.9 4.85L19 8.3l-3.4 2.95L16.2 17 12 14.3 7.8 17l.6-5.75L4.95 8.3l5.1-.95L12 2z" fill="currentColor" />
  </svg>
);

const Hero = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const parallax = useTransform(scrollYProgress, [0, 1], [0, -36]);

  return (
    <section
      aria-label="Homepage hero"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      // use the design system gradient so hero matches other pages exactly
      style={{ background: 'var(--gradient-hero)' }}
    >
      {/* Decorative stars and emoji accents in background (non-interactive) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* SVG accent stars (subtle) */}
        <div style={{ position: 'absolute', top: '6%', left: '8%', color: 'hsl(var(--pickle-yellow))', opacity: 0.12 }}>
          <Star size={18} />
        </div>
        <div style={{ position: 'absolute', top: '18%', right: '6%', color: 'hsl(var(--pickle-yellow))', opacity: 0.14 }} className="hidden sm:block">
          <Star size={14} />
        </div>
        <div style={{ position: 'absolute', bottom: '12%', left: '14%', color: 'hsl(var(--pickle-yellow))', opacity: 0.10 }} className="hidden md:block">
          <Star size={20} />
        </div>
        <div style={{ position: 'absolute', bottom: '22%', right: '18%', color: 'hsl(var(--pickle-yellow))', opacity: 0.11 }} className="hidden lg:block">
          <Star size={16} />
        </div>

        {/* Bright emoji stars placed at corners/sides. High visibility but placed away from text. */}
        <span style={{ position: 'absolute', top: '4%', left: '4%', fontSize: 28, color: 'hsl(var(--pickle-yellow))', opacity: 0.95 }} aria-hidden className="hidden sm:inline">✨</span>
        <span style={{ position: 'absolute', top: '6%', right: '6%', fontSize: 22, color: 'hsl(var(--pickle-yellow))', opacity: 0.95 }} aria-hidden className="hidden sm:inline">⭐</span>
        <span style={{ position: 'absolute', bottom: '4%', right: '4%', fontSize: 30, color: 'hsl(var(--pickle-yellow))', opacity: 0.95 }} aria-hidden className="hidden md:inline">🌟</span>
        <span style={{ position: 'absolute', bottom: '8%', left: '6%', fontSize: 20, color: 'hsl(var(--pickle-yellow))', opacity: 0.9 }} aria-hidden className="hidden sm:inline">✨</span>
        <span style={{ position: 'absolute', top: '36%', left: '92%', transform: 'translateX(-100%)', fontSize: 18, color: 'hsl(var(--pickle-yellow))', opacity: 0.9 }} aria-hidden className="hidden md:inline">⭐</span>
        <span style={{ position: 'absolute', top: '22%', left: '50%', transform: 'translateX(-50%)', fontSize: 16, color: 'hsl(var(--pickle-yellow))', opacity: 0.85 }} aria-hidden className="hidden lg:inline">🌟</span>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 py-12 md:py-20 lg:py-28">
          {/* Left: Text content */}
            <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full md:w-1/2 flex flex-col items-start relative z-10"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-bold leading-tight mb-4 font-display tracking-wide" style={{ color: '#204E37', textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
              <span>
                Authentic Flavours,
              </span>
              <br />
              <span>Bottled Fresh</span>
            </h1>

            <p className="text-[38px] mb-4 font-cursive italic" style={{ color: '#46A36E' }}>
              From Our Kitchen to Yours
            </p>

            <p className="text-[20px] text-[#5B5B5B] leading-relaxed max-w-xl mb-6">
              Traditional Northeast-style pickles made in small batches using fresh local ingredients — pure taste, no preservatives.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link to="/shop">
                <Button size="lg" className="rounded-full px-8 bg-primary text-primary-foreground shadow-[var(--shadow-soft)]">
                  Shop Now
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="rounded-full px-8">
                  Our Story
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right: Product image + decorative SVGs */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full md:w-1/2 flex items-center justify-center relative"
            style={{ y: parallax }}
          >
            {/* Decorative leaf top-left */}
            <div className="hidden md:block absolute -left-10 -top-6 w-36 h-36 opacity-80">
              <SvgLeaf />
            </div>

            {/* Decorative leaf bottom-right */}
            <div className="hidden md:block absolute -right-8 -bottom-6 w-28 h-28 opacity-70">
              <SvgLeaf />
            </div>

            <div className="relative z-10 w-72 sm:w-[360px] md:w-[480px] lg:w-[600px]">
              <div className="relative">
                {/* Minimalistic, crisp product image without fade — center and contain */}
                <motion.img
                  src={heroImage}
                  alt="Pickle product"
                  className="w-full h-auto object-contain rounded-2xl shadow-lg"
                  style={{
                    filter: 'contrast(1.02) saturate(1.05)'
                  }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
