/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  User, 
  Home, 
  Trophy, 
  Medal, 
  Users, 
  Calendar, 
  Heart,
  ChevronLeft,
  Dumbbell,
  Timer,
  Bike,
  Sword,
  Instagram,
  Youtube,
  LayoutDashboard,
  Waves,
  Wind,
  Accessibility,
  Plus
} from 'lucide-react';
import { motion } from 'motion/react';
import { db, auth, handleFirestoreError, OperationType } from './firebase';
import { collection, onSnapshot, query, orderBy, doc, setDoc, deleteDoc } from 'firebase/firestore';

interface Event {
  id: string;
  title: string;
  category: string;
  date: string;
  day: number;
  month: string;
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

interface Athlete {
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

const ATHLETES_DATA: Athlete[] = [
  {
    id: "raz-hershko",
    name: "רז הרשקו",
    sport: "ג'ודו",
    category: "מעל 78 ק\"ג",
    rank: "24",
    olympicMedals: 1,
    bio: "רז הרשקו נולדה ב-1998 והחלה את דרכה על המזרן כבר בגיל צעיר. כיום היא נחשבת לאחת הג'ודוקא המובילות בעולם בקטגוריית המשקל שלה, המשלבת כוח מתפרץ עם טכניקה חסרת פשרות. הקריירה המקצוענית שלה המריאה עם זכיות במדליות בטורנירי הגראנד סלאם והגראנד פרי היוקרתיים. היא ידועה ברוח הלחימה שלה ובחיוך המפורסם שמסתיר מאחוריו נחישות של אלופה אמיתית.",
    heroImage: "https://static.wixstatic.com/media/374cca_9e2bd404e4794ea39aa47312178ec8fc~mv2.jpg/v1/fill/w_247,h_309,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/374cca_9e2bd404e4794ea39aa47312178ec8fc~mv2.jpg",
    bgText: "JUDO",
    birthDate: "19 ביוני, 1998",
    height: "1.74 מ'",
    coach: "שני הרשקו",
    upcomingEvent: {
      title: "גראנד סלאם פריז 2024",
      date: "2-4 בפברואר, 2024"
    },
    achievements: [
      { year: "2023", title: "מדליית זהב היסטורית", desc: "ניצחון דרמטי בגמר גראנד סלאם תל אביב מול הקהל הביתי.", icon: "military_tech", color: "primary" },
      { year: "2022", title: "סגנית אלופת אירופה", desc: "הופעה מרשימה לאורך כל יום התחרויות בסופיה.", icon: "emoji_events", color: "secondary" },
      { year: "2021", title: "מדליית ארד קבוצתית", desc: "הישג שיא לנבחרת ישראל בג'ודו בטוקיו.", icon: "stars", color: "tertiary" }
    ],
    news: [
      { title: "רז הרשקו מסכמת שנה: \"היעד הבא - פריז 2024\"", desc: "בראיון בלעדי, הג'ודוקא מדברת על ההכנות המנטליות והשאיפה לעמוד בראש הפודיום האולימפי.", image: "https://picsum.photos/seed/raz-news-1/800/600", tag: "REPORT" },
      { title: "מאחורי הקלעים של מחנה האימונים ביפן", desc: "הצצה מיוחדת לשגרת האימונים האינטנסיבית של הרשקו יחד עם אלופות עולם יפניות.", image: "https://picsum.photos/seed/raz-news-2/800/600", tag: "TRAINING" },
      { title: "השראה לדור הבא: הרשקו במפגש עם ספורטאים צעירים", desc: "\"אל תפחדו לחלום בגדול\", אמרה הרשקו למאות בני נוער.", image: "https://picsum.photos/seed/raz-news-3/800/600", tag: "INTERVIEW" }
    ],
    schedule: [
      { day: "02", month: "FEB", title: "Grand Slam Paris", location: "Paris, France" },
      { day: "22", month: "MAR", title: "Tbilisi Grand Slam", location: "Tbilisi, Georgia" },
      { day: "25", month: "APR", title: "European Championships", location: "Zagreb, Croatia" }
    ]
  },
  {
    id: "artem-dolgopyat",
    name: "ארטיום דולגופיאט",
    sport: "התעמלות",
    category: "מכשירים | קרקע",
    rank: "1",
    olympicMedals: 2,
    bio: "ארטיום דולגופיאט הוא המתעמל הישראלי המעוטר ביותר בכל הזמנים. האלוף האולימפי מטוקיו 2020 וסגן האלוף האולימפי מפריז 2024 בתרגיל הקרקע. דולגופיאט ידוע ברמת קושי גבוהה במיוחד ובביצועים מדויקים שהפכו אותו לשם דבר בעולם ההתעמלות.",
    heroImage: "https://static.wixstatic.com/media/374cca_7e9de6976759480f84281fdf5db24ff4~mv2.jpg/v1/fill/w_335,h_251,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/374cca_7e9de6976759480f84281fdf5db24ff4~mv2.jpg",
    bgText: "GOLD",
    birthDate: "16 ביוני, 1997",
    height: "1.62 מ'",
    coach: "סרגיי וייסבורג",
    upcomingEvent: {
      title: "אליפות אירופה 2024",
      date: "24-28 באפריל, 2024"
    },
    achievements: [
      { year: "2024", title: "מדליית זהב אולימפית", desc: "הגנה על התואר האולימפי בפריז עם תרגיל קרקע מושלם.", icon: "military_tech", color: "primary" },
      { year: "2023", title: "אלוף העולם", desc: "זכייה היסטורית במדליית הזהב באליפות העולם באנטוורפן.", icon: "emoji_events", color: "primary" },
      { year: "2021", title: "מדליית זהב אולימפית", desc: "הישג היסטורי בטוקיו - מדליית זהב ראשונה לישראל בהתעמלות.", icon: "stars", color: "primary" }
    ],
    news: [
      { title: "ארטיום דולגופיאט: \"הזהב הוא רק ההתחלה\"", desc: "האלוף האולימפי על הדרך להגנה על התואר.", image: "https://picsum.photos/seed/artem-news-1/800/600", tag: "GOLD" },
      { title: "הטכניקה מאחורי הניצחון", desc: "ניתוח מעמיק של תרגיל הקרקע שהדהים את העולם.", image: "https://picsum.photos/seed/artem-news-2/800/600", tag: "ANALYSIS" },
      { title: "יום בחיי אלוף אולימפי", desc: "הצצה לשגרת האימונים המפרכת של ארטיום.", image: "https://picsum.photos/seed/artem-news-3/800/600", tag: "LIFE" }
    ],
    schedule: [
      { day: "24", month: "APR", title: "European Championships", location: "Rimini, Italy" },
      { day: "15", month: "MAY", title: "World Cup Varna", location: "Varna, Bulgaria" }
    ]
  },
  {
    id: "anastasia-gorbenko",
    name: "אנסטסיה גורבנקו",
    sport: "שחייה",
    category: "200 מ' מעורב",
    rank: "3",
    olympicMedals: 0,
    bio: "אנסטסיה גורבנקו היא השחיינית הישראלית המצליחה ביותר בכל הזמנים. היא מחזיקה בעשרות שיאים לאומיים וזכתה בתארים אירופיים ועולמיים. גורבנקו ידועה ביכולת הרב-גונית שלה ובחוסן המנטלי המאפשר לה להתחרות ברמות הגבוהות ביותר.",
    heroImage: "https://static.wixstatic.com/media/374cca_92826eae0a82407bba340f96c6522fd0~mv2.jpg/v1/fill/w_335,h_223,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/374cca_92826eae0a82407bba340f96c6522fd0~mv2.jpg",
    bgText: "SWIM",
    birthDate: "7 באוגוסט, 2003",
    height: "1.76 מ'",
    coach: "טום ראשטון",
    upcomingEvent: {
      title: "אליפות אירופה 2024",
      date: "10-23 ביוני, 2024"
    },
    achievements: [
      { year: "2024", title: "סגנית אלופת העולם", desc: "מדליית כסף היסטורית באליפות העולם בדוחא ב-400 מ' מעורב.", icon: "military_tech", color: "secondary" },
      { year: "2022", title: "אלופת אירופה", desc: "הגנה על התואר ב-200 מ' מעורב אישי ברומא.", icon: "emoji_events", color: "primary" },
      { year: "2021", title: "אלופת העולם (בריכות קצרות)", desc: "שתי מדליות זהב באליפות העולם באבו דאבי.", icon: "stars", color: "primary" }
    ],
    news: [
      { title: "אנסטסיה גורבנקו: שיא ישראלי חדש", desc: "השחיינית הישראלית ממשיכה להדהים את העולם עם תוצאה היסטורית.", image: "https://picsum.photos/seed/ana-news-1/800/600", tag: "RECORD" },
      { title: "הדרך לגמר האולימפי", desc: "הכנות הנבחרת לקראת פריז 2024.", image: "https://picsum.photos/seed/ana-news-2/800/600", tag: "PREP" },
      { title: "ראיון עם המאמן טום ראשטון", desc: "על העבודה עם הכשרון הגדול ביותר של השחייה הישראלית.", image: "https://picsum.photos/seed/ana-news-3/800/600", tag: "COACH" }
    ],
    schedule: [
      { day: "10", month: "JUN", title: "European Championships", location: "Belgrade, Serbia" },
      { day: "27", month: "JUL", title: "Olympic Games", location: "Paris, France" }
    ]
  },
  {
    id: "sharon-kantor",
    name: "שרון קנטור",
    sport: "שייט",
    category: "iQFoil",
    rank: "1",
    olympicMedals: 1,
    bio: "שרון קנטור היא אלופת העולם וסגנית האלופה האולימפית בדגם ה-iQFoil. היא פרצה לצמרת העולמית במהירות מסחררת והפכה לאחת הגולשות הדומיננטיות ביותר בסבב העולמי. קנטור ידועה ביכולת הטקטית שלה וביכולת להתמודד עם תנאי ים משתנים.",
    heroImage: "https://static.wixstatic.com/media/374cca_c9993a93342142d6bb64e0a515504a3d~mv2.jpg/v1/fill/w_274,h_304,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/374cca_c9993a93342142d6bb64e0a515504a3d~mv2.jpg",
    bgText: "WIND",
    birthDate: "28 בינואר, 2003",
    height: "1.70 מ'",
    coach: "שחר צוברי",
    upcomingEvent: {
      title: "אליפות אירופה 2024",
      date: "6-12 באוקטובר, 2024"
    },
    achievements: [
      { year: "2024", title: "מדליית כסף אולימפית", desc: "הישג אדיר במשחקים האולימפיים בפריז.", icon: "military_tech", color: "secondary" },
      { year: "2024", title: "אלופת העולם", desc: "זכייה בזהב באליפות העולם בלנזרוטה.", icon: "emoji_events", color: "primary" },
      { year: "2023", title: "מדליית כסף באליפות אירופה", desc: "המשך הרצף המרשים ביוון.", icon: "stars", color: "secondary" }
    ],
    news: [
      { title: "שרון קנטור: \"הים הוא הבית השני שלי\"", desc: "ראיון עם אלופת העולם הטרייה על ההכנות למשחקים.", image: "https://picsum.photos/seed/sharon-news-1/800/600", tag: "INTERVIEW" },
      { title: "המהפכה של דגם ה-iQFoil", desc: "איך הגלשן המעופף שינה את עולם השייט.", image: "https://picsum.photos/seed/sharon-news-2/800/600", tag: "TECH" },
      { title: "שחר צוברי על ההצלחה של שרון", desc: "המאמן והמדליסט האולימפי לשעבר מנתח את ההישג.", image: "https://picsum.photos/seed/sharon-news-3/800/600", tag: "COACH" }
    ],
    schedule: [
      { day: "06", month: "OCT", title: "European Championships", location: "Cagliari, Italy" },
      { day: "15", month: "NOV", title: "PWA World Tour", location: "Yokosuka, Japan" }
    ]
  }
];

interface News {
  id: string;
  text: string;
  timestamp: string;
  category?: string;
}

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
}

type Page = 'home' | 'אתלטיקה' | 'שחייה' | 'התעמלות' | 'ג\'ודו' | 'שייט' | 'ענפים אחרים' | 'ספורט פראלימפי' | 'calendar' | 'athletes' | 'admin' | string;

const SPORTS_NAV = [
  { id: "ג'ודו", label: "ג'ודו" },
  { id: "שייט", label: "שייט" },
  { id: "שחייה", label: "שחייה" },
  { id: "אתלטיקה", label: "אתלטיקה" },
  { id: "התעמלות", label: "התעמלות" },
  { id: "ענפים אחרים", label: "ענפים נוספים" },
  { id: "ספורט פראלימפי", label: "פראלימפי" },
  { id: "calendar", label: "לוח אירועים" },
];

const TopBar = ({ onPageChange, currentPage, isAdmin }: { onPageChange: (page: Page) => void, currentPage: Page, isAdmin: boolean }) => {
  const handleLogin = async () => {
    const { GoogleAuthProvider, signInWithPopup } = await import('firebase/auth');
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <header className="fixed top-0 z-50 w-full bg-background/70 backdrop-blur-md shadow-2xl shadow-blue-950/50">
      <div className="flex flex-row-reverse justify-between items-center w-full px-6 py-4 max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-8">
          <div 
            className="text-2xl font-black text-primary uppercase tracking-tighter cursor-pointer" 
            onClick={() => onPageChange('home')}
          >
            קהילת ספורט
          </div>
          <nav className="hidden lg:flex flex-row-reverse items-center gap-6 font-headline font-bold tracking-tight text-right">
            {SPORTS_NAV.map((item) => (
              <button 
                key={item.id} 
                onClick={() => onPageChange(item.id as Page)}
                className={`transition-colors ${currentPage === item.id ? 'text-primary' : 'text-on-surface hover:text-secondary'}`}
              >
                {item.label.toUpperCase()}
              </button>
            ))}
            <button 
              onClick={() => onPageChange('athletes')}
              className={`transition-colors ${currentPage === 'athletes' ? 'text-primary' : 'text-on-surface hover:text-secondary'}`}
            >
              ספורטאים
            </button>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative flex items-center bg-surface-container-high rounded-full px-4 py-2">
            <Search className="w-4 h-4 text-on-surface-variant ml-2" />
            <input 
              className="bg-transparent border-none text-on-surface placeholder:text-on-surface-variant focus:ring-0 text-sm" 
              placeholder="חיפוש..." 
              type="text"
            />
          </div>
          <button className="p-2 text-on-surface hover:bg-white/5 transition-all duration-300 rounded-full">
            <Bell className="w-5 h-5" />
          </button>
          <button 
            onClick={handleLogin}
            className={`p-2 transition-all duration-300 rounded-full ${isAdmin ? 'text-primary bg-primary/10' : 'text-on-surface hover:bg-white/5'}`}
          >
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="bg-gradient-to-b from-primary/10 to-transparent h-[2px]"></div>
    </header>
  );
};

const SideNav = ({ onPageChange, currentPage, isAdmin }: { onPageChange: (page: Page) => void, currentPage: Page, isAdmin: boolean }) => (
  <nav className="flex flex-col h-screen fixed right-0 top-0 z-40 bg-background w-20 lg:w-64 border-l border-white/10 shadow-[-10px_0_30px_rgba(0,0,0,0.5)] translate-x-full lg:translate-x-0 transition-transform duration-300">
    <div className="p-6">
      <div className="text-xl font-bold text-primary hidden lg:block">הפודיום</div>
      <div className="text-xs text-secondary hidden lg:block">הוועד האולימפי בישראל</div>
      <div className="lg:hidden flex justify-center">
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-background font-bold">IL</div>
      </div>
    </div>
    <div className="flex-1 space-y-2 px-3 overflow-y-auto no-scrollbar">
      {[
        { id: 'home', icon: Home, label: 'בית' },
        { id: 'calendar', icon: Calendar, label: 'לוח אירועים' },
        { id: 'ג\'ודו', icon: Sword, label: 'ג\'ודו' },
        { id: 'שחייה', icon: Waves, label: 'שחייה' },
        { id: 'שייט', icon: Wind, label: 'שייט' },
        { id: 'אתלטיקה', icon: Timer, label: 'אתלטיקה' },
        { id: 'התעמלות', icon: Dumbbell, label: 'התעמלות' },
        { id: 'ספורט פראלימפי', icon: Accessibility, label: 'פראלימפי' },
        { id: 'ענפים אחרים', icon: LayoutDashboard, label: 'ענפים נוספים' },
      ].map((item) => (
        <button 
          key={item.id}
          onClick={() => onPageChange(item.id as Page)}
          className={`w-full flex items-center gap-4 px-4 py-3 rounded-l-xl font-bold transition-transform hover:translate-x-[-4px] text-right ${
            currentPage === item.id ? 'bg-primary text-background' : 'text-secondary hover:bg-white/5'
          }`}
        >
          <item.icon className="w-5 h-5" />
          <span className="hidden lg:inline">{item.label}</span>
        </button>
      ))}
      <div className="pt-4 border-t border-white/10 mt-4">
        {[
          { id: 'medals', icon: Medal, label: 'מאזן מדליות' },
          { id: 'athletes', icon: Users, label: 'ספורטאים' },
          ...(isAdmin ? [{ id: 'admin', icon: LayoutDashboard, label: 'ניהול מערכת' }] : []),
        ].map((item) => (
          <button 
            key={item.id}
            onClick={() => onPageChange(item.id as Page)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-l-xl font-bold transition-transform hover:translate-x-[-4px] text-right ${
              currentPage === item.id ? 'bg-primary text-background' : 'text-secondary hover:bg-white/5'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="hidden lg:inline">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
    <div className="p-6 mt-auto">
      <button className="w-full editorial-gradient text-on-primary font-bold py-3 rounded-xl hidden lg:block shadow-lg">תמיכה במשלחת</button>
      <button className="w-full bg-primary text-on-primary rounded-lg p-2 lg:hidden">
        <Heart className="w-5 h-5 mx-auto" />
      </button>
    </div>
  </nav>
);

const MobileNav = ({ onPageChange, currentPage }: { onPageChange: (page: Page) => void, currentPage: Page }) => (
  <nav className="md:hidden fixed bottom-0 left-0 w-full bg-background border-t border-outline-variant/20 z-50 flex justify-around items-center py-4">
    {[
      { id: 'home', icon: Home, label: 'בית' },
      { id: 'calendar', icon: Calendar, label: 'לוח' },
      { id: 'ג\'ודו', icon: Sword, label: 'ג\'ודו' },
      { id: 'שחייה', icon: Waves, label: 'שחייה' },
    ].map((item) => (
      <button 
        key={item.id} 
        onClick={() => onPageChange(item.id as Page)}
        className={`flex flex-col items-center ${currentPage === item.id ? 'text-primary' : 'text-on-surface-variant'}`}
      >
        <item.icon className="w-5 h-5" />
        <span className="text-[10px] mt-1">{item.label}</span>
      </button>
    ))}
  </nav>
);

const HomePage = ({ onPageChange, articles }: { onPageChange: (page: Page) => void, articles: Article[] }) => {
  const latestArticle = articles[0];
  const otherArticles = articles.slice(1, 3);

  return (
    <div className="lg:col-span-9">
      {/* Hero Section */}
      <section className="mb-12">
        {latestArticle ? (
          <div className="relative group aspect-[16/9] lg:aspect-[21/9] rounded-xl overflow-hidden shadow-2xl shadow-black/40">
            <img 
              className="w-full h-full object-cover" 
              src={latestArticle.image} 
              alt={latestArticle.title}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
            <div className="absolute bottom-0 right-0 p-8 lg:p-12 w-full lg:w-3/4 text-right">
              <div className="flex gap-2 mb-4 justify-end">
                <span className="bg-primary text-on-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">בלעדי</span>
              </div>
              <h1 className="font-headline text-4xl lg:text-6xl font-black text-white leading-tight mb-4 text-shadow-hero">
                {latestArticle.title}
              </h1>
              <p className="text-lg text-on-surface-variant max-w-2xl mb-6 line-clamp-2 ml-auto">
                {latestArticle.content}
              </p>
              <button className="editorial-gradient text-on-primary font-bold px-8 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform duration-200">
                קרא את הכתבה המלאה
              </button>
            </div>
          </div>
        ) : (
          <div className="relative group aspect-[16/9] lg:aspect-[21/9] rounded-xl overflow-hidden shadow-2xl shadow-black/40">
            <img 
              className="w-full h-full object-cover" 
              src="https://picsum.photos/seed/judo/1200/600" 
              alt="Israeli judoka"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
            <div className="absolute bottom-0 right-0 p-8 lg:p-12 w-full lg:w-3/4 text-right">
              <div className="flex gap-2 mb-4 justify-end">
                <span className="bg-primary text-on-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">ג'ודו</span>
                <span className="bg-surface-container-high/80 backdrop-blur text-on-surface text-xs font-bold px-3 py-1 rounded-full">בלעדי</span>
              </div>
              <h1 className="font-headline text-4xl lg:text-6xl font-black text-white leading-tight mb-4 text-shadow-hero">
                הדרך לזהב: המהפכה של נבחרת הג'ודו
              </h1>
              <p className="text-lg text-on-surface-variant max-w-2xl mb-6 line-clamp-2 ml-auto">
                סיכום הניצחון המרהיב בטורניר המאסטרס והכנות המשלחת הישראלית לקראת המשחקים האולימפיים הקרובים.
              </p>
              <button className="editorial-gradient text-on-primary font-bold px-8 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform duration-200">
                קרא את הכתבה המלאה
              </button>
            </div>
          </div>
        )}

        {/* News Bento Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {otherArticles.length > 0 ? (
            otherArticles.map((article, idx) => (
              <div key={article.id} className="bg-surface-container-low rounded-xl overflow-hidden group">
                <div className="h-64 relative">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    src={article.image} 
                    alt={article.title}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent"></div>
                  <span className="absolute top-4 right-4 bg-secondary text-on-secondary text-[10px] font-bold px-2 py-1 rounded">כתבה</span>
                </div>
                <div className="p-6 text-right">
                  <h3 className="font-headline text-xl font-bold mb-2">{article.title}</h3>
                  <p className="text-sm text-on-surface-variant line-clamp-2">
                    {article.content}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <>
              {/* Swimming Section */}
              <div className="bg-surface-container-low rounded-xl overflow-hidden group">
                <div className="h-64 relative">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    src="https://picsum.photos/seed/swimming/800/600" 
                    alt="Swimmer"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent"></div>
                  <span className="absolute top-4 right-4 bg-secondary text-on-secondary text-[10px] font-bold px-2 py-1 rounded">שחייה</span>
                </div>
                <div className="p-6 text-right">
                  <h3 className="font-headline text-xl font-bold mb-2">שיא ישראלי ב-200 מטר מעורב</h3>
                  <p className="text-sm text-on-surface-variant line-clamp-2">
                    <span 
                      onClick={() => onPageChange('athlete:anastasia-gorbenko')}
                      className="text-primary font-bold hover:underline cursor-pointer"
                    >
                      אנסטסיה גורבנקו
                    </span> מנפצת שוב את השיא הלאומי ומבטיחה את מקומה בגמר אליפות העולם.
                  </p>
                </div>
              </div>
              {/* Sailing Section */}
              <div className="bg-surface-container-low rounded-xl overflow-hidden group">
                <div className="h-64 relative">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    src="https://picsum.photos/seed/sailing/800/600" 
                    alt="Sailing"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent"></div>
                  <span className="absolute top-4 right-4 bg-tertiary text-on-tertiary text-[10px] font-bold px-2 py-1 rounded">שייט</span>
                </div>
                <div className="p-6 text-right">
                  <h3 
                    onClick={() => onPageChange('athlete:sharon-kantor')}
                    className="font-headline text-xl font-bold mb-2 hover:text-primary cursor-pointer transition-colors"
                  >
                    שרון קנטור מובילה את הדירוג
                  </h3>
                  <p className="text-sm text-on-surface-variant line-clamp-2">לאחר יום קרבות סוער מול חופי ספרד, הישראלית מדורגת במקום הראשון הכללי.</p>
                </div>
              </div>
            </>
          )}
        </div>

      {/* Categories Section */}
      <div className="mt-16">
        <div className="flex justify-between items-end mb-8">
          <h2 className="font-headline text-3xl font-black">ענפי ספורט נוספים</h2>
          <a className="text-primary text-sm font-bold flex items-center gap-1" href="#">
            כל הענפים <ChevronLeft className="w-4 h-4" />
          </a>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
          {[
            { icon: Dumbbell, label: 'התעמלות מכשירים', count: 5, color: 'text-primary' },
            { icon: Timer, label: 'אתלטיקה קלה', count: 12, color: 'text-secondary' },
            { icon: Bike, label: 'אופניים', count: 3, color: 'text-tertiary' },
            { icon: Sword, label: 'טאקוונדו', count: 8, color: 'text-primary' },
          ].map((cat, idx) => (
            <div key={idx} className="min-w-[200px] flex-shrink-0 bg-surface-container rounded-xl p-4 text-center border border-outline-variant/5">
              <cat.icon className={`w-10 h-10 mx-auto mb-3 ${cat.color}`} />
              <h4 className="font-bold">{cat.label}</h4>
              <span className="text-xs text-on-surface-variant">{cat.count} כתבות חדשות</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);
}

const CalendarPage = ({ onPageChange, events }: { onPageChange: (page: Page) => void, events: Event[] }) => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const weekDays = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
  
  return (
    <div className="lg:col-span-9">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <header className="relative overflow-hidden rounded-3xl bg-surface-container-low p-8 md:p-12 border-r-4 border-primary">
          <div className="relative z-10">
            <h1 className="text-5xl md:text-7xl font-black font-headline text-primary mb-4 tracking-tighter">לוח אירועים</h1>
            <p className="text-xl text-on-surface-variant max-w-2xl leading-relaxed">
              עקבו אחר המסע של המשלחת הישראלית. כל התחרויות, המוקדמות ורגעי השיא בדרך לפודיום.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-px bg-white/5 rounded-3xl overflow-hidden border border-white/10">
          {weekDays.map(day => (
            <div key={day} className="bg-surface-container-lowest p-4 text-center text-sm font-bold text-on-surface-variant uppercase tracking-widest border-b border-white/5">
              {day}
            </div>
          ))}
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={`empty-${i}`} className="bg-surface-container-lowest/30 min-h-[120px] p-4 opacity-30"></div>
          ))}
          {days.map(day => {
            const dayEvents = events.filter(e => e.day === day);
            return (
              <div key={day} className={`bg-surface-container-low min-h-[150px] p-4 hover:bg-surface-container-high transition-colors group border border-white/5 ${day === 3 ? 'ring-2 ring-primary/50 z-10' : ''}`}>
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-2xl font-black font-headline ${day === 3 ? 'text-primary' : 'text-on-surface/50'}`}>{day.toString().padStart(2, '0')}</span>
                  {day === 3 && <span className="bg-primary text-background text-[10px] font-bold px-2 py-0.5 rounded">היום</span>}
                </div>
                {dayEvents.map(event => (
                  <div 
                    key={event.id}
                    className={`${event.category === 'ג\'ודו' ? 'bg-primary/10 border-primary' : 'bg-secondary/10 border-secondary'} border-r-2 p-2 rounded-sm mb-1 cursor-pointer hover:bg-opacity-20 transition-all`}
                    onClick={() => onPageChange(`event:${event.id}`)}
                  >
                    <div className={`text-[10px] font-bold ${event.category === 'ג\'ודו' ? 'text-primary' : 'text-secondary'}`}>{event.category} • {event.title}</div>
                    <div className="text-xs font-bold truncate">{event.location}</div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

const EventPage = ({ eventId, onPageChange, events, isAdmin }: { eventId: string, onPageChange: (page: Page) => void, events: Event[], isAdmin: boolean }) => {
  const event = events.find(e => e.id === eventId);

  const handleDelete = async () => {
    if (!isAdmin || !window.confirm('האם אתה בטוח שברצונך למחוק אירוע זה?')) return;
    try {
      await deleteDoc(doc(db, 'events', eventId));
      onPageChange('calendar');
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `events/${eventId}`);
    }
  };

  if (!event) {
    return (
      <div className="lg:col-span-9 py-20 text-center">
        <h2 className="text-2xl font-bold">האירוע לא נמצא</h2>
        <button onClick={() => onPageChange('calendar')} className="mt-4 text-primary font-bold">חזרה ללוח האירועים</button>
      </div>
    );
  }

  return (
    <div className="lg:col-span-9 -mx-6 -mt-12">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative"
      >
        {/* Hero Section */}
        <section className="relative h-[500px] flex items-end overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              className="w-full h-full object-cover opacity-40" 
              src={event.heroImage || "https://picsum.photos/seed/paris-skyline/1920/1080"} 
              alt="Hero"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
          </div>
          <div className="relative z-10 w-full px-8 pb-16 flex flex-col md:flex-row-reverse justify-between items-end gap-8">
            <div className="flex flex-col gap-4 text-right">
              <div className="inline-flex items-center gap-2 bg-primary/20 text-primary border border-primary/30 px-4 py-1 rounded-full w-fit mr-auto md:mr-0 ml-auto">
                <Medal className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">IJF WORLD TOUR</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black font-headline text-white tracking-tighter leading-none">
                {event.title}
              </h1>
              <div className="flex flex-row-reverse items-center gap-6 text-on-surface mt-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span className="font-medium">{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="w-5 h-5 text-primary" />
                  <span className="font-medium">{event.location}</span>
                </div>
                {isAdmin && (
                  <button 
                    onClick={handleDelete}
                    className="flex items-center gap-2 text-destructive hover:text-destructive/80 transition-colors mr-4"
                  >
                    <Plus className="w-5 h-5 rotate-45" />
                    <span className="font-bold">מחק אירוע</span>
                  </button>
                )}
              </div>
            </div>
            {event.logo && (
              <div className="bg-surface-container-high/40 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/5 hidden md:block">
                <img className="h-24 w-24 object-contain" src={event.logo} alt="Event Logo" referrerPolicy="no-referrer" />
              </div>
            )}
          </div>
        </section>

        {/* Athletes Section */}
        {event.athletes && event.athletes.length > 0 && (
          <section className="px-8 py-20">
            <div className="flex flex-row-reverse justify-between items-end mb-12">
              <div className="text-right">
                <h2 className="text-4xl font-black font-headline text-white mb-2">נבחרת ישראל לאירוע</h2>
                <p className="text-on-surface-variant max-w-lg">ספורטאים וספורטאיות המייצגים את ישראל באירוע.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {event.athletes.map((athlete, idx) => (
                <div key={idx} className="group relative bg-surface-container-low rounded-2xl overflow-hidden hover:translate-y-[-8px] transition-all duration-300 shadow-xl border border-white/5">
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      src={athlete.image} 
                      alt={athlete.name}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
                  </div>
                  <div className="p-5 text-right relative">
                    {athlete.rank && (
                      <div className="absolute -top-10 right-5 bg-primary text-background font-bold px-3 py-1 rounded-lg text-[10px]">
                        {athlete.rank}
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-white mb-1">{athlete.name}</h3>
                    <p className="text-xs text-on-surface-variant mb-3">{athlete.category}</p>
                    <div className="flex justify-between items-center flex-row-reverse">
                      <Trophy className="w-4 h-4 text-primary" />
                      {(() => {
                        const athleteId = ATHLETES_DATA.find(a => a.name === athlete.name)?.id;
                        return athleteId ? (
                          <button 
                            onClick={() => onPageChange(`athlete:${athleteId}`)}
                            className="text-[10px] font-bold text-primary hover:underline"
                          >
                            לפרופיל מלא
                          </button>
                        ) : (
                          <span className="text-[10px] font-bold text-on-surface-variant">לפרופיל מלא</span>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* History Section */}
        {event.history && event.history.length > 0 && (
          <section className="bg-surface-container-low py-20 px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-right mb-16">
                <h2 className="text-4xl font-black font-headline text-white mb-2">היסטוריית הצלחות</h2>
                <p className="text-on-surface-variant">הישגי המשלחת הישראלית באירוע זה לאורך השנים.</p>
              </div>
              <div className="space-y-6">
                {event.history.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-12 items-center bg-background p-6 rounded-2xl border-r-4 border-primary shadow-lg">
                    <div className="col-span-12 md:col-span-2 text-center md:text-right mb-4 md:mb-0">
                      <span className="text-4xl font-black text-white/10">{item.year}</span>
                    </div>
                    <div className="col-span-12 md:col-span-10">
                      <div className="flex flex-wrap flex-row-reverse gap-4">
                        {item.results.map((res, rIdx) => (
                          <div key={rIdx} className="bg-surface-container-high px-4 py-3 rounded-xl flex flex-row-reverse items-center gap-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${
                              res.medal === 'זהב' ? 'bg-primary text-background' : 
                              res.medal === 'כסף' ? 'bg-secondary text-background' : 'bg-tertiary text-background'
                            }`}>
                              {res.medal === 'זהב' ? '1' : res.medal === 'כסף' ? '2' : '3'}
                            </div>
                            <div className="text-right">
                              {(() => {
                                const athleteId = ATHLETES_DATA.find(a => a.name === res.name)?.id;
                                return athleteId ? (
                                  <p 
                                    onClick={() => onPageChange(`athlete:${athleteId}`)}
                                    className="text-white font-bold text-sm hover:text-primary cursor-pointer transition-colors"
                                  >
                                    {res.name}
                                  </p>
                                ) : (
                                  <p className="text-white font-bold text-sm">{res.name}</p>
                                );
                              })()}
                              <p className="text-[10px] text-on-surface-variant">{res.medal} | {res.weight}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="px-8 py-20">
          <div className="bg-primary rounded-[2.5rem] p-12 flex flex-col md:flex-row-reverse items-center justify-between gap-8 relative overflow-hidden">
            <div className="relative z-10 text-right">
              <h3 className="text-background text-3xl font-black font-headline mb-4">אל תפספסו אף קרב</h3>
              <p className="text-background/80 max-w-md">הירשמו לקבלת עדכונים בזמן אמת ותוצאות מהירות ישירות לוואטסאפ שלכם.</p>
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row-reverse gap-4 w-full md:w-auto">
              <input 
                className="bg-white/20 border-none rounded-2xl text-background placeholder:text-background/60 px-6 py-4 focus:ring-2 focus:ring-background w-full sm:w-64 outline-none" 
                placeholder="מספר טלפון" 
                type="text"
              />
              <button className="bg-background text-primary font-bold px-8 py-4 rounded-2xl hover:scale-105 transition-transform whitespace-nowrap shadow-xl">הצטרפות לקהילה</button>
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
};

const SPORT_CONTENT: Record<string, any> = {
  "ג'ודו": {
    heroTitle: "ג'ודו",
    heroDesc: "המסורת של מצוינות ממשיכה. הג'ודו הישראלי עומד בחזית הספורט העולמי עם נבחרת מעוטרת ששואפת תמיד למדרגה הגבוהה ביותר על הפודיום.",
    heroImage: "https://picsum.photos/seed/judo-hero/1200/800",
    bgText: "IPPON",
    news: [
      { title: "הדרך לפריז: ראיון עומק עם המאמן הלאומי", desc: "ההכנות בשיאן, הלחץ עולה והמטרות ברורות. המאמן חושף את האסטרטגיה שתביא אותנו שוב לפודיום האולימפי.", image: "https://picsum.photos/seed/judo-news-1/800/600", tag: "בלעדי" },
      { title: "5 המהלכים המנצחים של העונה", desc: "ניתוח טכני של הקרבות המכריעים והטקטיקות שהובילו לניצחון.", image: "https://picsum.photos/seed/judo-news-2/400/300", tag: "ניתוח טכני" },
      { title: "דור העתיד: הכירו את אלופי הנוער", desc: "הכשרונות הצעירים שצפויים להוביל את הענף בשנים הבאות.", image: "https://picsum.photos/seed/judo-news-3/400/300", tag: "נוער" }
    ],
    athletes: [
      { name: "פיטר פלצ'יק", rank: "Gold Rank", category: "עד 100 ק\"ג", desc: "אלוף אירופה לשעבר, מדליסט ארד אולימפי", image: "https://picsum.photos/seed/peter/400/500" },
      { name: "רז הרשקו", rank: "Silver Rank", category: "מעל 78 ק\"ג", desc: "מדורגת ראשונה בעולם, אלופת אירופה", image: "https://picsum.photos/seed/raz-h/400/500" },
      { name: "ברוך שמאילוב", rank: "Bronze Rank", category: "עד 66 ק\"ג", desc: "זוכה מדליות גראנד סלאם רבות", image: "https://picsum.photos/seed/baruch-s/400/500" }
    ],
    rankings: [
      { name: "רז הרשקו", category: "נשים | +78 ק\"ג", rank: 1, points: "8,450" },
      { name: "פיטר פלצ'יק", category: "גברים | -100 ק\"ג", rank: 4, points: "5,120" },
      { name: "תמנע נלסון לוי", category: "נשים | -57 ק\"ג", rank: 7, points: "4,890" }
    ],
    medals: { gold: 0, silver: 1, bronze: 5 }
  },
  "שייט": {
    heroTitle: "שייט",
    heroDesc: "עם רוח גבית ומפרשים פרוסים, נבחרת השייט של ישראל כובשת את הימים. מסורת של הצלחות אולימפיות ודור חדש של גולשים וגולשות.",
    heroImage: "https://picsum.photos/seed/sailing-hero/1200/800",
    bgText: "WIND",
    news: [
      { title: "שרון קנטור: 'הים הוא הבית השני שלי'", desc: "ראיון עם אלופת העולם הטרייה על ההכנות למשחקים האולימפיים.", image: "https://picsum.photos/seed/sailing-news-1/800/600", tag: "ראיון" },
      { title: "טכנולוגיית המפרשים החדשה", desc: "איך המדע עוזר לשייטים שלנו להשיג יתרון משמעותי.", image: "https://picsum.photos/seed/sailing-news-2/400/300", tag: "טכנולוגיה" },
      { title: "סיכום שבוע השייט בפלמה", desc: "הישגים מרשימים לנבחרת הישראלית בתחרות הבינלאומית.", image: "https://picsum.photos/seed/sailing-news-3/400/300", tag: "תחרות" }
    ],
    athletes: [
      { name: "שרון קנטור", rank: "Gold Rank", category: "iQFoil", desc: "אלופת העולם 2024", image: "https://picsum.photos/seed/sharon/400/500" },
      { name: "תום ראובני", rank: "Gold Rank", category: "iQFoil", desc: "אלוף אולימפי פריז 2024", image: "https://picsum.photos/seed/tom/400/500" },
      { name: "גל צוקרמן", rank: "Silver Rank", category: "קייט פויל", desc: "מהכשרונות המבטיחים בעולם", image: "https://picsum.photos/seed/gal/400/500" }
    ],
    rankings: [
      { name: "שרון קנטור", category: "נשים | iQFoil", rank: 1, points: "9,200" },
      { name: "תום ראובני", category: "גברים | iQFoil", rank: 1, points: "8,800" },
      { name: "נועה לסרי", category: "נשים | 470", rank: 5, points: "4,200" }
    ],
    medals: { gold: 2, silver: 1, bronze: 2 }
  },
  "שחייה": {
    heroTitle: "שחייה",
    heroDesc: "המים הם הזירה שלנו. נבחרת השחייה של ישראל מנפצת שיאים ומגיעה לגמרים היסטוריים באליפויות העולם ובמשחקים האולימפיים.",
    heroImage: "https://picsum.photos/seed/swimming-hero/1200/800",
    bgText: "WAVES",
    news: [
      { title: "אנסטסיה גורבנקו: שיא ישראלי חדש", desc: "השחיינית הישראלית ממשיכה להדהים את העולם עם תוצאה היסטורית.", image: "https://picsum.photos/seed/swim-news-1/800/600", tag: "שיא" },
      { title: "הכנות נבחרת השליחים", desc: "איך בונים קבוצה מנצחת למשחה ה-4X100.", image: "https://picsum.photos/seed/swim-news-2/400/300", tag: "נבחרת" },
      { title: "מרכז השחייה החדש בווינגייט", desc: "הבית החדש של השחיינים הישראלים נפתח רשמית.", image: "https://picsum.photos/seed/swim-news-3/400/300", tag: "תשתית" }
    ],
    athletes: [
      { name: "אנסטסיה גורבנקו", rank: "Gold Rank", category: "200 מ' מעורב", desc: "אלופת אירופה, מדליסטית באליפות העולם", image: "https://picsum.photos/seed/anastasia/400/500" },
      { name: "מירון חירותי", rank: "Silver Rank", category: "50 מ' חופשי", desc: "שיאן ישראל ב-50 מ' חופשי", image: "https://picsum.photos/seed/meiron/400/500" },
      { name: "גל כהן גרומי", rank: "Bronze Rank", category: "100 מ' פרפר", desc: "פיינליסט אולימפי", image: "https://picsum.photos/seed/gal-c/400/500" }
    ],
    rankings: [
      { name: "אנסטסיה גורבנקו", category: "נשים | 200 מעורב", rank: 3, points: "7,100" },
      { name: "מירון חירותי", category: "גברים | 50 חופשי", rank: 12, points: "3,800" }
    ],
    medals: { gold: 0, silver: 0, bronze: 0 }
  },
  "אתלטיקה": {
    heroTitle: "אתלטיקה",
    heroDesc: "מהיר יותר, גבוה יותר, חזק יותר. מלכת הספורט בישראל חווה פריחה מחודשת עם הישגים היסטוריים בריצות המרתון ובקפיצות.",
    heroImage: "https://picsum.photos/seed/athletics-hero/1200/800",
    bgText: "FAST",
    news: [
      { title: "מארו טפרי: 'המרתון הוא קרב מנטלי'", desc: "סגן אלוף העולם משתף בתחושות אחרי ההישג ההיסטורי.", image: "https://picsum.photos/seed/run-news-1/800/600", tag: "מרתון" },
      { title: "חנה קנייזבה מיננקו חוזרת למסלול", desc: "הקופצת הבכירה מתאוששת מפציעה ומכוונת לפריז.", image: "https://picsum.photos/seed/run-news-2/400/300", tag: "קפיצות" },
      { title: "שיא נוער חדש ב-100 מטר", desc: "הכירו את האצן הצעיר ששבר את השיא המיתולוגי.", image: "https://picsum.photos/seed/run-news-3/400/300", tag: "נוער" }
    ],
    athletes: [
      { name: "מארו טפרי", rank: "Gold Rank", category: "מרתון", desc: "סגן אלוף העולם 2023", image: "https://picsum.photos/seed/maru/400/500" },
      { name: "לונה צ'מטאי סלפטר", rank: "Gold Rank", category: "מרתון", desc: "מדליסטית ארד באליפות העולם", image: "https://picsum.photos/seed/lonah/400/500" },
      { name: "חנה קנייזבה מיננקו", rank: "Silver Rank", category: "קפיצה משולשת", desc: "סגנית אלופת העולם לשעבר", image: "https://picsum.photos/seed/hanna/400/500" }
    ],
    rankings: [
      { name: "מארו טפרי", category: "גברים | מרתון", rank: 5, points: "6,500" },
      { name: "לונה סלפטר", category: "נשים | מרתון", rank: 4, points: "6,800" }
    ],
    medals: { gold: 0, silver: 0, bronze: 0 }
  },
  "התעמלות": {
    heroTitle: "התעמלות",
    heroDesc: "דיוק, עוצמה ואסתטיקה. ענף ההתעמלות הפך לאחד הענפים המצליחים ביותר בישראל עם מדליות זהב אולימפיות ודור של אלופים.",
    heroImage: "https://picsum.photos/seed/gym-hero/1200/800",
    bgText: "GOLD",
    news: [
      { title: "ארטיום דולגופיאט: 'הזהב הוא רק ההתחלה'", desc: "האלוף האולימפי על הדרך להגנה על התואר.", image: "https://picsum.photos/seed/gym-news-1/800/600", tag: "זהב" },
      { title: "נבחרת ההתעמלות האמנותית בשיא הכושר", desc: "הבנות שחולמות על פודיום קבוצתי היסטורי.", image: "https://picsum.photos/seed/gym-news-2/400/300", tag: "אמנותית" },
      { title: "הכירו את דריה אטמנוב", desc: "הכוכבת העולה של ההתעמלות האמנותית הישראלית.", image: "https://picsum.photos/seed/gym-news-3/400/300", tag: "פרופיל" }
    ],
    athletes: [
      { name: "ארטיום דולגופיאט", rank: "Gold Rank", category: "מכשירים | קרקע", desc: "אלוף אולימפי טוקיו 2020", image: "https://picsum.photos/seed/artium/400/500" },
      { name: "דריה אטמנוב", rank: "Gold Rank", category: "אמנותית", desc: "אלופת אירופה 2022", image: "https://picsum.photos/seed/daria/400/500" },
      { name: "ליהיא רז", rank: "Silver Rank", category: "מכשירים", desc: "מדליסטית ארד באליפות אירופה", image: "https://picsum.photos/seed/lihi/400/500" }
    ],
    rankings: [
      { name: "ארטיום דולגופיאט", category: "גברים | קרקע", rank: 1, points: "9,500" },
      { name: "דריה אטמנוב", category: "נשים | אמנותית", rank: 2, points: "8,900" }
    ],
    medals: { gold: 2, silver: 0, bronze: 0 }
  },
  "ספורט פראלימפי": {
    heroTitle: "ספורט פראלימפי",
    heroDesc: "ניצחון הרוח על הגוף. הספורטאים הפראלימפיים של ישראל הם מקור לגאווה עצומה והשראה, עם עשרות מדליות לאורך השנים.",
    heroImage: "https://picsum.photos/seed/para-hero/1200/800",
    bgText: "SPIRIT",
    news: [
      { title: "עמי דדאון: 'המים נותנים לי חופש'", desc: "השחיין המעוטר על ההכנות למשחקים הפראלימפיים.", image: "https://picsum.photos/seed/para-news-1/800/600", tag: "השראה" },
      { title: "נבחרת הכדורשער מכוונת גבוה", desc: "הבנות שרוצות לשחזר את ההישג מאליפות העולם.", image: "https://picsum.photos/seed/para-news-2/400/300", tag: "נבחרת" },
      { title: "מורן סמואל: 'החתירה היא החיים שלי'", desc: "החותרת הבכירה על האתגרים והניצחונות.", image: "https://picsum.photos/seed/para-news-3/400/300", tag: "חתירה" }
    ],
    athletes: [
      { name: "עמי דדאון", rank: "Gold Rank", category: "שחייה", desc: "אלוף פראלימפי רב פעמי", image: "https://picsum.photos/seed/ami/400/500" },
      { name: "מורן סמואל", rank: "Gold Rank", category: "חתירה", desc: "אלופת עולם ומדליסטית פראלימפית", image: "https://picsum.photos/seed/moran/400/500" },
      { name: "גיא ששון", rank: "Gold Rank", category: "טניס כסאות גלגלים", desc: "אלוף הרולאן גארוס 2024", image: "https://picsum.photos/seed/guy/400/500" }
    ],
    rankings: [
      { name: "עמי דדאון", category: "שחייה | S4", rank: 1, points: "10,000" },
      { name: "גיא ששון", category: "טניס | Quad", rank: 2, points: "8,500" }
    ],
    medals: { gold: 129, silver: 125, bronze: 130 }
  },
  "ענפים אחרים": {
    heroTitle: "ענפים נוספים",
    heroDesc: "מעבר לענפי הליבה, ישראל מצטיינת במגוון רחב של ענפי ספורט - מטאקוונדו ועד רכיבת סוסים, כולם שואפים למצוינות אולימפית.",
    heroImage: "https://picsum.photos/seed/other-hero/1200/800",
    bgText: "MORE",
    news: [
      { title: "אבישג סמברג: 'הטאקוונדו הוא הכל עבורי'", desc: "המדליסטית האולימפית על החלום לזהב בפריז.", image: "https://picsum.photos/seed/other-news-1/800/600", tag: "טאקוונדו" },
      { title: "נבחרת הרכיבה על סוסים הבטיחה מקום", desc: "הישג היסטורי לנבחרת הקפיצות הישראלית.", image: "https://picsum.photos/seed/other-news-2/400/300", tag: "רכיבה" },
      { title: "הכוכבים העולים בטיפוס ספורטיבי", desc: "הענף החדש שסוחף את ישראל.", image: "https://picsum.photos/seed/other-news-3/400/300", tag: "טיפוס" }
    ],
    athletes: [
      { name: "אבישג סמברג", rank: "Gold Rank", category: "טאקוונדו", desc: "מדליסטית ארד אולימפית", image: "https://picsum.photos/seed/avishag/400/500" },
      { name: "דניאל בלומן", rank: "Gold Rank", category: "רכיבת סוסים", desc: "מהרוכבים הטובים בעולם", image: "https://picsum.photos/seed/daniel/400/500" },
      { name: "מיכאל יעקובלב", rank: "Silver Rank", category: "אופני מסלול", desc: "שיאן עולם לשעבר", image: "https://picsum.photos/seed/mikhail/400/500" }
    ],
    rankings: [
      { name: "אבישג סמברג", category: "נשים | -49 ק\"ג", rank: 5, points: "4,200" },
      { name: "דניאל בלומן", category: "רכיבה | קפיצות", rank: 10, points: "3,500" }
    ],
    medals: { gold: 0, silver: 0, bronze: 1 }
  }
};

const AllAthletesPage = ({ onPageChange, athletes }: { onPageChange: (page: Page) => void, athletes: Athlete[] }) => {
  const [filter, setFilter] = useState<string>('all');
  
  const filteredAthletes = filter === 'all' 
    ? athletes 
    : athletes.filter(a => a.sport === filter);

  return (
    <div className="lg:col-span-9">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        <header className="relative overflow-hidden rounded-3xl bg-surface-container-low p-8 md:p-12 border-r-4 border-primary">
          <div className="relative z-10">
            <h1 className="text-5xl md:text-7xl font-black font-headline text-primary mb-4 tracking-tighter">נבחרת ישראל</h1>
            <p className="text-xl text-on-surface-variant max-w-2xl leading-relaxed">
              הכירו את הספורטאים והספורטאיות שנושאים את דגל ישראל בגאווה על הבמות הגדולות בעולם.
            </p>
          </div>
        </header>

        <div className="flex flex-wrap gap-4 justify-end">
          <button 
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-full font-bold transition-all ${filter === 'all' ? 'bg-primary text-background' : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'}`}
          >
            הכל
          </button>
          {Array.from(new Set(athletes.map(a => a.sport))).map(sport => (
            <button 
              key={sport}
              onClick={() => setFilter(sport)}
              className={`px-6 py-2 rounded-full font-bold transition-all ${filter === sport ? 'bg-primary text-background' : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'}`}
            >
              {sport}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAthletes.map((athlete) => (
            <div 
              key={athlete.id}
              onClick={() => onPageChange(`athlete:${athlete.id}`)}
              className="group relative bg-surface-container-low rounded-2xl overflow-hidden hover:translate-y-[-8px] transition-all duration-300 shadow-xl border border-white/5 cursor-pointer"
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <img 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  src={athlete.heroImage} 
                  alt={athlete.name}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4 bg-primary text-background font-bold px-3 py-1 rounded-lg text-xs">
                  RANK #{athlete.rank}
                </div>
              </div>
              <div className="p-6 text-right">
                <h3 className="text-2xl font-black text-white mb-1">{athlete.name}</h3>
                <p className="text-sm text-primary font-bold mb-3">{athlete.sport} | {athlete.category}</p>
                <p className="text-on-surface-variant text-sm line-clamp-2 mb-6">{athlete.bio}</p>
                <div className="flex justify-between items-center flex-row-reverse">
                  <div className="flex gap-1">
                    {Array.from({ length: athlete.olympicMedals }).map((_, i) => (
                      <Medal key={i} className="w-5 h-5 text-primary" />
                    ))}
                  </div>
                  <button className="text-sm font-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    פרופיל מלא <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const AthleteProfilePage = ({ athleteId, onPageChange, athletes }: { athleteId: string, onPageChange: (page: Page) => void, athletes: Athlete[] }) => {
  const athlete = athletes.find(a => a.id === athleteId);

  if (!athlete) {
    return (
      <div className="lg:col-span-9 py-20 text-center">
        <h2 className="text-2xl font-bold">הספורטאי לא נמצא</h2>
        <button onClick={() => onPageChange('athletes')} className="mt-4 text-primary font-bold">חזרה לרשימת הספורטאים</button>
      </div>
    );
  }

  return (
    <div className="lg:col-span-9 -mx-6 -mt-12">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-0"
      >
        {/* Hero Section */}
        <section className="relative h-[819px] flex items-end overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              className="w-full h-full object-cover object-center opacity-60" 
              src={athlete.heroImage} 
              alt={athlete.name}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
          </div>
          <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 pb-16">
            <div className="flex flex-col md:flex-row-reverse justify-between items-end gap-8">
              <div className="text-right">
                <span className="inline-block px-4 py-1 bg-primary text-on-primary font-bold text-sm tracking-widest rounded-full mb-4 uppercase">
                  {athlete.sport} / {athlete.category}
                </span>
                <h1 className="text-6xl md:text-9xl font-headline font-black text-on-surface leading-none tracking-tighter mb-4">
                  {athlete.name}
                </h1>
                <p className="text-2xl text-secondary font-light max-w-2xl leading-relaxed">
                  {athlete.bio.split('.')[0]}.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="bg-surface-container-high/80 backdrop-blur-sm p-6 rounded-xl border-r-4 border-primary shadow-2xl">
                  <div className="text-primary text-3xl font-black">{athlete.rank}</div>
                  <div className="text-secondary text-sm uppercase tracking-tighter">Ranking</div>
                </div>
                <div className="bg-surface-container-high/80 backdrop-blur-sm p-6 rounded-xl border-r-4 border-secondary shadow-2xl">
                  <div className="text-secondary text-3xl font-black">{athlete.olympicMedals.toString().padStart(2, '0')}</div>
                  <div className="text-secondary text-sm uppercase tracking-tighter">Olympic Medals</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Stats & Bio */}
        <section className="max-w-screen-2xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Biography */}
            <div className="md:col-span-8 bg-surface-container-low p-8 md:p-12 rounded-xl relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-3xl font-headline font-bold text-primary mb-8 border-r-4 border-primary pr-4">סיפור של נחישות</h2>
                <div className="prose prose-invert prose-lg max-w-none text-on-surface leading-relaxed space-y-6">
                  <p>{athlete.bio}</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-12 pt-12 border-t border-outline-variant/20">
                    <div>
                      <div className="text-secondary-fixed-variant text-xs uppercase tracking-widest mb-1">Born</div>
                      <div className="text-on-surface font-bold text-lg">{athlete.birthDate}</div>
                    </div>
                    <div>
                      <div className="text-secondary-fixed-variant text-xs uppercase tracking-widest mb-1">Height</div>
                      <div className="text-on-surface font-bold text-lg">{athlete.height}</div>
                    </div>
                    <div>
                      <div className="text-secondary-fixed-variant text-xs uppercase tracking-widest mb-1">Coach</div>
                      <div className="text-on-surface font-bold text-lg">{athlete.coach}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Personal Info Mini-Card */}
            <div className="md:col-span-4 space-y-8">
              <div className="bg-surface-container-high p-8 rounded-xl border border-outline-variant/10">
                <h3 className="text-xl font-headline font-bold text-on-surface mb-6">האירוע הבא</h3>
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-primary/20 text-primary p-3 rounded-lg">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-on-surface">{athlete.upcomingEvent.title}</div>
                    <div className="text-sm text-secondary">{athlete.upcomingEvent.date}</div>
                  </div>
                </div>
                <button className="w-full py-4 bg-primary text-on-primary font-bold rounded-xl hover:bg-primary-fixed-dim transition-all active:scale-95">תמיכה בספורטאי</button>
              </div>
              <div className="bg-surface-container-lowest p-8 rounded-xl relative overflow-hidden h-64 flex items-center justify-center">
                <img 
                  className="absolute inset-0 w-full h-full object-cover opacity-30" 
                  src="https://picsum.photos/seed/israel-flag/600/400" 
                  alt="Israel Flag"
                  referrerPolicy="no-referrer"
                />
                <div className="relative z-10 text-center">
                  <div className="text-4xl font-black text-secondary-fixed-dim opacity-50 mb-2 italic">ISR</div>
                  <div className="text-lg font-bold">Pride of the Nation</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Achievement Timeline */}
        <section className="bg-surface-container-low py-24">
          <div className="max-w-screen-2xl mx-auto px-6">
            <h2 className="text-4xl font-headline font-black text-right mb-16 uppercase tracking-tighter">הדרך אל הפודיום</h2>
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute right-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-tertiary hidden md:block"></div>
              <div className="space-y-16">
                {athlete.achievements.map((achievement, idx) => (
                  <div key={idx} className="relative md:pr-24 group">
                    <div className={`absolute right-0 top-0 w-16 h-16 rounded-full hidden md:flex items-center justify-center z-10 shadow-2xl bg-${achievement.color}`}>
                      <span className="material-symbols-outlined text-background font-bold">{achievement.icon}</span>
                    </div>
                    <div className={`bg-surface p-8 rounded-xl border-r-4 border-${achievement.color}`}>
                      <div className={`text-${achievement.color} font-bold text-xl mb-2`}>{achievement.year} - {achievement.title}</div>
                      <h3 className="text-2xl font-headline font-bold text-on-surface mb-4">{achievement.title}</h3>
                      <p className="text-secondary leading-relaxed">{achievement.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* News Feed */}
        <section className="max-w-screen-2xl mx-auto px-6 py-24">
          <div className="flex flex-row-reverse justify-between items-end mb-12">
            <h2 className="text-4xl font-headline font-black">חדשות ועדכונים</h2>
            <button onClick={() => onPageChange('home')} className="text-primary font-bold hover:underline flex items-center gap-2">
              <ChevronLeft className="w-5 h-5" />
              לכל הכתבות
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {athlete.news.map((item, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="relative h-64 mb-6 rounded-xl overflow-hidden">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    src={item.image} 
                    alt={item.title}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-surface-container-lowest/80 backdrop-blur-md px-3 py-1 rounded text-xs font-bold text-primary">{item.tag}</div>
                </div>
                <h3 className="text-xl font-headline font-bold mb-3 group-hover:text-primary transition-colors text-right">{item.title}</h3>
                <p className="text-secondary text-sm leading-relaxed line-clamp-2 text-right">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Schedule Section */}
        <section className="bg-surface-container-lowest py-24">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-headline font-black mb-4">לוח תחרויות קרובות</h2>
              <p className="text-secondary">עקבו אחרי {athlete.name.split(' ')[0]} בדרך למדליה הבאה</p>
            </div>
            <div className="space-y-4">
              {athlete.schedule.map((item, idx) => (
                <div key={idx} className="bg-surface-container p-6 rounded-xl flex items-center justify-between group hover:bg-surface-container-high transition-colors flex-row-reverse">
                  <div className="flex items-center gap-6 flex-row-reverse">
                    <div className="text-center border-r border-outline-variant/30 pr-6">
                      <div className="text-2xl font-black text-on-surface leading-none">{item.day}</div>
                      <div className="text-xs text-secondary uppercase tracking-widest">{item.month}</div>
                    </div>
                    <div className="text-right">
                      <h4 className="font-bold text-on-surface">{item.title}</h4>
                      <div className="text-sm text-secondary flex items-center gap-1 justify-end">
                        {item.location}
                        <Search className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                  <button className="bg-surface-variant px-6 py-2 rounded-lg text-sm font-bold text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all">פרטים</button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
};

const SportCategoryPage = ({ category, events, onPageChange }: { category: string, events: Event[], onPageChange: (page: Page) => void }) => {
  const content = SPORT_CONTENT[category] || SPORT_CONTENT["ג'ודו"];
  const categoryEvents = events.filter(e => e.category === category).slice(0, 3);

  return (
    <div className="lg:col-span-9 -mx-6 -mt-12">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-20"
      >
        {/* Hero Editorial Section */}
        <section className="relative min-h-[600px] flex items-center pt-24 pb-12 px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
            <div className="lg:col-span-7 order-2 lg:order-1 relative">
              <div className="absolute -top-20 -right-10 text-[12rem] font-black text-white/[0.03] select-none pointer-events-none font-headline leading-none">
                {content.bgText}
              </div>
              <h1 className="text-6xl md:text-8xl font-black font-headline text-on-surface leading-none mb-8 tracking-tighter">
                {content.heroTitle}
              </h1>
              <p className="text-xl text-on-surface-variant max-w-2xl leading-relaxed mb-10">
                {content.heroDesc}
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => onPageChange('calendar')}
                  className="bg-primary text-on-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-fixed-dim transition-colors flex items-center gap-2"
                >
                  לצפייה בלוח התחרויות
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 aspect-[4/5]">
                <img 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                  src={content.heroImage} 
                  alt={content.heroTitle}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid: News & Content */}
        <section className="px-8">
          <h2 className="text-3xl font-black font-headline mb-12 flex items-center gap-4">
            <span className="w-12 h-[2px] bg-primary"></span>
            חדשות מהזירה
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Large Featured */}
            <div className="md:col-span-2 md:row-span-2 bg-surface-container-low rounded-2xl overflow-hidden group cursor-pointer border border-white/5">
              <div className="h-64 md:h-[400px] overflow-hidden relative">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  src={content.news[0].image} 
                  alt={content.news[0].title}
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-4 right-4 bg-primary text-on-primary px-3 py-1 rounded-lg text-xs font-bold font-headline">
                  {content.news[0].tag}
                </span>
              </div>
              <div className="p-8">
                <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {content.news[0].title}
                </h3>
                <p className="text-on-surface-variant line-clamp-2">
                  {content.news[0].desc}
                </p>
              </div>
            </div>
            {/* Secondary Content */}
            {content.news.slice(1).map((item: any, idx: number) => (
              <div key={idx} className="bg-surface-container-high rounded-2xl p-6 flex flex-col justify-between group cursor-pointer border border-white/5">
                <div>
                  <span className="text-primary font-headline text-xs font-bold uppercase tracking-widest block mb-4">
                    {item.tag}
                  </span>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                </div>
                <div className="mt-8 flex justify-between items-center">
                  <span className="text-sm text-on-surface-variant">4 דק' קריאה</span>
                  <ChevronLeft className="w-5 h-5 text-primary group-hover:translate-x-[-4px] transition-transform" />
                </div>
              </div>
            ))}
            {/* Extra Card for Grid Balance */}
            <div className="md:col-span-2 bg-gradient-to-br from-surface-container-highest to-surface-container-low rounded-2xl p-8 flex items-center gap-6 border border-white/5">
              <div className="h-24 w-24 flex-shrink-0 bg-primary/10 rounded-full flex items-center justify-center">
                <Trophy className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">סיכום השבוע ב{category}</h3>
                <p className="text-on-surface-variant">כל ההישגים, הדירוגים והרגעים הגדולים של הספורטאים שלנו.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Athlete Showcase (Horizontal Scroll) */}
        <section className="bg-surface-container-lowest py-20 px-8 border-y border-white/5">
          <div className="max-w-screen-2xl mx-auto">
            <div className="flex justify-between items-end mb-12">
              <div>
                <span className="text-tertiary font-headline font-bold text-sm tracking-[0.2em]">SQUAD 2024</span>
                <h2 className="text-4xl font-black font-headline">הנבחרת הלאומית</h2>
              </div>
              <button className="text-primary font-bold flex items-center gap-2 hover:underline">
                כל הספורטאים
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
            <div className="flex gap-8 overflow-x-auto pb-8 no-scrollbar">
              {content.athletes.map((athlete: any, idx: number) => {
                const athleteId = ATHLETES_DATA.find(a => a.name === athlete.name)?.id;
                return (
                  <div 
                    key={idx} 
                    onClick={() => athleteId && onPageChange(`athlete:${athleteId}`)}
                    className={`flex-shrink-0 w-80 group ${athleteId ? 'cursor-pointer' : ''}`}
                  >
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6 shadow-2xl">
                      <img 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        src={athlete.image} 
                        alt={athlete.name}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background to-transparent">
                        <span className="bg-primary text-on-primary px-3 py-1 rounded text-xs font-black uppercase mb-2 inline-block">
                          {athlete.rank}
                        </span>
                        <h4 className="text-2xl font-bold">{athlete.name}</h4>
                      </div>
                    </div>
                    <div className="space-y-2 border-r-2 border-primary/30 pr-4">
                      <p className="text-sm text-tertiary font-bold">{athlete.category}</p>
                      <p className="text-xs text-on-surface-variant">{athlete.desc}</p>
                      {athleteId && (
                        <p className="text-[10px] font-bold text-primary mt-2 flex items-center gap-1">
                          לפרופיל מלא <ChevronLeft className="w-3 h-3" />
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats & Rankings */}
        <section className="px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 bg-surface-container-low rounded-2xl p-8 shadow-xl border border-white/5">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black font-headline">דירוג עולמי - ישראלים בטופ</h2>
              <span className="text-xs text-on-surface-variant bg-surface-container px-3 py-1 rounded-full uppercase tracking-tighter">Updated: 2024</span>
            </div>
            <div className="space-y-6">
              {content.rankings.map((rank: any, idx: number) => {
                const athleteId = ATHLETES_DATA.find(a => a.name === rank.name)?.id;
                return (
                  <div 
                    key={idx} 
                    onClick={() => athleteId && onPageChange(`athlete:${athleteId}`)}
                    className={`flex items-center justify-between p-4 bg-surface-container rounded-xl hover:bg-surface-container-high transition-colors border border-white/5 ${athleteId ? 'cursor-pointer' : ''}`}
                  >
                    <div className="flex items-center gap-6">
                      <span className={`text-3xl font-black font-headline w-8 ${idx === 0 ? 'text-primary' : idx === 1 ? 'text-secondary' : 'text-on-surface-variant'}`}>
                        {rank.rank}
                      </span>
                      <div>
                        <h4 className={`font-bold ${athleteId ? 'text-primary hover:underline' : ''}`}>{rank.name}</h4>
                        <span className="text-xs text-on-surface-variant">{rank.category}</span>
                      </div>
                    </div>
                    <div className="text-left">
                      <span className="block font-black text-xl text-on-surface">{rank.points}</span>
                      <span className="text-[10px] text-primary uppercase font-bold tracking-widest">Points</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="bg-gradient-to-br from-primary-container to-surface-container-low p-8 rounded-2xl relative overflow-hidden h-full border border-primary/10">
              <div className="relative z-10">
                <h3 className="text-primary font-headline font-black text-xl mb-8">מאזן מדליות היסטורי</h3>
                <div className="space-y-8">
                  <div className="flex items-center justify-between border-b border-primary/20 pb-4">
                    <span className="flex items-center gap-3 font-bold">
                      <Medal className="w-5 h-5 text-primary" />
                      זהב
                    </span>
                    <span className="text-4xl font-black font-headline">{content.medals.gold}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-secondary/20 pb-4">
                    <span className="flex items-center gap-3 font-bold">
                      <Medal className="w-5 h-5 text-secondary" />
                      כסף
                    </span>
                    <span className="text-4xl font-black font-headline">{content.medals.silver}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-tertiary/20 pb-4">
                    <span className="flex items-center gap-3 font-bold">
                      <Medal className="w-5 h-5 text-tertiary" />
                      ארד
                    </span>
                    <span className="text-4xl font-black font-headline">{content.medals.bronze}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="px-8 pb-20">
          <h2 className="text-3xl font-black font-headline mb-10 text-center">התחרויות הבאות בלוח</h2>
          <div className="bg-surface-container-low rounded-2xl overflow-hidden shadow-2xl border border-white/5">
            <div className="grid grid-cols-1 divide-y divide-white/5">
              {categoryEvents.map((event: Event) => (
                <div 
                  key={event.id} 
                  className="flex flex-col md:flex-row items-center justify-between p-8 gap-6 hover:bg-surface-container transition-colors cursor-pointer"
                  onClick={() => onPageChange(`event:${event.id}`)}
                >
                  <div className="flex items-center gap-8 w-full md:w-auto">
                    <div className="text-center bg-surface-container-high p-3 rounded-xl min-w-[80px] border border-white/5">
                      <span className="block text-2xl font-black font-headline leading-none">{event.day}</span>
                      <span className="text-[10px] uppercase font-bold text-tertiary">{event.month}</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold">{event.title}</h4>
                      <p className="text-sm text-on-surface-variant">{event.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                    <span className="text-xs font-bold text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                      אירוע רשמי
                    </span>
                    <ChevronLeft className="w-6 h-6 text-on-surface-variant" />
                  </div>
                </div>
              ))}
              {categoryEvents.length === 0 && (
                <div className="p-12 text-center text-on-surface-variant">
                  אין אירועים קרובים לענף זה בלוח השנה
                </div>
              )}
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
};

const AdminDashboard = ({ 
  events, 
  athletes, 
  news, 
  articles,
  onAddEvent,
  onDeleteEvent,
  onUpdateEvent,
  onAddAthlete,
  onDeleteAthlete,
  onUpdateAthlete,
  onAddNews,
  onDeleteNews,
  onUpdateNews,
  onAddArticle,
  onDeleteArticle,
  onUpdateArticle
}: { 
  events: Event[], 
  athletes: Athlete[], 
  news: News[], 
  articles: Article[],
  onAddEvent: () => void,
  onDeleteEvent: (id: string) => void,
  onUpdateEvent: (event: Event) => void,
  onAddAthlete: () => void,
  onDeleteAthlete: (id: string) => void,
  onUpdateAthlete: (athlete: Athlete) => void,
  onAddNews: () => void,
  onDeleteNews: (id: string) => void,
  onUpdateNews: (newsItem: News) => void,
  onAddArticle: () => void,
  onDeleteArticle: (id: string) => void,
  onUpdateArticle: (article: Article) => void
}) => {
  const [activeTab, setActiveTab] = useState<'events' | 'athletes' | 'news' | 'articles'>('events');
  const [editingItem, setEditingItem] = useState<{ type: string, data: any } | null>(null);

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    switch (editingItem.type) {
      case 'event':
        onUpdateEvent(editingItem.data);
        break;
      case 'athlete':
        onUpdateAthlete(editingItem.data);
        break;
      case 'news':
        onUpdateNews(editingItem.data);
        break;
      case 'article':
        onUpdateArticle(editingItem.data);
        break;
    }
    setEditingItem(null);
  };

  if (editingItem) {
    return (
      <div className="lg:col-span-9 space-y-8">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => setEditingItem(null)} className="p-2 hover:bg-surface-container rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 rotate-180" />
          </button>
          <h1 className="text-4xl font-black font-headline">עריכת {editingItem.type === 'event' ? 'אירוע' : editingItem.type === 'athlete' ? 'ספורטאי' : editingItem.type === 'news' ? 'מבזק' : 'כתבה'}</h1>
        </div>

        <form onSubmit={handleSaveEdit} className="bg-surface-container-low rounded-2xl p-8 border border-white/5 shadow-xl space-y-6">
          {editingItem.type === 'event' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold">כותרת האירוע</label>
                  <input 
                    className="w-full bg-surface-container border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary"
                    value={editingItem.data.title}
                    onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, title: e.target.value } })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">ענף</label>
                  <input 
                    className="w-full bg-surface-container border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary"
                    value={editingItem.data.category}
                    onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, category: e.target.value } })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">מיקום</label>
                  <input 
                    className="w-full bg-surface-container border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary"
                    value={editingItem.data.location}
                    onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, location: e.target.value } })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">תאריך (טקסט חופשי)</label>
                  <input 
                    className="w-full bg-surface-container border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary"
                    value={editingItem.data.date}
                    onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, date: e.target.value } })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold">יום</label>
                    <input 
                      type="number"
                      className="w-full bg-surface-container border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary"
                      value={editingItem.data.day}
                      onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, day: parseInt(e.target.value) } })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">חודש</label>
                    <input 
                      className="w-full bg-surface-container border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary"
                      value={editingItem.data.month}
                      onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, month: e.target.value } })}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={editingItem.data.active}
                      onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, active: e.target.checked } })}
                    />
                    <span className="text-sm font-bold">פעיל כרגע</span>
                  </label>
                </div>
              </div>
            </>
          )}

          {editingItem.type === 'athlete' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold">שם הספורטאי</label>
                  <input 
                    className="w-full bg-surface-container border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary"
                    value={editingItem.data.name}
                    onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, name: e.target.value } })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">ענף</label>
                  <input 
                    className="w-full bg-surface-container border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary"
                    value={editingItem.data.sport}
                    onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, sport: e.target.value } })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">קטגוריית משקל/מקצוע</label>
                  <input 
                    className="w-full bg-surface-container border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary"
                    value={editingItem.data.category}
                    onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, category: e.target.value } })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">דירוג</label>
                  <input 
                    className="w-full bg-surface-container border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary"
                    value={editingItem.data.rank}
                    onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, rank: e.target.value } })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">מדליות אולימפיות</label>
                  <input 
                    type="number"
                    className="w-full bg-surface-container border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary"
                    value={editingItem.data.olympicMedals}
                    onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, olympicMedals: parseInt(e.target.value) } })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">כתובת תמונה</label>
                  <input 
                    className="w-full bg-surface-container border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary"
                    value={editingItem.data.heroImage}
                    onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, heroImage: e.target.value } })}
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold">ביוגרפיה</label>
                  <textarea 
                    className="w-full bg-surface-container border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary h-32"
                    value={editingItem.data.bio}
                    onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, bio: e.target.value } })}
                  />
                </div>
              </div>
            </>
          )}

          {editingItem.type === 'news' && (
            <>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold">טקסט המבזק</label>
                  <textarea 
                    className="w-full bg-surface-container border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary h-24"
                    value={editingItem.data.text}
                    onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, text: e.target.value } })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">קטגוריה</label>
                  <input 
                    className="w-full bg-surface-container border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary"
                    value={editingItem.data.category}
                    onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, category: e.target.value } })}
                  />
                </div>
              </div>
            </>
          )}

          {editingItem.type === 'article' && (
            <>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold">כותרת</label>
                  <input 
                    className="w-full bg-surface-container border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary"
                    value={editingItem.data.title}
                    onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, title: e.target.value } })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">קטגוריה</label>
                  <input 
                    className="w-full bg-surface-container border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary"
                    value={editingItem.data.category}
                    onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, category: e.target.value } })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">כתובת תמונה</label>
                  <input 
                    className="w-full bg-surface-container border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary"
                    value={editingItem.data.image}
                    onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, image: e.target.value } })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">תקציר</label>
                  <textarea 
                    className="w-full bg-surface-container border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary h-20"
                    value={editingItem.data.excerpt}
                    onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, excerpt: e.target.value } })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">תוכן</label>
                  <textarea 
                    className="w-full bg-surface-container border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary h-48"
                    value={editingItem.data.content}
                    onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, content: e.target.value } })}
                  />
                </div>
              </div>
            </>
          )}

          <div className="flex gap-4 pt-4">
            <button type="submit" className="bg-primary text-background px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform">שמור שינויים</button>
            <button type="button" onClick={() => setEditingItem(null)} className="bg-surface-container-highest px-8 py-3 rounded-xl font-bold hover:bg-surface-bright transition-colors">ביטול</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="lg:col-span-9 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-black font-headline">ניהול מערכת</h1>
        <div className="flex gap-2 bg-surface-container p-1 rounded-xl">
          {(['events', 'athletes', 'news', 'articles'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                activeTab === tab ? 'bg-primary text-background shadow-lg' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {tab === 'events' ? 'אירועים' : tab === 'athletes' ? 'ספורטאים' : tab === 'news' ? 'חדשות' : 'כתבות'}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-surface-container-low rounded-2xl p-8 border border-white/5 shadow-xl">
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">ניהול אירועים</h2>
              <button onClick={onAddEvent} className="flex items-center gap-2 bg-primary text-background px-4 py-2 rounded-xl font-bold hover:scale-105 transition-transform">
                <Plus className="w-4 h-4" /> הוסף אירוע
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {events.map(event => (
                <div key={event.id} className="flex items-center justify-between p-4 bg-surface-container rounded-xl border border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-surface-container-high rounded-lg flex items-center justify-center font-bold text-primary">
                      {event.day}
                    </div>
                    <div>
                      <h4 className="font-bold">{event.title}</h4>
                      <p className="text-xs text-on-surface-variant">{event.category} | {event.location}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingItem({ type: 'event', data: event })} className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors">
                      ערוך
                    </button>
                    <button onClick={() => onDeleteEvent(event.id)} className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors">
                      מחק
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'athletes' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">ניהול ספורטאים</h2>
              <button onClick={onAddAthlete} className="flex items-center gap-2 bg-primary text-background px-4 py-2 rounded-xl font-bold hover:scale-105 transition-transform">
                <Plus className="w-4 h-4" /> הוסף ספורטאי
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {athletes.map(athlete => (
                <div key={athlete.id} className="flex items-center justify-between p-4 bg-surface-container rounded-xl border border-white/5">
                  <div className="flex items-center gap-4">
                    <img src={athlete.heroImage} alt={athlete.name} className="w-12 h-12 rounded-lg object-cover" referrerPolicy="no-referrer" />
                    <div>
                      <h4 className="font-bold">{athlete.name}</h4>
                      <p className="text-xs text-on-surface-variant">{athlete.sport} | {athlete.category}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingItem({ type: 'athlete', data: athlete })} className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors">
                      ערוך
                    </button>
                    <button onClick={() => onDeleteAthlete(athlete.id)} className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors">
                      מחק
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'news' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">ניהול מבזקים</h2>
              <button onClick={onAddNews} className="flex items-center gap-2 bg-primary text-background px-4 py-2 rounded-xl font-bold hover:scale-105 transition-transform">
                <Plus className="w-4 h-4" /> הוסף מבזק
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {news.map(item => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-surface-container rounded-xl border border-white/5">
                  <div className="flex-1">
                    <p className="font-medium">{item.text}</p>
                    <p className="text-xs text-on-surface-variant">{item.timestamp} {item.category && `| ${item.category}`}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingItem({ type: 'news', data: item })} className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors">
                      ערוך
                    </button>
                    <button onClick={() => onDeleteNews(item.id)} className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors">
                      מחק
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'articles' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">ניהול כתבות</h2>
              <button onClick={onAddArticle} className="flex items-center gap-2 bg-primary text-background px-4 py-2 rounded-xl font-bold hover:scale-105 transition-transform">
                <Plus className="w-4 h-4" /> הוסף כתבה
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {articles.map(article => (
                <div key={article.id} className="flex items-center justify-between p-4 bg-surface-container rounded-xl border border-white/5">
                  <div className="flex items-center gap-4">
                    <img src={article.image} alt={article.title} className="w-12 h-12 rounded-lg object-cover" referrerPolicy="no-referrer" />
                    <div>
                      <h4 className="font-bold">{article.title}</h4>
                      <p className="text-xs text-on-surface-variant">{article.category} | {article.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingItem({ type: 'article', data: article })} className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors">
                      ערוך
                    </button>
                    <button onClick={() => onDeleteArticle(article.id)} className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors">
                      מחק
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [events, setEvents] = useState<Event[]>([]);
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'events'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const eventsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Event[];
      setEvents(eventsData);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'events');
    });

    const athletesUnsubscribe = onSnapshot(collection(db, 'athletes'), (snapshot) => {
      setAthletes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Athlete[]);
    });

    const newsUnsubscribe = onSnapshot(collection(db, 'news'), (snapshot) => {
      setNews(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as News[]);
    });

    const articlesUnsubscribe = onSnapshot(collection(db, 'articles'), (snapshot) => {
      setArticles(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Article[]);
    });

    const authUnsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.email === 'roeiyehezkel@kehilatsport.com') {
        setIsAdmin(true);
        // Seed initial data if empty
        if (events.length === 0) {
          const initialEvents = [
            {
              id: 'paris-2024',
              title: "GRAND SLAM PARIS 2024",
              category: "ג'ודו",
              date: "2-4 פברואר, 2024",
              day: 1,
              month: 'ינו',
              location: "Accor Arena, פריז",
              logo: "https://picsum.photos/seed/judo-logo/200/200",
              heroImage: "https://picsum.photos/seed/paris-skyline/1920/1080",
              active: false,
              dimmed: false,
              athletes: [
                { name: "רז הרשקו", category: "מעל 78 ק\"ג | נשים", rank: "מדורגת 1 בעולם", image: "https://picsum.photos/seed/raz/400/500" },
                { name: "ברוך שמאילוב", category: "עד 66 ק\"ג | גברים", image: "https://picsum.photos/seed/baruch/400/500" }
              ],
              history: [
                { year: "2023", results: [{ name: "רז הרשקו", medal: "זהב", weight: "+78 ק\"ג" }] }
              ]
            },
            {
              id: 'israel-swim',
              title: 'אליפות ישראל בשחייה',
              category: 'שחייה',
              date: '15-18 ינואר, 2024',
              day: 15,
              month: 'ינו',
              location: 'מכון וינגייט',
              active: true,
              dimmed: false
            }
          ];
          
          initialEvents.forEach(async (ev) => {
            await setDoc(doc(db, 'events', ev.id), ev);
          });
        }
        if (athletes.length === 0) {
          ATHLETES_DATA.forEach(async (athlete) => {
            await setDoc(doc(db, 'athletes', athlete.id), athlete);
          });
        }
      } else {
        setIsAdmin(false);
      }
    });
    
    return () => {
      unsubscribe();
      athletesUnsubscribe();
      newsUnsubscribe();
      articlesUnsubscribe();
      authUnsubscribe();
    };
  }, [events.length]);

  const handlePageChange = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddEvent = async () => {
    if (!isAdmin) return;
    const id = `event-${Date.now()}`;
    const newEvent: Event = {
      id,
      title: "אירוע חדש",
      category: "ג'ודו",
      date: "תאריך",
      day: 10,
      month: "ינו",
      location: "מיקום",
    };
    try {
      await setDoc(doc(db, 'events', id), newEvent);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `events/${id}`);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!isAdmin) return;
    try {
      await deleteDoc(doc(db, 'events', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `events/${id}`);
    }
  };

  const handleAddAthlete = async () => {
    if (!isAdmin) return;
    const id = `athlete-${Date.now()}`;
    const newAthlete: Athlete = {
      id,
      name: "ספורטאי חדש",
      sport: "ג'ודו",
      category: "קטגוריה",
      rank: "1",
      olympicMedals: 0,
      bio: "ביוגרפיה",
      heroImage: "https://picsum.photos/seed/athlete/800/600",
      bgText: "SPORT",
      birthDate: "תאריך לידה",
      height: "1.80 מ'",
      coach: "מאמן",
      upcomingEvent: { title: "אירוע קרוב", date: "תאריך" },
      achievements: [],
      news: [],
      schedule: []
    };
    try {
      await setDoc(doc(db, 'athletes', id), newAthlete);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `athletes/${id}`);
    }
  };

  const handleDeleteAthlete = async (id: string) => {
    if (!isAdmin) return;
    try {
      await deleteDoc(doc(db, 'athletes', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `athletes/${id}`);
    }
  };

  const handleAddNews = async () => {
    if (!isAdmin) return;
    const id = `news-${Date.now()}`;
    const newItem: News = {
      id,
      text: "מבזק חדש",
      timestamp: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' }),
      category: "כללי"
    };
    try {
      await setDoc(doc(db, 'news', id), newItem);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `news/${id}`);
    }
  };

  const handleDeleteNews = async (id: string) => {
    if (!isAdmin) return;
    try {
      await deleteDoc(doc(db, 'news', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `news/${id}`);
    }
  };

  const handleAddArticle = async () => {
    if (!isAdmin) return;
    const id = `article-${Date.now()}`;
    const newArticle: Article = {
      id,
      title: "כתבה חדשה",
      excerpt: "תקציר הכתבה",
      content: "תוכן הכתבה...",
      image: "https://picsum.photos/seed/article/800/600",
      category: "כללי",
      author: "מערכת הפודיום",
      date: new Date().toLocaleDateString('he-IL')
    };
    try {
      await setDoc(doc(db, 'articles', id), newArticle);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `articles/${id}`);
    }
  };

  const handleDeleteArticle = async (id: string) => {
    if (!isAdmin) return;
    try {
      await deleteDoc(doc(db, 'articles', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `articles/${id}`);
    }
  };

  const handleUpdateEvent = async (event: Event) => {
    if (!isAdmin) return;
    try {
      await setDoc(doc(db, 'events', event.id), event);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `events/${event.id}`);
    }
  };

  const handleUpdateAthlete = async (athlete: Athlete) => {
    if (!isAdmin) return;
    try {
      await setDoc(doc(db, 'athletes', athlete.id), athlete);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `athletes/${athlete.id}`);
    }
  };

  const handleUpdateNews = async (newsItem: News) => {
    if (!isAdmin) return;
    try {
      await setDoc(doc(db, 'news', newsItem.id), newsItem);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `news/${newsItem.id}`);
    }
  };

  const handleUpdateArticle = async (article: Article) => {
    if (!isAdmin) return;
    try {
      await setDoc(doc(db, 'articles', article.id), article);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `articles/${article.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-background font-body selection:bg-primary selection:text-on-primary">
      <TopBar onPageChange={handlePageChange} currentPage={currentPage} isAdmin={isAdmin} />
      <SideNav onPageChange={handlePageChange} currentPage={currentPage} isAdmin={isAdmin} />
      
      {/* Breaking News Ticker */}
      <section className="mt-20 bg-surface-container-low py-2 overflow-hidden border-y border-outline-variant/10">
        <div className="max-w-screen-2xl mx-auto px-6 flex items-center">
          <span className="bg-primary text-on-primary text-[10px] font-bold px-2 py-0.5 rounded ml-4 whitespace-nowrap">מבזק</span>
          <div className="flex gap-12 whitespace-nowrap animate-marquee">
            {news.length > 0 ? (
              news.map(item => (
                <span key={item.id} className="text-sm font-medium">{item.text} •</span>
              ))
            ) : (
              <>
                <span className="text-sm font-medium">פיטר פלצ'יק העפיל לגמר הגראנד סלאם בטוקיו •</span>
                <span className="text-sm font-medium">נבחרת השייט בדרך למדליה היסטורית באליפות אירופה •</span>
                <span className="text-sm font-medium">שיא ישראלי חדש ב-100 מטר חזה לנשים •</span>
                <span className="text-sm font-medium">הוועד האולימפי מאשר את הרכב המשלחת הסופי לפריז •</span>
              </>
            )}
          </div>
        </div>
      </section>

      <main className="max-w-screen-2xl mx-auto px-6 py-12 lg:grid lg:grid-cols-12 lg:gap-8 lg:mr-64">
        {/* Main Content Area */}
        {currentPage === 'home' && <HomePage onPageChange={handlePageChange} articles={articles} />}
        {currentPage === 'calendar' && <CalendarPage onPageChange={handlePageChange} events={events} />}
        {currentPage === 'athletes' && <AllAthletesPage onPageChange={handlePageChange} athletes={athletes} />}
        {currentPage === 'admin' && isAdmin && (
          <AdminDashboard 
            events={events}
            athletes={athletes}
            news={news}
            articles={articles}
            onAddEvent={handleAddEvent}
            onDeleteEvent={handleDeleteEvent}
            onUpdateEvent={handleUpdateEvent}
            onAddAthlete={handleAddAthlete}
            onDeleteAthlete={handleDeleteAthlete}
            onUpdateAthlete={handleUpdateAthlete}
            onAddNews={handleAddNews}
            onDeleteNews={handleDeleteNews}
            onUpdateNews={handleUpdateNews}
            onAddArticle={handleAddArticle}
            onDeleteArticle={handleDeleteArticle}
            onUpdateArticle={handleUpdateArticle}
          />
        )}
        {currentPage.startsWith('athlete:') && <AthleteProfilePage athleteId={currentPage.split(':')[1]} onPageChange={handlePageChange} athletes={athletes} />}
        {currentPage.startsWith('event:') && <EventPage eventId={currentPage.split(':')[1]} onPageChange={handlePageChange} events={events} isAdmin={isAdmin} />}
        {SPORT_CONTENT[currentPage] && (
          <SportCategoryPage category={currentPage} events={events} onPageChange={handlePageChange} />
        )}

        {/* Sidebar Widgets */}
        <aside className="lg:col-span-3 space-y-8">
          {/* Event Calendar */}
          <div 
            className="bg-surface-container-high rounded-2xl p-6 shadow-xl border-l border-primary/20 cursor-pointer hover:bg-surface-bright transition-colors"
            onClick={() => handlePageChange('calendar')}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-primary" />
                <h3 className="font-headline font-bold text-xl">לוח אירועים</h3>
              </div>
              {isAdmin && (
                <button 
                  onClick={(e) => { e.stopPropagation(); handleAddEvent(); }}
                  className="p-2 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                  title="הוסף אירוע"
                >
                  <Plus className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="space-y-6">
              {events.slice(0, 3).map((event, idx) => (
                <div 
                  key={event.id} 
                  className={`flex gap-4 cursor-pointer hover:translate-x-[-4px] transition-transform ${event.dimmed ? 'opacity-70' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePageChange(`event:${event.id}`);
                  }}
                >
                  <div className={`flex flex-col items-center justify-center bg-surface-container-lowest w-12 h-12 rounded-lg ${event.active ? 'border border-primary/30' : ''}`}>
                    <span className="text-primary font-bold text-lg">{event.day}</span>
                    <span className="text-[10px] uppercase font-medium">{event.month}</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="text-sm font-bold">{event.title}</h5>
                    <p className="text-[10px] text-on-surface-variant uppercase">{event.location}</p>
                  </div>
                </div>
              ))}
              {events.length === 0 && <p className="text-xs text-on-surface-variant text-center">אין אירועים קרובים</p>}
            </div>
            <button 
              onClick={() => handlePageChange('calendar')}
              className="w-full mt-8 py-3 bg-surface-container-highest rounded-xl text-sm font-bold hover:bg-surface-bright transition-colors"
            >
              ללוח השנה המלא
            </button>
          </div>

          {/* Medal Tally Widget */}
          <div className="bg-surface-container-high rounded-2xl p-6 shadow-xl border-l border-secondary/20">
            <div className="flex items-center gap-3 mb-6">
              <Trophy className="w-6 h-6 text-secondary" />
              <h3 className="font-headline font-bold text-xl">מאזן המדליות</h3>
            </div>
            <div className="space-y-4">
              {[
                { label: 'זהב', count: 12, color: 'bg-primary', iconColor: 'text-on-primary' },
                { label: 'כסף', count: 18, color: 'bg-secondary', iconColor: 'text-on-secondary' },
                { label: 'ארד', count: 24, color: 'bg-tertiary', iconColor: 'text-on-tertiary' },
              ].map((medal, idx) => (
                <div key={idx} className="flex justify-between items-center bg-surface-container-low p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full ${medal.color} flex items-center justify-center ${medal.iconColor}`}>
                      <Medal className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold">{medal.label}</span>
                  </div>
                  <span className={`font-black text-xl ${medal.color.replace('bg-', 'text-')}`}>{medal.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="bg-gradient-to-br from-primary/10 to-surface-container-highest p-6 rounded-2xl border border-primary/20">
            <h4 className="font-headline font-bold mb-2">נשארים מעודכנים</h4>
            <p className="text-xs text-on-surface-variant mb-4">הרשמו לניוזלטר האולימפי לקבלת עדכונים חמים ישירות למייל</p>
            <div className="space-y-3">
              <input 
                className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-xl px-4 py-2 focus:ring-primary focus:border-primary outline-none" 
                placeholder="דואר אלקטרוני" 
                type="email"
              />
              <button className="w-full bg-primary text-on-primary font-bold py-2 rounded-xl text-sm">הרשמה</button>
            </div>
          </div>
        </aside>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 mt-12 bg-[#030812] lg:mr-64">
        <div className="flex flex-col items-center py-12 px-8 w-full max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 w-full mb-12">
            <div className="md:col-span-2">
              <div className="text-xl font-bold text-primary mb-4">קהילת ספורט</div>
              <p className="text-sm text-secondary max-w-md leading-relaxed">
                הפורטל הרשמי של הוועד האולימפי בישראל. כל החדשות, העדכונים והסיפורים מאחורי הספורטאים שמייצגים אותנו על הבמה הגדולה בעולם.
              </p>
            </div>
            <div>
              <h5 className="font-bold text-white mb-6">קישורים מהירים</h5>
              <ul className="space-y-3 text-sm text-secondary">
                {['אודותינו', 'תנאי שימוש', 'מדיניות פרטיות', 'צור קשר', 'ערכת עיתונות'].map(link => (
                  <li key={link}><a className="hover:text-white transition-opacity" href="#">{link}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-white mb-6">עקבו אחרינו</h5>
              <div className="flex gap-4">
                {[LayoutDashboard, Instagram, Youtube].map((Icon, idx) => (
                  <a key={idx} className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all" href="#">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="text-lg font-bold text-secondary mb-4">© 2024 הוועד האולימפי בישראל. כל הזכויות שמורות.</div>
        </div>
      </footer>

      <MobileNav onPageChange={handlePageChange} currentPage={currentPage} />
    </div>
  );
}
