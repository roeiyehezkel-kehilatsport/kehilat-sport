/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Filter, MapPin, Search } from 'lucide-react';
import { Event, Page } from '../types';

interface CalendarPageProps {
  onPageChange: (page: Page) => void;
  events: Event[];
}

export const CalendarPage: React.FC<CalendarPageProps> = ({ onPageChange, events }) => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = events.filter(event => {
    const matchesFilter = filter === 'all' || event.category === filter;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const categories = ['all', ...new Set(events.map(e => e.category))];

  return (
    <div className="lg:col-span-9 space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black mb-2">לוח אירועים</h1>
          <p className="text-on-surface-variant">כל התחרויות, המוקדמות והגמרים במקום אחד</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <input 
              type="text" 
              placeholder="חפש אירוע..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-surface-container-highest border border-outline-variant/20 rounded-xl py-2 pr-10 pl-4 text-sm w-64 focus:ring-2 focus:ring-primary outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-2 bg-surface-container-highest p-1 rounded-xl border border-white/5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filter === cat ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' : 'text-on-surface-variant hover:text-primary'}`}
              >
                {cat === 'all' ? 'הכל' : cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`group bg-surface-container rounded-2xl p-6 border border-white/5 hover:border-primary/30 transition-all cursor-pointer flex flex-col md:flex-row md:items-center gap-8 ${event.dimmed ? 'opacity-60 grayscale' : ''}`}
              onClick={() => onPageChange(`event:${event.id}`)}
            >
              <div className="flex flex-col items-center justify-center bg-surface-container-highest w-20 h-20 rounded-2xl flex-shrink-0 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="text-3xl font-black">{event.day}</span>
                <span className="text-xs font-bold uppercase">{event.month}</span>
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <span className="bg-surface-container-highest text-primary text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">
                    {event.category}
                  </span>
                  {event.active && (
                    <span className="flex items-center gap-1 text-error text-[10px] font-black animate-pulse">
                      <span className="w-1.5 h-1.5 bg-error rounded-full" /> LIVE
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{event.title}</h3>
                <div className="flex items-center gap-4 text-on-surface-variant text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {event.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> {event.date}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex -space-x-3 rtl:space-x-reverse">
                  {[1, 2, 3].map(i => (
                    <img key={i} src={`https://picsum.photos/seed/athlete-${i}/100/100`} alt="Athlete" className="w-10 h-10 rounded-full border-2 border-surface-container object-cover" referrerPolicy="no-referrer" />
                  ))}
                </div>
                <button className="bg-surface-container-highest text-on-surface-variant px-6 py-3 rounded-xl text-sm font-bold group-hover:bg-primary group-hover:text-on-primary transition-all">
                  פרטים נוספים
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-20 bg-surface-container rounded-3xl border border-dashed border-outline-variant/30">
            <Calendar className="w-16 h-16 text-on-surface-variant/20 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-on-surface-variant">לא נמצאו אירועים התואמים את החיפוש</h3>
            <button onClick={() => {setFilter('all'); setSearchQuery('');}} className="mt-4 text-primary font-bold hover:underline">נקה מסננים</button>
          </div>
        )}
      </div>
    </div>
  );
};
