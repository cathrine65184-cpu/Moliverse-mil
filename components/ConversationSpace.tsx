"use client";

import { useState } from "react";
import { currentLearner, mentors } from "@/lib/profiles";

interface Comment {
  author: string;
  avatar: string;
  role: "Mentor" | "Learner";
  text: string;
}

const mentor = mentors[0];

const sections: {
  title: string;
  prompts: string[];
  seed: Comment[];
}[] = [
  {
    title: "Before today's lesson",
    prompts: [
      "Introduce yourself",
      "Where are you from?",
      "Why are you learning this language?",
    ],
    seed: [
      {
        author: currentLearner.name,
        avatar: currentLearner.avatar,
        role: "Learner",
        text: "Hi! I'm from Malaysia and I'm learning French through international news.",
      },
      {
        author: mentor.name,
        avatar: mentor.avatar,
        role: "Mentor",
        text: "Welcome! We both love football — let's start with a sports headline.",
      },
    ],
  },
  {
    title: "After reading the media",
    prompts: [
      "How is this story reported in your country?",
      "What surprised you?",
      "Do you agree with this framing?",
    ],
    seed: [
      {
        author: currentLearner.name,
        avatar: currentLearner.avatar,
        role: "Learner",
        text: "In my country the same event sounded much calmer. The US headline felt more dramatic.",
      },
    ],
  },
  {
    title: "Reflection",
    prompts: [
      "What will you look for next time you read the news?",
      "Mentor & learner can both leave a note",
    ],
    seed: [
      {
        author: mentor.name,
        avatar: mentor.avatar,
        role: "Mentor",
        text: "Great observation. Next time, ask who is quoted — and who is missing.",
      },
    ],
  },
];

export default function ConversationSpace() {
  const [threads, setThreads] = useState<Comment[][]>(
    sections.map((s) => s.seed)
  );
  const [drafts, setDrafts] = useState<string[]>(sections.map(() => ""));

  function post(i: number) {
    const text = drafts[i].trim();
    if (!text) return;
    setThreads((prev) =>
      prev.map((t, idx) =>
        idx === i
          ? [
              ...t,
              {
                author: currentLearner.name,
                avatar: currentLearner.avatar,
                role: "Learner",
                text,
              },
            ]
          : t
      )
    );
    setDrafts((prev) => prev.map((d, idx) => (idx === i ? "" : d)));
  }

  return (
    <div className="card p-6">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-lg">
          💬
        </span>
        <div>
          <p className="section-eyebrow">Conversation space</p>
          <h3 className="text-base font-bold text-ink">
            A guided space for intercultural dialogue
          </h3>
        </div>
      </div>
      <p className="mt-2 text-sm text-ink-muted">
        Not a social network — a structured place where a mentor and learner
        build understanding together.
      </p>

      {/* Participants */}
      <div className="mt-4 flex flex-wrap gap-2">
        <Participant emoji={mentor.avatar} name={mentor.name} role="Mentor" />
        <Participant
          emoji={currentLearner.avatar}
          name={currentLearner.name}
          role="Learner"
        />
      </div>

      <div className="mt-6 space-y-6">
        {sections.map((s, i) => (
          <div key={s.title} className="rounded-xl border border-slate-100 p-4">
            <h4 className="font-bold text-ink">{s.title}</h4>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {s.prompts.map((p) => (
                <span
                  key={p}
                  className="rounded-full bg-slate-50 px-2.5 py-1 text-xs text-ink-muted"
                >
                  {p}
                </span>
              ))}
            </div>

            <div className="mt-4 space-y-3">
              {threads[i].map((c, ci) => (
                <div key={ci} className="flex gap-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-lg">
                    {c.avatar}
                  </span>
                  <div className="rounded-xl rounded-tl-sm bg-slate-50 px-3 py-2">
                    <p className="text-xs font-semibold text-ink">
                      {c.author}{" "}
                      <span
                        className={`ml-1 rounded-full px-1.5 py-0.5 text-[10px] font-medium ${
                          c.role === "Mentor"
                            ? "bg-brand-100 text-brand-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {c.role}
                      </span>
                    </p>
                    <p className="mt-0.5 text-sm text-ink-muted">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 flex gap-2">
              <input
                className="input flex-1"
                value={drafts[i]}
                onChange={(e) =>
                  setDrafts((prev) =>
                    prev.map((d, idx) => (idx === i ? e.target.value : d))
                  )
                }
                onKeyDown={(e) => e.key === "Enter" && post(i)}
                placeholder="Share your thoughts…"
              />
              <button
                type="button"
                onClick={() => post(i)}
                className="btn-primary px-4 py-2 text-sm"
              >
                Post
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Participant({
  emoji,
  name,
  role,
}: {
  emoji: string;
  name: string;
  role: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-slate-100 bg-white px-3 py-1.5 shadow-card">
      <span className="text-lg">{emoji}</span>
      <span className="text-sm font-semibold text-ink">{name}</span>
      <span className="text-xs text-ink-soft">· {role}</span>
    </div>
  );
}
