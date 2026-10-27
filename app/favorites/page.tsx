import { Heart } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
export default function FavoritesPage(): React.ReactElement {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto grid min-h-[70vh] max-w-3xl place-items-center px-5 text-center">
        <div>
          <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-pink-500/15 text-pink-300">
            <Heart />
          </div>
          <h1 className="mt-6 text-4xl font-bold">收藏，留给下一阶段</h1>
          <p className="mt-4 text-zinc-400">登录与个人收藏功能正在规划中。</p>
        </div>
      </main>
    </>
  );
}
