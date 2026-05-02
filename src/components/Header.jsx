import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { navLinks } from '../data';
import { LOGO_URL, MARQUEE_MESSAGES } from '../utils/helpers';
import { useMarquee } from '../utils/hooks';

const Header = ({ mobileMenuOpen, setMobileMenuOpen, setShowOrderModal }) => {
  const { index: marqueeIndex, direction: marqueeDirection } = useMarquee(MARQUEE_MESSAGES, 5000);

  return (
    <>
      {/* Floating Navbar */}
      <div className="fixed top-4 left-0 w-full z-40 px-4 pointer-events-none flex justify-center">
        <nav className="glass-panel rounded-full w-full max-w-5xl px-6 py-3 flex justify-between items-center pointer-events-auto shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          <a href="#home" className="flex items-center gap-3 group">
            <img src={LOGO_URL} alt="Logo" className="h-10 w-10 rounded-full object-cover group-hover:scale-110 transition-transform duration-300 ring-2 ring-amber-400/50" loading="eager" />
            <span className="text-xl font-heading font-bold text-white tracking-wide">Namma Taste</span>
          </a>
          <div className="hidden md:flex gap-8">
            {navLinks.map(link => (
              <a key={link.id} href={link.href} className="text-sm font-semibold text-gray-300 hover:text-amber-400 transition-colors">
                {link.name}
              </a>
            ))}
          </div>
          <div className="hidden md:block">
            <button onClick={() => setShowOrderModal(true)} className="btn-primary text-sm px-5 py-2">Order Now</button>
          </div>
          <button onClick={() => setMobileMenuOpen(true)} className="md:hidden text-white text-2xl focus:outline-none">
            <FaBars />
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}>
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25 }} className="w-72 h-full glass-panel border-l border-white/10 p-8 flex flex-col" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-12">
                <span className="text-2xl font-heading font-bold text-amber-400">Menu</span>
                <button onClick={() => setMobileMenuOpen(false)} className="text-gray-400 hover:text-white"><FaTimes size={24}/></button>
              </div>
              <ul className="flex flex-col gap-6">
                {navLinks.map(link => (
                  <li key={link.id}>
                    <a href={link.href} onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' }); }} className="text-white hover:text-amber-400 text-lg font-medium transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
                <li className="mt-4">
                  <button onClick={() => { setMobileMenuOpen(false); setShowOrderModal(true); }} className="w-full btn-primary">Order Now</button>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Marquee Bar */}
      <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border-b border-white/5 py-2 mt-24">
        <div className="container mx-auto px-4 overflow-hidden relative h-6">
          <motion.div
            key={marqueeIndex}
            initial={marqueeDirection === 'enter' ? { y: 20, opacity: 0 } : { y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute left-0 top-0 w-full text-center text-amber-400 text-sm font-semibold tracking-wider uppercase"
          >
            ✦ {MARQUEE_MESSAGES[marqueeIndex]} ✦
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Header;
