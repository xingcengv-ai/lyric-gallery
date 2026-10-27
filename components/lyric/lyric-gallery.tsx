"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ImagePlus, Search, X } from "lucide-react";
import { LyricCard } from "@/components/lyric/lyric-card";
import { LyricPreviewModal } from "@/components/lyric/lyric-preview-modal";
import { getLocalUploads } from "@/lib/local-uploads";
import type { Lyric, UploadedLyric } from "@/types/lyric";

export function LyricGallery({
  lyrics,
}: {
  lyrics: Lyric[];
}): React.ReactElement {
  const [keyword, setKeyword] = useState("");
  const [uploads, setUploads] = useState<UploadedLyric[]>([]);
  const [selectedUpload, setSelectedUpload] = useState<UploadedLyric | null>(
    null,
  );
  useEffect(() => setUploads(getLocalUploads()), []);
  const allLyrics = useMemo(() => [...uploads, ...lyrics], [lyrics, uploads]);
  const results = useMemo(() => {
    const q = keyword.trim().toLocaleLowerCase();
    return q
      ? allLyrics.filter((lyric) =>
          [lyric.title, lyric.artist].some((value) =>
            value.toLocaleLowerCase().includes(q),
          ),
        )
      : allLyrics;
  }, [allLyrics, keyword]);
  return (
    <section id="gallery" className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-violet-300">精选作品</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            把一句歌词，留在此刻
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm text-zinc-500">{results.length} 幅视觉作品</p>
          <Link
            href="/upload"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-300 transition hover:text-violet-200"
          >
            <ImagePlus className="size-4" />
            上传作品
          </Link>
        </div>
      </div>
      <div className="relative mb-8 max-w-xl">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-zinc-500" />
        <input
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="搜索歌曲或歌手"
          aria-label="搜索歌曲或歌手"
          className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-10 text-base outline-none transition placeholder:text-zinc-600 focus:border-violet-400/50 focus:bg-white/[0.07] sm:text-sm"
        />
        {keyword && (
          <button
            onClick={() => setKeyword("")}
            aria-label="清空搜索"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-zinc-400 hover:bg-white/10 hover:text-white"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
      {results.length ? (
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {results.map((lyric, index) => (
            <LyricCard
              key={lyric.id}
              lyric={lyric}
              index={index}
              onLocalClick={setSelectedUpload}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-white/15 py-20 text-center text-zinc-500">
          没有找到匹配的作品。
        </div>
      )}
      <LyricPreviewModal
        lyric={selectedUpload}
        onClose={() => setSelectedUpload(null)}
      />
    </section>
  );
}
