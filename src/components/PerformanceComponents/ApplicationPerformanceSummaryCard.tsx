import { GetProcessesPerformanceResponseProcess } from "../../client/AuthedClient";

import { ApplicationsPerformanceChartCard } from "./";
import { ApplicationsPerfromanceGuageChart } from "./ApplicationsPerfromanceGuageChart";

export const ApplicationPerformanceSummaryCard = (props: {
  topProcesses: Array<GetProcessesPerformanceResponseProcess>;
  onDetailsClick: (processName: string) => void;
}) => {
  const { topProcesses, onDetailsClick } = props;

  const topProcessesWidgets = topProcesses.map((process, index) => {
    const percentage = process.successCount / process.totalCount;

    return (
      <div
        className="col-xl-4 col-lg-6 mouse-pointer"
        onClick={() => onDetailsClick(topProcesses[index].processName)}
        key={index}
      >
        <div className="widget-box">
          <ApplicationsPerformanceChartCard
            processName={process.processName}
            totalCount={process.totalCount}
            computersCount={process.computersCount}
            failureCount={process.failureCount}
            failureComputersCount={process.failureComputersCount}
          />
          <div className="widget-chart">
            <ApplicationsPerfromanceGuageChart percentage={percentage} />
          </div>
        </div>
      </div>
    );
  });

  return <>{topProcessesWidgets}</>;
};
