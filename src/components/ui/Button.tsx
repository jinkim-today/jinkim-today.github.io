import type { ComponentProps, ReactNode } from "react";

type Tone = "onBlue" | "onLight" | "accent";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[2px] px-5 py-3 font-mono text-base font-medium transition-colors duration-200";

const solid: Record<Tone, string> = {
  onBlue: "bg-cream text-blue hover:bg-white",
  onLight: "bg-blue text-cream hover:bg-blue-deep",
  accent: "bg-accent text-ink hover:bg-white",
};

const hover: Record<Tone, string> = {
  onBlue: "hover:bg-cream hover:text-blue hover:no-underline",
  onLight: "hover:bg-fg hover:text-bg hover:no-underline",
  accent: "hover:bg-cream hover:text-blue hover:no-underline",
};

type Props = {
  tone?: Tone;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"a">, "className" | "children">;

/** The one solid primary button. */
export function Button({
  tone = "onBlue",
  className = "",
  children,
  ...rest
}: Props) {
  return (
    <a className={`${base} ${solid[tone]} ${className}`} {...rest}>
      <span aria-hidden>&gt;</span>
      {children}
    </a>
  );
}

/** Secondary action: underlined text link with a trailing arrow that slides on hover. */
export function TextLink({
  tone = "onLight",
  className = "",
  children,
  ...rest
}: Omit<ComponentProps<"a">, "children"> & { children: ReactNode; tone?: Tone }) {
  return (
    <a
      className={`group inline-flex items-center gap-2 font-mono text-base font-medium underline decoration-1 underline-offset-[6px] transition-colors duration-150 ${hover[tone]} ${className}`}
      {...rest}
    >
      {children}
      <span
        aria-hidden
        className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1.5"
      >
        -&gt;
      </span>
    </a>
  );
}
