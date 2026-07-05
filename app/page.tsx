import SearchGallery from "@/components/SearchGallery";
import { events } from "@/lib/events";

export default function HomePage() {
  return (
    <div className="container-page py-12">
      <div className="kicker">Perspective Literacy</div>
      <h1 className="mt-2 max-w-2xl font-serif text-4xl font-bold leading-[1.05] text-ink sm:text-5xl">
        One event. Many newsrooms. <span className="text-accent">Zero agreement.</span>
      </h1>
      <p className="mt-4 max-w-xl font-serif text-lg text-ink-soft">
        See how culture, history and politics shape the way the same story is told —
        and learn to think for yourself.
      </p>

      <div className="mt-10">
        <SearchGallery events={events} />
      </div>

      <section className="mt-16 rounded-md border border-rule bg-paper-card p-6">
        <div className="kicker">What is Perspective Literacy?</div>
        <p className="mt-2 prose-news max-w-2xl">
          The ability to recognise, compare and understand how culture, history,
          politics, language and media systems shape the way information is presented.
          We don't tell you who is right — we show you why the story changes with the
          storyteller.
        </p>
      </section>
    </div>
  );
}
