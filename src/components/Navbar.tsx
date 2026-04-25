'use client';

import Link from 'next/link';
import { useTheme } from './ThemeProvider';
import { useState } from 'react';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-secondary border-b-[4px] border-primary border-dashed shadow-lg">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between max-w-5xl">
        <Link href="/" className="group text-3xl font-heading font-bold text-white flex items-center gap-4">
          <div className="relative p-1 bg-white rounded-lg border-2 border-primary shadow-hand-drawn rotate-[-3deg] group-hover:rotate-0 transition-transform duration-200">
            <img 
              src="https://couplesforchristusa.org/wp-content/uploads/2020/07/cropped-CFC_Logo-1-1.png" 
              alt="CFC Logo" 
              className="w-12 h-12 object-contain"
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:gap-2 leading-none">
            <span className="group-hover:text-accent transition-colors">TeamKJ</span> 
            <span className="text-white/80 underline decoration-accent decoration-wavy decoration-2 group-hover:no-underline">Official</span>
          </div>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="font-body text-xl text-white hover:text-accent hover:scale-110 transition-all">Home</Link>
          <Link href="/songs" className="font-body text-xl text-white hover:text-accent hover:scale-110 transition-all">Worship Songs</Link>
          <Link href="/gallery" className="font-body text-xl text-white hover:text-accent hover:scale-110 transition-all">Gallery</Link>
          <Link href="/activities" className="font-body text-xl text-white hover:text-accent hover:scale-110 transition-all">Activities</Link>
          
          <button onClick={toggleTheme} className="ml-4 p-2 border-[3px] border-white rounded-full hover:bg-white/10 transition-colors hover:rotate-12 text-white" aria-label="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden p-2 border-2 border-white rounded-lg shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] active:shadow-none active:translate-y-1 transition-all text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className="sr-only">Open menu</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path></svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-secondary border-b-[3px] border-white border-dashed py-4 px-6 flex flex-col gap-4 shadow-hand-drawn">
          <Link href="/" onClick={() => setIsMenuOpen(false)} className="font-body text-xl text-white hover:text-accent">Home</Link>
          <Link href="/songs" onClick={() => setIsMenuOpen(false)} className="font-body text-xl text-white hover:text-accent">Worship Songs</Link>
          <Link href="/gallery" onClick={() => setIsMenuOpen(false)} className="font-body text-xl text-white hover:text-accent">Gallery</Link>
          <Link href="/activities" onClick={() => setIsMenuOpen(false)} className="font-body text-xl text-white hover:text-accent">Activities</Link>
          <button onClick={toggleTheme} className="self-start mt-2 p-2 border-2 border-white rounded-full hover:bg-white/10 flex gap-2 items-center text-white transition-colors">
             {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
        </div>
      )}
    </nav>
  );
}
