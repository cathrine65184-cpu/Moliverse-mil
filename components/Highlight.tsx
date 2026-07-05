import { Fragment } from "react";

interface HighlightProps {
  text: string;
  marks: string[];
  accent?: string;
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default function Highlight({
  text,
  marks,
  accent = "#c0392b",
}: HighlightProps) {
  const presentMarks = [...new Set(marks)]
    .filter((mark) => mark && text.includes(mark))
    .sort((a, b) => b.length - a.length);

  if (presentMarks.length === 0) {
    return <>{text}</>;
  }

  const pattern = new RegExp(`(${presentMarks.map(escapeRegex).join("|")})`, "g");
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, index) => {
        if (presentMarks.includes(part)) {
          return (
            <mark key={`${part}-${index}`} style={{ backgroundColor: accent }}>
              {part}
            </mark>
          );
        }

        return <Fragment key={`text-${index}`}>{part}</Fragment>;
      })}
    </>
  );
}
