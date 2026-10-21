import { proofStats } from "@/content/site";
import { StatNumber } from "@/components/ui/StatNumber";
import { Reveal } from "./Reveal";

export function ProofRow() {
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
