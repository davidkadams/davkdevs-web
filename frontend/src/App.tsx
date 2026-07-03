import { Providers } from "./components/layout/providers";
import { Nav } from "./components/layout/nav";
import { SkipToContent } from "./components/layout/skip-to-content";

import { Hero } from "./components/hero/hero";
import { Projects } from "./components/projects/projects";
import { PolaroidStrip } from "./components/about/polaroid-strip";
import { Skills, VIDEO_TOOLS } from "./components/about/skills";
import { Experience } from "./components/about/experience";
import { ContactCard } from "./components/contact/contact-card";
import CurvedLoop from "./components/ui/CurvedLoop";
import BlurText from "./components/ui/BlurText";

export default function App() {
  return (
    <Providers>
      <SkipToContent />
      <Nav />
      <div className="relative">
        <main id="main-content">

          {/* ── Marquee ── */}
          <CurvedLoop
            marqueeText="Athletics ✦ Videography ✦ Corporate Life ✦"
            speed={3}
            curveAmount={500}
            direction="left"
            interactive={true}
          />

          {/* ── Hero ── */}
          <Hero />

          {/* ── Athletics ── */}
          <section id="athletics" className="mx-auto w-full max-w-275 px-6 py-20 sm:px-10">
            <div className="flex flex-col items-center text-center mb-12 gap-4">
              <BlurText
                text="'Fit' for Business"
                delay={100}
                animateBy="words"
                direction="top"
                className="text-[3rem] sm:text-[4rem] font-medium tracking-tight text-foreground justify-center"
              />
              <p className="max-w-[42ch] text-[18px] leading-[1.5] tracking-tight text-foreground/55">
                Former NCAA Ranked D1 Track and Field athlete with experience balancing a corporate career while maintaining a high level of athletic performance.
              </p>
            </div>
            <PolaroidStrip />
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <Experience />
              <Skills />
            </div>
          </section>

          {/* ── Videography ── */}
          <section id="videography" className="py-20">
            <div className="mx-auto w-full max-w-275 px-6 sm:px-10 mb-10">
              <h2 className="text-[2rem] font-medium tracking-tight text-foreground sm:text-[2.5rem]">
                Some of my Work
              </h2>
            </div>
            <Projects />
            <div className="mx-auto w-full max-w-275 px-6 sm:px-10 mt-12">
              <Skills title="Tools" items={VIDEO_TOOLS} />
            </div>
          </section>

          {/* ── Contact ── */}
          <ContactCard />

        </main>
      </div>
    </Providers>
  );
}
