import { roundTo2Places } from "../utils/misc";

export type PercentageProps =
  | { numerator: number; denominator: number }
  | { ratio: number }
  | { percentage: number };

export function Percentage(props: PercentageProps) {
  let percentage!: number;

  if ("percentage" in props) {
    percentage = props.percentage;
  } else {
    let ratio!: number;

    if ("ratio" in props) {
      ratio = props.ratio;
    } else {
      ratio = props.numerator / props.denominator;
    }

    percentage = ratio * 100.0;
  }

  const percentageTo2Places = roundTo2Places(percentage);

  return <>{percentageTo2Places}%</>;
}
