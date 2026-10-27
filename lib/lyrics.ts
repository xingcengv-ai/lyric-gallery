import lyricsData from "@/data/lyrics.json";
import type { Lyric } from "@/types/lyric";

const lyrics: Lyric[] = lyricsData;

export function getLyrics(): Lyric[] {
  return lyrics;
}
export function getLyricById(id: string): Lyric | undefined {
  return lyrics.find((lyric) => lyric.id === id);
}
export function searchLyrics(keyword: string): Lyric[] {
  const query = keyword.trim().toLocaleLowerCase();
  if (!query) return lyrics;
  return lyrics.filter((lyric) =>
    [lyric.title, lyric.artist, lyric.description, ...lyric.tags].some(
      (value) => value.toLocaleLowerCase().includes(query),
    ),
  );
}
