/**
 * 内容层读取 —— 框架层唯一的内容入口。
 * 往 content/<locale>/<category>/<slug>.mdx 丢一个文件，
 * 路由、导航、面包屑、sitemap 全部自动跟上，代码一行不用改。
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { site } from "@/config/site.config";

const ROOT = path.join(process.cwd(), "content");

/** 每篇内页的 frontmatter。sources 是硬要求：没有来源的事实不许上线。 */
export type Doc = {
  slug: string;
  category: string;
  locale: string;
  title: string;
  description: string;
  keyword: string;
  updated: string;
  /** 卡片配图（可选，public/ 下路径）；不填则用所属分类的 image */
  image: string;
  /** 事实来源，至少 1 条。空数组会在构建时报错。 */
  sources: { label: string; url: string }[];
  body: string;
};

function localeDir(locale: string) {
  return path.join(ROOT, locale);
}

export function getAllDocs(locale: string = site.i18n.defaultLocale): Doc[] {
  const base = localeDir(locale);
  if (!fs.existsSync(base)) return [];

  const docs: Doc[] = [];
  for (const category of fs.readdirSync(base)) {
    const catDir = path.join(base, category);
    if (!fs.statSync(catDir).isDirectory()) continue;

    for (const file of fs.readdirSync(catDir)) {
      if (!file.endsWith(".mdx")) continue;
      const raw = fs.readFileSync(path.join(catDir, file), "utf8");
      const { data, content } = matter(raw);
      const slug = file.replace(/\.mdx$/, "");

      const sources = (data.sources ?? []) as Doc["sources"];
      if (!Array.isArray(sources) || sources.length === 0) {
        throw new Error(
          `[content] ${locale}/${category}/${file} 缺少 sources。每一页都必须标明事实来源，这是防止被 Google 判为 scaled content abuse 的硬规则。`
        );
      }

      docs.push({
        slug,
        category,
        locale,
        title: data.title ?? slug,
        description: data.description ?? "",
        keyword: data.keyword ?? data.title ?? slug,
        updated: data.updated ?? "",
        image: data.image ?? categoryImage(category),
        sources,
        body: content,
      });
    }
  }
  return docs.sort((a, b) => a.title.localeCompare(b.title));
}

export function getDocsByCategory(category: string, locale?: string) {
  return getAllDocs(locale).filter((d) => d.category === category);
}

export function getDoc(category: string, slug: string, locale?: string) {
  return getAllDocs(locale).find((d) => d.category === category && d.slug === slug) ?? null;
}

/** 导航只显示真正有内容的分类，避免出现点进去是空页的死链。 */
export function getNavCategories(locale?: string) {
  const docs = getAllDocs(locale);
  return site.categories.filter((c) => docs.some((d) => d.category === c.slug));
}

export function categoryLabel(slug: string) {
  return site.categories.find((c) => c.slug === slug)?.label ?? slug;
}

/** 透明背景的单位立绘用 "contain"（不裁切），风景照默认 "cover"（铺满）。 */
export function categoryImageFit(slug: string): "cover" | "contain" {
  return site.categories.find((c) => c.slug === slug)?.imageFit ?? "cover";
}

export function categoryImage(slug: string): string {
  const cat: { slug: string; image?: string } | undefined = site.categories.find((c) => c.slug === slug);
  return cat?.image ?? "";
}
