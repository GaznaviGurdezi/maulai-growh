import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { HeadingBackground } from "./HeadingBackground";
import { MissionBoxBackground } from "./MissionBoxBackground";
import { missionTranslations } from "./MissionTranslations";
import { HeartHandshake, BookOpen, Utensils, HeartPulse, Sparkles, Building2 } from "lucide-react";

export function Mission() {
  const { t, language } = useLanguage();
  const mt2 = missionTranslations[language];

  return (
    <section id="mission" className="relative py-24 lg:py-32 bg-brand-black overflow-hidden">
      {/* Full Section Background (Subtle) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-[0.05] mix-blend-screen z-10"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="relative block mx-auto w-full text-center mb-16"
        >
          <h2 className={`${t.fontClassSerif} text-[44px] ${language === 'ur' ? 'md:text-[50px]' : 'md:text-[35px]'} lg:text-5xl text-brand-gold mb-4 tracking-wide uppercase`}>{t.navMission || "Our Mission"}</h2>
          <div className="flex justify-center">
            <div className="h-0.5 w-16 bg-[#991b1b]"></div>
            <div className="h-0.5 w-3 bg-brand-gold ml-2"></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-brand-black border border-brand-gold/30 p-8 md:p-14 rounded-2xl md:rounded-3xl shadow-[0_0_40px_rgba(212,175,55,0.15)] overflow-hidden"
        >
          {/* Card Decorative Background Image & Effects */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-brand-black/85 z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-[#111111]/80 to-brand-black z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&q=80&w=2600" 
              alt="Islamic Architecture" 
              className="w-full h-full object-cover opacity-[0.35] mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10 mix-blend-screen z-10"></div>
            
            {/* Rich Glows */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#991b1b]/10 blur-[100px] rounded-full mix-blend-screen z-20 translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#d4af37]/10 blur-[100px] rounded-full mix-blend-screen z-20 -translate-x-1/3 translate-y-1/3"></div>
          </div>

          {/* Decorative Corner Borders */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl md:rounded-3xl z-10">
            {/* Elegant Golden Border Frames (Corners) */}
            <div className="absolute top-4 left-4 w-12 md:w-20 h-12 md:h-20 border-t-[3px] border-l-[3px] border-[#d4af37]/70 rounded-tl-xl md:rounded-tl-2xl"></div>
            <div className="absolute top-4 right-4 w-12 md:w-20 h-12 md:h-20 border-t-[3px] border-r-[3px] border-[#d4af37]/70 rounded-tr-xl md:rounded-tr-2xl"></div>
            <div className="absolute bottom-4 left-4 w-12 md:w-20 h-12 md:h-20 border-b-[3px] border-l-[3px] border-[#d4af37]/70 rounded-bl-xl md:rounded-bl-2xl"></div>
            <div className="absolute bottom-4 right-4 w-12 md:w-20 h-12 md:h-20 border-b-[3px] border-r-[3px] border-[#d4af37]/70 rounded-br-xl md:rounded-br-2xl"></div>
            
            {/* Line Accents (Gold Only) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[2px] bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[2px] bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent"></div>
          </div>

          <div className="relative z-20">
            <p className={`text-gray-300 text-[16px] ${language === 'ur' ? 'md:text-[20px] md:leading-[37.4px]' : 'md:text-[18px]'} leading-relaxed mb-10 text-center max-w-4xl mx-auto ${t.fontClassSans}`}>{mt2.intro}</p>

          <h3 className={`${t.fontClassSerif} text-[26px] md:text-[35px] text-brand-gold mb-6 text-center`}>{mt2.dream}</h3>

          <div className="flex flex-col gap-10 mb-16">
            {[
              {
                title: mt2.v1Title,
                text: mt2.v1Text,
                icon: <Utensils className="text-[#991b1b]" size={28} />,
                image: "https://static.toiimg.com/thumb/imgsize-23456,msid-61063487,width-600,resizemode-4/61063487.jpg"
              },
              {
                title: mt2.v2Title,
                text: mt2.v2Text,
                icon: <BookOpen className="text-brand-gold" size={28} />,
                image: "https://www.shutterstock.com/image-photo/alangaon-maharashtra-india-22february-2014-260nw-1110243764.jpg"
              },
              {
                title: mt2.v3Title,
                text: mt2.v3Text,
                icon: <HeartPulse className="text-[#991b1b]" size={28} />,
                image: "https://www.statnews.com/wp-content/uploads/2018/07/India-healthcare-AP_081104017025.jpg"
              },
              {
                title: mt2.v4Title,
                text: mt2.v4Text,
                icon: <HeartHandshake className="text-brand-gold" size={28} />,
                image: "https://www.chishtiyasufifoundation.com/assets/img/team/langar1.jpg"
              },
              {
                title: mt2.v5Title,
                text: mt2.v5Text,
                icon: <Sparkles className="text-[#991b1b]" size={28} />,
                image: "/langar-fatimiyyah.png"
              },
              {
                title: mt2.v6Title,
                text: mt2.v6Text,
                icon: <Building2 className="text-brand-gold" size={28} />,
                image: "https://images.hindustantimes.com/rf/image_size_630x354/HT/p2/2019/08/18/Pictures/73rd-independence-day_ecd969d2-c1a5-11e9-8082-f72c40cec428.jpg"
              },
              {
                title: mt2.v7Title,
                text: mt2.v7Text,
                icon: <HeartHandshake className="text-[#991b1b]" size={28} />,
                image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80&w=800"
              }
            ].map((item, idx) => (
              <div key={idx} className={`group flex flex-col lg:flex-row bg-[#111111] overflow-hidden rounded-2xl border border-white/5 hover:border-brand-gold/20 shadow-xl hover:shadow-[0_10px_40px_rgba(212,175,55,0.08)] transition-all duration-500 w-full ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="w-full lg:w-[45%] h-[250px] md:h-[320px] lg:h-auto lg:min-h-[350px] relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className={`absolute shadow-[0_0_20px_rgba(0,0,0,0.8)] bottom-6 z-20 bg-brand-black/95 backdrop-blur-sm p-3 md:p-4 rounded-full border border-[rgba(212,175,55,0.3)] group-hover:border-brand-gold transition-colors duration-500 ${idx % 2 !== 0 ? 'right-6 lg:left-6 lg:right-auto' : 'left-6 lg:right-6 lg:left-auto'}`}>
                    {item.icon}
                  </div>
                </div>
                <div className={`w-full lg:w-[55%] p-8 md:p-12 flex flex-col justify-center relative bg-brand-black/60 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] z-10 overflow-hidden ${idx % 2 !== 0 ? 'lg:border-r border-brand-gold/20' : 'lg:border-l border-brand-gold/20'} border-t lg:border-t-0 border-brand-gold/20`}>
                  {/* Decorative Background */}
                  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    <MissionBoxBackground index={idx} />
                  </div>
                  
                  <div className="relative z-10">
                    <h4 className={`${t.fontClassSerif} text-brand-gold text-[23px] md:text-[27px] lg:text-[26px] mb-4 leading-snug group-hover:text-[#fff1a0] transition-colors duration-300`}>{item.title}</h4>
                    <div className="h-[2px] w-16 bg-[#991b1b] mb-6 group-hover:w-24 transition-all duration-500"></div>
                    <p className={`text-gray-300 ${t.fontClassSans} ${language === "ur" ? "text-[15px] md:text-[20px] lg:text-[18px] leading-[39.25px]" : "text-[15px] md:text-[18px] lg:text-[18px] leading-[1.8]"} text-justify font-light`}>{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 relative px-6 py-12 md:p-16 rounded-[2.5rem] border border-brand-gold/20 bg-gradient-to-b from-[#151515] to-[#0a0a0a] shadow-[0_0_60px_rgba(212,175,55,0.08)] overflow-hidden flex flex-col items-center text-center w-full max-w-[1190px] mx-auto">
             {/* Decorative Background */}
             <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent"></div>
                
                <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-brand-gold/10 blur-[80px] rounded-full"></div>
                <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[#991b1b]/10 blur-[80px] rounded-full"></div>

                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-[0.05] mix-blend-screen"></div>
             </div>

             <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
                <div className="flex items-center justify-center mb-8 gap-4">
                  <div className="w-16 md:w-32 h-[1px] bg-gradient-to-r from-transparent to-[#d4af37]/80"></div>
                  <div className="w-12 h-12 rounded-full border border-[#d4af37]/30 flex items-center justify-center bg-[#d4af37]/5 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                    <HeartHandshake className="w-6 h-6 text-[#d4af37]" />
                  </div>
                  <div className="w-16 md:w-32 h-[1px] bg-gradient-to-l from-transparent to-[#d4af37]/80"></div>
                </div>

                <h3 className={`${t.fontClassSerif} text-[36px] md:text-[35px] text-brand-gold mb-8 uppercase tracking-widest font-bold drop-shadow-md leading-tight`}>{mt2.callTitle}</h3>
                
                <p className={`text-gray-300 text-[15px] ${language === 'ur' ? 'md:text-[20px] md:leading-[37.4px]' : 'md:text-[18px]'} leading-[1.8] md:leading-relaxed mb-6 ${t.fontClassSans} text-justify md:text-center font-light md:font-normal mx-auto px-2 md:px-0`}>{mt2.callP1}</p>
                <p className={`text-gray-300 text-[15px] ${language === 'ur' ? 'md:text-[20px] md:leading-[37.4px]' : 'md:text-[18px]'} leading-[1.8] md:leading-relaxed mb-10 ${t.fontClassSans} text-justify md:text-center font-light md:font-normal mx-auto px-2 md:px-0`} style={{ width: '899px', maxWidth: '100%' }}>{mt2.callP2}</p>
                <p className={`text-brand-gold/90 text-[16px] ${language === 'ur' ? 'md:text-[20px] md:leading-[37.4px]' : 'md:text-[18px]'} leading-relaxed italic mb-14 ${t.fontClassSerif} text-center mx-auto font-medium px-2 md:px-0`}>{mt2.callP3}</p>
                
                <div className="relative py-8 md:py-12 px-4 md:px-12 flex flex-col items-center justify-center bg-[#050505] rounded-3xl border border-brand-gold/10 shadow-[inset_0_0_40px_rgba(212,175,55,0.03)] group transition-all duration-500 hover:border-brand-gold/30 hover:shadow-[inset_0_0_60px_rgba(212,175,55,0.08)] w-full max-w-[717px]">
                  {/* Magical Ornaments for Quote */}
                  <div className="absolute top-0 left-0 w-6 h-6 md:w-8 md:h-8 border-t border-l border-brand-gold/30 rounded-tl-2xl m-3 md:m-4 transition-all duration-500 group-hover:border-brand-gold/60 group-hover:w-12 group-hover:h-12" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 md:w-8 md:h-8 border-b border-r border-brand-gold/30 rounded-br-2xl m-3 md:m-4 transition-all duration-500 group-hover:border-brand-gold/60 group-hover:w-12 group-hover:h-12" />
                  <p className={`${t.fontClassSerif} text-[#d4af37] text-[18px] md:text-[25px] font-bold mb-4 drop-shadow-md text-center leading-snug md:leading-normal mt-2 md:mt-0`}>{mt2.quote}</p>
                  <div className="h-[2px] w-16 md:w-24 bg-gradient-to-r from-transparent via-[#991b1b] to-transparent mb-5" />
                  <p className={`text-gray-400 text-[9px] md:text-[15px] leading-snug md:leading-[21px] -mt-3 md:-mt-[22px] tracking-[0.1em] md:tracking-[0.25em] uppercase font-bold text-center ${t.fontClassSans} mb-2 md:mb-0`}>{mt2.quoteSub}</p>
                </div>
             </div>
          </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
