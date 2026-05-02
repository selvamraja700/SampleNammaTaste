import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLock } from 'react-icons/fa';

const AccessPage = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === import.meta.env.VITE_ACCESS_PASSWORD) {
      onUnlock();
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-8 md:p-10 rounded-3xl w-full max-w-md shadow-2xl ring-1 ring-white/10 text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-amber-500"></div>
        
        <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(251,191,36,0.15)]">
          <FaLock className="text-amber-400 text-2xl" />
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-2 font-heading">Enter Access Password</h2>
        <p className="text-gray-400 text-sm mb-8">This website is currently locked for development or private usage.</p>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="Enter password" 
              className={`w-full bg-white/5 border ${error ? 'border-red-500/50 focus:border-red-500/50' : 'border-white/10 focus:border-amber-500/50'} rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none transition-all focus:bg-white/10`}
              autoFocus
            />
            {error && <p className="text-red-500 text-xs text-left mt-2 pl-2">{error}</p>}
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-amber-500 hover:bg-amber-400 active:scale-[0.98] text-black font-bold py-3 rounded-xl transition-all shadow-lg"
          >
            Unlock Access
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AccessPage;
