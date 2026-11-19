import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { navbarTranslations } from "../context/NavbarTranslations";
import {
  ChevronDown,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  MessageCircle,
  Search,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export function Navbar() {
  const { t, language } = useLanguage();
  const nt = navbarTranslations[language];
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          setIsScrolled((prev) => {
            if (!prev && currentY > 25) return true;
            if (prev && currentY < 15) return false;
            return prev;
          });
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => setOpenDropdown(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path
      ? "text-brand-gold bg-[#d4af37]/10"
      : "text-gray-300 hover:text-brand-gold";
  };

  const navLinks = [
    { name: nt.navHome, href: "/" },
    {
      name: nt.navAbout,
      dropdown: [
        { name: nt.navAboutSub1, href: "/about" },
        { name: nt.navAboutSub3, href: "/leadership" },
        { name: nt.navAboutSub4, href: "/chishty" },
      ],
    },
    {
      name: nt.navActivities,
      dropdown: [
        { name: nt.navActDegs, href: "/activities" },
        { name: nt.navAct1, href: "/langar" },
      ],
    },

    {
      name: nt.navGallery,
      href: "/gallery",
    },
    {
      name: nt.navDonations,
      dropdown: [{ name: nt.navDonSub, href: "/donate" }],
    },

    { name: nt.navContact, href: "/contact" },
  ];

  // Flat array of links for search
  const allLinks = navLinks.flatMap((link) => [
    { name: link.name, href: link.href },
    ...(link.dropdown || []).map((sub) => ({ name: sub.name, href: sub.href })),
  ]);

  const searchResults = searchQuery
    ? allLinks.filter(
        (link) => link.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      <motion.nav
        layout
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex flex-col"
      >
        <div 
          className={`absolute inset-0 transition-opacity duration-300 pointer-events-none -z-10 ${
            isScrolled || location.pathname !== "/"
              ? "bg-[#050505]/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.8)] border-b border-[#d4af37]/30 opacity-100"
              : "bg-gradient-to-b from-black/90 via-black/50 to-transparent opacity-100"
          }`}
        />
        <motion.div 
          layout
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`w-full max-w-[1600px] mx-auto flex px-4 lg:px-8 py-3 lg:py-4 ${isScrolled ? "flex-row items-center justify-between" : "flex-row flex-nowrap lg:flex-wrap items-center justify-between"}`}
        >
          {/* Logo Section */}
          <motion.div 
            layout 
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`flex items-center ${isScrolled ? "order-1" : "order-1"}`}
          >
            <motion.div layout transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
              <Link
                reloadDocument
                to="/"
                className="flex items-center gap-2 sm:gap-3 lg:gap-4 group shrink-0 relative z-10"
              >
                <div className={`relative flex-shrink-0 rounded-full border-2 border-brand-gold/60 shadow-[0_0_20px_rgba(212,175,55,0.3)] bg-black flex items-center justify-center overflow-hidden transition-all duration-500 ease-in-out ${isScrolled ? "w-10 h-10 md:w-12 md:h-12" : "w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"}`}>
                  <img
                    src="/logo.png"
                    alt="Maulai Growh Foundation Logo"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-col transition-all duration-500 ease-in-out">
                  <span style={language === 'en' ? { fontFamily: 'Cinzel' } : {}} className={`font-bold bg-gradient-to-r from-[#d4af37] via-[#fff1a0] to-[#d4af37] text-transparent bg-clip-text tracking-widest leading-[1.2] block font-serif drop-shadow-md transition-all duration-500 ease-in-out ${isScrolled ? "text-[11px] sm:text-[13px] md:text-[15px] lg:text-lg xl:text-xl" : "text-[13px] sm:text-[15px] md:text-[17px] lg:text-xl xl:text-2xl"}`}>
                    MAULAI GROWH<span className="md:hidden"><br /></span><span className="hidden md:inline"> </span>FOUNDATION
                  </span>
                  <span className={`text-[#991b1b] font-bold tracking-[0.25em] font-sans uppercase transition-all duration-500 ease-in-out ${isScrolled ? "text-[10px] lg:text-[12px] xl:text-[14px]" : "text-[10px] lg:text-[15px] xl:text-[17px]"}`}>
                    Ajmer Sharif
                  </span>
                </div>
              </Link>
            </motion.div>

          </motion.div>
            
          {/* Right Area: Donate & Language */}
          <div 
             className={`flex items-center gap-1.5 sm:gap-3 order-2 ${isScrolled ? "lg:order-3" : "lg:order-2"}`}
          >
              <AnimatePresence initial={false}>
                {!isScrolled && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden flex items-center shrink-0 relative z-10"
                  >
                    <div className="flex items-center gap-2 sm:gap-4 lg:gap-6 shrink-0 pr-1">
                      {/* Discreet Search Bar */}
                      <div className="hidden lg:flex items-center relative group/search">
                        <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                          <Search size={13} className="text-[#d4af37]/60 group-focus-within/search:text-[#d4af37] transition-colors" />
                        </div>
                        <input
                          type="text"
                          placeholder={language === "ur" ? "تلاش کریں..." : language === "hi" ? "खोजें..." : "Search..."}
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onFocus={() => setIsSearchFocused(true)}
                          onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && searchResults.length > 0) {
                              const href = searchResults[0].href;
                              if (href && href !== "#") {
                                navigate(href);
                              }
                              setIsSearchFocused(false);
                              setSearchQuery("");
                            }
                          }}
                          className="w-[120px] focus:w-[180px] xl:w-[160px] xl:focus:w-[220px] transition-all duration-300 bg-black/40 border border-[#d4af37]/20 hover:border-[#d4af37]/40 rounded-[2px] text-[10px] text-gray-300 placeholder-[#d4af37]/40 py-1.5 pl-8 pr-3 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/30 font-sans backdrop-blur-sm"
                        />
                        
                        {/* Search Results Dropdown */}
                        <AnimatePresence>
                          {isSearchFocused && searchQuery && (
                            <motion.div
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute top-full right-0 mt-2 w-[240px] bg-[#0a0a0a]/95 backdrop-blur-xl border border-[#d4af37]/30 shadow-[0_20px_40px_rgba(0,0,0,0.8)] overflow-hidden rounded-[4px] z-50 rounded-b-[4px]"
                            >
                              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#d4af37] via-[#fff1a0] to-[#d4af37]"></div>
                              
                              <div className="max-h-[300px] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-black/20 [&::-webkit-scrollbar-thumb]:bg-[#d4af37]/30 hover:[&::-webkit-scrollbar-thumb]:bg-[#d4af37]/50 py-2">
                                {searchResults.length > 0 ? (
                                  searchResults.map((result, idx) => (
                                    <Link
                                      reloadDocument
                                      key={idx}
                                      to={result.href}
                                      onClick={() => {
                                        setIsSearchFocused(false);
                                        setSearchQuery("");
                                      }}
                                      className="group/result flex items-center px-4 py-2.5 text-[10px] uppercase tracking-[0.1em] text-gray-400 hover:text-brand-gold transition-all duration-300 hover:bg-[#d4af37]/10"
                                    >
                                      <Search size={10} className="mr-2 opacity-50 group-hover/result:opacity-100" />
                                      <span className="font-sans font-medium">{result.name}</span>
                                    </Link>
                                  ))
                                ) : (
                                  <div className="px-4 py-4 text-[10px] text-gray-500 font-sans text-center">
                                    No results found
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <button
                        onClick={() => navigate("/donate")}
                        className="flex relative overflow-hidden group px-2 sm:px-4 py-1.5 sm:py-2 md:px-6 md:py-2.5 items-center justify-center rounded-[2px] shrink-0"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#8a6d21] to-[#d4af37] opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute inset-[1px] bg-[#111] group-hover:bg-transparent transition-colors duration-300"></div>
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-30 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] transition-opacity duration-500"></div>
                        <span className="relative z-10 text-[8px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.1em] sm:tracking-[0.2em] font-bold text-brand-gold group-hover:text-black transition-colors duration-300 whitespace-nowrap">
                          Donate Now
                        </span>
                        <div className="absolute inset-0 shadow-[0_0_25px_rgba(212,175,55,0.2)] group-hover:shadow-[0_0_35px_rgba(212,175,55,0.7)] transition-shadow duration-500 mix-blend-screen pointer-events-none"></div>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="hidden sm:block shrink-0">
                <LanguageSwitcher inNavbar={true} />
              </div>

              {/* Mobile Animated Language Toggle: appears with smooth animation when scrolling down */}
              <AnimatePresence initial={false}>
                {isScrolled && (
                  <motion.div
                    key="mobile-nav-lang-toggle"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ 
                      opacity: 1, 
                      width: "auto",
                      transitionEnd: { overflow: "visible" }
                    }}
                    exit={{ opacity: 0, width: 0, overflow: "hidden" }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden flex sm:hidden items-center shrink-0 relative z-50"
                  >
                    <div className="shrink-0 px-1 relative z-50">
                      <LanguageSwitcher inNavbar={true} mobile={true} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hamburger Button for Mobile */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
                className="flex lg:hidden items-center justify-center text-brand-gold w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 border border-[#d4af37]/30 rounded-[2px] transition-colors z-50 relative ml-1 sm:ml-2 bg-black/50 backdrop-blur-sm shrink-0"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
          </div>

          {/* Nav Sections */}
          <motion.div 
            layout 
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`hidden lg:flex ${isScrolled ? "order-2 flex-1 items-center px-4 lg:px-8" : "order-3 w-full pt-2 lg:pt-4 pb-1 relative items-center"}`}
          >
            <motion.ul 
              layout 
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={`flex flex-wrap ${isScrolled ? "justify-between w-full gap-x-2" : "items-center justify-center gap-x-3 md:gap-x-6 lg:gap-x-8 xl:gap-x-10 gap-y-3 w-full"}`}
            >
              {navLinks.map((item, index) => (
                <motion.li 
                  layout
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  key={index}
                  className="relative group flex items-center py-2"
                  onMouseEnter={() =>
                    window.innerWidth >= 1024 && setOpenDropdown(index)
                  }
                  onMouseLeave={() =>
                    window.innerWidth >= 1024 && setOpenDropdown(null)
                  }
                >
                  <Link
                    reloadDocument
                    to={item.href}
                    onClick={(e) => {
                      if (item.dropdown && window.innerWidth < 1024) {
                        e.preventDefault();
                        e.stopPropagation();
                        setOpenDropdown(openDropdown === index ? null : index);
                      }
                    }}
                    className={`flex items-center gap-1 font-sans font-semibold text-[10px] md:text-[14px] lg:text-[15px] py-1 tracking-widest uppercase rounded whitespace-nowrap ${
                      location.pathname === item.href && item.href !== "#"
                        ? "text-brand-gold"
                        : "text-gray-200 group-hover:text-brand-gold transition-colors duration-300"
                    }`}
                    style={language === 'ur' ? { fontSize: '19px' } : undefined}
                  >
                    {item.name}
                    {item.dropdown && (
                      <ChevronDown
                        size={12}
                        className={`transition-transform duration-300 text-[#991b1b] group-hover:text-brand-gold ${
                          openDropdown === index ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.dropdown && openDropdown === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-0 min-w-[280px] max-w-[95vw] z-50 flex flex-col pt-3 max-lg:left-1/2 max-lg:-translate-x-1/2"
                      >
                        <div className="relative bg-[#0a0a0a]/80 backdrop-blur-2xl border border-[#d4af37]/20 shadow-[0_8px_32px_rgba(0,0,0,0.6)] overflow-hidden rounded-[4px]">
                          {/* Glow Accent Line */}
                          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/80 to-transparent shadow-[0_0_12px_rgba(212,175,55,0.8)]"></div>
                          
                          {/* Ambient Background Glow */}
                          <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/10 to-transparent pointer-events-none opacity-50"></div>
                          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] pointer-events-none"></div>
                          
                          <div className="relative py-3">
                            {item.dropdown.map((sub, sIdx) => (
                              <Link
                                reloadDocument
                                key={sIdx}
                                to={sub.href}
                                onClick={() => {
                                  setOpenDropdown(null);
                                }}
                                className="group/link flex items-center px-6 py-3.5 text-[11px] md:text-[12px] lg:text-[13px] uppercase tracking-[0.1em] text-gray-200 hover:text-[#d4af37] transition-all duration-300 relative overflow-hidden"
                              >
                                {/* Animated Active Indicator Line */}
                                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#d4af37] scale-y-0 group-hover/link:scale-y-100 transition-transform duration-300 origin-center"></div>
                                
                                {/* Hover Glow Behind Item */}
                                <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/15 via-[#d4af37]/5 to-transparent opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                                {/* Stylized Diamond Icon */}
                                <div className="relative w-1.5 h-1.5 mr-4 flex-shrink-0">
                                  <div className="absolute inset-0 rotate-45 border border-[#d4af37]/40 group-hover/link:border-[#d4af37] group-hover/link:bg-[#d4af37] transition-colors duration-300 shadow-[0_0_0_rgba(212,175,55,0)] group-hover/link:shadow-[0_0_8px_rgba(212,175,55,0.8)]"></div>
                                </div>
                                
                                <span className="relative z-10 whitespace-nowrap font-sans font-semibold group-hover/link:translate-x-1.5 transition-transform duration-300">
                                  {sub.name}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              ))}
            </motion.ul>

            <AnimatePresence>
              {!isScrolled && (
                <motion.div
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="hidden min-[1025px]:flex items-center gap-2.5 absolute right-0 top-0 bottom-0 pt-2 lg:pt-4 pb-1"
                >
                  <span aria-hidden="true" className="hidden 2xl:block w-1.5 h-1.5 rotate-45 border border-[#d4af37]/60 bg-[#d4af37]/20 shrink-0" />
                  <div className="flex items-center p-[3px] rounded-[4px] bg-[#0a0906]/90 border border-[#d4af37]/30 shadow-[0_8px_24px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(243,229,171,0.14)] backdrop-blur-md">
                    <a
                      href="https://www.instagram.com/maulai_growh?dmpr=aW94eHphMHdocGRm"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      title="Instagram"
                      className="group/ig relative overflow-hidden flex items-center gap-2 px-3 xl:px-3.5 h-[38px] rounded-[3px] text-gray-200 hover:text-black transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#d4af37]"
                    >
                      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#b58d2c] via-[#f3e5ab] to-[#d4af37] opacity-0 group-hover/ig:opacity-100 transition-opacity duration-200" />
                      <Instagram size={16} className="relative z-10 text-[#d4af37] group-hover/ig:text-black transition-colors duration-200 shrink-0" />
                      <span className="hidden xl:inline relative z-10 text-[11.5px] font-sans font-bold uppercase tracking-[0.12em] whitespace-nowrap shrink-0">
                        Instagram
                      </span>
                    </a>

                    <span aria-hidden="true" className="w-[1px] h-5 bg-[#d4af37]/25 mx-0.5 shrink-0" />

                    <a
                      href="https://youtube.com/@maulai_growh?si=Sy0MDT9-LlRl2g-c"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="YouTube"
                      title="YouTube"
                      className="group/yt relative overflow-hidden flex items-center gap-2 px-3 xl:px-3.5 h-[38px] rounded-[3px] text-gray-200 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#d4af37]"
                    >
                      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#991b1b] to-[#b91c1c] opacity-0 group-hover/yt:opacity-100 transition-opacity duration-200" />
                      <Youtube size={17} className="relative z-10 text-[#d4af37] group-hover/yt:text-white transition-colors duration-200 shrink-0" />
                      <span className="hidden xl:inline relative z-10 text-[11.5px] font-sans font-bold uppercase tracking-[0.12em] whitespace-nowrap shrink-0">
                        YouTube
                      </span>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-[#0a0a0a]/95 backdrop-blur-3xl border-b border-[#d4af37]/30 overflow-hidden shadow-2xl relative z-40"
            >
              <div className="px-6 py-6 max-h-[75vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-black/20 [&::-webkit-scrollbar-thumb]:bg-[#d4af37]/30">
                <ul className="flex flex-col gap-1">
                  {navLinks.map((item, index) => (
                    <li key={index} className="flex flex-col border-b border-[#d4af37]/10 last:border-0">
                      <div className="flex items-center justify-between py-3.5">
                        <Link
                          to={item.dropdown ? "#" : item.href}
                          onClick={(e) => {
                            if (item.dropdown) {
                              e.preventDefault();
                              e.stopPropagation();
                              setOpenDropdown(openDropdown === index ? null : index);
                            } else {
                              setIsMobileMenuOpen(false);
                            }
                          }}
                          className={`font-sans font-semibold text-[14px] md:text-[16px] tracking-widest uppercase flex-1 ${
                            location.pathname === item.href && item.href !== "#"
                              ? "text-brand-gold"
                              : "text-gray-200"
                          }`}
                        >
                          {item.name}
                        </Link>
                        {item.dropdown && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdown(openDropdown === index ? null : index);
                            }}
                            className="p-2 text-[#991b1b] bg-white/5 rounded-sm active:scale-95 transition-all"
                          >
                            <ChevronDown
                              size={16}
                              className={`transition-transform duration-300 ${
                                openDropdown === index ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                        )}
                      </div>
                      <AnimatePresence>
                        {item.dropdown && openDropdown === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden bg-black/20 rounded-md mb-2"
                          >
                            <div className="px-4 py-3 pb-4 flex flex-col gap-4 border-l-2 border-[#d4af37]/30 ml-2 mt-1">
                              {item.dropdown.map((sub, sIdx) => (
                                <Link
                                  key={sIdx}
                                  to={sub.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="text-[11px] md:text-[13px] uppercase tracking-[0.1em] text-gray-400 font-sans font-medium hover:text-[#d4af37] transition-colors"
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  ))}
                  
                  <div className="pt-6 mt-4 border-t border-[#d4af37]/20 flex flex-col items-center gap-4">
                    <button
                      onClick={() => {
                        navigate("/donate");
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full relative overflow-hidden group px-6 py-3.5 flex items-center justify-center rounded-[2px]"
                      style={{ background: 'linear-gradient(to right, #8a6d21, #d4af37)' }}
                    >
                      <span className="relative z-10 text-[11px] md:text-[13px] uppercase tracking-[0.2em] font-bold text-black whitespace-nowrap">
                        Donate Now
                      </span>
                    </button>
                    <div className="w-full flex justify-center py-2 bg-white/5 rounded-[2px]">
                      <LanguageSwitcher inNavbar={true} />
                    </div>
                  </div>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

    </>
  );
}
