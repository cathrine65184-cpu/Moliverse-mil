import {
  GrammarTip,
  LanguageOption,
  Lesson,
  LessonStage,
  Level,
  SourceMedia,
} from "@/lib/types";
import { hashString, makeRng, pick, Rng } from "./rng";
import { reviewWords, selectVocabulary, themesFor } from "./lexicon";
import { buildDialogue } from "./dialogue";
import { buildExercises } from "./exercises";

const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

const WORD_COUNT: Record<Level, number> = { A1: 5, A2: 6, B1: 7, B2: 8 };

const THEME_LABEL: Record<string, string> = {
  technology: "Technology & AI",
  sports: "Sport & Competition",
  music: "Music & Culture",
  environment: "Climate & Environment",
  media: "Media Literacy",
  economy: "Money & Economy",
  science: "Science & Discovery",
  culture: "Culture & Identity",
  daily: "Everyday Life",
  general: "Core Language",
};

const GRAMMAR: Record<Level, GrammarTip[]> = {
  A1: [
    { point: "Present simple", explanation: "Use the present simple for facts and routines: subject + base verb.", examples: ["I read the news every morning.", "She plays every weekend."] },
    { point: "a / an", explanation: "Use 'a' before consonant sounds and 'an' before vowel sounds.", examples: ["a team, a report", "an app, an opinion"] },
  ],
  A2: [
    { point: "Past simple", explanation: "Add -ed to regular verbs to talk about finished actions.", examples: ["They reported the story yesterday.", "We watched the match last night."] },
    { point: "Connectors: and / but / because", explanation: "Join short ideas into longer, more natural sentences.", examples: ["It was cheap but useful.", "I read it because it looked important."] },
  ],
  B1: [
    { point: "Giving opinions", explanation: "Signal your opinion, then support it with a reason.", examples: ["In my opinion the coverage is biased, because it quotes only one side.", "I believe framing matters, since it shapes how we feel."] },
    { point: "Comparatives", explanation: "Compare two things with -er or more … than.", examples: ["This report is more emotional than that one.", "The French version feels calmer than the US one."] },
  ],
  B2: [
    { point: "Hedging & nuance", explanation: "Soften claims so you sound balanced and academic.", examples: ["This arguably reflects a deeper bias.", "The data seems to suggest, rather than prove, a link."] },
    { point: "Passive for objectivity", explanation: "The passive hides who acted and sounds neutral — notice when media uses it.", examples: ["'Mistakes were made' — by whom?", "The policy was widely criticised."] },
  ],
};

const HOOK_SUMMARY: Record<Level, (t: string) => string> = {
  A1: (t) => `This story is about ${t}. It is in the news today.`,
  A2: (t) => `People are talking about ${t} because it feels important right now.`,
  B1: (t) => `Although the story about ${t} looks simple, different outlets explain it differently.`,
  B2: (t) => `Coverage of ${t} reveals how framing shapes what audiences ultimately believe.`,
};

function objectivesFor(level: Level, topic: string): string[] {
  const t = topic;
  const map: Record<Level, string[]> = {
    A1: [`I can recognise key words about ${t}.`, `I can understand a short, simple headline.`],
    A2: [`I can talk about ${t} in a few simple sentences.`, `I can find the main idea of a short report.`],
    B1: [`I can express and support my opinion about ${t}.`, `I can compare how two sources frame ${t}.`],
    B2: [`I can evaluate bias and framing in coverage of ${t}.`, `I can discuss ${t} with nuance and detail.`],
  };
  return map[level];
}

