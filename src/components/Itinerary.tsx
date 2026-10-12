import { useState } from 'react';
import { Mountain, Clock, MapPin, Coffee, Moon, CheckCircle2, ChevronRight } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface ItineraryProps {
  currentLang: Language;
  onOpenBooking: () => void;
}

export function Itinerary({ currentLang, onOpenBooking }: ItineraryProps) {
  const t = translations[currentLang];
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  const activeDay = t.itineraryDays[activeDayIndex] || t.itineraryDays[0];

  return (
    <section id="itinerary" className="py-20 sm:py-28 bg-[#F4F1EA] border-b border-[#E2DDD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#0F4C3A] mb-3 flex items-center gap-2">
            <span className="w-2 h-0.5 bg-[#0F4C3A]" />
            <span>Itinerary · D-1 to D-5</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F2922] tracking-tight leading-tight mb-4 text-balance font-['Plus_Jakarta_Sans']">
            {t.itineraryTitle}
          </h2>
          <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
            {t.itinerarySubtitle}
          </p>
        </div>

        {/* Day Switcher Tabs (D-1, D-2, D-3, D-4, D-5) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {t.itineraryDays.map((day, idx) => {
            const isActive = idx === activeDayIndex;
            return (
              <button
                key={day.dayNumber}
                type="button"
                onClick={() => setActiveDayIndex(idx)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl border text-sm font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#0F4C3A] text-white border-[#0F4C3A] shadow-sm'
                    : 'bg-white text-[#334155] border-[#D5CEC2] hover:border-[#0F4C3A] hover:bg-[#FBF9F5]'
                }`}
              >
                <span className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center ${
                  isActive ? 'bg-white/20 text-white' : 'bg-[#EAE4D8] text-[#0F4C3A]'
                }`}>
                  {day.dayNumber}
                </span>
                <span className="max-w-[160px] sm:max-w-none truncate">{day.title.split(':')[1]?.trim() || day.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Day Detail Card */}
        <div className="bg-white rounded-2xl border border-[#E2DDD5] shadow-sm p-6 sm:p-10 mb-12 transition-all">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E2DDD5]">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 rounded-lg bg-[#0F4C3A] text-white font-bold text-sm tracking-wide">
                {activeDay.dayNumber}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0F2922]">
                {activeDay.title}
              </h3>
            </div>

            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#475569] font-medium">
              <MapPin className="w-4 h-4 text-[#0F4C3A]" />
              <span>{activeDay.route}</span>
            </div>
          </div>

          {/* Quick Metrics of Active Day */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-b border-[#E2DDD5]">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#EBF7F2] text-[#0F4C3A] shrink-0">
                <Mountain className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs text-[#64748B]">{t.itineraryAltitudeLabel}</div>
                <div className="text-sm font-bold text-[#0F2922] tabular-nums">{activeDay.altitude}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#EBF7F2] text-[#0F4C3A] shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs text-[#64748B]">{t.itinerarySaddleLabel}</div>
                <div className="text-sm font-bold text-[#0F2922] tabular-nums">{activeDay.saddleHours}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#EBF7F2] text-[#0F4C3A] shrink-0">
                <Coffee className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs text-[#64748B]">{t.itineraryMealsLabel}</div>
                <div className="text-sm font-semibold text-[#0F2922] truncate max-w-[180px]">{activeDay.meals}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#EBF7F2] text-[#0F4C3A] shrink-0">
                <Moon className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs text-[#64748B]">{t.itineraryNightLabel}</div>
                <div className="text-sm font-semibold text-[#0F2922] truncate max-w-[180px]">{activeDay.accommodation}</div>
              </div>
            </div>
          </div>

          {/* Day Narrative Description */}
          <div className="pt-6 pb-6">
            <p className="text-base sm:text-lg text-[#334155] leading-relaxed">
              {activeDay.description}
            </p>
          </div>

          {/* Highlights of the Day */}
          <div className="pt-6 border-t border-[#E2DDD5]">
            <div className="text-xs font-bold uppercase tracking-wider text-[#64748B] mb-3">
              {t.itineraryHighlightsLabel}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {activeDay.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-[#FBF9F5] border border-[#E2DDD5] text-xs sm:text-sm text-[#1E293B]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#0F4C3A] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Day Pagination Controls */}
          <div className="mt-8 pt-6 border-t border-[#E2DDD5] flex items-center justify-between">
            <button
              type="button"
              disabled={activeDayIndex === 0}
              onClick={() => setActiveDayIndex((prev) => Math.max(0, prev - 1))}
              className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                activeDayIndex === 0
                  ? 'opacity-40 cursor-not-allowed border-gray-200 text-gray-400'
                  : 'border-[#D5CEC2] hover:border-[#0F4C3A] text-[#1E293B] bg-white'
              }`}
            >
              ← Предыдущий день
            </button>

            <button
              type="button"
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0F4C3A] hover:bg-[#0B3A2C] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <span>Забронировать этот маршрут</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              disabled={activeDayIndex === t.itineraryDays.length - 1}
              onClick={() => setActiveDayIndex((prev) => Math.min(t.itineraryDays.length - 1, prev + 1))}
              className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                activeDayIndex === t.itineraryDays.length - 1
                  ? 'opacity-40 cursor-not-allowed border-gray-200 text-gray-400'
                  : 'border-[#D5CEC2] hover:border-[#0F4C3A] text-[#1E293B] bg-white'
              }`}
            >
              Следующий день →
            </button>
          </div>
        </div>

        {/* All Days Overview Summary Timeline */}
        <div className="bg-white rounded-2xl border border-[#E2DDD5] p-6 sm:p-8">
          <div className="text-sm font-bold text-[#0F2922] mb-6 flex items-center gap-2">
            <span>Маршрутный таймлайн D-1 — D-5:</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {t.itineraryDays.map((day, idx) => (
              <div
                key={day.dayNumber}
                onClick={() => setActiveDayIndex(idx)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  idx === activeDayIndex
                    ? 'border-[#0F4C3A] bg-[#EBF7F2]/60 ring-2 ring-[#0F4C3A]/20'
                    : 'border-[#E2DDD5] bg-[#FBF9F5] hover:border-[#0F4C3A]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-extrabold text-xs text-[#0F4C3A]">{day.dayNumber}</span>
                  <span className="text-[11px] text-[#64748B] tabular-nums">{day.altitude}</span>
                </div>
                <div className="text-xs font-bold text-[#0F2922] line-clamp-2 mb-2">
                  {day.title}
                </div>
                <div className="text-[11px] text-[#64748B] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#0F4C3A]" />
                  <span>{day.saddleHours}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
