import React from 'react';
import { motion } from 'framer-motion';

const Notification = ({ message, type }) => (
  <motion.div
    initial={{ opacity: 0, y: -50, x: '-50%' }}
    animate={{ opacity: 1, y: 0, x: '-50%' }}
    exit={{ opacity: 0, y: -50, x: '-50%' }}
    role="alert"
    aria-live="polite"
    className={`fixed top-24 left-1/2 z-50 px-6 py-3 rounded-full shadow-2xl glass-panel ${
      type === 'success' ? 'border-green-500/50 bg-green-500/10 text-green-400' : 
      type === 'warning' ? 'border-yellow-500/50 bg-yellow-500/10 text-yellow-400' : 
      'border-red-500/50 bg-red-500/10 text-red-400'
    } font-semibold text-sm md:text-base`}
  >
    {message}
  </motion.div>
);

export default Notification;
