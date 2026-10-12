import { MessageCircle, Mail, MapPin, Compass, ArrowUp } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface FooterProps {
  currentLang: Language;
}

export function Footer({ currentLang }: FooterProps) {
  const t = translations[currentLang];
  const whatsappUrl = 'https://wa.me/996220073174?text=' + encodeURIComponent('Здравствуйте! Вопрос по турам на озеро Сон-Куль.');
  const gmailUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=abibullakyzyaizhamal94@gmail.com&su=' + encodeURIComponent('Вопрос по туру на Сон-Куль');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A1D18] text-[#D1DDD6] border-t border-[#1D3B31]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-[#34D399] text-[#0F2922] flex items-center justify-center font-bold">
                <Compass className="w-5 h-5 text-[#0F2922]" />
              </span>
              <span className="font-extrabold text-lg text-white tracking-wide">
                {t.brand}
              </span>
            </div>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              {t.footerDesc}
            </p>
            <div className="text-xs text-[#34D399] italic">
              {t.footerNomadPhilosophy}: «Лошадь — крылья человека»
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              {t.footerQuickLinks}
            </div>
            <ul className="space-y-2 text-xs text-[#94A3B8]">
              <li>
                <a href="#tours" className="hover:text-white transition-colors">
                  {t.navTours}
                </a>
              </li>
              <li>
                <a href="#itinerary" className="hover:text-white transition-colors">
                  {t.navItinerary}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  {t.navAbout}
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">
                  {t.navGallery}
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  {t.navReviews}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  {t.navContact}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contacts & Channels */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              {t.footerContactTitle}
            </div>
            <div className="space-y-2.5 text-xs text-[#94A3B8]">
              {/* WhatsApp without 24/7 label */}
              <div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#34D399] hover:underline font-semibold"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-[#34D399]" />
                  <span>WhatsApp: +996 220 073 174</span>
                </a>
              </div>

              {/* Gmail button next to it */}
              <div>
                <a
                  href={gmailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#F87171] hover:underline font-semibold"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span className="break-all">abibullakyzyaizhamal94@gmail.com</span>
                </a>
              </div>

              <div className="flex items-start gap-2 pt-2 text-[#94A3B8]">
                <MapPin className="w-3.5 h-3.5 text-[#34D399] shrink-0 mt-0.5" />
                <span>Бишкек & село Кочкор, Кыргызстан</span>
              </div>
            </div>
          </div>

          {/* Col 4: Cultural Philosophy & Altitude Note */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              {t.footerNomadPhilosophy}
            </div>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              {t.footerPhilosophyText}
            </p>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-[#A7F3D0]">
              Сезон экспедиций: Июнь — Сентябрь. Высота стоянки: 3016 м.
            </div>
          </div>
        </div>

        {/* Bottom line: Copyright & Scroll to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <div>{t.footerCopyright}</div>
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
          >
            <span>Наверх</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
