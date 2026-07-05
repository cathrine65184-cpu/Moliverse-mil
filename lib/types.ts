export type Orientation =
  | "Public broadcaster"
  | "State-owned"
  | "Private / commercial"
  | "Left-leaning"
  | "Right-leaning"
  | "Centrist"
  | "Pan-Arab"
  | "Other";

export interface Source {
  outlet: string;
  country: string;
  flag: string;
  orientation: Orientation;
  accent: string;
  headline: string;
  contestedWords: string[];
  framingWord: string;
  tone: string;
  focus: string;
}

export interface ContestedTerm {
  term: string;
  accent: string;
  why: string;
}

export interface TimelineEntry {
  date: string;
  label: string;
}

export interface Event {
  slug: string;
  title: string;
  aliases: string[];
  category: string;
  date: string;
  standfirst: string;
  summary: string;
  sources: Source[];
  contestedTerms: ContestedTerm[];
  historicalContext: string;
  backgroundFacts: string[];
  timeline: TimelineEntry[];
  missingPerspectives: string;
  reflectionQuestions: string[];
}
