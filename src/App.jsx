// src/App.jsx – Production‑Grade, Mobile‑First, Fully Responsive (No external CSS needed)
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaWhatsapp, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope, 
  FaLock, FaArrowRight, FaShoppingCart, FaBars, FaTimes 
} from 'react-icons/fa';
import { 
  navLinks, heroStats, paniPuriItems, momoItems, mojitoItems, friesItems, 
  categories, features 
} from './data';

// ------------------------------
// Custom Hooks
// ------------------------------
const useMarquee = (messages, intervalMs = 5000) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState('enter');
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection('exit');
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % messages.length);
        setDirection('enter');
      }, 300);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [messages.length, intervalMs]);
  return { index, direction };
};

const useRateLimiter = (key, maxOrders, windowMs) => {
  const canPlaceOrder = useCallback(() => {
    const stored = localStorage.getItem(key);
    let timestamps = stored ? JSON.parse(stored) : [];
    const now = Date.now();
    timestamps = timestamps.filter(ts => now - ts < windowMs);
    if (timestamps.length >= maxOrders) {
      const oldest = timestamps[0];
      const waitMinutes = Math.ceil((windowMs - (now - oldest)) / 60000);
      return { allowed: false, waitMinutes };
    }
    return { allowed: true };
  }, [key, maxOrders, windowMs]);

  const recordOrder = useCallback(() => {
    const stored = localStorage.getItem(key);
    let timestamps = stored ? JSON.parse(stored) : [];
    timestamps.push(Date.now());
    const now = Date.now();
    timestamps = timestamps.filter(ts => now - ts < windowMs);
    localStorage.setItem(key, JSON.stringify(timestamps));
  }, [key, windowMs]);

  return { canPlaceOrder, recordOrder };
};

const useFormValidation = (initialState, validators) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validate = useCallback(() => {
    const newErrors = {};
    Object.keys(validators).forEach(field => {
      const error = validators[field](values[field], values);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values, validators]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  }, []);

  const reset = useCallback(() => setValues(initialState), [initialState]);

  return { values, setValues, errors, handleChange, validate, reset };
};

// ------------------------------
// Helper Functions
// ------------------------------
const getTodayDate = () => new Date().toISOString().split('T')[0];
const getMaxDate = () => {
  const max = new Date();
  max.setFullYear(max.getFullYear() + 2);
  return max.toISOString().split('T')[0];
};

// ------------------------------
// Reusable Components
// ------------------------------
const Notification = ({ message, type }) => (
  <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    role="alert"
    aria-live="polite"
    className={`fixed top-5 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-full shadow-lg ${
      type === 'success' ? 'bg-green-600' : type === 'warning' ? 'bg-yellow-600' : 'bg-red-600'
    } text-white font-semibold text-sm md:text-base`}
  >
    {message}
  </motion.div>
);

