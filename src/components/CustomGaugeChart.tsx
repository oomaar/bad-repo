import GuageChart, { GaugeChartProps } from "react-gauge-chart";

export function CustomGaugeChart(props: {
  percent: number;
  gaugeChartProps?: GaugeChartProps;
}) {
  const { percent, gaugeChartProps } = props;

  return (
    <GuageChart
      needleColor="#212529"
      cornerRadius={0}
      nrOfLevels={4}
      percent={percent}
      arcWidth={0.3}
      arcPadding={0.02}
      style={{ width: "90%", fontSize: "15px", margin: "0 auto" }}
      textColor={"black"}
      colors={[
        "rgb(250, 95, 17)",
        "rgb(253, 138, 0)",
        "rgb(254, 174, 0)",
        "rgb(72, 166, 76)",
      ]}
      {...gaugeChartProps}
    />
  );
}
