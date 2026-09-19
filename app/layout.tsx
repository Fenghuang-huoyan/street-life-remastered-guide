import type { Metadata } from "next";
import Script from "next/script";
import { Fredoka } from "next/font/google";
import { site } from "@/config/site.config";
import { Nav, Footer } from "@/components/Chrome";
import "./globals.css";

const display = Fredoka({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-display" });

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/** SEO 基础元数据由配置层自动生成，不手写。 */
export const metadata: Metadata = {
  metadataBase: new URL(site.baseUrl),
  title: { default: site.meta.title, template: `%s | ${site.siteName}` },
  description: site.meta.description,
  keywords: site.meta.keywords,
  alternates: { canonical: "/" },
  openGraph: { title: site.meta.title, description: site.meta.description, url: site.baseUrl, siteName: site.siteName, type: "website", images: [site.hero.image.src] },
  icons: { apple: site.logo },
};

/** 主题色集中在配置层，这里转成 CSS 变量（camelCase 键 → --kebab-case），代码里不写死任何颜色。 */
function themeVars() {
  const { light, dark } = site.theme;
  const toVars = (t: Record<string, string>) =>
    Object.entries(t).map(([k, v]) => `--${k.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase())}:${v};`).join("");
  return `:root{${toVars(light)}}@media (prefers-color-scheme:dark){:root{${toVars(dark)}}}`;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.i18n.defaultLocale} className={display.variable}>
      <head><style dangerouslySetInnerHTML={{ __html: themeVars() }} /></head>
      <body className="bg-[hsl(var(--bg))] text-[hsl(var(--fg))] antialiased">
        <Nav />
        {children}
        <Footer />
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
