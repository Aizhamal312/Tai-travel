import { Currency, ExchangeRates, Language } from '../types';

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  name: string;
  shortName: string;
  flag: string;
  rateToUSD: number; // 1 USD = X Currency
}

// Simulated Exchange Rate Provider with real-world baseline
export const DEFAULT_EXCHANGE_RATES: ExchangeRates = {
  EUR: 0.92,
  USD: 1.0,
  RUB: 96.0,
  KGS: 87.5,
  GBP: 0.78,
};

export const CURRENCY_OPTIONS: CurrencyConfig[] = [
  {
    code: 'EUR',
    symbol: '€',
    name: 'EUR · Евро',
    shortName: 'Евро (€)',
    flag: '🇪🇺',
    rateToUSD: 0.92,
  },
  {
    code: 'USD',
    symbol: '$',
    name: 'USD · Доллар',
    shortName: 'Доллар ($)',
    flag: '🇺🇸',
    rateToUSD: 1.0,
  },
  {
    code: 'RUB',
    symbol: '₽',
    name: 'RUB · Рубли',
    shortName: 'Рубли (₽)',
    flag: '🇷🇺',
    rateToUSD: 96.0,
  },
  {
    code: 'KGS',
    symbol: 'сом',
    name: 'KGS · Сомы',
    shortName: 'Сомы (сом)',
    flag: '🇰🇬',
    rateToUSD: 87.5,
  },
];

/**
 * Automatically maps the site language to the most appropriate default currency.
 * - Russian (ru) -> Russian Rubles (RUB)
 * - English (en) -> US Dollars (USD)
 * - French (fr) -> Euro (EUR)
 * - German (de) -> Euro (EUR)
 * - Polish (pl) -> Euro (EUR)
 */
export function getDefaultCurrencyForLanguage(lang: Language): Currency {
  switch (lang) {
    case 'ru':
      return 'RUB';
    case 'en':
      return 'USD';
    case 'fr':
    case 'de':
    case 'pl':
      return 'EUR';
    default:
      return 'USD';
  }
}

/**
 * Converts a base price in USD to the target currency and formats it cleanly.
 * @param basePriceUSD - The baseline price in USD (e.g. 320, 490, 720)
 * @param currency - The target currency code (EUR, USD, RUB, KGS)
 * @param rates - The simulated exchange rates
 */
export function formatCurrencyPrice(
  basePriceUSD: number,
  currency: Currency,
  rates: ExchangeRates = DEFAULT_EXCHANGE_RATES
): string {
  const rate = rates[currency] || 1;
  const rawConverted = basePriceUSD * rate;

  if (currency === 'RUB') {
    // Round to nearest 100 RUB for clean presentation
    const rounded = Math.round(rawConverted / 100) * 100;
    return `${rounded.toLocaleString('ru-RU')} ₽`;
  }

  if (currency === 'KGS') {
    // Round to nearest 100 som for clean tourist pricing
    const rounded = Math.round(rawConverted / 100) * 100;
    return `${rounded.toLocaleString('ru-RU')} сом`;
  }

  if (currency === 'EUR') {
    // Round to nearest 5 EUR
    const rounded = Math.round(rawConverted / 5) * 5;
    return `€${rounded.toLocaleString('en-US')}`;
  }

  if (currency === 'GBP') {
    // Round to nearest 5 GBP
    const rounded = Math.round(rawConverted / 5) * 5;
    return `£${rounded.toLocaleString('en-US')}`;
  }

  // Default USD
  return `$${Math.round(basePriceUSD).toLocaleString('en-US')}`;
}

/**
 * Formats full pricing string with 'from / от' prefix according to language and target currency
 */
export function getLocalizedTourPrice(
  basePriceUSD: number,
  currency: Currency,
  lang: string,
  rates: ExchangeRates = DEFAULT_EXCHANGE_RATES
): string {
  const formatted = formatCurrencyPrice(basePriceUSD, currency, rates);

  switch (lang) {
    case 'en':
      return `From ${formatted} / person`;
    case 'fr':
      return `Dès ${formatted} / pers`;
    case 'de':
      return `ab ${formatted} / Person`;
    case 'pl':
      return `od ${formatted} / os.`;
    case 'ru':
    default:
      return `от ${formatted} / чел`;
  }
}
