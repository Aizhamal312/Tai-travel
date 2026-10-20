import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface GalleryProps {
  currentLang: Language;
}

interface GalleryImage {
  src: string;
  title: string;
  category: 'horses' | 'mountains' | 'yurts' | 'lake';
  caption: string;
}

export function Gallery({ currentLang }: GalleryProps) {
  const t = translations[currentLang];
  const [activeFilter, setActiveFilter] = useState<'all' | 'horses' | 'mountains' | 'yurts' | 'lake'>('all');
  const [activeModalImage, setActiveModalImage] = useState<GalleryImage | null>(null);

  const images: GalleryImage[] = [
    {
      src: '/images/hero.jpg',
      title: 'Всадники на фоне хребтов Сон-Куля',
      category: 'horses',
      caption: 'Конная группа движется по джайлоо вдоль лазурного берега озера на высоте 3016 м',
    },
    {
      src: '/images/yurt-camp.jpg',
      title: 'Традиционный юрточный лагерь',
      category: 'yurts',
      caption: 'Белоснежные войлочные юрты на альпийском лугу в лучах заходящего солнца',
    },
    {
      src: '/images/lake-sunset.jpg',
      title: 'Закат над озером Сон-Куль',
      category: 'lake',
      caption: 'Зеркальное отражение снежных вершин Тянь-Шаня и вечерний конный выезд',
    },
    {
      src: '/images/guide-horse.jpg',
      title: 'Кыргызский проводник в ак-калпаке',
      category: 'mountains',
      caption: 'Опытный проводник на каменистом перевале Туз-Ашуу (3229 м)',
    },
    {
      src: '/images/tour-classic.jpg',
      title: 'Табуны свободных кыргызских коней',
      category: 'horses',
      caption: 'Бескрайние альпийские просторы Внутреннего Тянь-Шаня',
    },
    {
      src: '/images/tour-express.jpg',
      title: 'Уютный вечер у очага',
      category: 'yurts',
      caption: 'Дым от печи-буржуйки и горячий горный чай под звездным куполом',
    },
  ];

  const filteredImages = activeFilter === 'all' ? images : images.filter((img) => img.category === activeFilter);

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-[#F4F1EA] border-b border-[#E2DDD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#0F4C3A] mb-3 flex items-center gap-2">
            <span className="w-2 h-0.5 bg-[#0F4C3A]" />
            <span>Photography · 3016 m</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F2922] tracking-tight leading-tight mb-4 text-balance font-['Plus_Jakarta_Sans']">
            {t.galleryTitle}
          </h2>
          <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
            {t.gallerySubtitle}
          </p>
        </div>

        {/* Filter Controls (buttons with click handlers, not static pills) */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#0F4C3A] text-white shadow-xs'
                : 'bg-white text-[#334155] border border-[#D5CEC2] hover:border-[#0F4C3A]'
            }`}
          >
            {t.galleryAll}
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('horses')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeFilter === 'horses'
                ? 'bg-[#0F4C3A] text-white shadow-xs'
                : 'bg-white text-[#334155] border border-[#D5CEC2] hover:border-[#0F4C3A]'
            }`}
          >
            {t.galleryHorses}
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('mountains')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeFilter === 'mountains'
                ? 'bg-[#0F4C3A] text-white shadow-xs'
                : 'bg-white text-[#334155] border border-[#D5CEC2] hover:border-[#0F4C3A]'
            }`}
          >
            {t.galleryMountains}
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('yurts')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeFilter === 'yurts'
                ? 'bg-[#0F4C3A] text-white shadow-xs'
                : 'bg-white text-[#334155] border border-[#D5CEC2] hover:border-[#0F4C3A]'
            }`}
          >
            {t.galleryYurts}
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('lake')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeFilter === 'lake'
                ? 'bg-[#0F4C3A] text-white shadow-xs'
                : 'bg-white text-[#334155] border border-[#D5CEC2] hover:border-[#0F4C3A]'
            }`}
          >
            {t.galleryLake}
          </button>
        </div>

        {/* Responsive Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((img, index) => (
            <div
              key={index}
              onClick={() => setActiveModalImage(img)}
              className="group relative rounded-2xl overflow-hidden bg-white border border-[#E2DDD5] shadow-xs aspect-[4/3] cursor-pointer"
            >
              <img
                src={img.src}
                alt={img.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.src.includes('hero_songkul_horses')) {
                    target.src = '/images/hero_songkul_horses_1791824969324.jpg';
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <div className="flex items-center justify-between gap-2 text-white">
                  <div>
                    <h4 className="text-sm font-bold">{img.title}</h4>
                    <p className="text-xs text-[#CBD5E1] line-clamp-1">{img.caption}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0">
                    <ZoomIn className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeModalImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActiveModalImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#0F2922] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveModalImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="max-h-[75vh] overflow-hidden flex items-center justify-center bg-black">
              <img
                src={activeModalImage.src}
                alt={activeModalImage.title}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>
            <div className="p-6 bg-[#0F2922] text-white border-t border-white/10">
              <h3 className="text-lg font-bold mb-1">{activeModalImage.title}</h3>
              <p className="text-sm text-[#A7F3D0]">{activeModalImage.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
