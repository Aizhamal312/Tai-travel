import { useState } from 'react';
import { Menu, X, Globe, ChevronDown, Compass } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenBooking: () => void;
}

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'pl', label: 'Polski', flag: '🇵🇱' },
];

export function Header({ currentLang, onLanguageChange, onOpenBooking }: HeaderProps) {
  const t = translations[currentLang];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const activeLangItem = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#E2DDD5] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Brand wordmark */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-[#0F2922] whitespace-nowrap shrink-0 group"
          >
            <span className="w-9 h-9 rounded-lg bg-[#0F4C3A] text-white flex items-center justify-center shadow-xs group-hover:bg-[#0B3A2C] transition-colors">
              <Compass className="w-5 h-5 text-[#34D399]" />
            </span>
            <span className="font-extrabold tracking-wide text-lg sm:text-xl text-[#0F2922]">
              {t.brand}
            </span>
          </a>

          {/* Zone 2: Navigation Links (single-line, hover underline, no pills) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#334155]">
            <a
              href="#tours"
              className="whitespace-nowrap shrink-0 hover:text-[#0F4C3A] transition-colors py-1"
            >
              {t.navTours}
            </a>
            <a
              href="#itinerary"
              className="whitespace-nowrap shrink-0 hover:text-[#0F4C3A] transition-colors py-1"
            >
              {t.navItinerary}
            </a>
            <a
              href="#about"
              className="whitespace-nowrap shrink-0 hover:text-[#0F4C3A] transition-colors py-1"
            >
              {t.navAbout}
            </a>
            <a
              href="#gallery"
              className="whitespace-nowrap shrink-0 hover:text-[#0F4C3A] transition-colors py-1"
            >
              {t.navGallery}
            </a>
            <a
              href="#reviews"
              className="whitespace-nowrap shrink-0 hover:text-[#0F4C3A] transition-colors py-1"
            >
              {t.navReviews}
            </a>
            <a
              href="#contact"
              className="whitespace-nowrap shrink-0 hover:text-[#0F4C3A] transition-colors py-1"
            >
              {t.navContact}
            </a>
          </nav>

          {/* Zone 3: Language Selector + Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Language Switcher Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#D5CEC2] hover:border-[#0F4C3A] text-xs font-medium text-[#1E293B] bg-white shadow-xs transition-colors cursor-pointer"
                aria-expanded={langDropdownOpen}
                aria-haspopup="true"
              >
                <Globe className="w-3.5 h-3.5 text-[#0F4C3A]" />
                <span className="mr-0.5">{activeLangItem.flag}</span>
                <span className="uppercase font-semibold tracking-wider">{activeLangItem.code}</span>
                <ChevronDown className="w-3 h-3 text-[#64748B]" />
              </button>

              {langDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setLangDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-1.5 w-40 bg-white rounded-lg shadow-lg border border-[#E2DDD5] py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                    {LANGUAGES.map((item) => (
                      <button
                        key={item.code}
                        type="button"
                        onClick={() => {
                          onLanguageChange(item.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left transition-colors cursor-pointer ${
                          currentLang === item.code
                            ? 'bg-[#EBF7F2] text-[#0F4C3A] font-semibold'
                            : 'text-[#334155] hover:bg-[#F8F6F0]'
                        }`}
                      >
                        <span className="text-base">{item.flag}</span>
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={onOpenBooking}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold text-white bg-[#0F4C3A] hover:bg-[#0B3A2C] rounded-lg transition-colors shadow-xs whitespace-nowrap shrink-0 cursor-pointer"
            >
              {t.bookTourBtn}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#334155] hover:text-[#0F4C3A] hover:bg-[#EAE4D8]/50 rounded-lg transition-colors cursor-pointer"
              aria-label="Open mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E2DDD5] bg-[#FBF9F5] px-4 pt-4 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2 text-base font-medium text-[#1E293B]">
            <a
              href="#tours"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-md hover:bg-[#EAE4D8]/50 text-[#1E293B]"
            >
              {t.navTours}
            </a>
            <a
              href="#itinerary"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-md hover:bg-[#EAE4D8]/50 text-[#1E293B]"
            >
              {t.navItinerary}
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-md hover:bg-[#EAE4D8]/50 text-[#1E293B]"
            >
              {t.navAbout}
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-md hover:bg-[#EAE4D8]/50 text-[#1E293B]"
            >
              {t.navGallery}
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-md hover:bg-[#EAE4D8]/50 text-[#1E293B]"
            >
              {t.navReviews}
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-md hover:bg-[#EAE4D8]/50 text-[#1E293B]"
            >
              {t.navContact}
            </a>
          </nav>

          {/* Mobile Language Selector Tabs */}
          <div className="pt-3 border-t border-[#E2DDD5]">
            <div className="text-xs font-medium text-[#64748B] mb-2">Язык / Language / Langue:</div>
            <div className="grid grid-cols-5 gap-1.5">
              {LANGUAGES.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => {
                    onLanguageChange(item.code);
                  }}
                  className={`py-1.5 px-2 text-xs rounded-md flex flex-col items-center justify-center gap-0.5 border cursor-pointer ${
                    currentLang === item.code
                      ? 'bg-[#0F4C3A] text-white border-[#0F4C3A]'
                      : 'bg-white text-[#334155] border-[#D5CEC2]'
                  }`}
                >
                  <span className="text-sm">{item.flag}</span>
                  <span className="uppercase font-bold text-[10px]">{item.code}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 text-sm font-semibold text-white bg-[#0F4C3A] hover:bg-[#0B3A2C] rounded-lg shadow-xs text-center cursor-pointer"
            >
              {t.bookTourBtn}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
