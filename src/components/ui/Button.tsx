import type { ComponentProps, ReactNode } from "react";

type Variant = "solid" | "outline";
type Tone = "onBlue" | "onLight";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[2px] border px-5 py-3 text-base font-medium transition-colors duration-200";

const styles: Record<Tone, Record<Variant, string>> = {
  onBlue: {
    solid: "border-cream bg-cream text-blue hover:bg-white hover:border-white",
    outline: "border-cream text-cream hover:bg-cream hover:text-blue",
  },
  onLight: {
    solid: "border-blue bg-blue text-cream hover:bg-blue-deep hover:border-blue-deep",
    outline: "border-fg text-fg hover:bg-fg hover:text-bg",
  },
};

type Props = {
  variant?: Variant;
  tone?: Tone;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"a">, "className" | "children">;

export function Button({
  variant = "solid",
  tone = "onBlue",
  className = "",
  children,
  ...rest
}: Props) {
  return (
    <a className={`${base} ${styles[tone][variant]} ${className}`} {...rest}>
      {children}
    </a>
  );
}
