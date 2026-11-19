import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const translations = {
  en: {
    chairman: "Chairman",
    subTitle: "Maulai Growh Foundation",
    titleStart: "Continuing an ",
    titleHighlight: "850-Year Legacy",
    titleEnd: "of Khidmat",
    p1: <><strong className="text-white font-normal">Syed Gous Gaznavi Gurdezi</strong>, Chairman of Maulai Growh Foundation, belongs to the revered lineage of Hazrat Khwaja Syed Fakhruddin Gurdezi (R.A.), the devoted Khadim-e-Khas of Hazrat Khwaja Moinuddin Hasan Chishti (A.S.) at Ajmer Sharif.</>,
    p2: "For more than 850 years, this blessed family has continued the sacred responsibility of serving the Holy Dargah with humility, devotion, and unwavering commitment. As descendants of Hazrat Khwaja Syed Fakhruddin Gurdezi (R.A.), they have faithfully preserved the timeless tradition of Khidmat established in the presence of Khwaja Garib Nawaz (A.S.).",
    p3: "Inspired by the noble teachings of Ahlul Bayt (A.S.)—compassion, justice, generosity, and service to humanity—Maulai Growh Foundation carries this spiritual heritage forward through humanitarian initiatives, education, healthcare, and community welfare, serving people with love, dignity, and sincerity.",
    learnMore: "Learn More",
    name: "Syed Gous Gaznavi Gurdezi"
  },
  ur: {
    chairman: "چیئرمین",
    subTitle: "مولائی گروہ فاؤنڈیشن",
    titleStart: "خدمت کی ",
    titleHighlight: "850 سالہ وراثت",
    titleEnd: "کا تسلسل",
    p1: <><strong className="text-white font-normal">سید غوث غزنوی گردیزی</strong>، جو مولائی گروہ فاؤنڈیشن کے چیئرمین ہیں، کا تعلق حضرت خواجہ سید فخر الدین گردیزی (رح) کے معزز خانوادے سے ہے، جو اجمیر شریف میں حضرت خواجہ معین الدین حسن چشتی (ع) کے خادمِ خاص تھے۔</>,
    p2: "850 سے زائد سالوں سے، یہ بابرکت خاندان عاجزی، عقیدت اور غیر متزلزل عزم کے ساتھ درگاہ مقدسہ کی خدمت کی مقدس ذمہ داری نبھا رہا ہے۔ حضرت خواجہ سید فخر الدین گردیزی (رح) کی اولاد ہونے کے ناطے، انہوں نے خدمت کی اس لازوال روایت کو ایمانداری سے محفوظ رکھا ہے جو خواجہ غریب نواز (ع) کی موجودگی میں قائم ہوئی تھی۔",
    p3: "اہل بیت (ع) کی اعلیٰ تعلیمات—ہمدردی، انصاف، سخاوت، اور انسانیت کی خدمت—سے متاثر ہوکر، مولائی گروہ فاؤنڈیشن اس روحانی ورثے کو انسانی ہمدردی کے اقدامات، تعلیم، صحت عامہ، اور کمیونٹی کی فلاح و بہبود کے ذریعے آگے بڑھا رہی ہے، اور محبت، وقار اور خلوص کے ساتھ لوگوں کی خدمت کر رہی ہے۔",
    learnMore: "مزید جانیں",
    name: "سید غوث غزنوی گردیزی"
  },
  hi: {
    chairman: "अध्यक्ष",
    subTitle: "मौलाई ग्रोह फाउंडेशन",
    titleStart: "खिदमत की ",
    titleHighlight: "850 साल की विरासत",
    titleEnd: "को आगे बढ़ाना",
    p1: <><strong className="text-white font-normal">सैयद गौस गज़नवी गुर्देज़ी</strong>, मौलाई ग्रोह फाउंडेशन के अध्यक्ष हैं। वह हज़रत ख्वाजा सैयद फखरुद्दीन गुर्देज़ी (र.अ.) के श्रद्धेय वंश से संबंधित हैं, जो अजमेर शरीफ में हज़रत ख्वाजा मोइनुद्दीन हसन चिश्ती (अ.स.) के समर्पित खादिम-ए-खास थे।</>,
    p2: "850 से अधिक वर्षों से, यह धन्य परिवार विनम्रता, भक्ति और अटूट प्रतिबद्धता के साथ पवित्र दरगाह की सेवा करने की पवित्र जिम्मेदारी निभा रहा है। हज़रत ख्वाजा सैयद फखरुद्दीन गुर्देज़ी (र.अ.) के वंशजों के रूप में, उन्होंने खिदमत की उस शाश्वत परंपरा को ईमानदारी से संरक्षित किया है जो ख्वाजा गरीब नवाज़ (अ.स.) की उपस्थिति में स्थापित की गई थी।",
    p3: "अहलुल बैत (अ.स.) की महान शिक्षाओं—करुणा, न्याय, उदारता और मानवता की सेवा—से प्रेरित होकर, मौलाई ग्रोह फाउंडेशन इस आध्यात्मिक विरासत को मानवीय पहलों, शिक्षा, स्वास्थ्य देखभाल और सामुदायिक कल्याण के माध्यम से आगे बढ़ा रहा है, और प्रेम, गरिमा और ईमानदारी के साथ लोगों की सेवा कर रहा है।",
    learnMore: "और जानें",
    name: "सैयद गौस गज़नवी गुर्देज़ी"
  }
};

