export default function GalleryPage() {

  const photoGroups = [
    {
      label: '🙏 Household Prayer Meeting',
      rotation: 'rotate-1',
      photos: [
        { id: 1, src: '/images/Household Prayer Meeting.jpg', alt: 'Household Prayer Meeting' },
      ],
    },
    {
      label: '❤️ Fellowship',
      rotation: '-rotate-1',
      photos: [
        { id: 2,  src: '/images/Fellowship.jpeg',      alt: 'Fellowship' },
        { id: 3,  src: '/images/fellowship (1).jpg',   alt: 'Fellowship' },
        { id: 4,  src: '/images/fellowship (2).jpg',   alt: 'Fellowship' },
        { id: 5,  src: '/images/fellowship (3).jpg',   alt: 'Fellowship' },
        { id: 6,  src: '/images/fellowship (4).jpg',   alt: 'Fellowship' },
        { id: 7,  src: '/images/fellowship (5).jpg',   alt: 'Fellowship' },
        { id: 8,  src: '/images/fellowship (6).jpg',   alt: 'Fellowship' },
        { id: 9,  src: '/images/fellowship (7).jpg',   alt: 'Fellowship' },
        { id: 10, src: '/images/fellowship (8).jpg',   alt: 'Fellowship' },
        { id: 11, src: '/images/fellowship (9).jpg',   alt: 'Fellowship' },
      ],
    },
    {
      label: '🎄 Christmas Party',
      rotation: 'rotate-1',
      photos: [
        { id: 12, src: '/images/Christmas Party.jpeg', alt: 'Christmas Party' },
      ],
    },
    {
      label: '🎵 Worship Night',
      rotation: '-rotate-1',
      photos: [
        { id: 13, src: '/images/Worship Night.jpeg', alt: 'Worship Night' },
      ],
    },
    {
      label: '📖 Christian Life Program',
      rotation: 'rotate-1',
      photos: [
        { id: 14, src: '/images/Christian Life Program (1).jpg', alt: 'CLP Session' },
        { id: 15, src: '/images/Christian Life Program (2).jpg', alt: 'CLP Fellowship' },
        { id: 16, src: '/images/Christian Life Program (3).jpg', alt: 'CLP Talk' },
        { id: 17, src: '/images/Christian Life Program (4).jpg', alt: 'CLP Activity' },
        { id: 18, src: '/images/Christian Life Program (5).jpg', alt: 'CLP Group' },
        { id: 19, src: '/images/Christian Life Program (6).jpg', alt: 'CLP Prayer' },
        { id: 20, src: '/images/Christian Life Program (7).jpg', alt: 'CLP Graduation' },
      ],
    },
  ];

  const videoGroups = [
    {
      label: '🎄 Christmas Party Videos',
      rotation: 'rotate-1',
      videos: [
        { id: 'christmas-1', src: '/images/Christmas Party (1).mp4', title: 'Christmas Party Highlights 1' },
        { id: 'christmas-2', src: '/images/Christmas Party (2).mp4', title: 'Christmas Party Highlights 2' },
      ],
    },
    {
      label: '🎸 Practice Session',
      rotation: '-rotate-1',
      youtubeIds: ['Cy8VCsDtjMc', 'm69AzxM9VLw'],
    },
    {
      label: '🎵 Worship Session',
      rotation: 'rotate-1',
      youtubeIds: ['3kYe61IUn7s', 'nA8SCP8v1ZA', 'MP-ZVmy6pAU'],
    },
  ];

  return (
    <div className="flex flex-col gap-16">
      <header className="relative mt-8 py-12 md:py-16 px-4 md:px-8 text-center bg-[var(--paper-bg)] border-[3px] border-primary shadow-hand-drawn rotate-1 rounded-[255px_15px_225px_15px/15px_225px_15px_255px] mx-auto w-full max-w-4xl">
        <div className="absolute -top-4 right-10 w-8 h-8 rounded-full bg-accent border-[3px] border-primary shadow-[2px_2px_0px_0px_#2d2d2d] z-10" />
        
        {/* Background Gallery Decor */}
        <div className="absolute top-4 right-4 text-accent/10 rotate-12 animate-float-note pointer-events-none">
          <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M9 3L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-3.17L15 3H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
        </div>
        <div className="absolute bottom-6 left-8 text-secondary/10 -rotate-12 animate-float-note [animation-delay:1.5s] pointer-events-none">
          <svg className="w-28 h-28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary/5 scale-150 pointer-events-none">
          <svg className="w-64 h-64" fill="none" stroke="currentColor" strokeWidth="0.5" viewBox="0 0 24 24"><path d="M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm0 14h14M12 7v10M7 12h10"/></svg>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black mb-4 text-primary relative z-10">Community Gallery</h1>
        <p className="text-lg md:text-xl font-body opacity-80 relative z-10">Capturing our moments of faith and fellowship.</p>
      </header>

      <section className="flex flex-col gap-16 w-full">

        {/* Photo Groups */}
        {photoGroups.map((group) => (
          <div key={group.label} className={`relative card-hand-drawn ${group.rotation} max-w-6xl mx-auto p-6 md:p-10 w-full`}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-7 bg-primary/10 backdrop-blur-sm rotate-1 z-10" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading text-primary border-b-4 border-dashed border-primary/20 pb-4 inline-block mb-6 md:mb-8">
              {group.label}
            </h2>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {group.photos.map((img, idx) => (
                <div
                  key={img.id}
                  className={`relative break-inside-avoid ${idx % 3 === 0 ? 'rotate-2' : idx % 2 === 0 ? '-rotate-1' : 'rotate-1'} hover:rotate-0 transition-transform duration-300 z-10 hover:z-20`}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-6 bg-primary/10 backdrop-blur-sm rotate-3 z-10" />
                  <div className="card-hand-drawn p-3">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-auto border-2 border-primary rounded-[255px_15px_225px_15px/15px_225px_15px_255px] filter grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Video Groups */}
        {videoGroups.map((group) => (
          <div key={group.label} className={`relative card-hand-drawn ${group.rotation} max-w-6xl mx-auto p-6 md:p-10 w-full`}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-7 bg-primary/10 backdrop-blur-sm rotate-1 z-10" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading text-primary border-b-4 border-dashed border-primary/20 pb-4 inline-block mb-6 md:mb-8">
              {group.label}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Local MP4 videos */}
              {group.videos?.map((video, idx) => (
                <div key={video.id} className={`relative ${idx % 2 === 0 ? 'rotate-1' : '-rotate-1'} hover:rotate-0 transition-transform duration-300`}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-6 bg-primary/10 backdrop-blur-sm z-10" />
                  <div className="card-hand-drawn p-3">
                    <div className="aspect-w-16 aspect-h-9">
                      <video
                        controls
                        preload="metadata"
                        className="w-full h-full rounded-[15px_225px_15px_255px/225px_15px_255px_15px] border-2 border-primary"
                      >
                        <source src={video.src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                </div>
              ))}
              {/* YouTube embeds */}
              {group.youtubeIds?.map((id, idx) => (
                <div key={id} className={`relative ${idx % 2 === 0 ? 'rotate-1' : '-rotate-1'} hover:rotate-0 transition-transform duration-300`}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-6 bg-primary/10 backdrop-blur-sm z-10" />
                  <div className="card-hand-drawn p-3">
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                      <iframe
                        className="absolute top-0 left-0 w-full h-full rounded-[15px_225px_15px_255px/225px_15px_255px_15px] border-2 border-primary"
                        src={`https://www.youtube.com/embed/${id}`}
                        title={`${group.label} ${idx + 1}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

      </section>
    </div>
  );
}
