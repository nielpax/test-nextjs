'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import activitiesData from '@/data/activities.json';

type Activity = {
  id: string;
  title: string;
  date: string;
  type: string;
  description: string;
  image?: string;
  images?: string[];
  youtubeId?: string;
  youtubeIds?: string[];
};

function ActivityGallery({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="mt-4 rounded-[12px] overflow-hidden border-[3px] border-primary shadow-hand-drawn">
      {/* Main image */}
      <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
        <Image
          src={images[active]}
          alt={`Photo ${active + 1}`}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, 700px"
        />
      </div>
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 p-2 bg-[var(--paper-bg-warm)] overflow-x-auto">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative flex-shrink-0 w-20 h-14 rounded-md overflow-hidden border-2 transition-all ${
                active === i
                  ? 'border-accent scale-105 shadow-md'
                  : 'border-primary/30 opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={src}
                alt={`Thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ActivitiesPage() {
  const [tab, setTab] = useState<'future' | 'past'>('future');
  const [todayStr, setTodayStr] = useState<string>('');

  useEffect(() => {
    const today = new Date();
    const localDateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    setTodayStr(localDateStr);
  }, []);

  const filteredActivities = (activitiesData as Activity[])
    .filter(a => {
      if (!todayStr) return a.type === tab; // fallback to static type on server render
      if (tab === 'future') {
        return a.date >= todayStr;
      } else {
        return a.date < todayStr;
      }
    })
    .sort((a, b) => {
      if (tab === 'future') {
        return a.date.localeCompare(b.date);
      } else {
        return b.date.localeCompare(a.date);
      }
    });

  return (
    <div className="flex flex-col gap-16 max-w-4xl mx-auto">
      <header className="relative mt-8 py-12 md:py-16 px-4 md:px-8 text-center bg-[var(--paper-bg-warm)] border-[3px] border-primary shadow-hand-drawn -rotate-1 rounded-[255px_15px_225px_15px/15px_225px_15px_255px]">
        {/* Decorative Tape */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-8 bg-primary/10 backdrop-blur-sm rotate-2 z-10" />
        
        {/* Background Activities Decor */}
        <div className="absolute top-4 left-6 text-secondary/15 rotate-6 animate-float-note pointer-events-none">
          <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5z"/></svg>
        </div>
        <div className="absolute bottom-6 right-8 text-accent/15 -rotate-12 animate-float-note [animation-delay:2s] pointer-events-none">
          <svg className="w-28 h-28" fill="currentColor" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
        </div>
        <div className="absolute top-1/2 left-4 -translate-y-1/2 text-primary/5 -rotate-90 scale-150 pointer-events-none">
          <svg className="w-48 h-48" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black mb-4 text-primary relative z-10">Community Activities</h1>
        <p className="text-lg md:text-xl font-body opacity-80 relative z-10">Living our mission together through various events.</p>
      </header>

      <section className="w-full">
        {/* Hand-drawn tabs */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          <button 
            className={`btn-hand-drawn ${tab === 'future' ? 'bg-accent text-white shadow-none translate-x-[4px] translate-y-[4px]' : ''}`}
            onClick={() => setTab('future')}
          >
            Upcoming Events
          </button>
          <button 
            className={`btn-hand-drawn ${tab === 'past' ? 'bg-accent text-white shadow-none translate-x-[4px] translate-y-[4px]' : ''}`}
            onClick={() => setTab('past')}
          >
            Memories
          </button>
        </div>

        <div className="relative border-l-[3px] border-dashed border-primary/30 pl-8 md:pl-16 space-y-12 ml-4 md:ml-0">
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity, idx) => (
              <div key={activity.id} className="relative">
                {/* Timeline node */}
                <div className="absolute -left-11 md:-left-19 top-6 w-6 h-6 bg-[var(--paper-bg)] border-[3px] border-primary rounded-full shadow-[2px_2px_0px_0px_var(--primary)]" />
                
                <span className="font-heading text-xl text-accent font-bold mb-2 inline-block bg-[var(--paper-bg)] px-3 py-1 border-2 border-primary border-dashed rounded-[255px_15px_225px_15px/15px_225px_15px_255px] -rotate-2" suppressHydrationWarning>
                  {new Date(activity.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
                
                <div className={`card-hand-drawn mt-4 ${idx % 2 === 0 ? 'rotate-1' : '-rotate-1'} p-4 md:p-6`}>
                  <h3 className="text-2xl md:text-3xl font-heading font-bold mb-2 md:mb-3">{activity.title}</h3>
                  <p className="font-body text-base md:text-lg opacity-80 mb-4">{activity.description}</p>

                  {/* Photo gallery, single image, or YouTube videos */}
                  {activity.images && activity.images.length > 1 ? (
                    <ActivityGallery images={activity.images} />
                  ) : activity.image ? (
                    <div className="relative w-full rounded-[12px] overflow-hidden border-[3px] border-primary shadow-hand-drawn mt-4" style={{ aspectRatio: '16/9' }}>
                      <Image
                        src={activity.image}
                        alt={activity.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 700px"
                      />
                    </div>
                  ) : activity.youtubeIds && activity.youtubeIds.length > 0 ? (
                    <div className="flex flex-col gap-4 mt-4">
                      {activity.youtubeIds.map(id => (
                        <div key={id} className="relative w-full rounded-[12px] overflow-hidden border-[3px] border-primary shadow-hand-drawn" style={{ paddingBottom: '56.25%' }}>
                          <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src={`https://www.youtube.com/embed/${id}`}
                            title={`${activity.title} - Video`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      ))}
                    </div>
                  ) : activity.youtubeId ? (
                    <div className="relative w-full rounded-[12px] overflow-hidden border-[3px] border-primary shadow-hand-drawn mt-4" style={{ paddingBottom: '56.25%' }}>
                      <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${activity.youtubeId}`}
                        title={activity.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-12 card-hand-drawn rotate-1 max-w-xl mx-auto">
              <p className="font-heading text-2xl opacity-60">No activities found in this category.</p>
              <svg className="w-16 h-16 mx-auto mt-4 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
