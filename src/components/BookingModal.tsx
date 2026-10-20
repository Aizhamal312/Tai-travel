import { useState, FormEvent } from 'react';
import { X, MessageCircle, Mail, Send, CheckCircle2 } from 'lucide-react';
import { Language, Currency } from '../types';
import { translations } from '../i18n/translations';
import { formatCurrencyPrice } from '../utils/currency';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  currentCurrency?: Currency;
}

export function BookingModal({
  isOpen,
  onClose,
  currentLang,
  currentCurrency = 'USD',
}: BookingModalProps) {
  const t = translations[currentLang];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [tourId, setTourId] = useState('classic-5d');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const whatsappPhone = '+996220073174';
  const whatsappClean = '996220073174';
  const gmailEmail = 'abibullakyzyaizhamal94@gmail.com';

  const summary = `Бронирование конного тура на Сон-Куль:
Имя: ${name || 'Гость'}
Email: ${email}
Телефон: ${phone}
Тур: ${tourId}
Дата: ${date || 'Ближайшая'}`;

  const whatsappUrl = `https://wa.me/${whatsappClean}?text=${encodeURIComponent(summary)}`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${gmailEmail}&su=${encodeURIComponent('Бронирование конного тура Сон-Куль: ' + name)}&body=${encodeURIComponent(summary)}`;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E2DDD5] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#64748B] hover:text-[#0F2922] hover:bg-[#F1EFE9] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#EBF7F2] text-[#0F4C3A] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#0F2922]">
              {t.bookingSuccessTitle}
            </h3>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              {t.bookingSuccessDesc}
            </p>

            <div className="pt-4 border-t border-[#E2DDD5] space-y-2.5">
              <div className="text-xs font-semibold text-[#64748B]">
                Перейти в мессенджер для мгновенного подтверждения:
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold transition-all shadow-xs"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Отправить в WhatsApp (+996 220 073 174)</span>
              </a>
              <a
                href={gmailUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#EA4335] hover:bg-[#D93025] text-white text-xs font-bold transition-all shadow-xs"
              >
                <Mail className="w-4 h-4" />
                <span>Открыть в Gmail</span>
              </a>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#0F4C3A] mb-1">
                Быстрое бронирование
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0F2922]">
                {t.bookTourBtn}
              </h3>
              <p className="text-xs text-[#64748B] mt-1">
                Заполните форму или напишите нам в WhatsApp / Gmail напрямую.
              </p>
            </div>

            {/* Direct buttons on top of modal */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              <a
                href={`https://wa.me/${whatsappClean}?text=${encodeURIComponent('Здравствуйте! Я хочу забронировать тур на Сон-Куль.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold transition-colors"
                title="Написать в WhatsApp"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span className="truncate">WhatsApp</span>
              </a>

              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${gmailEmail}&su=${encodeURIComponent('Бронирование тура на Сон-Куль')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#EA4335] hover:bg-[#D93025] text-white text-xs font-bold transition-colors"
                title="Написать на Gmail"
              >
                <Mail className="w-4 h-4" />
                <span className="truncate">Gmail</span>
              </a>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#0F2922] mb-1">
                  {t.bookingFormName} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ваше имя"
                  className="w-full px-3 py-2 rounded-xl border border-[#D5CEC2] focus:border-[#0F4C3A] text-xs outline-none bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#0F2922] mb-1">
                    {t.bookingFormEmail} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@domain.com"
                    className="w-full px-3 py-2 rounded-xl border border-[#D5CEC2] focus:border-[#0F4C3A] text-xs outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0F2922] mb-1">
                    {t.bookingFormPhone} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+996..."
                    className="w-full px-3 py-2 rounded-xl border border-[#D5CEC2] focus:border-[#0F4C3A] text-xs outline-none bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#0F2922] mb-1">
                    {t.bookingFormTourSelect}
                  </label>
                  <select
                    value={tourId}
                    onChange={(e) => setTourId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#D5CEC2] focus:border-[#0F4C3A] text-xs outline-none bg-white"
                  >
                    {t.tourPackages.map((p, idx) => {
                      const priceStr = formatCurrencyPrice(
                        p.basePriceUSD || (idx === 0 ? 320 : idx === 1 ? 490 : 720),
                        currentCurrency
                      );
                      return (
                        <option key={p.id} value={p.id}>
                          {p.title} ({priceStr})
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0F2922] mb-1">
                    {t.bookingFormDate}
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#D5CEC2] focus:border-[#0F4C3A] text-xs outline-none bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#0F4C3A] hover:bg-[#0B3A2C] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <Send className="w-4 h-4" />
                <span>{t.bookingSubmitBtn}</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
