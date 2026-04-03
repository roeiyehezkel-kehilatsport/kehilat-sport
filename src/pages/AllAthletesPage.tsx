/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Search, User } from 'lucide-react';
import { Athlete, Page } from '../types';

interface AllAthletesPageProps {
  onPageChange: (page: Page) => void;
  athletes: Athlete[];
}

export const AllAthletesPage: React.FC<AllAthletesPageProps> = ({ onPageChange, athletes }) => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAthletes = athletes.filter(athlete => {
    const matchesFilter = filter === 'all' || athlete.sport === filter;
    const matchesSearch = athlete.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const sports = ['all', ...new Set(athletes.map(a => a.sport))];

  return (
    <div className="lg:col-span-9 space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black mb-2">נבחרת ישראל</h1>
          <p className="text-on-surface-variant">הכירו את הספורטאים והספורטאיות שמייצגים אותנו בעולם</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <input 
              type="text" 
              placeholder="חפש ספורטאי..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-surface-container-highest border border-outline-variant/20 rounded-xl py-2 pr-10 pl-4 text-sm w-64 focus:ring-2 focus:ring-primary outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-2 bg-surface-container-highest p-1 rounded-xl border border-white/5">
            {sports.map(sport => (
              <button
                key={sport}
                onClick={() => setFilter(sport)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filter === sport ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' : 'text-on-surface-variant hover:text-primary'}`}
              >
                {sport === 'all' ? 'הכל' : sport}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredAthletes.length > 0 ? (
          filteredAthletes.map((athlete, idx) => (
            <motion.div
              key={athlete.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="group bg-surface-container rounded-3xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all cursor-pointer"
              onClick={() => onPageChange(`athlete:${athlete.id}`)}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img src={athlete.heroImage} alt={athlete.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute bottom-0 right-0 p-6 w-full">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-primary text-on-primary text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">
                      {athlete.sport}
                    </span>
                    <span className="text-white/80 text-[10px] font-bold">{athlete.category}</span>
                  </div>
                  <h3 className="text-2xl font-black text-white group-hover:text-primary transition-colors">{athlete.name}</h3>
                </div>
              </div>
              <div className="p-6 flex items-center justify-between bg-surface-container-high">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-on-surface-variant font-black uppercase tracking-widest">דירוג</span>
                    <span className="font-bold text-primary">{athlete.rank}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-on-surface-variant font-black uppercase tracking-widest">מדליות</span>
                    <span className="font-bold text-on-surface">{athlete.olympicMedals}</span>
                  </div>
                </div>
                <button className="p-3 bg-surface-container-highest rounded-2xl group-hover:bg-primary group-hover:text-on-primary transition-all">
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 bg-surface-container rounded-3xl border border-dashed border-outline-variant/30">
            <User className="w-16 h-16 text-on-surface-variant/20 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-on-surface-variant">לא נמצאו ספורטאים התואמים את החיפוש</h3>
            <button onClick={() => {setFilter('all'); setSearchQuery('');}} className="mt-4 text-primary font-bold hover:underline">נקה מסננים</button>
          </div>
        )}
      </div>
    </div>
  );
};
