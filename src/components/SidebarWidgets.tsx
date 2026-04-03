/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Calendar, Medal, Plus, Trophy } from 'lucide-react';
import { Event, MedalEntry, Page } from '../types';

interface SidebarWidgetsProps {
  events: Event[];
  medals: MedalEntry[];
  onPageChange: (page: Page) => void;
  isAdmin: boolean;
  onAddEvent?: () => void;
}

export const SidebarWidgets: React.FC<SidebarWidgetsProps> = ({ events, medals, onPageChange, isAdmin, onAddEvent }) => {
  return (
    <aside className="lg:col-span-3 space-y-8">
      {/* Event Calendar Widget */}
      <div 
        className="bg-surface-container-high rounded-2xl p-6 shadow-xl border-l border-primary/20 cursor-pointer hover:bg-surface-bright transition-colors"
        onClick={() => onPageChange('calendar')}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-primary" />
            <h3 className="font-headline font-bold text-xl">לוח אירועים</h3>
          </div>
          {isAdmin && onAddEvent && (
            <button 
              onClick={(e) => { e.stopPropagation(); onAddEvent(); }}
              className="p-2 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
              title="הוסף אירוע"
            >
              <Plus className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="space-y-6">
          {events.slice(0, 3).map((event) => (
            <div 
              key={event.id} 
              className={`flex gap-4 cursor-pointer hover:translate-x-[-4px] transition-transform ${event.dimmed ? 'opacity-70' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                onPageChange(`event:${event.id}`);
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
          onClick={() => onPageChange('calendar')}
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
            { label: 'זהב', count: medals.filter(m => m.medalType === 'gold').length, color: 'bg-primary', iconColor: 'text-on-primary' },
            { label: 'כסף', count: medals.filter(m => m.medalType === 'silver').length, color: 'bg-secondary', iconColor: 'text-on-secondary' },
            { label: 'ארד', count: medals.filter(m => m.medalType === 'bronze').length, color: 'bg-tertiary', iconColor: 'text-on-tertiary' },
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
        <button 
          onClick={() => onPageChange('medals')}
          className="w-full mt-8 py-3 bg-surface-container-highest rounded-xl text-sm font-bold hover:bg-surface-bright transition-colors"
        >
          לפירוט המלא
        </button>
      </div>

      {/* Newsletter Widget */}
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
  );
};
