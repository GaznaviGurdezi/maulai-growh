export interface GalleryItem {
  id: number;
  src: string;
  type?: 'video';
  videoId?: string;
  caption: {
    en: string;
    ur: string;
    hi: string;
  };
}

export interface GalleryFolder {
  id: string;
  cover: string;
  name: {
    en: string;
    ur: string;
    hi: string;
  };
  description: {
    en: string;
    ur: string;
    hi: string;
  };
}

export const galleryUI = {
  en: {
    title: "GALLERY",
    quote: '"Explore moments of Khidmat, heritage, devotion, and community service through our collection of media documenting the journey of Maulai Growh Foundation."',
    mediaCountSuffix: "MEDIA",
    backToAlbums: "Back to Albums",
    albumEmpty: "Album Empty",
    albumEmptyDesc: "More moments from our journey will be added to this album soon, InshaAllah.",
  },
  ur: {
    title: "تصویریں",
    quote: '”مولائی گروہ فاؤنڈیشن کے سفر کی عکاسی کرنے والے میڈیا کلیکشن کے ذریعے خدمت، عقیدت، روحانی ورثہ اور فلاحی کاموں کے لمحات ملاحظہ فرمائیں۔“',
    mediaCountSuffix: "میڈیا",
    backToAlbums: "البمز پر واپس جائیں",
    albumEmpty: "البم خالی ہے",
    albumEmptyDesc: "ان شاء اللہ جلد ہی ہمارے سفر کے مزید روح پرور لمحات اس البم میں شامل کیے جائیں گے۔",
  },
  hi: {
    title: "चित्र दीर्घा",
    quote: '"मौलाई ग्रोह फाउंडेशन की यात्रा को दर्शाने वाले मीडिया संग्रह के माध्यम से खिदमत, विरासत, भक्ति और सामुदायिक सेवा के पावन क्षणों को देखें।"',
    mediaCountSuffix: "मीडिया",
    backToAlbums: "एल्बम पर वापस जाएं",
    albumEmpty: "एल्बम अभी खाली है",
    albumEmptyDesc: "इन्शाअल्लाह जल्द ही हमारे इस सफर के और भी खूबसूरत क्षण इस एल्बम में जोड़े जाएंगे।",
  },
};

export const galleryFolders: GalleryFolder[] = [
  {
    id: "langar",
    cover: "/langar.png",
    name: {
      en: "Hussaini Langar",
      ur: "حسینی لنگر",
      hi: "हुसैनी लंगर",
    },
    description: {
      en: "Moments of service, devotion, and community during the Hussaini Langar.",
      ur: "حسینی لنگر کے دوران خدمت خلق، عقیدت اور ہمدردی کے روح پرور مناظر۔",
      hi: "हुसैनी लंगर के दौरान सेवा, भक्ति और सामुदायिक सौहार्द के पावन क्षण।",
    },
  },
  {
    id: "ajmer",
    cover: "/lineage.jpg",
    name: {
      en: "Ajmer Sharif & Khuddam",
      ur: "اجمیر شریف اور خدام",
      hi: "अजमेर शरीफ और खुद्दाम",
    },
    description: {
      en: "Sacred moments from the blessed Dargah of Hazrat Khwaja Moinuddin Hasan Chishti (R.A.), Ajmer Sharif.",
      ur: "حضرت خواجہ معین الدین حسن چشتی (رح) کی بارگاہِ اقدس، درگاہ اجمیر شریف کے روح پرور مناظر۔",
      hi: "हज़रत ख्वाजा मोइनुद्दीन हसन चिश्ती (रह.) की दरगाह अजमेर शरीफ के पावन और आध्यात्मिक क्षण।",
    },
  },
  {
    id: "degs",
    cover: "https://i.postimg.cc/YksKFMT5/Whats-App-Image-2026-08-07-at-2-08-55-AM.png",
    name: {
      en: "The Sacred Degs",
      ur: "مقدس دیگیں",
      hi: "पवित्र देगें",
    },
    description: {
      en: "The historic Bari Deg and Chhoti Deg and the tradition of Niyaz.",
      ur: "تاریخی بڑی دیگ اور چھوٹی دیگ اور تبرک و نیاز کی عظیم الشان روایت۔",
      hi: "ऐतिहासिक बड़ी देग और छोटी देग तथा लंगर व नियाज़ की पवित्र परंपरा।",
    },
  },
];

