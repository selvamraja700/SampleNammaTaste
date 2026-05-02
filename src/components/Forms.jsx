import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { getTodayDate, getMaxDate } from '../utils/helpers';

export const ContactForm = ({ contactForm, contactSubmitting, handleContactSubmit }) => {
  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-[#050505] to-[#0a0a0a]">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="section-title">Get In Touch</h2>
          <p className="text-gray-400 text-lg">Have a question or want to book us for an event? Drop a message!</p>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="glass-panel p-8 md:p-12 rounded-[2rem] shadow-[0_0_40px_rgba(0,0,0,0.5)] border-t border-white/10">
          <form onSubmit={handleContactSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input type="text" name="name" value={contactForm.values.name} onChange={contactForm.handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all" />
                {contactForm.errors.name && <p className="text-red-400 text-xs mt-1">{contactForm.errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                <input type="tel" name="phone" value={contactForm.values.phone} onChange={contactForm.handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all" />
                {contactForm.errors.phone && <p className="text-red-400 text-xs mt-1">{contactForm.errors.phone}</p>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <input type="email" name="email" value={contactForm.values.email} onChange={contactForm.handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all" />
              {contactForm.errors.email && <p className="text-red-400 text-xs mt-1">{contactForm.errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
              <textarea name="message" rows="4" value={contactForm.values.message} onChange={contactForm.handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all resize-none" />
              {contactForm.errors.message && <p className="text-red-400 text-xs mt-1">{contactForm.errors.message}</p>}
            </div>
            <button type="submit" disabled={contactSubmitting} className="w-full btn-primary py-4 text-lg">
              {contactSubmitting ? 'Sending Message...' : 'Send Message'}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export const OrderModal = React.memo(({ isOpen, onClose, onSubmit, formData, errors, isSubmitting }) => {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="glass-panel rounded-3xl max-w-md w-full p-8 border-amber-500/30 max-h-[90vh] overflow-y-auto custom-scrollbar shadow-[0_0_50px_rgba(251,191,36,0.1)]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 font-heading">Place Order</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors"><FaTimes size={20}/></button>
          </div>
          
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <input
                type="text" name="name" placeholder="Your Name *"
                value={formData.values.name} onChange={formData.handleChange}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all placeholder:text-gray-500"
              />
              {errors.name && <p className="text-red-400 text-xs mt-1 ml-1">{errors.name}</p>}
            </div>
            <div>
              <input
                type="tel" name="phone" placeholder="Phone Number (10 digits) *"
                value={formData.values.phone} onChange={formData.handleChange}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all placeholder:text-gray-500"
              />
              {errors.phone && <p className="text-red-400 text-xs mt-1 ml-1">{errors.phone}</p>}
            </div>
            <div>
              <input
                type="text" name="address" placeholder="Delivery Address *"
                value={formData.values.address} onChange={formData.handleChange}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all placeholder:text-gray-500"
              />
              {errors.address && <p className="text-red-400 text-xs mt-1 ml-1">{errors.address}</p>}
            </div>
            <div>
              <select
                name="eventType" value={formData.values.eventType} onChange={formData.handleChange}
                className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
              >
                <option value="">Select Event Type *</option>
                {['Birthday Party','Anniversary','Corporate Event','Wedding','Get-together','Other (please specify)'].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              {errors.eventType && <p className="text-red-400 text-xs mt-1 ml-1">{errors.eventType}</p>}
            </div>
            {formData.values.eventType === 'Other (please specify)' && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                <input
                  type="text" name="eventTypeOther" placeholder="Specify (min 25 chars, no spaces) *"
                  value={formData.values.eventTypeOther} onChange={formData.handleChange}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all placeholder:text-gray-500"
                />
                {errors.eventTypeOther && <p className="text-red-400 text-xs mt-1 ml-1">{errors.eventTypeOther}</p>}
              </motion.div>
            )}
            <div>
              <input
                type="date" name="eventDate" value={formData.values.eventDate} onChange={formData.handleChange}
                min={getTodayDate()} max={getMaxDate()}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
              />
              {errors.eventDate && <p className="text-red-400 text-xs mt-1 ml-1">{errors.eventDate}</p>}
            </div>
            <div>
              <textarea
                name="items" placeholder="Items you want (e.g., Classic Pani Puri, Cheese Momos)" rows="3"
                value={formData.values.items} onChange={formData.handleChange}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all placeholder:text-gray-500 resize-none"
              />
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full btn-primary mt-4">
              {isSubmitting ? 'Placing Order...' : 'Confirm Order'}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
});
