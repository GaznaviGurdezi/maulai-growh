import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { X, ZoomIn } from "lucide-react";


const translations = {
  en: {
    foundation: "Maulai Growh Foundation",
    subTitle: "Service to Humanity",
    titleStart: "The Spirit of",
    titleHighlight: "Khidmat",
    intro: "For generations, the spirit of Khidmat (selfless service) has remained at the heart of our family's sacred responsibility at Dargah Hazrat Khwaja Moinuddin Hasan Chishti (A.S.), Ajmer Sharif. Inspired by the timeless teachings of Ahlul Bayt (A.S.) and the noble legacy of Khwaja Garib Nawaz (A.S.), we continue this tradition through humanitarian initiatives that serve thousands with dignity, compassion, and devotion.",
    
    f1TitleStart: "The Blessings of",
    f1TitleHighlight: "Hussaini Langar",
    f1p1: "Every year, during the sacred days of 8th, 9th, and 10th Muharram, the Hussaini Langar welcomed and served more than 10,000 men and women at the blessed Dargah of Hazrat Khwaja Moinuddin Hasan Chishti (A.S.), Ajmer Sharif.",
    f1p2: "With seating arrangements for nearly 3,000 devotees at one time, the Langar became one of the largest community meal gatherings of its kind. Prepared with devotion by over 50 dedicated volunteers, the Langar featured traditional Nahari, slow-cooked in 30 large Degs (cauldrons) and served with freshly baked Tandoori Rotis made on-site throughout the event.",
    f1p3: "Every meal represented generosity, hospitality, and the sacred values of serving humanity without distinction.",
    
    f2TitleStart: "The Historic",
    f2TitleHighlight: "Sacred Degs",
    f2p1: "The historic Bari Deg (Shahi Deg) and Chhoti Deg are among the most revered symbols of generosity at the Holy Dargah.",
    f2p2: "The Bari Deg (Shahi Deg), measuring approximately 37 feet in diameter, is regarded as one of the largest cooking cauldrons in the world and has the capacity to prepare nearly 4,800 kilograms of Saffroned Sweet Rice in a single offering. The Chhoti Deg, measuring approximately 22 feet in diameter, can prepare around 2,400 kilograms of the same sacred Sweet Rice.",
    f2p3: "Devotees whose prayers and wishes are fulfilled often offer a Deg as an expression of gratitude to Khwaja Garib Nawaz (A.S.). The blessed offering is prepared using premium-quality rice, sugar, pure ghee, saffron, and dry fruits, before being distributed among thousands of pilgrims as Tabarruk.",
    
    cta: "Explore Our Mission"
  },
  ur: {
    foundation: "مولائی گروہ فاؤنڈیشن",
    subTitle: "انسانیت کی خدمت",
    titleStart: "جذبہ",
    titleHighlight: "خدمت",
    intro: "نسل در نسل، خدمت (بے لوث خدمت) کا جذبہ درگاہ حضرت خواجہ معین الدین حسن چشتی (ع)، اجمیر شریف میں ہمارے خاندان کی مقدس ذمہ داری کے مرکز میں رہا ہے۔ اہل بیت (ع) کی لازوال تعلیمات اور خواجہ غریب نواز (ع) کی عظیم وراثت سے متاثر ہو کر، ہم اس روایت کو ایسے فلاحی اقدامات کے ذریعے جاری رکھے ہوئے ہیں جو وقار، ہمدردی اور عقیدت کے ساتھ ہزاروں کی خدمت کرتے ہیں۔",
    
    f1TitleStart: "برکات",
    f1TitleHighlight: "حسینی لنگر",
    f1p1: "ہر سال 8، 9 اور 10 محرم کے مقدس ایام میں، حسینی لنگر نے درگاہ حضرت خواجہ معین الدین حسن چشتی (ع)، اجمیر شریف میں 10,000 سے زائد مرد و خواتین کا استقبال کیا اور ان کی خدمت کی۔",
    f1p2: "ایک ہی وقت میں تقریباً 3,000 زائرین کے بیٹھنے کے انتظامات کے ساتھ، یہ لنگر اپنی نوعیت کے سب سے بڑے سماجی کھانوں میں سے ایک بن گیا۔ 50 سے زائد رضاکاروں کی عقیدت سے تیار کردہ، اس لنگر میں روایتی نہاری شامل تھی، جسے 30 بڑی دیگوں میں ہلکی آنچ پر پکایا جاتا تھا، اور اسے تازہ تندوری روٹیوں کے ساتھ پیش کیا جاتا تھا جو پوری تقریب کے دوران وہیں تیار کی جاتی تھیں۔",
    f1p3: "ہر کھانا سخاوت، مہمان نوازی، اور بغیر کسی امتیاز کے انسانیت کی خدمت کی مقدس اقدار کی نمائندگی کرتا تھا۔",
    
    f2TitleStart: "تاریخی",
    f2TitleHighlight: "مقدس دیگیں",
    f2p1: "تاریخی بڑی دیگ (شاہی دیگ) اور چھوٹی دیگ مقدس درگاہ پر سخاوت کی سب سے قابل احترام علامتوں میں سے ہیں۔",
    f2p2: "بڑی دیگ (شاہی دیگ)، جس کا قطر تقریباً 37 فٹ ہے، دنیا کی سب سے بڑی دیگوں میں شمار ہوتی ہے اور اس میں ایک ہی وقت میں تقریباً 4,800 کلوگرام زعفرانی میٹھے چاول تیار کرنے کی گنجائش ہے۔ چھوٹی دیگ، جس کا قطر تقریباً 22 فٹ ہے، اس میں تقریباً 2,400 کلوگرام وہی مقدس میٹھے چاول تیار کیے جا سکتے ہیں۔",
    f2p3: "وہ زائرین جن کی دعائیں اور منتیں پوری ہوتی ہیں، وہ اکثر خواجہ غریب نواز (ع) کا شکر ادا کرنے کے لیے دیگ پیش کرتے ہیں۔ یہ بابرکت پیشکش اعلیٰ معیار کے چاول، چینی، خالص دیسی گھی، زعفران، اور خشک میوہ جات کے استعمال سے تیار کی جاتی ہے، اور پھر اسے ہزاروں زائرین میں تبرک کے طور پر تقسیم کیا جاتا ہے۔",
    
    cta: "ہمارا مشن دریافت کریں"
  },
  hi: {
    foundation: "मौलाई गिरोह फाउंडेशन",
    subTitle: "मानवता की सेवा",
    titleStart: "खिदमत का",
    titleHighlight: "जज़्बा",
    intro: "पीढ़ियों से, खिदमत (निस्वार्थ सेवा) की भावना अजमेर शरीफ में दरगाह हज़रत ख्वाजा मोइनुद्दीन हसन चिश्ती (अ.स.) में हमारे परिवार की पवित्र जिम्मेदारी के केंद्र में रही है। अहलुल बैत (अ.स.) की शाश्वत शिक्षाओं और ख्वाजा गरीब नवाज़ (अ.स.) की महान विरासत से प्रेरित होकर, हम इस परंपरा को मानवीय पहलों के माध्यम से जारी रखे हुए हैं जो गरिमा, करुणा और भक्ति के साथ हजारों लोगों की सेवा करते हैं।",
    
    f1TitleStart: "आशीर्वाद",
    f1TitleHighlight: "हुसैनी लंगर",
    f1p1: "हर साल 8, 9 और 10 मुहर्रम के पवित्र दिनों के दौरान, हुसैनी लंगर ने अजमेर शरीफ में दरगाह हज़रत ख्वाजा मोइनुद्दीन हसन चिश्ती (अ.स.) में 10,000 से अधिक पुरुषों और महिलाओं का स्वागत किया और उनकी सेवा की।",
    f1p2: "एक बार में लगभग 3,000 भक्तों के बैठने की व्यवस्था के साथ, यह लंगर अपने प्रकार के सबसे बड़े सामुदायिक भोजन सम्मेलनों में से एक बन गया। 50 से अधिक समर्पित स्वयंसेवकों द्वारा भक्ति के साथ तैयार, इस लंगर में पारंपरिक नहारी शामिल थी, जिसे 30 बड़ी देगों में धीमी आंच पर पकाया जाता था, और पूरे आयोजन के दौरान साइट पर ही बनाई जाने वाली ताज़ा तंदूरी रोटियों के साथ परोसा जाता था।",
    f1p3: "हर भोजन उदारता, आतिथ्य और बिना किसी भेदभाव के मानवता की सेवा करने के पवित्र मूल्यों का प्रतिनिधित्व करता था।",
    
    f2TitleStart: "ऐतिहासिक",
    f2TitleHighlight: "पवित्र देग",
    f2p1: "ऐतिहासिक बड़ी देग (शाही देग) और छोटी देग पवित्र दरगाह पर उदारता के सबसे प्रतिष्ठित प्रतीकों में से हैं।",
    f2p2: "बड़ी देग (शाही देग), जिसका व्यास लगभग 37 फीट है, को दुनिया की सबसे बड़ी खाना पकाने की देगों में से एक माना जाता है और इसमें एक ही बार में लगभग 4,800 किलोग्राम केसरिया मीठे चावल तैयार करने की क्षमता है। छोटी देग, जिसका व्यास लगभग 22 फीट है, उसमें लगभग 2,400 किलोग्राम वही पवित्र मीठे चावल तैयार किए जा सकते हैं।",
    f2p3: "जिन भक्तों की प्रार्थनाएं और मन्नतें पूरी होती हैं, वे अक्सर ख्वाजा गरीब नवाज़ (अ.स.) के प्रति आभार व्यक्त करने के लिए देग चढ़ाते हैं। यह पवित्र प्रसाद उच्च गुणवत्ता वाले चावल, चीनी, शुद्ध घी, केसर और सूखे मेवों का उपयोग करके तैयार किया जाता है, जिसके बाद इसे हजारों तीर्थयात्रियों में तबर्रुक के रूप में वितरित किया जाता है।",
    
    cta: "हमारा मिशन खोजें"
  }
};

