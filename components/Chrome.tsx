/** 框架层：导航与页脚。三种页型共用，换游戏时一行都不用改。 */
import Link from "next/link";
import Image from "next/image";
import { site } from "@/config/site.config";
import { getNavCategories } from "@/lib/content";

export function Nav() {
  const cats = getNavCategories();
  return (
    <header className="sticky top-0 z-50 border-b-4 border-[hsl(var(--theme))] bg-[hsl(var(--card))]/95 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
        <Link href="/" className="font-display flex shrink-0 items-center gap-2 text-lg font-bold text-[hsl(var(--theme))]">
          <Image src={site.logo} alt="" width={32} height={32} className="rounded-lg" />
          {site.siteName}
        </Link>
        {/* 手机端单行横滑，避免吸顶导航被挤成竖列占满屏幕 */}
        <ul className="flex w-full gap-4 overflow-x-auto whitespace-nowrap text-sm sm:w-auto sm:flex-1 sm:flex-wrap sm:whitespace-normal">
          {cats.map((c) => (
            <li key={c.slug}>
              <Link href={`/${c.slug}`} className="text-[hsl(var(--muted))] hover:text-[hsl(var(--fg))]">
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export function Footer() {
  const { footer, links, gameName } = site;
  const external = [
    links.official && { label: "Official Site", href: links.official },
    links.discord && { label: "Discord", href: links.discord },
    links.youtube && { label: "YouTube", href: links.youtube },
    links.platform && { label: `Play ${gameName}`, href: links.platform },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <footer className="mt-20 border-t-4 border-[hsl(var(--theme))] bg-[hsl(var(--card))]">
      <div className="mx-auto max-w-5xl px-4 py-10 text-sm">
        <h2 className="font-semibold">{footer.aboutTitle}</h2>
        <p className="mt-2 max-w-2xl text-[hsl(var(--muted))]">{footer.about}</p>
        <p className="mt-1 max-w-2xl text-[hsl(var(--muted))]">{footer.description}</p>
        {external.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-4">
            {external.map((l) => (
              <li key={l.href}>
                <a href={l.href} rel="noopener noreferrer" className="text-[hsl(var(--theme))] hover:underline">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        )}
        <ul className="mt-4 flex gap-4 text-[hsl(var(--muted))]">
          <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
          <li><Link href="/terms" className="hover:underline">Terms of Service</Link></li>
        </ul>
      </div>
    </footer>
  );
}
