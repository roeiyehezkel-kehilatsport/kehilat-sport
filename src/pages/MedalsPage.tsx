/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Filter, Medal, Search, Trophy } from 'lucide-react';
import { MedalEntry } from '../types';

interface MedalsPageProps {
  medals: MedalEntry[];
}

export const MedalsPage: React.FC<MedalsPageProps> = ({ medals }) => {
  const [sportFilter, setSportFilter] = useState('all');
  const [medalFilter, setMedalFilter] = useState('all');
  const [ageFilter, setAgeFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMedals = medals.filter(medal => {
    const matchesSport = sportFilter === 'all' || medal.sport === sportFilter;
    const matchesMedal = medalFilter === 'all' || medal.medalType === medalFilter;
    const matchesAge = ageFilter === 'all' || medal.ageCategory === ageFilter;
    const matchesSearch = medal.athleteName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         medal.competition.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSport && matchesMedal && matchesAge && matchesSearch;
  });

  const sports = ['all', ...new Set(medals.map(m => m.sport))];
  const ageCategories = ['all', ...new Set(medals.map(m => m.ageCategory))];

  const totals = {
    gold: filteredMedals.filter(m => m.medalType === 'gold').length,
    silver: filteredMedals.filter(m => m.medalType === 'silver').length,
    bronze: filteredMedals.filter(m => m.medalType === 'bronze').length
  };

  return (
    <div className="lg:col-span-9 space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black mb-2">מאזן המדליות</h1>
          <p className="text-on-surface-variant">הישגי נבחרת ישראל בתחרויות הבינלאומיות</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <input 
              type="text" 
              placeholder="חפש ספורטאי או תחרות..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-surface-container-highest border border-outline-variant/20 rounded-xl py-2 pr-10 pl-4 text-sm w-64 focus:ring-2 focus:ring-primary outline-none transition-all"
            />
          </div>
        </div>
      </header>

      {/* Totals Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'זהב', count: totals.gold, color: 'bg-primary', iconColor: 'text-on-primary' },
          { label: 'כסף', count: totals.silver, color: 'bg-secondary', iconColor: 'text-on-secondary' },
          { label: 'ארד', count: totals.bronze, color: 'bg-tertiary', iconColor: 'text-on-tertiary' },
        ].map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-surface-container p-8 rounded-3xl border border-white/5 flex items-center justify-between group hover:border-primary/30 transition-all"
          >
            <div>
              <div className="text-xs font-black text-on-surface-variant uppercase tracking-widest mb-2">{item.label}</div>
              <div className="text-5xl font-black">{item.count}</div>
            </div>
            <div className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center ${item.iconColor} shadow-xl shadow-primary/20 group-hover:scale-110 transition-transform`}>
              <Trophy className="w-8 h-8" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters Bar */}
      <div className="bg-surface-container-high p-4 rounded-2xl border border-white/5 flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-3">
          <Filter className="w-4 h-4 text-primary" />
          <span className="text-sm font-bold">סנן לפי:</span>
        </div>
        
        <select 
          value={sportFilter} 
          onChange={(e) => setSportFilter(e.target.value)}
          className="bg-surface-container-highest border border-outline-variant/20 rounded-xl px-4 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-primary transition-all"
        >
          <option value="all">כל הענפים</option>
          {sports.filter(s => s !== 'all').map(sport => (
            <option key={sport} value={sport}>{sport}</option>
          ))}
        </select>

        <select 
          value={medalFilter} 
          onChange={(e) => setMedalFilter(e.target.value)}
          className="bg-surface-container-highest border border-outline-variant/20 rounded-xl px-4 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-primary transition-all"
        >
          <option value="all">כל המדליות</option>
          <option value="gold">זהב</option>
          <option value="silver">כסף</option>
          <option value="bronze">ארד</option>
        </select>

        <select 
          value={ageFilter} 
          onChange={(e) => setAgeFilter(e.target.value)}
          className="bg-surface-container-highest border border-outline-variant/20 rounded-xl px-4 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-primary transition-all"
        >
          <option value="all">כל קטגוריות הגיל</option>
          {ageCategories.filter(a => a !== 'all').map(age => (
            <option key={age} value={age}>{age}</option>
          ))}
        </select>
      </div>

      {/* Medals Table */}
      <div className="bg-surface-container rounded-3xl overflow-hidden border border-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="bg-surface-container-highest border-b border-white/5">
                <th className="px-8 py-6 font-black text-xs uppercase tracking-widest text-on-surface-variant">ספורטאי/ת</th>
                <th className="px-8 py-6 font-black text-xs uppercase tracking-widest text-on-surface-variant">ענף</th>
                <th className="px-8 py-6 font-black text-xs uppercase tracking-widest text-on-surface-variant">תחרות</th>
                <th className="px-8 py-6 font-black text-xs uppercase tracking-widest text-on-surface-variant">קטגוריה</th>
                <th className="px-8 py-6 font-black text-xs uppercase tracking-widest text-on-surface-variant">מדליה</th>
                <th className="px-8 py-6 font-black text-xs uppercase tracking-widest text-on-surface-variant">תאריך</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredMedals.map((medal, idx) => (
                <motion.tr 
                  key={medal.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.02 }}
                  className="hover:bg-white/5 transition-colors group"
                >
                  <td className="px-8 py-6 font-bold">{medal.athleteName}</td>
                  <td className="px-8 py-6 text-sm text-on-surface-variant">{medal.sport}</td>
                  <td className="px-8 py-6 text-sm font-medium">{medal.competition}</td>
                  <td className="px-8 py-6 text-sm text-on-surface-variant">{medal.ageCategory}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${medal.medalType === 'gold' ? 'bg-primary' : medal.medalType === 'silver' ? 'bg-secondary' : 'bg-tertiary'}`} />
                      <span className="text-sm font-black uppercase tracking-tighter">
                        {medal.medalType === 'gold' ? 'זהב' : medal.medalType === 'silver' ? 'כסף' : 'ארד'}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-xs text-on-surface-variant font-mono">{medal.date}</td>
                </motion.tr>
              ))}
              {filteredMedals.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center text-on-surface-variant font-bold">לא נמצאו מדליות התואמות את החיפוש</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