export function SpiritOfKhidmat() {
  const { t, language } = useLanguage();
  const content = translations[language as keyof typeof translations];

  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const langarImages = [
    { src: "https://www.chishtiyasufifoundation.com/assets/img/team/langar1.jpg", alt: "Hussaini Langar", title: "Hussaini Langar" },
    { src: "/langar-fatimiyyah.png", alt: "Hussaini Langar Distribution", title: "Community Service" },
  ];

  const degImages = [
    { src: "https://www.chishtiyasufifoundation.com/assets/img/deg/bigdeg.jpg", alt: "Bari Deg (Shahi Deg)", title: "Bari Deg (Shahi Deg)" },
    { src: "https://www.chishtiyasufifoundation.com/assets/img/deg/chotideg.jpg", alt: "Chhoti Deg", title: "Chhoti Deg" },
  ];

  const ImageCard = ({ img, className = "" }: { img: any, className?: string }) => (
    <div 
      className={`relative group overflow-hidden cursor-pointer bg-[#111] border border-[#d4af37]/20 shadow-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] transition-all duration-500 ${className}`}
      onClick={() => setLightboxImage(img.src)}
    >
        <img 
          src={img.src} 
          alt={img.alt} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-500"></div>
        
        {/* Subtle Gold Corner Accents on Hover */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
            <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-[#d4af37]/60 flex items-center justify-center text-[#d4af37]">
                <ZoomIn className="w-5 h-5" />
            </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full p-5 translate-y-2 group-hover:translate-y-0 opacity-80 group-hover:opacity-100 transition-all duration-500">
              <span className="text-[#d4af37] text-[10px] md:text-xs tracking-[0.2em] uppercase font-semibold block mb-1">
                {img.title}
              </span>
        </div>
    </div>
  );

  return (
    <section className="relative py-24 lg:py-32 bg-brand-black overflow-hidden border-t border-brand-gold/10">
      {/* Background Ambient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] mix-blend-screen opacity-[0.05]" />
        <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-[#d4af37]/5 blur-[150px] rounded-full mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-[#991b1b]/5 blur-[150px] rounded-full mix-blend-screen pointer-events-none"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="relative flex flex-col items-center text-center max-w-4xl mx-auto mb-24 lg:mb-32 z-10"
        >
          <div className="inline-flex items-center gap-4 mb-6">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#d4af37]"></span>
              <div className="h-[1px] w-8 bg-[#d4af37]/50 hidden sm:block"></div>
              <span style={language === "ur" ? { fontSize: "17px" } : {}} className="text-[#991b1b] text-[10px] sm:text-[11px] tracking-[0.4em] uppercase font-semibold">{content.foundation}</span>
              <div className="h-[1px] w-8 bg-[#d4af37]/50 hidden sm:block"></div>
              <span className="w-1.5 h-1.5 rotate-45 bg-[#d4af37]"></span>
          </div>
          
          <h2 className={` ${t.fontClassSerif} ${language === 'en' ? 'text-[24px] sm:text-[30px] md:text-5xl' : 'text-[40px] md:text-5xl'} lg:text-[64px] text-white leading-tight mb-8 ${language === 'ur' ? 'md:text-6xl lg:text-[75px]' : ''} ${language === 'hi' ? 'md:text-6xl lg:text-[70px]' : ''}`}>
            {content.titleStart} <span className="text-[#d4af37] italic">{content.titleHighlight}</span>
          </h2>
          
          <div className="relative p-6 md:p-10 lg:p-12 bg-[#111]/80 backdrop-blur-md border border-[#d4af37]/20 shadow-[0_0_40px_rgba(212,175,55,0.05)] rounded-2xl">
              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#d4af37]/40 rounded-tl-xl"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#d4af37]/40 rounded-tr-xl"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#d4af37]/40 rounded-bl-xl"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#d4af37]/40 rounded-br-xl"></div>
              
              <p className={`text-gray-300 font-light ${language === 'en' ? 'text-[12px] sm:text-[13px] md:text-[16px]' : 'text-[16px] lg:text-[18px]'} leading-[1.8] sm:leading-[2] text-justify md:text-center ${t.fontClassSans} ${language === 'ur' ? 'md:text-[24px] md:leading-[1.9]' : ''} ${language === 'hi' ? 'md:text-[22px] md:leading-[1.9]' : ''}`}>
                {content.intro}
              </p>
          </div>
        </motion.div>

        {/* Feature 1: Hussaini Langar */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center mb-24 lg:mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="w-full lg:w-7/12 order-2 lg:order-1 flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            <div className="w-12 h-12 border border-[#d4af37]/30 rounded-full flex items-center justify-center mb-6 bg-[#d4af37]/5 text-[#d4af37]">
                <span className="text-xl font-serif italic">01</span>
            </div>
            <h3 className={` ${t.fontClassSerif} ${language === 'en' ? 'text-[18px] sm:text-[22px] md:text-[28px]' : 'text-[28px] md:text-[34px]'} lg:text-[36px] text-white mb-6 leading-snug ${language === 'ur' ? 'lg:text-[45px] leading-relaxed' : ''} ${language === 'hi' ? 'lg:text-[40px] leading-relaxed' : ''}`}>
              {content.f1TitleStart} <br className="hidden lg:block"/>
              <span className="text-[#d4af37]">{content.f1TitleHighlight}</span>
            </h3>
            <div className="w-12 h-[1px] bg-[#991b1b] mb-6"></div>
            
            <div className={`space-y-6 text-gray-300 font-light ${language === 'en' ? 'text-[12px] sm:text-[13px] md:text-[16px]' : 'text-[16px] md:text-[17px] lg:text-[18px]'} leading-[1.8] sm:leading-[1.9] text-justify ${t.fontClassSans} ${language === 'ur' ? 'md:text-[24px] md:leading-[1.9]' : ''} ${language === 'hi' ? 'md:text-[22px] md:leading-[1.9]' : ''}`}>
                <p>
                {content.f1p1}
                </p>
                <p>
                {content.f1p2}
                </p>
                <p>
                {content.f1p3}
                </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full lg:w-4/12 order-1 lg:order-2"
          >
             <div className="flex flex-col gap-6 justify-center">
                <ImageCard img={langarImages[0]} className="w-full aspect-[16/9] md:aspect-[4/3] lg:aspect-[16/9] rounded-2xl" />
                <ImageCard img={langarImages[1]} className="w-full aspect-[16/9] md:aspect-[4/3] lg:aspect-[16/9] rounded-2xl" />
             </div>
          </motion.div>
        </div>


        {/* Feature 2: Sacred Degs */}
        <div className="flex flex-col lg:flex-row-reverse gap-12 lg:gap-20 items-center mb-16">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="w-full lg:w-7/12 flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            <div className="w-12 h-12 border border-[#d4af37]/30 rounded-full flex items-center justify-center mb-6 bg-[#d4af37]/5 text-[#d4af37]">
                <span className="text-xl font-serif italic">02</span>
            </div>
            <h3 className={` ${t.fontClassSerif} ${language === 'en' ? 'text-[18px] sm:text-[22px] md:text-[28px]' : 'text-[28px] md:text-[34px]'} lg:text-[36px] text-white mb-6 leading-snug ${language === 'ur' ? 'lg:text-[45px] leading-relaxed' : ''} ${language === 'hi' ? 'lg:text-[40px] leading-relaxed' : ''}`}>
              {content.f2TitleStart} <br className="hidden lg:block"/>
              <span className="text-[#d4af37]">{content.f2TitleHighlight}</span>
            </h3>
            <div className="w-12 h-[1px] bg-[#991b1b] mb-6"></div>
            
            <div className={`space-y-6 text-gray-300 font-light ${language === 'en' ? 'text-[12px] sm:text-[13px] md:text-[16px]' : 'text-[16px] md:text-[17px]'} lg:text-[18px] leading-[1.8] sm:leading-[1.9] text-justify ${t.fontClassSans} ${language === 'ur' ? 'md:text-[24px] md:leading-[1.9]' : ''} ${language === 'hi' ? 'md:text-[22px] md:leading-[1.9]' : ''}`}>
                <p>
                {content.f2p1}
                </p>
                <p>
                {content.f2p2}
                </p>
                <p>
                {content.f2p3}
                </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full lg:w-4/12"
          >
             <div className="flex flex-col gap-6 justify-center">
                <ImageCard img={degImages[0]} className="w-full aspect-[16/9] md:aspect-[4/3] lg:aspect-[16/9] rounded-2xl" />
                <ImageCard img={degImages[1]} className="w-full aspect-[16/9] md:aspect-[4/3] lg:aspect-[16/9] rounded-2xl" />
             </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-20 pt-16 border-t border-[#d4af37]/10 text-center"
        >
            <Link 
                to="/langar" 
                className={`inline-block px-10 py-4 bg-transparent border border-[#d4af37] text-[#d4af37] ${t.fontClassSerif} tracking-[0.2em] hover:bg-[#d4af37] hover:text-black transition-all duration-500 uppercase text-[13px] md:text-[14px] shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]`}
            >
                {content.cta}
            </Link>
        </motion.div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8"
            onClick={() => setLightboxImage(null)}
          >
            <button 
              className="absolute top-6 right-6 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors z-[101] border border-white/10"
              onClick={(e) => { e.stopPropagation(); setLightboxImage(null); }}
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              src={lightboxImage} 
              alt="Lightbox" 
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl border border-white/10" 
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