const OrderModal = React.memo(({ isOpen, onClose, onSubmit, formData, errors, isSubmitting }) => {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          className="bg-[#1a1a1a] rounded-2xl max-w-md w-full p-6 border border-[#facc15] max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-2xl font-bold text-[#facc15] mb-4">Place Your Order</h3>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name *"
                value={formData.values.name}
                onChange={formData.handleChange}
                className="w-full bg-black border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#facc15]"
                aria-invalid={!!errors.name}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number (10 digits) *"
                value={formData.values.phone}
                onChange={formData.handleChange}
                className="w-full bg-black border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#facc15]"
                aria-invalid={!!errors.phone}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
            <div>
              <input
                type="text"
                name="address"
                placeholder="Delivery Address *"
                value={formData.values.address}
                onChange={formData.handleChange}
                className="w-full bg-black border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#facc15]"
                aria-invalid={!!errors.address}
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>
            <div>
              <select
                name="eventType"
                value={formData.values.eventType}
                onChange={formData.handleChange}
                className="w-full bg-black border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#facc15]"
                aria-invalid={!!errors.eventType}
              >
                <option value="">Select Event Type *</option>
                {['Birthday Party','Anniversary','Corporate Event','Wedding','Get-together','Other (please specify)'].map(t => (
                  <option key={t}>{t}</option>
                ))}
              </select>
              {errors.eventType && <p className="text-red-500 text-xs mt-1">{errors.eventType}</p>}
            </div>
            {formData.values.eventType === 'Other (please specify)' && (
              <div>
                <input
                  type="text"
                  name="eventTypeOther"
                  placeholder="Specify (min 25 chars, no spaces) *"
                  value={formData.values.eventTypeOther}
                  onChange={formData.handleChange}
                  className="w-full bg-black border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#facc15]"
                  aria-invalid={!!errors.eventTypeOther}
                />
                {errors.eventTypeOther && <p className="text-red-500 text-xs mt-1">{errors.eventTypeOther}</p>}
              </div>
            )}
            <div>
              <input
                type="date"
                name="eventDate"
                value={formData.values.eventDate}
                onChange={formData.handleChange}
                min={getTodayDate()}
                max={getMaxDate()}
                className="w-full bg-black border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#facc15]"
                aria-invalid={!!errors.eventDate}
              />
              {errors.eventDate && <p className="text-red-500 text-xs mt-1">{errors.eventDate}</p>}
              <p className="text-gray-500 text-xs mt-1">Click calendar or type (YYYY-MM-DD)</p>
            </div>
            <div>
              <textarea
                name="items"
                placeholder="Items you want (e.g., Classic Pani Puri, Cheese Momos)"
                rows="3"
                value={formData.values.items}
                onChange={formData.handleChange}
                className="w-full bg-black border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#facc15]"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#facc15] text-black font-bold py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Placing Order...' : 'Confirm Order'}
            </button>
          </form>
          <button onClick={onClose} className="mt-3 text-gray-400 text-sm w-full text-center hover:text-white">
            Cancel
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
});

// ------------------------------
// Main App Component
// ------------------------------
const MARQUEE_MESSAGES = [
  "Fresh pani puri made daily", "Best momos in the city", "Refreshing mojitos for all",
  "Crispy French fries loaded", "Hygienic street food", "Fast delivery within 30 mins",
  "Affordable prices guaranteed", "Family friendly atmosphere", "Authentic Tamil Nadu taste",
  "Spicy and tangy flavors", "Cheese lovers paradise", "Vegan options available",
  "Open till midnight", "Party catering service", "Customizable spice levels",
  "Free chutney with every order", "Loyalty rewards program", "Eco-friendly packaging",
  "Trained friendly staff", "Home delivery across city", "Live chat support",
  "Special student discounts", "Celebrate birthdays with us", "Corporate event specialists",
  "Taste that hits the spot"
];

const LOGO_URL = "https://ik.imagekit.io/Selvamraj700/NammaTaste/WhatsApp%20Image%202026-04-18%20at%202.50.26%20PM.jpeg";
const WEB3FORMS_ACCESS_KEY = 'f15f1eea-9b04-4f0d-a1a0-fbb99559baaa';

