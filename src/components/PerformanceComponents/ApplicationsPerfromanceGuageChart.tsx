import GuageChart from "react-gauge-chart";

export const ApplicationsPerfromanceGuageChart = (props: {
  percentage: number;
}) => {
  const { percentage } = props;
  return (
    <div className="application-performance-chart-number">
      <GuageChart
        needleColor="#212529"
        cornerRadius={0}
        nrOfLevels={4}
        percent={percentage}
        arcWidth={0.3}
        arcPadding={0.02}
        style={{ width: "160px", fontSize: "15px" }}
        textColor={"black"}
        colors={[
          "rgb(250, 95, 17)",
          "rgb(253, 138, 0)",
          "rgb(254, 174, 0)",
          "rgb(72, 166, 76)",
        ]}
      />
    </div>
  );
};
