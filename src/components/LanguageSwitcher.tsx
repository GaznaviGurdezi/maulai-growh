import { motion, AnimatePresence } from "motion/react";
import { useLanguage, Language } from "../context/LanguageContext";
import { Globe, Check } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface LanguageSwitcherProps {
  inNavbar?: boolean;
  mobile?: boolean;
}

export function LanguageSwitcher({ inNavbar = false, mobile = false }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState<{ top: number; right: number }>({ top: 0, right: 0 });

  const languages: { code: Language; label: string }[] = [
    { code: "en", label: "English" },
    { code: "ur", label: "اردو" },
    { code: "hi", label: "हिन्दी" },
  ];

  const handleToggle = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + 8,
        right: Math.max(8, window.innerWidth - rect.right),
      });
    }
    setIsOpen((prev) => !prev);
  };

  // Close on outside scroll
  useEffect(() => {
    if (!isOpen) return;
    const handleScroll = () => setIsOpen(false);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  const dropdownModal = isOpen && (
    <div
      className="fixed inset-0 z-[999999] bg-black/40 backdrop-blur-[2px]"
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen(false);
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: -6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: -6 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: `${coords.top}px`,
          right: `${coords.right}px`,
        }}
        onClick={(e) => e.stopPropagation()}
        className="min-w-[145px] bg-[#0c0c0c]/98 backdrop-blur-2xl border border-brand-gold/60 shadow-[0_15px_40px_rgba(0,0,0,0.95)] flex flex-col rounded-md overflow-hidden py-1 z-[999999]"
      >
        <div className="px-3 py-1.5 border-b border-brand-gold/20 text-[9px] uppercase tracking-widest text-brand-gold/60 font-sans font-semibold">
          Select Language
        </div>
        {languages.map((lang) => (
          <button
            key={lang.code}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLanguage(lang.code);
              setIsOpen(false);
            }}
            className={`px-3.5 py-2.5 text-[13px] tracking-wider transition-all flex items-center justify-between w-full text-left cursor-pointer active:bg-brand-gold/25 select-none ${
              language === lang.code
                ? "text-brand-gold font-bold bg-brand-gold/15"
                : "text-gray-300 hover:text-brand-gold hover:bg-brand-gold/10"
            } ${
              lang.code === "ur"
                ? "font-urdu dir-rtl text-right"
                : lang.code === "hi"
                ? "font-hindi"
                : "font-serif"
            }`}
          >
            <span>{lang.label}</span>
            {language === lang.code && <Check size={14} className="text-brand-gold ml-2 shrink-0" />}
          </button>
        ))}
      </motion.div>
    </div>
  );

  return (
    <div className="relative text-brand-gold inline-flex items-center">
      <button
        ref={buttonRef}
        type="button"
        onClick={handleToggle}
        aria-label="Switch Language"
        className={`flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
          mobile
            ? "h-8 px-2 sm:px-2.5 bg-black/80 border border-[#d4af37]/60 rounded-[3px] shadow-[0_0_12px_rgba(212,175,55,0.25)] active:scale-95 hover:border-[#d4af37]"
            : inNavbar
            ? "px-3 py-2 bg-transparent border-none hover:bg-brand-white/5"
            : "px-3 py-2 bg-brand-black/80 backdrop-blur-md border border-brand-gold/30 rounded-none hover:bg-brand-white/5"
        } transition-all duration-300 text-brand-gold`}
      >
        <Globe size={mobile ? 15 : (inNavbar ? 24 : 18)} className="text-brand-gold shrink-0" />
        <span className={`font-serif ${mobile ? "text-[11px] font-bold" : (inNavbar ? "text-[15px]" : "text-[13px]")} uppercase tracking-wider drop-shadow text-brand-gold`}>
          {languages.find(l => l.code === language)?.code}
        </span>
      </button>

      {/* Portal directly to document.body: guaranteed zero clipping, zero transform-trap, highest z-index */}
      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {dropdownModal}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
