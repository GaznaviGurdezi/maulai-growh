import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { HeadingBackground } from "./HeadingBackground";

export function News() {
  const { t } = useLanguage();

  const newsItems = [
    {
      date: "Oct 15, 2026",
      category: t.news1Cat,
      title: t.news1Title,
      desc: t.news1Desc
    },
    {
      date: "Sep 28, 2026",
      category: t.news2Cat,
      title: t.news2Title,
      desc: t.news2Desc
    },
    {
      date: "Aug 10, 2026",
      category: t.news3Cat,
      title: t.news3Title,
      desc: t.news3Desc
    }
  ];

  return (
    <section id="news" className="relative py-24 lg:py-32 bg-[#0a0a0a]">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="relative block mx-auto w-full max-w-4xl text-center mb-16"
        >
          <HeadingBackground />
          <h2 className={`${t.fontClassSerif} text-[44px] md:text-5xl text-brand-gold mb-4 tracking-wide uppercase`}>
            {t.newsTitle}
          </h2>
          <div className="flex justify-center">
            <div className="h-0.5 w-16 bg-[#991b1b]"></div>
            <div className="h-0.5 w-3 bg-brand-gold ml-2"></div>
          </div>
        </motion.div>

        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
          {newsItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col md:flex-row gap-6 p-6 md:p-8 bg-[#111111] border-l-4 border-[#991b1b] hover:bg-[#1a1a1a] transition-colors group cursor-pointer"
            >
              <div className="md:w-1/4 flex flex-col justify-center border-b md:border-b-0 md:border-r border-brand-gold/10 pb-4 md:pb-0 md:pr-6">
                <span className="text-[#991b1b] text-[13px] uppercase tracking-widest font-bold mb-1">{item.category}</span>
                <span className={`text-brand-gold/70 text-[13px] ${t.fontClassSans}`}>{item.date}</span>
              </div>
              <div className="md:w-3/4">
                <h3 className={`${t.fontClassSerif} text-[20px] md:text-2xl text-gray-200 mb-3 group-hover:text-brand-gold transition-colors`}>
                  {item.title}
                </h3>
                <p className={`text-gray-400 ${t.fontClassSans} text-[14px] md:text-base leading-relaxed`}>
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
