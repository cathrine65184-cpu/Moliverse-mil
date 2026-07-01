/**
 * Client helper for real news.
 *
 * Calls our own server route (/api/news), which fetches real RSS feeds from
 * BBC, The Guardian, NYT, France 24, China Daily, Channel NewsAsia and
 * Al Jazeera server-side — no API key, no CORS issues.
 */

export interface RealArticle {
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
  summary?: string;
  framing?: string;
}

export interface NewsResponse {
  topic: string;
  sources: RealArticle[];
  all: RealArticle[];
  count: number;
  error?: string;
}

/** Fetch real, topic-filtered news grouped by region. */
export async function fetchRealNews(topic: string): Promise<NewsResponse> {
  const res = await fetch(`/api/news?topic=${encodeURIComponent(topic)}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`News request failed: ${res.status}`);
  const data = (await res.json()) as NewsResponse;
  return {
    topic: data.topic ?? topic,
    sources: (data.sources ?? []).map(enrich),
    all: (data.all ?? []).map(enrich),
    count: data.count ?? 0,
    error: data.error,
  };
}

function enrich(a: RealArticle): RealArticle {
  return { ...a, summary: summarizeArticle(a), framing: detectFraming(a) };
}

/** Extractive 2-sentence summary from the article description. */
export function summarizeArticle(article: RealArticle): string {
  const text = article.description || article.title || "";
  if (!text) return "No summary available for this article.";
  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 15);
  if (sentences.length === 0) return text.slice(0, 220);
  return sentences.slice(0, 2).join(" ");
}

/** Heuristic media-framing label from headline + description. */
export function detectFraming(article: RealArticle): string {
  const text = (article.title + " " + article.description).toLowerCase();
  if (/\b(crisis|threat|danger|collapse|warn|fear|attack|deadly|killed)\b/.test(text))
    return "Critical / alarmed";
  if (/\b(breakthrough|success|victory|hope|record|boost|surge|win)\b/.test(text))
    return "Optimistic";
  if (/\b(debate|controversial|dispute|divided|row|clash|slam)\b/.test(text))
    return "Political / contested";
  if (/\b(tragic|heartbreaking|inspiring|emotional|mourning)\b/.test(text))
    return "Emotional";
  return "Neutral / factual";
}
