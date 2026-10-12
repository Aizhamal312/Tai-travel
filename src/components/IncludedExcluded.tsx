import { CheckCircle2, XCircle } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface IncludedExcludedProps {
  currentLang: Language;
}

export function IncludedExcluded({ currentLang }: IncludedExcludedProps) {
  const t = translations[currentLang];

  return (
    <section className="py-20 sm:py-24 bg-[#FBF9F5] border-b border-[#E2DDD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#0F4C3A] mb-3 flex items-center gap-2">
            <span className="w-2 h-0.5 bg-[#0F4C3A]" />
            <span>Transparency & Trust</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F2922] tracking-tight leading-tight mb-4 text-balance font-['Plus_Jakarta_Sans']">
            {t.includedTitle}
          </h2>
          <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
            {t.includedSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Included Box */}
          <div className="rounded-2xl bg-white border border-[#A7F3D0] p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#E2DDD5]">
              <div className="w-9 h-9 rounded-lg bg-[#EBF7F2] text-[#0F4C3A] flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-[#0F4C3A]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#0F2922]">
                {t.includedHeading}
              </h3>
            </div>

            <div className="space-y-4">
              {t.includedItems.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#0F4C3A] shrink-0 mt-0.5" />
                  <span className="text-sm text-[#1E293B] leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Excluded Box */}
          <div className="rounded-2xl bg-[#FFF8F6] border border-[#FECDD3] p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#FECDD3]">
              <div className="w-9 h-9 rounded-lg bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center">
                <XCircle className="w-5 h-5 text-[#DC2626]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#991B1B]">
                {t.excludedHeading}
              </h3>
            </div>

            <div className="space-y-4">
              {t.excludedItems.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                  <span className="text-sm text-[#4A1515] leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
