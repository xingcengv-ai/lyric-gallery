import { ImageIcon, Layers3, Music2 } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";

const principles = [
  {
    icon: Music2,
    title: "从音乐出发",
    description: "用一段旋律和一句歌词，记录属于自己的情绪与记忆。",
  },
  {
    icon: ImageIcon,
    title: "让歌词可见",
    description: "以海报形式重新组织音乐感受，让文字拥有画面感。",
  },
  {
    icon: Layers3,
    title: "轻量且开放",
    description: "第一阶段使用本地数据与静态部署，为后续服务层扩展保留空间。",
  },
];
export default function AboutPage(): React.ReactElement {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-5 py-16 lg:px-8 lg:py-24">
        <p className="text-sm font-medium text-violet-300">
          About Lyric Gallery
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
          把音乐里没说完的话，变成一张可以收藏的画。
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-400">
          Lyric Gallery 是一个围绕歌词视觉化的学习项目。它使用 Next.js App
          Router、静态生成和 GitHub
          Pages，探索从内容数据到视觉展示的一套轻量化实现。
        </p>
        <section className="mt-16 grid gap-4 md:grid-cols-3">
          {principles.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
            >
              <Icon className="size-6 text-violet-300" />
              <h2 className="mt-8 text-xl font-semibold">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                {description}
              </p>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
