export type Language = 'ru' | 'en' | 'fr' | 'de' | 'pl';

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
  description: string;
  difficulty: string;
  idealFor: string;
  features: string[];
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
