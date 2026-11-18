import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { 
  MapPin, Phone, Mail, Globe, Send, Instagram, 
  Youtube, Twitter, MessageCircle, Heart, Users, Map
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { contactTranslations } from './ContactUsTranslations';

export function ContactUs() {
  const { t, language } = useLanguage();
  const ct = contactTranslations[language as keyof typeof contactTranslations] || contactTranslations['en'];
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ fullName: '', email: '', mobile: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const contactCards = [
    {
      icon: <MapPin size={24} />,
      title: ct.officeAddress,
      details: ct.officeDetails,
      link: "https://www.google.com/maps/search/?api=1&query=Hotel+Khwaja+Mahal,+Langar+Khana+Street,+Ajmer,+Rajasthan+305001"
    },
    {
      icon: <Phone size={24} />,
      title: ct.phoneNumber,
      details: "+91 96808 72049",
      link: "tel:+919680872049"
    },
    {
      icon: <Mail size={24} />,
      title: ct.emailAddress,
      details: "syedgggurdezi@gmail.com",
      link: "mailto:syedgggurdezi@gmail.com"
    }
  ];

  const socialLinks = [
    { icon: <Instagram size={28} />, name: "Instagram", url: "https://www.instagram.com/maulai_growh?dmpr=aW94eHphMHdocGRm", color: "hover:text-pink-500" },
    { icon: <Youtube size={28} />, name: "YouTube", url: "https://youtube.com/@maulai_growh?si=Sy0MDT9-LlRl2g-c", color: "hover:text-red-500" },
    { icon: <Twitter size={28} />, name: "X (Twitter)", url: "#", color: "hover:text-white" },
    { icon: <MessageCircle size={28} />, name: "WhatsApp", url: "https://wa.me/919680872049", color: "hover:text-green-500" }
  ];

  return (
    <div className="relative bg-brand-black w-full overflow-hidden min-h-screen pb-20">
      {/* Hero Section */}
      <section id="contact-hero" className="relative pt-32 pb-24 px-4 lg:px-8 border-b border-brand-gold/20 overflow-hidden flex flex-col items-center">
        {/* Deep, Rich Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-brand-dark to-brand-black z-10" />
          <img 
            src="https://images.unsplash.com/photo-1590076215667-875d4cebe19e?auto=format&fit=crop&w=2000&q=80" 
            alt="Ajmer Sharif Dargah" 
            className="w-full h-full object-cover opacity-25 mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-20 mix-blend-overlay z-10" />
          {/* Enhanced gold glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-gold/15 blur-[150px] rounded-[100%] mix-blend-screen z-10 pointer-events-none" />
        </div>

        <div className="relative z-20 max-w-5xl mx-auto w-full mt-8 md:mt-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1 }}
            className="w-full relative"
          >
            <div className="bg-gradient-to-b from-[#13100b]/95 via-[#0a0907]/90 to-[#060606]/95 backdrop-blur-2xl rounded-2xl md:rounded-[2.25rem] px-6 py-12 sm:px-10 sm:py-14 md:px-16 md:py-20 flex flex-col items-center text-center relative overflow-hidden border border-brand-gold/35 shadow-[0_28px_80px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(243,229,171,0.2)]">
                {/* 1: Stardust & Radial Sanctuary Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.12)_0%,transparent_65%)] pointer-events-none z-0"></div>
                {/* 2: Top Luminous Gold Hairline */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/80 to-transparent pointer-events-none z-0"></div>
                {/* 3: Bottom Matching Gold Hairline */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/5 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent pointer-events-none z-0"></div>

                {/* Inner Architectural Frame & Corner Filigree Brackets (spans preserve div nth-of-type) */}
                <span aria-hidden="true" className="pointer-events-none absolute inset-3 md:inset-5 rounded-xl md:rounded-[1.5rem] border border-brand-gold/15 z-0" />
                <span aria-hidden="true" className="pointer-events-none absolute top-5 left-5 md:top-7 md:left-7 w-5 h-5 border-t-2 border-l-2 border-brand-gold/60 rounded-tl-sm z-0" />
                <span aria-hidden="true" className="pointer-events-none absolute top-5 right-5 md:top-7 md:right-7 w-5 h-5 border-t-2 border-r-2 border-brand-gold/60 rounded-tr-sm z-0" />
                <span aria-hidden="true" className="pointer-events-none absolute bottom-5 left-5 md:bottom-7 md:left-7 w-5 h-5 border-b-2 border-l-2 border-brand-gold/60 rounded-bl-sm z-0" />
                <span aria-hidden="true" className="pointer-events-none absolute bottom-5 right-5 md:bottom-7 md:right-7 w-5 h-5 border-b-2 border-r-2 border-brand-gold/60 rounded-br-sm z-0" />

                {/* 4: Editorial Eyebrow */}
                <div className="flex flex-col items-center justify-center mb-5 md:mb-6 relative z-10 w-full">
                  <div className="flex items-center justify-center gap-3 sm:gap-4">
                    <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-transparent to-brand-gold/70" />
                    <span className={`text-brand-gold/90 uppercase tracking-[0.25em] text-xs sm:text-sm font-semibold ${language === 'ur' ? 'font-["Noto_Naskh_Arabic"] tracking-normal text-base' : (language === 'hi' ? 'hi-font-arial tracking-normal text-sm' : t.fontClassSerif)}`}>
                      {ct.connectWithUs}
                    </span>
                    <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-l from-transparent to-brand-gold/70" />
                  </div>
                </div>

                {/* 5: Hero Title (preserved as div:nth-of-type(5) > h1) */}
                <div className="flex flex-col items-center gap-4 mb-5 md:mb-6 relative z-10">
                  <h1 className={`text-4xl md:text-[80px] leading-tight text-brand-gold filter drop-shadow-[0_10px_25px_rgba(212,175,55,0.45)] ${language === 'ur' ? 'font-["Georgia"]' : (language === 'hi' ? 'hi-font-amita' : t.fontClassSerif)}`}>
                    {ct.title}
                  </h1>
                </div>

                {/* 6: Ornamental Diamond Divider */}
                <div className="flex items-center justify-center gap-3 mb-6 md:mb-7 relative z-10">
                  <span className="w-16 sm:w-24 h-[1px] bg-gradient-to-r from-transparent to-brand-gold/60" />
                  <span className="w-2 h-2 rotate-45 border border-brand-gold bg-brand-gold/30 shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
                  <span className="w-16 sm:w-24 h-[1px] bg-gradient-to-l from-transparent to-brand-gold/60" />
                </div>

                {/* Hero Subtitle (preserved as h2:nth-of-type(1)) */}
                <h2 className={`text-gray-200 mb-8 md:mb-10 font-normal tracking-wider uppercase relative z-10 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed ${language === 'ur' ? 'font-["Georgia"] md:text-[27px] normal-case tracking-normal' : (language === 'hi' ? 'hi-font-arial md:text-[20px] normal-case tracking-normal' : (t.fontClassSerif + ' md:text-lg'))}`}>
                  {ct.subtitle}
                </h2>

                {/* 7: Quick-Access Sanctuary Contact Strip */}
                <div
                  dir={language === 'ur' ? 'rtl' : 'ltr'}
                  className={`relative z-10 w-full max-w-3xl border-t border-brand-gold/20 pt-6 md:pt-7 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-0 sm:divide-x sm:divide-brand-gold/20 ${language === 'ur' ? 'sm:divide-x-reverse' : ''}`}
                >
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Hotel+Khwaja+Mahal,+Langar+Khana+Street,+Ajmer,+Rajasthan+305001"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link cursor-pointer flex items-center justify-center gap-2.5 px-3 py-1.5 text-gray-300 hover:text-brand-gold transition-colors"
                  >
                    <MapPin size={16} className="text-brand-gold shrink-0 group-hover/link:scale-110 transition-transform" />
                    <span className={`text-xs sm:text-sm tracking-wide ${language === 'ur' ? 'font-["Noto_Naskh_Arabic"] text-sm' : (language === 'hi' ? 'hi-font-arial text-sm' : '')}`}>
                      {language === 'ur' ? 'اجمیر شریف، راجستھان' : language === 'hi' ? 'अजमेर शरीफ, राजस्थान' : 'Ajmer Sharif, Rajasthan'}
                    </span>
                  </a>

                  <a
                    href="tel:+919680872049"
                    dir="ltr"
                    className="group/link flex items-center justify-center gap-2.5 px-3 py-1.5 text-gray-300 hover:text-brand-gold transition-colors"
                  >
                    <Phone size={16} className="text-brand-gold shrink-0 group-hover/link:scale-110 transition-transform" />
                    <span className="text-xs sm:text-sm tracking-wider font-medium">+91 96808 72049</span>
                  </a>

                  <a
                    href="mailto:syedgggurdezi@gmail.com"
                    dir="ltr"
                    className="group/link flex items-center justify-center gap-2.5 px-3 py-1.5 text-gray-300 hover:text-brand-gold transition-colors"
                  >
                    <Mail size={16} className="text-brand-gold shrink-0 group-hover/link:scale-110 transition-transform" />
                    <span className="text-xs sm:text-sm tracking-wide truncate">syedgggurdezi@gmail.com</span>
                  </a>
                </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="relative py-24 px-4 lg:px-8 z-20 bg-brand-black">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-[0.03] mix-blend-screen pointer-events-none z-0"></div>
        <div className="absolute left-0 top-1/3 w-[300px] h-[600px] bg-brand-gold/5 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="absolute right-0 bottom-1/3 w-[300px] h-[600px] bg-brand-gold/5 blur-[150px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative z-10">
          
          {/* Left Column: Info & Map */}
          <div className="lg:col-span-5 space-y-10">
            {/* Contact Information */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-brand-black border border-brand-gold/20 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="flex items-center gap-4 mb-12 relative z-10">
                <div className="w-12 h-[2px] bg-brand-gold"></div>
                <h3 className={`text-brand-gold uppercase tracking-widest font-bold text-xl sm:text-2xl ${language === 'ur' ? 'font-["Georgia"] md:text-[50px]' : (language === 'hi' ? 'hi-font-amita md:text-[30px]' : (t.fontClassSerif + ' md:text-3xl'))}`}>
                  {ct.getInTouch}
                </h3>
              </div>
              
              <div className="flex flex-col gap-8 md:gap-10 relative z-10">
                {contactCards.map((card, idx) => (
                  <div key={idx} className="flex items-start gap-6 group/card">
                    <div className="w-14 h-14 contact-card-icon rounded-full bg-brand-gold/10 border border-brand-gold/30 flex-shrink-0 text-brand-gold flex items-center justify-center group-hover/card:bg-brand-gold group-hover/card:text-black transition-all duration-500 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                      {card.icon}
                    </div>
                    <div className="flex flex-col pt-1">
                      <h4 className={`text-white/60 font-semibold mb-1 uppercase tracking-widest text-xs sm:text-sm ${language === 'ur' ? 'font-["Georgia"] md:text-[25px]' : (language === 'hi' ? 'hi-font-arial md:text-[22px]' : '')}`}>{card.title}</h4>
                      {card.link ? (
                        <a
                          href={card.link}
                          dir={language === 'ur' && (idx === 0 || idx === 1) ? 'ltr' : undefined}
                          target={card.link.startsWith('http') ? '_blank' : undefined}
                          rel={card.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className={`text-brand-gold font-medium leading-relaxed hover:text-white transition-colors block text-sm sm:text-base ${language === 'ur' ? (idx === 0 || idx === 1 ? 'font-sans text-right [unicode-bidi:isolate] md:text-[22px]' : 'font-["Noto_Naskh_Arabic"] md:text-[22px]') : (language === 'hi' ? 'hi-font-arial md:text-[18px]' : '')}`}
                        >
                          {card.details}
                        </a>
                      ) : (
                        <p className={`text-brand-gold font-medium leading-relaxed text-sm sm:text-base ${language === 'ur' ? 'font-["Noto_Naskh_Arabic"] md:text-[22px]' : (language === 'hi' ? 'hi-font-arial md:text-[18px]' : '')}`}>{card.details}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Visit Us / Map */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-brand-black p-4 rounded-[2.5rem] border border-brand-gold/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:border-brand-gold/40 transition-all duration-500"
            >
              <div className="w-full h-[350px] rounded-[2rem] overflow-hidden relative">
                <div className="absolute inset-0 border border-brand-gold/10 rounded-[2rem] pointer-events-none z-10 transition-colors duration-500 group-hover:border-brand-gold/30"></div>
                <iframe 
                  src="https://maps.google.com/maps?q=Hotel%20Khwaja%20Mahal,%20Ajmer&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="transition-all duration-1000 scale-[1.02]"
                ></iframe>
                
                {/* Overlay Badge */}
                <div className="absolute top-6 left-6 bg-brand-black/80 backdrop-blur-md border border-brand-gold/30 px-6 py-3 rounded-full flex items-center gap-3 z-10 shadow-lg">
                   <Map className="text-brand-gold" size={18} />
                   <span className={`text-white tracking-widest uppercase font-bold text-xs sm:text-sm ${language === 'ur' ? 'font-["Georgia"] md:text-[20px]' : (language === 'hi' ? 'md:text-[20px]' : t.fontClassSerif)}`}>{ct.visitUs}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Form & Socials */}
          <div className="lg:col-span-7 space-y-10">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#0a0a0a] to-[#050505] p-8 md:p-12 lg:p-14 rounded-[2.5rem] border border-brand-gold/20 shadow-[0_20px_60px_rgba(0,0,0,0.6)] relative overflow-hidden"
            >
              <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-brand-gold/10 blur-[100px] pointer-events-none rounded-full" />
              
              <div className="flex flex-col gap-3 mb-12 relative z-10">
                <span className={`text-brand-gold uppercase font-bold text-xs sm:text-sm ${language === 'ur' ? 'font-["Georgia"] md:text-[25px]' : (language === 'hi' ? 'hi-font-amita md:text-[30px]' : '')}`}>{ct.getConnected}</span>
                <h3 className={`text-white uppercase tracking-wider font-extrabold text-xl sm:text-2xl ${language === 'ur' ? 'font-["Georgia"] md:text-[55px]' : (language === 'hi' ? 'hi-font-arial md:text-[20px]' : (t.fontClassSerif + ' md:text-3xl'))}`}>{ct.sendMessage}</h3>
              </div>
              
              {isSubmitted ? (
                <div className="bg-brand-gold/10 border border-brand-gold/30 rounded-3xl p-12 text-center animate-fade-in flex flex-col items-center justify-center min-h-[450px]">
                  <div className="w-24 h-24 bg-brand-gold rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                    <Send className="text-brand-black ml-2" size={40} />
                  </div>
                  <h4 className={`text-2xl md:text-3xl text-brand-gold font-bold mb-4 uppercase tracking-wider ${t.fontClassSerif}`}>{ct.thankYou}</h4>
                  <p className="text-gray-300 text-lg max-w-sm">{ct.msgReceived}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="space-y-2">
                    <label className={`text-white/50 uppercase tracking-[0.2em] ml-4 text-xs sm:text-sm ${language === 'ur' ? 'font-["Noto_Naskh_Arabic"] md:text-[25px]' : (language === 'hi' ? 'hi-font-arial md:text-[20px]' : '')}`}>{ct.formFullName}</label>
                    <input 
                      type="text" required
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      className="w-full bg-[#0f0f0f] border border-brand-gold/15 rounded-full px-6 py-5 text-sm text-white focus:outline-none focus:border-brand-gold/60 focus:bg-[#151515] transition-all shadow-[inset_0_2px_5px_rgba(0,0,0,0.5)] placeholder:text-white/20"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className={`text-white/50 uppercase tracking-[0.2em] ml-4 text-xs sm:text-sm ${language === 'ur' ? 'font-["Noto_Naskh_Arabic"] md:text-[25px]' : (language === 'hi' ? 'hi-font-arial md:text-[20px]' : '')}`}>{ct.formEmail}</label>
                      <input 
                        type="email" required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-[#0f0f0f] border border-brand-gold/15 rounded-full px-6 py-5 text-sm text-white focus:outline-none focus:border-brand-gold/60 focus:bg-[#151515] transition-all shadow-[inset_0_2px_5px_rgba(0,0,0,0.5)] placeholder:text-white/20"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={`text-white/50 uppercase tracking-[0.2em] ml-4 text-xs sm:text-sm ${language === 'ur' ? 'font-["Noto_Naskh_Arabic"] md:text-[25px]' : (language === 'hi' ? 'hi-font-arial md:text-[20px]' : '')}`}>{ct.formMobile}</label>
                      <input 
                        type="tel" required
                        value={formData.mobile}
                        onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                        className="w-full bg-[#0f0f0f] border border-brand-gold/15 rounded-full px-6 py-5 text-sm text-white focus:outline-none focus:border-brand-gold/60 focus:bg-[#151515] transition-all shadow-[inset_0_2px_5px_rgba(0,0,0,0.5)] placeholder:text-white/20"
                        placeholder="+91 00000 00000"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={`text-white/50 uppercase tracking-[0.2em] ml-4 text-xs sm:text-sm ${language === 'ur' ? 'font-["Noto_Naskh_Arabic"] md:text-[25px]' : (language === 'hi' ? 'hi-font-arial md:text-[20px]' : '')}`}>{ct.formSubject}</label>
                    <input 
                      type="text" required
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full bg-[#0f0f0f] border border-brand-gold/15 rounded-full px-6 py-5 text-sm text-white focus:outline-none focus:border-brand-gold/60 focus:bg-[#151515] transition-all shadow-[inset_0_2px_5px_rgba(0,0,0,0.5)] placeholder:text-white/20"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className={`text-white/50 uppercase tracking-[0.2em] ml-4 text-xs sm:text-sm ${language === 'ur' ? 'font-["Noto_Naskh_Arabic"] md:text-[25px]' : (language === 'hi' ? 'hi-font-arial md:text-[20px]' : '')}`}>{ct.formMessage}</label>
                    <textarea 
                      required rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-[#0f0f0f] border border-brand-gold/15 rounded-[2rem] px-6 py-5 text-sm text-white focus:outline-none focus:border-brand-gold/60 focus:bg-[#151515] transition-all shadow-[inset_0_2px_5px_rgba(0,0,0,0.5)] placeholder:text-white/20 resize-none"
                      placeholder="Write your message here..."
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full h-[65px] flex items-center justify-center bg-brand-gold text-brand-black overflow-hidden rounded-full shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all duration-300 disabled:opacity-70 hover:-translate-y-1 mt-6"
                  >
                    <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out rounded-full"></div>
                    <span className={`relative z-10 flex items-center gap-2 md:gap-3 uppercase tracking-[0.1em] md:tracking-[0.2em] font-extrabold whitespace-nowrap text-sm sm:text-base ${language === 'ur' ? 'font-["Georgia"] md:text-[31px]' : (language === 'hi' ? 'hi-font-arial md:text-[22px]' : '')}`}>
                      {isSubmitting ? ct.sendingBtn : ct.sendBtn} <Send className={`group-hover:translate-x-1 transition-transform duration-300 w-4 h-4 md:w-6 md:h-6 ${language === 'ur' ? 'md:h-[29px] md:w-[25px]' : ''}`} />
                    </span>
                  </button>
                </form>
              )}
            </motion.div>

            {/* Connect With Us */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-brand-black p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] border border-brand-gold/20 shadow-[0_10px_40px_rgba(0,0,0,0.5)] relative overflow-hidden text-center group"
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-[0.03] mix-blend-screen pointer-events-none"></div>
              
              <div className="flex items-center justify-center gap-3 md:gap-4 mb-6 md:mb-8">
                <div className="w-12 h-[2px] bg-brand-gold/30 hidden sm:block"></div>
                <h3 className={`text-white uppercase tracking-widest text-base sm:text-lg ${language === 'ur' ? 'font-["Georgia"] md:text-[30px]' : (language === 'hi' ? 'hi-font-arial md:text-[25px]' : (t.fontClassSerif + ' md:text-xl'))}`}>{ct.connectWithUs}</h3>
                <div className="w-12 h-[2px] bg-brand-gold/30 hidden sm:block"></div>
              </div>

              <div className="flex justify-center gap-3 md:gap-5 flex-wrap relative z-10">
                {socialLinks.map((social, idx) => (
                  <a 
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 md:w-16 md:h-16 rounded-[1rem] md:rounded-2xl bg-[#151515] border border-brand-gold/20 flex items-center justify-center text-brand-gold ${social.color} hover:border-brand-gold hover:-translate-y-2 hover:bg-brand-gold/5 transition-all duration-500 shadow-[0_5px_15px_rgba(0,0,0,0.5)] hover:shadow-[0_10px_25px_rgba(212,175,55,0.2)]`}
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Support CTA Sections */}
      <section className="relative py-20 px-4 lg:px-8 z-20">
        <div className="max-w-4xl mx-auto">
          
          {/* Support Our Mission */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-brand-gold/20 to-[#991b1b]/20 p-10 md:p-14 rounded-3xl border border-brand-gold/40 shadow-[0_0_50px_rgba(212,175,55,0.15)] text-center relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-[url('https://khwajanaksh.com/assets/images/fr-952x952.jpg')] opacity-10 bg-cover bg-center mix-blend-luminosity group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90" />
            
            <div className="relative z-10 flex flex-col items-center justify-center h-full">
              <h3 
                className={`text-brand-gold mb-4 md:mb-6 drop-shadow-md text-center text-2xl sm:text-3xl ${language === 'ur' ? 'font-["Arial"] md:text-[45px]' : language === 'hi' ? 'font-["Arial"] md:text-[25px]' : 'font-["Cinzel"] md:text-[36px]'}`} 
              >
                {ct.togetherDifference}
              </h3>
              <p 
                className={`text-gray-200 text-center max-w-2xl mb-6 text-sm sm:text-base ${language === 'ur' ? 'font-normal leading-relaxed md:leading-[46.5px] md:text-[20px]' : language === 'hi' ? 'font-["Arial"] md:text-[20px]' : 'italic md:text-[21px] md:leading-[1.7]'}`} 
              >
                {ct.supportQuote}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate('/donate')}
                  className={`px-6 md:px-10 py-3 md:py-4 rounded-xl md:rounded-2xl bg-brand-gold text-black text-[12px] sm:text-[13px] uppercase tracking-[0.1em] md:tracking-[0.2em] font-bold flex items-center justify-center gap-2 md:gap-3 hover:bg-white hover:-translate-y-1 shadow-[0_10px_20px_rgba(212,175,55,0.2)] hover:shadow-[0_15px_30px_rgba(255,255,255,0.3)] transition-all duration-300 ${language === 'ur' ? 'font-["Noto_Nastaliq_Urdu"] md:text-[20px]' : language === 'hi' ? 'md:text-[18px]' : 'md:text-[15px]'}`}
                >
                  {ct.supportOurMission || 'Support Our Mission'} <Heart className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
