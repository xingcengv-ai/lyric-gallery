"use client";
/* eslint-disable @next/next/no-img-element -- Preview uses an in-memory data URL. */

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { saveLocalUpload } from "@/lib/local-uploads";

const maxFileSize = 3 * 1024 * 1024;

function readImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("图片读取失败，请重试。"));
    reader.readAsDataURL(file);
  });
}

export function LyricUploadForm(): React.ReactElement {
  const router = useRouter();
  const [cover, setCover] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleFileChange(
    event: ChangeEvent<HTMLInputElement>,
  ): Promise<void> {
    const file = event.target.files?.[0];
    setError("");
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("请选择图片文件。");
      return;
    }
    if (file.size > maxFileSize) {
      setError("图片请控制在 3 MB 以内，以便安全地保存在浏览器中。");
      return;
    }
    try {
      setCover(await readImage(file));
    } catch (uploadError: unknown) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "图片读取失败，请重试。",
      );
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = String(form.get("title") ?? "").trim();
    const artist = String(form.get("artist") ?? "").trim();
    const description = String(form.get("description") ?? "").trim();
    const tags = String(form.get("tags") ?? "")
      .split(/[，,]/)
      .map((tag) => tag.trim())
      .filter(Boolean);

    if (!cover || !title || !artist || !description) {
      setError("请完整填写图片、歌名、歌手和作品描述。");
      return;
    }

    setIsSubmitting(true);
    saveLocalUpload({
      id: `local-${crypto.randomUUID()}`,
      title,
      artist,
      cover,
      description,
      tags,
      year: new Date().getFullYear(),
      isLocal: true,
    });
    router.push("/#gallery");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 grid gap-6">
      <label className="group grid min-h-72 cursor-pointer place-items-center overflow-hidden rounded-3xl border border-dashed border-white/20 bg-white/[0.03] transition hover:border-violet-400/60 hover:bg-violet-400/[0.04]">
        {cover ? (
          <img
            src={cover}
            alt="上传图片预览"
            className="h-full max-h-96 w-full object-cover"
          />
        ) : (
          <span className="flex flex-col items-center gap-3 text-center">
            <span className="grid size-12 place-items-center rounded-2xl bg-white/10 text-violet-300">
              <ImagePlus className="size-6" />
            </span>
            <span>
              <strong className="block text-sm text-white">
                选择一张歌词图片
              </strong>
              <small className="mt-1 block text-zinc-500">
                PNG、JPG、WebP，最大 3 MB
              </small>
            </span>
          </span>
        )}
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleFileChange}
          className="sr-only"
        />
      </label>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="歌曲名称" name="title" placeholder="例如：晴天" />
        <Field label="歌手" name="artist" placeholder="例如：周杰伦" />
      </div>
      <Field
        label="作品描述"
        name="description"
        placeholder="写下这张海报想表达的故事"
      />
      <Field
        label="标签（用逗号分隔）"
        name="tags"
        placeholder="青春, 回忆"
        required={false}
      />
      {error && (
        <p role="alert" className="text-sm text-rose-300">
          {error}
        </p>
      )}
      <Button type="submit" disabled={isSubmitting} className="gap-2 sm:w-fit">
        <Upload className="size-4" />
        {isSubmitting ? "正在保存…" : "保存到我的画廊"}
      </Button>
      <p className="text-xs leading-5 text-zinc-500">
        作品仅保存在当前浏览器，其他访客不可见。若要发布到 GitHub
        Pages，请依照下方说明将文件和数据提交到仓库。
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  placeholder,
  required = true,
}: {
  label: string;
  name: string;
  placeholder: string;
  required?: boolean;
}): React.ReactElement {
  return (
    <label className="grid gap-2 text-sm font-medium text-zinc-200">
      {label}
      <input
        name={name}
        required={required}
        placeholder={placeholder}
        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm font-normal outline-none transition placeholder:text-zinc-600 focus:border-violet-400/60"
      />
    </label>
  );
}
