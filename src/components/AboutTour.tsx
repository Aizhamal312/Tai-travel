import { ShieldCheck, Compass, Sparkles, Utensils } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface AboutTourProps {
  currentLang: Language;
}

export function AboutTour({ currentLang }: AboutTourProps) {
  const t = translations[currentLang];
  const yurtImg = '/src/assets/images/yurt_camp_tian_shan_1791824988583.jpg';
  const guideImg = '/src/assets/images/nomad_guide_horse_1791825006077.jpg';

  return (
    <section id="about" className="py-20 sm:py-28 bg-[#FBF9F5] border-b border-[#E2DDD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#0F4C3A] mb-3 flex items-center gap-2">
            <span className="w-2 h-0.5 bg-[#0F4C3A]" />
            <span>Song-Kul · 3016 m</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F2922] tracking-tight leading-tight mb-4 text-balance font-['Plus_Jakarta_Sans']">
            {t.aboutTitle}
          </h2>
          <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
            {t.aboutSubtitle}
          </p>
        </div>

        {/* Narrative Split: 2 Images & Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6 text-[#334155] text-base leading-relaxed">
            <p className="text-lg font-medium text-[#1E293B] leading-relaxed">
              {t.aboutDesc1}
            </p>
            <p>
              {t.aboutDesc2}
            </p>

            <div className="pt-4 grid grid-cols-2 gap-4 border-t border-[#E2DDD5]">
              <div className="p-4 rounded-xl bg-white border border-[#E2DDD5]">
                <div className="text-2xl font-bold text-[#0F4C3A] tabular-nums">3 016 м</div>
                <div className="text-xs text-[#64748B] mt-0.5">Зеркало озера над уровнем моря</div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#E2DDD5]">
                <div className="text-2xl font-bold text-[#0F4C3A] tabular-nums">29 км</div>
                <div className="text-xs text-[#64748B] mt-0.5">Длина озерной глади</div>
              </div>
            </div>
          </div>

          {/* Right Dual Image Showcase */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-md border border-[#E2DDD5]">
              <img
                src={yurtImg}
                alt="Yurt camp on jailoo meadows near Lake Song-Kul"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs font-semibold text-white tracking-wide">
                  Юрточный лагерь на джайлоо
                </span>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-md border border-[#E2DDD5] mt-6 sm:mt-10">
              <img
                src={guideImg}
                alt="Experienced Kyrgyz guide horseman with ak-kalpak"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs font-semibold text-white tracking-wide">
                  Опытный гид и кыргызский скакун
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Feature Pillars (clean hairline borders, no thick left borders, no pills) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-xl bg-white border border-[#E2DDD5] shadow-xs hover:border-[#0F4C3A] transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#EBF7F2] text-[#0F4C3A] flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0F2922] mb-2">
              {t.aboutCard1Title}
            </h3>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              {t.aboutCard1Desc}
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-[#E2DDD5] shadow-xs hover:border-[#0F4C3A] transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#EBF7F2] text-[#0F4C3A] flex items-center justify-center mb-4">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0F2922] mb-2">
              {t.aboutCard2Title}
            </h3>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              {t.aboutCard2Desc}
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-[#E2DDD5] shadow-xs hover:border-[#0F4C3A] transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#EBF7F2] text-[#0F4C3A] flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0F2922] mb-2">
              {t.aboutCard3Title}
            </h3>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              {t.aboutCard3Desc}
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-[#E2DDD5] shadow-xs hover:border-[#0F4C3A] transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#EBF7F2] text-[#0F4C3A] flex items-center justify-center mb-4">
              <Utensils className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0F2922] mb-2">
              {t.aboutCard4Title}
            </h3>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              {t.aboutCard4Desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
