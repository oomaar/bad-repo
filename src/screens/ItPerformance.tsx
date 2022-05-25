import { useCallback } from "react";
import { useAuthedClient } from "../context/AuthedClientContext";
import AuthedClient, { GetItPerformanceResponse } from "../client/AuthedClient";
import { Filters } from "../context/FiltersContext";
import { TabbedPage } from "../components/TabbedPage";
import {
  CpuPerformanceTab,
  MemoryPerformanceTab,
  DiskPerformanceTab,
} from "../components/ItPerfromanceComponents";

export const ItPerformance = () => {
  const authedClient = useAuthedClient();
  // useEffect(() => {
  //   async function getLineData() {
  //     const res: any = await authedClient.getLineChartData();
  //     setLineData(res.data);
  //   }
  //   getLineData();
  // }, [authedClient]);

  const fetchDataCallback = useCallback(
    (filters) => fetchData(authedClient, filters),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const shouldShowNoDataCallback = useCallback(
    (data: GetItPerformanceResponse) => data.length === 0,
    []
  );

  // const cpuData: { TimeLabel: string; data: Array<any> } = {
  //   TimeLabel: LineData.timeLabel,
  //   data: [],
  // };
  // const memoryData: { TimeLabel: string; data: Array<any> } = {
  //   TimeLabel: LineData.timeLabel,
  //   data: [],
  // };
  // const deskData: { TimeLabel: string; data: Array<{}> } = {
  //   TimeLabel: LineData.timeLabel,
  //   data: [],
  // };

  // LineData.length !== 0 &&
  //   LineData.data.map((el: any) => {
  //     let sampleCpu = {
  //       xValue: el.xAxisValue,
  //       yValue: el.averageCPU,
  //     };
  //     let sampleMemoryObj = {
  //       xValue: el.xAxisValue,
  //       yValue: el.averageMemoryPercentage,
  //     };
  //     let sampleDiskObj = {
  //       xValue: el.xAxisValue,
  //       yValue: el.averageDiskInMb,
  //     };
  //     cpuData.data.push(sampleCpu);
  //     memoryData.data.push(sampleMemoryObj);
  //     deskData.data.push(sampleDiskObj);
  //     return 0;
  //   });
  return (
    <TabbedPage<any>
      pageProps={{
        fetchData: fetchDataCallback,
        shouldShowNoData: shouldShowNoDataCallback,
        title: "IT Performance",
      }}
      tabs={[
        {
          title: "CPU Performance",
          body: (data) => CpuPerformanceTab(data[0], data[1]),
        },
        {
          title: "Memory Performance",
          body: (data) => MemoryPerformanceTab(data[0], data[1]),
        },
        {
          title: "Disk Performance",
          body: (data) => DiskPerformanceTab(data[0], data[1]),
        },
      ]}
    />
  );
};

async function fetchData(
  authedClient: AuthedClient,
  filters: Filters
): Promise<Array<any>> {
  const { startDate, endDate, group, user } = filters;
  const res1 = await authedClient.getProcessesItPerformance(
    startDate,
    endDate,
    group,
    user
  );
  const res2 = await authedClient.getLineChartData(
    startDate,
    endDate,
    group,
    user
  );
  const dataarr = [res1, res2];

  return dataarr;
}
