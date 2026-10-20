export type Language = 'ru' | 'en' | 'fr' | 'de' | 'pl';
export type Currency = 'EUR' | 'USD' | 'RUB' | 'KGS' | 'GBP';

export interface ExchangeRates {
  EUR: number;
  USD: number;
  RUB: number;
  KGS: number;
  GBP?: number;
}

export interface ItineraryDay {
  dayNumber: string; // e.g. "D-1", "D-2", etc.
  title: string;
  route: string;
  altitude: string;
  saddleHours: string;
  description: string;
  highlights: string[];
  accommodation: string;
  meals: string;
}

export interface TourPackage {
  id: string;
  title: string;
  duration: string;
  badge: string;
  price: string;
  basePriceUSD?: number;
  description: string;
  difficulty: string;
  idealFor: string;
  features: string[];
  image?: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  avatar: string;
  date: string;
  rating: number;
  tour: string;
  text: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PackingItem {
  name: string;
  category: string;
  note: string;
  essential: boolean;
}

export interface RoutePoint {
  id: string;
  name: string;
  type: 'city' | 'pass' | 'lake' | 'camp' | 'trailhead';
  coordinates: [number, number];
  altitude: number;
  distanceFromBishkek?: string;
  description: string;
  badge?: string;
  highlight?: boolean;
}
