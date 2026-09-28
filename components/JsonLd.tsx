import { site } from "@/config/site.config";

type Source = { label: string; url: string };

/**
 * 结构化数据。目的有两个：Google 富结果，以及让 AI 检索（ChatGPT/Perplexity 等）
 * 能直接读到"这页什么时候更新的、事实出处是哪儿"，不必自己从正文里猜。
 */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

const base = () => site.baseUrl.replace(/\/$/, "");

/** 内页。citation 跟页面底部的 Sources 区块同源——把已经在做的事交给机器读。 */
export function articleSchema(doc: {
  title: string;
  description: string;
  updated?: string;
  category: string;
  slug: string;
  sources: Source[];
}) {
  const url = `${base()}/${doc.category}/${doc.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: doc.title,
    description: doc.description,
    ...(doc.updated ? { dateModified: doc.updated } : {}),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    publisher: { "@type": "Organization", name: site.siteName, url: base() },
    citation: doc.sources.map((s) => ({ "@type": "CreativeWork", name: s.label, url: s.url })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${base()}${it.path}`,
    })),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.siteName,
    url: base(),
    description: site.meta.description,
  };
}
