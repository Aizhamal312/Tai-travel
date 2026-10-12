import { useState } from 'react';
import { CheckSquare, Square, ChevronDown, HelpCircle, Backpack } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface PackingAndFAQProps {
  currentLang: Language;
}

export function PackingAndFAQ({ currentLang }: PackingAndFAQProps) {
  const t = translations[currentLang];
  const [packedItems, setPackedItems] = useState<Record<string, boolean>>({});
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const togglePacked = (name: string) => {
    setPackedItems((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="py-20 sm:py-28 bg-[#F4F1EA] border-b border-[#E2DDD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Packing Checklist */}
          <div className="lg:col-span-6">
            <div className="mb-8">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#0F4C3A] mb-3 flex items-center gap-2">
                <Backpack className="w-4 h-4 text-[#0F4C3A]" />
                <span>Gear & Clothing</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2922] tracking-tight leading-tight mb-3">
                {t.packingTitle}
              </h2>
              <p className="text-sm text-[#475569] leading-relaxed">
                {t.packingSubtitle}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#E2DDD5] p-6 shadow-xs space-y-3">
              <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Интерактивный список снаряжения:</span>
                <span className="text-[#0F4C3A] font-semibold">
                  {Object.values(packedItems).filter(Boolean).length} / {t.packingItems.length} готово
                </span>
              </div>

              {t.packingItems.map((item, idx) => {
                const isChecked = !!packedItems[item.name];
                return (
                  <div
                    key={idx}
                    onClick={() => togglePacked(item.name)}
                    className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none ${
                      isChecked
                        ? 'bg-[#EBF7F2] border-[#A7F3D0]'
                        : 'bg-[#FBF9F5] border-[#E2DDD5] hover:border-[#0F4C3A]'
                    }`}
                  >
                    <button
                      type="button"
                      className="mt-0.5 text-[#0F4C3A] focus:outline-none"
                      aria-label={`Toggle ${item.name}`}
                    >
                      {isChecked ? (
                        <CheckSquare className="w-5 h-5 text-[#0F4C3A]" />
                      ) : (
                        <Square className="w-5 h-5 text-[#94A3B8]" />
                      )}
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-sm font-semibold ${
                            isChecked ? 'line-through text-[#64748B]' : 'text-[#1E293B]'
                          }`}
                        >
                          {item.name}
                        </span>
                        <span className="text-[10px] font-medium text-[#64748B] bg-white px-2 py-0.5 rounded border border-[#E2DDD5]">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-[#64748B] mt-0.5">{item.note}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: FAQ Accordion */}
          <div className="lg:col-span-6">
            <div className="mb-8">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#0F4C3A] mb-3 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#0F4C3A]" />
                <span>Traveler Questions</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2922] tracking-tight leading-tight mb-3">
                {t.faqTitle}
              </h2>
              <p className="text-sm text-[#475569] leading-relaxed">
                {t.faqSubtitle}
              </p>
            </div>

            <div className="space-y-3.5">
              {t.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-[#E2DDD5] overflow-hidden shadow-xs transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex items-center justify-between gap-4 p-5 text-left font-bold text-sm sm:text-base text-[#0F2922] hover:text-[#0F4C3A] transition-colors cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 shrink-0 text-[#64748B] transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#0F4C3A]' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#475569] leading-relaxed border-t border-[#F1EFE9]">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
