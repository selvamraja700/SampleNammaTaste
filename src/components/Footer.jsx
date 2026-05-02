import React from 'react';
import { FaWhatsapp, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { navLinks } from '../data';
import { LOGO_URL } from '../utils/helpers';

const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-[#030303] pt-16 pb-8 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-32 bg-amber-500/10 rounded-t-[100%] blur-[80px]"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 mb-16">
          <div>
            <a href="#home" className="inline-block mb-6"><img src={LOGO_URL} alt="Logo" className="h-12 w-12 rounded-full object-cover ring-2 ring-amber-400/50" /></a>
            <h3 className="text-2xl font-heading font-bold text-white mb-2">Namma Taste</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">Serving the most authentic and hygienic street food experience. Taste that truly hits the spot.</p>
            <div className="flex gap-4">
              <a href="https://wa.me/917708727459" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-gray-400 hover:text-amber-400 hover:border-amber-400/50 transition-all"><FaWhatsapp size={18}/></a>
              <a href="https://www.instagram.com/namma.taste/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-gray-400 hover:text-amber-400 hover:border-amber-400/50 transition-all"><FaInstagram size={18}/></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-heading font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {navLinks.map(link => (
                <li key={link.id}><a href={link.href} className="text-gray-400 hover:text-amber-400 text-sm transition-colors">{link.name}</a></li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-heading font-bold text-white mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-amber-400"><FaPhone size={12}/></div> <a href="tel:+917708727459" className="hover:text-white transition-colors">+91 77087 27459</a></li>
              <li className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-amber-400"><FaPhone size={12}/></div> <a href="tel:+918973674644" className="hover:text-white transition-colors">+91 89736 74644</a></li>
              <li className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-amber-400"><FaEnvelope size={12}/></div> <a href="mailto:hellonammataste@gmail.com" className="hover:text-white transition-colors">hellonammataste@gmail.com</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-heading font-bold text-white mb-6">Location</h4>
            <div className="glass-panel p-2 rounded-2xl">
              <iframe title="Location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126596.21489318669!2d77.66315294999999!3d8.71391245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0410f0aab0b4b9%3A0x5b4b3b2b0b0b0b0!2sTirunelveli%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin" width="100%" height="150" style={{border:0, borderRadius:'12px'}} allowFullScreen loading="lazy"></iframe>
            </div>
            <p className="flex items-start gap-2 text-sm text-gray-400 mt-4 leading-relaxed">
              <FaMapMarkerAlt className="text-amber-400 mt-1 shrink-0" />
              Near Koddeswaranagar Street, Tirunelveli Town, Tamil Nadu - 627001
            </p>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Namma Taste. All rights reserved.</p>
          <p>Designed with ❤️ for premium street food.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
