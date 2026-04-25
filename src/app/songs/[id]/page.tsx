import Link from 'next/link';
import { notFound } from 'next/navigation';
import songsData from '@/data/songs.json';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function SongDetailPage({ params }: Props) {
  const { id } = await params;
  const song = songsData.find(s => s.id === id);

  if (!song) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 pt-4">
      <Link href="/songs" className="btn-hand-drawn self-start flex items-center gap-2 group">
        <span className="group-hover:-translate-x-1 transition-transform">←</span> 
        <span>Back to Songs</span>
      </Link>

      <header className="relative p-6 md:p-10 bg-[var(--paper-bg-warm)] border-[3px] border-primary shadow-hand-drawn rotate-1 rounded-[255px_15px_225px_15px/15px_225px_15px_255px]">
        {/* Decorative Tape */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-8 bg-primary/10 backdrop-blur-sm -rotate-2" />

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black mb-4 md:mb-6 text-primary">{song.title}</h1>
        <div className="flex flex-col md:flex-row flex-wrap gap-3 md:gap-6 font-body text-lg md:text-xl opacity-90">
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            Artist: <strong>{song.artist}</strong>
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
            Original Key: <strong>{song.key}</strong>
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Tempo: <strong>{song.tempo}</strong>
          </span>
        </div>
      </header>


      <div className="card-hand-drawn -rotate-1 mt-4 p-4 md:p-8 lg:p-12">
        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 md:mb-6 text-secondary border-b-4 border-dashed border-primary/20 pb-4 inline-block">Lyrics &amp; Chords</h2>
        <div className="overflow-x-auto">
          <pre className="whitespace-pre font-mono text-sm md:text-base lg:text-lg leading-relaxed text-primary bg-[var(--paper-bg)] p-4 md:p-8 rounded-[255px_15px_225px_15px/15px_225px_15px_255px] border-2 border-primary/20 min-w-fit">
            {song.content}
          </pre>
        </div>
        <p className="mt-8 font-body text-lg opacity-60 flex items-center gap-2">
          <span className="text-accent text-2xl">*</span> Chords are placed above the lyrics for easy reference during worship.
        </p>
        <div className="flex justify-center mt-4">
        <Link href="/songs" className="btn-hand-drawn flex items-center gap-2 group">
          <span className="group-hover:-translate-x-1 transition-transform">←</span> 
          <span>Back to Songs</span>
        </Link>
      </div>
    </div>
    </div>
  );
}
