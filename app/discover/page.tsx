import { Compass } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { LyricGallery } from "@/components/lyric/lyric-gallery";
import { getLyrics } from "@/lib/lyrics";

export default function DiscoverPage(): React.ReactElement {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="mx-auto max-w-7xl px-5 pb-12 pt-16 lg:px-8 lg:pt-24">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-300">
            <Compass className="size-6" />
          </div>
          <p className="mt-6 text-sm font-medium text-violet-300">探索画廊</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
            从一句歌词，进入一段故事。
          </h1>
          <p className="mt-5 max-w-xl leading-7 text-zinc-400">
            按歌曲、歌手或情绪标签，寻找让你停下来的音乐瞬间。
          </p>
        </section>
        <LyricGallery lyrics={getLyrics()} />
      </main>
    </>
  );
}
