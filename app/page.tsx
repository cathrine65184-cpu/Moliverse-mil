import Link from "next/link";

const features = [
  {
    badge: "Real articles",
    title: "Real News Comparison",
    desc: "Search any topic and instantly see authentic news from around the world — with real sources, real publishers, and real framing differences.",
    href: "/news",
    cta: "Explore real news",
    icon: "🔍",
  },
  {
    badge: "Step 01 · Learn from media",
    title: "Media Lesson Generator",
    desc: "AI transforms real-world media into a structured lesson in any of 7 languages — grounded in real sources, with framing insight and reflection built in.",
    href: "/lesson",
    cta: "Generate a lesson",
    icon: "📰",
  },
  {
    badge: "Step 02 · Compare narratives",
    title: "Media Literacy Engine",
    desc: "See how the US, France, China, and Southeast Asia frame the same event — tagged by framing type, with an AI analysis of what shapes perception.",
    href: "/compare",
    cta: "Compare coverage",
    icon: "🌍",
  },
  {
    badge: "Step 03 · Discuss with a mentor",
    title: "Mentor Mode",
    desc: "Real university mentors lead the discussion. AI only prepares the material — humans build understanding through intercultural dialogue.",
    href: "/mentor",
    cta: "Meet your mentor",
    icon: "🎓",
  },
];

const flow = [
  { step: "1", label: "Landing" },
  { step: "2", label: "Generate Lesson" },
  { step: "3", label: "Compare Global Media" },
  { step: "4", label: "Discuss With Mentor" },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/3 h-72 w-[34rem] -translate-x-1/2 rounded-full bg-periwinkle/40 blur-3xl" />
          <div className="absolute -top-16 right-0 h-64 w-[28rem] rounded-full bg-aqua/25 blur-3xl" />
        </div>
        <div className="container-page grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
          <div>
            <span className="chip mb-5">UNESCO Youth Hackathon 2026</span>
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl">
              Learn Languages Through{" "}
              <span className="text-brand">Real-World Media</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
              MoliVerse transforms news and global events into personalized
              language lessons — while teaching you to think critically about how
              information is framed.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/lesson" className="btn-primary">
                Start Learning
              </Link>
              <Link href="/mentor" className="btn-secondary">
                Become a Mentor
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-ink-soft">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand" /> Media-driven
                lessons
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand" /> Built-in media
                literacy
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand" /> AI mentor tools
              </span>
            </div>
          </div>

          {/* Hero preview card */}
          <div className="card relative p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="section-eyebrow">Sample lesson</span>
              <span className="chip">B1 · AI</span>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                📰 Media hook
              </p>
              <p className="mt-1 font-semibold text-ink">
                AI regulation: lawmakers race to set new rules
              </p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              {["algorithm", "regulation", "bias", "automation"].map((w) => (
                <div
                  key={w}
                  className="rounded-lg border border-slate-100 px-3 py-2 font-medium text-ink-muted"
                >
                  {w}
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-brand-100 bg-brand-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
                🧠 MIL question
              </p>
              <p className="mt-1 text-sm text-ink">
                Why is this news framed as a “race” — and who benefits from that
                urgency?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-slate-100 bg-floral py-16 sm:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-eyebrow">Four integrated tools</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink">
              Real news → lessons → compare → discuss → learn
            </h2>
            <p className="mt-3 text-ink-muted">
              Not three separate AI tools — one integrated system for language
              learning and Media &amp; Information Literacy (MIL).
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <Link
                key={f.title}
                href={f.href}
                className="card group flex flex-col p-6 transition hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-xl">
                    {f.icon}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                    {f.badge}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-ink">{f.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                  {f.desc}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 group-hover:gap-2">
                  {f.cta} <span aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Demo flow */}
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <div className="card flex flex-col items-center gap-8 p-8 sm:p-12">
            <div className="text-center">
              <span className="section-eyebrow">Demo flow</span>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink">
                Follow the four-step journey
              </h2>
              <p className="mt-2 text-sm text-ink-muted">
                AI prepares the lesson · Real people build understanding · Media
                creates discussion · Language connects cultures
              </p>
            </div>
            <div className="flex w-full flex-wrap items-center justify-center gap-3">
              {flow.map((f, i) => (
                <div key={f.label} className="flex items-center gap-3">
                  <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-card">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                      {f.step}
                    </span>
                    <span className="text-sm font-semibold text-ink">
                      {f.label}
                    </span>
                  </div>
                  {i < flow.length - 1 && (
                    <span className="text-brand-300" aria-hidden>
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
            <Link href="/lesson" className="btn-primary">
              Start the demo →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
