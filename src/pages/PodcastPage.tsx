/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Headphones, Play, ExternalLink } from 'lucide-react';
import { PodcastEpisode } from '../types';

interface PodcastPageProps {
  episodes: PodcastEpisode[];
}

export const PodcastPage: React.FC<PodcastPageProps> = ({ episodes }) => {
  return (
    <div className="lg:col-span-9 space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black mb-2 flex items-center gap-4">
            <Headphones className="w-10 h-10 text-primary" />
            פודקאסט הלפיד
          </h1>
          <p className="text-on-surface-variant">כל הפרקים של הפודקאסט שמאיר את הדרך לספורטאים שלנו</p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {episodes.length > 0 ? (
          episodes.map((episode, idx) => (
            <motion.div
              key={episode.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-surface-container p-8 rounded-3xl border border-white/5 hover:border-primary/30 transition-all group flex flex-col md:flex-row gap-8 items-center"
            >
              <div className="w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <Play className="w-10 h-10 fill-current" />
              </div>
              
              <div className="flex-1 space-y-3 text-center md:text-right">
                <div className="text-xs font-black text-primary uppercase tracking-widest">{episode.date}</div>
                <h3 className="text-2xl font-black group-hover:text-primary transition-colors">{episode.title}</h3>
                <p className="text-on-surface-variant leading-relaxed">{episode.excerpt}</p>
              </div>

              <div className="flex-shrink-0">
                <a 
                  href={episode.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-surface-container-highest text-on-surface px-8 py-4 rounded-2xl font-black hover:bg-primary hover:text-on-primary transition-all"
                >
                  האזנה לפרק <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-20 bg-surface-container rounded-3xl border border-dashed border-outline-variant/30">
            <Headphones className="w-16 h-16 text-on-surface-variant/20 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-on-surface-variant">עדיין אין פרקים בפודקאסט</h3>
            <p className="text-on-surface-variant mt-2">הישארו מעודכנים, פרקים חדשים בקרוב!</p>
          </div>
        )}
      </div>
    </div>
  );
};
