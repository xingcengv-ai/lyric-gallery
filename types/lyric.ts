export interface Lyric {
  id: string;
  title: string;
  artist: string;
  cover: string;
  description: string;
  tags: string[];
  year: number;
}

export interface UploadedLyric extends Lyric {
  isLocal: true;
}