function buildSourceMedia(topic: string): {
  sources: SourceMedia[];
  insight: { outlet: string; insight: string }[];
} {
  const sources: SourceMedia[] = [
    { outlet: "CNN", flag: "🇺🇸", headline: `${cap(topic)}: pressure mounts as the story breaks worldwide`, emphasis: "urgency & conflict" },
    { outlet: "Le Monde", flag: "🇫🇷", headline: `${cap(topic)} : le débat se déplace vers la régulation`, emphasis: "regulation & ethics" },
    { outlet: "Xinhua", flag: "🇨🇳", headline: `${cap(topic)}: steady, long-term development highlighted`, emphasis: "long-term development" },
  ];
  const insight = [
    { outlet: "CNN", insight: "emphasizes urgency and conflict" },
    { outlet: "Le Monde", insight: "focuses on regulation and ethics" },
    { outlet: "Xinhua", insight: "emphasizes long-term development" },
  ];
  return { sources, insight };
}

const ROADMAP: LessonStage[] = [
  { key: "vocab", title: "Vocabulary", icon: "📚" },
  { key: "grammar", title: "Grammar", icon: "🧩" },
  { key: "dialogue", title: "Dialogue", icon: "💬" },
  { key: "practice", title: "Practice", icon: "✅" },
  { key: "reflect", title: "Reflection", icon: "🧠" },
  { key: "review", title: "Review", icon: "🔁" },
];

function buildPath(rng: Rng, theme: string, topic: string): Lesson["path"] {
  const unit = THEME_LABEL[theme] ?? "Core Language";
  const totalSteps = 5 + Math.floor(rng() * 4); // 5–8
  const stepIndex = 2 + Math.floor(rng() * (totalSteps - 2)); // 2 … totalSteps-1
  return {
    unit,
    skill: `${cap(topic)} in the news`,
    stepIndex,
    totalSteps,
    nextSkill: pick(rng, ["Spotting bias", "Comparing sources", "Opinion & debate", "Fact vs. opinion"]),
  };
}

export function generateLesson(input: {
  age: number;
  level: Level;
  interest: string;
  topic: string;
  language: LanguageOption;
  variant?: number;
}): Lesson {
  const topic = input.topic.trim() || "global news";
  const interest = input.interest.trim() || "world events";
  const lang = input.language.code;
  const variant = input.variant ?? 0;

  const seed = hashString(`${topic}|${interest}|${input.level}|${lang}`) ^ Math.imul(variant + 1, 2654435761);
  const rng = makeRng(seed >>> 0);

  const themes = themesFor(interest, topic);
  const primaryTheme = themes.find((t) => t !== "media" && t !== "daily") ?? themes[0];

  const count = WORD_COUNT[input.level];
  const vocabulary = selectVocabulary(rng, lang, themes, input.level, count);
  const dialogue = buildDialogue(rng, lang, topic, interest, vocabulary);
  const exercises = buildExercises(rng, lang, input.level, vocabulary, topic);
  const grammar = pick(rng, GRAMMAR[input.level]);
  const { sources, insight } = buildSourceMedia(topic);

  const estimatedMinutes = Math.round(4 + vocabulary.length * 0.7 + exercises.length * 1.5);

  return {
    meta: {
      topic,
      interest,
      level: input.level,
      age: input.age,
      language: input.language,
      estimatedMinutes,
      newWordCount: vocabulary.length,
      scenario: dialogue.scenario,
      variant,
    },
    path: buildPath(rng, primaryTheme, topic),
    roadmap: ROADMAP,
    objectives: objectivesFor(input.level, topic),
    sourceMedia: sources,
    mediaHook: {
      source: "Synthesized from 3 sources · Today",
      headline: `${cap(topic)}: how the world is telling this story`,
      summary: HOOK_SUMMARY[input.level](topic),
    },
    framingInsight: insight,
    vocabulary,
    grammar,
    dialogue,
    exercises,
    culturalInsight: `Around the world, ${topic} is reported through local values. A story that feels neutral in one country can sound dramatic in another — especially when it touches ${interest}. Noticing this difference is the first step toward media & information literacy.`,
    reflectionQuestions: [
      `What information is emphasized in the coverage of ${topic}?`,
      `What perspective or voice might be missing from these reports?`,
      `How might another country describe ${topic} differently?`,
    ],
    review: {
      words: reviewWords(rng, lang, input.level),
      note: "Words from earlier levels — quickly recall each meaning before you finish (spaced repetition).",
    },
  };
}
