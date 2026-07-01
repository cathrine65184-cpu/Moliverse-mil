export default function SectionCard({
  icon,
  eyebrow,
  title,
  children,
  accent = false,
}: {
  icon: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        accent
          ? "border-brand-100 bg-brand-50"
          : "border-slate-100 bg-white shadow-card"
      }`}
    >
      <div className="mb-3 flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-lg shadow-sm">
          {icon}
        </span>
        <div>
          <p
            className={`text-[11px] font-semibold uppercase tracking-[0.12em] ${
              accent ? "text-brand-700" : "text-brand-600"
            }`}
          >
            {eyebrow}
          </p>
          <h3 className="text-base font-bold text-ink">{title}</h3>
        </div>
      </div>
      {children}
    </div>
  );
}
