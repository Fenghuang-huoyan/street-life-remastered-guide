/**
 * 配置层 —— 换一个游戏，只改这个文件。
 * 字段结构刻意对齐《8月航海》手册关卡 3 的 ChatGPT 调研提示词输出的 JSON，
 * 这样手册流程产出的素材可以直接填进来，不用二次转换。
 */
/**
 * image：分类卡片配图，放在 public/ 下的路径；内页 frontmatter 的 image 优先于它
 * imageFit："cover"（默认）铺满卡片，适合风景/场景照；"contain" 居中不裁切，
 * 给透明背景的单位立绘用——铺满会把方形小图硬拉伸/裁得只剩局部，很难看
 */
export type NavCategory = { slug: string; label: string; image?: string; imageFit?: "cover" | "contain" };

/**
 * subLinks（可选）：卡片下方的二级预览链接，仿照对手站"分类卡片列 2-3 个具体子话题 +
 * View all"的做法（2026-09-17 看竞品站 mansiontycoon.wiki 时发现，比只有一句话描述
 * 更能给用户和 Google 具体入口）。不填就是老样式，不强制每张卡片都加。
 */
export type StartCard = {
  number: string; title: string; description: string; href: string; image: string;
  subLinks?: { label: string; href: string }[];
};

// ---- 图片（Roblox 官方 API 拿到的 6 张宣传图 + 游戏图标，均已自托管到 public/，不热链）----
// 官方一共只有 7 条 media（1 条重复），所以 9 个分类里图标会复用；不硬凑不相关的图。
const IMG = {
  hero: "/images/official/promo-1.png",
  gang: "/images/official/promo-2.png",
  guide: "/images/official/promo-3.png",
  rob: "/images/official/promo-4.png",
  guns: "/images/official/promo-5.png",
  chase: "/images/official/promo-6.png",
  icon: "/images/official/icon.png",
};

