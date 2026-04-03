/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Article, Athlete, Event, MedalEntry, News, PodcastEpisode } from '../types';
import { Calendar, Medal, Plus, Trophy, Users, Headphones } from 'lucide-react';

interface AdminDashboardProps {
  events: Event[];
  athletes: Athlete[];
  news: News[];
  articles: Article[];
  medals: MedalEntry[];
  podcasts: PodcastEpisode[];
  onAddEvent: () => void;
  onDeleteEvent: (id: string) => void;
  onUpdateEvent: (event: Event) => void;
  onAddAthlete: () => void;
  onDeleteAthlete: (id: string) => void;
  onUpdateAthlete: (athlete: Athlete) => void;
  onAddNews: () => void;
  onDeleteNews: (id: string) => void;
  onUpdateNews: (news: News) => void;
  onAddArticle: () => void;
  onDeleteArticle: (id: string) => void;
  onUpdateArticle: (article: Article) => void;
  onAddMedal: () => void;
  onDeleteMedal: (id: string) => void;
  onUpdateMedal: (medal: MedalEntry) => void;
  onAddPodcast: () => void;
  onDeletePodcast: (id: string) => void;
  onUpdatePodcast: (podcast: PodcastEpisode) => void;
  onSeedDatabase: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  events, athletes, news, articles, medals, podcasts,
  onAddEvent, onDeleteEvent, onUpdateEvent,
  onAddAthlete, onDeleteAthlete, onUpdateAthlete,
  onAddNews, onDeleteNews, onUpdateNews,
  onAddArticle, onDeleteArticle, onUpdateArticle,
  onAddMedal, onDeleteMedal, onUpdateMedal,
  onAddPodcast, onDeletePodcast, onUpdatePodcast,
  onSeedDatabase
}) => {
  const [activeTab, setActiveTab] = useState<'events' | 'athletes' | 'news' | 'articles' | 'medals' | 'podcasts' | 'system'>('events');
  const [editingItem, setEditingItem] = useState<{ type: string, data: any } | null>(null);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    switch (editingItem.type) {
      case 'event': onUpdateEvent(editingItem.data); break;
      case 'athlete': onUpdateAthlete(editingItem.data); break;
      case 'news': onUpdateNews(editingItem.data); break;
      case 'article': onUpdateArticle(editingItem.data); break;
      case 'medal': onUpdateMedal(editingItem.data); break;
      case 'podcast': onUpdatePodcast(editingItem.data); break;
    }
    setEditingItem(null);
  };

  return (
    <div className="lg:col-span-9 space-y-8">
      <header className="flex items-center justify-between">
        <h1 className="text-4xl font-black">ניהול מערכת</h1>
        <div className="flex gap-2 bg-surface-container p-1 rounded-xl border border-white/5">
          {[
            { id: 'events', label: 'אירועים', icon: Calendar },
            { id: 'athletes', label: 'ספורטאים', icon: Users },
            { id: 'news', label: 'מבזקים', icon: Trophy },
            { id: 'articles', label: 'כתבות', icon: Trophy },
            { id: 'medals', label: 'מדליות', icon: Medal },
            { id: 'podcasts', label: 'פודקאסט', icon: Headphones },
            { id: 'system', label: 'מערכת', icon: Trophy },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === tab.id ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' : 'text-on-surface-variant hover:text-primary'}`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {editingItem && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface-container-high p-8 rounded-3xl border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-black mb-6">עריכת {editingItem.type === 'event' ? 'אירוע' : editingItem.type === 'athlete' ? 'ספורטאי' : editingItem.type === 'news' ? 'מבזק' : editingItem.type === 'article' ? 'כתבה' : editingItem.type === 'podcast' ? 'פרק פודקאסט' : 'מדליה'}</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              {editingItem.type === 'event' && (
                <>
                  <div>
                    <label className="block text-xs font-bold mb-1">כותרת</label>
                    <input 
                      className="w-full bg-surface-container-highest border border-white/5 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
                      value={editingItem.data.title}
                      onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, title: e.target.value } })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">מיקום</label>
                    <input 
                      className="w-full bg-surface-container-highest border border-white/5 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
                      value={editingItem.data.location}
                      onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, location: e.target.value } })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">תאריך</label>
                    <input 
                      className="w-full bg-surface-container-highest border border-white/5 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
                      value={editingItem.data.date}
                      onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, date: e.target.value } })}
                    />
                  </div>
                </>
              )}
              {editingItem.type === 'athlete' && (
                <>
                  <div>
                    <label className="block text-xs font-bold mb-1">שם</label>
                    <input 
                      className="w-full bg-surface-container-highest border border-white/5 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
                      value={editingItem.data.name}
                      onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, name: e.target.value } })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">ענף</label>
                    <input 
                      className="w-full bg-surface-container-highest border border-white/5 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
                      value={editingItem.data.sport}
                      onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, sport: e.target.value } })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">ביוגרפיה</label>
                    <textarea 
                      className="w-full bg-surface-container-highest border border-white/5 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-primary h-32"
                      value={editingItem.data.bio}
                      onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, bio: e.target.value } })}
                    />
                  </div>
                </>
              )}
              {editingItem.type === 'medal' && (
                <>
                  <div>
                    <label className="block text-xs font-bold mb-1">שם הספורטאי</label>
                    <input 
                      className="w-full bg-surface-container-highest border border-white/5 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
                      value={editingItem.data.athleteName}
                      onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, athleteName: e.target.value } })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold mb-1">ענף</label>
                      <input 
                        className="w-full bg-surface-container-highest border border-white/5 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
                        value={editingItem.data.sport}
                        onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, sport: e.target.value } })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1">סוג מדליה</label>
                      <select 
                        className="w-full bg-surface-container-highest border border-white/5 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
                        value={editingItem.data.medalType}
                        onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, medalType: e.target.value as any } })}
                      >
                        <option value="gold">זהב</option>
                        <option value="silver">כסף</option>
                        <option value="bronze">ארד</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">תחרות</label>
                    <input 
                      className="w-full bg-surface-container-highest border border-white/5 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
                      value={editingItem.data.competition}
                      onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, competition: e.target.value } })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold mb-1">קטגוריית גיל</label>
                      <input 
                        className="w-full bg-surface-container-highest border border-white/5 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
                        value={editingItem.data.ageCategory}
                        onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, ageCategory: e.target.value } })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1">תאריך (YYYY-MM-DD)</label>
                      <input 
                        className="w-full bg-surface-container-highest border border-white/5 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
                        value={editingItem.data.date}
                        onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, date: e.target.value } })}
                      />
                    </div>
                  </div>
                </>
              )}
              {editingItem.type === 'news' && (
                <>
                  <div>
                    <label className="block text-xs font-bold mb-1">טקסט המבזק</label>
                    <textarea 
                      className="w-full bg-surface-container-highest border border-white/5 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-primary h-24"
                      value={editingItem.data.text}
                      onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, text: e.target.value } })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">קטגוריה</label>
                    <input 
                      className="w-full bg-surface-container-highest border border-white/5 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
                      value={editingItem.data.category}
                      onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, category: e.target.value } })}
                    />
                  </div>
                </>
              )}
              {editingItem.type === 'article' && (
                <>
                  <div>
                    <label className="block text-xs font-bold mb-1">כותרת</label>
                    <input 
                      className="w-full bg-surface-container-highest border border-white/5 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
                      value={editingItem.data.title}
                      onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, title: e.target.value } })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">תקציר</label>
                    <textarea 
                      className="w-full bg-surface-container-highest border border-white/5 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-primary h-20"
                      value={editingItem.data.excerpt}
                      onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, excerpt: e.target.value } })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">תוכן</label>
                    <textarea 
                      className="w-full bg-surface-container-highest border border-white/5 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-primary h-40"
                      value={editingItem.data.content}
                      onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, content: e.target.value } })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold mb-1">קטגוריה</label>
                      <input 
                        className="w-full bg-surface-container-highest border border-white/5 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
                        value={editingItem.data.category}
                        onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, category: e.target.value } })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1">תמונה (URL)</label>
                      <input 
                        className="w-full bg-surface-container-highest border border-white/5 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
                        value={editingItem.data.image}
                        onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, image: e.target.value } })}
                      />
                    </div>
                  </div>
                </>
              )}
              {editingItem.type === 'podcast' && (
                <>
                  <div>
                    <label className="block text-xs font-bold mb-1">שם הפרק</label>
                    <input 
                      className="w-full bg-surface-container-highest border border-white/5 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
                      value={editingItem.data.title}
                      onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, title: e.target.value } })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">תקציר</label>
                    <textarea 
                      className="w-full bg-surface-container-highest border border-white/5 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-primary h-24"
                      value={editingItem.data.excerpt}
                      onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, excerpt: e.target.value } })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">קישור להאזנה</label>
                    <input 
                      className="w-full bg-surface-container-highest border border-white/5 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
                      value={editingItem.data.link}
                      onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, link: e.target.value } })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">תאריך</label>
                    <input 
                      className="w-full bg-surface-container-highest border border-white/5 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
                      value={editingItem.data.date}
                      onChange={e => setEditingItem({ ...editingItem, data: { ...editingItem.data, date: e.target.value } })}
                    />
                  </div>
                </>
              )}
              <div className="flex gap-4 pt-4">
                <button type="submit" className="flex-1 bg-primary text-on-primary py-3 rounded-xl font-bold">שמור שינויים</button>
                <button type="button" onClick={() => setEditingItem(null)} className="flex-1 bg-surface-container-highest text-on-surface py-3 rounded-xl font-bold">ביטול</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      <div className="bg-surface-container p-8 rounded-3xl border border-white/5">
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">ניהול אירועים</h2>
              <button onClick={onAddEvent} className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-xl font-bold text-sm">
                <Plus className="w-4 h-4" /> הוסף אירוע
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {events.map(event => (
                <div key={event.id} className="flex items-center justify-between p-4 bg-surface-container-high rounded-xl border border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-surface-container-highest rounded-lg flex flex-col items-center justify-center">
                      <span className="text-primary font-bold text-xs">{event.day}</span>
                      <span className="text-[8px] uppercase">{event.month}</span>
                    </div>
                    <div>
                      <h4 className="font-bold">{event.title}</h4>
                      <p className="text-xs text-on-surface-variant">{event.category} | {event.location}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingItem({ type: 'event', data: event })} className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors">
                      ערוך
                    </button>
                    <button onClick={() => onDeleteEvent(event.id)} className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors">
                      מחק
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'athletes' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">ניהול ספורטאים</h2>
              <button onClick={onAddAthlete} className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-xl font-bold text-sm">
                <Plus className="w-4 h-4" /> הוסף ספורטאי
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {athletes.map(athlete => (
                <div key={athlete.id} className="flex items-center justify-between p-4 bg-surface-container-high rounded-xl border border-white/5">
                  <div className="flex items-center gap-4">
                    <img src={athlete.heroImage} alt={athlete.name} className="w-10 h-10 rounded-lg object-cover" referrerPolicy="no-referrer" />
                    <div>
                      <h4 className="font-bold">{athlete.name}</h4>
                      <p className="text-xs text-on-surface-variant">{athlete.sport} | {athlete.category}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingItem({ type: 'athlete', data: athlete })} className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors">
                      ערוך
                    </button>
                    <button onClick={() => onDeleteAthlete(athlete.id)} className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors">
                      מחק
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'medals' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">ניהול מדליות</h2>
              <button onClick={onAddMedal} className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-xl font-bold text-sm">
                <Plus className="w-4 h-4" /> הוסף מדליה
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {medals.map(medal => (
                <div key={medal.id} className="flex items-center justify-between p-4 bg-surface-container-high rounded-xl border border-white/5">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${medal.medalType === 'gold' ? 'bg-primary text-on-primary' : medal.medalType === 'silver' ? 'bg-secondary text-on-secondary' : 'bg-tertiary text-on-tertiary'}`}>
                      <Medal className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold">{medal.athleteName}</h4>
                      <p className="text-xs text-on-surface-variant">{medal.sport} | {medal.competition}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingItem({ type: 'medal', data: medal })} className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors">
                      ערוך
                    </button>
                    <button onClick={() => onDeleteMedal(medal.id)} className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors">
                      מחק
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'news' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">ניהול מבזקים</h2>
              <button onClick={onAddNews} className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-xl font-bold text-sm">
                <Plus className="w-4 h-4" /> הוסף מבזק
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {news.map(item => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-surface-container-high rounded-xl border border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-surface-container-highest rounded-lg flex items-center justify-center text-primary">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold line-clamp-1">{item.text}</h4>
                      <p className="text-xs text-on-surface-variant">{item.timestamp} | {item.category}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingItem({ type: 'news', data: item })} className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors">
                      ערוך
                    </button>
                    <button onClick={() => onDeleteNews(item.id)} className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors">
                      מחק
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'articles' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">ניהול כתבות</h2>
              <button onClick={onAddArticle} className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-xl font-bold text-sm">
                <Plus className="w-4 h-4" /> הוסף כתבה
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {articles.map(article => (
                <div key={article.id} className="flex items-center justify-between p-4 bg-surface-container-high rounded-xl border border-white/5">
                  <div className="flex items-center gap-4">
                    <img src={article.image} alt={article.title} className="w-10 h-10 rounded-lg object-cover" referrerPolicy="no-referrer" />
                    <div>
                      <h4 className="font-bold">{article.title}</h4>
                      <p className="text-xs text-on-surface-variant">{article.category} | {article.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingItem({ type: 'article', data: article })} className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors">
                      ערוך
                    </button>
                    <button onClick={() => onDeleteArticle(article.id)} className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors">
                      מחק
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'podcasts' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">ניהול פודקאסט</h2>
              <button onClick={onAddPodcast} className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-xl font-bold text-sm">
                <Plus className="w-4 h-4" /> הוסף פרק
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {podcasts.map(episode => (
                <div key={episode.id} className="flex items-center justify-between p-4 bg-surface-container-high rounded-xl border border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-surface-container-highest rounded-lg flex items-center justify-center text-primary">
                      <Headphones className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold">{episode.title}</h4>
                      <p className="text-xs text-on-surface-variant">{episode.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingItem({ type: 'podcast', data: episode })} className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors">
                      ערוך
                    </button>
                    <button onClick={() => onDeletePodcast(episode.id)} className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors">
                      מחק
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'system' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">ניהול מערכת</h2>
            <div className="bg-surface-container-high p-6 rounded-2xl border border-white/5 space-y-4">
              <div>
                <h3 className="font-bold text-lg mb-2">סנכרון נתונים ראשוני</h3>
                <p className="text-on-surface-variant text-sm mb-4">
                  אם האוספים ב-Firestore ריקים, לחץ על הכפתור למטה כדי ליצור אותם ולמלא אותם בנתוני הבסיס (מדליות 2025, ספורטאים ואירועים).
                </p>
                <button 
                  onClick={onSeedDatabase}
                  className="bg-primary text-on-primary px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform flex items-center gap-2"
                >
                  <Trophy className="w-5 h-5" /> סנכרון נתונים ראשוני
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
