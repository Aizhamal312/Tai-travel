import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface WorldClockProps {
  currentLang: Language;
}

export function WorldClock({ currentLang }: WorldClockProps) {
  const t = translations[currentLang];
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCityTime = (timeZone: string) => {
    try {
      return new Intl.DateTimeFormat('en-GB', {
        timeZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(time);
    } catch {
      return '--:--:--';
    }
  };

  const bishkekTime = formatCityTime('Asia/Bishkek');
  const franceTime = formatCityTime('Europe/Paris');
  const japanTime = formatCityTime('Asia/Tokyo');

  return (
    <div className="w-full bg-[#13221E] text-[#D1DDD6] border-b border-[#223932] px-4 py-1.5 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left: Indicator & label */}
        <div className="flex items-center gap-2 font-medium tracking-normal text-[#E2EBE6]">
          <Clock className="w-3.5 h-3.5 text-[#2DD4BF]" aria-hidden="true" />
          <span>{t.worldTime.title}:</span>
        </div>

        {/* Right: Cities with same font as menu bar */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-medium tracking-normal">
          <div className="flex items-center gap-1.5">
            <span className="text-sm leading-none" role="img" aria-label="Kyrgyzstan">🇰🇬</span>
            <span className="text-[#94A3B8]">{t.worldTime.bishkek}</span>
            <span className="text-white font-semibold">{bishkekTime}</span>
            <span className="text-[10px] text-[#2DD4BF] font-normal">(GMT+6)</span>
          </div>

          <span className="text-[#2D453D] hidden sm:inline" aria-hidden="true">|</span>

          <div className="flex items-center gap-1.5">
            <span className="text-sm leading-none" role="img" aria-label="France">🇫🇷</span>
            <span className="text-[#94A3B8]">{t.worldTime.france}</span>
            <span className="text-white font-semibold">{franceTime}</span>
            <span className="text-[10px] text-[#A7F3D0] font-normal">(CET)</span>
          </div>

          <span className="text-[#2D453D] hidden sm:inline" aria-hidden="true">|</span>

          <div className="flex items-center gap-1.5">
            <span className="text-sm leading-none" role="img" aria-label="Japan">🇯🇵</span>
            <span className="text-[#94A3B8]">{t.worldTime.japan}</span>
            <span className="text-white font-semibold">{japanTime}</span>
            <span className="text-[10px] text-[#A7F3D0] font-normal">(JST)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
