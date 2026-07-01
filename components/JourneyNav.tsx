import Link from "next/link";

const steps = [
  { n: 1, label: "Generate Lesson", href: "/lesson", icon: "📰" },
  { n: 2, label: "Compare Global Media", href: "/compare", icon: "🌍" },
  { n: 3, label: "Discuss With Mentor", href: "/mentor", icon: "🎓" },
];

/**
 * The MoliVerse learning loop, shown on every step so the three pages feel
 * like one workflow. `current` highlights the active step.
 */
export default function JourneyNav({ current }: { current: 1 | 2 | 3 }) {
  return (
    <nav aria-label="Learning journey" className="mb-8">
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-100 bg-white p-2 shadow-card">
        {steps.map((s, i) => {
          const active = s.n === current;
          const done = s.n < current;
          return (
            <div key={s.n} className="flex items-center gap-2">
              <Link
                href={s.href}
                aria-current={active ? "step" : undefined}
                className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-brand text-white shadow-lift"
                    : "text-ink-muted hover:bg-brand-50 hover:text-brand-700"
                }`}
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                    active
                      ? "bg-white/20 text-white"
                      : done
                      ? "bg-brand-100 text-brand-700"
                      : "bg-slate-100 text-ink-soft"
                  }`}
                >
                  {done ? "✓" : s.n}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
                <span className="sm:hidden">{s.icon}</span>
              </Link>
              {i < steps.length - 1 && (
                <span className="text-brand-300" aria-hidden>
                  →
                </span>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
