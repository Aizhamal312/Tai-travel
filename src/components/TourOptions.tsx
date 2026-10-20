import { Check, ArrowRight, Coins } from 'lucide-react';
import { Language, Currency, TourPackage } from '../types';
import { translations } from '../i18n/translations';
import { getLocalizedTourPrice, formatCurrencyPrice, CURRENCY_OPTIONS } from '../utils/currency';

interface TourOptionsProps {
  currentLang: Language;
  currentCurrency?: Currency;
  onCurrencyChange?: (currency: Currency) => void;
  onSelectTour: (tourId: string) => void;
}

export function TourOptions({
  currentLang,
  currentCurrency = 'EUR',
  onCurrencyChange,
  onSelectTour,
}: TourOptionsProps) {
  const t = translations[currentLang];

  return (
    <section id="tours" className="py-20 sm:py-28 bg-[#FBF9F5] border-b border-[#E2DDD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-10">
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

        {/* Currency Converter Bar (EUR, USD, RUB, KGS) directly above prices */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 mb-10 rounded-2xl bg-white border border-[#E2DDD5] shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#EBF7F2] text-[#0F4C3A] flex items-center justify-center shrink-0">
              <Coins className="w-5 h-5 text-[#0F4C3A]" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-[#0F2922] flex items-center gap-2">
                <span>
                  {currentLang === 'ru' ? 'Конвертер валют цен туров' :
                   currentLang === 'fr' ? 'Convertisseur de devise des circuits' :
                   currentLang === 'de' ? 'Währungsumrechner für Tourpreise' :
                   currentLang === 'pl' ? 'Przelicznik walut dla cen wypraw' :
                   'Tour Price Currency Converter'}
                </span>
                <span className="text-[10px] font-semibold bg-[#EBF7F2] text-[#0F4C3A] px-2 py-0.5 rounded-full">
                  EUR · USD · RUB · KGS
                </span>
              </div>
              <div className="text-[11px] text-[#64748B]">
                {currentLang === 'ru' ? 'Цены переключаются вместе с языком сайта или выберите валюту вручную:' :
                 currentLang === 'fr' ? 'Les prix s’ajustent avec la langue ou choisissez manuellement :' :
                 currentLang === 'de' ? 'Preise passen sich der Sprache an oder wählen Sie manuell:' :
                 currentLang === 'pl' ? 'Ceny dostosowują się do języka lub wybierz walutę ręcznie:' :
                 'Prices auto-sync with language or select your preferred currency:'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#F8F6F0] border border-[#E2DDD5]">
            {CURRENCY_OPTIONS.map((opt) => {
              const isSelected = opt.code === currentCurrency;
              return (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => onCurrencyChange?.(opt.code)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#0F4C3A] text-white shadow-xs'
                      : 'text-[#475569] hover:bg-white hover:text-[#0F2922]'
                  }`}
                  title={`${opt.name} (${opt.symbol})`}
                >
                  <span className="text-sm leading-none">{opt.flag}</span>
                  <span>{opt.code}</span>
                  <span
                    className={`text-[10px] font-mono ${
                      isSelected ? 'text-[#A7F3D0]' : 'text-[#94A3B8]'
                    }`}
                  >
                    {opt.symbol}
                  </span>
                </button>
              );
            })}
          </div>
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
                  {/* Tour Cover Image */}
                  <div className="relative w-full h-48 sm:h-52 rounded-xl overflow-hidden mb-5 border border-black/10 shadow-xs group">
                    <img
                      src={pkg.image || (idx === 0 ? '/images/tour-express.jpg' : idx === 1 ? '/images/tour-classic.jpg' : '/images/tour-grand.jpg')}
                      alt={pkg.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span
                        className={`text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md backdrop-blur-md shadow-xs ${
                          isFeatured
                            ? 'bg-[#0F2922]/90 text-[#34D399] border border-[#34D399]/40'
                            : 'bg-white/95 text-[#0F4C3A] border border-[#E2DDD5]'
                        }`}
                      >
                        {pkg.badge}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`text-xs font-semibold ${
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
                      className={`text-2xl sm:text-3xl font-extrabold tabular-nums flex items-baseline gap-2 ${
                        isFeatured ? 'text-white' : 'text-[#0F4C3A]'
                      }`}
                    >
                      <span>
                        {getLocalizedTourPrice(
                          pkg.basePriceUSD || (idx === 0 ? 320 : idx === 1 ? 490 : 720),
                          currentCurrency,
                          currentLang
                        )}
                      </span>
                    </div>
                    {currentCurrency !== 'USD' && (
                      <div
                        className={`text-[11px] mt-1 tabular-nums ${
                          isFeatured ? 'text-[#A7F3D0]' : 'text-[#64748B]'
                        }`}
                      >
                        ≈ ${idx === 0 ? 320 : idx === 1 ? 490 : 720} USD
                        {currentCurrency !== 'KGS' && (
                          <span> · {formatCurrencyPrice(idx === 0 ? 320 : idx === 1 ? 490 : 720, 'KGS')}</span>
                        )}
                      </div>
                    )}
                  </div>

                  <p
                    className={`text-sm leading-relaxed mb-6 ${
                      isFeatured ? 'text-[#D1DDD6]' : 'text-[#475569]'
                    }`}
                  >
                    {pkg.description}
                  </p>

                  <div className="space-y-2 mb-6 text-xs">
                    <div
                      className={`flex items-center justify-between py-1.5 border-b ${
                        isFeatured ? 'border-white/10' : 'border-[#F1EFE9]'
                      }`}
                    >
                      <span className={isFeatured ? 'text-[#94A3B8]' : 'text-[#64748B]'}>
                        Сложность:
                      </span>
                      <span className="font-semibold">{pkg.difficulty}</span>
                    </div>
                    <div
                      className={`flex items-center justify-between py-1.5 border-b ${
                        isFeatured ? 'border-white/10' : 'border-[#F1EFE9]'
                      }`}
                    >
                      <span className={isFeatured ? 'text-[#94A3B8]' : 'text-[#64748B]'}>
                        Для кого:
                      </span>
                      <span className="font-semibold">{pkg.idealFor}</span>
                    </div>
                  </div>

                  {/* Feature check list */}
                  <div className="space-y-2.5 mb-8">
                    {pkg.features.map((feat: string, fIdx: number) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs">
                        <Check
                          className={`w-4 h-4 mt-0.5 shrink-0 ${
                            isFeatured ? 'text-[#34D399]' : 'text-[#0F4C3A]'
                          }`}
                        />
                        <span
                          className={`leading-relaxed ${
                            isFeatured ? 'text-[#E2E8F0]' : 'text-[#334155]'
                          }`}
                        >
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  type="button"
                  onClick={() => onSelectTour(pkg.id)}
                  className={`w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isFeatured
                      ? 'bg-[#34D399] hover:bg-[#2ecc8f] text-[#0F2922] shadow-md hover:shadow-lg'
                      : 'bg-[#0F4C3A] hover:bg-[#0B3A2C] text-white shadow-xs'
                  }`}
                >
                  <span>{t.toursSelectBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
