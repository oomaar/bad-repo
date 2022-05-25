import { GetItPerformanceResponse } from "../../client/AuthedClient";
import { GoogleChart } from "../GoogleChart";

export const itSummaryCard = (
  data: GetItPerformanceResponse,
  averageFieldName: "averageCPU" | "averageDiskInMb" | "averageMemoryInMb"
) => {
  const colors = ["#67b7dc", "#6794dc", "#6771dc", "#8067dc", "#c767dc"];
  const chartData: Array<any> = data
    .sort((a, b) => {
      let fa = a[averageFieldName],
        fb = b[averageFieldName];

      if (fa > fb) {
        return -1;
      }
      if (fa < fb) {
        return 1;
      }
      return 0;
    })
    .slice(0, 5)
    .map((process, index) => {
      return [process.processName, process[averageFieldName], colors[index]];
    });
  chartData.unshift(["", "", { role: "style" }]);

  return (
    <div className="col-xl-5">
      <div className="chart-box">
        <h3>Top Applications</h3>
        <div className="performanceChart google-chart-chart-box">
          <GoogleChart chartData={chartData} />
        </div>
      </div>
    </div>
  );
};
