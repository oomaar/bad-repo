import { useMemo } from "react";
import { GetVisitedSitesResponse } from "../../client/AuthedClient";
import { GoogleChart } from "../../components/GoogleChart";

export const VisitedSitesChart = (props: {
  sites: GetVisitedSitesResponse;
}) => {
  const { sites } = props;

  const chartData = useMemo(() => {
    // `[...sites]` to make a copy to avoid mutating the input
    const topSites = [...sites]
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 5);

    const colors = ["#67b7dc", "#6794dc", "#6771dc", "#8067dc", "#c767dc"];

    const chartColumns = topSites.map((site, index) => [
      site.tabName,
      site.percentage * 100,
      colors[index],
    ]);

    return [["", "", { role: "style" }], ...chartColumns];
  }, [sites]);

  return (
    <div className="col-xl-5">
      <div className="chart-box">
        <h3>Top Sites</h3>
        <div className="performanceChart google-chart-chart-box">
          <GoogleChart chartData={chartData} />
        </div>
      </div>
    </div>
  );
};
