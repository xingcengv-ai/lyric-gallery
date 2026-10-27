import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { LyricUploadForm } from "@/components/lyric/lyric-upload-form";

export default function UploadPage(): React.ReactElement {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-5 py-10 pb-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
        >
          <ArrowLeft className="size-4" />
          返回画廊
        </Link>
        <p className="mt-12 text-sm font-medium text-violet-300">我的作品</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">上传歌词海报</h1>
        <p className="mt-4 leading-7 text-zinc-400">
          选择你创作的图片，补充音乐信息，即可先在这台设备的画廊中浏览。
        </p>
        <LyricUploadForm />
      </main>
    </>
  );
}
