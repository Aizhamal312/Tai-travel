import { useState, FormEvent } from 'react';
import { MessageCircle, Mail, Send, CheckCircle2 } from 'lucide-react';
import { Language, Currency } from '../types';
import { translations } from '../i18n/translations';
import { formatCurrencyPrice } from '../utils/currency';

interface BookingSectionProps {
  currentLang: Language;
  currentCurrency?: Currency;
  selectedTourId?: string;
}

export function BookingSection({
  currentLang,
  currentCurrency = 'USD',
  selectedTourId = 'classic-5d',
}: BookingSectionProps) {
  const t = translations[currentLang];

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState('2');
  const [ridingLevel, setRidingLevel] = useState('intermediate');
  const [tourId, setTourId] = useState(selectedTourId);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const whatsappPhone = '+996220073174';
  const whatsappCleanNumber = '996220073174';
  const gmailEmail = 'abibullakyzyaizhamal94@gmail.com';

  const defaultWhatsappUrl = `https://wa.me/${whatsappCleanNumber}?text=${encodeURIComponent('Здравствуйте! Я хочу забронировать конный тур на озеро Сон-Куль.')}`;
  const defaultGmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${gmailEmail}&su=${encodeURIComponent('Бронирование конного тура на озеро Сон-Куль')}`;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const getFormSummaryMessage = () => {
    const selectedPkg = t.tourPackages.find((p) => p.id === tourId);
    return `Заявка на конный тур Сон-Куль:
Имя: ${fullName || 'Не указано'}
Email: ${email || 'Не указано'}
Телефон/WhatsApp: ${phone || 'Не указано'}
Тур: ${selectedPkg?.title || tourId}
Дата старта: ${date || 'Ближайшая'}
Количество гостей: ${guests}
Опыт верховой езды: ${ridingLevel}
Пожелания: ${notes || 'Нет'}`;
  };

  const dynamicWhatsappUrl = `https://wa.me/${whatsappCleanNumber}?text=${encodeURIComponent(getFormSummaryMessage())}`;
  const dynamicGmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${gmailEmail}&su=${encodeURIComponent('Заявка на тур Сон-Куль: ' + fullName)}&body=${encodeURIComponent(getFormSummaryMessage())}`;

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#FBF9F5] border-b border-[#E2DDD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#0F4C3A] mb-3 flex items-center gap-2">
            <span className="w-2 h-0.5 bg-[#0F4C3A]" />
            <span>Book Your Adventure</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F2922] tracking-tight leading-tight mb-4 text-balance font-['Plus_Jakarta_Sans']">
            {t.bookingTitle}
          </h2>
          <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
            {t.bookingSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Form Column */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E2DDD5] p-6 sm:p-10 shadow-xs">
            {submitted ? (
              <div className="py-8 text-center space-y-4 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-[#EBF7F2] text-[#0F4C3A] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#0F2922]">
                  {t.bookingSuccessTitle}
                </h3>
                <p className="text-sm text-[#475569] max-w-md mx-auto leading-relaxed">
                  {t.bookingSuccessDesc}
                </p>

                {/* Instant 1-click transmission buttons */}
                <div className="pt-6 border-t border-[#E2DDD5] space-y-3">
                  <div className="text-xs font-semibold text-[#64748B]">
                    Отправить детали заявки напрямую в один клик:
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={dynamicWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold transition-all shadow-xs"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Отправить в WhatsApp (+996 220 073 174)</span>
                    </a>
                    <a
                      href={dynamicGmailUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#EA4335] hover:bg-[#D93025] text-white text-xs font-bold transition-all shadow-xs"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Отправить на Gmail</span>
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-[#0F4C3A] hover:underline font-semibold pt-4 block mx-auto cursor-pointer"
                  >
                    Заполнить форму заново
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#0F2922] mb-1.5">
                      {t.bookingFormName} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Азамат Касымов"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEC2] focus:border-[#0F4C3A] focus:ring-2 focus:ring-[#0F4C3A]/20 text-sm outline-none bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0F2922] mb-1.5">
                      {t.bookingFormEmail} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tourist@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEC2] focus:border-[#0F4C3A] focus:ring-2 focus:ring-[#0F4C3A]/20 text-sm outline-none bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#0F2922] mb-1.5">
                      {t.bookingFormPhone} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+996 ... / +7 ... / +33 ..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEC2] focus:border-[#0F4C3A] focus:ring-2 focus:ring-[#0F4C3A]/20 text-sm outline-none bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0F2922] mb-1.5">
                      {t.bookingFormDate}
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEC2] focus:border-[#0F4C3A] focus:ring-2 focus:ring-[#0F4C3A]/20 text-sm outline-none bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#0F2922] mb-1.5">
                      {t.bookingFormTourSelect}
                    </label>
                    <select
                      value={tourId}
                      onChange={(e) => setTourId(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEC2] focus:border-[#0F4C3A] focus:ring-2 focus:ring-[#0F4C3A]/20 text-sm outline-none bg-white transition-all"
                    >
                      {t.tourPackages.map((p, idx) => {
                        const priceStr = formatCurrencyPrice(
                          p.basePriceUSD || (idx === 0 ? 320 : idx === 1 ? 490 : 720),
                          currentCurrency
                        );
                        return (
                          <option key={p.id} value={p.id}>
                            {p.title} ({priceStr} · {p.duration})
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0F2922] mb-1.5">
                      {t.bookingFormGuests}
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEC2] focus:border-[#0F4C3A] focus:ring-2 focus:ring-[#0F4C3A]/20 text-sm outline-none bg-white transition-all"
                    >
                      <option value="1">1 человек</option>
                      <option value="2">2 человека</option>
                      <option value="3-4">3 - 4 человека</option>
                      <option value="5-8">5 - 8 человек (группа)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0F2922] mb-1.5">
                    {t.bookingFormRidingLevel}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setRidingLevel('beginner')}
                      className={`py-2 px-3 rounded-lg border text-xs font-medium text-center transition-colors cursor-pointer ${
                        ridingLevel === 'beginner'
                          ? 'bg-[#0F4C3A] text-white border-[#0F4C3A]'
                          : 'bg-white text-[#334155] border-[#D5CEC2] hover:border-[#0F4C3A]'
                      }`}
                    >
                      {t.bookingLevelBeginner}
                    </button>
                    <button
                      type="button"
                      onClick={() => setRidingLevel('intermediate')}
                      className={`py-2 px-3 rounded-lg border text-xs font-medium text-center transition-colors cursor-pointer ${
                        ridingLevel === 'intermediate'
                          ? 'bg-[#0F4C3A] text-white border-[#0F4C3A]'
                          : 'bg-white text-[#334155] border-[#D5CEC2] hover:border-[#0F4C3A]'
                      }`}
                    >
                      {t.bookingLevelIntermediate}
                    </button>
                    <button
                      type="button"
                      onClick={() => setRidingLevel('advanced')}
                      className={`py-2 px-3 rounded-lg border text-xs font-medium text-center transition-colors cursor-pointer ${
                        ridingLevel === 'advanced'
                          ? 'bg-[#0F4C3A] text-white border-[#0F4C3A]'
                          : 'bg-white text-[#334155] border-[#D5CEC2] hover:border-[#0F4C3A]'
                      }`}
                    >
                      {t.bookingLevelAdvanced}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0F2922] mb-1.5">
                    {t.bookingFormNotes}
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Например: вегетарианское питание, нужен трансфер из аэропорта Манас в Бишкеке..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEC2] focus:border-[#0F4C3A] focus:ring-2 focus:ring-[#0F4C3A]/20 text-sm outline-none bg-white transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#0F4C3A] hover:bg-[#0B3A2C] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.bookingSubmitBtn}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Direct Contact Info & Instant Messenger Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0F2922] text-white rounded-3xl p-7 sm:p-8 shadow-sm">
              <h3 className="text-xl font-bold mb-2 font-['Plus_Jakarta_Sans']">
                {t.bookingDirectCall}
              </h3>
              <p className="text-xs sm:text-sm text-[#A7F3D0] leading-relaxed mb-6">
                {t.contactChatPrompt}
              </p>

              {/* Instant WhatsApp Channel - NO 24/7 label! */}
              <div className="space-y-3 mb-6">
                <a
                  href={defaultWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white transition-all shadow-xs group"
                >
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 fill-white" />
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider">WhatsApp</div>
                      <div className="text-sm font-extrabold">{whatsappPhone}</div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold bg-white/20 px-2.5 py-1 rounded-md">
                    Написать
                  </span>
                </a>

                {/* Instant Gmail Channel Button next to WhatsApp */}
                <a
                  href={defaultGmailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-[#EA4335] hover:bg-[#D93025] text-white transition-all shadow-xs group"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5" />
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider">Gmail Почта</div>
                      <div className="text-xs sm:text-sm font-semibold truncate max-w-[200px] sm:max-w-none">
                        {gmailEmail}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold bg-white/20 px-2.5 py-1 rounded-md">
                    Открыть
                  </span>
                </a>
              </div>

              {/* Direct Mailto */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-[#CBD5E1] space-y-2">
                <div className="font-semibold text-white">Прямой адрес электронной почты:</div>
                <a
                  href={`mailto:${gmailEmail}`}
                  className="text-[#34D399] hover:underline font-mono text-xs block break-all"
                >
                  {gmailEmail}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
