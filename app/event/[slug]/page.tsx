import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BackgroundFacts from "@/components/BackgroundFacts";
import ContestedWordStrip from "@/components/ContestedWordStrip";
import FramingExplainer from "@/components/FramingExplainer";
import ReflectionPrompts from "@/components/ReflectionPrompts";
import SourceHeadline from "@/components/SourceHeadline";
import { events, getEvent } from "@/lib/events";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const event = getEvent(params.slug);

  if (!event) {
    return { title: "Event not found — MoliVerse" };
  }

  return {
    title: `${event.title} — MoliVerse`,
    description: event.summary,
  };
}

function SectionLabel({
  n,
  children,
  green,
}: {
  n: string;
  children: React.ReactNode;
  green?: boolean;
}) {
  return <div className={`mt-10 ${green ? "kicker-green" : "kicker"}`}>{n} {children}</div>;
}

export default function EventPage({ params }: { params: { slug: string } }) {
  const event = getEvent(params.slug);

  if (!event) {
    notFound();
  }

  return (
    <article className="container-page py-10">
      <div className="kicker">Event Dossier · {event.date}</div>
      <h1 className="mt-1 font-serif text-4xl font-bold leading-none text-ink sm:text-5xl">
        {event.title}
      </h1>
      <p className="mt-2 border-b border-rule pb-5 font-serif text-lg italic text-ink-soft">
        {event.standfirst}
      </p>

      <SectionLabel n="①">The same event, {event.sources.length} headlines</SectionLabel>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {event.sources.map((s) => (
          <SourceHeadline key={s.outlet} source={s} />
        ))}
      </div>

      <div className="mt-4">
        <ContestedWordStrip terms={event.contestedTerms} />
      </div>

      <SectionLabel n="②">Why the words differ</SectionLabel>
      <div className="mt-3">
        <FramingExplainer
          terms={event.contestedTerms}
          historicalContext={event.historicalContext}
        />
      </div>

      <SectionLabel n="③" green>
        What everyone agrees on
      </SectionLabel>
      <div className="mt-3">
        <BackgroundFacts facts={event.backgroundFacts} timeline={event.timeline} />
      </div>

      <SectionLabel n="④">What&apos;s left out</SectionLabel>
      <p className="mt-2 prose-news border-l-2 border-rule pl-4 italic">
        {event.missingPerspectives}
      </p>

      <SectionLabel n="⑤">Think for yourself</SectionLabel>
      <div className="mt-3">
        <ReflectionPrompts
          slug={event.slug}
          questions={event.reflectionQuestions}
        />
      </div>

      <div className="mt-12 border-t border-rule pt-5">
        <Link href="/" className="font-sans text-sm text-accent hover:underline">
          ← Back to all events
        </Link>
      </div>
    </article>
  );
}
