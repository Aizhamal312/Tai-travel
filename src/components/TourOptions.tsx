import { Check, ArrowRight } from 'lucide-react';
import { Language, TourPackage } from '../types';
import { translations } from '../i18n/translations';

interface TourOptionsProps {
  currentLang: Language;
  onSelectTour: (tourId: string) => void;
}

export function TourOptions({ currentLang, onSelectTour }: TourOptionsProps) {
  const t = translations[currentLang];

  return (
    <section id="tours" className="py-20 sm:py-28 bg-[#FBF9F5] border-b border-[#E2DDD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#0F4C3A] mb-3 flex items-center gap-2">
            <span className="w-2 h-0.5 bg-[#0F4C3A]" />
            <span>Tour Packages · 3 to 7 Days</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F2922] tracking-tight leading-tight mb-4 text-balance font-['Plus_Jakarta_Sans']">
            {t.toursTitle}
          </h2>
          <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
            {t.toursSubtitle}
          </p>
        </div>

        {/* 3 Tour Cards (Asymmetric prominence: middle card highlighted) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {t.tourPackages.map((pkg: TourPackage, idx: number) => {
            const isFeatured = idx === 1; // Middle card (Classic 5-day)
            return (
              <div
                key={pkg.id}
                className={`flex flex-col justify-between rounded-2xl p-7 sm:p-8 transition-all ${
                  isFeatured
                    ? 'bg-[#0F2922] text-white border-2 border-[#34D399] shadow-xl relative'
                    : 'bg-white text-[#1E293B] border border-[#E2DDD5] shadow-xs hover:border-[#0F4C3A]'
                }`}
              >
                {/* Top header info */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className={`text-xs font-bold tracking-wider uppercase ${
                        isFeatured ? 'text-[#34D399]' : 'text-[#0F4C3A]'
                      }`}
                    >
                      {pkg.badge}
                    </span>
                    <span
                      className={`text-xs font-medium ${
                        isFeatured ? 'text-[#94A3B8]' : 'text-[#64748B]'
                      }`}
                    >
                      {pkg.duration}
                    </span>
                  </div>

                  <h3
                    className={`text-xl sm:text-2xl font-extrabold mb-3 leading-snug ${
                      isFeatured ? 'text-white' : 'text-[#0F2922]'
                    }`}
                  >
                    {pkg.title}
                  </h3>

                  <div className="mb-6">
                    <div
                      className={`text-2xl sm:text-3xl font-extrabold tabular-nums ${
                        isFeatured ? 'text-white' : 'text-[#0F4C3A]'
                      }`}
                    >
                      {pkg.price}
                    </div>
                  </div>

                  <p
                    className={`text-sm leading-relaxed mb-6 ${
                      isFeatured ? 'text-[#D1DDD6]' : 'text-[#475569]'
                    }`}
                  >
                    {pkg.description}
                  </p>

                  {/* Difficulty & Suitability */}
                  <div
                    className={`space-y-2 py-4 mb-6 border-y text-xs ${
                      isFeatured
                        ? 'border-white/10 text-[#CBD5E1]'
                        : 'border-[#E2DDD5] text-[#475569]'
                    }`}
                  >
                    <div>
                      <strong className={isFeatured ? 'text-white' : 'text-[#0F2922]'}>
                        {t.toursDifficulty}:
                      </strong>{' '}
                      {pkg.difficulty}
                    </div>
                    <div>
                      <strong className={isFeatured ? 'text-white' : 'text-[#0F2922]'}>
                        {t.toursIdealFor}:
                      </strong>{' '}
                      {pkg.idealFor}
                    </div>
                  </div>

                  {/* Included features list */}
                  <div className="space-y-2.5 mb-8">
                    {pkg.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                        <Check
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isFeatured ? 'text-[#34D399]' : 'text-[#0F4C3A]'
                          }`}
                        />
                        <span className={isFeatured ? 'text-[#E2EBE6]' : 'text-[#334155]'}>
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <div>
                  <button
                    type="button"
                    onClick={() => onSelectTour(pkg.id)}
                    className={`w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      isFeatured
                        ? 'bg-[#34D399] hover:bg-[#2BB683] text-[#0F2922] shadow-md'
                        : 'bg-[#0F4C3A] hover:bg-[#0B3A2C] text-white shadow-xs'
                    }`}
                  >
                    <span>{t.toursSelectBtn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
