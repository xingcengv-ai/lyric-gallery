"use client";
/* eslint-disable @next/next/no-img-element -- Preview renders a browser-local data URL. */

import { useEffect } from "react";
import { Download, X } from "lucide-react";
import type { UploadedLyric } from "@/types/lyric";

function downloadName(lyric: UploadedLyric): string {
  const extension = lyric.cover.startsWith("data:image/jpeg")
    ? "jpg"
    : lyric.cover.startsWith("data:image/webp")
      ? "webp"
      : "png";
  return `${lyric.title}-${lyric.artist}.${extension}`.replaceAll("/", "-");
}

export function LyricPreviewModal({
  lyric,
  onClose,
}: {
  lyric: UploadedLyric | null;
  onClose: () => void;
}): React.ReactElement | null {
  useEffect(() => {
    if (!lyric) return;
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lyric, onClose]);

  if (!lyric) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${lyric.title} 图片预览`}
      className="fixed inset-0 z-50 grid place-items-center bg-black/75 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-5xl overflow-auto rounded-3xl border border-white/15 bg-zinc-950 p-3 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="关闭预览"
          className="absolute right-5 top-5 z-10 grid size-10 place-items-center rounded-full bg-black/60 text-white transition hover:bg-black"
        >
          <X className="size-5" />
        </button>
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_250px]">
          <img
            src={lyric.cover}
            alt={`${lyric.title} · ${lyric.artist} 歌词海报`}
            className="max-h-[75vh] w-full rounded-2xl bg-black object-contain"
          />
          <div className="flex flex-col px-2 pb-3 lg:py-6">
            <p className="text-sm text-violet-300">本地保存的作品</p>
            <h2 className="mt-2 text-2xl font-bold">{lyric.title}</h2>
            <p className="mt-1 text-zinc-400">{lyric.artist}</p>
            <p className="mt-6 text-sm leading-6 text-zinc-400">
              {lyric.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {lyric.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-zinc-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <a
              href={lyric.cover}
              download={downloadName(lyric)}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
            >
              <Download className="size-4" />
              下载图片
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
