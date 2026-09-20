# 出海游戏热词站 · 可复用模板

来源方法：生财有术《AI产品（出海-热词游戏站）》8 月航海手册。
本仓库是手册**关卡 7「模板化」**的产物，刻意提前做，理由见下。

## 为什么先做模板

手册排的日程是选词后 12 到 14 天才上线，但它自己在关卡 4 也说
「花两天匆忙上线抢到先机的垃圾站，胜过两周后才来的完美站」。

2026-09-11 实测印证了这个矛盾：Anime Dice 搜索结果首页有 5 个 DR=0 的新站，
域名全部注册于 9/3 到 9/10 的八天内，命名高度同构。那是同一本手册的同期学员。
能在八天内上线的，只可能是手里已经有模板的人。

**结论：有没有模板，是这个赛道真正的入场券，不是选修。**

## 三层分离

| 层 | 位置 | 换游戏时 |
|---|---|---|
| 框架层 | `app/` `components/` `lib/` | 一行不改 |
| 配置层 | `config/site.config.ts` | 全改 |
| 内容层 | `content/<locale>/<category>/*.mdx` | 全换 |

`config/site.config.ts` 的字段结构刻意对齐手册关卡 3 那份 ChatGPT 调研提示词
输出的 JSON，手册流程产出的素材可以直接填，不用二次转换。

## 换一个游戏的完整步骤

1. 改 `config/site.config.ts`：游戏名、站名、meta、官方链接、主题色 HSL、
   导航分类、首页各区块文案
2. 清空 `content/en/`，按新分类建目录，一个关键词一个 `.mdx`
3. `npm run build` 通过即可上线。导航、路由、面包屑、canonical、sitemap、
   robots 全部自动跟随，**不需要碰任何代码**

## 硬规矩（不可协商）

### 一、每页必须有 `sources`

frontmatter 缺 `sources` 或为空数组，**构建直接失败**。这条由
`lib/content.ts` 强制，不是文档约定。

依据：2026 年 3 月与 8 月 Google 更新把 scaled content abuse 列为首要执法对象，
AI 内容农场流量掉 60% 到 80%。AI 写的内容不被罚，没人核实过的内容才被罚。

### 二、排名类结论必须有出处，禁的是「无出处的排名断言」，不是体裁本身

2026-09-13 修订：原规矩曾整体禁做 tier list / best build，理由是「AI 没玩过，
判断不了手感」。修订后改为——**允许做，但每一条排名结论必须满足下面至少
一条，并在正文写明依据**：

1. 游戏内客观数值（DPS / 成本 / 射程 / 稀有度），来自 Fandom 数据表或官方源
2. 交易市场实际成交价（如 Eldorado.gg 等），硬市场数据
3. 具体创作者实测视频（须标明视频标题、发布时间、实测结果）
4. 官方社区共识（官方 Discord、官方 value list 页面）

**不允许**：只给名次不给依据；用「普遍认为」「大家都说」这类模糊表述代替
出处；任何一条排名找不到上述四类来源之一，就写「待确认」，不要硬写。

非排名类品类维持原判断，本来就有唯一权威源头，直接对源核验：
兑换码（对开发者 Trello / 官方 Discord）、更新日志（对官方公告）、
装备与 boss 数据库（对游戏内实测）、新手指南（对官方教程）

### 三、不确定的一律写 `待确认`

禁止编造数值、角色名、兑换码。拿不准就留 `待确认`，
核实后再填。宁可页面缺一块，不要错一个数。

### 四、复用模板上线新站时必查

`robots.txt`、`sitemap.xml`、配置里不得残留上一个站的游戏名、域名、路径。
残留会被 Google 判为重复内容，两个站一起受影响。

## 本地命令

```
npm run dev     # 开发
npm run build   # 构建，同时跑 sources 强制校验
npm run start   # 本地起生产服务
```

## 当前状态

**本仓库是第 4 个站：Street Life Remastered Wiki**（Roblox），由模板复制而来，模板本身在
`game-wiki-template`。上面的规则全部沿用，下面只写这个站自己的状态。

- 域名 `streetliferemastered.wiki`，仓库 `Fenghuang-huoyan/street-life-remastered-guide`（公开），
  Vercel 项目 `street-life-remastered-guide`，已连 GitHub，推送 `main` 自动部署。
- 上线 2026-09-20。DNS 为双 A 记录 `216.198.79.1` + `64.29.17.1`。
- GA 衡量 ID `G-GQPY9T83Z5`，通过 Vercel 环境变量 `NEXT_PUBLIC_GA_ID` 注入。
- GSC：网址前缀资源，HTML 文件验证（`public/googlecd0c2023df974c23.html`，各站通用，不要删）。
- 内容 9 页（`content/en/<分类>/`）：guide、money、robberies、gangs、guns、cars、achievements、
  admin、codes。每页都有 `sources`，玩法数字来自读过字幕的 YouTube 实测视频（页内标了视频标题和
  日期）、Roblox 官方 API 和一家第三方兑换码追踪站。
- 兑换码页如实写"没有官方可兑换码"，不许编码。管理员页不写具体命令写法（没读到），标待确认。
- **不做**：cheats / script / 外挂类内容。**没做**：准星、职业两类页面（没有读过的可靠来源）。
- 图片：官方 API 只有 6 张宣传图加游戏图标，全部自托管在 `public/images/official/`，
  Badges、Admin、Codes 三类共用游戏图标，不硬凑无关图。
- 更新内容时注意：玩法数字会随游戏更新变化，改数字必须同时改页内的视频日期和 `updated`。

相关记录见知识库 `Claude\项目\出海游戏热词站_第4站交接_2026-09-19.md` 和 `游戏站矩阵.md`。
