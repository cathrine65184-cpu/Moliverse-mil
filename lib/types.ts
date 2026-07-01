export type Level = "A1" | "A2" | "B1" | "B2";

export type LanguageCode = "en" | "fr" | "es" | "zh" | "ja" | "ko" | "ar";

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  flag: string;
}

export interface VocabItem {
  word: string;
  meaning: string;
  example: string;
}

export interface DialogueLine {
  speaker: string;
  line: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answerIndex: number;
}

export interface SourceMedia {
  outlet: string;
  flag: string;
  headline: string;
  emphasis: string;
}

// ---------- Content engine (CEFR-graded lesson) ----------

export type Pos = "noun" | "verb" | "adjective" | "adverb" | "phrase";

/** A CEFR-tagged lexicon entry. */
export interface VocabEntry {
  word: string;
  pos: Pos;
  level: Level;
  gloss: string; // English meaning
  ipa?: string; // pronunciation hint / romanization
  theme: string;
  examples: string[]; // 1–3 natural example sentences in the target language
}

export interface DialogueTurn {
  speaker: string;
  role: string; // e.g. "curious", "skeptical"
  line: string;
  gloss?: string; // English gloss when target language ≠ English
}

export interface DialogueScript {
  scenario: string; // human label, e.g. "Reacting to the news"
  setting: string; // one line describing the situation
  register: "casual" | "neutral" | "formal";
  lines: DialogueTurn[];
}

export type ExerciseType =
  | "match"
  | "mcq"
  | "fill"
  | "order"
  | "translate"
  | "speak";

export interface MatchExercise {
  type: "match";
  instruction: string;
  pairs: { term: string; def: string }[];
}
export interface McqExercise {
  type: "mcq";
  instruction: string;
  prompt: string;
  options: string[];
  answer: number;
}
export interface FillExercise {
  type: "fill";
  instruction: string;
  before: string;
  after: string;
  options: string[];
  answer: number;
}
export interface OrderExercise {
  type: "order";
  instruction: string;
  tokens: string[];
  answer: string;
}
export interface TranslateExercise {
  type: "translate";
  instruction: string;
  prompt: string;
  sample: string;
}
export interface SpeakExercise {
  type: "speak";
  instruction: string;
  prompt: string;
}
export type Exercise =
  | MatchExercise
  | McqExercise
  | FillExercise
  | OrderExercise
  | TranslateExercise
  | SpeakExercise;

export interface GrammarTip {
  point: string;
  explanation: string;
  examples: string[];
}

/** Where this lesson sits in the wider learning path (Busuu-style). */
export interface LessonPath {
  unit: string;
  skill: string;
  stepIndex: number;
  totalSteps: number;
  nextSkill: string;
}

export interface LessonStage {
  key: string;
  title: string;
  icon: string;
}

export interface Lesson {
  meta: {
    topic: string;
    interest: string;
    level: Level;
    age: number;
    language: LanguageOption;
    estimatedMinutes: number;
    newWordCount: number;
    scenario: string;
    variant: number;
  };
  path: LessonPath;
  roadmap: LessonStage[];
  objectives: string[]; // CEFR "can-do" statements
  sourceMedia: SourceMedia[];
  mediaHook: {
    source: string;
    headline: string;
    summary: string;
  };
  framingInsight: { outlet: string; insight: string }[];
  vocabulary: VocabEntry[];
  grammar: GrammarTip;
  dialogue: DialogueScript;
  exercises: Exercise[];
  culturalInsight: string;
  reflectionQuestions: string[];
  review: { words: string[]; note: string }; // spaced repetition
}

export type FramingTag =
  | "Emotional framing"
  | "Political framing"
  | "Economic framing"
  | "Cultural framing"
  | "Neutral language"
  | "Optimistic framing"
  | "Critical framing";

export interface MediaPerspective {
  region: string;
  flag: string;
  outlet: string;
  headline: string;
  summary: string;
  framing: string;
  tags: FramingTag[];
  tone: "Neutral" | "Optimistic" | "Critical" | "Emotional" | "Cautious";
}

export interface ComparisonResult {
  topic: string;
  perspectives: MediaPerspective[];
  aiAnalysis: string;
  reflection: {
    differences: string;
    emotional: string;
    missing: string;
  };
}

export interface PlanActivity {
  title: string;
  detail: string;
  minutes: number;
  discussion?: boolean;
  points?: string[];
}

export interface LessonPlan {
  topic: string;
  level: Level;
  durationMin: number;
  objective: string;
  warmUp: string;
  activities: PlanActivity[];
  milFocus: string;
  aiSuggestions: string[];
  homework: string;
}

export interface MentorProfile {
  id: string;
  name: string;
  avatar: string;
  university: string;
  country: string;
  flag: string;
  speaks: string[];
  teaches: string[];
  interests: string[];
  intro: string;
  availability: string;
}

export interface LearnerProfile {
  name: string;
  avatar: string;
  country: string;
  flag: string;
  native: string;
  learning: string[];
  goals: string;
  interests: string[];
  intro: string;
}

