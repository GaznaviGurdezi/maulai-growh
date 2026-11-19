import { motion } from "motion/react";
import { Phone, MapPin, Mail, Globe, Heart, ChevronRight, Instagram, Youtube, ArrowUpRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { footerTranslations } from "../context/FooterTranslations";
import { Link } from "react-router-dom";

export function ContactFooter() {
  const { t, language } = useLanguage();
  const ft = footerTranslations[language];
  const isHindi = language === 'hi';
  const isUrdu = language === 'ur';

  const quickLinks = [{ name: ft.linkHome, path: '/' }, { name: ft.linkAbout, path: '/about' }, { name: ft.linkMission, path: '/mission' }, { name: ft.linkLeadership, path: '/leadership' }, { name: ft.linkGallery, path: '/gallery' }];

  return (
    <footer id="contact" className="relative z-40 bg-[#000000] border-t border-brand-gold/20 pt-20 pb-0 overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
        
        {/* Main Highlight Message */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-8 pb-8 border-b border-brand-gold/20"
        >
          <div className="flex justify-center mb-4">
            <Heart className="text-[#991b1b]" size={28} fill="currentColor" />
          </div>
          <h2 
            className={`text-white font-medium tracking-wide uppercase ${isHindi ? 'font-hindi text-[13.5px] sm:text-[20px] md:text-[24px] lg:text-[28px] leading-relaxed md:leading-[40px]' : 'text-[13px] sm:text-[19px] md:text-[22px] lg:text-[26px] leading-tight md:leading-[26px] lg:leading-[34px] font-sans'}`}
          >
            <span 
              className={`text-brand-gold/90 ${isHindi ? 'text-[13.5px] sm:text-[20px] md:text-[24px] lg:text-[28px] leading-relaxed md:leading-[40px]' : 'text-[14px] md:text-[16px] lg:text-[22px] leading-tight md:leading-[21px] lg:leading-[30px]'}`}
            >
              {ft.noOneHungry}
            </span>
            <br className="hidden md:block" />
            <span 
              className={`text-white mt-1 md:mt-2 lg:mt-3 block ${isHindi ? 'text-[13.5px] sm:text-[20px] md:text-[24px] lg:text-[28px] leading-relaxed md:leading-[40px]' : 'text-[14px] md:text-[16px] lg:text-[22px] leading-tight md:leading-[18px] lg:leading-[28px]'}`}
            >
              {ft.everyChildLearns}
            </span>
            <span 
              className={`text-[#991b1b] mt-1 md:mt-2 lg:mt-3 block ${isHindi ? 'text-[13.5px] sm:text-[20px] md:text-[24px] lg:text-[28px] leading-relaxed md:leading-[40px]' : 'text-[14px] md:text-[16px] lg:text-[22px] leading-tight md:leading-[23px] lg:leading-[32px]'}`}
            >
              {ft.healthcareAll}
            </span>
          </h2>
        </motion.div>

        {/* 4 Column Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Column 1: About Maulai Growh Foundation */}
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, delay: 0.1 }}
             className="flex flex-col lg:col-span-2 w-full pr-0 lg:pr-8"
          >
            <div className="flex items-center gap-4 mb-5 w-full">
              <div className="w-14 h-14 rounded-full border border-brand-gold/50 flex items-center justify-center p-1.5 bg-black shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]" />
              </div>
              <h3 className="text-brand-gold font-serif text-[17px] sm:text-[20px] uppercase tracking-widest font-bold leading-tight flex-1">
                {ft.foundationName}
              </h3>
            </div>
            <p className="text-gray-300 text-[15px] md:text-[16px] leading-relaxed text-justify">
              {ft.foundationDesc}
            </p>
          </motion.div>

           {/* Column 2: Quick Links */}
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="flex flex-col"
          >
            <h3 className="text-white font-serif text-[16px] md:text-[17px] uppercase tracking-widest mb-6 relative inline-block">
              {ft.quickLinks}
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-brand-gold"></span>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="group flex items-center text-gray-300 hover:text-brand-gold transition-all duration-300" onClick={() => window.scrollTo(0,0)}>
                    <ChevronRight size={16} className="text-brand-gold/50 group-hover:text-brand-gold transition-all duration-300 mr-2 transform group-hover:translate-x-1" />
                    <span className="uppercase text-[13px] md:text-[14px] tracking-widest">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Support Our Mission */}
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, delay: 0.3 }}
             className="flex flex-col items-start"
          >
             <h3 className="text-white font-serif text-[16px] md:text-[17px] uppercase tracking-widest mb-6 relative inline-block">
              {ft.supportHumanity}
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-brand-gold"></span>
            </h3>
            <Link to="/donate" className="bg-white/5 backdrop-blur-sm border border-brand-gold/20 p-4 rounded-xl flex flex-col items-center group hover:bg-white/10 transition-colors cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.05)] hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] w-full max-w-[180px]">
               <div className="w-28 h-28 bg-white p-2 border border-brand-gold/30 rounded-lg mb-3">
                 <img 
                   src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=syedgggurdezi@okicici&pn=Shah%20Sufi%20Syed%20Gous%20Gaznavi%20Gurdezi" 
                   alt="Donate QR Code" 
                   className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                 />
               </div>
               <span className="text-brand-gold text-[11px] md:text-[12px] uppercase tracking-widest font-bold">
                 {isUrdu ? (
                   <>
                     <span className="md:hidden">اسکین کریں</span>
                     <span className="hidden md:inline">{ft.scanToDonate}</span>
                   </>
                 ) : isHindi ? (
                   <>
                     <span className="md:hidden">स्कैन करें</span>
                     <span className="hidden md:inline">{ft.scanToDonate}</span>
                   </>
                 ) : (
                   ft.scanToDonate
                 )}
               </span>
            </Link>
          </motion.div>

          {/* Column 4: Contact Information */}
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, delay: 0.4 }}
             className="flex flex-col"
          >
            <h3 className="text-white font-serif text-[16px] md:text-[17px] uppercase tracking-widest mb-6 relative inline-block">
              {ft.contactInfo}
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-brand-gold"></span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-gray-300">
                <MapPin className="text-[#991b1b] shrink-0 mt-0.5" size={18} />
                <span className="text-[13px] md:text-[14px]">{ft.address}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="text-[#991b1b] shrink-0" size={18} />
                <span className="text-[13px] md:text-[14px]">+91 9680872049</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="text-[#991b1b] shrink-0" size={18} />
                <span className="text-[13px] md:text-[14px]">info@maulaigrowh.org</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Globe className="text-[#991b1b] shrink-0" size={18} />
                <span className="text-[13px] md:text-[14px]">www.maulaigrowh.org</span>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-brand-gold/20">
              <p className={`text-[11px] text-brand-gold/80 uppercase tracking-[0.2em] font-semibold mb-3 ${isUrdu ? 'font-["Noto_Naskh_Arabic"] tracking-normal text-sm' : isHindi ? 'hi-font-arial tracking-normal text-xs' : 'font-serif'}`}>
                {isUrdu ? 'ہم سے جڑیں' : isHindi ? 'हमसे जुड़ें' : 'Follow Us'}
              </p>
              <div className="flex flex-col gap-2.5">
                <a
                  href="https://www.instagram.com/maulai_growh?dmpr=aW94eHphMHdocGRm"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram (@maulai_growh)"
                  className="group/social flex items-center justify-between gap-2.5 px-3.5 py-2.5 min-h-[44px] rounded-lg bg-[#0d0b08] border border-brand-gold/25 hover:border-brand-gold/75 hover:bg-[#15120c] shadow-[inset_0_1px_0_rgba(243,229,171,0.08)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <span className="w-7 h-7 rounded-md bg-brand-gold/10 border border-brand-gold/25 flex items-center justify-center text-brand-gold group-hover/social:bg-brand-gold group-hover/social:text-black transition-colors duration-200 shrink-0">
                      <Instagram size={15} />
                    </span>
                    <span className="text-[12px] font-semibold tracking-widest uppercase text-gray-200 group-hover/social:text-brand-gold transition-colors duration-200 whitespace-nowrap truncate">
                      Instagram
                    </span>
                  </span>
                  <ArrowUpRight size={14} className="text-brand-gold/50 group-hover/social:text-brand-gold group-hover/social:translate-x-0.5 group-hover/social:-translate-y-0.5 transition-transform duration-200 shrink-0" />
                </a>

                <a
                  href="https://youtube.com/@maulai_growh?si=Sy0MDT9-LlRl2g-c"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube (@maulai_growh)"
                  className="group/social flex items-center justify-between gap-2.5 px-3.5 py-2.5 min-h-[44px] rounded-lg bg-[#0d0b08] border border-brand-gold/25 hover:border-brand-gold/75 hover:bg-[#15120c] shadow-[inset_0_1px_0_rgba(243,229,171,0.08)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <span className="w-7 h-7 rounded-md bg-[#991b1b]/20 border border-[#991b1b]/50 flex items-center justify-center text-brand-gold group-hover/social:bg-[#991b1b] group-hover/social:text-white group-hover/social:border-[#991b1b] transition-colors duration-200 shrink-0">
                      <Youtube size={15} />
                    </span>
                    <span className="text-[12px] font-semibold tracking-widest uppercase text-gray-200 group-hover/social:text-brand-gold transition-colors duration-200 whitespace-nowrap truncate">
                      YouTube
                    </span>
                  </span>
                  <ArrowUpRight size={14} className="text-brand-gold/50 group-hover/social:text-brand-gold group-hover/social:translate-x-0.5 group-hover/social:-translate-y-0.5 transition-transform duration-200 shrink-0" />
                </a>
              </div>
            </div>
          </motion.div>

        </div>

      </div>

      {/* Extreme Bottom Bar */}
      <div className="relative z-30 bg-[#0a0a0a] border-t border-brand-gold/10 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] md:text-[12px] font-sans tracking-wide">
          <div className="text-gray-500 text-center md:text-left">
            {ft.copyRight}
          </div>
          <div className="text-brand-gold/70 text-center tracking-widest uppercase">
            {ft.designedFor}
          </div>
          <div className="text-gray-500 text-center md:text-right hidden lg:block">
            {ft.slogan}
          </div>
        </div>
      </div>
    </footer>
  );
}
