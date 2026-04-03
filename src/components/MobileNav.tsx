/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Calendar, Home, Medal, Users, Headphones } from 'lucide-react';
import { Page } from '../types';

interface MobileNavProps {
  onPageChange: (page: Page) => void;
  currentPage: Page;
}

export const MobileNav: React.FC<MobileNavProps> = ({ onPageChange, currentPage }) => {
  const menuItems = [
    { id: 'home', icon: Home, label: 'בית' },
    { id: 'calendar', icon: Calendar, label: 'לוח' },
    { id: 'athletes', icon: Users, label: 'ספורטאים' },
    { id: 'medals', icon: Medal, label: 'מדליות' },
    { id: 'podcast', icon: Headphones, label: 'פודקאסט' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-surface-container/95 backdrop-blur-xl border-t border-white/5 z-50 lg:hidden flex items-center justify-around px-4">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onPageChange(item.id)}
          className={`flex flex-col items-center gap-1 transition-all ${currentPage === item.id ? 'text-primary' : 'text-on-surface-variant'}`}
        >
          <item.icon className={`w-5 h-5 ${currentPage === item.id ? 'fill-primary/20' : ''}`} />
          <span className="text-[10px] font-bold">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};
