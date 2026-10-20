import type { ComponentProps } from "react";

export function Card({ className = "", ...rest }: ComponentProps<"div">) {
  return (
    <div
      className={`rounded-lg bg-card ${className}`}
      {...rest}
    />
  );
}
