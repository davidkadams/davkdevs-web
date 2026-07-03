import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface RotatingTextProps {
  texts: string[];
  rotationInterval?: number;
  initial?: object;
  animate?: object;
  exit?: object;
  animatePresenceMode?: string;
  animatePresenceInitial?: boolean;
  staggerDuration?: number;
  staggerFrom?: string | number;
  transition?: object;
  loop?: boolean;
  auto?: boolean;
  splitBy?: string;
  onNext?: (index: number) => void;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
  className?: string;
}

declare const RotatingText: ForwardRefExoticComponent<
  RotatingTextProps & RefAttributes<unknown>
>;

export default RotatingText;
