export interface CurvedLoopProps {
  marqueeText?: string;
  speed?: number;
  className?: string;
  curveAmount?: number;
  direction?: "left" | "right";
  interactive?: boolean;
}

declare function CurvedLoop(props: CurvedLoopProps): JSX.Element;

export default CurvedLoop;
