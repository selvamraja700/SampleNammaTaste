import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { categories, paniPuriItems, momoItems, mojitoItems, friesItems } from '../data';

const Features = ({ selectedCategory, handleCategoryClick, setSelectedCategory }) => {
  const categoryDataMap = { 'pani-puri': paniPuriItems, 'momos': momoItems, 'mojitos': mojitoItems, 'fries': friesItems };
  const currentMenuItems = selectedCategory ? categoryDataMap[selectedCategory] : [];

  return (
    <>
      <section id="categories" className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-3xl md:text-4xl lg:text-5xl">Our Specialties</h2>
          <p className="text-center text-gray-400 mb-10 md:mb-16 text-base md:text-lg">Select a category to view our delicious offerings</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {categories.map((cat, idx) => (
              <motion.div key={cat.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} onClick={() => handleCategoryClick(cat.id)} className="cursor-pointer group">
                <div className="glass-panel rounded-[2rem] p-5 flex flex-col items-center relative overflow-hidden h-full min-h-[48px] transition-all hover:bg-white/5 active:bg-white/10">
                  <div className="w-full aspect-video rounded-xl overflow-hidden mb-6">
                    <img src={cat.image} alt={cat.title} className="w-full h-full object-cover block pointer-events-none select-none" loading="lazy" />
                  </div>
                  <div className="text-4xl mb-3">{cat.emoji}</div>
                  <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-2">{cat.title}</h3>
                  <p className="text-gray-400 text-sm md:text-base text-center mb-4">{cat.description}</p>
                  <div className="mt-auto inline-flex items-center gap-2 text-amber-400 text-sm font-semibold transition-all min-h-[44px]">
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
          <motion.section id="menu" key={selectedCategory} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="py-12 md:py-16 bg-white/[0.02] border-y border-white/5 relative">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10 md:mb-12">
                <div>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">{categories.find(c => c.id === selectedCategory)?.title} Menu</h2>
                  <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mt-4 rounded-full"></div>
                </div>
                <button onClick={() => setSelectedCategory(null)} className="text-gray-400 hover:text-white transition-colors text-sm font-medium min-h-[48px] px-2 flex items-center active:text-white/50">
                  Close Menu ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {currentMenuItems.map((item, idx) => (
                  <motion.div key={item.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.05 }} className="glass-panel rounded-[2rem] p-5 flex flex-col h-full">
                    <div className="relative rounded-2xl overflow-hidden aspect-video mb-5 bg-black/20">
                      {/* Strictly display-only image */}
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover block pointer-events-none select-none" loading="lazy" />
                      {item.badge && <span className="absolute top-3 right-3 bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg pointer-events-none select-none">{item.badge}</span>}
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl md:text-2xl font-bold text-white font-heading leading-tight mb-2">{item.name}</h3>
                      <p className="text-gray-400 text-sm md:text-base leading-relaxed">{item.description}</p>
                    </div>
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
