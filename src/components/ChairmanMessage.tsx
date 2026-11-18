import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { HeadingBackground } from "./HeadingBackground";

export function ChairmanMessage() {
  const { t } = useLanguage();

  return (
    <section id="chairman" className="relative py-24 lg:py-32 bg-[#111] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-islamic-pattern mix-blend-overlay opacity-10" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="relative block mx-auto w-full max-w-4xl text-center mb-16"
        >
          <HeadingBackground />
          <h2 className={`${t.fontClassSerif} text-[44px] md:text-5xl text-brand-gold mb-4 tracking-wide`}>
            {t.chairmanHeading}
          </h2>
          <div className="flex justify-center">
            <div className="h-0.5 w-16 bg-[#991b1b]"></div>
            <div className="h-0.5 w-3 bg-brand-gold ml-2"></div>
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 sm:gap-12 items-center bg-[#1a1a1a] border border-[#d4af37]/20 p-4 sm:p-8 md:p-12 rounded-lg shadow-2xl relative">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-brand-gold/40"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-brand-gold/40"></div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full md:w-auto md:shrink-0 flex flex-col items-center max-w-full overflow-hidden px-2"
          >
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-[#d4af37]/50 shadow-[0_0_30px_rgba(212,175,55,0.2)] mb-6 bg-brand-black flex items-center justify-center shrink-0">
              <img src="/chairman.png" alt="Chairman" className="w-full h-full object-cover object-top" />
            </div>
            <h3 
              className={`${t.fontClassSerif} text-brand-gold text-center max-w-full w-full text-[48px] md:text-[36px] lg:text-[47px] leading-tight whitespace-pre-wrap`}
            >
              {t.chairmanName}
            </h3>
            <p className="text-[#991b1b] text-[14px] sm:text-[16px] tracking-widest uppercase mt-2 text-center whitespace-normal leading-relaxed max-w-full">
              {t.chairmanSubtitle}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full md:flex-1 min-w-0"
          >
            <svg className="w-10 h-10 text-brand-gold/20 mb-4" fill="currentColor" viewBox="0 0 32 32">
              <path d="M14.027 22.027c0 3.314-2.686 6-6 6s-6-2.686-6-6c0-3.313 2.686-6 6-6v-4c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10v-10h-10v10h6zM32.027 22.027c0 3.314-2.686 6-6 6s-6-2.686-6-6c0-3.313 2.686-6 6-6v-4c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10v-10h-10v10h6z" />
            </svg>
            <p className={`text-gray-300 leading-relaxed text-[17px] mb-6 whitespace-pre-line text-justify ${t.fontClassSans}`}>
              {t.chairmanMsg1}
            </p>
            <p className={`text-gray-300 leading-relaxed text-[17px] whitespace-pre-line text-justify ${t.fontClassSans}`}>
              {t.chairmanMsg2}
            </p>
            
            <div className="mt-8 pt-6 border-t border-[#d4af37]/10 flex items-center gap-4">
              <a 
                href="https://wa.me/919680872049"
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2 bg-[#d4af37]/10 text-brand-gold hover:bg-[#d4af37]/20 border border-[#d4af37]/30 transition-all rounded-full text-[13px] uppercase tracking-widest"
              >
                {t.chairmanContactbtn}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
