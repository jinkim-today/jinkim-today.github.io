import Image from "next/image";
import { contact, heroHeadline, heroIdentity } from "@/content/site";

/** `compact` = slide variant: em sizing, no CTA buttons, no top padding. */
export function Hero({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-[2em] @5xl:grid-cols-[minmax(0,1fr)_auto] @5xl:gap-[3em]">
        <div>
          <h1 className="m-0 text-balance text-[2.5em] font-extrabold leading-none @5xl:text-[4.5em] tracking-[-0.03em]">{heroHeadline}</h1>
          <p className="mt-[1.25em] text-[1.25em] text-mute">{heroIdentity}</p>
        </div>
        <div className="w-[15em] rounded-3xl bg-surface max-@5xl:hidden">
          <Image
            src="/images/profile.jpg"
            alt="Illustration of Jin Kim holding a laptop"
            width={400}
            height={400}
            unoptimized
            className="aspect-square w-full rounded-3xl object-contain"
          />
        </div>
      </div>
    );
  }
  return (
    <section className="grid grid-cols-[minmax(0,1fr)] items-center gap-8 pb-12 pt-28 md:grid-cols-[minmax(0,1fr)_auto] md:gap-16 md:pb-[72px] md:pt-40">
      <div className="order-2 md:order-1">
        <h1 className="h1-hero m-0 text-balance">{heroHeadline}</h1>
        <p className="mt-8 text-lg text-mute md:text-xl">{heroIdentity}</p>
        <div className="mt-10 flex flex-wrap items-center gap-7">
          <a
            href="#projects"
            className="rounded-full bg-fg px-7 py-4 text-base font-semibold text-bg transition-colors hover:bg-accent hover:text-white"
          >
            See projects
          </a>
          <a href={contact.resume} className="text-base font-semibold hover:text-accent">
            Resume ↓
          </a>
        </div>
      </div>
      <div className="order-1 md:order-2">
        <div className="w-40 rounded-3xl bg-surface md:w-[360px]">
          <Image
            src="/images/profile.jpg"
            alt="Illustration of Jin Kim holding a laptop"
            width={400}
            height={400}
            unoptimized
            priority
            className="aspect-square w-full rounded-3xl object-contain"
          />
        </div>
      </div>
    </section>
  );
}
