import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const ContactForm = ({ contactForm, contactSubmitting, handleContactSubmit }) => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-gradient-to-b from-[#050505] to-[#0a0a0a]">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="section-title text-3xl md:text-4xl lg:text-5xl">Get In Touch</h2>
          <p className="text-gray-400 text-base md:text-lg">Have a question or want to book us for an event? Drop a message!</p>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="glass-panel p-6 sm:p-8 md:p-12 rounded-[2rem] shadow-[0_0_40px_rgba(0,0,0,0.5)] border-t border-white/10">
          <form onSubmit={handleContactSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input type="text" name="name" value={contactForm.values.name} onChange={contactForm.handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 min-h-[52px] text-base text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all" />
                {contactForm.errors.name && <p className="text-red-400 text-xs mt-1">{contactForm.errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                <input type="tel" name="phone" value={contactForm.values.phone} onChange={contactForm.handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 min-h-[52px] text-base text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all" />
                {contactForm.errors.phone && <p className="text-red-400 text-xs mt-1">{contactForm.errors.phone}</p>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <input type="email" name="email" value={contactForm.values.email} onChange={contactForm.handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 min-h-[52px] text-base text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all" />
              {contactForm.errors.email && <p className="text-red-400 text-xs mt-1">{contactForm.errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
              <textarea name="message" rows="4" value={contactForm.values.message} onChange={contactForm.handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-base text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all resize-none min-h-[120px]" />
              {contactForm.errors.message && <p className="text-red-400 text-xs mt-1">{contactForm.errors.message}</p>}
            </div>
            <button type="submit" disabled={contactSubmitting} className="w-full btn-primary min-h-[56px] text-lg font-bold flex items-center justify-center">
              {contactSubmitting ? 'Sending Message...' : 'Send Message'}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export const OrderModal = React.memo(({ isOpen, onClose, onSubmit, formData, errors, isSubmitting, isCooldown, cooldownTimeLeft }) => {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className="glass-panel rounded-3xl max-w-md w-full p-6 sm:p-8 border-amber-500/30 max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6 md:mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 font-heading">Book an Event</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors w-[48px] h-[48px] flex justify-center items-center rounded-full bg-white/5 active:bg-white/10"><FaTimes size={20}/></button>
          </div>
          
          <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5">
            <div>
              <input
                type="text" name="name" placeholder="Your Name *"
                value={formData.values.name} onChange={formData.handleChange}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 min-h-[52px] text-base text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all placeholder:text-gray-500"
              />
              {errors.name && <p className="text-red-400 text-xs mt-1 ml-1">{errors.name}</p>}
            </div>
            <div>
              <input
                type="tel" name="phone" placeholder="Phone Number (10 digits) *"
                value={formData.values.phone} onChange={formData.handleChange}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 min-h-[52px] text-base text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all placeholder:text-gray-500"
              />
              {errors.phone && <p className="text-red-400 text-xs mt-1 ml-1">{errors.phone}</p>}
            </div>
            <div>
              <input
                type="text" name="address" placeholder="Event Address *"
                value={formData.values.address} onChange={formData.handleChange}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 min-h-[52px] text-base text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all placeholder:text-gray-500"
              />
              {errors.address && <p className="text-red-400 text-xs mt-1 ml-1">{errors.address}</p>}
            </div>
            <div>
              <select
                name="eventType" value={formData.values.eventType} onChange={formData.handleChange}
                className="w-full bg-[#111] border border-white/10 rounded-xl px-4 min-h-[52px] text-base text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all appearance-none cursor-pointer"
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
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 min-h-[52px] text-base text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all placeholder:text-gray-500 mt-4 sm:mt-5"
                />
                {errors.eventTypeOther && <p className="text-red-400 text-xs mt-1 ml-1">{errors.eventTypeOther}</p>}
              </motion.div>
            )}
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 z-10">
                <FaCalendarAlt />
              </div>
              <DatePicker
                selected={formData.values.eventDate}
                onChange={(date) => formData.setValues(prev => ({...prev, eventDate: date}))}
                minDate={new Date()}
                placeholderText="Select Event Date *"
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 min-h-[52px] text-base text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all cursor-pointer w-full"
                dateFormat="MMMM d, yyyy"
                wrapperClassName="w-full block"
              />
              {errors.eventDate && <p className="text-red-400 text-xs mt-1 ml-1">{errors.eventDate}</p>}
            </div>
            
            <div>
              <textarea
                name="items" placeholder="Items of Interest *" rows="3"
                value={formData.values.items} onChange={formData.handleChange}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-base text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all placeholder:text-gray-500 resize-none min-h-[100px]"
              />
              {errors.items && <p className="text-red-400 text-xs mt-1 ml-1">{errors.items}</p>}
            </div>
            
            <button 
              type="submit" 
              disabled={isSubmitting || isCooldown} 
              className={`w-full min-h-[56px] text-lg font-bold mt-2 flex items-center justify-center rounded-full transition-all ${
                isCooldown 
                  ? 'bg-red-500/10 text-red-500 border border-red-500/30 cursor-not-allowed' 
                  : 'btn-primary disabled:opacity-50'
              }`}
            >
              {isCooldown 
                ? `Cooldown: ${Math.floor(cooldownTimeLeft/60)}:${(cooldownTimeLeft%60).toString().padStart(2,'0')}` 
                : isSubmitting 
                  ? 'Sending Inquiry...' 
                  : 'Submit Inquiry'}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
});