function App() {
  // Password lock (disabled by default for production)
  const [isUnlocked, setIsUnlocked] = useState(true);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const { index: marqueeIndex, direction: marqueeDirection } = useMarquee(MARQUEE_MESSAGES, 5000);
  const { canPlaceOrder, recordOrder } = useRateLimiter('namma_taste_orders_timestamps', 5, 30 * 60 * 1000);

  const orderForm = useFormValidation(
    { name: '', phone: '', address: '', items: '', eventType: '', eventTypeOther: '', eventDate: '' },
    {
      name: v => !v.trim() ? 'Name is required' : null,
      phone: v => !/^\d{10}$/.test(v) ? 'Must be 10 digits' : null,
      address: v => !v.trim() ? 'Delivery address required' : null,
      eventType: v => !v ? 'Please select an event type' : null,
      eventTypeOther: (v, all) =>
        all.eventType === 'Other (please specify)' && (!v.trim() || v.length < 25 || /\s/.test(v))
          ? 'Minimum 25 characters, no spaces'
          : null,
      eventDate: v => {
        if (!v) return 'Event date required';
        if (v < getTodayDate()) return 'Cannot select past date';
        if (v > getMaxDate()) return `Date cannot exceed ${getMaxDate()}`;
        return null;
      },
    }
  );

  const contactForm = useFormValidation(
    { name: '', email: '', phone: '', message: '' },
    {
      name: v => !v.trim() ? 'Name required' : null,
      email: v => !/\S+@\S+\.\S+/.test(v) ? 'Valid email required' : null,
      phone: v => !/^\d{10}$/.test(v) ? '10 digits required' : null,
      message: v => v.trim().length < 10 ? 'Minimum 10 characters' : null,
    }
  );

  const [orderSubmitting, setOrderSubmitting] = useState(false);
  const [contactSubmitting, setContactSubmitting] = useState(false);

  const showNotification = useCallback((message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 4000);
  }, []);

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    if (!orderForm.validate()) return;
    const rateCheck = canPlaceOrder();
    if (!rateCheck.allowed) {
      showNotification(`Order limit reached. Wait ${rateCheck.waitMinutes} min.`, 'error');
      return;
    }
    setOrderSubmitting(true);
    try {
      const finalEventType = orderForm.values.eventType === 'Other (please specify)'
        ? orderForm.values.eventTypeOther.trim()
        : orderForm.values.eventType;
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: '🛵 New Order',
          ...orderForm.values,
          eventType: finalEventType,
          message: `Order: ${JSON.stringify(orderForm.values)}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        recordOrder();
        showNotification('Order placed! We will contact you soon.');
        orderForm.reset();
        setShowOrderModal(false);
      } else throw new Error();
    } catch {
      showNotification('Order failed. Try again.', 'error');
    } finally {
      setOrderSubmitting(false);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactForm.validate()) return;
    setContactSubmitting(true);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_key: WEB3FORMS_ACCESS_KEY, subject: 'Contact', ...contactForm.values }),
      });
      const data = await res.json();
      if (data.success) {
        showNotification('Message sent! We’ll reply soon.');
        contactForm.reset();
      } else throw new Error();
    } catch {
      showNotification('Failed. Try again.', 'error');
    } finally {
      setContactSubmitting(false);
    }
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setMobileMenuOpen(false);
    setTimeout(() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  // Password lock screen
  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="bg-[#1a1a1a] rounded-2xl p-8 max-w-md w-full text-center border border-gray-700">
          <FaLock className="text-[#facc15] text-5xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Enter Password</h2>
          <form onSubmit={(e) => { e.preventDefault(); if (passwordInput === 'oombu') setIsUnlocked(true); else setPasswordError('Incorrect'); }}>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-[#facc15]"
              placeholder="Enter password"
              autoFocus
            />
            {passwordError && <p className="text-red-500 text-sm mb-4">{passwordError}</p>}
            <button type="submit" className="w-full bg-[#facc15] text-black font-bold py-3 rounded-lg">Unlock</button>
          </form>
        </div>
      </div>
    );
  }

  const categoryDataMap = {
    'pani-puri': paniPuriItems,
    'momos': momoItems,
    'mojitos': mojitoItems,
    'fries': friesItems,
  };
  const currentMenuItems = selectedCategory ? categoryDataMap[selectedCategory] : [];

  return (
    <div className="bg-black min-h-screen">
      <AnimatePresence>
        {notification.show && <Notification message={notification.message} type={notification.type} />}
      </AnimatePresence>

      <OrderModal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        onSubmit={handleOrderSubmit}
        formData={orderForm}
        errors={orderForm.errors}
        isSubmitting={orderSubmitting}
      />

      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-black/95 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <a href="#home" className="flex items-center gap-2">
            <img src={LOGO_URL} alt="Logo" className="h-8 sm:h-10 w-auto rounded-lg" loading="eager" />
            <span className="text-lg sm:text-xl font-bold text-white">Namma Taste</span>
          </a>
          <div className="hidden md:flex gap-8">
            {navLinks.map(link => <a key={link.id} href={link.href} className="text-white hover:text-[#facc15] transition-colors">{link.name}</a>)}
          </div>
          <button onClick={() => setMobileMenuOpen(true)} className="md:hidden text-white text-2xl focus:outline-none focus:ring-2 focus:ring-[#facc15] rounded" aria-label="Menu">
            <FaBars />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 z-50 md:hidden" onClick={closeMobileMenu} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.3 }} className="fixed top-0 right-0 w-64 h-full bg-[#1a1a1a] border-l border-gray-700 z-50 shadow-xl flex flex-col p-6 md:hidden">
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-bold text-[#facc15]">Menu</span>
                <button onClick={closeMobileMenu} className="text-gray-400 hover:text-white text-2xl"><FaTimes /></button>
              </div>
              <ul className="flex flex-col gap-5">
                {navLinks.map(link => (
                  <li key={link.id}>
                    <a href={link.href} onClick={(e) => { e.preventDefault(); closeMobileMenu(); document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' }); }} className="text-white hover:text-[#facc15] text-lg transition-colors block">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Marquee Bar */}
      <div className="bg-black/80 border-b border-gray-800 py-2">
        <div className="container mx-auto px-4 flex justify-between items-center gap-4">
          <div className="flex-1 overflow-hidden relative h-8">
            <motion.div
              key={marqueeIndex}
              initial={marqueeDirection === 'enter' ? { x: 100, opacity: 0 } : { x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute left-0 top-0 w-full text-white text-sm sm:text-base font-medium whitespace-nowrap"
            >
              {MARQUEE_MESSAGES[marqueeIndex]}
            </motion.div>
          </div>
          <button onClick={() => setShowOrderModal(true)} className="bg-[#facc15] text-black font-bold px-4 py-1.5 rounded-full text-sm hover:scale-105 transition-transform whitespace-nowrap">
            Order Now
          </button>
        </div>
      </div>

      {/* Brand + Buttons */}
      <div className="bg-black py-10 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-row justify-between items-start gap-6">
            <div className="text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">Namma Taste</h1>
              <p className="text-base sm:text-lg text-[#facc15] mt-1">Taste That Hits</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a href="#categories" className="border-2 border-[#facc15] text-[#facc15] px-6 py-2 rounded-full font-semibold text-center hover:bg-[#facc15] hover:text-black transition">Explore Menu</a>
              <a href="#contact" className="border-2 border-[#facc15] text-[#facc15] px-6 py-2 rounded-full font-semibold text-center hover:bg-[#facc15] hover:text-black transition">Contact Us</a>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Stats */}
      <section className="relative min-h-[50vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50 z-10"></div>
        <img src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=1200" alt="Chef" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="container mx-auto px-4 relative z-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {heroStats.map(stat => (
              <div key={stat.id} className="bg-black/50 backdrop-blur-sm rounded-xl p-3 text-center">
                <div className="text-xl sm:text-2xl font-bold text-[#facc15]">{stat.number}</div>
                <div className="text-xs text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories (2x2 mobile, 4x1 desktop) */}
      <section id="categories" className="py-16 sm:py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-4">Our Specialties</h2>
          <div className="w-20 h-1 bg-[#facc15] mx-auto mb-10 rounded-full"></div>
          <p className="text-center text-gray-400 mb-10 text-sm sm:text-base">Click any category to view its items</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {categories.map(cat => (
              <motion.div key={cat.id} onClick={() => handleCategoryClick(cat.id)} className="group cursor-pointer" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <div className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-gray-800 hover:border-[#facc15] transition-all duration-300">
                  <img src={cat.image} alt={cat.title} className="w-full h-32 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="p-3 sm:p-4 text-center">
                    <div className="text-2xl sm:text-4xl mb-1">{cat.emoji}</div>
                    <h3 className="text-sm sm:text-lg font-bold text-white">{cat.title}</h3>
                    <p className="text-gray-400 text-xs sm:text-sm mt-1 hidden sm:block">{cat.description}</p>
                    <div className="mt-2 inline-flex items-center gap-1 text-[#facc15] text-xs sm:text-sm font-medium">Click <FaArrowRight size={10} /></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Menu */}
      {selectedCategory && (
        <section id="menu" className="py-16 sm:py-20 bg-black">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-4">{categories.find(c => c.id === selectedCategory)?.title}</h2>
            <div className="w-20 h-1 bg-[#facc15] mx-auto mb-10 rounded-full"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {currentMenuItems.map((item, idx) => (
                <motion.div key={item.id} className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-gray-800 hover:border-[#facc15] transition-all duration-300" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} whileHover={{ scale: 1.02 }}>
                  <img src={item.image} alt={item.name} className="w-full h-40 sm:h-48 object-cover" loading="lazy" />
                  <div className="p-3 sm:p-4">
                    <div className="flex justify-between items-start flex-wrap gap-1">
                      <h3 className="text-base sm:text-lg font-bold text-white">{item.name}</h3>
                      {item.badge && <span className="text-xs bg-[#facc15]/20 text-[#facc15] px-2 py-1 rounded-full">{item.badge}</span>}
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm mt-1">{item.description}</p>
                    <div className="mt-2 text-[#facc15] font-bold text-sm sm:text-base">{item.price}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-16 sm:py-20 bg-[#1a1a1a]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-4">Why Choose Us</h2>
          <div className="w-20 h-1 bg-[#facc15] mx-auto mb-10 rounded-full"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map(feature => (
              <motion.div key={feature.id} className="text-center p-4 sm:p-5 rounded-xl bg-black border border-gray-800 hover:border-[#facc15] transition-all" whileHover={{ y: -5 }}>
                <div className="text-3xl sm:text-4xl mb-2">{feature.icon === 'FaLeaf' ? '🥗' : feature.icon === 'FaShieldAlt' ? '🧼' : feature.icon === 'FaBolt' ? '🛵' : '💰'}</div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-1">{feature.title}</h3>
                <p className="text-gray-400 text-xs sm:text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-16 sm:py-20 bg-black">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-[#facc15] mx-auto mb-10 rounded-full"></div>
          <form onSubmit={handleContactSubmit} className="space-y-4 sm:space-y-5">
            {['name', 'email', 'phone', 'message'].map(field => (
              <div key={field}>
                <input
                  type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                  name={field}
                  placeholder={field === 'message' ? 'Your Message (min 10 characters) *' : `${field.charAt(0).toUpperCase() + field.slice(1)} *`}
                  value={contactForm.values[field]}
                  onChange={contactForm.handleChange}
                  className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#facc15] text-sm sm:text-base"
                  aria-invalid={!!contactForm.errors[field]}
                />
                {contactForm.errors[field] && <p className="text-red-500 text-sm mt-1">{contactForm.errors[field]}</p>}
              </div>
            ))}
            <button type="submit" disabled={contactSubmitting} className="w-full bg-[#facc15] text-black font-bold py-3 rounded-lg disabled:opacity-50">
              {contactSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/90 border-t border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#facc15] mb-3">Namma Taste</h3>
              <p className="text-gray-400 text-sm">Taste That Feels</p>
              <div className="flex gap-4 mt-4">
                <a href="https://wa.me/917708727459" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-gray-400 hover:text-[#facc15] text-xl"><FaWhatsapp /></a>
                <a href="https://www.instagram.com/namma.taste/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-[#facc15] text-xl"><FaInstagram /></a>
                <a href="#map" className="text-gray-400 hover:text-[#facc15] text-xl" aria-label="Map"><FaMapMarkerAlt /></a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                {navLinks.map(link => <li key={link.id}><a href={link.href} className="text-gray-400 hover:text-[#facc15]">{link.name}</a></li>)}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3">Contact</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p className="flex items-center gap-2"><FaPhone className="text-[#facc15]" /><a href="tel:+917708727459" className="hover:text-[#facc15]">+91 77087 27459</a></p>
                <p className="flex items-center gap-2"><FaPhone className="text-[#facc15]" /><a href="tel:+918973674644" className="hover:text-[#facc15]">+91 89736 74644</a></p>
                <p className="flex items-center gap-2"><FaEnvelope className="text-[#facc15]" /><a href="mailto:hellonammataste@gmail.com" className="hover:text-[#facc15]">hellonammataste@gmail.com</a></p>
                <p className="flex items-start gap-2"><FaMapMarkerAlt className="text-[#facc15] mt-1" />Tirunelveli Town, Near Koddeswaranagar Street, Tirunelveli, Tamil Nadu - 627001</p>
              </div>
            </div>
            <div id="map">
              <h4 className="font-bold text-white mb-3">Find Us</h4>
              <iframe title="Location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126596.21489318669!2d77.66315294999999!3d8.71391245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0410f0aab0b4b9%3A0x5b4b3b2b0b0b0b0!2sTirunelveli%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin" width="100%" height="200" style={{border:0, borderRadius:'12px'}} allowFullScreen loading="lazy" className="rounded-xl"></iframe>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-xs sm:text-sm">
            <p>© {new Date().getFullYear()} Namma Taste. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;