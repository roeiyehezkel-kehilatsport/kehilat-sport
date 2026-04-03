/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Play } from 'lucide-react';
import { Article, Page } from '../types';

interface HomePageProps {
  onPageChange: (page: Page) => void;
  articles: Article[];
}

export const HomePage: React.FC<HomePageProps> = ({ onPageChange, articles }) => {
  const mainArticle = articles[0] || {
    id: 'default',
    title: "המסע לפריז 2024: המשלחת הישראלית הגדולה אי פעם",
    excerpt: "עם מעל ל-80 ספורטאים ב-16 ענפים שונים, ישראל מתכוננת למשחקים האולימפיים בבירת צרפת עם ציפיות גבוהות מתמיד.",
    image: "https://picsum.photos/seed/paris-olympics/1200/800",
    category: "כתבת שער",
    author: "מערכת הפודיום",
    date: "2024-01-01"
  };

  return (
    <div className="lg:col-span-9 space-y-12">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-[600px] rounded-3xl overflow-hidden group cursor-pointer"
        onClick={() => onPageChange(`article:${mainArticle.id}`)}
      >
        <img 
          src={mainArticle.image} 
          alt="Hero" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="absolute bottom-0 right-0 p-12 max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-primary text-on-primary text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
              {mainArticle.category}
            </span>
            <span className="text-on-surface-variant text-xs font-bold">{mainArticle.date}</span>
          </div>
          <h1 className="text-5xl font-black leading-tight mb-6 group-hover:text-primary transition-colors">
            {mainArticle.title}
          </h1>
          <p className="text-on-surface-variant text-lg mb-8 line-clamp-2">
            {mainArticle.excerpt}
          </p>
          <button className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-black hover:bg-primary hover:text-on-primary transition-all">
            קרא עוד <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </motion.section>

      {/* Featured Articles Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.slice(1, 3).map((article, idx) => (
          <motion.div 
            key={article.id}
            initial={{ opacity: 0, x: idx % 2 === 0 ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-surface-container rounded-3xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all group cursor-pointer"
            onClick={() => onPageChange(`article:${article.id}`)}
          >
            <div className="relative h-64 overflow-hidden">
              <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full">
                {article.category}
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{article.title}</h3>
              <p className="text-on-surface-variant text-sm mb-6 line-clamp-2">{article.excerpt}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-on-surface-variant">{article.author}</span>
                <button className="text-primary font-bold text-sm flex items-center gap-2">
                  לכתבה המלאה <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Video Section */}
      <section className="bg-surface-container-highest rounded-3xl p-12 border border-white/5">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black mb-2">הפודיום TV</h2>
            <p className="text-on-surface-variant">הסיפורים הכי גדולים בוידאו</p>
          </div>
          <button className="text-primary font-bold hover:underline">כל הסרטונים</button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 relative aspect-video rounded-2xl overflow-hidden group cursor-pointer">
            <img src="https://picsum.photos/seed/video-main/1200/800" alt="Video" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-all">
              <div className="w-20 h-20 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100 transition-transform">
                <Play className="w-8 h-8 fill-current" />
              </div>
            </div>
            <div className="absolute bottom-0 right-0 p-8">
              <h4 className="text-2xl font-bold text-white">רגע הזכייה: ארטיום דולגופיאט עושה היסטוריה</h4>
            </div>
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-4 group cursor-pointer">
                <div className="relative w-32 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={`https://picsum.photos/seed/video-${i}/400/300`} alt="Thumb" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <Play className="w-4 h-4 text-white fill-current" />
                  </div>
                </div>
                <div>
                  <h5 className="text-sm font-bold group-hover:text-primary transition-colors line-clamp-2">הכירו את התקווה החדשה של השחייה הישראלית</h5>
                  <span className="text-[10px] text-on-surface-variant">04:20 דקות</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
