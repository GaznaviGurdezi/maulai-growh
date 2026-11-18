import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ImageIcon, ArrowLeft, ArrowRight, Images, Play } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { galleryUI, galleryFolders, galleryItemsData } from "./GalleryTranslations";

export function ImageGallery() {
  const { t, language } = useLanguage();
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const langKey = (language === 'ur' || language === 'hi') ? language : 'en';
  const ui = galleryUI[langKey];

  const activeFolder = galleryFolders.find(f => f.id === activeFolderId);
  const currentImages = activeFolderId ? galleryItemsData[activeFolderId] || [] : [];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null && currentImages.length > 0) {
      setLightboxIndex((lightboxIndex + 1) % currentImages.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null && currentImages.length > 0) {
      setLightboxIndex((lightboxIndex - 1 + currentImages.length) % currentImages.length);
    }
  };

  return (
    <div className="w-full mt-2 sm:mt-4 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Heading Area */}
        <div 
          className="text-center"
          style={{
            marginBottom: "64px",
            paddingBottom: "0px",
            marginTop: "0px",
            marginLeft: "0px",
            paddingLeft: "0px",
            paddingTop: "80px",
          }}
        >
          <h2 
            className={`text-4xl md:text-5xl text-brand-gold mb-6 ${t.fontClassSerif}`}
            style={
              language === 'ur'
                ? {
                    fontFamily: "'Scheherazade New', serif",
                    fontStyle: "normal",
                    fontWeight: "bold",
                    fontSize: "55px",
                    paddingTop: "0px",
                    marginTop: "0px",
                    marginLeft: "0px",
                    paddingBottom: "5px",
                  }
                : language === 'hi'
                ? { fontFamily: "'Amita', cursive, sans-serif", fontSize: "50px" }
                : language === 'en'
                ? { fontSize: "55px" }
                : undefined
            }
          >
            {ui.title}
          </h2>
          <p 
            className={`text-gray-300 max-w-3xl mx-auto text-base md:text-lg leading-relaxed ${t.fontClassSans}`}
            style={
              language === 'ur'
                ? {
                    fontFamily: "'Noto Nastaliq Urdu', serif",
                    fontSize: "23px",
                    fontStyle: "normal",
                    lineHeight: "1.9",
                  }
                : language === 'hi'
                ? { fontFamily: "Arial, sans-serif", fontStyle: "normal", fontSize: "23px" }
                : language === 'en'
                ? { fontStyle: "italic", fontSize: "20px" }
                : { fontStyle: "italic" }
            }
          >
            {ui.quote}
          </p>
          <div className="flex justify-center mt-8">
            <div className="h-0.5 w-24 bg-brand-crimson"></div>
          </div>
        </div>

        {/* Dynamic Gallery View */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {!activeFolderId ? (
              <motion.div
                key="folders"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {galleryFolders.map((folder, idx) => {
                  const imageCount = galleryItemsData[folder.id]?.length || 0;
                  
                  return (
                    <motion.div
                      key={folder.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <div 
                        onClick={() => setActiveFolderId(folder.id)}
                        className="group relative rounded-[16px] overflow-hidden cursor-pointer border border-brand-gold/20 shadow-[0_5px_15px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.25)] hover:border-brand-gold/50 transition-all duration-500 bg-[#0a0a0a] aspect-[4/3] flex flex-col"
                      >
                        <div className="absolute inset-0 bg-brand-gold/20 opacity-0 group-hover:opacity-100 mix-blend-overlay transition-opacity duration-500 z-10 pointer-events-none" />
                        
                        {folder.cover ? (
                          <img 
                            src={folder.cover} 
                            alt={folder.name[langKey]} 
                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-out z-0"
                            loading="lazy"
                          />
                        ) : (
                          <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#111] z-0">
                            <ImageIcon className="w-16 h-16 text-brand-gold/20" />
                          </div>
                        )}

                        {/* Overlay Content */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent p-6 flex flex-col justify-between z-20">
                          <div className="flex justify-end">
                            <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-brand-gold/30 flex items-center gap-1.5 shadow-lg">
                              <Images size={12} className="text-brand-gold" />
                              <span className="text-[10px] text-brand-gold font-bold tracking-widest">
                                {imageCount} {ui.mediaCountSuffix}
                              </span>
                            </div>
                          </div>
                          
                          <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                            <h3 
                              className={`text-xl md:text-2xl text-brand-gold mb-2 ${t.fontClassSerif}`}
                              style={language === 'ur' ? { fontFamily: "Georgia, 'Noto Naskh Arabic'", fontSize: "26px" } : undefined}
                            >
                              {folder.name[langKey]}
                            </h3>
                            <p 
                              className={`text-gray-300 text-xs md:text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${t.fontClassSans}`}
                              style={
                                language === 'ur'
                                  ? { fontSize: "15px", lineHeight: "1.7" }
                                  : language === 'hi'
                                  ? { fontFamily: "Arial, sans-serif" }
                                  : undefined
                              }
                            >
                              {folder.description[langKey]}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="images"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col"
              >
                {/* Album Header Area */}
                <div className="mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-brand-gold/20 pb-6">
                  <div>
                    <h3 
                      className={`text-3xl md:text-4xl text-brand-gold mb-2 ${t.fontClassSerif}`}
                      style={language === 'ur' ? { fontSize: "60px", fontFamily: "'Lateef', serif", fontWeight: "normal" } : (language === 'hi' ? { fontSize: "50px" } : (language === 'en' ? { fontSize: "40px" } : undefined))}
                    >
                      {activeFolder?.name[langKey]}
                    </h3>
                    <p 
                      className={`text-gray-400 text-sm md:text-base max-w-2xl ${t.fontClassSans}`}
                      style={language === 'ur' ? { fontSize: "21px", lineHeight: "1.8" } : (language === 'hi' ? { fontSize: "20px", fontFamily: "Arial, sans-serif" } : (language === 'en' ? { fontSize: "19px" } : undefined))}
                    >
                      {activeFolder?.description[langKey]}
                    </p>
                  </div>
                  <button 
                    onClick={() => setActiveFolderId(null)} 
                    className="shrink-0 inline-flex items-center text-brand-gold hover:text-black hover:bg-brand-gold transition-colors gap-2 text-xs uppercase tracking-widest font-bold px-5 py-2.5 rounded-full border border-brand-gold/50 cursor-pointer"
                    style={language === 'ur' ? { fontSize: "20px" } : (language === 'hi' ? { fontSize: "20px" } : (language === 'en' ? { fontSize: "15px" } : undefined))}
                  >
                    {language === 'ur' ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
                    {ui.backToAlbums}
                  </button>
                </div>

                {/* Grid of Photos */}
                {currentImages.length > 0 ? (
                  <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                    {currentImages.map((image, idx) => (
                      <motion.div
                        key={image.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="break-inside-avoid"
                      >
                        <div 
                          onClick={() => openLightbox(idx)}
                          className="group relative rounded-[16px] overflow-hidden cursor-pointer border border-brand-gold/10 shadow-[0_5px_15px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.25)] hover:border-brand-gold/50 transition-all duration-500 bg-[#0a0a0a]"
                        >
                          <div className="absolute inset-0 bg-brand-gold/20 opacity-0 group-hover:opacity-100 mix-blend-overlay transition-opacity duration-500 z-10 pointer-events-none" />
                          <img 
                            src={image.src} 
                            alt={image.caption[langKey]} 
                            className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700 ease-out"
                            loading="lazy"
                          />
                          {image.type === 'video' && (
                            <div className="absolute inset-0 flex items-center justify-center z-15 pointer-events-none">
                              <div className="w-16 h-16 bg-brand-gold/80 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:bg-brand-gold transition-all duration-300 shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
                                <Play className="w-8 h-8 text-black ml-1" fill="currentColor" />
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-32 text-center border border-white/5 rounded-[20px] bg-[#0c0c0c]"
                  >
                    <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center border border-brand-gold/20 mb-6">
                      <Images className="w-8 h-8 text-brand-gold/40" />
                    </div>
                    <h3 className={`text-2xl md:text-3xl text-gray-300 mb-3 ${t.fontClassSerif}`}>{ui.albumEmpty}</h3>
                    <p className={`text-gray-500 italic max-w-md text-base ${t.fontClassSans}`}>
                      {ui.albumEmptyDesc}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Full-Screen Lightbox Viewer */}
      <AnimatePresence>
        {lightboxIndex !== null && currentImages[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]/95 backdrop-blur-xl"
            onClick={closeLightbox}
          >
            {/* Top Controls */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-[110]">
              <div className="px-5 py-2 rounded-full bg-white/5 backdrop-blur-md border border-brand-gold/30 text-brand-gold text-sm md:text-base tracking-[0.2em] font-bold">
                {lightboxIndex + 1} / {currentImages.length}
              </div>
              <button 
                onClick={closeLightbox}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-brand-gold hover:text-black hover:border-brand-gold transition-all cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={prevImage}
              aria-label="Previous"
              className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-brand-gold hover:text-black transition-all z-[110] backdrop-blur-md border border-white/10 hover:border-brand-gold cursor-pointer"
            >
              <ChevronLeft size={32} />
            </button>

            <button 
              onClick={nextImage}
              aria-label="Next"
              className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-brand-gold hover:text-black transition-all z-[110] backdrop-blur-md border border-white/10 hover:border-brand-gold cursor-pointer"
            >
              <ChevronRight size={32} />
            </button>

            {/* Main Image View */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-full max-w-6xl max-h-[100vh] p-4 md:p-12 flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {currentImages[lightboxIndex].type === 'video' ? (
                <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-brand-gold/20 bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${currentImages[lightboxIndex].videoId}?autoplay=1`}
                    title={currentImages[lightboxIndex].caption[langKey]}
                    className="absolute top-0 left-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <img 
                  src={currentImages[lightboxIndex].src} 
                  alt={currentImages[lightboxIndex].caption[langKey]} 
                  className="max-w-full max-h-[75vh] object-contain rounded-[10px] shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
