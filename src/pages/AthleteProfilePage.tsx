/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, MapPin, Medal, Share2, Star, Trophy } from 'lucide-react';
import { Athlete, Page } from '../types';

interface AthleteProfilePageProps {
  athleteId: string;
  onPageChange: (page: Page) => void;
  athletes: Athlete[];
}

export const AthleteProfilePage: React.FC<AthleteProfilePageProps> = ({ athleteId, onPageChange, athletes }) => {
  const athlete = athletes.find(a => a.id === athleteId);

  if (!athlete) {
    return (
      <div className="lg:col-span-9 text-center py-20">
        <h2 className="text-2xl font-bold text-on-surface-variant">הספורטאי לא נמצא</h2>
        <button onClick={() => onPageChange('athletes')} className="mt-4 text-primary font-bold hover:underline">חזרה לרשימת הספורטאים</button>
      </div>
    );
  }

  return (
    <div className="lg:col-span-9 space-y-12">
      {/* Hero Header */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[550px] rounded-3xl overflow-hidden"
      >
        <img 
          src={athlete.heroImage} 
          alt={athlete.name} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute top-0 right-0 p-12 w-full flex justify-between items-start">
          <div className="text-[120px] font-black text-white/10 leading-none select-none uppercase tracking-tighter">
            {athlete.bgText}
          </div>
          <div className="flex gap-4">
            <button className="p-4 bg-surface-container-highest/50 backdrop-blur-md rounded-2xl hover:bg-primary hover:text-on-primary transition-all">
              <Share2 className="w-6 h-6" />
            </button>
            <button className="p-4 bg-surface-container-highest/50 backdrop-blur-md rounded-2xl hover:bg-primary hover:text-on-primary transition-all">
              <Star className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 p-12 w-full flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-primary text-on-primary text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
                {athlete.sport}
              </span>
              <span className="text-on-surface-variant text-xs font-bold">{athlete.category}</span>
            </div>
            <h1 className="text-6xl font-black leading-tight mb-6">{athlete.name}</h1>
            <div className="flex flex-wrap items-center gap-8 text-on-surface-variant font-bold">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" /> דירוג עולמי: {athlete.rank}
              </div>
              <div className="flex items-center gap-2">
                <Medal className="w-5 h-5 text-primary" /> מדליות אולימפיות: {athlete.olympicMedals}
              </div>
            </div>
          </div>
          <div className="bg-surface-container-highest/50 backdrop-blur-xl p-6 rounded-3xl border border-white/10 min-w-[240px]">
            <div className="text-[10px] text-on-surface-variant font-black uppercase tracking-widest mb-4">האירוע הבא</div>
            <h4 className="font-bold text-lg mb-1">{athlete.upcomingEvent.title}</h4>
            <p className="text-xs text-primary font-bold">{athlete.upcomingEvent.date}</p>
          </div>
        </div>
      </motion.section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-12">
          {/* Bio Section */}
          <section className="bg-surface-container p-8 rounded-3xl border border-white/5">
            <h2 className="text-2xl font-black mb-6">ביוגרפיה</h2>
            <p className="text-on-surface-variant leading-relaxed text-lg">
              {athlete.bio}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 pt-8 border-t border-white/5">
              <div>
                <div className="text-[10px] text-on-surface-variant font-black uppercase tracking-widest mb-1">תאריך לידה</div>
                <div className="font-bold">{athlete.birthDate}</div>
              </div>
              <div>
                <div className="text-[10px] text-on-surface-variant font-black uppercase tracking-widest mb-1">גובה</div>
                <div className="font-bold">{athlete.height}</div>
              </div>
              <div>
                <div className="text-[10px] text-on-surface-variant font-black uppercase tracking-widest mb-1">מאמן</div>
                <div className="font-bold">{athlete.coach}</div>
              </div>
              <div>
                <div className="text-[10px] text-on-surface-variant font-black uppercase tracking-widest mb-1">מקום מגורים</div>
                <div className="font-bold">ישראל</div>
              </div>
            </div>
          </section>

          {/* Achievements Timeline */}
          <section className="space-y-8">
            <h2 className="text-2xl font-black">הישגים בולטים</h2>
            <div className="space-y-6">
              {athlete.achievements.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex gap-6 group"
                >
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full bg-${item.color}/10 flex items-center justify-center text-${item.color} group-hover:scale-110 transition-transform`}>
                      <Medal className="w-6 h-6" />
                    </div>
                    <div className="w-0.5 flex-1 bg-white/5 my-2" />
                  </div>
                  <div className="flex-1 bg-surface-container-high p-6 rounded-2xl border border-white/5 group-hover:border-primary/30 transition-all">
                    <div className="text-primary font-black text-xl mb-1">{item.year}</div>
                    <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                    <p className="text-sm text-on-surface-variant">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* News Section */}
          <section className="space-y-8">
            <h2 className="text-2xl font-black">חדשות ועדכונים</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {athlete.news.map((item, idx) => (
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
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-8">
          {/* Schedule Widget */}
          <div className="bg-surface-container-highest p-8 rounded-3xl border border-white/5">
            <h3 className="text-xl font-black mb-6">לוח תחרויות קרוב</h3>
            <div className="space-y-6">
              {athlete.schedule.map((item, idx) => (
                <div key={idx} className="flex gap-4 group cursor-pointer">
                  <div className="flex flex-col items-center justify-center bg-surface-container-lowest w-12 h-12 rounded-lg group-hover:bg-primary group-hover:text-on-primary transition-colors">
                    <span className="text-primary font-bold text-lg group-hover:text-on-primary">{item.day}</span>
                    <span className="text-[10px] uppercase font-medium">{item.month}</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="text-sm font-bold group-hover:text-primary transition-colors">{item.title}</h5>
                    <p className="text-[10px] text-on-surface-variant uppercase">{item.location}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-4 bg-surface-container-low rounded-2xl text-sm font-bold hover:bg-primary hover:text-on-primary transition-all">
              ללוח המלא
            </button>
          </div>

          {/* Social Links */}
          <div className="bg-surface-container p-8 rounded-3xl border border-white/5">
            <h3 className="text-xl font-black mb-6">עקבו אחרי {athlete.name.split(' ')[0]}</h3>
            <div className="grid grid-cols-3 gap-4">
              {['Instagram', 'Facebook', 'Twitter'].map(social => (
                <button key={social} className="flex flex-col items-center gap-2 p-4 bg-surface-container-high rounded-2xl hover:bg-primary/10 hover:text-primary transition-all">
                  <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold">{social}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
