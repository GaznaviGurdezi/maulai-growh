import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Heart, Building2, User, CreditCard, Hash } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { HeadingBackground } from "./HeadingBackground";

export function Donation() {
  const { t, language } = useLanguage();
  const copyText = language === "ur" ? "کاپی کریں" : language === "hi" ? "कॉपी करें" : "Copy";
  const copiedText = language === "ur" ? "کاپی ہو گیا!" : language === "hi" ? "कॉपी किया गया!" : "Copied!";
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const accountDetails = [
    {
      id: 'accHolder',
      icon: <User className="w-5 h-5" />,
      title: t.donateAccHolderTitle,
      value: t.donateAccHolderName,
      canCopy: true
    },
    {
      id: 'bankName',
      icon: <Building2 className="w-5 h-5" />,
      title: t.donateBankTitle,
      value: t.donateBankName,
      canCopy: false
    },
    {
      id: 'accType',
      icon: <CreditCard className="w-5 h-5" />,
      title: t.donateAccTypeTitle,
      value: t.donateAccType,
      canCopy: false
    },
    {
      id: 'accNumber',
      icon: <Hash className="w-5 h-5" />,
      title: t.donateAccNumberTitle,
      value: "768401500538",
      canCopy: true
    },
    {
      id: 'ifscCode',
      icon: <Hash className="w-5 h-5" />,
      title: t.donateIfscTitle,
      value: "ICIC0007684",
      canCopy: true
    }
  ];

  return (
    <section id="donate" className="py-20 relative bg-brand-black overflow-hidden backdrop-blur-md">
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#d4af37 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      {/* Decorative Top Divider */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-30" />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative inline-block w-full max-w-4xl text-center mb-12"
        >
          <HeadingBackground />
          <div className="flex items-center justify-center mb-4 text-[#d4af37]">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className={`text-[44px] md:text-5xl font-bold mb-6 text-[#d4af37] ${t.fontClassSans}`}>
            {t.donateTitle}
          </h2>
          <div className="w-24 h-1 bg-[#d4af37]/50 mx-auto mb-6 rounded-full" />
          <p className={`text-[17px] text-gray-300 max-w-2xl mx-auto leading-relaxed ${t.fontClassSans}`}>
            {t.donateSubtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-[#111111] border border-[#d4af37]/30 rounded-2xl p-6 md:p-10 shadow-[0_0_40px_rgba(212,175,55,0.05)] relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#991b1b]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-[#991b1b]/20 transition-all duration-700" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none group-hover:bg-[#d4af37]/10 transition-all duration-700" />

          <div className="space-y-6 relative z-10">
            {accountDetails.map((detail, index) => (
              <div 
                key={detail.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl bg-black/40 border border-[#d4af37]/10 hover:border-[#d4af37]/30 transition-all duration-300"
              >
                <div className="flex items-center space-x-4 mb-3 md:mb-0">
                  <div className="p-2 rounded-lg bg-[#d4af37]/10 text-[#d4af37]">
                    {detail.icon}
                  </div>
                  <div>
                    <p className={`text-[11px] md:text-[12px] text-gray-400 uppercase tracking-wider ${t.fontClassSans}`}>{detail.title}</p>
                    <p className={`text-[17px] md:text-[18px] font-medium text-gray-200 mt-1 ${detail.id === 'accHolder' || detail.id === 'bankName' ? t.fontClassSans : 'font-mono'}`}>
                      {detail.value}
                    </p>
                  </div>
                </div>
                
                {detail.canCopy && (
                  <button
                    onClick={() => handleCopy(detail.value, detail.id)}
                    className="flex items-center md:self-center gap-2 px-4 py-2 rounded-lg bg-[#d4af37]/5 text-[#d4af37] hover:bg-[#d4af37]/20 transition-colors border border-[#d4af37]/20 hover:border-[#d4af37]/50 focus:ring-2 focus:ring-[#d4af37]/50 outline-none w-fit"
                  >
                    {copiedField === detail.id ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span className="text-[13px] font-medium">{copiedText}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span className="text-[13px] font-medium">{copyText}</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 text-center relative z-10">
            <p className={`text-[#d4af37] text-[17px] italic mb-6 ${t.fontClassSans}`}>
              "{t.donateMessage}"
            </p>
            <a 
              href="https://wa.me/919680872049"
               target="_blank" 
               rel="noopener noreferrer"
               className={`inline-flex items-center justify-center px-8 py-3 rounded-full bg-gradient-to-r from-[#8b1818] to-[#991b1b] text-white font-medium hover:from-[#7a1515] hover:to-[#8b1818] transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(153,27,27,0.4)] ${t.fontClassSans}`}
            >
              {t.btnDonate}
            </a>
          </div>
        </motion.div>
      </div>

      {/* Decorative Bottom Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-30" />
    </section>
  );
}
