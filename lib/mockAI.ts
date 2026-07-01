import {
  ComparisonResult,
  FramingTag,
  LanguageOption,
  LessonPlan,
  Level,
  MediaPerspective,
} from "./types";

/**
 * Mock generators for the Media Comparison and Mentor pages, plus shared
 * option lists. Lesson content now lives in the dedicated content engine
 * (see lib/engine/*).
 */

const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

// ---------- Languages ----------

export const languages: LanguageOption[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "French", flag: "🇫🇷" },
  { code: "es", label: "Spanish", flag: "🇪🇸" },
  { code: "zh", label: "Chinese", flag: "🇨🇳" },
  { code: "ja", label: "Japanese", flag: "🇯🇵" },
  { code: "ko", label: "Korean", flag: "🇰🇷" },
  { code: "ar", label: "Arabic", flag: "🇸🇦" },
];

// ---------- Global Media Comparison ----------

type RegionBase = Omit<MediaPerspective, "headline" | "summary" | "framing">;

const regionTemplates: RegionBase[] = [
  { region: "United States", flag: "🇺🇸", outlet: "US National News", tone: "Critical", tags: ["Emotional framing", "Political framing", "Critical framing"] },
  { region: "France", flag: "🇫🇷", outlet: "Le Quotidien", tone: "Cautious", tags: ["Political framing", "Cultural framing"] },
  { region: "China", flag: "🇨🇳", outlet: "Global Daily", tone: "Optimistic", tags: ["Optimistic framing", "Economic framing"] },
  { region: "Southeast Asia", flag: "🌏", outlet: "ASEAN Today", tone: "Neutral", tags: ["Neutral language", "Economic framing"] },
];

const framings: Record<string, (t: string) => { headline: string; summary: string; framing: string }> = {
  "United States": (t) => ({
    headline: `${cap(t)} sparks fierce debate over rights and accountability`,
    summary: `Coverage centers on individual impact, political conflict, and who is responsible. Expert quotes and polling drive the story.`,
    framing: `Emphasizes controversy, individual freedom, and partisan disagreement.`,
  }),
  France: (t) => ({
    headline: `${cap(t)} : un débat sur les valeurs et la régulation`,
    summary: `Reporting frames the issue through ethics, regulation, and the role of the state, with cultural and historical context.`,
    framing: `Highlights social values, regulation, and intellectual debate.`,
  }),
  China: (t) => ({
    headline: `${cap(t)}: steady progress and collective benefit highlighted`,
    summary: `Coverage stresses stability, development, and coordinated solutions, focusing on long-term planning and shared outcomes.`,
    framing: `Emphasizes harmony, progress, and collective achievement.`,
  }),
  "Southeast Asia": (t) => ({
    headline: `${cap(t)}: regional impact and practical next steps`,
    summary: `Reporting looks at how the event affects local communities, trade, and cooperation between neighboring countries.`,
    framing: `Focuses on regional cooperation and practical, on-the-ground effects.`,
  }),
};

export function generateComparison(topicRaw: string): ComparisonResult {
  const topic = topicRaw.trim() || "the latest global event";
  const perspectives: MediaPerspective[] = regionTemplates.map((base) => {
    const f = framings[base.region](topic);
    return { ...base, ...f };
  });

  return {
    topic,
    perspectives,
    aiAnalysis: `Across these reports, the core facts about ${topic} stay similar — but each outlet emphasizes different values and priorities. The US frames it around conflict and accountability, France around ethics and regulation, China around long-term progress, and Southeast Asia around practical regional impact. The framing, not the facts, is what shapes how readers feel.`,
    reflection: {
      differences: `Notice how the same facts about ${topic} are organized around different priorities — rights, regulation, progress, or cooperation. The headline word choices already steer your emotions before you read a single fact.`,
      emotional: `The US and French versions tend to feel more confrontational or evaluative, while the Chinese and Southeast Asian versions read calmer and more solution-focused. Which one made you feel something first?`,
      missing: `Each version leaves something out: voices of ordinary people, opposing data, historical context, or uncertainty. Ask what you would still need to know before forming an opinion on ${topic}.`,
    },
  };
}

// ---------- Mentor lesson plans ----------

export function generateLessonPlan(input: {
  topic: string;
  level: Level;
  durationMin: number;
}): LessonPlan {
  const topic = input.topic.trim() || "media literacy through current events";
  return {
    topic,
    level: input.level,
    durationMin: input.durationMin,
    objective: `By the end, learners can discuss ${topic} using new vocabulary and explain how two news sources frame it differently.`,
    warmUp: `Show two real headlines about ${topic}. Ask: "Which one makes you more worried? Why?" (5 min discussion).`,
    activities: [
      { title: "Media Hook & Vocabulary", detail: `Read a short ${topic} headline together; pre-teach 6 key words with examples.`, minutes: 10 },
      { title: "Roleplay Dialogue", detail: `Learners act out a conversation reacting to the news, using target vocabulary.`, minutes: 8 },
      {
        title: "Discussion (mentor-led)",
        detail: `The human moment — learners compare two headlines and reason together.`,
        minutes: 12,
        discussion: true,
        points: [
          "Students compare two headlines about the same event.",
          "Students explain which framing feels more persuasive.",
          "Students discuss why — and what each version leaves out.",
        ],
      },
      { title: "Compare & Reflect", detail: `In pairs, list 3 framing differences and one missing perspective.`, minutes: 10 },
    ],
    milFocus: `Help learners ask: "Who made this? What is left out? How does it want me to feel?" about ${topic}.`,
    aiSuggestions: [
      `Generate a 6-word vocabulary set for "${topic}" at level ${input.level}.`,
      `Suggest a simpler paraphrase if learners struggle with the headline.`,
      `Offer 2 follow-up questions to deepen the media-literacy discussion.`,
      `Create an exit-ticket question that checks both language and critical thinking.`,
    ],
    homework: `Find one news story about ${topic} from your own country. Write 3 sentences: what it says, how it made you feel, and one thing it left out.`,
  };
}

// Tailwind classes for each framing tag (kept here so UI stays consistent).
export const framingTagStyles: Record<FramingTag, string> = {
  "Emotional framing": "bg-orange-100 text-orange-700",
  "Political framing": "bg-red-100 text-red-700",
  "Economic framing": "bg-amber-100 text-amber-700",
  "Cultural framing": "bg-purple-100 text-purple-700",
  "Neutral language": "bg-slate-100 text-slate-700",
  "Optimistic framing": "bg-green-100 text-green-700",
  "Critical framing": "bg-rose-100 text-rose-700",
};

// Suggestion lists used by the UI for example chips.
export const exampleTopics = [
  "AI regulation",
  "World Cup final",
  "climate summit",
  "space exploration",
  "a new music album",
  "electric cars",
];

export const exampleInterests = ["football", "AI", "music", "climate", "gaming", "fashion"];
