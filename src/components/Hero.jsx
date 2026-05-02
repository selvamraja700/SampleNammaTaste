import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-[85vh] flex items-center pt-10 pb-20 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-[#050505] to-[#050505]">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-orange-600/10 rounded-full blur-[150px] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex-1 text-center lg:text-left">
            <span className="inline-block py-1 px-3 rounded-full glass-panel text-amber-400 text-sm font-semibold mb-6 border-amber-400/30">
              100% Authentic Taste
            </span>
            <h1 className="text-5xl lg:text-7xl font-heading font-extrabold leading-tight mb-6">
              Taste That <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 drop-shadow-[0_0_30px_rgba(251,191,36,0.3)]">Truly Hits</span>
            </h1>
            <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Experience the finest street food with a modern twist. From classic crispy pani puri to loaded cheese momos, we serve happiness in every bite.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#categories" className="btn-primary text-center">Explore Menu</a>
              <a href="#contact" className="btn-outline text-center">Contact Us</a>
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }} className="flex-1 relative">
            <div className="relative w-full max-w-lg mx-auto aspect-square">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-orange-500/20 rounded-full blur-3xl"></div>
              <img src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=800" alt="Delicious Food" className="relative z-10 w-full h-full object-cover rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10" />
              
              {/* Floating Stat Card */}
              <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute -left-6 top-1/4 glass-panel p-4 rounded-2xl z-20 hidden md:block">
                <div className="text-amber-400 text-2xl font-bold">4.9★</div>
                <div className="text-xs text-gray-300 font-medium">Customer Rating</div>
              </motion.div>
              
              <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }} className="absolute -right-6 bottom-1/4 glass-panel p-4 rounded-2xl z-20 hidden md:block">
                <div className="text-orange-400 text-2xl font-bold">30m</div>
                <div className="text-xs text-gray-300 font-medium">Fast Delivery</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
