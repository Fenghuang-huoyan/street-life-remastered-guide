import type { Metadata } from "next";
import { site } from "@/config/site.config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for ${site.siteName}: acceptable use, content accuracy, and liability disclaimer.`,
  alternates: { canonical: "/terms" },
};

const LAST_UPDATED = "2026-09-14";

/** 通用法律页，不含游戏专属文案；换游戏时不用改这个文件，站名/联系方式走配置层。 */
export default function TermsOfService() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <nav className="text-sm text-[hsl(var(--muted))]">{site.siteName} / Terms of Service</nav>
      <h1 className="mt-2 text-3xl font-bold">Terms of Service</h1>
      <p className="mt-2 text-sm text-[hsl(var(--muted))]">Last updated {LAST_UPDATED}</p>

      <div className="mt-8 space-y-8 text-[hsl(var(--fg))]">
        <section>
          <h2 className="text-xl font-bold">Acceptance of terms</h2>
          <p className="mt-2 text-[hsl(var(--muted))]">
            By using {site.siteName} ({site.baseUrl}), you agree to these terms. If you do not
            agree, please do not use the site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">Not an official site</h2>
          <p className="mt-2 text-[hsl(var(--muted))]">
            {site.siteName} is an independent, fan-made reference and is not affiliated with,
            endorsed by, or operated by the game&apos;s developer or {site.platformOwner}. All game
            names, images, and trademarks belong to their respective owners.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">Use of this site</h2>
          <p className="mt-2 text-[hsl(var(--muted))]">
            Content on this site is provided for informational purposes. You may read and share
            links to this site; you may not scrape, republish, or redistribute its content in
            bulk without permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">Accuracy of information</h2>
          <p className="mt-2 text-[hsl(var(--muted))]">
            We check game information against official and community sources and cite them where
            claims are made, but game data changes over time (updates, balance changes, limited
            events) and we cannot guarantee everything is current at the moment you read it.
            Pages marked &ldquo;Unconfirmed&rdquo; indicate a claim that has not been independently
            verified — treat those with extra caution.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">External links</h2>
          <p className="mt-2 text-[hsl(var(--muted))]">
            This site links to official game pages, community pages, and third-party sources. We
            are not responsible for the content or practices of external sites.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">Limitation of liability</h2>
          <p className="mt-2 text-[hsl(var(--muted))]">
            This site is provided &ldquo;as is&rdquo; without warranties of any kind. We are not
            liable for any loss or damage arising from your use of this site or reliance on its
            content, including in-game decisions made based on it.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">Changes to these terms</h2>
          <p className="mt-2 text-[hsl(var(--muted))]">
            We may update these terms from time to time. Changes will be posted on this page with
            an updated date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">Contact</h2>
          <p className="mt-2 text-[hsl(var(--muted))]">
            Questions about these terms can be sent to{" "}
            <a href={`mailto:${site.contactEmail}`} className="text-[hsl(var(--theme))] hover:underline">
              {site.contactEmail}
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
