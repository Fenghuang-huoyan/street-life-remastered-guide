import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { site } from "@/config/site.config";
import { getDocsByCategory, getNavCategories, categoryLabel, categoryImageFit } from "@/lib/content";

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  // 只为真正有内容的分类建路由，避免产出点进去是 404 的死链
  return getNavCategories().map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const label = categoryLabel(category);
  return {
    title: `${site.gameName} ${label}`,
    description: `Every ${site.gameName} ${label.toLowerCase()} page, each one checked against official sources.`,
    alternates: { canonical: `/${category}` },
  };
}

/** 导航页：批量展示一个分类下的内页，不必手工逐个建页。 */
export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const docs = getDocsByCategory(category);
  if (docs.length === 0) notFound();

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <nav className="text-sm text-[hsl(var(--muted))]">
        <Link href="/" className="hover:underline">{site.siteName}</Link> / {categoryLabel(category)}
      </nav>
      <h1 className="mt-2 text-3xl font-bold">{site.gameName} {categoryLabel(category)}</h1>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {docs.map((d) => (
          <li key={d.slug}>
            <Link href={`/${d.category}/${d.slug}`} className="block h-full overflow-hidden rounded-2xl border border-b-4 border-[hsl(var(--border))] bg-[hsl(var(--card))] transition hover:-translate-y-0.5 hover:border-[hsl(var(--theme))]">
              {d.image && (
                <div className={`relative aspect-[16/9] ${categoryImageFit(d.category) === "contain" ? "bg-[hsl(var(--theme))]/10 p-6" : ""}`}>
                  <Image
                    src={d.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 490px"
                    className={categoryImageFit(d.category) === "contain" ? "object-contain" : "object-cover"}
                  />
                </div>
              )}
              <div className="p-5">
                <h2 className="text-lg font-bold">{d.title}</h2>
                <p className="mt-1 text-sm text-[hsl(var(--muted))]">{d.description}</p>
                {d.updated && <p className="mt-2 text-xs text-[hsl(var(--muted))]">Updated {d.updated}</p>}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
