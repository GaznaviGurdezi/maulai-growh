import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

import { useNavigate } from "react-router-dom";

export function Hero() {
  const { t, language } = useLanguage();
  const btnAbout = {
    en: "About Us",
    ur: "ہمارے بارے میں",
    hi: "हमारे बारे में"
  }[language];
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-dark">
      {/* Background with texture & red hue */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-crimson-dark/20 via-brand-dark to-brand-black opacity-80" />
        <div className="absolute inset-0 bg-islamic-pattern mix-blend-overlay opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-crimson/10 via-transparent to-transparent opacity-60" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center text-center pt-[90px] md:pt-[95px] pb-4">
        
        {/* Artistic Calligraphy Placeholder (using text with Arabic font) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-0 flex flex-col items-center relative w-full pt-0 z-20"
        >
          <div className="w-full max-w-[1000px] lg:max-w-[1600px] h-[220px] sm:h-[300px] md:h-[450px] lg:h-[600px] relative flex justify-center items-center">
            {/* Godly Glow Behind */}
            <div className="absolute w-[60%] h-[60%] bg-brand-gold/30 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>
            <div className="absolute w-[40%] h-[40%] bg-[#ffd700]/20 blur-[80px] rounded-full mix-blend-screen pointer-events-none"></div>
            
            <div 
              className="w-full h-full bg-gradient-to-tr from-[#b8860b] via-[#fff8dc] to-[#d4af37]"
              style={{
                WebkitMaskImage: "url('/aba-abdillah.png')",
                WebkitMaskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskImage: "url('/aba-abdillah.png')",
                maskSize: "contain",
                maskRepeat: "no-repeat",
                maskPosition: "center",
                filter: "drop-shadow(0px 0px 25px rgba(255,215,0,0.8)) drop-shadow(0px 0px 80px rgba(212,175,55,0.5))",
              }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-6xl mx-auto flex flex-col items-center mb-8 md:mb-14 mt-4"
        >
          {/* Majestic Glow Background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-gold/15 via-brand-gold/5 to-transparent blur-3xl pointer-events-none rounded-full transform scale-150"></div>
          
          {/* Intricate Top Divider */}
          <div className="w-full flex items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-8 opacity-90 relative z-10">
            <div className="h-[1px] w-1/4 sm:w-1/3 bg-gradient-to-r from-transparent via-brand-gold/40 to-brand-gold" />
            <div className="w-2 h-2 rotate-45 bg-brand-gold border border-[#ffdf80] shadow-[0_0_15px_rgba(212,175,55,1)]" />
            <div className="w-1.5 h-1.5 rounded-full bg-brand-gold/60" />
            <div className="w-2 h-2 rotate-45 bg-brand-gold border border-[#ffdf80] shadow-[0_0_15px_rgba(212,175,55,1)]" />
            <div className="h-[1px] w-1/4 sm:w-1/3 bg-gradient-to-l from-transparent via-brand-gold/40 to-brand-gold" />
          </div>

          {/* Grand Text Container */}
          <div className="relative px-2 sm:px-10 py-6">
            <h1 style={{ textShadow: "0 4px 20px rgba(0,0,0,0.8), 0 0 30px rgba(212,175,55,0.6), 0 0 10px rgba(255,255,255,0.3)", ...(language === 'ur' ? { fontFamily: 'Courier New' } : (language === 'en' ? { fontFamily: 'Cinzel', fontWeight: 'bold' } : (language === 'hi' ? {} : {}))) }} className={`relative z-10 ${language === 'hi' ? 'font-ams-kashi' : t.fontClassSerif} text-center uppercase text-[#ffdf80] text-[24px] min-[320px]:text-[28px] min-[380px]:text-[32px] sm:text-[45px] md:text-[55px] lg:text-[75px] xl:text-[90px] tracking-[0.1em] sm:tracking-[0.15em] leading-[1.1] flex flex-col justify-center items-center gap-y-1 sm:gap-y-2 md:gap-y-4 w-full font-black`}
                
            >
              <div className="flex flex-nowrap whitespace-nowrap justify-center items-center gap-x-2 sm:gap-x-3 md:gap-x-5">
                {t.heroHeading.split(' ').slice(0, -1).map((word, idx) => (
                  <span key={idx} className="inline-block relative">
                    {word}
                  </span>
                ))}
              </div>
              <div className="flex justify-center items-center flex-nowrap whitespace-nowrap">
                <span className="inline-block relative">
                  {t.heroHeading.split(' ').slice(-1)[0]}
                </span>
              </div>
            </h1>
          </div>

          {/* Intricate Bottom Divider */}
          <div className="w-full flex items-center justify-center gap-2 sm:gap-4 mt-4 sm:mt-8 opacity-90 relative z-10">
            <div className="h-[1px] w-1/4 sm:w-1/3 bg-gradient-to-r from-transparent via-brand-gold/40 to-brand-gold" />
            <div className="w-2 h-2 rotate-45 bg-brand-gold border border-[#ffdf80] shadow-[0_0_15px_rgba(212,175,55,1)]" />
            <div className="w-1.5 h-1.5 rounded-full bg-brand-gold/60" />
            <div className="w-2 h-2 rotate-45 bg-brand-gold border border-[#ffdf80] shadow-[0_0_15px_rgba(212,175,55,1)]" />
            <div className="h-[1px] w-1/4 sm:w-1/3 bg-gradient-to-l from-transparent via-brand-gold/40 to-brand-gold" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col items-center gap-3 md:gap-5 mb-6 md:mb-12 relative"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[150%] bg-[#ff0000]/10 blur-[30px] rounded-full pointer-events-none mix-blend-screen" />
          
          <div className="flex items-center gap-4 sm:gap-6 relative z-10">
            <div className="h-[1px] w-8 sm:w-16 md:w-24 bg-gradient-to-r from-transparent via-[#cc0000] to-[#cc0000] opacity-80" />
            <h2 style={language === 'ur' ? { fontFamily: "Noto Nastaliq Urdu" } : {}} className={` ${t.fontClassSerif} text-[18px] sm:text-[26px] md:text-[34px] lg:text-[42px] text-[#e60000] tracking-[0.2em] sm:tracking-[0.25em] uppercase font-bold [filter:drop-shadow(0_0_10px_rgba(230,0,0,0.3))]`}>
              {t.heroSubheading}
            </h2>
            <div className="h-[1px] w-8 sm:w-16 md:w-24 bg-gradient-to-l from-transparent via-[#cc0000] to-[#cc0000] opacity-80" />
          </div>
          
          <div className="h-[2px] w-16 md:w-32 bg-gradient-to-r from-transparent via-[#991b1b] to-transparent mt-1" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.9, ease: "easeOut" }}
          className="relative w-[95%] sm:w-full max-w-4xl mx-auto my-8 sm:my-12"
        >
          {/* Glassmorphic Container with Royal Treatment & Glow */}
          <div className="absolute inset-0 bg-[#050505]/60 backdrop-blur-md rounded-[1.5rem] sm:rounded-[2.5rem] border border-brand-gold/20 shadow-[0_0_40px_rgba(212,175,55,0.15)] overflow-hidden">
            <motion.div 
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-[30%] -left-[10%] w-[60%] h-[60%] bg-brand-gold/20 blur-[60px] rounded-full pointer-events-none"
            />
            <motion.div 
              animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.2, 1] }}
              transition={{ duration: 5, delay: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-[30%] -right-[10%] w-[70%] h-[70%] bg-brand-gold/15 blur-[70px] rounded-full pointer-events-none"
            />
          </div>
          
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-gold/10 via-transparent to-transparent rounded-[1.5rem] sm:rounded-[2.5rem] pointer-events-none" />
          
          {/* Inner Accent Line */}
          <div className="absolute inset-2 sm:inset-3 border border-brand-gold/10 rounded-[1.2rem] sm:rounded-[2rem] pointer-events-none shadow-[inset_0_0_20px_rgba(212,175,55,0.05)]" />
          
          <div className="relative z-10 px-5 sm:px-16 py-10 sm:py-14 flex flex-col items-center text-center">
            
            {/* Elegant Diamond Star Ornament */}
            <div className="relative flex items-center justify-center mb-6 sm:mb-10">
              <div className="absolute w-16 sm:w-24 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/80 to-transparent" />
              <div className="absolute w-[1px] h-16 sm:h-24 bg-gradient-to-b from-transparent via-brand-gold/80 to-transparent" />
              <motion.div 
                animate={{
                  boxShadow: ["0 0 15px rgba(212,175,55,0.6)", "0 0 30px rgba(212,175,55,1)", "0 0 15px rgba(212,175,55,0.6)"],
                  scale: [1, 1.15, 1]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-3 h-3 sm:w-4 sm:h-4 rotate-45 border sm:border-2 border-[#ffdf80] bg-brand-gold" 
              />
            </div>

            <p style={language === 'ur' ? { fontStyle: "normal", fontWeight: "bold", fontFamily: "Noto Nastaliq Urdu" } : {}} className={`${language === 'en' ? 'text-[11px] sm:text-[13px] md:text-[21px] lg:text-[27px]' : 'text-[11px] min-[360px]:text-[13px] min-[400px]:text-[15px] sm:text-[21px] md:text-[25px]'} text-[#fdf8e7] ${t.fontClassSans} italic tracking-normal sm:tracking-[0.06em] leading-[1.8] sm:leading-[1.9] md:leading-[2.2] font-light drop-shadow-xl whitespace-normal`}>
              <span className="text-brand-gold/60 font-serif text-xl sm:text-3xl md:text-4xl leading-none pr-0.5 sm:pr-1">"</span>
              {t.heroWelcome}
              <span className="text-brand-gold/60 font-serif text-xl sm:text-3xl md:text-4xl leading-none pl-0.5 sm:pl-1">"</span>
            </p>
            
            <div className="mt-8 sm:mt-12 flex flex-col items-center gap-4 sm:gap-5">
              <div className="flex gap-1.5 sm:gap-2">
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-brand-gold/40" />
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-brand-gold/80" />
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-brand-gold/40" />
              </div>
              <p style={language === 'ur' ? { fontSize: "20px" } : {}} className={`${language === 'en' ? 'text-[9px] sm:text-[10px] md:text-[14px] lg:text-[16px]' : 'text-[10px] sm:text-[14px] md:text-[15px]'} text-brand-gold ${t.fontClassSans} tracking-[0.25em] sm:tracking-[0.5em] uppercase font-bold drop-shadow-[0_2px_10px_rgba(212,175,55,0.5)]`}>
                {t.heroAuthor}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-2"
        >
          <button 
            onClick={() => navigate('/about')}
            className={`px-8 py-3 rounded-none border border-brand-gold text-brand-gold ${t.fontClassSerif} tracking-widest hover:bg-brand-gold hover:text-brand-black transition-all duration-500 uppercase text-[13px] md:text-[14px]`}
          >
            {btnAbout}
          </button>
          <button 
            onClick={() => navigate('/gallery')}
            className={`px-8 py-3 rounded-none bg-brand-gold/10 border border-brand-gold/60 text-brand-gold ${t.fontClassSerif} tracking-widest hover:bg-brand-gold hover:text-brand-black transition-all duration-500 uppercase text-[13px] md:text-[14px]`}
          >
            {t.btnGallery}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
