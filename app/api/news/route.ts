import { NextRequest, NextResponse } from "next/server";
import Parser from "rss-parser";

// RSS feeds are fetched server-side (no CORS, no API key needed).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface FeedConfig {
  url: string;
  outlet: string;
  region: string;
  country: string;
  flag: string;
}

// Real publishers, grouped by region for multi-source comparison.
const FEEDS: FeedConfig[] = [
  { url: "https://rss.nytimes.com/services/xml/rss/nyt/World.xml", outlet: "The New York Times", region: "United States", country: "United States", flag: "🇺🇸" },
  { url: "http://rss.cnn.com/rss/edition_world.rss", outlet: "CNN", region: "United States", country: "United States", flag: "🇺🇸" },
  { url: "https://feeds.bbci.co.uk/news/world/rss.xml", outlet: "BBC News", region: "United Kingdom", country: "United Kingdom", flag: "🇬🇧" },
  { url: "https://www.theguardian.com/world/rss", outlet: "The Guardian", region: "United Kingdom", country: "United Kingdom", flag: "🇬🇧" },
  { url: "https://www.france24.com/en/rss", outlet: "France 24", region: "France", country: "France", flag: "🇫🇷" },
  { url: "http://www.chinadaily.com.cn/rss/world_rss.xml", outlet: "China Daily", region: "China", country: "China", flag: "🇨🇳" },
  { url: "https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml", outlet: "Channel NewsAsia", region: "Southeast Asia", country: "Singapore", flag: "🌏" },
  { url: "https://www.aljazeera.com/xml/rss/all.xml", outlet: "Al Jazeera", region: "Middle East", country: "Qatar", flag: "🌍" },
  // Section feeds broaden coverage for common learner topics (tech/AI, sport, business).
  { url: "https://www.theguardian.com/technology/rss", outlet: "The Guardian", region: "United Kingdom", country: "United Kingdom", flag: "🇬🇧" },
  { url: "https://feeds.bbci.co.uk/news/technology/rss.xml", outlet: "BBC News", region: "United Kingdom", country: "United Kingdom", flag: "🇬🇧" },
  { url: "https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml", outlet: "The New York Times", region: "United States", country: "United States", flag: "🇺🇸" },
  { url: "https://www.theguardian.com/football/rss", outlet: "The Guardian", region: "United Kingdom", country: "United Kingdom", flag: "🇬🇧" },
  { url: "https://rss.nytimes.com/services/xml/rss/nyt/Sports.xml", outlet: "The New York Times", region: "United States", country: "United States", flag: "🇺🇸" },
  { url: "https://www.theguardian.com/business/rss", outlet: "The Guardian", region: "United Kingdom", country: "United Kingdom", flag: "🇬🇧" },
  { url: "http://www.chinadaily.com.cn/rss/bizchina_rss.xml", outlet: "China Daily", region: "China", country: "China", flag: "🇨🇳" },
  { url: "https://www.france24.com/en/business/rss", outlet: "France 24", region: "France", country: "France", flag: "🇫🇷" },
];

export interface ApiArticle {
  id: string;
  outlet: string;
  region: string;
  country: string;
  flag: string;
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedAt: string;
}

const parser: Parser = new Parser({
  timeout: 9000,
  headers: { "User-Agent": "Mozilla/5.0 (MoliVerse/1.0)" },
  customFields: {
    item: [
      ["media:content", "mediaContent", { keepArray: true }],
      ["media:thumbnail", "mediaThumbnail"],
      ["enclosure", "enclosure"],
    ],
  },
});

// ---- Caching (in-memory, per server instance) ----
const FEED_TTL = 10 * 60 * 1000; // 10 min
const feedCache: Record<string, { items: ApiArticle[]; ts: number }> = {};

function stripHtml(s: string): string {
  return (s || "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function extractImage(item: any): string | undefined {
  if (item.enclosure?.url) return item.enclosure.url;
  if (item.mediaThumbnail?.$?.url) return item.mediaThumbnail.$.url;
  if (Array.isArray(item.mediaContent)) {
    const withUrl = item.mediaContent.find((m: any) => m?.$?.url);
    if (withUrl) return withUrl.$.url;
  }
  return undefined;
}

async function loadFeed(feed: FeedConfig): Promise<ApiArticle[]> {
  const cached = feedCache[feed.url];
  if (cached && Date.now() - cached.ts < FEED_TTL) return cached.items;

  const parsed = await parser.parseURL(feed.url);
  const items: ApiArticle[] = (parsed.items || [])
    .filter((i) => i.title && i.link)
    .slice(0, 40)
    .map((i, idx) => ({
      id: `${feed.outlet}-${idx}`,
      outlet: feed.outlet,
      region: feed.region,
      country: feed.country,
      flag: feed.flag,
      title: stripHtml(i.title || ""),
      description: stripHtml(i.contentSnippet || i.content || i.summary || ""),
      url: i.link || "",
      image: extractImage(i),
      publishedAt: i.isoDate || i.pubDate || new Date().toISOString(),
    }));

  feedCache[feed.url] = { items, ts: Date.now() };
  return items;
}

// Score an article by how well it matches the query terms.
function scoreArticle(a: ApiArticle, terms: string[]): number {
  if (terms.length === 0) return 1;
  const hay = (a.title + " " + a.description).toLowerCase();
  let score = 0;
  for (const t of terms) {
    // whole-word match to avoid "ai" matching "said"
    const re = new RegExp(`\\b${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
    if (re.test(a.title)) score += 3;
    else if (re.test(hay)) score += 1;
  }
  return score;
}

export async function GET(req: NextRequest) {
  const topic = (req.nextUrl.searchParams.get("topic") || "").trim();
  const terms = topic
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length >= 2);

  // Fetch all feeds in parallel; ignore any that fail.
  const results = await Promise.allSettled(FEEDS.map((f) => loadFeed(f)));
  const all: ApiArticle[] = [];
  results.forEach((r) => {
    if (r.status === "fulfilled") all.push(...r.value);
  });

  if (all.length === 0) {
    return NextResponse.json(
      { sources: [], all: [], error: "feeds_unavailable" },
      { status: 200 }
    );
  }

  // Score + filter by topic.
  const scored = all
    .map((a) => ({ a, score: scoreArticle(a, terms) }))
    .filter((x) => x.score > 0)
    .sort((x, y) => y.score - x.score || +new Date(y.a.publishedAt) - +new Date(x.a.publishedAt));

  const matched = scored.map((x) => x.a);

  // Group by region for the multi-source comparison (one per region).
  const preferredRegions = ["United States", "France", "China", "Southeast Asia", "United Kingdom", "Middle East"];
  const sources: ApiArticle[] = [];
  const usedRegions = new Set<string>();
  for (const region of preferredRegions) {
    const hit = matched.find((a) => a.region === region && !usedRegions.has(region));
    if (hit) {
      sources.push(hit);
      usedRegions.add(region);
    }
    if (sources.length >= 4) break;
  }

  return NextResponse.json({
    topic,
    sources,
    all: matched.slice(0, 12),
    count: matched.length,
  });
}
