import Link from "next/link";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-floral">
      <div className="container-page flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <div className="flex items-center gap-3">
          <Logo withTagline />
          <span className="hidden text-sm text-ink-soft sm:inline">
            · Media-driven language learning
          </span>
        </div>
        <div className="flex items-center gap-5 text-sm text-ink-soft">
          <Link href="/lesson" className="hover:text-brand">
            Lessons
          </Link>
          <Link href="/compare" className="hover:text-brand">
            Compare
          </Link>
          <Link href="/mentor" className="hover:text-brand">
            Mentor
          </Link>
          <span className="hidden text-ink-soft sm:inline">
            UNESCO Youth Hackathon 2026
          </span>
        </div>
      </div>
    </footer>
  );
}
