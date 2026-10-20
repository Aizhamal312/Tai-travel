import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Coins } from 'lucide-react';
import { Currency } from '../types';
import { CURRENCY_OPTIONS, DEFAULT_EXCHANGE_RATES } from '../utils/currency';

interface CurrencySwitcherProps {
  currentCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  className?: string;
}

export function CurrencySwitcher({
  currentCurrency,
  onCurrencyChange,
  className = '',
}: CurrencySwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const activeOption =
    CURRENCY_OPTIONS.find((c) => c.code === currentCurrency) || CURRENCY_OPTIONS[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#D5CEC2] hover:border-[#0F4C3A] text-xs font-semibold text-[#1E293B] bg-white shadow-xs transition-colors cursor-pointer"
        aria-expanded={isOpen}
        aria-haspopup="true"
        title="Конвертер валют / Switch currency (EUR, USD, RUB, KGS)"
      >
        <Coins className="w-3.5 h-3.5 text-[#0F4C3A]" />
        <span className="font-bold text-[#0F4C3A]">{activeOption.symbol}</span>
        <span className="uppercase tracking-wider">{activeOption.code}</span>
        <ChevronDown className="w-3 h-3 text-[#64748B]" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-52 bg-white rounded-xl shadow-xl border border-[#E2DDD5] py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#64748B] border-b border-[#F1EFE9] flex items-center justify-between">
            <span>Конвертер валют</span>
            <span className="text-[#0F4C3A]">Цены туров</span>
          </div>

          <div className="py-1">
            {CURRENCY_OPTIONS.map((opt) => {
              const isSelected = opt.code === currentCurrency;
              return (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => {
                    onCurrencyChange(opt.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#EBF7F2] text-[#0F4C3A] font-bold'
                      : 'text-[#334155] hover:bg-[#F8F6F0]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base leading-none">{opt.flag}</span>
                    <span className="font-semibold">{opt.code}</span>
                    <span className="text-[#64748B] text-[11px] font-normal">
                      ({opt.shortName})
                    </span>
                  </div>
                  {isSelected ? (
                    <span className="w-2 h-2 rounded-full bg-[#0F4C3A]" />
                  ) : (
                    <span className="text-[11px] text-[#94A3B8] font-mono">{opt.symbol}</span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="px-3 pt-2 pb-1.5 border-t border-[#F1EFE9] text-[10px] text-[#64748B] leading-tight space-y-0.5 bg-[#FAF8F5]/60">
            <div className="font-medium text-[#475569]">Курсы пересчета (1 USD ≈):</div>
            <div className="text-[9.5px] text-[#94A3B8]">
              {DEFAULT_EXCHANGE_RATES.EUR} € · {DEFAULT_EXCHANGE_RATES.RUB} ₽ · {DEFAULT_EXCHANGE_RATES.KGS} сом
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
