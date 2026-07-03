export interface BlurTextProps {
  text?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  delay?: number;
  stepDuration?: number;
  threshold?: number;
  rootMargin?: string;
  className?: string;
  animationFrom?: object;
  animationTo?: object[];
  easing?: (t: number) => number;
  onAnimationComplete?: () => void;
}

declare function BlurText(props: BlurTextProps): JSX.Element;

export default BlurText;
