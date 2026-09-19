import Link from "next/link";
import Image from "next/image";
import { site } from "@/config/site.config";

/** 首页承接主游戏词。区块顺序对齐手册关卡 3 的结构：hero / start / aboutGame / finalCta。 */
export default function Home() {
  const { hero, start, aboutGame, finalCta } = site;
  return (
    <main className="mx-auto max-w-5xl px-4">
      {/* 首屏：官方宣传图做背景 + 渐变遮罩保证文字可读 */}
      <section className="relative -mx-4 overflow-hidden sm:mx-0 sm:mt-6 sm:rounded-3xl">
        <Image src={hero.image.src} alt={hero.image.alt} fill priority sizes="(max-width: 1024px) 100vw, 1024px" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/15" />
        <div className="relative px-6 py-14 text-white sm:px-10 sm:py-20">
          <p className="text-sm font-bold uppercase tracking-wide text-[hsl(var(--accent))]">{hero.eyebrow}</p>
          {/* 全站有且仅有这一个 H1 */}
          <h1 className="mt-2 text-4xl font-bold drop-shadow-lg sm:text-6xl">{hero.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">{hero.description}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {hero.stats.map((s) => (
              <li key={s} className="rounded-full border border-white/25 bg-white/15 px-3 py-1 text-sm backdrop-blur">{s}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={hero.primaryCta.href} className="btn btn-theme">{hero.primaryCta.label}</Link>
            <Link href={hero.secondaryCta.href} className="btn btn-accent">{hero.secondaryCta.label}</Link>
            <Link href={hero.tertiaryCta.href} className="btn btn-plain">{hero.tertiaryCta.label}</Link>
          </div>
        </div>
      </section>

      <section className="py-12">
        <p className="text-sm font-bold uppercase tracking-wide text-[hsl(var(--theme))]">{start.eyebrow}</p>
        <h2 className="mt-2 text-3xl font-bold">{start.title}</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {start.cards.map((c) => (
            <div key={c.number} className="group overflow-hidden rounded-2xl border border-b-4 border-[hsl(var(--border))] bg-[hsl(var(--card))] transition hover:-translate-y-0.5 hover:border-[hsl(var(--theme))]">
              <Link href={c.href} className="block">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image src={c.image} alt="" fill sizes="(max-width: 640px) 100vw, 490px" className="object-cover transition group-hover:scale-105" />
                  <span className="font-display absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border-b-4 border-[hsl(var(--accent-shadow))] bg-[hsl(var(--accent))] font-bold text-[hsl(var(--accent-fg))]">{c.number}</span>
                </div>
                <div className="p-5 pb-3">
                  <h3 className="text-lg font-bold">{c.title}</h3>
                  <p className="mt-1 text-sm text-[hsl(var(--muted))]">{c.description}</p>
                </div>
              </Link>
              {/* 二级预览链接（可选）：给用户和 Google 更多具体入口，不是每张卡片必填 */}
              {c.subLinks && c.subLinks.length > 0 && (
                <div className="flex flex-wrap gap-x-3 gap-y-1 px-5 pb-4 text-sm">
                  {c.subLinks.map((sl) => (
                    <Link key={sl.href} href={sl.href} className="text-[hsl(var(--theme))] hover:underline">{sl.label}</Link>
                  ))}
                  <Link href={c.href} className="font-bold text-[hsl(var(--muted))] hover:underline">View all →</Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="py-10">
        <h2 className="text-3xl font-bold">{aboutGame.title}</h2>
        {aboutGame.paragraphs.map((p) => (
          <p key={p.slice(0, 24)} className="mt-3 max-w-3xl text-[hsl(var(--muted))]">{p}</p>
        ))}
        <dl className="mt-6 grid gap-3 sm:grid-cols-3">
          {aboutGame.stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-b-4 border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
              <dt className="text-sm text-[hsl(var(--muted))]">{s.label}</dt>
              <dd className="font-display mt-1 text-lg font-bold">{s.value}</dd>
            </div>
          ))}
        </dl>
        <Link href={aboutGame.cta.href} className="mt-6 inline-block font-bold text-[hsl(var(--theme))] hover:underline">{aboutGame.cta.label} →</Link>
      </section>

      <section className="my-10 rounded-3xl border-b-4 border-[hsl(var(--theme-shadow))] bg-[hsl(var(--theme))] p-8 text-white">
        <h2 className="text-3xl font-bold">{finalCta.title}</h2>
        <p className="mt-2 max-w-2xl text-white/90">{finalCta.description}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={finalCta.primary.href} className="btn btn-accent">{finalCta.primary.label}</Link>
          <a href={finalCta.secondary.href} rel="noopener noreferrer" className="btn btn-plain">{finalCta.secondary.label}</a>
        </div>
      </section>
    </main>
  );
}
