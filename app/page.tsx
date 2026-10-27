import { ArrowDown, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { LyricGallery } from "@/components/lyric/lyric-gallery";
import { getLyrics } from "@/lib/lyrics";

export default function HomePage(): React.ReactElement {
  const lyrics = getLyrics();
  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative mx-auto flex min-h-[560px] max-w-7xl items-center overflow-hidden px-5 py-24 lg:px-8">
          <div className="absolute -right-32 top-8 size-[28rem] rounded-full bg-violet-600/20 blur-[120px]" />
          <div className="relative max-w-3xl">
            <div className="mb-6 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-violet-200">
              <Sparkles className="size-3.5" />
              为每一首歌，留一帧画面
            </div>
            <h1 className="text-5xl font-bold leading-[1.12] tracking-[-.045em] sm:text-7xl">
              发现属于你的
              <br />
              <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-amber-200 bg-clip-text text-transparent">
                歌词瞬间
              </span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-zinc-400 sm:text-lg">
              收藏、分享、创造音乐视觉作品。让那些说不出口的话，成为可以被看见的风景。
            </p>
            <a
              href="#gallery"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-black transition hover:scale-[1.02]"
            >
              探索画廊 <ArrowDown className="size-4" />
            </a>
          </div>
        </section>
        <LyricGallery lyrics={lyrics} />
      </main>
    </>
  );
}
