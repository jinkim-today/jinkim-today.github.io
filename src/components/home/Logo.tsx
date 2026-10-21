import Image from "next/image";
import type { LogoTone } from "@/content/site";

export function Logo({ src, tone, alt, compact = false }: { src: string; tone: LogoTone; alt: string; compact?: boolean }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={160}
      height={40}
      unoptimized
      data-tone={tone}
      className={compact ? "logo-img logo-img-compact" : "logo-img"}
    />
  );
}
