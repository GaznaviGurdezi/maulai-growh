import { motion } from "motion/react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { HeadingBackground } from "./HeadingBackground";
import { LeadershipHeritage } from "./LeadershipHeritage";

export function About() {
  const { t, language } = useLanguage();
  const location = useLocation();
  const isAboutPage = location.pathname === '/about' || location.pathname === '/about/';

  return (
    <section id="about" className="relative py-24 lg:py-32 bg-brand-black overflow-hidden pointer-events-auto border-t border-brand-gold/10">
      {/* Background ornamentation */}
      <div className="absolute top-0 left-0 w-full flex justify-center items-center pointer-events-none opacity-80">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"></div>
        <div className="absolute w-3 h-3 rotate-45 border border-brand-gold bg-black"></div>
        <div className="absolute w-6 h-6 rotate-45 border border-brand-gold/30"></div>
      </div>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-brand-dark to-transparent opacity-80" />
      <div className="absolute w-64 h-64 bg-brand-crimson/5 rounded-full blur-[100px] top-1/2 left-0 -translate-y-1/2" />
      <div className="absolute w-64 h-64 bg-brand-gold/5 rounded-full blur-[100px] top-1/3 right-0" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="relative block mx-auto w-full max-w-4xl"
        >
          <h2 style={language === 'ur' ? { fontFamily: "Georgia" } : {}} className={` ${t.fontClassSerif} ${isAboutPage ? (language === 'ur' ? 'text-[28px] sm:text-[34px] md:text-[50px] lg:text-5xl' : 'text-[20px] sm:text-[24px] md:text-[35px] lg:text-5xl') : (language === 'en' ? 'text-[20px] sm:text-[24px] md:text-[45px] lg:text-5xl' : 'text-[28px] sm:text-[34px] md:text-[45px] lg:text-5xl')} text-brand-gold mb-6 tracking-wide`}>
            {language === 'en' ? (
              <>
                <span className="block md:inline whitespace-nowrap">About Maulai Growh</span>
                <span className="block md:inline md:ml-2">Foundation</span>
              </>
            ) : (
              t.aboutTitle
            )}
          </h2>
          <div className="flex justify-center mb-10">
            <div className="h-0.5 w-16 bg-brand-crimson"></div>
            <div className="h-0.5 w-3 bg-brand-gold ml-2"></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="bg-brand-gray/30 border border-brand-gold/10 p-8 md:p-12 lg:p-16 relative"
        >
          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-brand-gold/40"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-brand-gold/40"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-brand-gold/40"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-brand-gold/40"></div>

          <p className={isAboutPage ? (language === 'ur' ? `text-gray-300 ${t.fontClassSans} text-center whitespace-pre-wrap text-[16px] md:text-[20px] md:leading-[37.4px]` : `text-gray-300 ${t.fontClassSans} leading-loose text-[16px] md:text-[18px] lg:text-xl text-center whitespace-pre-wrap`) : (language === 'ur' ? `text-gray-300 ${t.fontClassSans} text-center whitespace-pre-wrap text-[16px] md:text-[20px] md:leading-[37.4px]` : `text-gray-300 ${t.fontClassSans} leading-loose text-[16px] md:text-[20px] lg:text-xl text-center whitespace-pre-wrap`)}>
            {t.aboutContent}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
