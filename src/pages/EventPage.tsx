/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Calendar, MapPin, Share2, Trophy } from 'lucide-react';
import { Event, Page } from '../types';

interface EventPageProps {
  eventId: string;
  onPageChange: (page: Page) => void;
  events: Event[];
  isAdmin: boolean;
}

export const EventPage: React.FC<EventPageProps> = ({ eventId, onPageChange, events, isAdmin }) => {
  const event = events.find(e => e.id === eventId);

  if (!event) {
    return (
      <div className="lg:col-span-9 text-center py-20">
        <h2 className="text-2xl font-bold text-on-surface-variant">האירוע לא נמצא</h2>
        <button onClick={() => onPageChange('calendar')} className="mt-4 text-primary font-bold hover:underline">חזרה ללוח האירועים</button>
      </div>
    );
  }

  return (
    <div className="lg:col-span-9 space-y-12">
      {/* Hero Header */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[450px] rounded-3xl overflow-hidden"
      >
        <img 
          src={event.heroImage || "https://picsum.photos/seed/event-hero/1200/800"} 
          alt={event.title} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-0 right-0 p-12 w-full flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-primary text-on-primary text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
                {event.category}
              </span>
              {event.active && (
                <span className="flex items-center gap-1 text-error text-xs font-black animate-pulse">
                  <span className="w-2 h-2 bg-error rounded-full" /> LIVE
                </span>
              )}
            </div>
            <h1 className="text-5xl font-black leading-tight mb-6">{event.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-on-surface-variant font-bold">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" /> {event.date}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" /> {event.location}
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="p-4 bg-surface-container-highest/50 backdrop-blur-md rounded-2xl hover:bg-primary hover:text-on-primary transition-all">
              <Share2 className="w-6 h-6" />
            </button>
            <button className="bg-primary text-on-primary px-8 py-4 rounded-2xl font-black hover:scale-105 transition-transform shadow-xl shadow-primary/20">
              הוסף ליומן
            </button>
          </div>
        </div>
      </motion.section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-12">
          {/* About Section */}
          <section className="bg-surface-container p-8 rounded-3xl border border-white/5">
            <h2 className="text-2xl font-black mb-6">אודות האירוע</h2>
            <p className="text-on-surface-variant leading-relaxed text-lg">
              {event.title} הוא אחד האירועים המרכזיים בלוח השנה של ענף {event.category}. התחרות מושכת אליה את מיטב הספורטאים מהעולם ומהווה תחנה קריטית בדרך למשחקים האולימפיים. השנה, המשלחת הישראלית מגיעה עם ציפיות גבוהות וסגל חזק במיוחד.
            </p>
          </section>

          {/* Athletes Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black">ספורטאים ישראלים משתתפים</h2>
              <span className="text-primary font-bold">{event.athletes?.length || 0} ספורטאים</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {event.athletes?.map((athlete, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-surface-container-high p-4 rounded-2xl border border-white/5 flex items-center gap-4 group hover:border-primary/30 transition-all cursor-pointer"
                  onClick={() => onPageChange(`athlete:${athlete.name.toLowerCase().replace(' ', '-')}`)}
                >
                  <img src={athlete.image} alt={athlete.name} className="w-20 h-20 rounded-xl object-cover" referrerPolicy="no-referrer" />
                  <div className="flex-1">
                    <h4 className="font-bold text-lg group-hover:text-primary transition-colors">{athlete.name}</h4>
                    <p className="text-xs text-on-surface-variant mb-1">{athlete.category}</p>
                    {athlete.rank && <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded font-bold">{athlete.rank}</span>}
                  </div>
                  <ArrowRight className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-all" />
                </motion.div>
              ))}
            </div>
          </section>

          {/* History Section */}
          {event.history && (
            <section className="space-y-6">
              <h2 className="text-2xl font-black">היסטוריה בתחרות</h2>
              <div className="space-y-4">
                {event.history.map((h, idx) => (
                  <div key={idx} className="bg-surface-container-low p-6 rounded-2xl border border-white/5">
                    <div className="text-primary font-black text-xl mb-4">{h.year}</div>
                    <div className="space-y-3">
                      {h.results.map((r, rIdx) => (
                        <div key={rIdx} className="flex items-center justify-between p-3 bg-surface-container-highest rounded-xl">
                          <div className="flex items-center gap-3">
                            <Trophy className={`w-5 h-5 ${r.medal === 'זהב' ? 'text-primary' : r.medal === 'כסף' ? 'text-secondary' : 'text-tertiary'}`} />
                            <span className="font-bold">{r.name}</span>
                          </div>
                          <div className="text-sm text-on-surface-variant">{r.medal} | {r.weight}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-surface-container-highest p-8 rounded-3xl border border-white/5 sticky top-24">
            <h3 className="text-xl font-black mb-6">מידע נוסף</h3>
            <div className="space-y-6">
              <div>
                <div className="text-[10px] text-on-surface-variant font-black uppercase tracking-widest mb-1">מארגנים</div>
                <div className="font-bold">הוועד האולימפי הבינלאומי</div>
              </div>
              <div>
                <div className="text-[10px] text-on-surface-variant font-black uppercase tracking-widest mb-1">שידור</div>
                <div className="font-bold">ערוץ הספורט (5)</div>
              </div>
              <div>
                <div className="text-[10px] text-on-surface-variant font-black uppercase tracking-widest mb-1">כרטיסים</div>
                <div className="text-error font-bold">אזלו המקומות</div>
              </div>
              <div className="pt-6 border-t border-white/5">
                <button className="w-full py-4 bg-primary text-on-primary rounded-2xl font-black hover:scale-105 transition-transform shadow-xl shadow-primary/20">
                  לאתר התחרות הרשמי
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
