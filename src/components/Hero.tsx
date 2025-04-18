import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-black via-surface to-black overflow-hidden">
      <div className="container h-full flex items-center justify-center min-h-screen py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8 max-w-4xl relative"
        >
          {/* Animated glow effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] animate-glow">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,123,255,0.5)_0%,transparent_60%)] blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,123,255,0.3)_0%,transparent_70%)] blur-3xl animate-pulse-slow" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_60%)] blur-2xl" />
          </div>

          <motion.h1 
            className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-primary relative z-10 drop-shadow-[0_0_15px_rgba(0,123,255,0.5)]"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Japan is nearby
          </motion.h1>
          
          <motion.p 
            className="text-2xl md:text-3xl text-text-secondary relative z-10 mb-4 drop-shadow-[0_0_10px_rgba(0,123,255,0.3)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Премиальные диски из Японии
          </motion.p>

          <motion.p 
            className="text-lg md:text-xl text-text-secondary/90 relative z-10 drop-shadow-[0_0_5px_rgba(0,123,255,0.2)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Прямые поставки эксклюзивных моделей от ведущих производителей: 
            <br />
            RAYS, SSR, WORK, BBS Japan
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="pt-4 relative z-10"
          >
            <a 
              href="/catalog" 
              className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg transition-colors duration-300 text-lg shadow-[0_0_20px_rgba(0,123,255,0.3)]"
            >
              Смотреть каталог
            </a>
          </motion.div>
        </motion.div>
      </div>
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,123,255,0.15)_0%,transparent_70%)]" />
      </div>
    </section>
  );
};

export default Hero;
