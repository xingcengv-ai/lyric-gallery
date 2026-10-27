import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://lyric-gallery.vercel.app"),
  title: {
    default: "Lyric Gallery · 歌词的视觉瞬间",
    template: "%s · Lyric Gallery",
  },
  description: "发现、收藏与分享精美的歌词视觉作品。",
  keywords: ["歌词海报", "歌词图片", "音乐", "Lyric Gallery"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>): React.ReactElement {
  return (
    <html lang="zh-CN" className="dark">
      <body>{children}</body>
    </html>
  );
}
