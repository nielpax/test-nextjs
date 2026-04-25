import Link from 'next/link';
import activities from '@/data/activities.json';

export default function Home() {
  const futureActivities = activities.filter(a => a.type === 'future');

  return (
    <div className="flex flex-col gap-20">
      <section className="relative mt-8 md:mt-12 py-12 md:py-20 px-4 md:px-8 text-center bg-[var(--paper-bg-warm)] border-[3px] border-primary shadow-hand-drawn rotate-1 rounded-[255px_15px_225px_15px/15px_225px_15px_255px] mx-auto max-w-4xl">
        {/* Decorative Tack */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-accent border-[3px] border-primary shadow-[2px_2px_0px_0px_#2d2d2d] z-10" />
        
        {/* Background Home Decor */}
        <div className="absolute top-8 left-8 text-accent/15 -rotate-12 animate-float-note pointer-events-none">
          <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </div>
        <div className="absolute bottom-8 left-12 text-secondary/15 rotate-12 animate-float-note [animation-delay:1.5s] pointer-events-none">
          <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
        </div>
        <div className="absolute top-1/2 right-4 -translate-y-1/2 text-primary/5 rotate-3 animate-float-note pointer-events-none scale-150">
          <svg className="w-48 h-48" fill="none" stroke="currentColor" strokeWidth="0.5" viewBox="0 0 24 24"><path d="M12 2v20M5 12h14"/></svg>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-4 md:mb-6 text-primary leading-tight relative z-10">
          One Voice, <br/> One Faith, <br/>
          <span className="text-accent underline decoration-wavy decoration-[3px] md:decoration-[4px]">One Family!</span>
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl font-body mb-8 md:mb-10 max-w-2xl mx-auto opacity-90 relative z-10">
          Official Music Ministry of TeamKJ - Couples for Christ Community
        </p>
        <div className="relative z-10">
          <Link href="/songs" className="btn-hand-drawn text-xl md:text-2xl">
            View Worship Songs &rarr;
          </Link>
        </div>

        {/* Decorative sketches */}
        <svg className="absolute bottom-4 right-4 w-12 h-12 text-primary opacity-50 -rotate-12 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>
      </section>

      <section className="w-full mt-10 md:mt-0">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-center mb-8 md:mb-12 relative inline-block left-1/2 -translate-x-1/2">
          Upcoming Activities
          <svg className="absolute -bottom-2 md:-bottom-4 left-0 w-full h-3 md:h-4 text-accent" viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0,10 Q50,20 100,10" stroke="currentColor" strokeWidth="4" fill="none"/></svg>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {futureActivities.length > 0 ? (
            futureActivities.map((activity, idx) => (
              <div key={activity.id} className={`card-hand-drawn ${idx % 2 === 0 ? 'rotate-1' : '-rotate-2'} flex flex-col`}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-6 bg-primary/20 backdrop-blur-sm -rotate-2" /> {/* Tape */}
                <div className="h-48 w-full border-[3px] border-primary mb-4 rounded-[255px_15px_225px_15px/15px_225px_15px_255px] overflow-hidden transform-gpu">
                  <img src={activity.image} alt={activity.title} className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
                <div className="flex-1 flex flex-col">
                  <span className="font-heading text-accent text-xl mb-1" suppressHydrationWarning>{new Date(activity.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <h3 className="font-heading text-2xl font-bold mb-2 leading-tight">{activity.title}</h3>
                  <p className="font-body text-lg opacity-80 flex-1">{activity.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center font-body text-xl opacity-60">No upcoming activities at the moment. Stay tuned!</p>
          )}
        </div>
        
        <div className="text-center mt-16">
          <Link href="/activities" className="inline-block px-6 py-3 border-[3px] border-primary border-dashed font-body text-xl text-primary hover:bg-muted transition-colors rounded-[255px_15px_225px_15px/15px_225px_15px_255px] hover:rotate-2">
            View All Activities
          </Link>
        </div>
      </section>
    </div>
  );
}
