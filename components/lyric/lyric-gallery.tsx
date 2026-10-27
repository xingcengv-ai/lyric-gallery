"use client";
import { useEffect, useMemo, useRef, useState } from "react";
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
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const mobileSearchRef = useRef<HTMLInputElement>(null);
  useEffect(() => setUploads(getLocalUploads()), []);
  useEffect(() => {
    if (!isMobileSearchOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => mobileSearchRef.current?.focus());
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMobileSearchOpen]);
  const allLyrics = useMemo(() => [...uploads, ...lyrics], [lyrics, uploads]);
  const results = useMemo(() => {
    const q = keyword.trim().toLocaleLowerCase();
    return q
      ? allLyrics.filter((lyric) =>
          [lyric.title, lyric.artist, ...lyric.tags].some((value) =>
            value.toLocaleLowerCase().includes(q),
          ),
        )
      : allLyrics;
  }, [allLyrics, keyword]);
  const mobileSuggestions = results.slice(0, 4);
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
      <div className="relative mb-8 max-w-xl sm:hidden">
        <button
          type="button"
          onClick={() => setIsMobileSearchOpen(true)}
          className="flex w-full items-center rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-10 text-left text-base text-zinc-200"
        >
          <Search className="pointer-events-none absolute left-4 size-5 text-zinc-500" />
          <span className={keyword ? "" : "text-zinc-600"}>
            {keyword || "搜索歌曲或歌手"}
          </span>
        </button>
      </div>
      <div className="relative mb-8 hidden max-w-xl sm:block">
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
      {isMobileSearchOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#07070a] px-5 pt-[max(env(safe-area-inset-top),1.25rem)] sm:hidden">
          <div className="mx-auto max-w-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold">搜索作品</h2>
              <button
                type="button"
                onClick={() => setIsMobileSearchOpen(false)}
                className="rounded-full p-2 text-zinc-400 transition hover:bg-white/10 hover:text-white"
                aria-label="关闭搜索"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-zinc-500" />
              <input
                ref={mobileSearchRef}
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="歌曲、歌手或标签"
                aria-label="搜索歌曲、歌手或标签"
                className="w-full rounded-2xl border border-violet-400/50 bg-white/10 py-4 pl-12 pr-12 text-base outline-none placeholder:text-zinc-600"
              />
              {keyword && (
                <button
                  type="button"
                  onClick={() => setKeyword("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-zinc-400"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
            {keyword ? (
              <div className="mt-7">
                <p className="text-sm text-zinc-500">
                  找到 {results.length} 个作品
                </p>
                <div className="mt-3 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                  {mobileSuggestions.map((lyric) => (
                    <button
                      key={lyric.id}
                      type="button"
                      onClick={() => {
                        setKeyword(lyric.title);
                        setIsMobileSearchOpen(false);
                      }}
                      className="flex w-full items-center justify-between px-4 py-4 text-left transition hover:bg-white/5"
                    >
                      <span>
                        <strong className="block text-sm">{lyric.title}</strong>
                        <small className="mt-1 block text-xs text-zinc-500">
                          {lyric.artist}
                        </small>
                      </span>
                      <span className="text-xs text-violet-300">查看</span>
                    </button>
                  ))}
                  {results.length === 0 && (
                    <p className="px-4 py-8 text-center text-sm text-zinc-500">
                      没有找到匹配的作品
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="mt-7">
                <p className="text-sm text-zinc-500">试试热门搜索</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["周杰伦", "青春", "星空", "回忆"].map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setKeyword(term)}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 transition hover:border-violet-400/50 hover:text-white"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
