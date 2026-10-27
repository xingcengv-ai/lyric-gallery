# Lyric Gallery

歌词图片展示社区：浏览歌词海报、按歌曲或歌手搜索、查看具备 SEO 的详情页，并可在本机上传自己的作品。

## 技术栈

Next.js 15、React 19、TypeScript（strict）、App Router、Tailwind CSS、Shadcn 风格组件、Framer Motion、ESLint、Prettier。

## 开始使用

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
```

## 添加歌词海报

1. 将图片放入 `public/images/lyrics/`，例如 `public/images/lyrics/my-song.png`（推荐 WebP/PNG）。
2. 在 `data/lyrics.json` 添加对应数据，`cover` 填写 `/images/lyrics/my-song.png`。

数据会由 `lib/lyrics.ts` 以类型安全方式读取。未来可将该服务层替换为 Cloudflare R2 / OSS 或数据库实现，而不影响 UI 调用。

## 本机上传与 GitHub Pages

`/upload` 允许你在浏览器中选择图片并填写作品资料。为保持纯静态部署，内容只保存在当前浏览器的 `localStorage`：刷新、重启浏览器后通常仍在，但其他访问者无法看到，也不会自动提交到 GitHub。

若需要将作品正式发布到网站：

1. 用 GitHub 网页上传图片到 `public/images/lyrics/`。
2. 在 `data/lyrics.json` 新增作品记录，并将 `cover` 填写为 `/images/lyrics/你的文件名.png`。
3. 提交到 `main` 分支。工作流会重新构建并发布站点。

### 首次开启 GitHub Pages

1. 将本项目推送到 GitHub 仓库的 `main` 分支。
2. 在仓库 **Settings → Pages → Build and deployment** 中选择 **GitHub Actions**。
3. 推送完成后，在 **Actions** 页面等待 `Deploy to GitHub Pages` 工作流成功；页面地址会显示在该工作流中。

GitHub Pages 无法让公开访问者直接把文件安全写进你的仓库。若以后要做“所有人上传并立即公开”，需要再接入身份验证和对象存储（例如 Cloudflare R2）。
