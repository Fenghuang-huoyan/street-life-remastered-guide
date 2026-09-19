import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { site } from "@/config/site.config";
import { getAllDocs, getDoc, categoryLabel } from "@/lib/content";
import { AdBanner } from "@/components/AdBanner";

type Props = { params: Promise<{ category: string; slug: string }> };

export function generateStaticParams() {
  return getAllDocs().map((d) => ({ category: d.category, slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const doc = getDoc(category, slug);
  if (!doc) return {};
  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: `/${category}/${slug}` },
  };
}

/** 内页：一个关键词一页。正文走 MDX，事实来源强制展示。 */
export default async function DocPage({ params }: Props) {
  const { category, slug } = await params;
  const doc = getDoc(category, slug);
  if (!doc) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <nav className="text-sm text-[hsl(var(--muted))]">
        <Link href="/" className="hover:underline">{site.siteName}</Link>
        {" / "}
        <Link href={`/${doc.category}`} className="hover:underline">{categoryLabel(doc.category)}</Link>
      </nav>

      <h1 className="mt-2 text-3xl font-bold">{doc.title}</h1>
      {doc.updated && <p className="mt-2 text-sm text-[hsl(var(--muted))]">Last updated {doc.updated}</p>}

      <article className="mt-8 space-y-4 leading-relaxed [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_li]:ml-5 [&_li]:list-disc [&_p]:text-[hsl(var(--fg))] [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm [&_td]:border [&_td]:border-[hsl(var(--border))] [&_td]:px-3 [&_td]:py-2 [&_th]:border [&_th]:border-[hsl(var(--border))] [&_th]:bg-[hsl(var(--card))] [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-bold">
        {/* remark-gfm 负责把 Markdown 表格转成 <table>；外层横滑容器防止手机上撑破页面 */}
        <MDXRemote
          source={doc.body}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          components={{ table: (props) => <div className="overflow-x-auto"><table {...props} /></div> }}
        />
      </article>

      <AdBanner />

      {/* 每页公开列出来源。这是内容可信度的凭据，也是我们跟批量灌水站的分界线。 */}
      <section className="mt-12 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[hsl(var(--muted))]">Sources</h2>
        <ul className="mt-3 space-y-1 text-sm">
          {doc.sources.map((s) => (
            <li key={s.url}>
              <a href={s.url} rel="noopener noreferrer nofollow" className="text-[hsl(var(--theme))] hover:underline">{s.label}</a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
