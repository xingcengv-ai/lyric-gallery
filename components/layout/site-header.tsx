import Link from "next/link";
import { Sparkles } from "lucide-react";

const navigation = [
  { label: "首页", href: "/" },
  { label: "发现", href: "/discover" },
  { label: "收藏", href: "/favorites" },
  { label: "关于", href: "/about" },
  { label: "上传作品", href: "/upload" },
];
export function SiteHeader(): React.ReactElement {
  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-[#07070a]/75 backdrop-blur-xl">
      <div className="h-18 mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-base font-bold tracking-tight"
        >
          <span className="grid size-8 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500">
            <Sparkles className="size-4" />
          </span>
          Lyric Gallery
        </Link>
        <nav className="hidden gap-1 sm:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm text-zinc-400 transition hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/upload"
          className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-zinc-200"
        >
          上传作品
        </Link>
      </div>
    </header>
  );
}
