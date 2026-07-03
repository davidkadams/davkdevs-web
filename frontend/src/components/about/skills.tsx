import type { ReactNode } from "react";

const FITNESS_SKILLS = [
  "1-on-1 Consultations",
  "Private Coaching",
  "Sprint Mechanics",
  "Speed Development",
  "Hurdle Technique",
  "Nutrition Guidance",
  "Strength & Conditioning",
  "Mobility & Recovery",
  "Lifestyle & Development",
];

const VIDEO_TOOLS = [
  "Premiere Pro",
  "After Effects",
  "Photoshop",
  "DaVinci Resolve",
  "YouTube",
  "Instagram",
];

type SkillsProps = {
  title?: string;
  items?: string[];
};

export function Skills({ title = "Specialities", items = FITNESS_SKILLS }: SkillsProps): ReactNode {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-[15px] font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      <div className="rounded-4xl border border-foreground/5 bg-foreground/2 p-2 sm:p-4 dark:bg-foreground/5">
        <div className="flex flex-wrap gap-3">
          {items.map((item) => (
            <span
              key={item}
              className="rounded-full border border-foreground/8 bg-background px-4 py-2 text-[14px] tracking-tight text-foreground/85 sm:text-[15px]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export { VIDEO_TOOLS };
