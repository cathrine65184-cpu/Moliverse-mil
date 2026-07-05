import { Event } from "@/lib/types";

export function validateEvent(e: Event): string[] {
  const problems: string[] = [];
  if (!e.slug) problems.push("missing slug");
  if (!e.title) problems.push("missing title");
  if (e.sources.length !== 4) problems.push("needs exactly 4 sources");
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
    if (!s.url) problems.push(`source ${s.outlet}: missing url`);
    if (!s.archiveUrl) problems.push(`source ${s.outlet}: missing archiveUrl`);
    if (!s.publishDate) problems.push(`source ${s.outlet}: missing publishDate`);
    if (!s.insight) problems.push(`source ${s.outlet}: missing insight`);
  }
  for (const f of e.backgroundFacts) {
    if (!f.text) problems.push("background fact: missing text");
    if (!f.url) problems.push(`background fact "${f.text}": missing citation url`);
  }
  if (!e.methodology) problems.push("missing methodology");
  return problems;
}
