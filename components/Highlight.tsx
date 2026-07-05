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
  const valid = [...new Set(marks.filter((m) => m && text.includes(m)))].sort(
    (a, b) => b.length - a.length,
  );
  if (valid.length === 0) return <>{text}</>;

  const validSet = new Set(valid);
  const pattern = new RegExp(`(${valid.map(escapeRegExp).join("|")})`, "g");
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, i) =>
        validSet.has(part) ? (
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
