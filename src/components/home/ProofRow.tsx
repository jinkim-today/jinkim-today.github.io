import { proofStats } from "@/content/site";
import { StatNumber } from "@/components/ui/StatNumber";
import { Reveal } from "./Reveal";

/** `compact` = slide variant: em sizing, static numbers (no count-up), no scroll reveal. */
export function ProofRow({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <dl className="m-0 grid grid-cols-2 gap-[1.5em] border-y border-rule py-[1.5em] @5xl:grid-cols-4">
        {proofStats.map((s) => (
          <div key={s.label}>
            <dt className="text-[2.5em] font-extrabold @5xl:text-[3.5em] leading-none tracking-[-0.03em] tabular-nums">{s.value}</dt>
            <dd className="m-0 mt-[0.75em] max-w-[20ch] text-[0.875em] text-mute">{s.label}</dd>
          </div>
        ))}
      </dl>
    );
  }
  return (
    <Reveal>
      <dl className="m-0 grid grid-cols-2 gap-6 border-y border-rule py-10 md:grid-cols-4">
        {proofStats.map((s) => (
          <div key={s.label}>
            <dt className="text-5xl font-extrabold leading-none tracking-[-0.03em] tabular-nums md:text-6xl">
              <StatNumber value={s.value} />
            </dt>
            <dd className="m-0 mt-3 max-w-[20ch] text-sm text-mute">{s.label}</dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}
