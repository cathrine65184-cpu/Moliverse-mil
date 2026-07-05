import type { Orientation, Source } from "@/lib/types";

export interface HeadlineToken {
  text: string;
  contested: boolean;
}

const ALL_ORIENTATIONS: Orientation[] = [
  "Public broadcaster",
  "State-owned",
  "Private / commercial",
  "Left-leaning",
  "Right-leaning",
  "Centrist",
  "Pan-Arab",
  "Other",
];

export function tokenizeHeadline(
  headline: string,
  contestedWords: string[],
): HeadlineToken[] {
  const phrases = [...new Set(contestedWords.filter((word) => word.length > 0))]
    .filter((word) => headline.includes(word))
    .sort((left, right) => right.length - left.length);
  const tokens: HeadlineToken[] = [];

  if (phrases.length === 0) {
    for (const word of headline.split(/\s+/).filter(Boolean)) {
      tokens.push({ text: word, contested: false });
    }
    return tokens;
  }

  let cursor = 0;

  while (cursor < headline.length) {
    let contestedMatch: string | undefined;

    for (const phrase of phrases) {
      if (headline.startsWith(phrase, cursor)) {
        contestedMatch = phrase;
        break;
      }
    }

    if (contestedMatch) {
      tokens.push({ text: contestedMatch, contested: true });
      cursor += contestedMatch.length;
      continue;
    }

    const nextContestedIndex = phrases.reduce((earliest, phrase) => {
      const index = headline.indexOf(phrase, cursor);

      if (index === -1) {
        return earliest;
      }

      return earliest === -1 ? index : Math.min(earliest, index);
    }, -1);

    const plainText =
      nextContestedIndex === -1
        ? headline.slice(cursor)
        : headline.slice(cursor, nextContestedIndex);

    for (const word of plainText.split(/\s+/).filter(Boolean)) {
      tokens.push({ text: word, contested: false });
    }

    cursor += plainText.length;
  }

  return tokens;
}

export function orientationOptions(sources: Source[]): Orientation[] {
  const options = [...new Set(sources.map((source) => source.orientation))];

  for (const orientation of ALL_ORIENTATIONS) {
    if (options.length >= 4) {
      break;
    }

    if (!options.includes(orientation)) {
      options.push(orientation);
    }
  }

  const shuffled = [...options];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [
      shuffled[swapIndex],
      shuffled[index],
    ];
  }

  return shuffled;
}
