import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const action = formData.get('action');

    // Handle 'upload-gallery'
    if (action === 'upload-gallery') {
      const file = formData.get('file') as File;
      const section = formData.get('section') as string;
      const alt = formData.get('alt') as string;
      
      if (!file || !section) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = file.name;
      const filepath = path.join(process.cwd(), 'public', 'images', filename);
      await fs.writeFile(filepath, buffer);

      // update gallery.json
      const galleryPath = path.join(process.cwd(), 'src', 'data', 'gallery.json');
      const galleryData = JSON.parse(await fs.readFile(galleryPath, 'utf8'));
      
      const group = galleryData.photoGroups.find((g: any) => g.label === section);
      if (group) {
        const newId = Math.max(...group.photos.map((p: any) => p.id), 0) + 1;
        group.photos.push({
          id: newId,
          src: `/images/${filename}`,
          alt: alt || filename
        });
        await fs.writeFile(galleryPath, JSON.stringify(galleryData, null, 2));
      }
      return NextResponse.json({ success: true });
    }

    // Handle 'upload-activity'
    if (action === 'upload-activity') {
      const file = formData.get('file') as File;
      const title = formData.get('title') as string;
      const date = formData.get('date') as string;
      const description = formData.get('description') as string;

      if (!title || !date) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

      let imageUrl = null;
      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = file.name;
        const filepath = path.join(process.cwd(), 'public', 'images', filename);
        await fs.writeFile(filepath, buffer);
        imageUrl = `/images/${filename}`;
      }

      // update activities.json
      const activitiesPath = path.join(process.cwd(), 'src', 'data', 'activities.json');
      const activitiesData = JSON.parse(await fs.readFile(activitiesPath, 'utf8'));
      const newId = Math.max(...activitiesData.map((a: any) => parseInt(a.id || "0")), 0) + 1;

      activitiesData.push({
        id: String(newId),
        title,
        date,
        type: new Date(date) >= new Date() ? 'future' : 'past',
        description,
        ...(imageUrl ? { image: imageUrl } : {})
      });

      await fs.writeFile(activitiesPath, JSON.stringify(activitiesData, null, 2));
      return NextResponse.json({ success: true });
    }

    // Handle 'upload-song'
    if (action === 'upload-song') {
      const title = formData.get('title') as string;
      const artist = formData.get('artist') as string;
      const key = formData.get('key') as string;
      const tempo = formData.get('tempo') as string;
      const content = formData.get('content') as string;
      const chordsUrl = formData.get('chordsUrl') as string;

      if (!title || !content) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

      // update songs.json
      const songsPath = path.join(process.cwd(), 'src', 'data', 'songs.json');
      const songsData = JSON.parse(await fs.readFile(songsPath, 'utf8'));
      
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      songsData.push({
        id,
        title,
        artist: artist || 'Liveloud',
        key: key || 'C',
        tempo: tempo || 'Medium',
        content,
        chordsUrl: chordsUrl || ''
      });

      // Sort alphabetically by title
      songsData.sort((a: any, b: any) => a.title.localeCompare(b.title));

      await fs.writeFile(songsPath, JSON.stringify(songsData, null, 2));
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
