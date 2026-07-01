import { Exercise, LanguageCode, Level, VocabEntry } from "@/lib/types";
import { pick, Rng, sample, shuffle } from "./rng";
import { distractorGlosses, distractorWords } from "./lexicon";

const SPACED_LANGS: LanguageCode[] = ["en", "fr", "es"];

function optionsWithAnswer(rng: Rng, answer: string, distractors: string[]) {
  const opts = shuffle(rng, [answer, ...distractors]);
  return { options: opts, answer: opts.indexOf(answer) };
}

function makeMatch(rng: Rng, vocab: VocabEntry[]): Exercise {
  const chosen = sample(rng, vocab, Math.min(4, vocab.length));
  return {
    type: "match",
    instruction: "Match each word to its meaning.",
    pairs: chosen.map((e) => ({ term: e.word, def: e.gloss })),
  };
}

function makeMcq(rng: Rng, lang: LanguageCode, vocab: VocabEntry[]): Exercise {
  const e = pick(rng, vocab);
  const { options, answer } = optionsWithAnswer(
    rng,
    e.gloss,
    distractorGlosses(rng, lang, e.gloss, 3)
  );
  return {
    type: "mcq",
    instruction: "Choose the correct meaning.",
    prompt: e.word,
    options,
    answer,
  };
}

// Find a place in an example where the word stands alone, so we can blank it.
function blankFrom(rng: Rng, entry: VocabEntry): { before: string; after: string } | null {
  const w = entry.word;
  const isLetter = (c: string | undefined) => c !== undefined && /[A-Za-zÀ-ÿ]/.test(c);
  for (const ex of shuffle(rng, entry.examples)) {
    const lower = ex.toLowerCase();
    let idx = lower.indexOf(w.toLowerCase());
    while (idx !== -1) {
      const before = ex[idx - 1];
      const after = ex[idx + w.length];
      if (!isLetter(before) && !isLetter(after)) {
        return { before: ex.slice(0, idx), after: ex.slice(idx + w.length) };
      }
      idx = lower.indexOf(w.toLowerCase(), idx + 1);
    }
  }
  return null;
}

function makeFill(rng: Rng, lang: LanguageCode, vocab: VocabEntry[]): Exercise | null {
  for (const e of shuffle(rng, vocab)) {
    const b = blankFrom(rng, e);
    if (b) {
      const { options, answer } = optionsWithAnswer(
        rng,
        e.word,
        distractorWords(rng, lang, e.word, 3)
      );
      return {
        type: "fill",
        instruction: "Complete the sentence with the right word.",
        before: b.before,
        after: b.after,
        options,
        answer,
      };
    }
  }
  return null;
}

function makeOrder(rng: Rng, vocab: VocabEntry[]): Exercise | null {
  const candidates = vocab
    .flatMap((e) => e.examples)
    .filter((s) => {
      const words = s.replace(/[.?!]$/, "").split(/\s+/);
      return words.length >= 4 && words.length <= 8;
    });
  if (candidates.length === 0) return null;
  const sentence = pick(rng, candidates);
  const clean = sentence.replace(/\s+/g, " ").trim();
  const tokens = shuffle(rng, clean.replace(/[.?!]$/, "").split(" "));
  return {
    type: "order",
    instruction: "Put the words in the correct order.",
    tokens,
    answer: clean,
  };
}

function makeTranslate(rng: Rng, topic: string): Exercise {
  return {
    type: "translate",
    instruction: "Your turn — produce a sentence (self-check).",
    prompt: pick(rng, [
      `Write one sentence giving your opinion about ${topic}.`,
      `Describe ${topic} in one sentence, using a new word.`,
      `Write a sentence about how ${topic} is reported in your country.`,
    ]),
    sample: pick(rng, [
      `In my opinion, ${topic} matters because it affects many people.`,
      `The coverage of ${topic} changes a lot from country to country.`,
      `I think the framing of ${topic} makes readers feel a certain way.`,
    ]),
  };
}

function makeSpeak(rng: Rng, topic: string): Exercise {
  return {
    type: "speak",
    instruction: "Speaking practice — say it aloud.",
    prompt: pick(rng, [
      `Explain your view on ${topic} in two sentences. Try to use two new words.`,
      `Summarise ${topic} aloud, then say one question you still have.`,
    ]),
  };
}

/** Assemble a level-appropriate set of exercises (progression: easier → harder). */
export function buildExercises(
  rng: Rng,
  lang: LanguageCode,
  level: Level,
  vocab: VocabEntry[],
  topic: string
): Exercise[] {
  const canOrder = SPACED_LANGS.includes(lang);
  const out: Exercise[] = [];
  const add = (ex: Exercise | null) => {
    if (ex) out.push(ex);
  };

  // Recognition first, production later — scaled by CEFR level.
  if (level === "A1") {
    add(makeMatch(rng, vocab));
    add(makeMcq(rng, lang, vocab));
    add(makeFill(rng, lang, vocab));
  } else if (level === "A2") {
    add(makeMatch(rng, vocab));
    add(makeMcq(rng, lang, vocab));
    add(makeFill(rng, lang, vocab));
    add(canOrder ? makeOrder(rng, vocab) : makeMcq(rng, lang, vocab));
  } else if (level === "B1") {
    add(makeMcq(rng, lang, vocab));
    add(makeFill(rng, lang, vocab));
    add(canOrder ? makeOrder(rng, vocab) : makeMatch(rng, vocab));
    add(makeTranslate(rng, topic));
  } else {
    add(makeFill(rng, lang, vocab));
    add(canOrder ? makeOrder(rng, vocab) : makeMcq(rng, lang, vocab));
    add(makeTranslate(rng, topic));
    add(makeSpeak(rng, topic));
  }

  // Guarantee at least 3 exercises even if a generator bailed out.
  while (out.length < 3) add(makeMcq(rng, lang, vocab));
  return out;
}
