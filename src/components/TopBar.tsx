/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LayoutDashboard, Menu, Search, User } from 'lucide-react';
import { Page, SPORTS_NAV } from '../types';

interface TopBarProps {
  onPageChange: (page: Page) => void;
  currentPage: Page;
  isAdmin: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({ onPageChange, currentPage, isAdmin }) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-surface-container/80 backdrop-blur-xl border-b border-white/5 z-50 flex items-center px-8 lg:pr-72">
      <div className="flex items-center gap-8 w-full max-w-screen-2xl mx-auto">
        <div 
          className="text-2xl font-black tracking-tighter text-primary cursor-pointer hover:scale-105 transition-transform"
          onClick={() => onPageChange('home')}
        >
          הפודיום<span className="text-on-surface">.</span>
        </div>
        
        <nav className="hidden lg:flex items-center gap-6">
          {SPORTS_NAV.map((item) => (
            <button 
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`text-sm font-bold transition-all hover:text-primary ${currentPage === item.id ? 'text-primary' : 'text-on-surface-variant'}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mr-auto flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <input 
              type="text" 
              placeholder="חיפוש ספורטאי או אירוע..."
              className="bg-surface-container-highest border border-outline-variant/20 rounded-full py-2 pr-10 pl-4 text-sm w-64 focus:ring-2 focus:ring-primary outline-none transition-all"
            />
          </div>
          {isAdmin && (
            <button 
              onClick={() => onPageChange('admin')}
              className={`p-2 rounded-full transition-all ${currentPage === 'admin' ? 'bg-primary text-on-primary' : 'bg-surface-container-highest text-on-surface-variant hover:bg-primary/10 hover:text-primary'}`}
              title="ניהול מערכת"
            >
              <LayoutDashboard className="w-5 h-5" />
            </button>
          )}
          <button className="p-2 bg-surface-container-highest text-on-surface-variant rounded-full hover:bg-primary/10 hover:text-primary transition-all">
            <User className="w-5 h-5" />
          </button>
          <button className="lg:hidden p-2 text-on-surface">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};
