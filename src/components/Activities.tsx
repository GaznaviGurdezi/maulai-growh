import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { HeadingBackground } from "./HeadingBackground";
import { Flower2, Wind, Utensils, Tent, HeartHandshake } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { activitiesTranslations } from "./ActivitiesTranslations";

export function Activities() {
  const { t, language } = useLanguage();
  const at = activitiesTranslations[language];
  const navigate = useNavigate();

  const services = [
    {
      title: at.s1Title,
      description: at.s1Desc,
      icon: Flower2,
    },
    {
      title: at.s2Title,
      description: at.s2Desc,
      icon: Wind,
    },
    {
      title: at.s3Title,
      description: at.s3Desc,
      icon: Utensils,
    },
    {
      title: at.s4Title,
      description: at.s4Desc,
      icon: Tent,
    },
    {
      title: at.s5Title,
      description: at.s5Desc,
      icon: HeartHandshake,
    }
  ];

  return (
    <section id="activities" className="relative py-24 lg:py-32 bg-[#101010]">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="relative block mx-auto w-full max-w-4xl text-center mb-16"
        >
          <HeadingBackground />
          <h2 className={`${t.fontClassSerif} text-[44px] md:text-5xl text-brand-gold mb-4 tracking-wide uppercase`}>{at.title}</h2>
          <p className={`text-gray-300 ${t.fontClassSans} max-w-2xl mx-auto mb-6 leading-relaxed text-[17px]`}>{at.subtitle}</p>
          <div className="flex justify-center">
            <div className="h-0.5 w-16 bg-[#991b1b]"></div>
            <div className="h-0.5 w-3 bg-brand-gold ml-2"></div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative bg-[#1a1a1a] border border-[#d4af37]/20 p-8 rounded-lg overflow-hidden hover:border-[#d4af37] transition-all duration-500 shadow-[0_4px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] flex flex-col items-center text-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out pointer-events-none"></div>
              
              <div className="w-16 h-16 rounded-full bg-[#d4af37]/10 flex items-center justify-center mb-6 text-brand-gold group-hover:scale-110 transition-transform duration-500">
                <service.icon size={32} strokeWidth={1.5} />
              </div>
              
              <h3 className={`${t.fontClassSerif} text-[19px] md:text-[21px] text-brand-gold mb-3 tracking-wide`}>
                {service.title}
              </h3>
              
              <p className={`text-gray-400 text-[13px] md:text-[14px] mb-8 leading-relaxed ${t.fontClassSans} flex-grow`}>
                {service.description}
              </p>

              <button 
                onClick={() => navigate('/contact')}
                className="mt-auto px-6 py-3 border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-colors duration-300 uppercase text-[11px] md:text-[12px] tracking-widest font-bold w-full"
              >{at.bookNow}</button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
