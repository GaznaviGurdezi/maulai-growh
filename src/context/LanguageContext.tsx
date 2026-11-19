import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type Language = 'en' | 'ur' | 'hi';

export interface Translations {
  heroHeading: string;
  heroSubheading: string;
  heroWelcome: string;
  heroAuthor: string;
  btnAbout: string;
  btnGallery: string;
  btnContact: string;
  btnDonate: string;
  
  navHome: string;
  navAbout: string;
  navChairman: string;
  navMission: string;
  navActivities: string;
  navEvents: string;
  navGallery: string;
  navContact: string;
  navMedia: string;
  navNews: string;
  navPrograms: string;
  navDonate: string;

  aboutTitle: string;
  aboutContent: string;
  
  galleryTitle1: string;
  galleryDesc1: string;
  galleryTitle2: string;
  
  missionTitle: string;
  mission1Title: string;
  mission1Desc: string;
  mission2Title: string;
  mission2Desc: string;
  mission3Title: string;
  mission3Desc: string;
  mission4Title: string;
  mission4Desc: string;
  mission5Title: string;
  mission5Desc: string;
  mission6Title: string;
  mission6Desc: string;

  activitiesTitle: string;
  act1: string;
  act2: string;
  act3: string;
  act4: string;
  act5: string;
  act6: string;
  act7: string;
  act8: string;

  chairmanHeading: string;
  chairmanSubtitle: string;
  chairmanMsg1: string;
  chairmanMsg2: string;
  chairmanContactbtn: string;

  eventsTitle: string;
  newsTitle: string;

  ev1Type: string;
  ev1Title: string;
  ev1Date: string;
  ev1Loc: string;
  ev1Desc: string;

  ev2Type: string;
  ev2Title: string;
  ev2Date: string;
  ev2Loc: string;
  ev2Desc: string;

  ev3Type: string;
  ev3Title: string;
  ev3Date: string;
  ev3Loc: string;
  ev3Desc: string;

  news1Cat: string;
  news1Title: string;
  news1Desc: string;

  news2Cat: string;
  news2Title: string;
  news2Desc: string;

  news3Cat: string;
  news3Title: string;
  news3Desc: string;

  donateTitle: string;
  donateSubtitle: string;
  donateAccHolderTitle: string;
  donateAccHolderName: string;
  donateBankTitle: string;
  donateBankName: string;
  donateAccTypeTitle: string;
  donateAccType: string;
  donateAccNumberTitle: string;
  donateIfscTitle: string;
  donateMessage: string;
  
  c1: string;
  c2: string;
  c3: string;
  c4: string;
  m1: string;
  m2: string;
  m3: string;
  photo: string;
  video: string;

  footerDesc: string;
  contactTitle: string;
  hqTitle: string;
  hqAddress: string;
  phoneTitle: string;
  emailTitle: string;
  visitorsTitle: string;
  chairmanTitle: string;
  chairmanName: string;
  
  fontClassSans: string;
  fontClassSerif: string;
  dir: 'ltr' | 'rtl';
}

