/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Event {
  id: string;
  title: string;
  category: string;
  ageCategory?: string;
  date: string;
  day: number;
  month: string;
  monthIndex?: number;
  year?: number;
  location: string;
  logo?: string;
  heroImage?: string;
  active?: boolean;
  dimmed?: boolean;
  athletes?: {
    name: string;
    category: string;
    rank?: string;
    image: string;
  }[];
  history?: {
    year: string;
    results: {
      name: string;
      medal: string;
      weight: string;
    }[];
  }[];
}

export interface Athlete {
  id: string;
  name: string;
  sport: string;
  category: string;
  rank: string;
  olympicMedals: number;
  bio: string;
  heroImage: string;
  bgText: string;
  birthDate: string;
  height: string;
  coach: string;
  upcomingEvent: {
    title: string;
    date: string;
  };
  achievements: {
    year: string;
    title: string;
    desc: string;
    icon: string;
    color: string;
  }[];
  news: {
    title: string;
    desc: string;
    image: string;
    tag: string;
  }[];
  schedule: {
    day: string;
    month: string;
    title: string;
    location: string;
  }[];
}

export interface News {
  id: string;
  text: string;
  timestamp: string;
  category?: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
}

export interface MedalEntry {
  id: string;
  athleteName: string;
  athleteId?: string;
  sport: string;
  competition: string;
  medalType: 'gold' | 'silver' | 'bronze';
  ageCategory: string;
  date: string;
  year: number;
}

export interface PodcastEpisode {
  id: string;
  title: string;
  excerpt: string;
  link: string;
  date: string;
}

export type Page = 'home' | 'אתלטיקה' | 'שחייה' | 'התעמלות' | 'ג\'ודו' | 'שייט' | 'ענפים אחרים' | 'ספורט פראלימפי' | 'calendar' | 'athletes' | 'admin' | 'medals' | 'podcast' | string;

export const SPORTS_NAV = [
  { id: "ג'ודו", label: "ג'ודו" },
  { id: "שייט", label: "שייט" },
  { id: "שחייה", label: "שחייה" },
  { id: "אתלטיקה", label: "אתלטיקה" },
  { id: "התעמלות", label: "התעמלות" },
  { id: "ענפים אחרים", label: "ענפים נוספים" },
  { id: "ספורט פראלימפי", label: "פראלימפי" },
  { id: "calendar", label: "לוח אירועים" },
];
