import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { HeroHeadingBackground } from "./HeroHeadingBackground";
import { leadershipTranslations } from "./LeadershipHeritageTranslations";

export function LeadershipHeritage() {
  const { t, language } = useLanguage();
  const lt = leadershipTranslations[language];

  const leaders = [
    {
      title: lt.l1Title,
      name: lt.l1Name,
      description: lt.l1Desc,
      image: "/founder.png",
    },
    {
      title: lt.l2Title,
      name: lt.l2Name,
      description: lt.l2Desc,
      image: "/vice-chairman.png",
    },
    {
      title: lt.l3Title,
      name: lt.l3Name,
      description: lt.l3Desc,
      image: "/chairman.png",
    },
  ];

  return (
    <div className="w-full py-12 md:py-24 relative z-10 px-4 lg:px-8">
      <div className="text-center mb-12 md:mb-16">
        <h3
          className={`${t.fontClassSerif} text-brand-gold mb-4 tracking-wide uppercase ${
            language === 'ur'
              ? 'text-[55px] md:text-[50px]'
              : 'text-[40px] md:text-[48px]'
          }`}
          style={language === 'ur' ? { fontFamily: "Georgia, serif" } : undefined}
        >
          {lt.title}
        </h3>
        <div className="flex justify-center mb-6">
          <div className="h-0.5 w-12 bg-brand-crimson"></div>
          <div className="h-0.5 w-3 bg-brand-gold ml-2"></div>
        </div>
        <p
          className={`text-gray-200 ${t.fontClassSans} max-w-2xl mx-auto leading-relaxed ${
            language === 'ur'
              ? 'text-[20.5px] md:text-[19px] leading-[1.9]'
              : 'text-[17.5px] md:text-[18px]'
          }`}
          style={{ fontFamily: "Arial, sans-serif" }}
        >
          {lt.subtitle}
        </p>
      </div>

      <div className="leadership-cards-container flex flex-col gap-6 md:gap-8 lg:gap-10 w-full max-w-5xl mx-auto relative z-10 px-3 sm:px-4 md:px-0">
        {leaders.map((leader, idx) => (
          <div
            key={idx}
            className="leadership-card group block bg-brand-black/90 backdrop-blur-md border border-brand-gold/30 p-5 sm:p-7 md:p-8 relative transition-all duration-500 hover:border-brand-gold/60 shadow-[0_4px_30px_rgba(0,0,0,0.7)] flex flex-col md:flex-row min-h-0 h-auto items-center text-center md:text-left rounded-3xl gap-5 md:gap-8 opacity-100 overflow-visible"
          >
            <HeroHeadingBackground />
            {/* Ambient Background & Borders */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 via-transparent to-[#991b1b]/10 pointer-events-none opacity-60 transition-opacity duration-500 group-hover:opacity-100"></div>
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-brand-gold/40 transition-all duration-500 group-hover:w-12 group-hover:h-12"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-brand-gold/40 transition-all duration-500 group-hover:w-12 group-hover:h-12"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-brand-gold/40 transition-all duration-500 group-hover:w-12 group-hover:h-12"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-brand-gold/40 transition-all duration-500 group-hover:w-12 group-hover:h-12"></div>
            {/* Profile Image */}
            <div className="leadership-img-box w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-brand-gold/50 shadow-[0_0_20px_rgba(212,175,55,0.2)] bg-black flex items-center justify-center shrink-0 relative group-hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-500 z-10 mx-auto md:mx-0">
              {/* Optional Islamic geometric overlay for empty state/styling */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
              {leader.image ? (
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="text-brand-gold/20 text-[35px]">◈</div>
              )}
            </div>
            {/* Content Container */}
            <div className="leadership-content flex flex-col flex-1 relative z-10 w-full items-center md:items-start text-center md:text-left">
              <span 
                className={`leadership-title uppercase mb-2 font-semibold text-amber-400 text-[16px] md:text-[20px] ${
                  language === 'ur'
                    ? 'font-sans tracking-normal'
                    : language === 'hi'
                    ? 'tracking-[0.1em]'
                    : 'tracking-[0.2em]'
                }`}
              >
                {leader.title}
              </span>
              <h4
                className={`leadership-name text-brand-gold mb-3 md:mb-4 leading-snug whitespace-pre-wrap text-[24px] md:text-[28px] font-bold`}
                style={{
                  fontFamily: language === 'hi' ? "Amita, serif" : language === 'ur' ? "Gulzar, serif" : undefined
                }}
              >
                {leader.name}
              </h4>
              <div className="leadership-divider h-[1px] w-12 bg-brand-gold/40 mb-3 md:mb-4 group-hover:w-20 transition-all duration-500 mx-auto md:mx-0"></div>
              <p
                className={`leadership-bio text-gray-100 ${t.fontClassSans} text-justify ${
                  language === 'ur' || language === 'hi'
                    ? 'text-[17px] md:text-[19px] leading-[1.85]'
                    : 'text-[16px] md:text-[18px] leading-[1.75]'
                } transition-all duration-300`}
                style={language === 'hi' ? { fontFamily: 'Arial, sans-serif' } : undefined}
              >
                {leader.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
