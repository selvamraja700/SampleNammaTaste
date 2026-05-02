import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCalendarAlt } from 'react-icons/fa';

const PopupMessage = ({ openInquiry }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const ONE_HOUR = 60 * 60 * 1000; // 1 hour in milliseconds
    const lastLoginStr = localStorage.getItem('namma_taste_last_login');
    const now = Date.now();
    
    let shouldShow = false;
    
    if (!lastLoginStr) {
      // Fresh login entirely
      shouldShow = true;
    } else {
      const lastLoginTime = parseInt(lastLoginStr, 10);
      if (now - lastLoginTime > ONE_HOUR) {
        // More than 1 hour has passed
        shouldShow = true;
      }
    }
    
    if (shouldShow) {
      // Delay slightly for better UX on initial page load
      const showTimer = setTimeout(() => {
        setIsVisible(true);
        localStorage.setItem('namma_taste_last_login', now.toString());
        
        // Auto-dismiss after 7 seconds as requested
        setTimeout(() => {
          setIsVisible(false);
        }, 7000);
      }, 1000);
      
      return () => clearTimeout(showTimer);
    }
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="absolute top-full mt-4 right-0 lg:right-6 z-50 glass-panel border border-amber-500/50 p-5 rounded-2xl shadow-[0_20px_50px_rgba(251,191,36,0.25)] flex flex-col gap-4 w-72 md:w-80 pointer-events-auto"
        >
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 active:bg-white/20"
          >
            <FaTimes size={14} />
          </button>
          
          <div className="flex items-center gap-4 pr-6 pt-1">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 ring-1 ring-amber-500/30">
              <FaCalendarAlt size={20} />
            </div>
            <div>
              <h4 className="text-white font-bold font-heading text-lg leading-tight mb-1">Planning an Event?</h4>
              <p className="text-gray-400 text-xs md:text-sm">Book Namma Taste today!</p>
            </div>
          </div>
          
          <button 
            onClick={() => {
              setIsVisible(false);
              openInquiry();
            }}
            className="mt-2 w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold py-3 rounded-xl text-sm transition-colors shadow-lg hover:shadow-amber-500/25 active:scale-[0.98]"
          >
            Book Now
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PopupMessage;
