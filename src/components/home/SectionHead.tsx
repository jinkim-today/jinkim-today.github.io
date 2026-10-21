import { Reveal } from "./Reveal";

/** `compact` = slide variant: em-based sizing (scales with the slide) and no scroll reveal. */
export function SectionHead({ index, title, compact = false }: { index: string; title: string; compact?: boolean }) {
  if (compact) {
    return (
      <div className="mb-[0.5em] flex items-baseline gap-[0.5em] text-[1em]">
        <span className="text-[0.875em] font-semibold tabular-nums text-accent">{index}</span>
        <h2 className="m-0 text-[2.5em] font-extrabold leading-tight tracking-[-0.03em]">{title}</h2>
      </div>
    );
  }
  return (
    <Reveal>
      <div className="mb-8 flex items-baseline gap-4">
        <span className="text-sm font-semibold tabular-nums text-accent">{index}</span>
        <h2 className="h2-section m-0">{title}</h2>
      </div>
    </Reveal>
  );
}
