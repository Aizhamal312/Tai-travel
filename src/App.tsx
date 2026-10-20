import { useState } from 'react';
import { Language, Currency } from './types';
import { getDefaultCurrencyForLanguage } from './utils/currency';
import { WorldClock } from './components/WorldClock';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TourOptions } from './components/TourOptions';
import { InteractiveRouteMap } from './components/InteractiveRouteMap';
import { Itinerary } from './components/Itinerary';
import { AboutTour } from './components/AboutTour';
import { IncludedExcluded } from './components/IncludedExcluded';
import { Gallery } from './components/Gallery';
import { Reviews } from './components/Reviews';
import { PackingAndFAQ } from './components/PackingAndFAQ';
import { BookingSection } from './components/BookingSection';
import { BookingModal } from './components/BookingModal';
import { Footer } from './components/Footer';
import { MessageCircle, Mail } from 'lucide-react';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('ru');
  const [currentCurrency, setCurrentCurrency] = useState<Currency>(getDefaultCurrencyForLanguage('ru'));
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedTourId, setSelectedTourId] = useState<string>('classic-5d');

  // When language switches, automatically switch currency and tour prices together
  const handleLanguageChange = (newLang: Language) => {
    setCurrentLang(newLang);
    setCurrentCurrency(getDefaultCurrencyForLanguage(newLang));
  };

  const handleSelectTour = (tourId: string) => {
    setSelectedTourId(tourId);
    // Smooth scroll down to booking section
    const bookingElem = document.getElementById('contact');
    if (bookingElem) {
      bookingElem.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsBookingModalOpen(true);
    }
  };

  const whatsappPhone = '996220073174';
  const gmailEmail = 'abibullakyzyaizhamal94@gmail.com';
  const floatingWhatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent('Здравствуйте! Я хочу узнать о конных турах на Сон-Куль.')}`;
  const floatingGmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${gmailEmail}&su=${encodeURIComponent('Вопрос по туру на Сон-Куль')}`;

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1E293B] font-['Plus_Jakarta_Sans',sans-serif] flex flex-col selection:bg-[#0F4C3A] selection:text-white">
      {/* 1. World Clocks Bar (Bishkek, France, Japan) with menu bar typography */}
      <WorldClock currentLang={currentLang} />

      {/* 2. Top Header with 3-Zone contract, Language Switcher and Currency Switcher */}
      <Header
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        currentCurrency={currentCurrency}
        onCurrencyChange={setCurrentCurrency}
        onOpenBooking={() => setIsBookingModalOpen(true)}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 3. Hero Section with visual backdrop, CTAs, highlights */}
        <Hero
          currentLang={currentLang}
          onOpenBooking={() => setIsBookingModalOpen(true)}
        />

        {/* 4. Tour Packages (3d, 5d, 7d) with integrated Currency Converter (EUR, USD, RUB, KGS) */}
        <TourOptions
          currentLang={currentLang}
          currentCurrency={currentCurrency}
          onCurrencyChange={setCurrentCurrency}
          onSelectTour={handleSelectTour}
        />

        {/* 5. Interactive Route Map (Bishkek to Song-Kul & Mountain Passes) */}
        <InteractiveRouteMap
          currentLang={currentLang}
          onOpenBooking={() => setIsBookingModalOpen(true)}
        />

        {/* 6. Detailed Itinerary (D-1 to D-5) fully localized */}
        <Itinerary
          currentLang={currentLang}
          onOpenBooking={() => setIsBookingModalOpen(true)}
        />

        {/* 7. About Lake Song-Kul & Nomadic Culture */}
        <AboutTour currentLang={currentLang} />

        {/* 8. What's Included & Excluded */}
        <IncludedExcluded currentLang={currentLang} />

        {/* 9. Gallery with Photo Lightbox */}
        <Gallery currentLang={currentLang} />

        {/* 10. International Traveler Reviews */}
        <Reviews currentLang={currentLang} />

        {/* 11. Packing Checklist & FAQ Accordion */}
        <PackingAndFAQ currentLang={currentLang} />

        {/* 12. Lead Capture Form & Direct Contact Channels */}
        <BookingSection
          currentLang={currentLang}
          currentCurrency={currentCurrency}
          selectedTourId={selectedTourId}
        />
      </main>

      {/* 13. Footer */}
      <Footer currentLang={currentLang} />

      {/* Quick Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        currentLang={currentLang}
        currentCurrency={currentCurrency}
      />

      {/* Floating Messenger Quick Button Pill (Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
        {/* Gmail Quick Button */}
        <a
          href={floatingGmailUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-full bg-[#EA4335] hover:bg-[#D93025] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105"
          title="Написать на Gmail (abibullakyzyaizhamal94@gmail.com)"
          aria-label="Send email via Gmail"
        >
          <Mail className="w-5 h-5 text-white" />
        </a>

        {/* WhatsApp Quick Button (NO 24/7 label!) */}
        <a
          href={floatingWhatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-lg transition-transform hover:scale-105"
          title="Написать в WhatsApp: +996 220 073 174"
          aria-label="Contact on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-white text-white" />
          <span className="text-xs font-bold hidden sm:inline">WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
