import type { ReactNode } from "react";

import { ContactCardCtas } from "./contact-card-ctas";
import { FadeIn } from "@/components/ui/motion-primitives";
import { ShaderFlow } from "../shaders/shader-flow";

const CARD_FADE_MASK =
  "radial-gradient(ellipse 90% 110% at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.4) 90%, rgba(0,0,0,0.15) 100%)";

export function ContactCard(): ReactNode {
  return (
    <section className="mx-auto my-12 w-full max-w-275 px-6 sm:my-20 sm:px-10">
      <FadeIn>
        <div className="relative w-full overflow-hidden rounded-4xl border border-foreground/8 bg-background p-1.5 shadow-sm">
          <div className="relative w-full overflow-hidden rounded-[1.6rem]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-45 dark:opacity-25"
              style={{
                WebkitMaskImage: CARD_FADE_MASK,
                maskImage: CARD_FADE_MASK,
              }}
            >
              <ShaderFlow scale={3} brightness={3}/>
            </div>

            <div className="relative p-6 sm:p-10">
              <div className="flex flex-col gap-5">
                <h2 className="text-[2.25rem] font-medium leading-[1.05] tracking-tight text-foreground sm:text-[2.75rem] lg:text-[3.25rem]">
                  Let&rsquo;s connect
                </h2>
                <p className="max-w-[29ch] text-[18px] leading-[1.4] tracking-tight text-foreground/65 sm:text-[22px] mb-6">
                  Whether you are looking for a new Personal Best or a creative vision, I&rsquo;m always open to discussions and consultations on how we can work together.
                </p>
                <ContactCardCtas />
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
