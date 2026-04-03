/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Calendar, Home, LayoutDashboard, Medal, Users, Headphones } from 'lucide-react';
import { Page } from '../types';

interface SideNavProps {
  onPageChange: (page: Page) => void;
  currentPage: Page;
  isAdmin: boolean;
}

export const SideNav: React.FC<SideNavProps> = ({ onPageChange, currentPage, isAdmin }) => {
  const menuItems = [
    { id: 'home', icon: Home, label: 'בית' },
    { id: 'calendar', icon: Calendar, label: 'לוח אירועים' },
    { id: 'athletes', icon: Users, label: 'ספורטאים' },
    { id: 'medals', icon: Medal, label: 'מאזן המדליות' },
    { id: 'podcast', icon: Headphones, label: 'פודקאסט הלפיד' },
  ];

  return (
    <aside className="fixed top-0 right-0 bottom-0 w-64 bg-surface-container-low border-l border-white/5 z-40 hidden lg:flex flex-col pt-24 px-4">
      <div className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${
              currentPage === item.id 
                ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' 
                : 'text-on-surface-variant hover:bg-surface-container-highest hover:text-primary'
            }`}
          >
            <item.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${currentPage === item.id ? 'text-on-primary' : 'text-primary'}`} />
            <span className="font-bold text-sm">{item.label}</span>
          </button>
        ))}
        {isAdmin && (
          <button
            onClick={() => onPageChange('admin')}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all group mt-8 ${
              currentPage === 'admin' 
                ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' 
                : 'text-on-surface-variant hover:bg-surface-container-highest hover:text-primary'
            }`}
          >
            <LayoutDashboard className={`w-5 h-5 transition-transform group-hover:scale-110 ${currentPage === 'admin' ? 'text-on-primary' : 'text-primary'}`} />
            <span className="font-bold text-sm">ניהול מערכת</span>
          </button>
        )}
      </div>

      <div className="mt-auto mb-8 p-6 bg-gradient-to-br from-primary/10 to-surface-container-highest rounded-2xl border border-primary/20">
        <div className="text-xs font-black text-primary uppercase tracking-widest mb-2">מצב המשלחת</div>
        <div className="text-2xl font-black mb-1">פריז 2024</div>
        <div className="text-[10px] text-on-surface-variant font-bold">88 ספורטאים • 16 ענפים</div>
        <div className="mt-4 h-1 bg-surface-container-lowest rounded-full overflow-hidden">
          <div className="h-full bg-primary w-3/4 rounded-full" />
        </div>
      </div>
    </aside>
  );
};
