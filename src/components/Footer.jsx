import React from 'react';
import { FaWhatsapp, FaInstagram, FaFacebookF, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { navLinks } from '../data';
import { LOGO_URL } from '../utils/helpers';

const Footer = ({ openInquiry }) => {
  return (
    <footer className="border-t border-white/5 bg-[#050505] relative overflow-hidden flex flex-col items-center pb-6 pt-16 md:pt-24">
      {/* Ambient Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full md:w-[800px] h-32 md:h-48 bg-amber-500/5 rounded-b-[100%] blur-[80px] pointer-events-none"></div>
      
      <div className="w-full max-w-5xl mx-auto px-5 relative z-10 flex flex-col items-center">
        
        {/* 1. Brand Section */}
        <div className="flex flex-col items-center mb-10 md:mb-12 text-center group">
          <a href="#home" className="inline-block mb-5 active:scale-95 transition-transform relative">
            <div className="absolute inset-0 bg-amber-500 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            <img src={LOGO_URL} alt="Logo" className="relative h-16 w-16 md:h-20 md:w-20 rounded-full object-cover ring-2 ring-amber-400/50 shadow-xl" />
          </a>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-white mb-3 tracking-wide">Namma Taste</h2>
          <p className="text-gray-400 text-sm md:text-base max-w-sm md:max-w-md leading-relaxed">
            Experience the finest street food with a modern twist. Taste that truly hits the spot.
          </p>
        </div>
        
        {/* 2. Social Media Icons */}
        <div className="flex items-center gap-6 md:gap-8 mb-12">
          <a 
            href="https://wa.me/917708727459?text=Hi,%20my%20name%20is%20" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-12 h-12 md:w-14 md:h-14 rounded-full glass-panel flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#25D366] hover:border-[#25D366] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(37,211,102,0.3)]"
            title="WhatsApp"
          >
            <FaWhatsapp size={24}/>
          </a>
          <a 
            href="https://www.instagram.com/namma.taste/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-12 h-12 md:w-14 md:h-14 rounded-full glass-panel flex items-center justify-center text-gray-300 hover:text-white hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:border-transparent transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(220,39,67,0.3)] relative overflow-hidden group"
            title="Instagram"
          >
            <FaInstagram size={24} className="relative z-10"/>
          </a>
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-12 h-12 md:w-14 md:h-14 rounded-full glass-panel flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(24,119,242,0.3)]"
            title="Facebook"
          >
            <FaFacebookF size={22}/>
          </a>
        </div>
        
        {/* 3. Contact Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 md:gap-16 mb-14 w-full">
          <a href="tel:+917708727459" className="flex items-center gap-3 md:gap-4 text-gray-300 hover:text-amber-400 transition-colors group">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-500/10 transition-all"><FaPhone size={14}/></div>
            <span className="font-medium tracking-wider md:text-lg">+91 77087 27459</span>
          </a>
          <div className="hidden sm:block w-px h-8 md:h-10 bg-white/10"></div>
          <a href="tel:+918973674644" className="flex items-center gap-3 md:gap-4 text-gray-300 hover:text-amber-400 transition-colors group">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-500/10 transition-all"><FaPhone size={14}/></div>
            <span className="font-medium tracking-wider md:text-lg">+91 89736 74644</span>
          </a>
        </div>
        
        {/* 4. Main Content Area */}
        <div className="w-full border border-white/10 glass-panel rounded-[2rem] p-6 sm:p-8 md:p-12 mb-14 flex flex-col md:flex-row justify-between items-center gap-10 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent pointer-events-none"></div>
          
          {/* Email ID (Left) */}
          <div className="flex flex-col items-center md:items-start w-full md:w-1/2 relative z-10">
            <a href="mailto:hellonammataste@gmail.com" className="group flex flex-col md:flex-row items-center md:items-start gap-4 hover:bg-white/5 p-4 md:p-5 rounded-2xl transition-colors border border-transparent hover:border-white/5 w-full">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-110 transition-transform">
                <FaEnvelope size={24} className="md:w-7 md:h-7" />
              </div>
              <div className="flex flex-col text-center md:text-left mt-2 md:mt-0">
                <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Direct Email</span>
                <span className="text-base sm:text-lg md:text-xl font-medium text-white group-hover:text-amber-400 transition-colors break-all">hellonammataste@gmail.com</span>
              </div>
            </a>
          </div>
          
          <div className="hidden md:block w-px h-32 bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
          
          {/* Quick Links & Button (Right) */}
          <div className="flex flex-col items-center md:items-end w-full md:w-1/2 relative z-10 md:pr-4">
            <ul className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-4 mb-8">
              {navLinks.map(link => (
                <li key={link.id}>
                  <a href={link.href} className="text-gray-400 hover:text-amber-400 active:text-amber-300 text-sm md:text-base font-medium transition-colors relative group">
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
            <button 
              onClick={openInquiry} 
              className="btn-primary px-8 py-3.5 md:py-4 w-full sm:w-auto text-base md:text-lg rounded-full shadow-[0_0_20px_rgba(251,191,36,0.2)] hover:shadow-[0_0_30px_rgba(251,191,36,0.4)] transition-all hover:-translate-y-1"
            >
              Book Event
            </button>
          </div>
        </div>
        
        {/* 5. Map Section */}
        <div className="w-full flex flex-col items-center max-w-3xl mx-auto">
          <div className="w-full h-[200px] sm:h-[250px] md:h-[300px] rounded-2xl md:rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-2xl relative group bg-white/5">
            <iframe 
              title="Location Map" 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126596.21489318669!2d77.66315294999999!3d8.71391245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0410f0aab0b4b9%3A0x5b4b3b2b0b0b0b0!2sTirunelveli%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              className="group-hover:scale-[1.02] transition-transform duration-1000 ease-out"
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
            ></iframe>
          </div>
          <p className="flex items-center justify-center gap-2 text-gray-400 text-xs sm:text-sm md:text-base mt-5 tracking-wide px-4 text-center">
            <FaMapMarkerAlt className="text-amber-500 shrink-0" size={16}/>
            Near Koddeswaranagar St, Tirunelveli, Tamil Nadu - 627001
          </p>
        </div>
        
      </div>
      
      {/* Copyright */}
      <div className="w-full border-t border-white/5 mt-16 pt-8 pb-4 flex flex-col sm:flex-row justify-center items-center gap-2 md:gap-4 text-[10px] md:text-xs text-gray-600 font-medium uppercase tracking-widest">
        <p>© {new Date().getFullYear()} Namma Taste.</p>
        <span className="hidden sm:inline text-white/10">|</span>
        <p>Premium Street Food.</p>
      </div>
    </footer>
  );
};

export default Footer;
