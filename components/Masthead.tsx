import Link from "next/link";

export default function Masthead() {
  return (
    <header className="border-b-2 border-ink bg-paper">
      <div className="container-page flex items-baseline justify-between py-4">
        <Link
          href="/"
          className="font-serif text-2xl font-bold tracking-tight text-ink"
        >
          MoliVerse
        </Link>
        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-ink-muted">
          The Perspective Desk
        </span>
      </div>
    </header>
  );
}
