import type { ReactNode } from "react";

// Pure CSS marquee: pauses on hover and keyboard focus, static under reduced motion.
export function Marquee({ children }: { children: ReactNode }) {
  return (
    <div className="marquee overflow-hidden">
      <div className="marquee-track">
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
