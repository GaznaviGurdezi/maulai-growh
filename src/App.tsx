/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { AboutChairman } from './components/AboutChairman';
import { KhuddamEKhwaja } from './components/KhuddamEKhwaja';
import { SpiritOfKhidmat } from './components/SpiritOfKhidmat';
import { ChairmanMessage } from './components/ChairmanMessage';
import { Mission } from './components/Mission';
import { Activities } from './components/Activities';
import { SacredDegs } from "./components/SacredDegs";
import { Events } from './components/Events';
import { Gallery } from './components/Gallery';
import { News } from './components/News';
import { ContactFooter } from './components/ContactFooter';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { MasoomeenBackground } from './components/MasoomeenBackground';
import { LeadershipHeritage } from './components/LeadershipHeritage';
import { KhwajaMoinuddin } from './components/KhwajaMoinuddin';
import { DonationPage } from "./components/DonationPage";
import { HussainiLangar } from './components/HussainiLangar';
import { useEffect } from 'react';

import { ContactUs } from './components/ContactUs';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Layout() {
  return (
    <div className="relative flex flex-col min-h-screen bg-brand-black text-gray-200 selection:bg-brand-crimson selection:text-white">
      <ScrollToTop />
      <MasoomeenBackground />
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <ContactFooter />
      
      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/919680872049" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 hover:shadow-[0_0_20px_rgba(37,211,102,0.4)]"
        title="Chat with us on WhatsApp"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.662-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <LanguageProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<><Hero /><About /><AboutChairman /><SpiritOfKhidmat /></>} />
            <Route path="about" element={<div className="pt-24 min-h-screen"><About /><KhuddamEKhwaja /><Mission /></div>} />
            <Route path="leadership" element={<div className="pt-24 min-h-screen"><LeadershipHeritage /></div>} />
            <Route path="chairman" element={<div className="pt-24 min-h-screen"><ChairmanMessage /></div>} />
            <Route path="mission" element={<div className="pt-24 min-h-screen"><KhuddamEKhwaja /><Mission /></div>} />
            <Route path="activities" element={<div className="pt-24 min-h-screen"><SacredDegs /></div>} />
            <Route path="langar" element={<div className="pt-24 min-h-screen"><HussainiLangar /></div>} />
            <Route path="events" element={<div className="pt-24 min-h-screen"><Events /></div>} />
            <Route path="gallery" element={<div className="pt-24 min-h-screen"><Gallery /></div>} />
            <Route path="news" element={<div className="pt-24 min-h-screen"><News /></div>} />
            <Route path="chishty" element={<div className="pt-24 min-h-screen"><KhwajaMoinuddin /></div>} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="donate" element={<DonationPage />} />
          </Route>
        </Routes>
      </LanguageProvider>
    </Router>
  );
}

