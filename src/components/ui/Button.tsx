import type { ComponentProps, ReactNode } from "react";

type Props = {
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"a">, "className" | "children">;

/** The one solid primary button: ink fill, accent on hover. */
export function Button({ className = "", children, ...rest }: Props) {
  return (
    <a
      className={`inline-flex items-center justify-center rounded-full bg-fg px-6 py-3 text-base font-semibold text-bg transition-colors duration-200 hover:bg-accent hover:text-white ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}

/** Secondary action: plain text link, underline on hover. */
export function TextLink({
  className = "",
  children,
  ...rest
}: Omit<ComponentProps<"a">, "children"> & { children: ReactNode }) {
  return (
    <a
      className={`text-base font-semibold underline-offset-4 transition-colors duration-150 hover:text-accent hover:underline ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}

