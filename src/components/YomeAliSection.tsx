import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { yomeAliTranslations } from "./YomeAliTranslations";
import { MissionBoxBackground } from "./MissionBoxBackground";
import { SimpleGlitter } from "./SimpleGlitter";
import { X } from "lucide-react";

export function YomeAliSection() {
  const { t, language } = useLanguage();
  const yot = yomeAliTranslations[language as keyof typeof yomeAliTranslations] || yomeAliTranslations["en"];
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    {
      src: "https://images.unsplash.com/photo-1564683214965-3619addd900d?auto=format&fit=crop&q=80&w=1200", // mosque/dargah
      title: yot.img1Title
    },
    {
      src: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&q=80&w=1200", // gathering/people
      title: yot.img2Title
    },
    {
      src: "https://images.unsplash.com/photo-1519671482749-fd098f3ec18a?auto=format&fit=crop&q=80&w=1200", // stage/decoration
      title: yot.img3Title
    },
    {
      src: "https://images.unsplash.com/photo-1604145952671-55b62b1b36bb?auto=format&fit=crop&q=80&w=1200", // reading/reciting
      title: yot.img4Title
    },
    {
      src: "https://images.unsplash.com/photo-1523580494112-071d16940d14?auto=format&fit=crop&q=80&w=1200", // audience
      title: yot.img5Title
    },
    {
      src: "https://images.unsplash.com/photo-1563212036-7c152a557b77?auto=format&fit=crop&q=80&w=1200", // prize
      title: yot.img6Title
    },
    {
      src: "https://images.unsplash.com/photo-1584260029314-e0ebf928e4e9?auto=format&fit=crop&q=80&w=1200", // calligraphy
      title: yot.img7Title
    },
    {
      src: "https://images.unsplash.com/photo-1542382156909-9ae37b3f56fd?auto=format&fit=crop&q=80&w=1200", // ramadan lighting
      title: yot.img8Title
    }
  ];

  return (
    <div className="relative py-12 md:py-24 bg-brand-black overflow-hidden pointer-events-auto border-t border-brand-gold/10 mt-16">
      {/* Background ornamentation */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[120px] top-1/4 -right-64 mix-blend-screen" />
        <div className="absolute w-[600px] h-[600px] bg-[#991b1b]/5 rounded-full blur-[120px] bottom-1/4 -left-64 mix-blend-screen" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center">
        {/* Header section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="relative inline-block mx-auto max-w-4xl text-center mb-16 py-12 px-8 md:px-16 bg-brand-dark/80 backdrop-blur-md rounded-3xl border border-brand-gold/40 shadow-[0_0_60px_rgba(212,175,55,0.2),inset_0_0_30px_rgba(212,175,55,0.1)] overflow-hidden"
        >
          <div className="absolute inset-0 opacity-50 pointer-events-none">
            <MissionBoxBackground index={1} variant="mixed" />
          </div>
          
          <h2 className={`${t.fontClassSerif} text-[30px] md:text-5xl text-brand-gold drop-shadow-[0_0_20px_rgba(212,175,55,0.6)] tracking-wide uppercase relative z-10 font-bold mb-4`}>
            {yot.title}
          </h2>
          <div className="flex items-center justify-center gap-4 py-2 relative z-10">
            <div className="w-12 h-[1px] bg-[#991b1b]"></div>
            <div className="w-2 h-2 rounded-full bg-brand-gold"></div>
            <div className="w-12 h-[1px] bg-[#991b1b]"></div>
          </div>
          <p className={`${t.fontClassSans} text-[15px] md:text-xl text-gray-300 mt-4 max-w-2xl mx-auto relative z-10 italic`}>
            {yot.subtitle}
          </p>
        </motion.div>

        {/* Content Section */}
        <div className="relative w-full max-w-5xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8 relative z-10 bg-[#000000]/80 p-8 md:p-14 rounded-3xl border border-brand-gold/15 hover:border-brand-gold/40 transition-all duration-700 shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-md overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            <SimpleGlitter />
            
            <p className={`text-gray-300 text-[16px] md:text-[19px] leading-[2.1] text-justify font-light px-2 md:px-6 relative z-10 ${t.fontClassSans}`}>
              {yot.p1}
            </p>
            <div className="flex items-center justify-center gap-4 py-2 opacity-60 relative z-10">
               <div className="w-12 h-[1px] bg-brand-gold/30"></div>
               <div className="w-2 h-2 rounded-full bg-brand-gold/50"></div>
               <div className="w-12 h-[1px] bg-brand-gold/30"></div>
            </div>
            <p className={`text-gray-300 text-[16px] md:text-[19px] leading-[2.1] text-justify font-light px-2 md:px-6 relative z-10 ${t.fontClassSans}`}>
              {yot.p2}
            </p>
            <div className="flex items-center justify-center gap-4 py-2 opacity-60 relative z-10">
               <div className="w-12 h-[1px] bg-brand-gold/30"></div>
               <div className="w-2 h-2 rounded-full bg-brand-gold/50 transform rotate-45"></div>
               <div className="w-12 h-[1px] bg-brand-gold/30"></div>
            </div>
            <p className={`text-gray-300 text-[16px] md:text-[19px] leading-[2.1] text-justify font-light px-2 md:px-6 relative z-10 ${t.fontClassSans}`}>
              {yot.p3}
            </p>
          </motion.div>
        </div>

        {/* Gallery Grid */}
        <div className="w-full mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 relative z-10">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex flex-col items-center col-span-1"
            >
              <div 
                className="w-full aspect-[4/3] rounded-2xl overflow-hidden border border-brand-gold/20 hover:border-brand-gold/60 transition-all duration-500 cursor-pointer group shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.2)] relative"
                onClick={() => setSelectedImage(img.src)}
              >
                <div className="absolute inset-0 bg-brand-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none mix-blend-overlay"></div>
                <img 
                  src={img.src} 
                  alt={img.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                />
              </div>
              <div className="mt-4 flex items-center justify-center gap-2">
                <div className="w-4 h-[1px] bg-brand-gold/50"></div>
                <p className={`text-brand-gold text-[10px] sm:text-[13px] md:text-[14px] tracking-wider sm:tracking-widest uppercase font-medium text-center ${t.fontClassSerif}`}>
                  {img.title}
                </p>
                <div className="w-4 h-[1px] bg-brand-gold/50"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 cursor-pointer"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-brand-gold hover:text-white transition-colors z-[110] p-2 bg-black/50 rounded-full border border-brand-gold/30"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage}
              alt="Enlarged view"
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl border border-brand-gold/20"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
