import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Wheat, HeartHandshake, Utensils } from "lucide-react";

import shrineCourtyardImg from "../assets/images/shrine_courtyard_1784836891952.jpg";
import bariDegImg from "../assets/images/bari_deg_ajmer_1784836857984.jpg";
import { GoldRaysBackground } from "./GoldRaysBackground";
import { sacredDegsTranslations } from './SacredDegsTranslations';


export function SacredDegs() {
    const { t, language } = useLanguage();
  const dt = sacredDegsTranslations[language as keyof typeof sacredDegsTranslations] || sacredDegsTranslations.en;
  // Apply mobile-optimized sizing to all languages on mobile
  const isMobileEn = true;
  const isUrdu = language === 'ur';
  const isHindi = language === 'hi';

  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { question: dt.faq1Q, answer: dt.faq1A },
    { question: dt.faq2Q, answer: dt.faq2A },
    { question: dt.faq3Q, answer: dt.faq3A },
    { question: dt.faq4Q, answer: dt.faq4A },
    { question: dt.faq5Q, answer: dt.faq5A }
  ];

  return (
    <section id="sacred-degs-section" data-lang={language} className={"relative py-32 bg-brand-black overflow-hidden font-sans " + (language === "hi" ? "lang-hi" : "")}>
      {/* Premium Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-gold/10 via-brand-black to-brand-black pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10 mix-blend-screen pointer-events-none z-0"></div>
      
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="relative flex flex-col items-center justify-center w-full max-w-5xl mx-auto text-center mb-[129px] md:mb-32 mt-[-124px] md:mt-0 z-10 pt-10"
        >
          <div className="flex items-center gap-4 mb-6 relative">
            <div className="absolute inset-0 bg-brand-gold/20 blur-[30px] rounded-full mix-blend-screen pointer-events-none"></div>
            <div className="h-[2px] w-12 md:w-24 bg-gradient-to-r from-transparent via-[#d4af37] to-[#fff1a0] shadow-[0_0_15px_rgba(212,175,55,0.8)]"></div>
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#fff1a0] to-[#d4af37] text-[13px] md:text-lg tracking-[0.4em] uppercase font-bold [filter:drop-shadow(0_0_15px_rgba(212,175,55,1))_drop-shadow(0_0_5px_rgba(255,255,255,0.5))]">{dt.yaHassan}</span>
            <div className="h-[2px] w-12 md:w-24 bg-gradient-to-l from-transparent via-[#d4af37] to-[#fff1a0] shadow-[0_0_15px_rgba(212,175,55,0.8)]"></div>
          </div>
          
          <div className={`relative w-full max-w-[1000px] ${isMobileEn ? 'py-4 mb-4' : 'py-8 mb-8'} sm:py-16 md:mb-8 flex justify-center items-center`}>
            <div className="absolute inset-0 z-0">
               <GoldRaysBackground />
            </div>
            
            <div className="absolute w-[80%] sm:w-[60%] h-[80%] sm:h-[60%] bg-brand-gold/20 blur-[80px] sm:blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>
            
            <h2 
              className={`relative z-10 ${t.fontClassSerif} ${isMobileEn ? '-mt-[25px]' : 'mt-0'} md:mt-0 text-[62px] sm:text-[80px] md:text-[100px] lg:text-[120px] leading-[0.9] text-transparent bg-clip-text bg-gradient-to-tr from-[#8a6d21] via-[#d4af37] to-[#fff1a0] tracking-[0.05em] uppercase font-extrabold [filter:drop-shadow(0_0_20px_rgba(212,175,55,0.8))_drop-shadow(0_0_80px_rgba(212,175,55,0.5))]`}
            >
              {dt.pageTitle}
            </h2>
          </div>
          
          <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center mt-4">
            <div className="absolute inset-0 bg-gradient-to-b from-[#111]/80 to-transparent blur-xl -z-10"></div>
            
            <div className="w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent mb-10 md:mb-3 lg:mb-10"></div>
            

            <p className={`text-gray-300 ${t.fontClassSans} max-w-3xl leading-[2.2] md:leading-[1.7] ${isMobileEn ? 'text-[16px]' : 'text-[15px]'} md:text-[20px] text-justify font-light px-6 my-0 py-0`}>
              <span className="text-2xl md:text-2xl text-brand-gold/40 font-serif leading-none mr-2 inline align-baseline">"</span>
              {dt.intro}
              <span className="text-2xl md:text-2xl text-brand-gold/40 font-serif leading-none ml-2 inline align-baseline">"</span>
            </p>
            
            <div className="w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent mt-12 md:mt-3 lg:mt-12"></div>
          </div>
        </motion.div>

        {/* The Two Sacred Degs */}
        <div className="mb-32 relative z-10">
          <div className="text-center mb-16">
            <h3 className={`${t.fontClassSerif} ${isMobileEn ? 'text-[31px]' : 'text-[25px]'} md:text-4xl text-white tracking-[0.15em] uppercase font-bold`}>{dt.historicDegsTitle}</h3>
            <div className="h-[2px] w-24 bg-brand-gold mx-auto mt-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-12 max-w-6xl mx-auto">
            {/* Bari Deg */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-[1rem] md:rounded-[2rem] overflow-hidden group bg-[#0a0a0a] border border-brand-gold/10 hover:border-brand-gold/30 transition-all duration-700 shadow-2xl flex flex-col md:block"
            >
              <div className="hidden md:block absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-[#050505] z-10 pointer-events-none"></div>
              
              <div className="flex flex-col md:block w-full">
                {/* Image */}
                <div className="w-full h-[220px] sm:h-[260px] md:w-full md:h-auto md:aspect-[1183/853] relative shrink-0 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10 md:hidden pointer-events-none" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-1000 z-10 pointer-events-none" />
                  <img src="https://www.chishtiyasufifoundation.com/assets/img/deg/bigdeg.jpg" alt="Bari Deg" className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-1000" />
                  {/* Elegant framing */}
                  <div className="absolute inset-2 border border-brand-gold/20 z-20 pointer-events-none transition-all duration-700 group-hover:scale-[0.98] group-hover:border-brand-gold/40" />
                </div>
                
                {/* Text Below Image (Mobile) / Absolute (Desktop & Tablet) */}
                <div className="w-full p-5 md:absolute md:bottom-0 md:left-0 md:w-full md:p-6 lg:p-8 z-20 flex flex-col justify-center md:justify-end text-center md:text-center md:mb-[-40px] lg:mb-[-56px] bg-[#0a0a0a] md:bg-transparent">
                  <h4 className={`${t.fontClassSerif} text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] text-brand-gold uppercase tracking-[0.1em] mb-2 md:mb-4 font-bold drop-shadow-lg leading-tight`}>
                    {dt.shahiDegTitle} <br className="md:hidden" />{dt.bariDegSubtitle}
                  </h4>
                  <div className="flex flex-col gap-2 md:gap-2 items-center mb-0 md:mb-6 w-full">
                    <span className="text-white/80 uppercase tracking-[0.1em] md:tracking-[0.15em] text-[12px] sm:text-[12px] border-b border-white/10 pb-1 md:pb-2 w-full md:w-3/4 max-w-xs">{dt.diameter37}</span>
                    <span className="text-white/80 uppercase tracking-[0.1em] md:tracking-[0.15em] text-[12px] sm:text-[12px] border-b border-white/10 pb-1 md:pb-2 w-full md:w-3/4 max-w-xs">{dt.capacity4800Text}</span>
                  </div>
                </div>
              </div>


            </motion.div>

            {/* Chhoti Deg */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-[1rem] md:rounded-[2rem] overflow-hidden group bg-[#0a0a0a] border border-brand-gold/10 hover:border-brand-gold/30 transition-all duration-700 shadow-2xl flex flex-col md:block"
            >
              <div className="hidden md:block absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-[#050505] z-10 pointer-events-none"></div>
              
              <div className="flex flex-col md:block w-full">
                {/* Image */}
                <div className="w-full h-[220px] sm:h-[260px] md:w-full md:h-auto md:aspect-[1183/853] relative shrink-0 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10 md:hidden pointer-events-none" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-1000 z-10 pointer-events-none" />
                  <img src="https://www.chishtiyasufifoundation.com/assets/img/deg/chotideg.jpg" alt="Chhoti Deg" className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-1000" />
                  {/* Elegant framing */}
                  <div className="absolute inset-2 border border-brand-gold/20 z-20 pointer-events-none transition-all duration-700 group-hover:scale-[0.98] group-hover:border-brand-gold/40" />
                </div>
                
                {/* Text Below Image (Mobile) / Absolute (Desktop & Tablet) */}
                <div className="w-full p-5 md:absolute md:bottom-0 md:left-0 md:w-full md:p-6 lg:p-8 z-20 flex flex-col justify-center md:justify-end text-center md:text-center md:mb-[-40px] lg:mb-[-56px] bg-[#0a0a0a] md:bg-transparent">
                  <h4 className={`${t.fontClassSerif} text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] text-brand-gold uppercase tracking-[0.1em] mb-2 md:mb-4 font-bold drop-shadow-lg leading-tight`}>
                    {dt.chhotiDegTitle}
                  </h4>
                  <div className="flex flex-col gap-2 md:gap-2 items-center mb-0 md:mb-6 w-full">
                    <span className="text-white/80 uppercase tracking-[0.1em] md:tracking-[0.15em] text-[12px] sm:text-[12px] border-b border-white/10 pb-1 md:pb-2 w-full md:w-3/4 max-w-xs">{dt.diameter22}</span>
                    <span className="text-white/80 uppercase tracking-[0.1em] md:tracking-[0.15em] text-[12px] sm:text-[12px] border-b border-white/10 pb-1 md:pb-2 w-full md:w-3/4 max-w-xs">{dt.capacity2400Text}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Cost Per Person Info Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-5xl mx-auto mb-32 z-10 px-4"
        >
          <div className="relative rounded-[2rem] bg-gradient-to-br from-[#1a1505] via-[#0a0a0a] to-[#111] border border-brand-gold/30 p-10 md:p-16 lg:p-20 flex flex-col md:flex-row items-center justify-between gap-12 shadow-[0_20px_60px_rgba(212,175,55,0.15)] overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10 mix-blend-screen pointer-events-none z-0"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-[80px] -ml-32 -mb-32 pointer-events-none"></div>

            <div className="flex-1 relative z-10 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
                <Utensils size={24} className="text-brand-gold" />
                <span className={`text-brand-gold/80 ${isMobileEn ? 'text-[17px]' : 'text-sm'} md:text-sm tracking-[0.3em] uppercase font-bold`}>{dt.blessedNiyazTitle}</span>
              </div>
              <h4 className={`${t.fontClassSerif} ${isMobileEn ? 'text-[27px]' : 'text-[24px]'} md:text-[42px] leading-tight text-white font-bold mb-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]`}>
                {dt.sustainTitlePrefix}<span className="text-brand-gold">{dt.badgeSacredTradition}</span>
              </h4>
              <p className={`text-gray-300 ${isMobileEn ? 'text-[16px]' : 'text-[15px]'} md:text-[20px] leading-relaxed max-w-xl mx-auto md:mx-0 font-light`}>
                {dt.sustainDesc}
              </p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center justify-center p-8 md:p-10 bg-[#050505]/60 backdrop-blur-md border border-brand-gold/40 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] w-[278px] md:w-auto min-h-[259px] md:min-h-0 min-w-[280px]">
              <span className={`text-white/60 uppercase tracking-[0.2em] ${isMobileEn ? 'text-[13px]' : 'text-[12px]'} md:text-sm mb-4 font-medium`}>{dt.approxCostLabel}</span>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-brand-gold text-2xl font-serif">₹</span>
                <span className={`text-brand-gold ${isMobileEn ? 'text-[50px]' : 'text-[46px]'} md:text-[64px] leading-none font-bold font-serif tracking-tight drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]`}>15</span>
              </div>
              <span className={`text-white/80 uppercase tracking-[0.1em] ${isMobileEn ? 'text-[13px]' : 'text-[12px]'} md:text-sm border-b border-brand-gold/30 pb-4 mb-6 w-full text-center`}>{dt.perPersonLabel}</span>
              <button onClick={() => navigate('/donate')} className={`w-full py-3 bg-brand-gold text-brand-black uppercase tracking-[0.15em] font-bold ${isMobileEn ? 'text-[15px]' : 'text-[13px]'} md:text-sm rounded-full hover:bg-white transition-colors duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)]`}>{dt.contributeNowBtn}</button>
            </div>
          </div>
        </motion.div>

        {/* Sponsorship Pricing Cards */}
        <div className="mb-32 relative z-10">
          <div className="text-center mb-16">
            <h3 className={`${t.fontClassSerif} ${isMobileEn ? 'text-[29px]' : 'text-[22px]'} md:text-4xl text-white tracking-[0.15em] uppercase font-bold`}>{dt.sponsorshipTitle}</h3>
            <div className="h-[2px] w-24 bg-brand-gold mx-auto mt-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto px-4">
            {/* Bari Deg Pricing */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group bg-gradient-to-b from-[#1a1505] to-[#0a0a0a] rounded-[2.5rem] p-[1px] relative overflow-hidden border border-brand-gold/30 hover:border-brand-gold transition-colors duration-500 shadow-[0_20px_50px_rgba(212,175,55,0.1)]"
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10 mix-blend-screen pointer-events-none z-0"></div>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-gold/20 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-1000 z-0"></div>
              
              <div className="bg-[#0a0a0a]/80 backdrop-blur-md rounded-[2.4rem] p-10 lg:p-12 h-full relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-brand-gold/10 border border-brand-gold/40 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                  <Utensils size={28} className="text-brand-gold" />
                </div>
                <h4 className={`${t.fontClassSerif} ${isMobileEn ? 'text-[33px]' : 'text-[29px]'} md:text-4xl text-brand-gold uppercase tracking-[0.1em] font-bold mb-3 drop-shadow-[0_2px_10px_rgba(212,175,55,0.5)]`}>{dt.bariDegCardTitle}</h4>
                <p className={`text-white uppercase ${isMobileEn ? 'text-[11px] pb-[22px] mb-[40px] ml-0 pr-0 md:pb-6 md:mb-10' : 'text-[11px] md:text-base mb-10 pb-6'} leading-[23px] md:leading-normal tracking-[0.2em] border-b border-brand-gold/20 w-3/4`}>{dt.capacityLabel}: 4,800 kg</p>
                
                <div className="space-y-4 w-full">
                  <div className="relative overflow-hidden bg-gradient-to-r from-[#111] via-[#1a1a1a] to-[#111] p-6 rounded-2xl border border-brand-gold/20 hover:border-brand-gold hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] hover:-translate-y-1 transition-all duration-300 group/item">
                    <div className="absolute top-0 left-0 w-1 h-full bg-brand-gold transform -translate-x-full group-hover/item:translate-x-0 transition-transform duration-300"></div>
                    <div className={`${isUrdu || isHindi || isMobileEn ? 'text-[30px]' : 'text-[22px]'} md:text-3xl font-bold text-white mb-2 font-serif tracking-wider group-hover/item:text-brand-gold transition-colors duration-300`}>₹2,25,000</div>
                    <div className={`text-gray-400 ${isUrdu ? 'text-[20px]' : (isHindi ? 'text-[17px]' : (isMobileEn ? 'text-[15px]' : 'text-[11px]'))} md:text-sm tracking-[0.1em] uppercase`}>{dt.serving15k}</div>
                  </div>
                  <div className="relative overflow-hidden bg-gradient-to-r from-[#111] via-[#1a1a1a] to-[#111] p-6 rounded-2xl border border-brand-gold/20 hover:border-brand-gold hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] hover:-translate-y-1 transition-all duration-300 group/item">
                    <div className="absolute top-0 left-0 w-1 h-full bg-brand-gold transform -translate-x-full group-hover/item:translate-x-0 transition-transform duration-300"></div>
                    <div className={`${isUrdu || isHindi || isMobileEn ? 'text-[30px]' : 'text-[22px]'} md:text-3xl font-bold text-white mb-2 font-serif tracking-wider group-hover/item:text-brand-gold transition-colors duration-300`}>₹3,75,000</div>
                    <div className={`text-gray-400 ${isUrdu ? 'text-[20px]' : (isHindi ? 'text-[17px]' : (isMobileEn ? 'text-[15px]' : 'text-[11px]'))} md:text-sm tracking-[0.1em] uppercase`}>{dt.serving25k}</div>
                  </div>
                  <div className="relative overflow-hidden bg-gradient-to-r from-[#111] via-[#1a1a1a] to-[#111] p-6 rounded-2xl border border-brand-gold/20 hover:border-brand-gold hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] hover:-translate-y-1 transition-all duration-300 group/item">
                    <div className="absolute top-0 left-0 w-1 h-full bg-brand-gold transform -translate-x-full group-hover/item:translate-x-0 transition-transform duration-300"></div>
                    <div className={`${isUrdu || isHindi || isMobileEn ? 'text-[30px]' : 'text-[22px]'} md:text-3xl font-bold text-white mb-2 font-serif tracking-wider group-hover/item:text-brand-gold transition-colors duration-300`}>₹5,25,000</div>
                    <div className={`text-gray-400 ${isUrdu ? 'text-[20px]' : (isHindi ? 'text-[17px]' : (isMobileEn ? 'text-[15px]' : 'text-[11px]'))} md:text-sm tracking-[0.1em] uppercase`}>{dt.serving35k}</div>
                  </div>
                </div>
                
                <button onClick={() => navigate('/donate')} className={`mt-10 px-8 py-3 bg-transparent border border-brand-gold text-brand-gold uppercase tracking-[0.2em] font-bold ${isUrdu ? 'text-[20px]' : (isHindi ? 'text-[17px]' : (isMobileEn ? 'text-[16px]' : 'text-[12px]'))} md:text-sm rounded-full hover:bg-brand-gold hover:text-black transition-colors duration-300 w-full`}>
                  {dt.supportBariBtn}
                </button>
              </div>
            </motion.div>

            {/* Chhoti Deg Pricing */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group bg-gradient-to-b from-[#1a1505] to-[#0a0a0a] rounded-[2.5rem] p-[1px] relative overflow-hidden border border-brand-gold/30 hover:border-brand-gold transition-colors duration-500 shadow-[0_20px_50px_rgba(212,175,55,0.1)]"
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10 mix-blend-screen pointer-events-none z-0"></div>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-gold/20 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-1000 z-0"></div>
              
              <div className="bg-[#0a0a0a]/80 backdrop-blur-md rounded-[2.4rem] p-10 lg:p-12 h-full relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-brand-gold/10 border border-brand-gold/40 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                  <Utensils size={24} className="text-brand-gold" />
                </div>
                <h4 className={`${t.fontClassSerif} ${isMobileEn ? 'text-[33px]' : 'text-[25px]'} md:text-4xl text-brand-gold uppercase tracking-[0.1em] font-bold mb-3 drop-shadow-[0_2px_10px_rgba(212,175,55,0.5)]`}>{dt.chhotiDegCardTitle}</h4>
                <p className={`text-white uppercase ${isMobileEn ? 'text-[11px] pb-[22px] mb-[40px] ml-0 pr-0 md:pb-6 md:mb-10' : 'text-[11px] md:text-base mb-10 pb-6'} leading-[25px] md:leading-normal tracking-[0.2em] border-b border-brand-gold/20 w-3/4`}>{dt.capacityLabel}: 2,400 kg</p>
                
                <div className="space-y-4 w-full">
                  <div className="relative overflow-hidden bg-gradient-to-r from-[#111] via-[#1a1a1a] to-[#111] p-6 rounded-2xl border border-brand-gold/20 hover:border-brand-gold hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] hover:-translate-y-1 transition-all duration-300 group/item">
                    <div className="absolute top-0 left-0 w-1 h-full bg-brand-gold transform -translate-x-full group-hover/item:translate-x-0 transition-transform duration-300"></div>
                    <div className={`${isUrdu || isHindi || isMobileEn ? 'text-[30px]' : 'text-[22px]'} md:text-3xl font-bold text-white mb-2 font-serif tracking-wider group-hover/item:text-brand-gold transition-colors duration-300`}>₹1,50,000</div>
                    <div className={`text-gray-400 ${isUrdu ? 'text-[20px]' : (isHindi ? 'text-[17px]' : (isMobileEn ? 'text-[15px]' : 'text-[11px]'))} md:text-sm tracking-[0.1em] uppercase`}>{dt.serving10k}</div>
                  </div>
                  <div className="relative overflow-hidden bg-gradient-to-r from-[#111] via-[#1a1a1a] to-[#111] p-6 rounded-2xl border border-brand-gold/20 hover:border-brand-gold hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] hover:-translate-y-1 transition-all duration-300 group/item">
                    <div className="absolute top-0 left-0 w-1 h-full bg-brand-gold transform -translate-x-full group-hover/item:translate-x-0 transition-transform duration-300"></div>
                    <div className={`${isUrdu || isHindi || isMobileEn ? 'text-[30px]' : 'text-[22px]'} md:text-3xl font-bold text-white mb-2 font-serif tracking-wider group-hover/item:text-brand-gold transition-colors duration-300`}>₹2,25,000</div>
                    <div className={`text-gray-400 ${isUrdu ? 'text-[20px]' : (isHindi ? 'text-[17px]' : (isMobileEn ? 'text-[15px]' : 'text-[11px]'))} md:text-sm tracking-[0.1em] uppercase`}>{dt.serving15k}</div>
                  </div>
                  <div className="relative overflow-hidden bg-gradient-to-r from-[#111] via-[#1a1a1a] to-[#111] p-6 rounded-2xl border border-brand-gold/20 hover:border-brand-gold hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] hover:-translate-y-1 transition-all duration-300 group/item">
                    <div className="absolute top-0 left-0 w-1 h-full bg-brand-gold transform -translate-x-full group-hover/item:translate-x-0 transition-transform duration-300"></div>
                    <div className={`${isUrdu || isHindi || isMobileEn ? 'text-[30px]' : 'text-[22px]'} md:text-3xl font-bold text-white mb-2 font-serif tracking-wider group-hover/item:text-brand-gold transition-colors duration-300`}>₹3,75,000</div>
                    <div className={`text-gray-400 ${isUrdu ? 'text-[20px]' : (isHindi ? 'text-[17px]' : (isMobileEn ? 'text-[15px]' : 'text-[11px]'))} md:text-sm tracking-[0.1em] uppercase`}>{dt.serving25k}</div>
                  </div>
                </div>

                <button onClick={() => navigate('/donate')} className={`mt-10 px-8 py-3 bg-transparent border border-brand-gold text-brand-gold uppercase tracking-[0.2em] font-bold ${isUrdu ? 'text-[20px]' : (isHindi ? 'text-[17px]' : (isMobileEn ? 'text-[16px]' : 'text-[12px]'))} md:text-sm rounded-full hover:bg-brand-gold hover:text-black transition-colors duration-300 w-full`}>
                  {dt.supportChhotiBtn}
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Ingredients */}
        <div className="mb-32 relative z-10">
          <div className="max-w-6xl mx-auto px-0 sm:px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* Left Column: Title and Core Ingredients */}
              <div className="lg:col-span-5 space-y-12">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-[1px] bg-brand-gold/50"></div>
                    <span className={`text-brand-gold ${isMobileEn ? 'text-[15px]' : 'text-[10px]'} tracking-[0.3em] uppercase font-bold`}>{dt.theElementsLabel}</span>
                  </div>
                  <h3 className={`${t.fontClassSerif} ${isMobileEn ? 'text-[35px]' : 'text-[32px]'} sm:text-[40px] md:text-5xl text-brand-gold tracking-[0.05em] uppercase font-bold leading-none`}>{dt.ingredientsTitle}</h3>
                  <p className={`mt-6 text-gray-400 font-light ${isMobileEn ? 'text-[17px]' : 'text-[14px]'} md:text-base leading-relaxed max-w-sm`}>
                    {dt.ingredientsDesc}
                  </p>
                </div>

                <div className="space-y-6">
                  {[
                    { name: dt.basmatiRice, desc: dt.basmatiRiceDesc },
                    { name: dt.pureGhee, desc: dt.pureGheeDesc },
                    { name: dt.sugar, desc: dt.sugarDesc },
                    { name: dt.wheatFlour, desc: dt.wheatFlourDesc }
                  ].map((item, idx) => (
                    <div key={idx} className="group cursor-default">
                      <div className="flex items-baseline justify-between mb-2">
                        <h4 className={`text-white tracking-widest uppercase ${isMobileEn ? 'text-[18px]' : 'text-[14px]'} md:text-[16px] font-medium group-hover:text-brand-gold transition-colors duration-300`}>{item.name}</h4>
                        <div className="flex-1 border-b border-dashed border-white/20 mx-4 opacity-50 group-hover:border-brand-gold/50 transition-colors duration-300"></div>
                        <span className={`text-brand-gold/30 text-lg ${t.fontClassSerif}`}>0{idx + 1}</span>
                      </div>
                      <p className={`text-gray-500 ${isMobileEn ? 'text-[18px]' : 'text-[12px]'} md:text-[13px] font-light`}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Premium Additions and Aromatics */}
              <div className="lg:col-span-7 w-full">
                <div className="bg-[#050505] border border-brand-gold/10 rounded-[1.25rem] sm:rounded-[2rem] md:rounded-[3rem] p-3 sm:p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-[0.05] mix-blend-screen pointer-events-none z-0"></div>
                  
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
                    <Wheat size={60} className="text-brand-gold transform rotate-12" strokeWidth={1} />
                  </div>

                  <div className="relative z-10 space-y-12">
                    
                    {/* Aromatics */}
                    <div>
                      <h4 className={`${t.fontClassSerif} ${isMobileEn ? 'text-[25px]' : 'text-[18px]'} md:text-[22px] text-[#ff8080] uppercase tracking-[0.2em] font-bold mb-8 flex items-center gap-4`}>
                        {dt.aromaticsTitle}
                        <div className="flex-1 h-[1px] bg-gradient-to-r from-[#991b1b]/30 to-transparent"></div>
                      </h4>
                      <div className="grid grid-cols-2 gap-3 sm:gap-x-8 sm:gap-y-6">
                        {[
                          { name: dt.saffronName, desc: dt.saffronDesc },
                          { name: dt.roseWater, desc: dt.roseWaterDesc },
                          { name: dt.kewraWater, desc: dt.kewraWaterDesc },
                          { name: dt.cardamomName, desc: dt.cardamomDesc }
                        ].map((item, idx) => (
                          <div key={idx} className="flex gap-2.5 sm:gap-4 items-start group">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#991b1b]/30 bg-[#991b1b]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#991b1b]/30 transition-colors duration-300 mt-0.5">
                               <span className="w-1.5 h-1.5 rounded-full bg-[#ff8080]"></span>
                            </div>
                            <div className="min-w-0">
                              <div className={`text-gray-200 ${isMobileEn ? 'text-[18px]' : 'text-[15px] sm:text-[17px]'} md:text-sm tracking-wide sm:tracking-widest uppercase font-medium mb-1 break-words`}>{item.name}</div>
                              <div className="text-[#ff8080]/70 text-[12px] sm:text-[11px] font-light italic leading-snug">{item.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Dry Fruits */}
                    <div>
                      <h4 className={`${isMobileEn ? 'text-[25px]' : 'text-[18px]'} md:text-[22px] text-white/90 uppercase tracking-[0.2em] font-bold mb-8 flex items-center gap-4 ${t.fontClassSerif}`}>{dt.premiumFruits}
                        <div className="flex-1 h-[1px] bg-gradient-to-r from-white/10 to-transparent"></div>
                      </h4>
                      <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2.5 sm:gap-3">
                        {[dt.almonds, dt.cashews, dt.pistachios, dt.raisins, dt.coconut, dt.apricots, dt.dryDates, dt.figs, dt.foxNuts].map((item, idx) => (
                          <div key={idx} className={`px-3.5 py-3 sm:px-4 sm:py-2.5 border border-white/10 rounded-full text-center flex items-center justify-center ${isMobileEn ? 'text-[15px]' : 'text-[13px]'} md:text-xs text-gray-300 uppercase tracking-wider hover:border-brand-gold hover:text-brand-gold transition-all duration-300 cursor-default bg-white/5 hover:bg-brand-gold/5 backdrop-blur-sm shadow-[0_5px_15px_rgba(0,0,0,0.2)] hover:-translate-y-1`}>
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Vegetarian Tag */}
                    <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                      <div className={`inline-flex items-center gap-3 bg-[#991b1b]/10 border border-[#991b1b]/30 px-6 py-3 rounded-full text-[#ff8080] ${isMobileEn ? 'text-[13px]' : 'text-[11px]'} md:text-xs font-bold tracking-[0.15em] uppercase`}>
                         <span className="w-2 h-2 rounded-full bg-[#ff8080] animate-pulse"></span>
                         {dt.vegLabel}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* {dt.sacredTraditionTitle} */}
        <div className="mb-32 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-16 items-center"
          >
            {/* Text Side */}
            <div className="w-full space-y-6 md:space-y-8">
              <h3 className={`${t.fontClassSerif} ${isMobileEn ? 'text-[30px]' : 'text-[22px]'} sm:text-[25px] md:text-4xl text-brand-gold uppercase tracking-[0.1em] font-bold leading-tight`}>{dt.sacredTraditionTitle}</h3>
              <div className="h-[2px] w-24 bg-[#991b1b]"></div>
              
              <div className="space-y-4 lg:space-y-6">
                <p className={`text-gray-300 leading-[1.6] md:leading-[2] ${isMobileEn ? 'text-[16px]' : 'text-[14px]'} md:text-[16px] lg:text-lg text-justify font-light`}>
                  {dt.traditionP1}
                </p>
                <p className="text-gray-300 leading-[1.6] md:leading-[2] text-[14px] md:text-[16px] lg:text-lg text-justify font-light">
                  {dt.traditionP2Start}<span className="text-brand-gold font-medium">{dt.foundationName}</span>{dt.traditionP2End}
                </p>
              </div>
            </div>

            {/* Image (Mobile, Tablet, Desktop) */}
            <div className="w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] rounded-[1.5rem] lg:rounded-[3rem] overflow-hidden border border-brand-gold/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] relative group mt-8 lg:mt-0">
              <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none"></div>
              <img src="https://i.postimg.cc/dtrxPPs6/Whats-App-Image-2026-08-07-at-2-08-55-AM.png" alt="Devotees at Bari Deg" className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-1000" />
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#111] via-[#050505] to-black rounded-[3rem] p-12 md:p-20 border border-brand-gold/20 shadow-[0_30px_80px_rgba(0,0,0,0.9)] text-center max-w-5xl mx-auto relative overflow-hidden mb-32 z-10"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
          
          <div className="relative z-10">
            <div className="w-[75px] h-[75px] bg-[#0a0a0a] rounded-full flex items-center justify-center mx-auto mb-10 text-brand-gold border border-brand-gold/30 shadow-[0_0_30px_rgba(212,175,55,0.15)]">
              <HeartHandshake size={40} strokeWidth={1} />
            </div>
            
            <h3 className={`${t.fontClassSerif} ${isMobileEn ? 'text-[25px] leading-[32px]' : 'text-[23px] leading-[23px]'} md:text-[37px] md:leading-[37px] text-white uppercase tracking-[0.1em] font-bold mb-8`}>{dt.ctaTitle}</h3>
            <p className={`text-gray-300 leading-[2] ${isMobileEn ? 'text-[17px]' : 'text-[16px]'} md:text-[20px] text-center max-w-3xl mx-auto mb-8 font-light`}>
              {dt.ctaP1}
            </p>
            <p className={`text-brand-gold leading-[2] ${isMobileEn ? 'text-[18px]' : 'text-[16px]'} md:text-xl text-center max-w-3xl mx-auto mb-12 italic font-light`}>
              {dt.ctaP2}
            </p>
            
            <button 
              onClick={() => navigate('/donate')}
              className={`inline-flex items-center justify-center px-12 py-5 bg-gradient-to-r from-brand-gold to-[#fff1a0] text-black uppercase tracking-[0.2em] font-extrabold ${isMobileEn ? 'text-[13px]' : 'text-[11px]'} md:text-[15px] rounded-full shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] transition-all duration-300 hover:-translate-y-1`}
            >
              {dt.ctaBtn}
            </button>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h3 className={`${t.fontClassSerif} text-[25px] md:text-4xl text-brand-gold tracking-[0.15em] uppercase font-bold`}>{dt.faqTitle}</h3>
            <div className="h-[2px] w-24 bg-brand-gold mx-auto mt-6"></div>
          </div>
          
          <div className="space-y-5">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-[#0a0a0a] border border-white/5 rounded-[1.5rem] overflow-hidden hover:border-brand-gold/30 transition-colors duration-500"
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className={`text-[15px] md:text-xl text-white font-light tracking-wide ${t.fontClassSans}`}>{faq.question}</span>
                  <ChevronDown 
                    className={`text-brand-gold transition-transform duration-500 shrink-0 ${openFaq === idx ? 'rotate-180' : ''}`} 
                    strokeWidth={1.5}
                    size={24} 
                  />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-8 text-gray-400 leading-[2] font-light text-[17px] border-t border-white/5 pt-6">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
