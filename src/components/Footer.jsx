import React from 'react';
import { FaWhatsapp, FaInstagram, FaFacebookF, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { LOGO_URL } from '../utils/helpers';

const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-[#050505] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full md:w-[600px] h-32 bg-amber-500/10 rounded-t-[100%] blur-[80px] pointer-events-none"></div>
      
      <div className="w-full max-w-7xl mx-auto px-5 py-10 relative z-10">
        {/* 2x2 Grid (Mobile) / 4-Col Grid (Desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          
          {/* Section 1: About Shop */}
          <div className="flex flex-col">
            <h4 className="text-base md:text-xl font-heading font-bold text-white mb-3 md:mb-5">About Shop</h4>
            <a href="#home" className="inline-block mb-3 active:scale-95 transition-transform">
              <img src={LOGO_URL} alt="Logo" className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover ring-2 ring-amber-400/50" />
            </a>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed pr-2">
              Namma Taste serves the most authentic and hygienic street food experience. Taste that truly hits the spot, crafted with passion.
            </p>
          </div>

          {/* Section 2: Contact Us */}
          <div className="flex flex-col">
            <h4 className="text-base md:text-xl font-heading font-bold text-white mb-3 md:mb-5">Contact Us</h4>
            <div className="flex flex-col gap-3 md:gap-4">
              <a href="tel:+917708727459" className="flex items-center gap-3 text-gray-400 hover:text-amber-400 transition-colors group">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 flex items-center justify-center text-amber-400 shrink-0 group-hover:bg-amber-500/10 transition-colors">
                  <FaPhone size={12}/>
                </div>
                <span className="text-xs md:text-sm font-medium tracking-wide break-all">+91 77087 27459</span>
              </a>
              <a href="tel:+918973674644" className="flex items-center gap-3 text-gray-400 hover:text-amber-400 transition-colors group">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 flex items-center justify-center text-amber-400 shrink-0 group-hover:bg-amber-500/10 transition-colors">
                  <FaPhone size={12}/>
                </div>
                <span className="text-xs md:text-sm font-medium tracking-wide break-all">+91 89736 74644</span>
              </a>
            </div>
          </div>

          {/* Section 3: Follow Us */}
          <div className="flex flex-col">
            <h4 className="text-base md:text-xl font-heading font-bold text-white mb-3 md:mb-5">Follow Us</h4>
            <div className="flex items-center gap-3 md:gap-4">
              <a 
                href="https://wa.me/917708727459" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 md:w-12 md:h-12 rounded-full glass-panel flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#25D366] hover:border-[#25D366] transition-all duration-300 hover:-translate-y-1 shadow-lg"
                title="WhatsApp"
              >
                <FaWhatsapp size={18} className="md:w-[20px] md:h-[20px]"/>
              </a>
              <a 
                href="https://www.instagram.com/namma.taste/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 md:w-12 md:h-12 rounded-full glass-panel flex items-center justify-center text-gray-300 hover:text-white hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:border-transparent transition-all duration-300 hover:-translate-y-1 shadow-lg relative overflow-hidden group"
                title="Instagram"
              >
                <FaInstagram size={18} className="relative z-10 md:w-[20px] md:h-[20px]"/>
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 md:w-12 md:h-12 rounded-full glass-panel flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] transition-all duration-300 hover:-translate-y-1 shadow-lg"
                title="Facebook"
              >
                <FaFacebookF size={16} className="md:w-[18px] md:h-[18px]"/>
              </a>
            </div>
          </div>

          {/* Section 4: Location */}
          <div className="flex flex-col">
            <h4 className="text-base md:text-xl font-heading font-bold text-white mb-3 md:mb-5">Location</h4>
            <div className="w-full h-24 md:h-32 rounded-lg overflow-hidden ring-1 ring-white/10 hover:ring-amber-400/50 transition-all duration-500 shadow-xl group">
              <iframe 
                title="Location Map" 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126596.21489318669!2d77.66315294999999!3d8.71391245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0410f0aab0b4b9%3A0x5b4b3b2b0b0b0b0!2sTirunelveli%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                className="group-hover:scale-105 transition-transform duration-700"
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
              ></iframe>
            </div>
            <p className="flex items-start gap-2 text-[10px] md:text-xs text-gray-400 mt-3 md:mt-4 leading-relaxed">
              <FaMapMarkerAlt className="text-amber-500 mt-0.5 shrink-0" size={12}/>
              <span>Near Koddeswaranagar St, Tirunelveli, Tamil Nadu - 627001</span>
            </p>
          </div>

        </div>

        {/* Copyright */}
        <div className="w-full border-t border-white/5 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-[10px] md:text-xs text-gray-600 font-medium">
          <p>© {new Date().getFullYear()} Namma Taste. All rights reserved.</p>
          <p>Premium Street Food.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;