export function AboutChairman() {
  const { t, language } = useLanguage();
  const content = translations[language as keyof typeof translations];


  return (
    <section className="relative py-24 lg:py-32 bg-brand-black overflow-hidden border-t border-brand-gold/10">
      {/* Background Ambient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] mix-blend-screen opacity-[0.04]" />
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#d4af37]/5 blur-[120px] rounded-full mix-blend-screen -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#991b1b]/10 blur-[120px] rounded-full mix-blend-screen translate-x-1/3 translate-y-1/3"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Side: Elegant Image Composition */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="w-full lg:w-[45%] flex justify-center"
          >
            <div className="relative w-full max-w-[400px]">
              {/* Decorative Outer Frames (Arch) */}
              <div className="absolute -inset-4 border border-[#d4af37]/30 rounded-t-full rounded-b-2xl z-0"></div>
              <div className="absolute -inset-6 border border-[#d4af37]/10 rounded-t-full rounded-b-2xl z-0"></div>
              
              {/* Image Mask (Arch) */}
              <div className="relative z-10 w-full aspect-[3/4.2] rounded-t-full rounded-b-xl overflow-hidden border-2 border-[#d4af37]/60 shadow-[0_0_50px_rgba(212,175,55,0.15)] group bg-[#0a0a0a]">
                <img src="/chairman.png" alt="Syed Gous Gaznavi Gurdezi" className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/95 via-brand-black/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100"></div>
                
                {/* Floating Name in Image */}
                <div className="absolute bottom-0 left-0 w-full p-8 text-center translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
                    <h4 style={language === 'ur' ? { fontSize: "29px" } : {}} className={` ${t.fontClassSerif} text-[#d4af37] ${language === 'en' ? 'text-base sm:text-lg md:text-2xl' : 'text-xl md:text-2xl'} mb-1.5 drop-shadow-md`}>{content.name}</h4>
                    <p style={language === 'ur' ? { fontSize: "20px" } : {}} className={`text-white/80 ${language === 'en' ? 'text-[8px] sm:text-[9px] md:text-xs' : 'text-[10px] md:text-xs'} tracking-[0.25em] uppercase font-light ${t.fontClassSans}`}>{content.chairman}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Content */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full lg:w-[55%] flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            <div className="inline-flex items-center gap-4 mb-5">
              <div className="h-[1px] w-8 md:w-12 bg-[#d4af37]"></div>
              <span style={language === 'ur' ? { fontSize: "15px" } : {}} className={`text-[#991b1b] text-[10px] sm:text-[11px] md:text-[12px] tracking-[0.3em] uppercase font-semibold ${t.fontClassSans}`}>
                {content.subTitle}
              </span>
              <div className="h-[1px] w-8 md:w-12 bg-[#d4af37] hidden lg:block"></div>
            </div>

            <h2 style={language === 'ur' ? { fontFamily: "Georgia" } : {}} className={` ${t.fontClassSerif} ${language === 'en' ? 'text-[22px] sm:text-[28px] md:text-[36px]' : 'text-[32px] sm:text-[40px] md:text-[42px]'} lg:text-[44px] text-white mb-6 leading-[1.2]`}>
              {content.titleStart} <span className="text-[#d4af37] italic pr-1">{content.titleHighlight}</span><br />
              {content.titleEnd}
            </h2>
            
            <div className="flex justify-center lg:justify-start mb-8">
              <div className="h-1 w-16 bg-[#991b1b]"></div>
              <div className="h-1 w-3 bg-[#d4af37] ml-1.5"></div>
            </div>

            <div className={language === 'ur' ? `space-y-6 text-gray-300 font-light text-[15px] md:text-[19px] md:leading-[37.4px] text-justify ${t.fontClassSans}` : `space-y-6 text-gray-300 font-light ${language === 'en' ? 'text-[12px] sm:text-[13px] md:text-[16px]' : 'text-[15px] md:text-[16px] lg:text-[16px]'} leading-[1.8] sm:leading-[1.9] text-justify ${t.fontClassSans}`}>
              <p>{content.p1}</p>
              <p>{content.p2}</p>
              <p>{content.p3}</p>
            </div>

            <div className="mt-10">
              <Link to="/about" style={language === "ur" ? { fontSize: "17px" } : {}} className={`inline-block px-8 py-3.5 rounded-none border border-[#d4af37] text-[#d4af37] ${t.fontClassSerif} tracking-[0.2em] hover:bg-[#d4af37] hover:text-black transition-all duration-500 uppercase text-[12px] md:text-[13px] shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]`}
              >{content.learnMore}</Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