export const galleryItemsData: Record<string, GalleryItem[]> = {
  langar: [
    {
      id: 1,
      src: "/langar.png",
      caption: {
        en: "Serving the blessed Langar to devotees",
        ur: "عقیدت مندوں میں مبارک لنگر کی تقسیم",
        hi: "श्रद्धालुओं को पावन लंगर परोसते हुए",
      },
    },
    {
      id: 2,
      src: "/langar-fatimiyyah.png",
      caption: {
        en: "Langar distribution during Ayyam-e-Fatimiyyah",
        ur: "ایامِ فاطمیہ کے دوران لنگر کا اہتمام و تقسیم",
        hi: "अय्याम-ए-फातिमीया के दौरान लंगर वितरण",
      },
    },
    {
      id: 30,
      src: "https://i.postimg.cc/zzspyngD/1000002198-jpg.jpg",
      caption: {
        en: "Devotees participating in the Langar",
        ur: "لنگرِ عام میں عقیدت مندوں کی شرکت",
        hi: "लंगर में भाग लेते श्रद्धालु",
      },
    },
    {
      id: 31,
      src: "https://i.postimg.cc/fzG5Vx9T/1000002207-jpg.jpg",
      caption: {
        en: "Serving food during the blessed Langar",
        ur: "مبارک لنگر کے دوران نیاز و طعام پیش کرتے ہوئے",
        hi: "पावन लंगर के दौरान भोजन सेवा",
      },
    },
    {
      id: 32,
      src: "https://i.postimg.cc/sjkKMphg/1000002208-jpg.jpg",
      caption: {
        en: "The blessed dastarkhwan of Hussaini Langar",
        ur: "حسینی لنگر کا بابرکت دسترخوان",
        hi: "हुसैनी लंगर का बरकत भरा दस्तरख्वान",
      },
    },
    {
      id: 33,
      src: "https://i.postimg.cc/wqCF1hmq/1000002213-jpg.jpg",
      caption: {
        en: "Community gathering for the Langar",
        ur: "لنگر کے لیے زائرین اور عقیدت مندوں کا اجتماع",
        hi: "लंगर के लिए श्रद्धालुओं का विशाल जमावड़ा",
      },
    },
    {
      id: 34,
      src: "https://i.postimg.cc/NtSdCwPH/1000002225-jpg.jpg",
      caption: {
        en: "A massive gathering at the Hussaini Langar",
        ur: "حسینی لنگر میں زائرین کا عظیم الشان ہجوم",
        hi: "हुसैनी लंगर में भारी संख्या में उमड़ी भीड़",
      },
    },
    {
      id: 35,
      src: "https://www.chishtiyasufifoundation.com/assets/img/team/langar2.jpg",
      caption: {
        en: "Hussaini Langar preparation",
        ur: "حسینی لنگر کی تیاری کے مناظر",
        hi: "हुसैनी लंगर की तैयारी",
      },
    },
    {
      id: 36,
      src: "https://www.chishtiyasufifoundation.com/assets/img/team/langar1.jpg",
      caption: {
        en: "Blessed gathering at Hussaini Langar",
        ur: "حسینی لنگر کا روح پرور اور مبارک منظر",
        hi: "हुसैनी लंगर का पावन और बरकती दृश्य",
      },
    },
    {
      id: 37,
      src: "https://i.postimg.cc/65CzDfGz/Whats-App-Image-2026-11-15-at-10-20-08-PM.jpg",
      caption: {
        en: "Serving devotees at the Hussaini Langar",
        ur: "حسینی لنگر میں عقیدت مندوں کی خدمت",
        hi: "हुसैनी लंगर में श्रद्धालुओं की सेवा",
      },
    },
    {
      id: 38,
      src: "https://i.postimg.cc/MK1thmjD/Whats-App-Image-2026-11-15-at-10-20-07-PM-(1).jpg",
      caption: {
        en: "Community gathering for the blessed Langar",
        ur: "مبارک لنگر میں عقیدت مندوں کا اجتماع",
        hi: "पावन लंगर के लिए श्रद्धालुओं का जमावड़ा",
      },
    },
    {
      id: 39,
      src: "https://i.postimg.cc/BQ2NdB1p/Whats-App-Image-2026-11-15-at-10-20-07-PM.jpg",
      caption: {
        en: "Distributing sacred Langar meals",
        ur: "تبرک و لنگر کی تقسیم کے مناظر",
        hi: "पवित्र लंगर वितरण के दृश्य",
      },
    },
    {
      id: 40,
      src: "https://i.postimg.cc/r8NGcHHN/20240404-035137.jpg",
      caption: {
        en: "Moments of Khidmat during Hussaini Langar",
        ur: "حسینی لنگر کے دوران خدمتِ خلق کے لمحات",
        hi: "हुसैनी लंगर के दौरान खिदमत के पावन क्षण",
      },
    },
    {
      id: 41,
      src: "https://i.postimg.cc/Hpg0qm6Z/20240404-033644(1).jpg",
      caption: {
        en: "Devotees gathered for the Hussaini Langar",
        ur: "حسینی لنگر کے لیے جمع زائرین و عقیدت مند",
        hi: "हुसैनी लंगर के लिए एकत्रित श्रद्धालु",
      },
    },
    {
      id: 42,
      src: "https://i.postimg.cc/08sGTvVc/20240404-033644.jpg",
      caption: {
        en: "The blessed tradition of Hussaini Langar",
        ur: "حسینی لنگر کی بابرکت روایت",
        hi: "हुसैनी लंगर की पावन परंपरा",
      },
    },
    {
      id: 43,
      src: "https://i.postimg.cc/B3km7GwF/Whats-App-Image-2026-08-12-at-2-26-18-AM.jpg",
      caption: {
        en: "Serving devotees during Hussaini Langar",
        ur: "حسینی لنگر میں عقیدت مندوں کی خدمت",
        hi: "हुसैनी लंगर के दौरान श्रद्धालुओं की सेवा",
      },
    },
    {
      id: 44,
      src: "https://i.postimg.cc/4G5nGcfh/Whats-App-Image-2026-11-16-at-12-44-38-AM.jpg",
      caption: {
        en: "Devotees gathered at the Hussaini Langar",
        ur: "حسینی لنگر میں زائرین و عقیدت مندوں کی حاضری",
        hi: "हुसैनी लंगर में एकत्रित ज़ायरीन व श्रद्धालु",
      },
    },
    {
      id: 45,
      src: "https://i.postimg.cc/S4rj49Sn/Whats-App-Image-2026-11-16-at-12-44-38-AM-(1).jpg",
      caption: {
        en: "Distributing blessed Langar to the community",
        ur: "عقیدت مندوں میں مبارک لنگر کی تقسیم",
        hi: "श्रद्धालुओं में पावन लंगर का वितरण",
      },
    },
    {
      id: 46,
      src: "https://i.postimg.cc/k9gGg5Gb/Whats-App-Image-2026-11-16-at-12-44-40-AM.jpg",
      caption: {
        en: "Sacred service and unity at Hussaini Langar",
        ur: "حسینی لنگر میں خدمت و عقیدت کے مناظر",
        hi: "हुसैनी लंगर में सेवा और भक्ति के दृश्य",
      },
    },
    {
      id: 18,
      type: "video",
      videoId: "YpJAHEGj_Yg",
      src: "https://img.youtube.com/vi/YpJAHEGj_Yg/hqdefault.jpg",
      caption: {
        en: "Hussaini Langar Video",
        ur: "حسینی لنگر کی خصوصی ویڈیو",
        hi: "हुसैनी लंगर विशेष वीडियो",
      },
    },
    {
      id: 19,
      type: "video",
      videoId: "1J-zlG9RjBE",
      src: "https://img.youtube.com/vi/1J-zlG9RjBE/hqdefault.jpg",
      caption: {
        en: "Hussaini Langar Video",
        ur: "حسینی لنگر کی خصوصی ویڈیو",
        hi: "हुसैनी लंगर विशेष वीडियो",
      },
    },
  ],
  ajmer: [
    {
      id: 4,
      src: "/lineage.jpg",
      caption: {
        en: "Sacred lineage and heritage",
        ur: "مقدس سلسلہ اور سادات کا روحانی ورثہ",
        hi: "पवित्र वंश परंपरा और आध्यात्मिक विरासत",
      },
    },
    {
      id: 47,
      src: "https://i.postimg.cc/kCzTYdhK/Whats-App-Image-2026-08-12-at-2-23-08-AM.jpg",
      caption: {
        en: "Sacred moments at Dargah Ajmer Sharif",
        ur: "درگاہ اجمیر شریف کے روح پرور مناظر",
        hi: "दरगाह अजमेर शरीफ के पावन क्षण",
      },
    },
    {
      id: 48,
      src: "https://i.postimg.cc/yVHhMKLp/20240404-031150.jpg",
      caption: {
        en: "Blessed courtyard of Ajmer Sharif",
        ur: "بارگاہِ غریب نواز کا بابرکت صحن",
        hi: "दरगाह अजमेर शरीफ का पावन प्रांगण",
      },
    },
    {
      id: 49,
      src: "https://i.postimg.cc/YksVLXry/Whats-App-Image-2026-11-15-at-8-01-35-PM.jpg",
      caption: {
        en: "Devotees at Dargah Ajmer Sharif",
        ur: "درگاہ اجمیر شریف میں زائرین کی حاضری",
        hi: "दरगाह अजमेर शरीफ में श्रद्धालुओं की उपस्थिति",
      },
    },
    {
      id: 50,
      src: "https://i.postimg.cc/mR5q1dLn/Whats-App-Image-2026-11-15-at-8-01-36-PM.jpg",
      caption: {
        en: "Sacred heritage of Ajmer Sharif",
        ur: "اجمیر شریف کی مقدس روحانی وراثت",
        hi: "अजमेर शरीफ की पवित्र आध्यात्मिक विरासत",
      },
    },
    {
      id: 51,
      src: "https://i.postimg.cc/XW8XW5jq/Whats-App-Image-2026-11-16-at-12-44-40-AM-(1).jpg",
      caption: {
        en: "Moments of devotion at Ajmer Sharif",
        ur: "اجمیر شریف میں عقیدت و احترام کے لمحات",
        hi: "अजमेर शरीफ में भक्ति और श्रद्धा के क्षण",
      },
    },
    {
      id: 52,
      src: "https://i.postimg.cc/Zmc0mNbp/Whats-App-Image-2026-11-16-at-12-44-40-AM-(2).jpg",
      caption: {
        en: "Spiritual gathering at Ajmer Sharif",
        ur: "اجمیر شریف کا روحانی اجتماع",
        hi: "अजमेर शरीफ में आध्यात्मिक समागम",
      },
    },
    {
      id: 53,
      src: "https://i.postimg.cc/hgtvtGv9/Whats-App-Image-2026-11-16-at-12-44-41-AM.jpg",
      caption: {
        en: "Blessed view of Dargah Ajmer Sharif",
        ur: "درگاہ اجمیر شریف کا پرنور منظر",
        hi: "दरगाह अजमेर शरीफ का पावन दृश्य",
      },
    },
    {
      id: 54,
      src: "https://i.postimg.cc/YkC0CS0F/Whats-App-Image-2026-11-16-at-12-44-41-AM-(1).jpg",
      caption: {
        en: "Sacred traditions at Ajmer Sharif",
        ur: "اجمیر شریف کی مقدس روایات",
        hi: "अजमेर शरीफ की पावन परंपराएं",
      },
    },
    {
      id: 55,
      src: "https://i.postimg.cc/4Zxyx3yt/Whats-App-Image-2026-11-16-at-12-44-41-AM-(2).jpg",
      caption: {
        en: "Devotion and service at Ajmer Sharif",
        ur: "اجمیر شریف میں خدمت اور عقیدت کے مناظر",
        hi: "अजमेर शरीफ में सेवा और भक्ति के दृश्य",
      },
    },
    {
      id: 56,
      src: "https://i.postimg.cc/Wj1z14zS/Whats-App-Image-2026-11-16-at-12-44-42-AM.jpg",
      caption: {
        en: "Blessed shrine moments in Ajmer Sharif",
        ur: "اجمیر شریف کے مبارک لمحات",
        hi: "अजमेर शरीफ के बरकत भरे क्षण",
      },
    },
    {
      id: 57,
      src: "https://i.postimg.cc/ty4J4gJd/Whats-App-Image-2026-11-16-at-12-44-42-AM-(1).jpg",
      caption: {
        en: "Pilgrims gathered at Ajmer Sharif",
        ur: "درگاہ اجمیر شریف میں عقیدت مندوں کی حاضری",
        hi: "दरगाह अजमेर शरीफ में एकत्रित जायरीन",
      },
    },
    {
      id: 58,
      src: "https://i.postimg.cc/ty4J4gJz/Whats-App-Image-2026-11-16-at-12-44-42-AM-(2).jpg",
      caption: {
        en: "Sacred atmosphere of Ajmer Sharif",
        ur: "اجمیر شریف کی روحانی فضا",
        hi: "अजमेर शरीफ का पवित्र आध्यात्मिक वातावरण",
      },
    },
  ],
  degs: [
    {
      id: 59,
      src: "https://i.postimg.cc/YksKFMT5/Whats-App-Image-2026-08-07-at-2-08-55-AM.png",
      caption: {
        en: "The historic Sacred Deg at Ajmer Sharif",
        ur: "درگاہ اجمیر شریف کی تاریخی مقدس دیگ",
        hi: "दरगाह अजमेर शरीफ की ऐतिहासिक पवित्र देग",
      },
    },
    {
      id: 60,
      src: "https://chishtiyasufifoundation.com/assets/img/deg/deg5.jpg",
      caption: {
        en: "Sacred Deg offering at Ajmer Sharif",
        ur: "اجمیر شریف میں مقدس دیگ کی نیاز",
        hi: "अजमेर शरीफ में पवित्र देग की नियाज़",
      },
    },
    {
      id: 61,
      src: "https://chishtiyasufifoundation.com/assets/img/deg/deg4.jpg",
      caption: {
        en: "Devotees gathered at the Sacred Deg",
        ur: "مقدس دیگ کے گرد جمع عقیدت مند",
        hi: "पवित्र देग के पास एकत्रित श्रद्धालु",
      },
    },
    {
      id: 62,
      src: "https://chishtiyasufifoundation.com/assets/img/deg/deg3.jpg",
      caption: {
        en: "Preparation of sacred Tabarruk in the Deg",
        ur: "دیگ میں تبرک و نیاز کی تیاری",
        hi: "देग में पवित्र तबर्रुक की तैयारी",
      },
    },
    {
      id: 63,
      src: "https://chishtiyasufifoundation.com/assets/img/deg/deg2.jpg",
      caption: {
        en: "The blessed tradition of Bari Deg and Chhoti Deg",
        ur: "بڑی دیگ اور چھوٹی دیگ کی بابرکت روایت",
        hi: "बड़ी देग और छोटी देग की पावन परंपरा",
      },
    },
    {
      id: 64,
      src: "https://chishtiyasufifoundation.com/assets/img/deg/deg1.jpg",
      caption: {
        en: "Sacred Deg at Dargah Hazrat Khwaja Garib Nawaz (R.A.)",
        ur: "درگاہ حضرت خواجہ غریب نواز (رح) کی مقدس دیگ",
        hi: "दरगाह हज़रत ख्वाजा गरीब नवाज़ (रह.) की पवित्र देग",
      },
    },
  ],
};
