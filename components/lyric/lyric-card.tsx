"use client";
/* eslint-disable @next/next/no-img-element -- User-uploaded data URLs cannot be statically optimized. */
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Lyric, UploadedLyric } from "@/types/lyric";

export function LyricCard({
  lyric,
  index,
  onLocalClick,
}: {
  lyric: Lyric | UploadedLyric;
  index: number;
  onLocalClick?: (lyric: UploadedLyric) => void;
}): React.ReactElement {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="mb-5 break-inside-avoid"
    >
      {"isLocal" in lyric ? (
        <button
          type="button"
          onClick={() => onLocalClick?.(lyric)}
          className="group block w-full overflow-hidden rounded-3xl border border-violet-400/20 bg-violet-400/[0.035] p-2 text-left transition hover:-translate-y-1 hover:border-violet-300/50 hover:bg-violet-400/[0.07]"
        >
          <CardContent lyric={lyric} isLocal />
        </button>
      ) : (
        <Link
          href={`/lyrics/${lyric.id}`}
          className="group block overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-2 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]"
        >
          <CardContent lyric={lyric} priority={index < 3} />
        </Link>
      )}
    </motion.article>
  );
}

function CardContent({
  lyric,
  priority = false,
  isLocal = false,
}: {
  lyric: Lyric | UploadedLyric;
  priority?: boolean;
  isLocal?: boolean;
}): React.ReactElement {
  return (
    <>
      <div className="relative overflow-hidden rounded-2xl">
        {isLocal ? (
          <img
            src={lyric.cover}
            alt={`${lyric.title} · ${lyric.artist} 歌词海报`}
            className="h-auto w-full object-cover"
          />
        ) : (
          <Image
            src={lyric.cover}
            alt={`${lyric.title} · ${lyric.artist} 歌词海报`}
            width={800}
            height={1000}
            className="h-auto w-full object-cover transition duration-500 group-hover:scale-[1.035]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
          />
        )}{" "}
        {!isLocal && (
          <span className="absolute right-3 top-3 grid size-9 translate-y-1 place-items-center rounded-full bg-black/45 text-white opacity-0 backdrop-blur-md transition group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="size-4" />
          </span>
        )}
      </div>
      <div className="px-2 pb-2 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-semibold">{lyric.title}</h2>
            <p className="mt-1 text-sm text-zinc-400">{lyric.artist}</p>
          </div>
          <span className="text-xs text-zinc-600">
            {isLocal ? "本地保存" : lyric.year}
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {lyric.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-zinc-400"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
