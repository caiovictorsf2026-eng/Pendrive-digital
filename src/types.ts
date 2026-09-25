export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  originalPrice: number;
  currentPrice: number;
  installmentText: string;
  description: string;
  features: Array<{ text: string; highlight?: boolean; detail?: string }>;
  isFeatured?: boolean;
}

export interface OrderBump {
  id: string;
  title: string;
  tag: string;
  description: string;
  price: number;
  originalPrice: number;
}

export interface DemoTrack {
  id: string;
  title: string;
  genre: string;
  tag: string;
  bpm: number;
  duration: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  verified: boolean;
  avatarUrl?: string;
  carSetup: string;
  quote: string;
  rating: number;
  timeAgo: string;
}

export interface GenreCategory {
  id: string;
  name: string;
  count: string;
  description: string;
  color: string;
  popularArtists: string[];
}

export interface LeadData {
  name: string;
  email: string;
  whatsapp: string;
}

export interface SalesNotification {
  id: string;
  name: string;
  city: string;
  state: string;
  planName: string;
  minutesAgo: number;
}
