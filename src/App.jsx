import React, { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';

// Hooks & Helpers
import { useRateLimiter, useFormValidation } from './utils/hooks';
import { getTodayDate, getMaxDate, WEB3FORMS_ACCESS_KEY } from './utils/helpers';

// Components
import PasswordLock from './components/PasswordLock';
import Notification from './components/Notification';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import { ContactForm, OrderModal } from './components/Forms';
import Footer from './components/Footer';

function App() {
  const [isUnlocked, setIsUnlocked] = useState(true);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const { canPlaceOrder, recordOrder } = useRateLimiter('namma_taste_orders_timestamps', 5, 30 * 60 * 1000);

  const orderForm = useFormValidation(
    { name: '', phone: '', address: '', eventType: '', eventTypeOther: '', eventDate: new Date(), items: '' },
    {
      name: v => !v.trim() ? 'Name is required' : null,
      phone: v => !/^\d{10}$/.test(v) ? 'Must be 10 digits' : null,
      address: v => !v.trim() ? 'Event address required' : null,
      eventType: v => !v ? 'Please select an event type' : null,
      eventTypeOther: (v, all) =>
        all.eventType === 'Other (please specify)' && (!v.trim() || v.length < 25 || /\s/.test(v))
          ? 'Minimum 25 characters, no spaces' : null,
      eventDate: v => !v ? 'Event date required' : null,
      items: v => !v.trim() ? 'Please specify items of interest' : null,
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

  const openInquiry = (item = null) => {
    if (item) {
      orderForm.setValues(prev => ({ ...prev, items: item.name }));
    }
    setShowOrderModal(true);
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    if (!orderForm.validate()) return;
    
    const rateCheck = canPlaceOrder();
    if (!rateCheck.allowed) {
      showNotification(`Inquiry limit reached. Wait ${rateCheck.waitMinutes} min.`, 'error');
      return;
    }
    setOrderSubmitting(true);
    try {
      const finalEventType = orderForm.values.eventType === 'Other (please specify)'
        ? orderForm.values.eventTypeOther.trim() : orderForm.values.eventType;
        
      const orderMessage = `
Booking Inquiry details: ${JSON.stringify(orderForm.values, null, 2)}
`;

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY, subject: '📅 New Booking Inquiry', ...orderForm.values,
          eventType: finalEventType, message: orderMessage,
        }),
      });
      const data = await res.json();
      if (data.success) {
        recordOrder();
        showNotification('Inquiry sent successfully! We will contact you soon.');
        orderForm.reset();
        setShowOrderModal(false);
      } else throw new Error();
    } catch {
      showNotification('Inquiry failed. Try again.', 'error');
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

  const handlePasswordSubmit = (e) => {
    e.preventDefault(); 
    if (passwordInput === 'oombu') setIsUnlocked(true); 
    else setPasswordError('Incorrect password'); 
  };

  if (!isUnlocked) {
    return <PasswordLock passwordInput={passwordInput} setPasswordInput={setPasswordInput} passwordError={passwordError} onSubmit={handlePasswordSubmit} />;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-amber-500/30 selection:text-amber-200">
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

      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} openInquiry={openInquiry} />

      <Hero />

      <Features selectedCategory={selectedCategory} handleCategoryClick={handleCategoryClick} setSelectedCategory={setSelectedCategory} />

      <Testimonials />

      <ContactForm contactForm={contactForm} contactSubmitting={contactSubmitting} handleContactSubmit={handleContactSubmit} />

      <Footer openInquiry={openInquiry} />
    </div>
  );
}

export default App;