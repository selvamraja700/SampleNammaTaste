import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { FaBars, FaTimes } from 'react-icons/fa';
import { navLinks } from '../data';
import { LOGO_URL, MARQUEE_MESSAGES } from '../utils/helpers';
import { useMarquee } from '../utils/hooks';
import PopupMessage from './PopupMessage';

const NavLink = ({ link, onClick }) => {
  const linkRef = useRef(null);
  const underlineRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(underlineRef.current, { scaleX: 1, transformOrigin: 'left center', duration: 0.3, ease: 'power2.out' });
  };

  const handleMouseLeave = () => {
    gsap.to(underlineRef.current, { scaleX: 0, transformOrigin: 'right center', duration: 0.3, ease: 'power2.in' });
  };

  return (
    <a 
      ref={linkRef}
      href={link.href} 
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative text-sm font-semibold text-gray-300 hover:text-amber-400 transition-colors flex items-center h-full px-2"
    >
      {link.name}
      <div 
        ref={underlineRef} 
        className="absolute bottom-[20%] left-0 w-full h-[2px] bg-amber-400 scale-x-0"
      />
    </a>
  );
};

const Header = ({ mobileMenuOpen, setMobileMenuOpen, openInquiry }) => {
  const { index: marqueeIndex, direction: marqueeDirection } = useMarquee(MARQUEE_MESSAGES, 5000);
  const headerRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (scrolled) {
      gsap.to(headerRef.current, { 
        backgroundColor: 'rgba(15, 15, 15, 0.8)', 
        boxShadow: '0 10px 40px rgba(0,0,0,0.8)', 
        backdropFilter: 'blur(12px)', 
        duration: 0.3 
      });
    } else {
      gsap.to(headerRef.current, { 
        backgroundColor: 'rgba(255, 255, 255, 0.05)', 
        boxShadow: '0 10px 40px rgba(0,0,0,0.5)', 
        backdropFilter: 'blur(8px)', 
        duration: 0.3 
      });
    }
  }, [scrolled]);

  return (
    <>
      {/* Floating Navbar */}
      <div className="fixed top-0 left-0 w-full z-40 pt-4 px-4 pointer-events-none flex justify-center transition-all duration-300">
        <nav 
          ref={headerRef}
          className="relative rounded-full w-full max-w-5xl px-4 md:px-6 py-2 md:py-3 flex justify-between items-center pointer-events-auto border border-white/10"
        >
          <a href="#home" className="flex items-center gap-3 min-h-[48px] active:scale-95 transition-transform">
            <img src={LOGO_URL} alt="Logo" className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover ring-2 ring-amber-400/50" loading="eager" />
            <span className="text-lg md:text-xl font-heading font-bold text-white tracking-wide">Namma Taste</span>
          </a>
          
          <div className="hidden lg:flex gap-8 items-center h-[48px]">
            {navLinks.map(link => (
              <NavLink key={link.id} link={link} />
            ))}
          </div>
          
          <div className="hidden lg:block relative">
            <button onClick={() => openInquiry()} className="btn-primary text-sm md:text-base px-6 min-h-[48px] flex items-center justify-center relative overflow-hidden group">
              <span className="relative z-10">Book Event</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </div>
          
          {/* Mobile hamburger - 48x48 touch target */}
          <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden text-white text-2xl focus:outline-none w-[48px] h-[48px] flex justify-center items-center rounded-full hover:bg-white/10 active:bg-white/20 transition-colors">
            <FaBars />
          </button>

          {/* Contextual Popup Notification */}
          <PopupMessage openInquiry={openInquiry} />
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex justify-end bg-[#0f0f0f]/80 backdrop-blur-md pointer-events-auto" onClick={() => setMobileMenuOpen(false)}>
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25 }} className="w-4/5 max-w-sm h-full glass-panel border-l border-white/10 p-6 sm:p-8 flex flex-col bg-[#0f0f0f]/90" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-10">
                <span className="text-2xl font-heading font-bold text-amber-400">Menu</span>
                <button onClick={() => setMobileMenuOpen(false)} className="text-gray-400 hover:text-white w-[48px] h-[48px] flex justify-center items-center rounded-full active:bg-white/10 transition-colors"><FaTimes size={24}/></button>
              </div>
              <ul className="flex flex-col gap-2">
                {navLinks.map(link => (
                  <li key={link.id}>
                    <a href={link.href} onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' }); }} className="text-white hover:text-amber-400 text-lg md:text-xl font-medium transition-colors flex items-center w-full min-h-[48px] px-4 rounded-xl active:bg-white/5">
                      {link.name}
                    </a>
                  </li>
                ))}
                <li className="mt-6">
                  <button onClick={() => { setMobileMenuOpen(false); openInquiry(); }} className="w-full btn-primary min-h-[56px] text-lg flex items-center justify-center">Book Event</button>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Marquee Bar */}
      <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border-b border-white/5 py-2 mt-[88px] md:mt-[96px]">
        <div className="container mx-auto px-4 overflow-hidden relative h-6">
          <motion.div
            key={marqueeIndex}
            initial={marqueeDirection === 'enter' ? { y: 20, opacity: 0 } : { y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute left-0 top-0 w-full text-center text-amber-400 text-xs md:text-sm font-semibold tracking-wider uppercase"
          >
            ✦ {MARQUEE_MESSAGES[marqueeIndex]} ✦
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Header;
