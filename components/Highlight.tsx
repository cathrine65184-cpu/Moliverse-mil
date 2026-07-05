import { Fragment } from "react";
function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default function Highlight({
  text,
  marks,
  accent = "#c0392b",
}: {
  text: string;
  marks: string[];
  accent?: string;
}) {
  const valid = marks.filter((m) => m && text.includes(m));
  if (valid.length === 0) return <>{text}</>;

  const pattern = new RegExp(`(${valid.map(escapeRegExp).join("|")})`, "g");
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, i) =>
        valid.includes(part) ? (
          <mark
            key={i}
            className="rounded-[2px] px-0.5"
            style={{ backgroundColor: `${accent}22`, color: "inherit" }}
          >
            {part}
          </mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
