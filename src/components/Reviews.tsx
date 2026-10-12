import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface ReviewsProps {
  currentLang: Language;
}

export function Reviews({ currentLang }: ReviewsProps) {
  const t = translations[currentLang];
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews = t.reviews;
  const current = reviews[currentIndex] || reviews[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="reviews" className="py-20 sm:py-28 bg-[#FBF9F5] border-b border-[#E2DDD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#0F4C3A] mb-3 flex items-center gap-2">
            <span className="w-2 h-0.5 bg-[#0F4C3A]" />
            <span>International Travelers</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F2922] tracking-tight leading-tight mb-4 text-balance font-['Plus_Jakarta_Sans']">
            {t.reviewsTitle}
          </h2>
          <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
            {t.reviewsSubtitle}
          </p>
        </div>

        {/* Featured Testimonial Slider Card */}
        <div className="bg-white rounded-3xl border border-[#E2DDD5] p-8 sm:p-12 shadow-sm relative overflow-hidden">
          <div className="absolute top-6 right-8 text-[#E2DDD5]/50">
            <Quote className="w-20 h-20 -rotate-12" />
          </div>

          <div className="relative z-10 max-w-4xl">
            {/* Stars */}
            <div className="flex items-center gap-1 mb-6">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#F59E0B] text-[#F59E0B]" />
              ))}
              <span className="text-xs font-semibold text-[#64748B] ml-2">
                5.0 · Проверенный отзыв
              </span>
            </div>

            {/* Review Quote text */}
            <blockquote className="text-lg sm:text-2xl text-[#0F2922] font-medium leading-relaxed mb-8 italic">
              «{current.text}»
            </blockquote>

            {/* Author info & country */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#E2DDD5]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#EBF7F2] border border-[#A7F3D0] flex items-center justify-center text-sm font-bold text-[#0F4C3A] shrink-0">
                  {current.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-[#0F2922] text-base">
                    {current.name}
                  </div>
                  <div className="text-xs text-[#64748B] flex items-center gap-1.5 mt-0.5">
                    <span>{current.country}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#0F4C3A] font-medium">{current.tour}</span>
                    <span aria-hidden="true">·</span>
                    <span>{current.date}</span>
                  </div>
                </div>
              </div>

              {/* Slider Arrows */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full border border-[#D5CEC2] hover:border-[#0F4C3A] hover:bg-[#FBF9F5] flex items-center justify-center text-[#1E293B] transition-colors cursor-pointer"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="text-xs font-semibold text-[#64748B] px-2 tabular-nums">
                  {currentIndex + 1} / {reviews.length}
                </div>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full border border-[#D5CEC2] hover:border-[#0F4C3A] hover:bg-[#FBF9F5] flex items-center justify-center text-[#1E293B] transition-colors cursor-pointer"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Small Review Thumbnails Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {reviews.map((rev, idx) => (
            <div
              key={rev.id}
              onClick={() => setCurrentIndex(idx)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                idx === currentIndex
                  ? 'border-[#0F4C3A] bg-white ring-2 ring-[#0F4C3A]/20 shadow-xs'
                  : 'border-[#E2DDD5] bg-white/70 hover:border-[#0F4C3A] hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs text-[#0F2922] truncate">{rev.name}</span>
                <span className="text-[11px] font-semibold text-[#0F4C3A]">{rev.countryCode}</span>
              </div>
              <p className="text-xs text-[#64748B] line-clamp-2 italic mb-2">
                "{rev.text}"
              </p>
              <div className="text-[10px] text-[#94A3B8]">{rev.tour}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
