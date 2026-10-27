import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Download, Heart, ImagePlus, Share2 } from "lucide-react";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";
import { getLyricById, getLyrics } from "@/lib/lyrics";
import { publicAssetPath } from "@/lib/utils";

interface LyricPageProps {
  params: Promise<{ id: string }>;
}
export function generateStaticParams(): Array<{ id: string }> {
  return getLyrics().map(({ id }) => ({ id }));
}
export async function generateMetadata({
  params,
}: LyricPageProps): Promise<Metadata> {
  const { id } = await params;
  const lyric = getLyricById(id);
  if (!lyric) return { title: "作品未找到" };
  return {
    title: `${lyric.title} · ${lyric.artist}`,
    description: lyric.description,
    openGraph: {
      title: `${lyric.title} · ${lyric.artist}`,
      description: lyric.description,
      images: [lyric.cover],
    },
  };
}
export default async function LyricDetailPage({
  params,
}: LyricPageProps): Promise<React.ReactElement> {
  const { id } = await params;
  const lyric = getLyricById(id);
  if (!lyric) notFound();
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-8 lg:px-8 lg:py-14">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
        >
          <ArrowLeft className="size-4" />
          返回画廊
        </Link>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-2 shadow-glow">
            <Image
              src={publicAssetPath(lyric.cover)}
              alt={`${lyric.title} · ${lyric.artist} 歌词海报`}
              width={1200}
              height={1500}
              priority
              className="h-auto w-full rounded-[1.6rem] object-cover"
              sizes="(max-width: 1024px) 100vw, 65vw"
            />
          </div>
          <aside className="lg:sticky lg:top-28">
            <p className="text-sm font-medium text-violet-300">
              歌词视觉作品 · {lyric.year}
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              {lyric.title}
            </h1>
            <p className="mt-3 text-lg text-zinc-400">{lyric.artist}</p>
            <p className="mt-8 leading-8 text-zinc-400">{lyric.description}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {lyric.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-zinc-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <div className="mt-10 grid gap-3">
              <Button className="gap-2">
                <Heart className="size-4" />
                收藏作品
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="secondary" className="gap-2">
                  <Share2 className="size-4" />
                  分享
                </Button>
                <Link
                  href="/upload"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-3 text-sm font-semibold transition hover:bg-white/15"
                >
                  <ImagePlus className="size-4" />
                  上传我的作品
                </Link>
              </div>
              <a
                href={publicAssetPath(lyric.cover)}
                download={`${lyric.title}-${lyric.artist}.png`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-3 text-sm font-semibold transition hover:bg-white/15"
              >
                <Download className="size-4" />
                下载图片
              </a>
            </div>
            <p className="mt-5 text-xs leading-5 text-zinc-600">
              收藏功能将在下一阶段开放。
            </p>
          </aside>
        </div>
      </main>
    </>
  );
}
