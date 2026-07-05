import { Event } from "@/lib/types";

export function validateEvent(e: Event): string[] {
  const problems: string[] = [];
  if (!e.slug) problems.push("missing slug");
  if (!e.title) problems.push("missing title");
  if (e.sources.length < 2) problems.push("needs at least 2 sources");
  if (e.contestedTerms.length < 2) problems.push("needs at least 2 contested terms");
  if (e.backgroundFacts.length < 1) problems.push("needs at least 1 background fact");
  if (e.reflectionQuestions.length < 1) problems.push("needs at least 1 reflection question");

  const terms = new Set(e.contestedTerms.map((t) => t.term));
  for (const s of e.sources) {
    if (!terms.has(s.framingWord)) {
      problems.push(`source ${s.outlet}: framingWord "${s.framingWord}" has no contested term`);
    }
    for (const w of s.contestedWords) {
      if (!s.headline.includes(w)) {
        problems.push(`source ${s.outlet}: "${w}" not in headline`);
      }
    }
  }
  return problems;
}
