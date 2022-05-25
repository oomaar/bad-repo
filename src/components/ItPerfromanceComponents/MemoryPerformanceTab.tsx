import {
  GetItPerformanceResponse,
  GetProcessesItPerformanceResponseProcess,
} from "../../client/AuthedClient";
import { Percentage } from "../Percentage";
import { Table, width150pxStyle } from "../Table";
import { itSummaryCard } from "./";
import { LineChart } from "./LineChart";
import { roundTo2Places } from "../../utils/misc";

export const MemoryPerformanceTab = (
  data: GetItPerformanceResponse,
  lineData: any
) => {
  const columns = [
    { name: "Application Name", attr: "processName", style: width150pxStyle },
    {
      name: "Average Usage %",
      attr: "averageMemoryPercentage",
      style: width150pxStyle,
    },
    {
      name: "Average Usage (MB)",
      attr: "averageMemoryInMb",
      style: width150pxStyle,
    },
  ];

  const rowStrings = data.map((application) => [application.processName]);
  const memoryData: { TimeLabel: string; data: Array<any> } = {
    TimeLabel: lineData.data.timeLabel,
    data: [],
  };
  lineData.data.data.length !== 0 &&
    lineData.data.data.map((el: any) => {
      let sampleMemoryObj = {
        xValue: el.xAxisValue,
        yValue: el.averageMemoryPercentage,
      };

      memoryData.data.push(sampleMemoryObj);

      return 0;
    });
  const rows = (array: Array<GetProcessesItPerformanceResponseProcess>) => {
    return array.map((application, index) => (
      <tr key={index}>
        <td>{application.processName}</td>
        <td>
          <Percentage percentage={application.averageMemoryPercentage} />
        </td>
        <td>
          {Math.round((application.averageMemoryInMb + Number.EPSILON) * 100) /
            100}
        </td>
      </tr>
    ));
  };

  return (
    <div className="row">
      {itSummaryCard(data, "averageMemoryInMb")}
      <div className="col-xl-7">
        <Table
          pageTitle={"Memory Performance"}
          rows={rows}
          rowsData={data.map((el) => ({
            processName: el.processName,
            averageMemoryPercentage: el.averageMemoryPercentage,
            averageMemoryInMb:
              Math.round((el.averageMemoryInMb + Number.EPSILON) * 100) / 100,
          }))}
          excelData={data.map((el) => ({
            processName: el.processName,
            averageMemoryPercentage: `${roundTo2Places(
              el.averageMemoryPercentage
            )}%`,
            averageMemoryInMb:
              Math.round((el.averageMemoryInMb + Number.EPSILON) * 100) / 100,
          }))}
          columns={columns}
          rowsStrings={rowStrings}
        />
      </div>
      <div className="col-xl-12">
        <LineChart
          lineData={memoryData}
          title="Average Memory Usage %"
        ></LineChart>
      </div>
    </div>
  );
};
