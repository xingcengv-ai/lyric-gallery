import type { UploadedLyric } from "@/types/lyric";

const storageKey = "lyric-gallery:uploads";

function isUploadedLyric(value: unknown): value is UploadedLyric {
  if (typeof value !== "object" || value === null) return false;

  const lyric = value as Partial<UploadedLyric>;
  return (
    lyric.isLocal === true &&
    typeof lyric.id === "string" &&
    typeof lyric.title === "string" &&
    typeof lyric.artist === "string" &&
    typeof lyric.cover === "string" &&
    typeof lyric.description === "string" &&
    typeof lyric.year === "number" &&
    Array.isArray(lyric.tags) &&
    lyric.tags.every((tag) => typeof tag === "string")
  );
}

export function getLocalUploads(): UploadedLyric[] {
  const raw = window.localStorage.getItem(storageKey);
  if (!raw) return [];

  try {
    const value: unknown = JSON.parse(raw);
    return Array.isArray(value) ? value.filter(isUploadedLyric) : [];
  } catch {
    return [];
  }
}

export function saveLocalUpload(lyric: UploadedLyric): void {
  const uploads = getLocalUploads();
  window.localStorage.setItem(storageKey, JSON.stringify([lyric, ...uploads]));
}
