import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { HeadingBackground } from "./HeadingBackground";
import { ArrowRight } from "lucide-react";
import { khuddamTranslations } from "./KhuddamEKhwajaTranslations";

export function KhuddamEKhwaja() {
  const { t, language } = useLanguage();
  const currentTranslations = khuddamTranslations[language as keyof typeof khuddamTranslations];

  const sections = [
    {
      title: currentTranslations.sec1Title,
      content: [
        {
          subtitle: "",
          text: currentTranslations.sec1P1,
        },
        {
          subtitle: "",
          text: currentTranslations.sec1P2,
        },
        {
          subtitle: "",
          text: currentTranslations.sec1P3,
        }
      ],
      image: "https://i.ytimg.com/vi/HPYe4L97YD4/maxresdefault.jpg",
      aspectClass: "aspect-video md:aspect-[4/3]",
      objectClass: "object-cover",
    },
    {
      title: currentTranslations.sec2Title,
      content: [
        {
          subtitle: "",
          text: currentTranslations.sec2P1 + "\n\n" + currentTranslations.sec2P2,
        }
      ],
      image: "/lineage.jpg",
      aspectClass: "aspect-[3/4]",
      objectClass: "object-cover object-top",
    }
  ];

  return (
    <section className="relative py-24 lg:py-32 bg-brand-black overflow-hidden pointer-events-auto border-t border-brand-gold/10">
      {/* Background ornamentation */}
      <div className="absolute top-0 left-0 w-full flex justify-center items-center pointer-events-none opacity-80">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"></div>
        <div className="absolute w-3 h-3 rotate-45 border border-brand-gold bg-black"></div>
        <div className="absolute w-6 h-6 rotate-45 border border-brand-gold/30"></div>
      </div>
      
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-brand-dark to-transparent opacity-80" />
      <div className="absolute w-[800px] h-[800px] bg-brand-crimson/5 rounded-full blur-[120px] top-1/4 right-[-200px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[100px] bottom-0 left-[-100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="relative block mx-auto w-full max-w-4xl text-center mb-20 lg:mb-32"
        >
          <HeadingBackground />
          <h2 className={`relative z-10 ${t.fontClassSerif} text-[32px] sm:text-[40px] ${language === 'ur' ? 'md:text-[50px]' : 'md:text-[35px]'} lg:text-6xl text-brand-gold mb-6 tracking-wide drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)]`}>
            {currentTranslations.heading}
          </h2>
          <p className={`text-brand-gold/80 text-[14px] ${language === 'ur' ? 'md:text-[19px]' : 'md:text-[16px]'} uppercase tracking-[0.2em] max-w-3xl mx-auto leading-relaxed ${t.fontClassSans}`}>
            {currentTranslations.subheading}
          </p>
          <div className="flex justify-center mt-10">
            <div className="h-0.5 w-16 bg-brand-crimson"></div>
            <div className="h-0.5 w-3 bg-brand-gold ml-2"></div>
          </div>
        </motion.div>

        {/* Editorial Layout */}
        <div className="flex flex-col gap-20 lg:gap-32">
          
          {/* Section 1: Merged Fakhruddin Gurdezi Info - Float Layout */}
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-full block relative bg-brand-dark/40 backdrop-blur-xl border border-brand-gold/30 p-6 md:p-10 lg:p-12 rounded-3xl shadow-[0_15px_50px_rgba(0,0,0,0.6)] overflow-hidden"
            >
              {/* Glitter & Glassmorphism effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/20 via-transparent to-brand-crimson/20 pointer-events-none"></div>
              <div className="absolute inset-0 opacity-[0.06] mix-blend-screen pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}></div>
              
              <div className="relative z-10 block">
                {/* Floated Image */}
                <div className="w-full md:w-1/2 lg:w-5/12 float-none md:float-left mr-0 md:mr-10 lg:mr-14 mb-8 relative group z-10">
                {/* Premium Glow & Frame */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-brand-gold/10 to-brand-crimson/10 rounded-2xl blur-xl group-hover:opacity-100 opacity-60 transition duration-1000 -z-10"></div>
                <div className="absolute -inset-2 border border-brand-gold/20 rounded-xl transition-all duration-700 group-hover:scale-[1.02] -z-10"></div>
                
                <div className={`relative w-full ${sections[0].aspectClass} rounded-lg overflow-hidden border border-brand-gold/40 z-10 shadow-2xl`}>
                  <div className="absolute inset-0 bg-brand-black/20 group-hover:bg-transparent transition-all duration-1000 z-10"></div>
                  <img 
                    src={sections[0].image} 
                    alt={sections[0].title} 
                    className={`w-full h-full ${sections[0].objectClass} grayscale-[15%] group-hover:grayscale-0 transition-transform duration-1000 group-hover:scale-105`}
                  />
                </div>
              </div>
              
              {/* Content wrapped around image */}
              <div className="pt-2 lg:pt-4">
                <h3 className={`${t.fontClassSerif} text-[28px] ${language === 'ur' ? 'md:text-[35px]' : 'md:text-[30px]'} lg:text-[36px] text-brand-gold font-bold leading-tight mb-8 block`}>
                  <span className="inline-block w-8 md:w-12 h-[2px] bg-brand-crimson mr-4 align-middle"></span>
                  {sections[0].title}
                </h3>
                
                <div className="block">
                  {sections[0].content.map((block, idx) => (
                    <div key={idx} className="mb-6 block">
                      {block.subtitle && (
                        <h4 className={`${t.fontClassSerif} text-[20px] md:text-[24px] text-brand-gold/90 font-semibold mb-3`}>
                          {block.subtitle}
                        </h4>
                      )}
                      <div className={`text-gray-300 text-[16px] ${language === 'ur' ? 'md:text-[20px] md:leading-[37.4px]' : 'md:text-[18px]'} lg:text-[19px] leading-[2.1] font-light ${t.fontClassSans}`}>
                        {block.text.split('\n\n').map((paragraph, pIndex) => (
                          <p key={pIndex} className="text-justify mb-4">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="clear-both"></div>
              </div>
            </motion.div>
          </div>

          {/* Section 2: Split Footer with Lineage Image */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16 relative bg-brand-dark/40 backdrop-blur-xl border border-brand-gold/30 p-6 md:p-10 lg:p-12 rounded-3xl shadow-[0_15px_50px_rgba(0,0,0,0.6)] overflow-hidden mt-12">
            {/* Glitter & Glassmorphism effects */}
            <div className="absolute inset-0 bg-gradient-to-tl from-brand-gold/20 via-transparent to-brand-crimson/20 pointer-events-none"></div>
            <div className="absolute inset-0 opacity-[0.06] mix-blend-screen pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}></div>
            
            <div className="relative z-10 flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16 w-full">
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-full sm:w-3/4 md:w-1/2 lg:w-4/12 xl:w-3/12 mx-auto lg:mx-0 relative group"
            >
              {/* Premium Glow & Frame */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-brand-gold/10 to-brand-crimson/10 rounded-2xl blur-xl group-hover:opacity-100 opacity-60 transition duration-1000 -z-10"></div>
              <div className="absolute -inset-2 border border-brand-gold/20 rounded-xl transition-all duration-700 group-hover:scale-[1.02] -z-10"></div>
              
              <div className={`relative w-full ${sections[1].aspectClass} rounded-lg overflow-hidden border border-brand-gold/40 z-10 shadow-2xl`}>
                <div className="absolute inset-0 bg-brand-black/20 group-hover:bg-transparent transition-all duration-1000 z-10"></div>
                <img 
                  src={sections[1].image} 
                  alt={sections[1].title} 
                  className={`w-full h-full ${sections[1].objectClass} grayscale-[15%] group-hover:grayscale-0 transition-transform duration-1000 group-hover:scale-105`}
                />
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="w-full lg:w-8/12 xl:w-9/12 flex flex-col justify-center"
            >
              <div className="flex items-center gap-4 mb-6 justify-end lg:justify-start">
                <h3 className={`${t.fontClassSerif} text-[28px] ${language === 'ur' ? 'md:text-[35px]' : 'md:text-[30px]'} lg:text-[36px] text-brand-gold font-bold leading-tight text-right lg:text-left`}>
                  {sections[1].title}
                </h3>
                <div className="w-12 h-[1px] bg-brand-crimson"></div>
              </div>
              <div className={`space-y-6 text-gray-300 text-[16px] ${language === 'ur' ? 'md:text-[20px] md:leading-[37.4px]' : 'md:text-[18px]'} lg:text-[19px] leading-[2.1] font-light ${t.fontClassSans}`}>
                {sections[1].content[0].text.split('\n\n').map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-justify">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
