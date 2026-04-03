/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, MapPin, Medal, Trophy } from 'lucide-react';
import { Event, MedalEntry, Page } from '../types';
import { SPORT_CONTENT } from '../constants';

interface SportCategoryPageProps {
  category: string;
  events: Event[];
  medals: MedalEntry[];
  onPageChange: (page: Page) => void;
}

export const SportCategoryPage: React.FC<SportCategoryPageProps> = ({ category, events, medals, onPageChange }) => {
  const content = SPORT_CONTENT[category];
  const categoryEvents = events.filter(e => e.category === category);
  
  // Calculate dynamic medals for this category
  const categoryMedals = {
    gold: medals.filter(m => m.sport === category && m.medalType === 'gold').length,
    silver: medals.filter(m => m.sport === category && m.medalType === 'silver').length,
    bronze: medals.filter(m => m.sport === category && m.medalType === 'bronze').length
  };

  if (!content) return null;

  return (
    <div className="lg:col-span-9 space-y-12">
      {/* Hero Header */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[450px] rounded-3xl overflow-hidden"
      >
        <img 
          src={content.heroImage} 
          alt={category} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute top-0 right-0 p-12 w-full flex justify-between items-start">
          <div className="text-[120px] font-black text-white/10 leading-none select-none uppercase tracking-tighter">
            {content.bgText}
          </div>
        </div>
        <div className="absolute bottom-0 right-0 p-12 w-full flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h1 className="text-6xl font-black leading-tight mb-6">{content.heroTitle}</h1>
            <p className="text-on-surface-variant text-lg leading-relaxed">{content.heroDesc}</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-surface-container-highest/50 backdrop-blur-xl p-6 rounded-3xl border border-white/10 flex items-center gap-6">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary mb-2">
                  <Medal className="w-5 h-5" />
                </div>
                <span className="text-2xl font-black">{categoryMedals.gold}</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-on-secondary mb-2">
                  <Medal className="w-5 h-5" />
                </div>
                <span className="text-2xl font-black">{categoryMedals.silver}</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-tertiary flex items-center justify-center text-on-tertiary mb-2">
                  <Medal className="w-5 h-5" />
                </div>
                <span className="text-2xl font-black">{categoryMedals.bronze}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-12">
          {/* News Section */}
          <section className="space-y-8">
            <h2 className="text-2xl font-black">חדשות הענף</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.news.map((item: any, idx: number) => (
                <div key={idx} className="bg-surface-container rounded-2xl overflow-hidden border border-white/5 group cursor-pointer">
                  <div className="relative h-48">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full">
                      {item.tag}
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold mb-2 group-hover:text-primary transition-colors">{item.title}</h4>
                    <p className="text-xs text-on-surface-variant line-clamp-2">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Athletes Section */}
          <section className="space-y-8">
            <h2 className="text-2xl font-black">ספורטאים מובילים</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {content.athletes.map((athlete: any, idx: number) => (
                <div 
                  key={idx} 
                  className="bg-surface-container-high p-4 rounded-2xl border border-white/5 group hover:border-primary/30 transition-all cursor-pointer"
                  onClick={() => onPageChange(`athlete:${athlete.name.toLowerCase().replace(' ', '-')}`)}
                >
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-4">
                    <img src={athlete.image} alt={athlete.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                    <div className="absolute bottom-0 right-0 p-4 w-full bg-gradient-to-t from-black/80 to-transparent">
                      <div className="text-[10px] text-primary font-black uppercase tracking-widest">{athlete.rank}</div>
                      <h4 className="font-bold text-white">{athlete.name}</h4>
                    </div>
                  </div>
                  <p className="text-[10px] text-on-surface-variant line-clamp-2">{athlete.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-8">
          {/* Rankings Widget */}
          <div className="bg-surface-container-highest p-8 rounded-3xl border border-white/5">
            <h3 className="text-xl font-black mb-6">דירוג עולמי</h3>
            <div className="space-y-6">
              {content.rankings.map((item: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl border border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-sm">
                      {item.rank}
                    </div>
                    <div>
                      <h5 className="text-sm font-bold">{item.name}</h5>
                      <p className="text-[10px] text-on-surface-variant">{item.category}</p>
                    </div>
                  </div>
                  <div className="text-xs font-black text-primary">{item.points} נק'</div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events Widget */}
          <div className="bg-surface-container p-8 rounded-3xl border border-white/5">
            <h3 className="text-xl font-black mb-6">אירועים קרובים</h3>
            <div className="space-y-6">
              {categoryEvents.slice(0, 3).map((event, idx) => (
                <div 
                  key={idx} 
                  className="flex gap-4 group cursor-pointer"
                  onClick={() => onPageChange(`event:${event.id}`)}
                >
                  <div className="flex flex-col items-center justify-center bg-surface-container-lowest w-12 h-12 rounded-lg group-hover:bg-primary group-hover:text-on-primary transition-colors">
                    <span className="text-primary font-bold text-lg group-hover:text-on-primary">{event.day}</span>
                    <span className="text-[10px] uppercase font-medium">{event.month}</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="text-sm font-bold group-hover:text-primary transition-colors">{event.title}</h5>
                    <p className="text-[10px] text-on-surface-variant uppercase">{event.location}</p>
                  </div>
                </div>
              ))}
              {categoryEvents.length === 0 && <p className="text-xs text-on-surface-variant text-center">אין אירועים קרובים בענף זה</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
