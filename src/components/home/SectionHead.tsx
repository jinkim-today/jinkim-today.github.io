import { Reveal } from "./Reveal";

export function SectionHead({ index, title }: { index: string; title: string }) {
  return (
    <Reveal>
      <div className="mb-8 flex items-baseline gap-4">
        <span className="text-sm font-semibold tabular-nums text-accent">{index}</span>
        <h2 className="h2-section m-0">{title}</h2>
      </div>
    </Reveal>
  );
}
