import Image from "next/image";
import type { LogoTone } from "@/content/site";

export function Logo({ src, tone, alt }: { src: string; tone: LogoTone; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={160}
      height={40}
      unoptimized
      data-tone={tone}
      className="logo-img"
    />
  );
}
