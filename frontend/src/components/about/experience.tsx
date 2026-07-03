import { Briefcase, Camera, GraduationCap, RotateCcw, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type * as MatterTypes from "matter-js";

type Entry = {
  company: string;
  role: string;
  period: string;
  icon: LucideIcon;
  brand?: string;
  image?: string;
};

const ENTRIES: Entry[] = [
  {
    company: "Northeastern University",
    role: "Track & Field — 400m Hurdles",
    period: "2016 – 2021",
    icon: GraduationCap,
    brand: "#C8102E",
  },
  {
    company: "Trade Operations",
    role: "Operations Analyst",
    period: "2023 – Present",
    icon: Briefcase,
    brand: "#2563EB",
  },
  {
    company: "Videography",
    role: "Freelance Editor & Videographer",
    period: "2024 – Present",
    icon: Camera,
    brand: "#0F0F0F",
  },
];

const CARD_RADIUS = 20;
const WALL_PAD = 16;

type CardState = {
  entry: Entry;
  body: MatterTypes.Body;
  width: number;
  height: number;
};

export function Experience(): ReactNode {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const measure = measureRef.current;
    if (!container || !measure) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void (async () => {
      const Matter = await import("matter-js");
      if (cancelled) return;

      const { Engine, Runner, World, Bodies, Body, Mouse, MouseConstraint, Events } = Matter;

      const measureChildren = Array.from(measure.children) as HTMLElement[];
      const dims = measureChildren.map((el) => {
        const r = el.getBoundingClientRect();
        return { w: Math.max(220, r.width), h: Math.max(68, r.height) };
      });

      let width = container.clientWidth;
      let height = container.clientHeight;

      const engine = Engine.create();
      engine.gravity.y = 1;
      const world = engine.world;

      const wallThickness = 400;
      const floor = Bodies.rectangle(width / 2, height - WALL_PAD + wallThickness / 2, width * 3, wallThickness, { isStatic: true });
      const leftWall = Bodies.rectangle(WALL_PAD - wallThickness / 2, height / 2, wallThickness, height * 4, { isStatic: true });
      const rightWall = Bodies.rectangle(width - WALL_PAD + wallThickness / 2, height / 2, wallThickness, height * 4, { isStatic: true });
      World.add(world, [floor, leftWall, rightWall]);

      const states: CardState[] = ENTRIES.map((entry, i) => {
        const dim = dims[i] ?? { w: 220, h: 68 };
        const { w, h } = dim;
        const halfW = w / 2;
        const minX = WALL_PAD + halfW + 4;
        const maxX = width - WALL_PAD - halfW - 4;
        const x = minX + Math.random() * Math.max(1, maxX - minX);
        const y = -100 - i * 120 - Math.random() * 80;
        const body = Bodies.rectangle(x, y, w, h, {
          chamfer: { radius: CARD_RADIUS },
          restitution: 0.3,
          friction: 0.5,
          frictionAir: 0.025,
          density: 0.002,
          angle: (Math.random() - 0.5) * 0.3,
        });
        World.add(world, body);
        return { entry, body, width: w, height: h };
      });

      const mouse = Mouse.create(container);
      const wheelTarget = mouse.element as HTMLElement & { mousewheel?: EventListener };
      if (wheelTarget.mousewheel) {
        wheelTarget.removeEventListener("wheel", wheelTarget.mousewheel);
        wheelTarget.removeEventListener("DOMMouseScroll", wheelTarget.mousewheel);
      }

      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.2, damping: 0.2, render: { visible: false } },
      });
      World.add(world, mouseConstraint);

      Events.on(mouseConstraint, "startdrag", () => { container.style.cursor = "grabbing"; });
      Events.on(mouseConstraint, "enddrag", () => { container.style.cursor = "grab"; });

      const runner = Runner.create();
      Runner.run(runner, engine);

      let raf = 0;
      const tick = (): void => {
        for (let i = 0; i < states.length; i++) {
          const s = states[i];
          const el = cardRefs.current[i];
          if (!s || !el) continue;
          const { x, y } = s.body.position;
          el.style.transform = `translate3d(${x - s.width / 2}px, ${y - s.height / 2}px, 0) rotate(${s.body.angle}rad)`;
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

      const onResize = (): void => {
        const newW = container.clientWidth;
        const newH = container.clientHeight;
        if (newW === width && newH === height) return;
        Body.setPosition(floor, { x: newW / 2, y: newH - WALL_PAD + wallThickness / 2 });
        Body.setPosition(leftWall, { x: WALL_PAD - wallThickness / 2, y: newH / 2 });
        Body.setPosition(rightWall, { x: newW - WALL_PAD + wallThickness / 2, y: newH / 2 });
        width = newW;
        height = newH;
      };
      const ro = new ResizeObserver(onResize);
      ro.observe(container);

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        Runner.stop(runner);
        World.clear(world, false);
        Engine.clear(engine);
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [resetKey]);

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-foreground text-[15px] font-semibold tracking-tight">Experience</h3>

      <div className="border-foreground/5 bg-foreground/2 dark:bg-foreground/5 relative h-72 overflow-hidden rounded-4xl border sm:h-96">
        <button
          type="button"
          onClick={() => setResetKey((k) => k + 1)}
          aria-label="Reset"
          className="focus-ring border-foreground/8 bg-background text-foreground/70 hover:text-foreground absolute top-3 right-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-xl border transition-colors"
        >
          <RotateCcw className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
        </button>

        <div ref={measureRef} aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, visibility: "hidden", pointerEvents: "none", display: "flex", flexDirection: "column", gap: 8, padding: 8 }}>
          {ENTRIES.map((entry) => (
            <ExperienceCard key={`m-${entry.company}`} entry={entry} />
          ))}
        </div>

        <div ref={containerRef} className="absolute inset-0 cursor-grab select-none" style={{ touchAction: "none" }}>
          {ENTRIES.map((entry, i) => (
            <div
              key={`${resetKey}-${entry.company}`}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="pointer-events-none absolute top-0 left-0 will-change-transform"
              style={{ transform: "translate3d(-9999px, -9999px, 0)" }}
            >
              <ExperienceCard entry={entry} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ExperienceCard({ entry }: { entry: Entry }): ReactNode {
  const Icon = entry.icon;
  return (
    <div
      className="bg-background border-foreground/8 flex items-center gap-3 border p-3 shadow-sm"
      style={{ borderRadius: CARD_RADIUS, minWidth: 220 }}
    >
      <span
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden"
        style={{ borderRadius: 12, backgroundColor: entry.brand }}
      >
        {entry.image ? (
          <img src={entry.image} alt="" className="h-full w-full object-cover" draggable={false} />
        ) : (
          <Icon className="h-5 w-5 text-white" />
        )}
      </span>
      <div className="flex min-w-0 flex-col">
        <span className="text-foreground text-[15px] font-semibold tracking-tight">{entry.company}</span>
        <span className="text-foreground/55 text-[13px] tracking-tight">{entry.role}</span>
        <span className="text-foreground/35 text-[12px] tracking-tight">{entry.period}</span>
      </div>
    </div>
  );
}
