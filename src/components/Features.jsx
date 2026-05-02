import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { categories, paniPuriItems, momoItems, mojitoItems, friesItems } from '../data';

const Features = ({ selectedCategory, handleCategoryClick, setShowOrderModal, setSelectedCategory }) => {
  const categoryDataMap = { 'pani-puri': paniPuriItems, 'momos': momoItems, 'mojitos': mojitoItems, 'fries': friesItems };
  const currentMenuItems = selectedCategory ? categoryDataMap[selectedCategory] : [];

  return (
    <>
      <section id="categories" className="py-24 relative">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Our Specialties</h2>
          <p className="text-center text-gray-400 mb-16 text-lg">Select a category to view our delicious offerings</p>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {categories.map((cat, idx) => (
              <motion.div key={cat.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} onClick={() => handleCategoryClick(cat.id)} className="group cursor-pointer">
                <div className="glass-panel glass-panel-hover rounded-[2rem] p-4 flex flex-col items-center relative overflow-hidden h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="w-full aspect-video rounded-xl overflow-hidden mb-6 relative">
                    <img src={cat.image} alt={cat.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                  </div>
                  <div className="text-4xl mb-3 group-hover:-translate-y-2 transition-transform duration-300">{cat.emoji}</div>
                  <h3 className="text-xl font-heading font-bold text-white mb-2">{cat.title}</h3>
                  <p className="text-gray-400 text-sm text-center mb-4 hidden sm:block">{cat.description}</p>
                  <div className="mt-auto inline-flex items-center gap-2 text-amber-400 text-sm font-semibold group-hover:gap-3 transition-all">
                    View Menu <FaArrowRight size={12} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Menu */}
      <AnimatePresence mode="wait">
        {selectedCategory && (
          <motion.section id="menu" key={selectedCategory} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="py-12 bg-white/[0.02] border-y border-white/5 relative">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-end mb-12">
                <div>
                  <h2 className="text-4xl font-heading font-bold text-white">{categories.find(c => c.id === selectedCategory)?.title} Menu</h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mt-4 rounded-full"></div>
                </div>
                <button onClick={() => setSelectedCategory(null)} className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Close Menu ✕</button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentMenuItems.map((item, idx) => (
                  <motion.div key={item.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.05 }} className="glass-panel glass-panel-hover rounded-3xl p-5 group flex flex-col h-full">
                    <div className="relative rounded-2xl overflow-hidden aspect-video mb-5">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      {item.badge && <span className="absolute top-3 right-3 bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">{item.badge}</span>}
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <h3 className="text-xl font-bold text-white font-heading leading-tight">{item.name}</h3>
                        <div className="text-amber-400 font-bold whitespace-nowrap text-lg">{item.price}</div>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                    </div>
                    <button onClick={() => setShowOrderModal(true)} className="mt-6 w-full py-3 rounded-xl border border-white/10 text-white font-medium hover:bg-amber-400 hover:text-black hover:border-amber-400 transition-all duration-300">
                      Add to Order
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export default Features;
