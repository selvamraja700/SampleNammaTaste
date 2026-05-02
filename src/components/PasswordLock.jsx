import React from 'react';
import { motion } from 'framer-motion';
import { FaLock } from 'react-icons/fa';

const PasswordLock = ({ passwordInput, setPasswordInput, passwordError, onSubmit }) => {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
      <div className="glass-panel rounded-3xl p-10 max-w-md w-full text-center border-amber-500/20 shadow-[0_0_50px_rgba(251,191,36,0.1)]">
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <FaLock className="text-amber-400 text-6xl mx-auto mb-6 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
        </motion.div>
        <h2 className="text-3xl font-heading font-bold mb-8 text-white">Unlock Access</h2>
        <form onSubmit={onSubmit}>
          <input
            type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white mb-4 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-lg transition-all"
            placeholder="Enter password" autoFocus
          />
          {passwordError && <p className="text-red-400 text-sm mb-4">{passwordError}</p>}
          <button type="submit" className="w-full btn-primary text-lg py-4">Unlock</button>
        </form>
      </div>
    </div>
  );
};

export default PasswordLock;
