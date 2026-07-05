import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t-2 border-ink bg-paper">
      <div className="container-page flex flex-col items-start justify-between gap-3 py-8 sm:flex-row sm:items-center">
        <div className="font-serif text-sm text-ink-soft">
          <span className="font-bold text-ink">MoliVerse</span> · Perspective
          Literacy for the AI generation
        </div>
        <div className="flex items-center gap-5 font-sans text-xs text-ink-muted">
          <Link href="/" className="hover:text-accent">
            All events
          </Link>
          <span>UNESCO MIL Hackathon 2026</span>
        </div>
      </div>
    </footer>
  );
}
