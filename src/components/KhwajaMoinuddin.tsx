import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { khwajaTranslations } from "../context/KhwajaTranslations";
import { HeadingBackground } from "./HeadingBackground";
import { HeroHeadingBackground } from "./HeroHeadingBackground";
import { ArabicGlitterBackground } from "./ArabicGlitterBackground";
import { formatDarood } from "../utils/formatText";
import { MessageCircle, Star, Quote } from "lucide-react";

export function KhwajaMoinuddin() {
  const { t, language } = useLanguage();
  const kt = khwajaTranslations[language] || khwajaTranslations["en"];

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const bioTexts = kt.bioTexts || khwajaTranslations["en"].bioTexts || [];

  const sayings = kt.sayings || khwajaTranslations["en"].sayings || [];

  const paternalLineage = kt.paternalLineageNames || [];

  const maternalLineage = kt.maternalLineageNames || [];

  return (
    <section id="chishty-section" className="relative py-24 lg:py-32 bg-[#111] overflow-hidden border-t border-[#d4af37]/10">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-islamic-pattern mix-blend-overlay opacity-5" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="relative block mx-auto w-full max-w-4xl text-center mb-20"
        >
          <HeadingBackground />
          <div className="relative inline-flex flex-col items-center w-full max-w-xl md:max-w-3xl">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] rounded-2xl p-1.5 md:p-2 bg-gradient-to-br from-brand-gold via-[#991b1b] to-brand-gold shadow-[0_0_60px_rgba(212,175,55,0.7)] z-20 mb-8 overflow-hidden">
              <div className="relative w-full h-full rounded-[10px] md:rounded-[12px] border-[4px] border-black overflow-hidden group">
                <img
                  src="https://swadharma.in/wp-content/uploads/2024/02/Moinuddin-Chishti.jpg"
                  alt="Khawaja Moinuddin Chishty (AS)"
                  className="absolute inset-0 w-full h-full object-cover object-[center_25%]"
                />

                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 z-10"></div>

                {/* Name inside the frame at the bottom */}
                <h2
                  className={`${t.fontClassSerif} absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 flex flex-col items-center justify-end text-center z-20`}
                >
                  <span className={`font-bold drop-shadow-[0_4px_10px_rgba(0,0,0,1)] text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#fff1a0] to-[#d4af37] text-[19px] sm:text-[23px] md:text-[31px] leading-snug md:leading-tight tracking-wider text-center`}>
                    {language === 'en' ? (
                      <>
                        <span className="block md:inline">Khawaja Moinuddin</span>
                        <span className="hidden md:inline"> </span>
                        <span className="block md:inline">Hasan Chishty</span>
                      </>
                    ) : language === 'ur' ? (
                      <>
                        <span className="block md:inline">خواجہ معین الدین</span>
                        <span className="hidden md:inline"> </span>
                        <span className="block md:inline">حسن چشتی</span>
                      </>
                    ) : (
                      <>
                        <span className="block sm:inline md:inline whitespace-nowrap">ख्वाजा मोइनुद्दीन</span>
                        <span className="hidden sm:inline md:inline"> </span>
                        <span className="block sm:inline md:inline whitespace-nowrap">हसन चिश्ती</span>
                      </>
                    )}
                  </span>
                  <span className={`text-[12px] sm:text-[14px] md:text-lg text-brand-gold mt-1 md:mt-2 tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,1)]`}>
                    (AS)
                  </span>
                </h2>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="h-0.5 w-16 bg-[#991b1b]"></div>
            <div className="h-0.5 w-3 bg-brand-gold ml-2"></div>
          </div>
          <p
            className={`mt-6 text-brand-gold/80 uppercase tracking-widest ${language === 'en' ? 'text-[14px]' : 'text-[12px]'} md:text-[13px] ${t.fontClassSans}`}
          >
            {kt.subtitle}
          </p>
        </motion.div>

        {/* Detailed Biography & Teachings Unified Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="bg-gradient-to-br from-[#121212] to-black border border-brand-gold/50 outline-none md:outline md:outline-[1.5px] md:outline-brand-gold/40 md:outline-offset-[12px] p-4 sm:p-6 md:p-10 lg:p-12 relative mb-16 md:mb-24 rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.15)] mt-4 max-w-6xl mx-auto"
        >
          <ArabicGlitterBackground />
          <div className="absolute top-0 left-0 w-12 h-12 border-t-[3px] border-l-[3px] border-brand-gold/60 rounded-tl-3xl z-10 drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]"></div>
          <div className="absolute top-0 right-0 w-12 h-12 border-t-[3px] border-r-[3px] border-brand-gold/60 rounded-tr-3xl z-10 drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]"></div>
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-[3px] border-l-[3px] border-brand-gold/60 rounded-bl-3xl z-10 drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]"></div>
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-[3px] border-r-[3px] border-brand-gold/60 rounded-br-3xl z-10 drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]"></div>

          <div className="relative z-10 space-y-12">
            {/* Section 1: A Life of Devotion */}
            <div>
              <h3
                className={`${t.fontClassSerif} ${language === 'en' ? 'text-[23px] text-center' : 'text-[20px] text-left'} md:text-[26px] lg:text-3xl md:text-left text-brand-gold mb-6`}
              >
                {formatDarood(bioTexts[0])}
              </h3>
              <div
                className={`text-gray-300 leading-loose ${language === 'en' ? 'text-[16px]' : 'text-[14px]'} md:text-lg text-justify space-y-6 ${t.fontClassSans}`}
              >
                <p>
                  {formatDarood(bioTexts[1])}
                </p>
                <p>
                  {formatDarood(bioTexts[2])}
                </p>
                <p>
                  {formatDarood(bioTexts[3])}
                </p>
              </div>
            </div>

            {/* Section 2: {bioTexts[4]} */}
            <div>
              <h3
                className={`${t.fontClassSerif} ${language === 'en' ? 'text-[23px] text-center' : 'text-[23px] text-left'} md:text-[26px] lg:text-3xl md:text-left text-brand-gold mb-6`}
              >
                {formatDarood(bioTexts[4])}
              </h3>
              <p
                className={`text-gray-300 leading-loose ${language === 'en' ? 'text-[16px]' : 'text-[14px]'} md:text-lg text-justify mb-6 ${t.fontClassSans}`}
              >
                {formatDarood(bioTexts[5])}
              </p>
              <ul
                className={`text-gray-300 space-y-4 ${language === 'en' ? 'text-[16px]' : 'text-[14px]'} md:text-lg ${t.fontClassSans}`}
              >
                <li
                  className="flex items-start p-2 rounded-xl -ml-2"
                >
                  <Star
                    className="text-brand-gold w-5 h-5 mr-4 mt-1 shrink-0"
                  />
                  {formatDarood(bioTexts[6])}
                </li>
                <li
                  className="flex items-start p-2 rounded-xl -ml-2"
                >
                  <Star
                    className="text-brand-gold w-5 h-5 mr-4 mt-1 shrink-0"
                  />
                  {formatDarood(bioTexts[7])}
                </li>
                <li
                  className="flex items-start p-2 rounded-xl -ml-2"
                >
                  <Star
                    className="text-brand-gold w-5 h-5 mr-4 mt-1 shrink-0"
                  />
                  {formatDarood(bioTexts[8])}
                </li>
              </ul>
            </div>

            {/* Section 3: Love for Ahlul Bayt */}
            <div>
              <h3
                className={`${t.fontClassSerif} ${language === 'en' ? 'text-[23px] text-center' : 'text-[22px] text-left'} md:text-[26px] lg:text-3xl md:text-left text-brand-gold mb-6`}
              >
                {formatDarood(bioTexts[9])}
              </h3>
              <div
                className={`text-gray-300 leading-loose ${language === 'en' ? 'text-[16px]' : 'text-[14px]'} md:text-lg text-justify space-y-6 ${t.fontClassSans}`}
              >
                <p>
                  {formatDarood(bioTexts[10])}
                </p>
                <p>
                  {formatDarood(bioTexts[11])}
                </p>
              </div>
            </div>
          </div>
        </motion.div>



        {/* Family Lineage and Poetry */}
        <div className="flex flex-col gap-12 mb-16">
          {/* Lineage */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full bg-gradient-to-b from-[#121212] to-[#050505] border border-brand-gold/30 p-3 sm:p-8 md:p-12 rounded-2xl md:rounded-3xl relative overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.1)]"
          >
            <ArabicGlitterBackground />
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="absolute top-0 left-0 w-12 h-12 border-t-[3px] border-l-[3px] border-brand-gold/40 rounded-tl-3xl z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-12 h-12 border-t-[3px] border-r-[3px] border-brand-gold/40 rounded-tr-3xl z-10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-[3px] border-l-[3px] border-brand-gold/40 rounded-bl-3xl z-10 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-[3px] border-r-[3px] border-brand-gold/40 rounded-br-3xl z-10 pointer-events-none"></div>

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8 sm:mb-12 relative">
                <h3
                  className={`${t.fontClassSerif} ${language === 'en' ? 'text-[25px]' : 'text-[24px]'} sm:text-[30px] md:text-[32px] lg:text-4xl text-center text-brand-gold m-0`}
                >
                  {kt.shajraTitle}
                </h3>
              </div>

              {/* Shajra Tree Layout */}
              <div dir="ltr" className="flex flex-col items-center relative z-10 w-full font-serif overflow-hidden">
                {/* Root */}
                <div className="flex flex-col items-center">
                  <div
                    className={`text-center px-3 sm:px-6 py-2 sm:py-3 border border-brand-gold/30 bg-brand-gold/5 rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.1)] mb-1`}
                  >
                    <div
                      dir={language === "ur" ? "rtl" : "ltr"}
                      className={`text-brand-gold font-bold ${language === 'en' || language === 'ur' ? 'text-[16.5px]' : 'text-[13px]'} sm:text-[17px] md:text-[19px] lg:text-[23px] leading-tight ${t.fontClassSans}`}
                    >
                      {language === "ur"
                        ? "سیدنا رسول اللہ"
                        : language === "hi"
                          ? "सैय्यदना रसूलुल्लाह"
                          : "Sayyidana Rasulullah"}
                    </div>
                    <div
                      dir={language === "ur" ? "rtl" : "ltr"}
                      className={`text-brand-gold font-bold ${language === 'en' || language === 'ur' ? 'text-[16.5px]' : 'text-[13px]'} sm:text-[17px] md:text-[19px] lg:text-[23px] leading-tight mt-1 sm:mt-2 ${t.fontClassSans}`}
                    >
                      {language === "ur"
                        ? formatDarood("حضرت محمد مصطفیٰ ﷺ")
                        : language === "hi"
                          ? formatDarood("हजरत मुहम्मद मुस्तफ़ा ﷺ")
                          : formatDarood("Hazrat Muhammad Mustafa ﷺ")}
                    </div>
                  </div>
                  <div className="h-4 sm:h-6 w-[2px] bg-brand-gold/50 my-0"></div>
                </div>

                {/* Fatimah & Ali */}
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`px-3 sm:px-6 py-1.5 sm:py-3 border border-brand-gold/30 bg-brand-gold/5 rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.1)] mb-1`}
                  >
                    <div
                      dir={language === "ur" ? "rtl" : "ltr"}
                      className={`text-brand-gold font-bold ${language === 'en' || language === 'ur' ? 'text-[15px]' : 'text-[11px]'} sm:text-[15px] md:text-[17px] lg:text-[21px] leading-tight ${t.fontClassSans}`}
                    >
                      {language === "ur"
                        ? "سیدہ فاطمۃ الزہرا (س)"
                        : language === "hi"
                          ? "सैय्यदा फातिमा अल-ज़हरा (स.अ.)"
                          : "Sayyidah Fatimah Al-Zahra (SA)"}
                      <span className="mx-1.5 sm:mx-2 text-brand-gold/70">&amp;</span>
                      {language === "ur"
                        ? "سیدنا مولا علی (ع)"
                        : language === "hi"
                          ? "सैय्यदना मौला अली (अ.स.)"
                          : "Sayyidana Maula Ali (AS)"}
                    </div>
                  </div>
                  <div className="h-4 sm:h-6 w-[2px] bg-brand-gold/50 my-0"></div>
                </div>

                {/* Split */}
                <div className="flex flex-col items-center w-full max-w-4xl relative">
                  <div className="w-full max-w-full overflow-x-auto no-scrollbar">
                  <div className="w-full flex flex-col items-center ml-0">
                  {/* Horizontal line connecting the two columns - exact 50% width centers it over the two columns */}
                  <div className="w-[50%] h-[2px] bg-brand-gold/50"></div>

                  {/* Vertical drops at 25% and 75% */}
                  <div className="flex justify-between w-[50%] relative pl-0 pr-0 ml-0">
                    <div className="w-[2px] h-4 sm:h-6 bg-brand-gold/50"></div>
                    <div className="w-[2px] h-4 sm:h-6 bg-brand-gold/50"></div>
                  </div>

                  {/* Two Columns Grid */}
                  <div className="grid grid-cols-2 w-full relative">
                    {/* Left Column (Maternal) */}
                    <div className="flex flex-col items-center h-full">
                      {/* Lineage Map */}
                      {maternalLineage.map((name, idx) => {
                        const isImam =
                          (name?.toLowerCase?.()?.includes("imam") ?? false) ||
                          (name?.includes("امام") ?? false) ||
                          (name?.includes("इमाम") ?? false);
                        const fontSizeClass = isImam
                          ? language === "en" || language === "ur"
                            ? "text-[14.5px] sm:text-[13px] md:text-[17px] lg:text-[19px]"
                            : "text-[9px] sm:text-[13px] md:text-[17px] lg:text-[19px]"
                          : language === "en" || language === "ur"
                            ? "text-[13.5px] sm:text-[12px] md:text-[16px] lg:text-[19px]"
                            : "text-[8.5px] sm:text-[12px] md:text-[16px] lg:text-[19px]";
                        return (
                          <div
                            key={idx}
                            className="flex flex-col items-center w-full flex-grow"
                          >
                            <div
                              dir={language === "ur" ? "rtl" : "ltr"}
                              className={`text-center px-1.5 sm:px-3 py-1 sm:py-2 w-[95%] break-words leading-snug ${isImam ? `text-brand-gold font-bold ${fontSizeClass} border border-brand-gold/30 bg-brand-gold/5 rounded-md sm:rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.1)]` : `text-brand-gold/90 ${fontSizeClass} font-medium bg-transparent`} z-10 ${t.fontClassSans}`}
                            >
                              {name}
                            </div>
                            <div
                              className={`flex-grow w-[1.5px] sm:w-[2px] my-0.5 sm:my-1 min-h-[0.75rem] sm:min-h-[1.25rem] md:min-h-[1.5rem] ${idx < maternalLineage.length - 1 ? "bg-brand-gold/30" : "bg-brand-gold/50"}`}
                            ></div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Right Column (Paternal) */}
                    <div className="flex flex-col items-center h-full">
                      {/* Lineage Map */}
                      {paternalLineage.slice(0, 12).map((name, idx) => {
                        const isImam =
                          (name?.toLowerCase?.()?.includes("imam") ?? false) ||
                          (name?.includes("امام") ?? false) ||
                          (name?.includes("इमाम") ?? false);
                        const isHusayn = idx === 0;
                        const fontSizeClass = isHusayn
                          ? language === "en" || language === "ur"
                            ? "text-[15.5px] sm:text-[14px] md:text-[18px] lg:text-[21px]"
                            : "text-[10px] sm:text-[14px] md:text-[18px] lg:text-[21px]"
                          : isImam
                            ? language === "en" || language === "ur"
                              ? "text-[14.5px] sm:text-[13px] md:text-[17px] lg:text-[19px]"
                              : "text-[9px] sm:text-[13px] md:text-[17px] lg:text-[19px]"
                            : language === "en" || language === "ur"
                              ? "text-[13.5px] sm:text-[12px] md:text-[16px] lg:text-[19px]"
                              : "text-[8.5px] sm:text-[12px] md:text-[16px] lg:text-[19px]";
                        return (
                          <div
                            key={idx}
                            className="flex flex-col items-center w-full flex-grow"
                          >
                            <div
                              dir={language === "ur" ? "rtl" : "ltr"}
                              className={`text-center px-1.5 sm:px-3 py-1 sm:py-2 w-[95%] break-words leading-snug ${isHusayn ? `text-red-700 font-bold ${fontSizeClass} border border-red-700/30 bg-red-700/5 rounded-md sm:rounded-lg shadow-[0_0_15px_rgba(185,28,28,0.15)]` : isImam ? `text-brand-gold font-bold ${fontSizeClass} border border-brand-gold/30 bg-brand-gold/5 rounded-md sm:rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.1)]` : `text-brand-gold/90 ${fontSizeClass} font-medium bg-transparent`} z-10 ${t.fontClassSans}`}
                            >
                              {name}
                            </div>
                            <div
                              className={`flex-grow w-[1.5px] sm:w-[2px] my-0.5 sm:my-1 min-h-[0.75rem] sm:min-h-[1.25rem] md:min-h-[1.5rem] ${idx < 11 ? "bg-brand-gold/30" : "bg-brand-gold/50"}`}
                            ></div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Marriage Connection - exactly under the grid! */}
                  <div className="w-[50%] h-[2px] bg-brand-gold/50 relative flex items-center justify-center mt-[-2px] md:mt-0"></div>

                  <div className="w-[2px] h-4 sm:h-8 bg-brand-gold/50"></div>

                  </div>
                  </div>

                  {/* Khwaja Moinuddin (Paternal index 12) */}
                  <div className="flex flex-col items-center w-full text-center mb-4 sm:mb-8">
                    <div
                      dir={language === "ur" ? "rtl" : "ltr"}
                      className={`px-3 sm:px-6 py-2.5 sm:py-4 text-brand-gold font-bold ${language === 'en' || language === 'ur' || language === 'hi' ? 'text-[16px]' : 'text-[11px]'} sm:text-[15px] md:text-[21px] leading-snug border border-brand-gold/50 rounded-xl bg-gradient-to-b from-[#1a1a1a] to-black shadow-[0_0_20px_rgba(212,175,55,0.15)] mt-1 z-10 relative overflow-hidden ${t.fontClassSans}`}
                    >
                      <div className="absolute inset-0 bg-brand-gold/5 mix-blend-overlay"></div>
                      {language === "ur"
                        ? "حضرت خواجہ معین الدین حسن چشتی الحسینی سنجری (ع)"
                        : language === "hi"
                          ? "हजरत ख्वाजा मुईनुद्दीन हसन चिश्ती अल-हुसैनी संजरी (अ.स.)"
                          : "Hazrat Khawaja Mu'inuddeen Hasan Chishty Al-Husaini Sanjari (AS)"}
                      <br />
                      <span className={`${language === 'en' || language === 'hi' ? 'text-[16px]' : 'text-[13px]'} sm:text-[16px] md:text-[20px] opacity-90 mt-1 sm:mt-2 block font-normal tracking-widest text-[#d4af37]/80`}>
                        {language === "ur"
                          ? "(غریب نواز)"
                          : language === "hi"
                            ? "(गरीब नवाज़)"
                            : "(Gharib Nawaz)"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Legacy Note */}
              <div className="mt-16 pt-8 border-t border-brand-gold/10 text-[15px]">
                <h4
                  className={`${t.fontClassSerif} text-[30px] md:text-[27px] text-center text-brand-gold mb-6`}
                >
                  {kt.legacyTitle}
                </h4>
                <p
                  className={`text-gray-300 leading-loose text-justify md:text-center max-w-4xl mx-auto text-[16px] md:text-[20px] ${t.fontClassSans}`}
                >
                  {formatDarood(kt.legacyDesc)}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Poetry & Legacy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-col gap-8 w-full"
          >
            <div className="bg-gradient-to-br from-[#121212] to-black border border-brand-gold/20 p-4 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl h-full flex flex-col justify-center relative overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.05)] group hover:border-brand-gold/40 transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-3xl group-hover:bg-brand-gold/10 transition-all duration-700"></div>

              <div className="flex items-center gap-4 mb-8 relative z-10">
                <h3
                  className={`${t.fontClassSerif} text-[27px] md:text-[30px] lg:text-[32px] text-brand-gold`}
                >
                  {kt.poetryTitle}
                </h3>
                <div className="h-[1px] flex-grow bg-gradient-to-r from-brand-gold/30 to-transparent"></div>
              </div>

              <div className="space-y-8 relative z-10">
                {/* Persian */}
                <div className="text-center space-y-4">
                  <p
                    className="text-brand-gold text-[21px] md:text-[23px] lg:text-3xl leading-relaxed font-bold dir-rtl drop-shadow-[0_2px_4px_rgba(0,0,0,1)]"
                    style={{ fontFamily: "Amiri, Arial, sans-serif" }}
                  >
                    شاه است حسین، پادشاه است حسین
                    <br />
                    دین است حسین، دین‌پناه است حسین
                    <br />
                    <span className="text-red-700">
                      سر داد، نداد دست در دست یزید
                    </span>
                    <br />
                    حقا که بنای لا اله است حسین
                  </p>
                </div>
                <div className="flex items-center justify-center gap-4 opacity-60">
                  <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-brand-gold"></div>
                  <Star className="w-4 h-4 text-brand-gold fill-brand-gold/20" />
                  <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-brand-gold"></div>
                </div>

                {/* English Translation */}
                <div className="text-center">
                  <h4 className="text-brand-gold/40 text-[11px] sm:text-sm uppercase tracking-[0.2em] mb-4 font-semibold">
                    {kt.translationTitle}
                  </h4>
                  <p
                    className={`text-gray-200 text-[16px] md:text-[18px] text-center leading-loose italic font-light ${t.fontClassSerif} drop-shadow-md`}
                  >
                    {kt.poetryTrans1}
                    <br />
                    {kt.poetryTrans2}
                    <br />
                    <span className="text-red-700">{kt.poetryTrans3}</span>
                    <br />
                    {kt.poetryTrans4}
                  </p>
                  <p
                    className={`text-[11px] sm:text-sm text-brand-gold/70 not-italic uppercase tracking-widest mt-8 font-medium ${t.fontClassSans}`}
                  >
                    {kt.poetryAuthor}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-brand-gold/5 border border-brand-gold/20 p-4 sm:p-8 rounded-2xl md:rounded-3xl text-center">
              <h3
                className={`${t.fontClassSerif} text-[23px] md:text-[24px] text-brand-gold mb-4`}
              >
                {kt.enduringLegacyTitle}
              </h3>
              <p
                className="text-gray-300 text-[17px] leading-[30px] m-0 p-0 text-justify md:text-center"
                style={{ fontFamily: "Times New Roman, serif" }}
              >
                {formatDarood(kt.enduringLegacyDesc)}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
