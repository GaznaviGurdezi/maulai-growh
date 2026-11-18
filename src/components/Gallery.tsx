import { ImageGallery } from "./ImageGallery";
import { useLanguage } from "../context/LanguageContext";

export function Gallery() {
  const { t } = useLanguage();

  return (
    <section id="gallery" className="bg-brand-dark pt-4 sm:pt-8 pb-20 relative">
      <div className="absolute inset-0 bg-islamic-pattern mix-blend-overlay opacity-10 pointer-events-none" />
      <ImageGallery />
    </section>
  );
}
