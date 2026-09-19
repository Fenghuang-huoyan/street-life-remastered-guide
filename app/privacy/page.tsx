import type { Metadata } from "next";
import { site } from "@/config/site.config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${site.siteName}: what data is collected, how analytics and advertising cookies are used, and how to contact us.`,
  alternates: { canonical: "/privacy" },
};

const LAST_UPDATED = "2026-09-14";

/** 通用法律页，不含游戏专属文案；换游戏时不用改这个文件，站名/联系方式走配置层。 */
export default function PrivacyPolicy() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <nav className="text-sm text-[hsl(var(--muted))]">{site.siteName} / Privacy Policy</nav>
      <h1 className="mt-2 text-3xl font-bold">Privacy Policy</h1>
      <p className="mt-2 text-sm text-[hsl(var(--muted))]">Last updated {LAST_UPDATED}</p>

      <div className="mt-8 space-y-8 text-[hsl(var(--fg))]">
        <section>
          <h2 className="text-xl font-bold">Overview</h2>
          <p className="mt-2 text-[hsl(var(--muted))]">
            {site.siteName} ({site.baseUrl}) is a fan-made reference site and is not affiliated
            with the game&apos;s developer or {site.platformOwner}. This policy explains what
            information is collected when you visit and how it is used.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">Information we collect</h2>
          <p className="mt-2 text-[hsl(var(--muted))]">
            We do not require accounts, and we do not collect names, email addresses, or payment
            information through this site. Standard technical data (such as your approximate
            location, device and browser type, and pages visited) is collected automatically via
            analytics and advertising tools described below.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">Analytics</h2>
          <p className="mt-2 text-[hsl(var(--muted))]">
            We use Google Analytics to understand how visitors use the site (pages viewed, time
            on site, approximate location). Google Analytics uses cookies and similar
            technologies. You can opt out using Google&apos;s{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[hsl(var(--theme))] hover:underline"
            >
              Analytics Opt-out Browser Add-on
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">Advertising</h2>
          <p className="mt-2 text-[hsl(var(--muted))]">
            This site may display ads served by third-party advertising networks (such as
            Adsterra or Google AdSense). These networks may use cookies or similar technologies
            to serve ads based on your prior visits to this or other websites. You can opt out of
            personalized advertising through your browser settings or, where applicable, via{" "}
            <a
              href="https://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[hsl(var(--theme))] hover:underline"
            >
              aboutads.info
            </a>
            . We do not control these third parties&apos; own data practices; see their
            respective privacy policies for details.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">Children&apos;s privacy</h2>
          <p className="mt-2 text-[hsl(var(--muted))]">
            This site is not directed at children under 13, and we do not knowingly collect
            personal information from children.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">Changes to this policy</h2>
          <p className="mt-2 text-[hsl(var(--muted))]">
            We may update this policy from time to time. Changes will be posted on this page with
            an updated date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">Contact</h2>
          <p className="mt-2 text-[hsl(var(--muted))]">
            Questions about this policy can be sent to{" "}
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
