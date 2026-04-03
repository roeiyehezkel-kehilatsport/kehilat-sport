/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  collection, 
  onSnapshot, 
  query, 
  doc, 
  setDoc, 
  deleteDoc,
  getDocFromServer
} from 'firebase/firestore';
import { db, auth } from './firebase';
import { 
  Event, 
  Athlete, 
  News, 
  Article, 
  MedalEntry, 
  PodcastEpisode,
  Page 
} from './types';
import { ATHLETES_DATA, SPORT_CONTENT } from './constants';

// Components
import { TopBar } from './components/TopBar';
import { SideNav } from './components/SideNav';
import { MobileNav } from './components/MobileNav';
import { SidebarWidgets } from './components/SidebarWidgets';

// Pages
import { HomePage } from './pages/HomePage';
import { CalendarPage } from './pages/CalendarPage';
import { AllAthletesPage } from './pages/AllAthletesPage';
import { AthleteProfilePage } from './pages/AthleteProfilePage';
import { SportCategoryPage } from './pages/SportCategoryPage';
import { MedalsPage } from './pages/MedalsPage';
import { EventPage } from './pages/EventPage';
import { PodcastPage } from './pages/PodcastPage';
import { AdminDashboard } from './pages/AdminDashboard';

// Icons
import { LayoutDashboard, Instagram, Youtube } from 'lucide-react';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if(error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration. ");
    }
  }
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [events, setEvents] = useState<Event[]>([]);
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [medals, setMedals] = useState<MedalEntry[]>([]);
  const [podcasts, setPodcasts] = useState<PodcastEpisode[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    testConnection();

    const eventsUnsubscribe = onSnapshot(collection(db, 'events'), (snapshot) => {
      setEvents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Event[]);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'events'));

    const athletesUnsubscribe = onSnapshot(collection(db, 'athletes'), (snapshot) => {
      setAthletes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Athlete[]);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'athletes'));

    const newsUnsubscribe = onSnapshot(collection(db, 'news'), (snapshot) => {
      setNews(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as News[]);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'news'));

    const articlesUnsubscribe = onSnapshot(collection(db, 'articles'), (snapshot) => {
      setArticles(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Article[]);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'articles'));

    const medalsUnsubscribe = onSnapshot(collection(db, 'medals'), (snapshot) => {
      setMedals(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as MedalEntry[]);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'medals'));

    const podcastsUnsubscribe = onSnapshot(collection(db, 'podcasts'), (snapshot) => {
      setPodcasts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as PodcastEpisode[]);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'podcasts'));

    const authUnsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.email === 'roeiyehezkel@kehilatsport.com') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });
    
    return () => {
      eventsUnsubscribe();
      athletesUnsubscribe();
      newsUnsubscribe();
      articlesUnsubscribe();
      medalsUnsubscribe();
      podcastsUnsubscribe();
      authUnsubscribe();
    };
  }, []);

  const handlePageChange = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSeedDatabase = async () => {
    if (!isAdmin) return;
    try {
      // Seed Events
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
      for (const ev of initialEvents) await setDoc(doc(db, 'events', ev.id), ev);

      // Seed Athletes
      for (const athlete of ATHLETES_DATA) await setDoc(doc(db, 'athletes', athlete.id), athlete);

      // Seed Medals
      const initialMedals = [
        { id: 'medal-1', athleteName: "רז הרשקו", sport: "ג'ודו", competition: "גראנד סלאם פריז 2025", medalType: "gold", ageCategory: "בוגרים", date: "2025-02-02", year: 2025 },
        { id: 'medal-2', athleteName: "ענבר לניר", sport: "ג'ודו", competition: "גראנד סלאם פריז 2025", medalType: "silver", ageCategory: "בוגרים", date: "2025-02-02", year: 2025 },
        { id: 'medal-3', athleteName: "ארטיום דולגופיאט", sport: "התעמלות", competition: "גביע העולם קוטבוס 2025", medalType: "gold", ageCategory: "בוגרים", date: "2025-02-22", year: 2025 },
        { id: 'medal-4', athleteName: "אנסטסיה גורבנקו", sport: "שחייה", competition: "Euro Meet Luxembourg 2025", medalType: "gold", ageCategory: "בוגרים", date: "2025-01-26", year: 2025 },
        { id: 'medal-5', athleteName: "שרון קנטור", sport: "שייט", competition: "אליפות העולם iQFOiL 2025", medalType: "gold", ageCategory: "בוגרים", date: "2025-02-03", year: 2025 },
        { id: 'medal-6', athleteName: "פיטר פלצ'יק", sport: "ג'ודו", competition: "גראנד סלאם תל אביב 2025", medalType: "bronze", ageCategory: "בוגרים", date: "2025-03-15", year: 2025 }
      ];
      for (const medal of initialMedals) await setDoc(doc(db, 'medals', medal.id), medal);

      // Seed Podcasts
      const initialPodcasts = [
        { id: 'podcast-1', title: "הדרך לפריז: רז הרשקו", excerpt: "שיחה מרתקת עם הג'ודוקא המדורגת ראשונה בעולם על ההכנות, הלחצים והחלומות.", link: "https://spotify.com", date: "2024-03-15" }
      ];
      for (const podcast of initialPodcasts) await setDoc(doc(db, 'podcasts', podcast.id), podcast);

      alert("הנתונים סונכרנו בהצלחה!");
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'seed');
    }
  };

  // CRUD Handlers
  const handleAddEvent = async () => {
    if (!isAdmin) return;
    const id = `event-${Date.now()}`;
    const newEvent: Event = { id, title: "אירוע חדש", category: "ג'ודו", date: "תאריך", day: 1, month: "ינו", location: "מיקום" };
    try { await setDoc(doc(db, 'events', id), newEvent); } catch (error) { handleFirestoreError(error, OperationType.WRITE, `events/${id}`); }
  };
  const handleDeleteEvent = async (id: string) => {
    if (!isAdmin) return;
    try { await deleteDoc(doc(db, 'events', id)); } catch (error) { handleFirestoreError(error, OperationType.DELETE, `events/${id}`); }
  };
  const handleUpdateEvent = async (event: Event) => {
    if (!isAdmin) return;
    try { await setDoc(doc(db, 'events', event.id), event); } catch (error) { handleFirestoreError(error, OperationType.WRITE, `events/${event.id}`); }
  };

  const handleAddAthlete = async () => {
    if (!isAdmin) return;
    const id = `athlete-${Date.now()}`;
    const newAthlete: Athlete = { id, name: "ספורטאי חדש", sport: "ג'ודו", category: "קטגוריה", rank: "1", olympicMedals: 0, bio: "ביוגרפיה", heroImage: "https://picsum.photos/seed/athlete/800/600", bgText: "SPORT", birthDate: "תאריך לידה", height: "1.80 מ'", coach: "מאמן", upcomingEvent: { title: "אירוע קרוב", date: "תאריך" }, achievements: [], news: [], schedule: [] };
    try { await setDoc(doc(db, 'athletes', id), newAthlete); } catch (error) { handleFirestoreError(error, OperationType.WRITE, `athletes/${id}`); }
  };
  const handleDeleteAthlete = async (id: string) => {
    if (!isAdmin) return;
    try { await deleteDoc(doc(db, 'athletes', id)); } catch (error) { handleFirestoreError(error, OperationType.DELETE, `athletes/${id}`); }
  };
  const handleUpdateAthlete = async (athlete: Athlete) => {
    if (!isAdmin) return;
    try { await setDoc(doc(db, 'athletes', athlete.id), athlete); } catch (error) { handleFirestoreError(error, OperationType.WRITE, `athletes/${athlete.id}`); }
  };

  const handleAddNews = async () => {
    if (!isAdmin) return;
    const id = `news-${Date.now()}`;
    const newItem: News = { id, text: "מבזק חדש", timestamp: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' }), category: "כללי" };
    try { await setDoc(doc(db, 'news', id), newItem); } catch (error) { handleFirestoreError(error, OperationType.WRITE, `news/${id}`); }
  };
  const handleDeleteNews = async (id: string) => {
    if (!isAdmin) return;
    try { await deleteDoc(doc(db, 'news', id)); } catch (error) { handleFirestoreError(error, OperationType.DELETE, `news/${id}`); }
  };
  const handleUpdateNews = async (newsItem: News) => {
    if (!isAdmin) return;
    try { await setDoc(doc(db, 'news', newsItem.id), newsItem); } catch (error) { handleFirestoreError(error, OperationType.WRITE, `news/${newsItem.id}`); }
  };

  const handleAddArticle = async () => {
    if (!isAdmin) return;
    const id = `article-${Date.now()}`;
    const newArticle: Article = { id, title: "כתבה חדשה", excerpt: "תקציר", content: "תוכן", image: "https://picsum.photos/seed/article/800/600", category: "כללי", author: "מערכת", date: new Date().toLocaleDateString('he-IL') };
    try { await setDoc(doc(db, 'articles', id), newArticle); } catch (error) { handleFirestoreError(error, OperationType.WRITE, `articles/${id}`); }
  };
  const handleDeleteArticle = async (id: string) => {
    if (!isAdmin) return;
    try { await deleteDoc(doc(db, 'articles', id)); } catch (error) { handleFirestoreError(error, OperationType.DELETE, `articles/${id}`); }
  };
  const handleUpdateArticle = async (article: Article) => {
    if (!isAdmin) return;
    try { await setDoc(doc(db, 'articles', article.id), article); } catch (error) { handleFirestoreError(error, OperationType.WRITE, `articles/${article.id}`); }
  };

  const handleAddMedal = async () => {
    if (!isAdmin) return;
    const id = `medal-${Date.now()}`;
    const newMedal: MedalEntry = { id, athleteName: "שם הספורטאי", sport: "ג'ודו", competition: "תחרות", medalType: 'gold', ageCategory: "בוגרים", date: new Date().toISOString().split('T')[0], year: 2025 };
    try { await setDoc(doc(db, 'medals', id), newMedal); } catch (error) { handleFirestoreError(error, OperationType.WRITE, `medals/${id}`); }
  };
  const handleDeleteMedal = async (id: string) => {
    if (!isAdmin) return;
    try { await deleteDoc(doc(db, 'medals', id)); } catch (error) { handleFirestoreError(error, OperationType.DELETE, `medals/${id}`); }
  };
  const handleUpdateMedal = async (medal: MedalEntry) => {
    if (!isAdmin) return;
    try { await setDoc(doc(db, 'medals', medal.id), medal); } catch (error) { handleFirestoreError(error, OperationType.WRITE, `medals/${medal.id}`); }
  };

  const handleAddPodcast = async () => {
    if (!isAdmin) return;
    const id = `podcast-${Date.now()}`;
    const newPodcast: PodcastEpisode = { id, title: "פרק חדש", excerpt: "תקציר הפרק", link: "https://", date: new Date().toISOString().split('T')[0] };
    try { await setDoc(doc(db, 'podcasts', id), newPodcast); } catch (error) { handleFirestoreError(error, OperationType.WRITE, `podcasts/${id}`); }
  };
  const handleDeletePodcast = async (id: string) => {
    if (!isAdmin) return;
    try { await deleteDoc(doc(db, 'podcasts', id)); } catch (error) { handleFirestoreError(error, OperationType.DELETE, `podcasts/${id}`); }
  };
  const handleUpdatePodcast = async (podcast: PodcastEpisode) => {
    if (!isAdmin) return;
    try { await setDoc(doc(db, 'podcasts', podcast.id), podcast); } catch (error) { handleFirestoreError(error, OperationType.WRITE, `podcasts/${podcast.id}`); }
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
              <span className="text-sm font-medium">אין מבזקים חדשים כרגע •</span>
            )}
          </div>
        </div>
      </section>

      <main className="max-w-screen-2xl mx-auto px-6 py-12 lg:grid lg:grid-cols-12 lg:gap-8 lg:mr-64">
        {/* Main Content Area */}
        <div className="lg:col-span-9">
          {currentPage === 'home' && <HomePage onPageChange={handlePageChange} articles={articles} />}
          {currentPage === 'calendar' && <CalendarPage onPageChange={handlePageChange} events={events} />}
          {currentPage === 'athletes' && <AllAthletesPage onPageChange={handlePageChange} athletes={athletes} />}
          {currentPage === 'medals' && <MedalsPage medals={medals} />}
          {currentPage === 'podcast' && <PodcastPage episodes={podcasts} />}
          {currentPage === 'admin' && isAdmin && (
            <AdminDashboard 
              events={events} athletes={athletes} news={news} articles={articles} medals={medals} podcasts={podcasts}
              onAddEvent={handleAddEvent} onDeleteEvent={handleDeleteEvent} onUpdateEvent={handleUpdateEvent}
              onAddAthlete={handleAddAthlete} onDeleteAthlete={handleDeleteAthlete} onUpdateAthlete={handleUpdateAthlete}
              onAddNews={handleAddNews} onDeleteNews={handleDeleteNews} onUpdateNews={handleUpdateNews}
              onAddArticle={handleAddArticle} onDeleteArticle={handleDeleteArticle} onUpdateArticle={handleUpdateArticle}
              onAddMedal={handleAddMedal} onDeleteMedal={handleDeleteMedal} onUpdateMedal={handleUpdateMedal}
              onAddPodcast={handleAddPodcast} onDeletePodcast={handleDeletePodcast} onUpdatePodcast={handleUpdatePodcast}
              onSeedDatabase={handleSeedDatabase}
            />
          )}
          {currentPage.startsWith('athlete:') && <AthleteProfilePage athleteId={currentPage.split(':')[1]} onPageChange={handlePageChange} athletes={athletes} />}
          {currentPage.startsWith('event:') && <EventPage eventId={currentPage.split(':')[1]} onPageChange={handlePageChange} events={events} isAdmin={isAdmin} />}
          {SPORT_CONTENT[currentPage] && (
            <SportCategoryPage category={currentPage} events={events} medals={medals} onPageChange={handlePageChange} />
          )}
        </div>

        {/* Sidebar Widgets */}
        <SidebarWidgets 
          events={events} 
          medals={medals} 
          onPageChange={handlePageChange} 
          isAdmin={isAdmin} 
          onAddEvent={handleAddEvent} 
        />
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 mt-12 bg-[#030812] lg:mr-64">
        <div className="flex flex-col items-center py-12 px-8 w-full max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 w-full mb-12">
            <div className="md:col-span-2">
              <div className="text-xl font-bold text-primary mb-4">קהילת ספורט</div>
              <p className="text-sm text-secondary max-w-md leading-relaxed">
                קהילת ספורט - אתר חדשות ספורט אולימפי. כל החדשות, העדכונים והסיפורים מאחורי הספורטאים שמייצגים אותנו על הבמה הגדולה בעולם.
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
          <div className="text-lg font-bold text-secondary mb-4">© 2026 קהילת ספורט. כל הזכויות שמורות.</div>
        </div>
      </footer>

      <MobileNav onPageChange={handlePageChange} currentPage={currentPage} />
    </div>
  );
}
