import { useState } from 'react';
import { Language } from './types';
import { WorldClock } from './components/WorldClock';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TourOptions } from './components/TourOptions';
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
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedTourId, setSelectedTourId] = useState<string>('classic-5d');

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

      {/* 2. Top Header with 3-Zone contract and Language Switcher */}
      <Header
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onOpenBooking={() => setIsBookingModalOpen(true)}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 3. Hero Section with visual backdrop, CTAs, highlights */}
        <Hero
          currentLang={currentLang}
          onOpenBooking={() => setIsBookingModalOpen(true)}
        />

        {/* 4. Tour Packages (3d, 5d, 7d) */}
        <TourOptions
          currentLang={currentLang}
          onSelectTour={handleSelectTour}
        />

        {/* 5. Detailed Itinerary (D-1 to D-5) fully localized */}
        <Itinerary
          currentLang={currentLang}
          onOpenBooking={() => setIsBookingModalOpen(true)}
        />

        {/* 6. About Lake Song-Kul & Nomadic Culture */}
        <AboutTour currentLang={currentLang} />

        {/* 7. What's Included & Excluded */}
        <IncludedExcluded currentLang={currentLang} />

        {/* 8. Gallery with Photo Lightbox */}
        <Gallery currentLang={currentLang} />

        {/* 9. International Traveler Reviews */}
        <Reviews currentLang={currentLang} />

        {/* 10. Packing Checklist & FAQ Accordion */}
        <PackingAndFAQ currentLang={currentLang} />

        {/* 11. Lead Capture Form & Direct Contact Channels */}
        <BookingSection
          currentLang={currentLang}
          selectedTourId={selectedTourId}
        />
      </main>

      {/* 12. Footer */}
      <Footer currentLang={currentLang} />

      {/* Quick Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        currentLang={currentLang}
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
