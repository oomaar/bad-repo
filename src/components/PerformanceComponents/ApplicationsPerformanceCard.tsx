export const ApplicationsPerformanceChartCard = (props: {
  processName: string;
  totalCount: number;
  computersCount: number;
  failureCount: number;
  failureComputersCount: number;
}) => {
  const {
    processName,
    totalCount,
    computersCount,
    failureCount,
    failureComputersCount,
  } = props;
  return (
    <div className="widget-info">
      <h2>{processName}</h2>
      <div className="row g-2 app-performance-chart-details">
        <div className="col-xl-6 col-lg-8 col-md-6">
          <h1>{(totalCount / 3).toFixed(2)}</h1>
          <p>Duration (Minutes)</p>
        </div>
        <div className="col-xl-6 col-lg-8 col-md-6">
          <h1>{computersCount}</h1>
          <p>Devices</p>
        </div>
        <div className="col-xl-6 col-lg-8 col-md-6">
          <h1>{failureCount}</h1>
          <p>Failures Count</p>
        </div>
        <div className="col-xl-6 col-lg-8 col-md-6">
          <h1>{failureComputersCount}</h1>
          <p>Failure Devices</p>
        </div>
      </div>
    </div>
  );
};
