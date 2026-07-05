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

export default function HomePage() {
  return (
    <div className="container-page py-16">
      <p className="prose-news">MoliVerse 2.0 — coming together.</p>
    </div>
  );
}
