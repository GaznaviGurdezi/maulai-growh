import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { langarTranslations } from "./HussainiLangarTranslations";
import { missionTranslations } from "./MissionTranslations";
import { X, PlayCircle, HeartHandshake } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RedRaysBackground } from "./RedRaysBackground";
import { formatDarood } from "../utils/formatText";

export function HussainiLangar() {
  const { t, language } = useLanguage();
  const lt = langarTranslations[language as keyof typeof langarTranslations] || langarTranslations["en"];
  const mt2 = missionTranslations[language as keyof typeof missionTranslations] || missionTranslations["en"];
  const navigate = useNavigate();
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="hussaini-langar-section" data-lang={language} className={"relative w-full bg-black overflow-hidden pointer-events-auto pb-32 " + (language === "ur" ? "lang-ur" : (language === "hi" ? "lang-hi" : ""))}>
      {/* Background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none flex justify-center">
        <div className="absolute top-0 w-full h-[60vh] bg-gradient-to-b from-[#3a0000] via-[#110000] to-black opacity-80" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-[0.05] mix-blend-screen" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-32 md:pt-48">
        
        {/* Title Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="flex flex-col items-center text-center mt-0 mb-4 md:mb-24"
        >
          <div className="flex items-center justify-center gap-2 sm:gap-4 ml-0 mt-[1px] mb-[-17px] opacity-80 max-w-full">
            <div className="w-8 sm:w-12 md:w-24 h-[2px] bg-gradient-to-r from-transparent to-[#ff0000] shrink"></div>
            <span className={`text-[#ff0000] whitespace-nowrap shrink-0 text-[13px] ${language === 'ur' ? 'md:text-[30px] font-["Reem_Kufi"]' : (language === 'hi' ? 'md:text-[23px] hi-font-asar md:pt-[4px]' : 'md:text-[17px]')} tracking-[0.25em] sm:tracking-[0.4em] uppercase font-bold langar-urdu-badge ${language === 'ur' || language === 'hi' ? '' : t.fontClassSans}`}>{(lt as any).yaHussain || "YA HUSSAIN (A.S)"}</span>
            <div className="w-8 sm:w-12 md:w-24 h-[2px] bg-gradient-to-l from-transparent to-[#ff0000] shrink"></div>
          </div>
          
          <div className="relative w-full max-w-[1000px] py-16 flex justify-center items-center">
            <div className="absolute inset-0 z-0">
               <RedRaysBackground />
            </div>
            
            <div className="absolute w-[60%] h-[60%] bg-[#ff0000]/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>
            
            <h2 className={`relative z-10 ${language === 'ur' ? 'font-["Scheherazade_New"] text-[50px] md:text-[150px] pt-4 md:pt-[41px] pb-4 md:pb-[40px] pl-2 md:pl-[20px] pr-2 md:pr-[6px]' : (language === 'hi' ? 'md:hi-font-amita' : t.fontClassSerif)} text-[50px] md:text-[95px] leading-[0.9] text-transparent bg-clip-text bg-gradient-to-tr from-[#990000] via-[#ff0000] to-[#550000] tracking-widest uppercase font-bold [filter:drop-shadow(0_0_20px_rgba(255,0,0,0.8))_drop-shadow(0_0_80px_rgba(255,0,0,0.5))] langar-urdu-title ${language === 'hi' ? 'text-[50px] md:text-[150px] pt-4 md:pt-[50px] pb-4 md:pb-[50px] pl-2 md:pl-[19px] pr-2 md:pr-[40px] mx-0' : ''}`}>
              {lt.title}
            </h2>
          </div>
          <div className="mt-8 w-[2px] h-24 bg-gradient-to-b from-[#ff0000] to-transparent"></div>
        </motion.div>

        {/* Intro */}
        <div className={`${language === 'hi' ? 'max-w-[960px]' : 'max-w-4xl'} mx-auto text-center mb-32`}>
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1 }}
             className="bg-[#0a0000] border border-[#550000] p-8 md:p-14 rounded-t-[4rem] rounded-b-md relative shadow-[0_0_50px_rgba(85,0,0,0.4)]"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[2px] bg-gradient-to-r from-transparent via-[#ff0000] to-transparent"></div>
            <p className={`text-gray-200 text-[16px] md:text-[24px] font-light ${language === 'ur' ? 'leading-[1.8] md:text-[29px] md:leading-[58.125px]' : 'leading-[1.8]'} mb-10 langar-urdu-intro-p1 ${t.fontClassSans} ${language === 'hi' ? 'md:text-[24px] hi-font-arial' : ''}`}>
              {lt.intro}
            </p>
            <p className={`text-[#ff4444] text-[15px] md:text-[20px] ${language === 'ur' ? 'md:text-[22px] md:leading-[49px] not-italic' : (language === 'hi' ? 'md:text-[22px] hi-font-arial not-italic' : 'italic')} tracking-widest ${language === 'hi' || language === 'ur' ? '' : t.fontClassSerif}`}>
              {lt.founder}
            </p>
          </motion.div>
        </div>

        {/* The Gathering */}
        <div className="relative mb-32 md:mb-48">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="order-2 lg:order-1"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-1.5 h-12 bg-[#ff0000]"></div>
                <h3 className={`${language === 'ur' ? 'font-["Georgia"] text-[24px] md:text-[60px]' : (language === 'hi' ? 'text-[24px] md:text-[55px] hi-font-amita' : t.fontClassSerif + ' text-[24px] md:text-[40px]')} text-[#990000] font-bold tracking-widest uppercase langar-urdu-gathering-title`}>
                  {(lt as any).card1Title}
                </h3>
              </div>
              <div className={`space-y-6 text-gray-300 text-[16px] md:text-[20px] ${language !== 'ur' ? 'leading-[2.1]' : 'leading-[1.8] md:text-[22px] md:leading-[48px]'} font-light ${t.fontClassSans} ${language === 'hi' ? 'md:text-[22px] hi-font-arial' : ''}`}>
                <p className={`text-justify border-l border-[#330000] ${language === 'en' ? 'pl-0 md:pl-6' : 'pl-0 md:pl-6'} py-2 langar-urdu-gathering-desc`}>{lt.stats1}</p>
                
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="order-1 lg:order-2 relative"
            >
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-12 lg:max-w-[65%] mx-auto">
                {/* Image 1 */}
                <div 
                  className="relative w-full cursor-pointer group lg:scale-[1.05]"
                  onClick={() => setSelectedImage("/langar-fatimiyyah.png")}
                >
                  <div className="absolute inset-0 bg-[#ff0000]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                  
                  {/* Decorative Frame */}
                  <div className={`absolute -inset-2 sm:-inset-4 border border-[#330000] group-hover:border-[#ff0000]/50 transition-colors duration-700 z-0 ${language === "hi" ? "w-[387.5px]" : ""}`}>
                     <div className="absolute top-0 left-0 w-4 sm:w-10 h-4 sm:h-10 border-t-2 border-l-2 border-[#ff0000] -translate-x-[2px] -translate-y-[2px]"></div>
                     <div className="absolute bottom-0 right-0 w-4 sm:w-10 h-4 sm:h-10 border-b-2 border-r-2 border-[#ff0000] translate-x-[2px] translate-y-[2px]"></div>
                  </div>
                  
                  <div className="relative w-full overflow-hidden border border-[#550000] z-10 bg-[#050000]">
                    <div className="absolute inset-0 bg-[#ff0000]/20 mix-blend-color z-10 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none"></div>
                    <img src="/langar-fatimiyyah.png" alt="Langar Gathering" className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-1000 grayscale-[30%] group-hover:grayscale-0" />
                  </div>
                </div>
                
                {/* Image 2 */}
                <div 
                  className="relative w-full cursor-pointer group mt-8 sm:mt-12 lg:scale-[1.05]"
                  onClick={() => setSelectedImage("/langar.png")}
                >
                  <div className="absolute inset-0 bg-[#ff0000]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                  
                  {/* Decorative Frame */}
                  <div className="absolute -inset-2 sm:-inset-4 border border-[#330000] group-hover:border-[#ff0000]/50 transition-colors duration-700 z-0">
                     <div className="absolute top-0 right-0 w-4 sm:w-10 h-4 sm:h-10 border-t-2 border-r-2 border-[#ff0000] translate-x-[2px] -translate-y-[2px]"></div>
                     <div className="absolute bottom-0 left-0 w-4 sm:w-10 h-4 sm:h-10 border-b-2 border-l-2 border-[#ff0000] -translate-x-[2px] translate-y-[2px]"></div>
                  </div>
                  
                  <div className="relative w-full overflow-hidden border border-[#550000] z-10 bg-[#050000]">
                    <div className="absolute inset-0 bg-[#ff0000]/20 mix-blend-color z-10 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none"></div>
                    <img src="/langar.png" alt="Langar Preparation" className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-1000 grayscale-[30%] group-hover:grayscale-0" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* The Blessed Food */}
        <div className="relative mb-32 md:mb-48">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-12 lg:max-w-[65%] mx-auto">
                {/* Image 3 */}
                <div 
                  className="relative w-full cursor-pointer group mt-8 sm:mt-12 lg:scale-[1.05]"
                  onClick={() => setSelectedImage("https://www.chishtiyasufifoundation.com/assets/img/team/langar2.jpg")}
                >
                  <div className="absolute inset-0 bg-[#ff0000]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                  
                  {/* Decorative Frame */}
                  <div className="absolute -inset-2 sm:-inset-4 border border-[#330000] group-hover:border-[#ff0000]/50 transition-colors duration-700 z-0">
                     <div className="absolute top-0 right-0 w-4 sm:w-10 h-4 sm:h-10 border-t-2 border-r-2 border-[#ff0000] translate-x-[2px] -translate-y-[2px]"></div>
                     <div className="absolute bottom-0 left-0 w-4 sm:w-10 h-4 sm:h-10 border-b-2 border-l-2 border-[#ff0000] -translate-x-[2px] translate-y-[2px]"></div>
                  </div>
                  
                  <div className="relative w-full overflow-hidden border border-[#550000] z-10 bg-[#050000]">
                    <div className="absolute inset-0 bg-[#ff0000]/20 mix-blend-color z-10 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none"></div>
                    <img src="https://www.chishtiyasufifoundation.com/assets/img/team/langar2.jpg" alt="Sacred Food" className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-1000 grayscale-[30%] group-hover:grayscale-0" />
                  </div>
                </div>
                
                {/* Image 4 */}
                <div 
                  className="relative w-full cursor-pointer group lg:scale-[1.05]"
                  onClick={() => setSelectedImage("https://www.chishtiyasufifoundation.com/assets/img/team/langar1.jpg")}
                >
                  <div className="absolute inset-0 bg-[#ff0000]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                  
                  {/* Decorative Frame */}
                  <div className="absolute -inset-2 sm:-inset-4 border border-[#330000] group-hover:border-[#ff0000]/50 transition-colors duration-700 z-0">
                     <div className="absolute top-0 left-0 w-4 sm:w-10 h-4 sm:h-10 border-t-2 border-l-2 border-[#ff0000] -translate-x-[2px] -translate-y-[2px]"></div>
                     <div className="absolute bottom-0 right-0 w-4 sm:w-10 h-4 sm:h-10 border-b-2 border-r-2 border-[#ff0000] translate-x-[2px] translate-y-[2px]"></div>
                  </div>
                  
                  <div className="relative w-full overflow-hidden border border-[#550000] z-10 bg-[#050000]">
                    <div className="absolute inset-0 bg-[#ff0000]/20 mix-blend-color z-10 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none"></div>
                    <img src="https://www.chishtiyasufifoundation.com/assets/img/team/langar1.jpg" alt="Serving the Blessed Food" className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-1000 grayscale-[30%] group-hover:grayscale-0" />
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
            >
              <div className="flex items-center gap-4 mb-8 justify-end">
                <h3 className={`${language === 'ur' ? 'font-["Georgia"] text-[24px] md:text-[60px]' : (language === 'hi' ? 'text-[24px] md:text-[55px] hi-font-amita' : t.fontClassSerif + ' text-[24px] md:text-[40px]')} text-[#990000] font-bold tracking-widest uppercase text-right langar-urdu-food-title`}>
                  {(lt as any).card2Title}
                </h3>
                <div className="w-1.5 h-12 bg-[#ff0000]"></div>
              </div>
              <div className={`space-y-6 text-gray-300 text-[16px] md:text-[20px] ${language === 'ur' ? 'leading-[1.8] md:text-[22px] md:leading-[48px]' : 'leading-[2.1]'} font-light ${t.fontClassSans} ${language === 'hi' ? 'md:text-[22px] hi-font-arial' : ''}`}>
                <p className={`text-justify border-r border-[#330000] pr-0 md:pr-6 py-2 langar-urdu-food-desc`} style={{ direction: language === 'ur' ? 'rtl' : 'ltr' }}>
                  {lt.stats2}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Video Vault */}
        <div className="mb-32 md:mb-48 relative max-w-6xl mx-auto">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[2px] h-16 bg-gradient-to-b from-[#ff0000] to-transparent"></div>
          
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="text-center pt-24 mb-20"
          >
            <h3 className={`${language === 'ur' ? 'font-["Noto_Naskh_Arabic"] text-[25px] md:text-[60px] whitespace-nowrap' : (language === 'hi' ? 'text-[25px] md:text-[55px] hi-font-amita whitespace-nowrap' : t.fontClassSerif + ' text-[25px] md:text-[32px]')} text-[#990000] tracking-[0.1em] sm:tracking-[0.3em] uppercase font-bold flex items-center justify-center gap-2 sm:gap-6 flex-nowrap`}>
              <div className="w-6 sm:w-16 h-[1px] bg-[#330000] shrink"></div>
              <span className="whitespace-nowrap shrink-0 langar-urdu-archives-title">{(lt as any).theArchives || "The Archives"}</span>
              <div className="w-6 sm:w-16 h-[1px] bg-[#330000] shrink"></div>
            </h3>
          </motion.div>

          <div className="flex flex-row items-center justify-center gap-4 sm:gap-8 md:gap-16 lg:gap-24">
            {/* Video 1 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group w-1/2 max-w-[420px] relative"
            >
              <div className="absolute -inset-4 border border-[#330000] z-0 rounded-xl group-hover:border-[#ff0000]/30 transition-colors duration-700 pointer-events-none"></div>
              <div className="absolute -inset-2 border border-[#550000] z-0 rounded-lg group-hover:border-[#ff0000]/50 transition-colors duration-700 pointer-events-none"></div>
              
              <div className="relative overflow-hidden border-2 border-[#ff0000]/20 bg-[#050000] w-full aspect-[16/9] transition-all duration-500 group-hover:border-[#ff0000] rounded-md z-10 shadow-[0_0_30px_rgba(255,0,0,0.05)] group-hover:shadow-[0_0_40px_rgba(255,0,0,0.3)]">
                <iframe
                  src="https://www.youtube.com/embed/w-34MDDwuVY?si=5pUye_DugLGInvUy"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="w-full h-full absolute inset-0 grayscale-[50%] group-hover:grayscale-0 transition-all duration-700"
                ></iframe>
              </div>
              <div className="mt-4 sm:mt-10 flex flex-col items-center text-center relative z-10 px-4">
                <p className={`text-[#ff0000] text-[12px] sm:text-[15px] ${language === 'ur' ? 'md:text-[24px]' : (language === 'hi' ? 'md:text-[24px] hi-font-asar' : 'md:text-[17px]')} tracking-[0.2em] uppercase font-bold langar-urdu-video1-title ${t.fontClassSerif}`}>
                  {(lt as any).video1Title}
                </p>
                <div className="w-16 h-[2px] bg-[#330000] mt-4 group-hover:bg-[#ff0000] transition-colors duration-500"></div>
              </div>
            </motion.div>

            {/* Video 2 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group w-1/2 max-w-[420px] relative"
            >
              <div className="absolute -inset-4 border border-[#330000] z-0 rounded-xl group-hover:border-[#ff0000]/30 transition-colors duration-700 pointer-events-none"></div>
              <div className="absolute -inset-2 border border-[#550000] z-0 rounded-lg group-hover:border-[#ff0000]/50 transition-colors duration-700 pointer-events-none"></div>
              
              <div className="relative overflow-hidden border-2 border-[#ff0000]/20 bg-[#050000] w-full aspect-[16/9] transition-all duration-500 group-hover:border-[#ff0000] rounded-md z-10 shadow-[0_0_30px_rgba(255,0,0,0.05)] group-hover:shadow-[0_0_40px_rgba(255,0,0,0.3)]">
                <iframe
                  src="https://www.youtube.com/embed/0FeM-O0ypto?si=UcNEJRVIpkjLk2eV"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="w-full h-full absolute inset-0 grayscale-[50%] group-hover:grayscale-0 transition-all duration-700"
                ></iframe>
              </div>
              <div className="mt-4 sm:mt-10 flex flex-col items-center text-center relative z-10 px-4">
                <p className={`text-[#ff0000] text-[12px] sm:text-[15px] ${language === 'ur' ? 'md:text-[24px]' : (language === 'hi' ? 'md:text-[24px] hi-font-asar' : 'md:text-[17px]')} tracking-[0.2em] uppercase font-bold langar-urdu-video2-title ${t.fontClassSerif}`}>
                  {(lt as any).video2Title}
                </p>
                <div className="w-16 h-[2px] bg-[#330000] mt-4 group-hover:bg-[#ff0000] transition-colors duration-500"></div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Discontinued Notice */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="flex justify-center mb-32 md:mb-48 px-4"
        >
          <div className="inline-flex items-center justify-center border-y border-[#330000] py-6 px-2 sm:px-10 w-full md:w-auto mx-auto overflow-hidden">
            <p className={`text-[#ff0000] ${language === 'en' ? 'text-[12px] min-[360px]:text-[13px] min-[400px]:text-[14.5px] md:text-[18px] text-center' : (language === 'ur' ? 'text-[12px] min-[360px]:text-[13px] min-[400px]:text-[14.5px] md:text-[30px] font-["Georgia"]' : (language === 'hi' ? 'text-[12px] min-[360px]:text-[13px] min-[400px]:text-[14.5px] md:text-[28px] hi-font-asar font-bold' : 'text-[12px] md:text-[18px]'))} font-semibold tracking-normal min-[360px]:tracking-[0.03em] sm:tracking-[0.15em] uppercase text-center md:whitespace-nowrap ${language === 'ur' || language === 'hi' ? '' : t.fontClassSans}`}>
              {language === 'en' ? (
                <>
                  <span className="block whitespace-normal md:whitespace-nowrap">Due to unavoidable<br className="md:hidden" /> circumstances,</span>
                  <span className="block whitespace-normal md:whitespace-nowrap">this noble service was<br className="md:hidden" /> discontinued in 2016.</span>
                </>
              ) : (
                lt.discontinued
              )}
            </p>
          </div>
        </motion.div>

        {/* Our Vision Section - Redesigned */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative w-full max-w-6xl mx-auto px-4 md:px-8 py-24 mb-16"
        >
          {/* Main Card */}
          <div className="relative rounded-[2.5rem] bg-gradient-to-b from-[#0a0000] to-[#150000] border border-[#ff0000]/20 p-8 md:p-16 overflow-hidden shadow-[0_20px_50px_rgba(255,0,0,0.1)] group">
            
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-[0.03] mix-blend-screen pointer-events-none"></div>
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#ff0000]/10 blur-[120px] rounded-full pointer-events-none transition-transform duration-1000 group-hover:scale-110"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#ff0000]/10 blur-[120px] rounded-full pointer-events-none transition-transform duration-1000 group-hover:scale-110"></div>
            
            <div className="relative z-10 flex flex-col items-center gap-12 lg:gap-16">
              
              {/* Text Content */}
              <div className="w-full flex flex-col items-center text-center">
                
                <h3 className={`${language === 'ur' ? 'font-["Georgia"] text-[40px] md:text-[56px] lg:text-[85px]' : (language === 'hi' ? 'text-[40px] md:text-[56px] lg:text-[70px] hi-font-amita' : t.fontClassSerif + ' text-[40px] md:text-[56px] lg:text-[70px]')} text-[#ff0000] tracking-[0.05em] uppercase font-bold leading-[1.1] mb-8 drop-shadow-md langar-urdu-vision-title`}>
                  {lt.visionTitle}
                </h3>
                
                <div className="relative">
                  <span className="absolute -top-6 -left-6 text-[80px] text-[#ff0000]/10 font-serif leading-none select-none hidden lg:block">"</span>
                  <p className={`text-[#e0e0e0] ${language === 'ur' ? 'font-["Noto_Nastaliq_Urdu"] text-[16px] md:text-[18px] lg:text-[24px] leading-[2] md:leading-[62px] not-italic' : (language === 'hi' ? 'text-[16px] md:text-[18px] lg:text-[23px] leading-[2] md:leading-[45px] hi-font-arial not-italic' : (language === 'en' ? 'text-[16px] md:text-[18px] lg:text-[20px] leading-[2.2] font-serif not-italic md:italic text-center' : 'text-[15px] md:text-[18px] lg:text-[20px] leading-[2.2] font-serif italic'))} no-underline relative z-10 text-justify lg:text-center max-w-4xl mx-auto langar-urdu-vision-quote`}>
                    {formatDarood(lt.vision1)}
                  </p>
                  <span className="absolute -bottom-10 -right-2 text-[80px] text-[#ff0000]/10 font-serif leading-none select-none rotate-180 hidden lg:block">"</span>
                </div>
              </div>
              
              {/* Call to Action Container */}
              <div className="w-full lg:max-w-xl max-w-[350px] md:max-w-[450px] shrink-0 flex flex-col items-center p-6 md:p-10 bg-black/40 rounded-3xl border border-[#ff0000]/15 backdrop-blur-md shadow-[inset_0_0_20px_rgba(255,0,0,0.05)] mx-auto">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#ff0000]/10 flex items-center justify-center mb-4 md:mb-6 text-[#ff0000] group-hover:scale-110 transition-transform duration-500">
                  <HeartHandshake size={28} strokeWidth={1.5} className="md:w-8 md:h-8 w-6 h-6" />
                </div>
                <h4 className={`text-[#ff0000] text-[24px] md:text-[30px] ${language === 'ur' ? 'md:text-[45px] font-["Georgia"]' : (language === 'hi' ? 'md:text-[37px] hi-font-asar' : '')} mb-2 md:mb-4 font-bold ${language === 'ur' || language === 'hi' ? '' : t.fontClassSerif} text-center tracking-wider langar-urdu-cta-title`}>{(lt as any).bePartOfMission || "Be Part of the Mission"}</h4>
                <p className={`text-gray-400 text-center text-[16px] md:text-[20px] max-w-[350px] ${language === 'ur' ? 'leading-[1.8] md:leading-[41.5714px]' : ''} ${language === 'hi' ? 'hi-font-asar' : ''} mb-6 md:mb-8 langar-urdu-cta-desc ${t.fontClassSans}`}>
                  {language === 'hi' ? (
                    <>आपका योगदान हमें ज़रूरतमंदों को<br />भोजन कराने में मदद करता है।</>
                  ) : (
                    (lt as any).contributionHelps || "Your contribution helps us feed the souls in need."
                  )}
                </p>
                
                <button 
                  onClick={() => navigate('/donate')}
                  className={`group/btn relative w-full px-4 sm:px-6 md:px-8 ${language === 'ur' ? 'h-auto min-h-[72px] py-3.5 rounded-2xl md:rounded-full' : 'h-[50px] md:h-[56px] rounded-full'} flex items-center justify-center bg-[#ff0000] text-white overflow-hidden shadow-[0_0_20px_rgba(255,0,0,0.4)] hover:shadow-[0_0_35px_rgba(255,0,0,0.6)] transition-all duration-300 hover:-translate-y-1`}
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out rounded-2xl md:rounded-full"></div>
                  <span className={`relative z-10 ${language === 'ur' ? 'tracking-normal font-["Noto_Naskh_Arabic"] text-[22px] md:text-[30px] leading-[1.35] block' : (language === 'hi' ? 'uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[12px] sm:text-[17px] md:text-[26px] hi-font-arial' : 'uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[12px] sm:text-[17px] md:text-[19px]')} font-bold ${language === 'ur' || language === 'hi' ? '' : t.fontClassSans} text-center langar-urdu-btn-text`}>
                    {language === 'ur' ? (
                      <>
                        <span className="block md:inline">حسینی لنگر</span>
                        <span className="block md:inline md:mr-2">میں تعاون کریں</span>
                      </>
                    ) : (
                      lt.cta
                    )}
                  </span>
                </button>
              </div>
              
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/98 p-4 md:p-12 cursor-pointer backdrop-blur-xl"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-8 right-8 text-white/50 hover:text-[#ff0000] transition-colors z-50 p-2"
            >
              <X className="w-10 h-10" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage}
              alt="Enlarged view"
              className="max-w-full max-h-[90vh] object-contain shadow-[0_0_50px_rgba(255,0,0,0.2)] border border-[#330000]"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
