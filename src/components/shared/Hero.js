import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ 
  title, 
  subtitle, 
  backgroundImage, 
  children, 
  align = 'center', 
  height = 'full',
  overlay = true,
  cta = null,
}) => {
  // Define animation variants for text elements
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  // Determine text alignment classes
  const alignClasses = {
    'left': 'text-left items-start',
    'center': 'text-center items-center',
    'right': 'text-right items-end',
  };

  // Determine height classes
  const heightClasses = {
    'full': 'min-h-screen',
    'large': 'min-h-[80vh]',
    'medium': 'min-h-[60vh]',
    'small': 'min-h-[40vh]',
  };

  return (
    <section 
      className={`relative flex flex-col justify-center ${heightClasses[height]} p-4 sm:p-6 lg:p-8 overflow-hidden`}
      style={{ 
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay for better text readability */}
      {overlay && backgroundImage && (
        <div className="absolute inset-0 bg-black/50 dark:bg-black/70"></div>
      )}

      {/* Content container */}
      <div className={`container mx-auto z-10 flex flex-col ${alignClasses[align]} space-y-6`}>
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white leading-tight max-w-4xl"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          {title}
        </motion.h1>
        
        {subtitle && (
          <motion.h2 
            className="text-xl md:text-2xl font-light text-white/90 max-w-2xl mt-4"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            {subtitle}
          </motion.h2>
        )}
        
        {children && (
          <motion.div 
            className="mt-6 md:mt-8"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            {children}
          </motion.div>
        )}
        
        {cta && (
          <motion.div 
            className="mt-8 md:mt-12"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
          >
            {cta}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Hero;
