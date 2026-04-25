'use client';

import { useState, useTransition, useEffect } from 'react';
import Link from 'next/link';
import songsData from '@/data/songs.json';
import { addSongAction } from './actions';

export default function SongsPage() {
  const [search, setSearch] = useState('');
  const [isPending, startTransition] = useTransition();
  const [localSongs, setLocalSongs] = useState(songsData);

  const sortedSongs = [...localSongs].sort((a, b) => a.title.localeCompare(b.title));

  const filteredSongs = sortedSongs.filter(song => 
    song.title.toLowerCase().includes(search.toLowerCase()) ||
    song.artist.toLowerCase().includes(search.toLowerCase())
  );

  // Group songs by first letter
  const groupedSongs = filteredSongs.reduce((groups, song) => {
    const letter = song.title[0].toUpperCase();
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(song);
    return groups;
  }, {} as Record<string, typeof songsData>);

  const letters = Object.keys(groupedSongs).sort();

  // Removed mounted check to restore Server-Side Rendering

  return (
    <div className="flex flex-col gap-12">
      <header className="relative mt-8 py-12 md:py-16 px-4 md:px-8 text-center bg-[var(--paper-bg)] border-[3px] border-primary shadow-hand-drawn -rotate-1 rounded-[255px_15px_225px_15px/15px_225px_15px_255px] mx-auto w-full max-w-4xl">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-secondary border-[3px] border-primary shadow-[2px_2px_0px_0px_#2d2d2d] z-10" />
        
        {/* Background Music Decor */}
        <div className="absolute top-4 left-4 text-secondary/10 -rotate-12 animate-float-note pointer-events-none">
          <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
        </div>
        <div className="absolute bottom-8 right-10 text-accent/10 rotate-12 animate-float-note [animation-delay:1s] pointer-events-none">
          <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-5.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"/></svg>
        </div>
        <div className="absolute top-1/2 -right-8 -translate-y-1/2 text-primary/5 rotate-90 scale-150 pointer-events-none">
          <svg className="w-48 h-48" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24"><path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/></svg>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 text-primary relative z-10">Worship Songs</h1>
        <p className="text-lg md:text-xl font-body opacity-80 mb-6 md:mb-8 relative z-10">Lyrics and chords for our community worship.</p>
        
        <div className="max-w-2xl mx-auto relative z-10">
          <input 
            type="text" 
            placeholder="Search by title or artist (e.g. Liveloud)..." 
            className="input-hand-drawn text-base md:text-lg lg:text-xl shadow-[4px_4px_0px_0px_#2d2d2d] focus:shadow-[2px_2px_0px_0px_#2d2d2d] focus:translate-y-[2px] focus:translate-x-[2px]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      <section className="w-full">
        {letters.length > 0 ? (
          letters.map(letter => (
            <div key={letter} className="mb-16 relative">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-black text-secondary/20 -mb-4 md:-mb-6 sticky top-20 md:top-24 z-0 pointer-events-none">{letter}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                {groupedSongs[letter].map((song, idx) => (
                  <Link href={`/songs/${song.id}`} key={song.id} className={`card-hand-drawn flex justify-between items-center group ${idx % 2 === 0 ? 'rotate-1' : '-rotate-1'} hover:rotate-0 hover:z-20`}>
                    <div className="flex-1 min-w-0 pr-4">
                      <h3 className="font-heading text-2xl font-bold mb-1 truncate group-hover:text-accent transition-colors">{song.title}</h3>
                      <p className="font-body text-lg opacity-70 uppercase tracking-wide truncate">{song.artist}</p>
                    </div>
                    <div className="w-12 h-12 bg-muted border-[3px] border-primary rounded-full flex items-center justify-center font-heading font-bold text-xl flex-shrink-0 group-hover:bg-accent group-hover:text-white transition-colors rotate-6 group-hover:-rotate-12">
                      {song.key}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-12 bg-muted/50 border-4 border-dashed border-primary rounded-[255px_15px_225px_15px/15px_225px_15px_255px] max-w-2xl mx-auto mt-8">
            <p className="font-heading text-3xl mb-6">"{search}" is not in the library yet.</p>
            <button 
              className="btn-hand-drawn" 
              disabled={isPending}
              onClick={() => {
                startTransition(async () => {
                  const newSong = {
                    id: search.toLowerCase().replace(/\s+/g, '-'),
                    title: search,
                    artist: 'Unknown',
                    key: 'C',
                    tempo: 'Medium',
                    content: '[Verse 1]\nAdd lyrics and chords here for ' + search,
                    chordsUrl: ''
                  };
                  await addSongAction(newSong);
                  setLocalSongs([...localSongs, newSong]);
                  setSearch('');
                });
              }}
            >
              {isPending ? 'Scribbling it down...' : `Add "${search}" to Library`}
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

