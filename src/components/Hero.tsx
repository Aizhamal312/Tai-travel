import { MessageCircle, Mail, Calendar, Mountain, Users, Home, Clock } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface HeroProps {
  currentLang: Language;
  onOpenBooking: () => void;
}

export function Hero({ currentLang, onOpenBooking }: HeroProps) {
  const t = translations[currentLang];
  const heroImgUrl = '/images/hero.jpg';
  const whatsappUrl = 'https://wa.me/996220073174?text=' + encodeURIComponent('Здравствуйте! Я хочу узнать подробнее о конном туре на озеро Сон-Куль.');
  const gmailUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=abibullakyzyaizhamal94@gmail.com&su=' + encodeURIComponent('Бронирование конного тура на озеро Сон-Куль');

  return (
    <section className="relative min-h-[88vh] flex flex-col justify-between overflow-hidden bg-[#0F2922]">
      {/* Background Image with Measured Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImgUrl}
          alt="Horse riding expedition along Lake Song-Kul in Kyrgyzstan"
          referrerPolicy="no-referrer"
          fetchPriority="high"
          className="w-full h-full object-cover object-center scale-105 transform motion-safe:animate-fade-in"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src.endsWith('/images/hero.jpg')) {
              target.src = '/images/hero_songkul_horses_1791824969324.jpg';
            } else {
              target.style.display = 'none';
            }
          }}
        />
        {/* Measured dark overlay for WCAG AA readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1D18] via-[#0F2922]/75 to-[#0F2922]/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-transparent via-[#0A1D18]/40 to-[#0A1D18]/85" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-12 flex-1 flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Subtle Tagline / Location Kicker (no pills) */}
          <div className="text-xs sm:text-sm font-semibold tracking-wider text-[#A7F3D0] uppercase mb-4 flex items-center gap-2">
            <span className="w-2 h-0.5 bg-[#34D399]" />
            <span>{t.heroTagline}</span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-6 text-balance font-['Plus_Jakarta_Sans']">
            {t.heroTitle}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-[#E2EBE6] leading-relaxed mb-8 max-w-2xl font-normal">
            {t.heroSubtitle}
          </p>

          {/* Action CTAs: Book + WhatsApp + Gmail (NO 24/7 label!) */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 mb-6">
            {/* Primary Action Button */}
            <button
              type="button"
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-[#0F2922] bg-[#34D399] hover:bg-[#2BB683] rounded-lg shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer whitespace-nowrap shrink-0"
            >
              <Calendar className="w-4 h-4 text-[#0F2922]" />
              <span>{t.heroCtaBook}</span>
            </button>

            {/* WhatsApp CTA (no 24/7 label) */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-white bg-[#25D366] hover:bg-[#1EBE5D] rounded-lg shadow-md transition-all transform hover:-translate-y-0.5 whitespace-nowrap shrink-0"
              title="Написать в WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-white text-white" />
              <span>WhatsApp +996 220 073 174</span>
            </a>

            {/* Gmail CTA next to WhatsApp */}
            <a
              href={gmailUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-white bg-[#EA4335] hover:bg-[#D93025] rounded-lg shadow-md transition-all transform hover:-translate-y-0.5 whitespace-nowrap shrink-0"
              title="Написать на Gmail (abibullakyzyaizhamal94@gmail.com)"
            >
              <Mail className="w-4 h-4 text-white" />
              <span>{t.heroCtaGmail}</span>
            </a>
          </div>

          {/* Email helper note */}
          <div className="text-xs text-[#94A3B8] flex items-center gap-2">
            <span>Email:</span>
            <a
              href="mailto:abibullakyzyaizhamal94@gmail.com"
              className="text-[#E2EBE6] hover:underline underline-offset-2"
            >
              abibullakyzyaizhamal94@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* 4-Item Highlights Strip (Full-width row below hero split) */}
      <div className="relative z-10 w-full border-t border-white/10 bg-[#0A1D18]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-[#34D399] shrink-0">
                <Mountain className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg sm:text-xl font-bold text-white tabular-nums">
                  {t.heroStatAltitude}
                </div>
                <div className="text-xs text-[#94A3B8] font-normal">
                  {t.heroStatAltitudeLabel}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-[#34D399] shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg sm:text-xl font-bold text-white tabular-nums">
                  {t.heroStatDuration}
                </div>
                <div className="text-xs text-[#94A3B8] font-normal">
                  {t.heroStatDurationLabel}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-[#34D399] shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg sm:text-xl font-bold text-white tabular-nums">
                  {t.heroStatGroup}
                </div>
                <div className="text-xs text-[#94A3B8] font-normal">
                  {t.heroStatGroupLabel}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-[#34D399] shrink-0">
                <Home className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg sm:text-xl font-bold text-white tabular-nums">
                  {t.heroStatYurts}
                </div>
                <div className="text-xs text-[#94A3B8] font-normal">
                  {t.heroStatYurtsLabel}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