const translations: Record<Language, Translations> = {
  en: {
    heroHeading: "Maulai Growh Foundation",
    heroSubheading: "Ajmer Sharif",
    heroWelcome: "\"Attend to your faith by giving in charity\"",
    heroAuthor: "— Imam Ali (AS)",
    btnAbout: "About Us",
    btnGallery: "Gallery",
    btnContact: "Contact Us",
    btnDonate: "Donate Now",
    navHome: "Home",
    navAbout: "About Us",
    navChairman: "Chairman",
    navMission: "Our Mission",
    navActivities: "Services",
    navEvents: "Events",
    navGallery: "Gallery",
    navMedia: "Media",
    navNews: "News",
    navContact: "Contact Us",
    navPrograms: "Programs",
    navDonate: "Donate",
    aboutTitle: "About Maulai Growh Foundation",
    aboutContent: "Maulai Growh Foundation is a charitable and community-driven organization inspired by the teachings of Islam, the love of Ahlul Bayt (عليهم السلام), and the message of peace, service, and humanity taught by Khwaja Moinuddin Chishti (A.S). We are dedicated to supporting communities through welfare, education, humanitarian aid, and spiritual development while promoting compassion, unity, and social responsibility.\n\n\"Love for All, Service to Humanity.\" ❤️🤲🏻",
    galleryTitle1: "Ahlul Bayt (AS) Gallery",
    galleryDesc1: "Exploring the timeless beauty, heritage, and teachings inspired by the sacred lineage.",
    galleryTitle2: "Media Gallery",
    
    missionTitle: "Our Mission",
    mission1Title: "Service to Humanity",
    mission1Desc: "Providing unconditional support and humanitarian aid to those in need, regardless of their background.",
    mission2Title: "Community Welfare",
    mission2Desc: "Fostering social harmony and uplifting marginalized communities through dedicated welfare programs.",
    mission3Title: "Religious Programs",
    mission3Desc: "Organizing spiritual gatherings, majalis, and educational sessions to enrich the soul.",
    mission4Title: "Promotion of Islamic Values",
    mission4Desc: "Preserving and propagating the profound teachings of the Holy Prophet (SAWW) and Ahlul Bayt (AS).",
    mission5Title: "Social Harmony",
    mission5Desc: "Building bridges of understanding and love among diverse groups within the society.",
    mission6Title: "Support for Needy Families",
    mission6Desc: "Distributing essential resources, langar, and financial aid to underprivileged families.",

    activitiesTitle: "Activities & Projects",
    act1: "Hussaini Langar",
    act2: "Chadar & Phool Khidmat",
    act3: "Nazr-o-Niyaz Arrangements",
    act4: "Religious Gatherings",
    act5: "Community Welfare",
    act6: "Medical Assistance",
    act7: "Educational Support",
    act8: "Social Service Activities",

    chairmanHeading: "Chairman's Message",
    chairmanSubtitle: "Chairman & Gaddi Nasheen",
    chairmanMsg1: "Assalamu Alaikum,\nMaulai Growh Foundation is dedicated to serving humanity with sincerity, compassion, and faith. Inspired by the teachings of Islam, the love of Ahlul Bayt (عليهم السلام), and the message of Khwaja Garib Nawaz (A.S.), we strive to spread hope, unity, and kindness in our communities.",
    chairmanMsg2: "We invite you to join us in this noble mission and help make a positive difference in the lives of others.",
    chairmanContactbtn: "Contact Chairman",

    eventsTitle: "Upcoming Events",
    newsTitle: "Latest Updates",
    
    ev1Type: "Upcoming Event",
    ev1Title: "Annual Urs Mubarak",
    ev1Date: "15th Rajab",
    ev1Loc: "Ajmer Sharif Dargah",
    ev1Desc: "Join us for the grand spiritual gatherings marking the annual Urs with special prayers and langar.",

    ev2Type: "Recent Event",
    ev2Title: "Majlis-e-Aza",
    ev2Date: "Muharram 1445",
    ev2Loc: "Markazi Imambargah",
    ev2Desc: "Commemorating the sacrifices of Karbala with heartfelt elegies and community meals.",

    ev3Type: "Special Program",
    ev3Title: "Jashn-e-Milad un Nabi",
    ev3Date: "12th Rabi ul Awal",
    ev3Loc: "Khwaja Mahal",
    ev3Desc: "Celebrating the birth of the Holy Prophet (SAWW) with beautiful recitations and lights.",

    news1Cat: "Announcement",
    news1Title: "New Welfare Initiative Launched for Winter",
    news1Desc: "Maulai Growh Foundation has initiated a massive blanket and food distribution drive across Ajmer... Read more",

    news2Cat: "Activity Report",
    news2Title: "Monthly Educational Support Distribution",
    news2Desc: "Scholarships and school supplies were provided to 50 deserving students this month... Read more",

    news3Cat: "Community Update",
    news3Title: "Successful Blood Donation Camp",
    news3Desc: "Over 200 units of blood were collected during our annual donation camp near the Dargah... Read more",

    donateTitle: "Support Maulai Growh Foundation",
    donateSubtitle: "Your contribution helps us serve humanity, preserve Islamic values, support religious programs, educational activities, community welfare, and spiritual initiatives.",
    donateAccHolderTitle: "Account Holder Name",
    donateAccHolderName: "SYED GHOUS GHAZNAVI GURDEZI",
    donateBankTitle: "Bank Name",
    donateBankName: "ICICI BANK",
    donateAccTypeTitle: "Account Type",
    donateAccType: "Savings Account",
    donateAccNumberTitle: "Account Number",
    donateIfscTitle: "IFSC Code",
    donateMessage: "May Allah reward every donor abundantly",
    c1: "Islamic Calligraphy",
    c2: "Spiritual Gatherings",
    c3: "Sacred Architecture",
    c4: "Historical Artwork",
    m1: "Event Highlights",
    m2: "Community Activities",
    m3: "Guidance Sessions",
    photo: "Photo",
    video: "Video",
    footerDesc: "A spiritual, educational, cultural, and humanitarian Islamic organization inspired by the teachings of Prophet Muhammad (SAWW) and Ahlul Bayt (AS).",
    contactTitle: "Contact Us",
    hqTitle: "Headquarters",
    hqAddress: "Khwaja Mahal,\nKhadim Mohalla,\nLangar Khana Gali,\nNear Dargah Sharif,\nAjmer, Rajasthan, India",
    phoneTitle: "Phone",
    visitorsTitle: "Visitors:",
    emailTitle: "Email",
    chairmanTitle: "Chairman & Gaddi Nasheen",
    chairmanName: "Shah Sufi Syed Gous Gaznavi Gurdezi",
    fontClassSans: "font-sans",
    fontClassSerif: "font-serif",
    dir: "ltr",
  },
  ur: {
    heroHeading: "مولائی گروہ فاؤنڈیشن",
    heroSubheading: "اجمیر شریف",
    heroWelcome: "”سخاوت کر کے اپنے ایمان کی حفاظت کرو“",
    heroAuthor: "— امام علی (ع)",
    btnAbout: "ہمارے بارے میں",
    btnGallery: "گیلری",
    btnContact: "رابطہ کریں",
    btnDonate: "ابھی عطیہ کریں",
    navHome: "مرکزی صفحہ",
    navAbout: "ہمارے بارے میں",
    navChairman: "چیئرمین",
    navMission: "ہمارا مشن",
    navActivities: "خدمات",
    navEvents: "تقریبات",
    navGallery: "گیلری",
    navMedia: "میڈیا",
    navNews: "خبریں",
    navContact: "رابطہ کریں",
    navPrograms: "پروگرام",
    navDonate: "عطیہ",
    aboutTitle: "مولائی گروہ فاؤنڈیشن کے بارے میں",
    aboutContent: "مولائی گروہ فاؤنڈیشن ایک فلاحی اور سماجی تنظیم ہے جو اسلام کی تعلیمات، اہل بیت (علیہم السلام) کی محبت اور خواجہ معین الدین چشتی (ع) کے امن، خدمت اور انسانیت کے پیغام سے متاثر ہے۔ ہم فلاح و بہبود، تعلیم، انسانی امداد اور روحانی ترقی کے ذریعے کمیونٹیز کی مدد کرنے کے لیے وقف ہیں، جبکہ ہمدردی، اتحاد اور سماجی ذمہ داری کو فروغ دیتے ہیں۔\n\n\"سب کے لیے محبت، انسانیت کی خدمت۔\" ❤️🤲🏻",
    galleryTitle1: "اہل بیت (ع) گیلری",
    galleryDesc1: "مقدس نسب سے متاثر لازوال خوبصورتی، ورثہ، اور تعلیمات کی تلاش۔",
    galleryTitle2: "میڈیا گیلری",
    
    missionTitle: "ہمارا مشن",
    mission1Title: "انسانیت کی خدمت",
    mission1Desc: "ضرورت مندوں کو پس منظر سے بالاتر ہو کر غیر مشروط مدد اور انسانی امداد فراہم کرنا۔",
    mission2Title: "سماجی فلاح",
    mission2Desc: "وقف فلاحی پروگراموں کے ذریعے سماجی ہم آہنگی کو فروغ دینا اور پسماندہ طبقات کی ترقی کرنا۔",
    mission3Title: "مذہبی پروگرام",
    mission3Desc: "روحانی محافل، مجالس اور تعلیمی سیشنز کا انعقاد تاکہ روح کو جلا بخشی جا سکے۔",
    mission4Title: "اسلامی اقدار کا فروغ",
    mission4Desc: "نبی اکرم (ص) اور اہل بیت (ع) کی گہری تعلیمات کا تحفظ اور ترویج۔",
    mission5Title: "سماجی ہم آہنگی",
    mission5Desc: "معاشرے کے مختلف طبقات کے درمیان محبت اور مفاہمت کے پل تعمیر کرنا۔",
    mission6Title: "ضرورت مند خاندانوں کی مدد",
    mission6Desc: "مستحق خاندانوں میں ضروری اشیاء، لنگر اور مالی امداد تقسیم کرنا۔",

    activitiesTitle: "سرگرمیاں اور منصوبے",
    act1: "حسینی لنگر",
    act2: "چادر اور پھول کی خدمت",
    act3: "نذر و نیاز کا اہتمام",
    act4: "مذہبی اجتماعات",
    act5: "سماجی فلاح و بہبود",
    act6: "طبی امداد",
    act7: "تعلیمی تعاون",
    act8: "سماجی خدمات",

    chairmanHeading: "چیئرمین کا پیغام",
    chairmanSubtitle: "چیئرمین اور گدی نشین",
    chairmanMsg1: "مولائی گروہ فاؤنڈیشن، اجمیر شریف مرکز میں خوش آمدید۔ نبی اکرم (ص) اور اہل بیت (ع) کی مقدس تعلیمات پر عمل کرتے ہوئے انسانیت کی خدمت ہمارا دینی فریضہ اور روحانی مشن ہے۔ ہماری بنیاد محبت، ہمدردی اور کمیونٹی کی بے لوث خدمت کے اصولوں پر رکھی گئی ہے۔",
    chairmanMsg2: "ہم آپ کو اپنے مشن میں شامل ہونے کی دعوت دیتے ہیں تاکہ ہم آہنگی پھیلائی جا سکے، ضرورت مندوں کی مدد کی جا سکے، اور ان لازوال اسلامی اقدار کو برقرار رکھا جا سکے جو ہمارے دلوں کو روشن کرتی ہیں۔ اللہ کی رحمتیں آپ پر نازل ہوں۔",
    chairmanContactbtn: "چیئرمین سے رابطہ کریں",

    eventsTitle: "آئندہ تقریبات",
    newsTitle: "تازہ ترین خبریں",
    
    ev1Type: "آئندہ تقریب",
    ev1Title: "سالانہ عرس مبارک",
    ev1Date: "15 رجب",
    ev1Loc: "اجمیر شریف درگاہ",
    ev1Desc: "سالانہ عرس کے موقع پر خصوصی دعاؤں اور لنگر کے ساتھ عظیم الشان روحانی محافل میں شرکت کریں۔",

    ev2Type: "حالیہ تقریب",
    ev2Title: "مجلس عزا",
    ev2Date: "محرم 1445",
    ev2Loc: "مرکزی امام بارگاہ",
    ev2Desc: "کربلا کی قربانیوں کی یاد میں دلی مرثیوں اور اجتماعی طعام کا اہتمام۔",

    ev3Type: "خصوصی پروگرام",
    ev3Title: "جشن میلاد النبی",
    ev3Date: "12 ربیع الاول",
    ev3Loc: "خواجہ محل",
    ev3Desc: "خوبصورت تلاوت اور روشنیوں کے ساتھ نبی اکرم (ص) کی ولادت کا جشن۔",

    news1Cat: "اعلان",
    news1Title: "سردیوں کے لیے نیا فلاحی اقدام شروع",
    news1Desc: "مولائی گروہ فاؤنڈیشن نے پورے اجمیر میں کمبل اور خوراک تقسیم کرنے کی ایک بڑی مہم شروع کی ہے... مزید پڑھیں",

    news2Cat: "سرگرمی کی رپورٹ",
    news2Title: "ماہانہ تعلیمی امداد کی تقسیم",
    news2Desc: "اس ماہ 50 مستحق طلباء کو وظائف اور اسکول کا سامان فراہم کیا گیا... مزید پڑھیں",

    news3Cat: "کمیونٹی اپ ڈیٹ",
    news3Title: "کامیاب بلڈ ڈونیشن کیمپ",
    news3Desc: "درگاہ کے قریب ہمارے سالانہ عطیہ کیمپ کے دوران خون کی 200 سے زائد بوتلیں جمع کی گئیں... مزید پڑھیں",

    donateTitle: "مولائی گروہ فاؤنڈیشن کی معاونت کریں",
    donateSubtitle: "آپ کا تعاون ہمیں انسانیت کی خدمت، اسلامی اقدار کے تحفظ، مذہبی پروگراموں، تعلیمی سرگرمیوں، فلاحی کاموں اور روحانی اقدامات کو جاری رکھنے میں مدد دیتا ہے۔",
    donateAccHolderTitle: "اکاؤنٹ ہولڈر کا نام",
    donateAccHolderName: "SYED GHOUS GHAZNAVI GURDEZI",
    donateBankTitle: "بینک کا نام",
    donateBankName: "ICICI BANK",
    donateAccTypeTitle: "اکاؤنٹ کی قسم",
    donateAccType: "Savings Account",
    donateAccNumberTitle: "اکاؤنٹ نمبر",
    donateIfscTitle: "IFSC کوڈ",
    donateMessage: "اللہ ہر عطیہ دینے والے کو اجرِ عظیم عطا فرمائے",
    c1: "اسلامی خطاطی",
    c2: "روحانی محافل",
    c3: "مقدس فن تعمیر",
    c4: "تاریخی فن پارے",
    m1: "تقریبات کی جھلکیاں",
    m2: "سماجی سرگرمیاں",
    m3: "رہنمائی کے سیشنز",
    photo: "تصویر",
    video: "ویڈیو",
    footerDesc: "ایک روحانی، تعلیمی، ثقافتی، اور فلاحی اسلامی تنظیم جو نبی اکرم (ص) اور اہل بیت (ع) کی تعلیمات سے متاثر ہے۔",
    contactTitle: "رابطہ کریں",
    hqTitle: "مرکزی دفتر",
    hqAddress: "خواجہ محل،\nخادم محلہ،\nلنگر خانہ گلی،\nدرگاہ شریف کے قریب،\nاجمیر، راجستھان، انڈیا",
    phoneTitle: "فون",
    visitorsTitle: "زائرین:",
    emailTitle: "ای میل",
    chairmanTitle: "چیئرمین اور گدی نشین",
    chairmanName: "شاہ صوفی سید غوث غزنوی گردیزی",
    fontClassSans: "font-urdu",
    fontClassSerif: "font-urdu",
    dir: "rtl",
  },
  hi: {
    heroHeading: "मौलाई ग्रोह फाउंडेशन",
    heroSubheading: "अजमेर शरीफ",
    heroWelcome: "\"सखावत कर के अपने ईमान की हिफाज़त करो\"",
    heroAuthor: "— इमाम अली (अ.स.)",
    btnAbout: "हमारे बारे में",
    btnGallery: "गैलरी",
    btnContact: "संपर्क करें",
    btnDonate: "अभी दान करें",
    navHome: "होम",
    navAbout: "हमारे बारे में",
    navChairman: "अध्यक्ष",
    navMission: "हमारा मिशन",
    navActivities: "सेवाएँ",
    navEvents: "कार्यक्रम",
    navGallery: "गैलरी",
    navMedia: "मीडिया",
    navNews: "समाचार",
    navContact: "संपर्क करें",
    navPrograms: "कार्यक्रम",
    navDonate: "दान करें",
    aboutTitle: "मौलाई ग्रोह फाउंडेशन के बारे में",
    aboutContent: "मौलाई ग्रोह फाउंडेशन एक धर्मार्थ और समुदाय-संचालित संगठन है जो इस्लाम की शिक्षाओं, अहलुल बैत (अलैहिमस्सलाम) के प्रेम और ख्वाजा मोइनुद्दीन चिश्ती (अ.स.) द्वारा सिखाए गए शांति, सेवा और मानवता के संदेश से प्रेरित है। हम करुणा, एकता और सामाजिक जिम्मेदारी को बढ़ावा देते हुए कल्याण, शिक्षा, मानवीय सहायता और आध्यात्मिक विकास के माध्यम से समुदायों का समर्थन करने के लिए समर्पित हैं।\n\n\"सभी से प्रेम, मानवता की सेवा।\" ❤️🤲🏻",
    galleryTitle1: "अहलुल बैत (अ.स.) गैलरी",
    galleryDesc1: "पवित्र वंश से प्रेरित शाश्वत सुंदरता, विरासत और शिक्षाओं की खोज।",
    galleryTitle2: "मीडिया गैलरी",
    
    missionTitle: "हमारा मिशन",
    mission1Title: "मानवता की सेवा",
    mission1Desc: "जरूरतमंदों को बिना किसी भेदभाव के बिना शर्त समर्थन और मानवीय सहायता प्रदान करना।",
    mission2Title: "सामुदायिक कल्याण",
    mission2Desc: "समर्पित कल्याणकारी कार्यक्रमों के माध्यम से सामाजिक सद्भाव को बढ़ावा देना और उपेक्षित समुदायों का उत्थान करना।",
    mission3Title: "धार्मिक कार्यक्रम",
    mission3Desc: "आत्मा को समृद्ध करने के लिए आध्यात्मिक सभाओं, मजलिसों और शैक्षिक सत्रों का आयोजन करना।",
    mission4Title: "इस्लामी मूल्यों को बढ़ावा देना",
    mission4Desc: "पवित्र पैगंबर (सल्ल.) और अहलुल बैत (अ.स.) की गहरी शिक्षाओं का संरक्षण और प्रचार करना।",
    mission5Title: "सामाजिक सद्भाव",
    mission5Desc: "समाज के विभिन्न समूहों के बीच समझ और प्रेम के पुल का निर्माण करना।",
    mission6Title: "जरूरतमंद परिवारों के लिए सहायता",
    mission6Desc: "वंचित परिवारों को आवश्यक संसाधन, लंगर और वित्तीय सहायता वितरित करना।",

    activitiesTitle: "गतिविधियाँ और परियोजनाएँ",
    act1: "हुसैनी लंगर",
    act2: "चादर और फूल की खिदमत",
    act3: "नज़्र-ओ-नियाज़ की व्यवस्था",
    act4: "धार्मिक सभाएँ",
    act5: "सामुदायिक कल्याण",
    act6: "चिकित्सा सहायता",
    act7: "शैक्षिक सहायता",
    act8: "सामाजिक सेवा गतिविधियाँ",

    chairmanHeading: "अध्यक्ष का संदेश",
    chairmanSubtitle: "अध्यक्ष और गद्दीनशीन",
    chairmanMsg1: "मौलाई ग्रोह फाउंडेशन, अजमेर शरीफ मरकज़ में आपका स्वागत है। पैगंबर मुहम्मद (सल्ल.) और अहलुल बैत (अ.स.) की पवित्र शिक्षाओं का पालन करते हुए मानवता की सेवा करना हमारा पवित्र कर्तव्य और आध्यात्मिक आह्वान है। हमारी नींव प्रेम, करुणा और समुदाय की निस्वार्थ सेवा के सिद्धांतों पर बनी है।",
    chairmanMsg2: "हम आपको अपने मिशन में शामिल होने के लिए आमंत्रित करते हैं ताकि सद्भाव फैलाया जा सके, जरूरतमंदों की मदद की जा सके और उन शाश्वत इस्लामी मूल्यों को बनाए रखा जा सके जो हमारे दिलों को रोशन करते हैं। ईश्वर की कृपा आप पर बनी रहे।",
    chairmanContactbtn: "अध्यक्ष से संपर्क करें",

    eventsTitle: "आगामी कार्यक्रम",
    newsTitle: "नवीनतम समाचार",
    
    ev1Type: "आगामी कार्यक्रम",
    ev1Title: "वार्षिक उर्स मुबारक",
    ev1Date: "15 रजब",
    ev1Loc: "अजमेर शरीफ दरगाह",
    ev1Desc: "विशेष प्रार्थनाओं और लंगर के साथ वार्षिक उर्स को चिह्नित करने वाली भव्य आध्यात्मिक सभाओं में शामिल हों।",

    ev2Type: "हालिया कार्यक्रम",
    ev2Title: "मजलिस-ए-अज़ा",
    ev2Date: "मुहर्रम 1445",
    ev2Loc: "मरकज़ी इमामबाड़ा",
    ev2Desc: "हार्दिक शोकगीत और सामुदायिक भोजन के साथ कर्बला के बलिदानों को याद करना।",

    ev3Type: "विशेष कार्यक्रम",
    ev3Title: "जश्न-ए-मिलाद उन नबी",
    ev3Date: "12 रबी-उल-अव्वल",
    ev3Loc: "ख्वाजा महल",
    ev3Desc: "सुंदर पाठ और रोशनी के साथ पवित्र पैगंबर (सल्ल.) के जन्म का जश्न मनाएं।",

    news1Cat: "घोषणा",
    news1Title: "सर्दियों के लिए नई कल्याणकारी पहल शुरू",
    news1Desc: "मौलाई ग्रोह फाउंडेशन ने पूरे अजमेर में एक बड़ा कंबल और भोजन वितरण अभियान शुरू किया है... और पढ़ें",

    news2Cat: "गतिविधि रिपोर्ट",
    news2Title: "मासिक शैक्षिक सहायता वितरण",
    news2Desc: "इस महीने 50 योग्य छात्रों को छात्रवृत्ति और स्कूल की आपूर्ति प्रदान की गई... और पढ़ें",

    news3Cat: "सामुदायिक अपडेट",
    news3Title: "सफल रक्तदान शिविर",
    news3Desc: "दरगाह के पास हमारे वार्षिक दान शिविर के दौरान 200 से अधिक यूनिट रक्त एकत्र किया गया... और पढ़ें",

    donateTitle: "मौलाई ग्रोह फाउंडेशन का समर्थन करें",
    donateSubtitle: "आपका योगदान हमें मानवता की सेवा, इस्लामी मूल्यों के संरक्षण, धार्मिक कार्यक्रमों, शैक्षिक गतिविधियों, सामुदायिक कल्याण और आध्यात्मिक पहलों का समर्थन करने में मदद करता है।",
    donateAccHolderTitle: "खाताधारक का नाम",
    donateAccHolderName: "SYED GHOUS GHAZNAVI GURDEZI",
    donateBankTitle: "बैंक का नाम",
    donateBankName: "ICICI BANK",
    donateAccTypeTitle: "खाता प्रकार",
    donateAccType: "Savings Account",
    donateAccNumberTitle: "खाता संख्या",
    donateIfscTitle: "IFSC कोड",
    donateMessage: "अल्लाह हर दानदाता को प्रचुर प्रतिफल दे",
    c1: "इस्लामिक सुलेख",
    c2: "आध्यात्मिक सभाएं",
    c3: "पवित्र वास्तुकला",
    c4: "ऐतिहासिक कलाकृतियाँ",
    m1: "कार्यक्रम की झलकियाँ",
    m2: "सामुदायिक गतिविधियाँ",
    m3: "मार्गदर्शन सत्र",
    photo: "फ़ोटो",
    video: "वीडियो",
    footerDesc: "पैगंबर मुहम्मद (सल्ल.) और अहलुल बैत (अ.स.) की शिक्षाओं से प्रेरित एक आध्यात्मिक, शैक्षिक, सांस्कृतिक और मानवीय इस्लामी संगठन।",
    contactTitle: "संपर्क करें",
    hqTitle: "मुख्यालय",
    hqAddress: "ख्वाजा महल,\nखादिम मोहल्ला,\nलंगर खाना गली,\nदरगाह शरीफ के पास,\nअजमेर, राजस्थान, भारत",
    phoneTitle: "फ़ोन",
    visitorsTitle: "आगंतुक:",
    emailTitle: "ईमेल",
    chairmanTitle: "अध्यक्ष और गद्दीनशीन",
    chairmanName: "शाह सूफी सैयद गौस गजनवी गुर्देजी",
    fontClassSans: "font-hindi",
    fontClassSerif: "font-hindi",
    dir: "ltr",
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const savedLang = localStorage.getItem('app_language');
      if (savedLang === 'en' || savedLang === 'ur' || savedLang === 'hi') {
        return savedLang;
      }
    } catch {
      // localStorage may not be accessible in some environments
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('app_language', lang);
    } catch {
      // ignore storage errors
    }
  };

  useEffect(() => {
    document.documentElement.dir = translations[language].dir;
    document.documentElement.lang = language;
    document.documentElement.setAttribute('data-lang', language);
    document.body.setAttribute('data-lang', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
