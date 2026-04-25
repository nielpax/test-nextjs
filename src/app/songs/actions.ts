'use server';

import fs from 'fs/promises';
import path from 'path';

export async function addSongAction(newSong: any) {
  const filePath = path.join(process.cwd(), 'src', 'data', 'songs.json');
  
  try {
    const fileData = await fs.readFile(filePath, 'utf-8');
    const songs = JSON.parse(fileData);
    
    // Avoid duplicates
    if (songs.some((s: any) => s.id === newSong.id)) {
      return { success: false, error: 'Song already exists' };
    }
    
    songs.push(newSong);
    await fs.writeFile(filePath, JSON.stringify(songs, null, 2));
    
    return { success: true };
  } catch (error) {
    console.error('Failed to add song:', error);
    return { success: false, error: 'Failed to update library' };
  }
}