export const site = {
  // ---- 基本信息 ----
  gameName: "Street Life Remastered",
  // 隐私政策/条款页的免责声明用（"不隶属于开发商或 XX 公司"）；换非 Roblox 游戏时必改，
  // 否则这句免责声明会指名一个跟这个游戏无关的平台方，是错误陈述，不是小事
  platformOwner: "Roblox Corporation",
  siteName: "Street Life Remastered Wiki",
  // 导航 logo 与 apple icon；/favicon.ico 放在 public/ 根目录
  logo: "/images/logo.png",
  // 上线前改成真实域名；本地开发用 localhost
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL ?? "https://streetliferemastered.wiki",
  // 隐私政策/服务条款页展示，也是隐私相关问题的联系方式
  contactEmail: "asgharrulislam401@gmail.com",

  // ---- SEO 元数据 ----
  meta: {
    title: "Street Life Remastered Wiki — Money Methods, Gangs, Guns, Cars",
    description:
      "Fan-made Street Life Remastered wiki for Roblox: money methods, how to join a gang, guns, cars, robberies, badges and private-server admin, each page citing its sources.",
    keywords: "Street Life Remastered, Roblox, wiki, gangs, guns, cars, money methods, codes",
  },

  // ---- 官方链接（手册：只放官方和正经社群，不留 404）----
  links: {
    platform: "https://www.roblox.com/games/71600459831333/Street-Life-Remastered",
    official: "https://www.roblox.com/communities/16660065",
    discord: "https://discord.com/invite/streetlife",
    youtube: "",
    reddit: "",
  },

  // ---- 主题色（HSL，亮暗两套，全站唯一来源）----
  // 取自游戏宣传图：警灯红/蓝夜色（主色）、现金金黄（强调按钮）、夜城深蓝（暗色底）
  theme: {
    light: {
      theme: "355 72% 42%", themeLight: "355 70% 52%", themeShadow: "355 75% 26%",
      accent: "45 100% 52%", accentFg: "222 40% 12%", accentShadow: "38 95% 40%",
      bg: "220 30% 97%", fg: "222 35% 12%", muted: "222 12% 38%", card: "0 0% 100%", border: "220 25% 86%",
    },
    dark: {
      theme: "355 68% 48%", themeLight: "355 75% 62%", themeShadow: "355 70% 26%",
      accent: "45 100% 55%", accentFg: "222 40% 10%", accentShadow: "38 90% 35%",
      bg: "225 35% 8%", fg: "220 25% 94%", muted: "220 12% 68%", card: "225 28% 13%", border: "225 20% 22%",
    },
  },

  // ---- 多语言（手册：最多 4 门，必须有英语；新手先把英语做扎实）----
  i18n: { locales: ["en"] as const, defaultLocale: "en" as const },

  // ---- 导航分类（对应 content/<locale>/<category>/ 目录）----
  categories: [
    { slug: "guide", label: "Guide", image: IMG.guide },
    { slug: "money", label: "Money", image: IMG.hero },
    { slug: "robberies", label: "Robberies", image: IMG.rob },
    { slug: "gangs", label: "Gangs", image: IMG.gang },
    { slug: "guns", label: "Guns", image: IMG.guns },
    { slug: "cars", label: "Cars", image: IMG.chase },
    { slug: "achievements", label: "Badges", image: IMG.icon, imageFit: "contain" },
    { slug: "admin", label: "Admin", image: IMG.icon, imageFit: "contain" },
    { slug: "codes", label: "Codes", image: IMG.icon, imageFit: "contain" },
  ] satisfies NavCategory[],

  // ---- 首页各区块 ----
  hero: {
    eyebrow: "Fan-Made Community Wiki",
    title: "Street Life Remastered",
    image: { src: IMG.hero, alt: "A police officer and a masked robber beside a cash-filled armored truck, official Street Life Remastered promo art" },
    description:
      "An open-world hood role-play game on Roblox: rob banks, join a gang, run a turf or play cop. Every page here cites where its claims came from, and anything we could not confirm says so.",
    stats: ["170M+ Visits", "1.6M+ Favorites", "Updated Sep 2026", "Roblox Open World RPG"],
    primaryCta: { label: "Start Beginner Guide", href: "/guide/street-life-remastered-beginner-guide" },
    secondaryCta: { label: "Money Methods", href: "/money/street-life-remastered-money-methods" },
    tertiaryCta: { label: "Are There Codes?", href: "/codes/street-life-remastered-codes" },
  },

  start: {
    eyebrow: "Start Here",
    title: "Your Street Life Remastered Journey",
    cards: [
      { number: "1", title: "Beginner Guide", description: "What to do in your first hour: guns, a gang and your first cash.", href: "/guide/street-life-remastered-beginner-guide", image: IMG.guide },
      {
        number: "2", title: "Money Methods", description: "Robberies, money printers, oil, crypto and jobs, with the numbers creators showed.", href: "/money/street-life-remastered-money-methods", image: IMG.hero,
        subLinks: [{ label: "Robberies", href: "/robberies/street-life-remastered-robberies" }, { label: "Badges", href: "/achievements/street-life-remastered-badges" }],
      },
      {
        number: "3", title: "Gangs and Turfs", description: "How gangs work, how to join one, and why turfs matter.", href: "/gangs/street-life-remastered-gangs", image: IMG.gang,
        subLinks: [{ label: "Guns", href: "/guns/street-life-remastered-guns" }, { label: "Cars", href: "/cars/street-life-remastered-cars" }],
      },
      {
        number: "4", title: "Codes and Admin", description: "Whether redeemable codes exist, and what admin means in private servers.", href: "/codes/street-life-remastered-codes", image: IMG.icon,
        subLinks: [{ label: "Admin", href: "/admin/street-life-remastered-admin-commands" }],
      },
    ] as StartCard[],
  },

  aboutGame: {
    title: "What is Street Life Remastered?",
    paragraphs: [
      "Street Life Remastered is a free Roblox open-world role-playing game by flipsy's games. The official description lists robbing banks and houses, joining the police, taking over turfs with a faction, hunting for weapons and cash, a music studio, a gym, apartments, exotic cars and in-game crypto trading.",
      "It launched on October 27, 2024 and was last updated by the developer on September 18, 2026. Servers hold up to 35 players, and owners of private servers get admin rights inside them, per the official description.",
    ],
    stats: [
      { label: "Developer", value: "flipsy's games" },
      { label: "Platform", value: "Roblox" },
      { label: "Genre", value: "Open World Role-Play" },
      { label: "Released", value: "October 27, 2024" },
      { label: "Price", value: "Free" },
    ],
    cta: { label: "Explore All Guides", href: "/guide" },
  },

  finalCta: {
    title: "Ready to Hit the Streets?",
    description: "From your first robbery to your first turf, every page here cites where its claims came from.",
    primary: { label: "Read the Beginner Guide", href: "/guide/street-life-remastered-beginner-guide" },
    secondary: { label: "Play on Roblox", href: "https://www.roblox.com/games/71600459831333/Street-Life-Remastered" },
  },

  footer: {
    aboutTitle: "Street Life Remastered Wiki",
    about:
      "An independent, fan-made Street Life Remastered reference. Not affiliated with flipsy's games or Roblox Corporation.",
    description: "Free Roblox open-world role-play game. Rob, run a gang, drive, or play cop.",
  },
} as const;

export type Site = typeof site;
