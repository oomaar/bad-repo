import { useEffect, useState } from "react";
import Chart from "react-google-charts";

export const GoogleChart = ({ chartData }: { chartData: Array<any> }) => {
  const [chartWidth, setChartWidth] = useState("400px");

  useEffect(() => {
    if (window.innerWidth < 640) {
      setChartWidth("200px");
    }
  }, []);

  return (
    <Chart
      className="itperformance-chart"
      chartType="ColumnChart"
      width="100%"
      height={chartWidth}
      data={chartData}
    />
  );
};
