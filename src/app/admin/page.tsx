'use client';

import { useState } from 'react';

export default function AdminPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleGallerySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const formData = new FormData(e.currentTarget);
    formData.append('action', 'upload-gallery');
    
    try {
      const res = await fetch('/api/admin', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) {
        setMessage('Gallery photo uploaded successfully!');
        (e.target as HTMLFormElement).reset();
      } else {
        setMessage('Error: ' + data.error);
      }
    } catch (err: any) {
      setMessage('Error: ' + err.message);
    }
    setLoading(false);
  };

  const handleActivitySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const formData = new FormData(e.currentTarget);
    formData.append('action', 'upload-activity');
    
    try {
      const res = await fetch('/api/admin', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) {
        setMessage('Activity uploaded successfully!');
        (e.target as HTMLFormElement).reset();
      } else {
        setMessage('Error: ' + data.error);
      }
    } catch (err: any) {
      setMessage('Error: ' + err.message);
    }
    setLoading(false);
  };

  const handleSongSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const formData = new FormData(e.currentTarget);
    formData.append('action', 'upload-song');
    
    try {
      const res = await fetch('/api/admin', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) {
        setMessage('Song added successfully!');
        (e.target as HTMLFormElement).reset();
      } else {
        setMessage('Error: ' + data.error);
      }
    } catch (err: any) {
      setMessage('Error: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-12 max-w-4xl mx-auto p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-heading font-black text-primary mb-2">Admin Dashboard</h1>
        <p className="text-lg opacity-80">Upload and manage content</p>
      </header>

      {message && (
        <div className="bg-accent/20 border-l-4 border-accent p-4 mb-4">
          <p className="font-bold text-accent">{message}</p>
        </div>
      )}

      {/* Gallery Form */}
      <section className="card-hand-drawn p-6 rotate-1">
        <h2 className="text-2xl font-heading font-bold text-primary mb-4 border-b-2 border-dashed border-primary/20 pb-2">Upload Gallery Photo</h2>
        <form onSubmit={handleGallerySubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-bold mb-1">Section</label>
            <select name="section" required className="w-full p-2 border-2 border-primary rounded-md bg-[var(--paper-bg)]">
              <option value="🙏 Household Prayer Meeting">🙏 Household Prayer Meeting</option>
              <option value="❤️ Fellowship">❤️ Fellowship</option>
              <option value="🎄 Christmas Party">🎄 Christmas Party</option>
              <option value="🎵 Worship Night">🎵 Worship Night</option>
              <option value="📖 Christian Life Program">📖 Christian Life Program</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Image File</label>
            <input type="file" name="file" accept="image/*" required className="w-full p-2 border-2 border-primary rounded-md bg-[var(--paper-bg)]" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Alt Text / Description (Optional)</label>
            <input type="text" name="alt" className="w-full p-2 border-2 border-primary rounded-md bg-[var(--paper-bg)]" placeholder="e.g. Group picture" />
          </div>
          <button type="submit" disabled={loading} className="btn-hand-drawn self-start mt-2">
            {loading ? 'Uploading...' : 'Upload Photo'}
          </button>
        </form>
      </section>

      {/* Activity Form */}
      <section className="card-hand-drawn p-6 -rotate-1">
        <h2 className="text-2xl font-heading font-bold text-primary mb-4 border-b-2 border-dashed border-primary/20 pb-2">Add New Activity</h2>
        <form onSubmit={handleActivitySubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-bold mb-1">Title</label>
            <input type="text" name="title" required className="w-full p-2 border-2 border-primary rounded-md bg-[var(--paper-bg)]" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Date</label>
            <input type="date" name="date" required className="w-full p-2 border-2 border-primary rounded-md bg-[var(--paper-bg)]" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Description</label>
            <textarea name="description" required rows={3} className="w-full p-2 border-2 border-primary rounded-md bg-[var(--paper-bg)]"></textarea>
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Main Image (Optional)</label>
            <input type="file" name="file" accept="image/*" className="w-full p-2 border-2 border-primary rounded-md bg-[var(--paper-bg)]" />
          </div>
          <button type="submit" disabled={loading} className="btn-hand-drawn self-start mt-2">
            {loading ? 'Saving...' : 'Save Activity'}
          </button>
        </form>
      </section>

      {/* Song Form */}
      <section className="card-hand-drawn p-6 rotate-1">
        <h2 className="text-2xl font-heading font-bold text-primary mb-4 border-b-2 border-dashed border-primary/20 pb-2">Add New Song</h2>
        <form onSubmit={handleSongSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1">Title</label>
              <input type="text" name="title" required className="w-full p-2 border-2 border-primary rounded-md bg-[var(--paper-bg)]" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Artist</label>
              <input type="text" name="artist" defaultValue="Liveloud" className="w-full p-2 border-2 border-primary rounded-md bg-[var(--paper-bg)]" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Key</label>
              <input type="text" name="key" placeholder="e.g. C, G, Dm" className="w-full p-2 border-2 border-primary rounded-md bg-[var(--paper-bg)]" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Tempo</label>
              <select name="tempo" className="w-full p-2 border-2 border-primary rounded-md bg-[var(--paper-bg)]">
                <option value="Slow">Slow</option>
                <option value="Medium">Medium</option>
                <option value="Fast">Fast</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Chords URL (Optional)</label>
            <input type="url" name="chordsUrl" className="w-full p-2 border-2 border-primary rounded-md bg-[var(--paper-bg)]" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Lyrics & Chords</label>
            <textarea name="content" required rows={8} className="w-full p-2 border-2 border-primary rounded-md bg-[var(--paper-bg)] font-mono text-sm" placeholder="[Intro]\nC G Am F\n..."></textarea>
          </div>
          <button type="submit" disabled={loading} className="btn-hand-drawn self-start mt-2">
            {loading ? 'Saving...' : 'Save Song'}
          </button>
        </form>
      </section>

    </div>
  );
}
