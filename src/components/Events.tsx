import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { Calendar, MapPin } from "lucide-react";
import { HeadingBackground } from "./HeadingBackground";

import { YomeAliSection } from "./YomeAliSection";

export function Events() {
  const { t, language } = useLanguage();
  const readMore = {
    en: "Read More",
    ur: "مزید پڑھیں",
    hi: "और पढ़ें"
  }[language];

  const events = [
    { 
      type: t.ev1Type, 
      title: t.ev1Title, 
      date: t.ev1Date, 
      location: t.ev1Loc, 
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800",
      desc: t.ev1Desc
    },
    { 
      type: t.ev2Type, 
      title: t.ev2Title, 
      date: t.ev2Date, 
      location: t.ev2Loc, 
      image: "https://images.unsplash.com/photo-1568283486162-81766a6fc031?auto=format&fit=crop&q=80&w=800",
      desc: t.ev2Desc
    },
    { 
      type: t.ev3Type, 
      title: t.ev3Title, 
      date: t.ev3Date, 
      location: t.ev3Loc, 
      image: "https://images.unsplash.com/photo-1590059365516-562a1c626a57?auto=format&fit=crop&q=80&w=800",
      desc: t.ev3Desc
    }
  ];

  return (
    <section id="events" className="relative py-24 lg:py-32 bg-brand-black">
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
            {t.eventsTitle}
          </h2>
          <div className="flex justify-center">
            <div className="h-0.5 w-16 bg-[#991b1b]"></div>
            <div className="h-0.5 w-3 bg-brand-gold ml-2"></div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="bg-[#151515] rounded-lg overflow-hidden border border-brand-gold/10 hover:border-brand-gold/30 transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute top-4 left-4 border border-[#d4af37] bg-brand-black/80 backdrop-blur-sm text-brand-gold text-[11px] font-bold px-3 py-1 uppercase tracking-widest">
                  {event.type}
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className={`${t.fontClassSerif} text-[23px] md:text-[24px] text-gray-100 mb-4`}>
                  {event.title}
                </h3>
                <div className="flex flex-col gap-2 mb-6">
                  <div className="flex items-center text-gray-400 text-[13px] md:text-[14px]">
                    <Calendar size={16} className="text-[#991b1b] mr-2" />
                    <span className={t.fontClassSans}>{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-400 text-[13px] md:text-[14px]">
                    <MapPin size={16} className="text-[#991b1b] mr-2" />
                    <span className={t.fontClassSans}>{event.location}</span>
                  </div>
                </div>
                <p className={`text-gray-400 leading-relaxed text-[13px] md:text-[14px] mb-6 flex-grow ${t.fontClassSans}`}>
                  {event.desc}
                </p>
                <div className="mt-auto">
                  <button className="text-brand-gold hover:text-white transition-colors text-[13px] md:text-[14px] uppercase tracking-widest flex items-center border-[0.5px] border-brand-gold px-4 py-2 hover:bg-brand-gold w-fit">{readMore}</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <YomeAliSection />
    </section>
  );
}
