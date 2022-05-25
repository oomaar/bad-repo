import {
  GetItPerformanceResponse,
  GetProcessesItPerformanceResponseProcess,
} from "../../client/AuthedClient";
import { Percentage } from "../Percentage";
import { Table, width150pxStyle } from "../Table";
import { itSummaryCard } from "./";
import { LineChart } from "./LineChart";
export const CpuPerformanceTab = (
  data: GetItPerformanceResponse,
  lineData: any
) => {
  const columns = [
    { name: "Application Name", attr: "processName", style: width150pxStyle },
    { name: "Average Usage %", attr: "averageCPU", style: width150pxStyle },
    { name: "Min Usage %", attr: "minCPU", style: width150pxStyle },
  ];
  const cpuData: { TimeLabel: string; data: Array<any> } = {
    TimeLabel: lineData.data.timeLabel,
    data: [],
  };

  lineData.data.data.length !== 0 &&
    lineData.data.data.map((el: any) => {
      let sampleCpu = {
        xValue: el.xAxisValue,
        yValue: el.averageCPU,
      };

      cpuData.data.push(sampleCpu);

      return 0;
    });
  const rowStrings = data.map((application) => [application.processName]);

  const rows = (array: Array<GetProcessesItPerformanceResponseProcess>) => {
    return array.map((application, index) => (
      <tr key={index}>
        <td>{application.processName}</td>
        <td>
          <Percentage percentage={application.averageCPU} />
        </td>
        <td>
          <Percentage percentage={application.minCPU} />
        </td>
      </tr>
    ));
  };
  return (
    <div className="row">
      {itSummaryCard(data, "averageCPU")}
      <div style={{ marginBottom: "5%" }} className="col-xl-7">
        <Table
          pageTitle={"Cpu Performance"}
          rows={rows}
          rowsData={data.map((el) => ({
            processName: el.processName,
            averageCPU:
              Math.round((el.averageCPU + Number.EPSILON) * 100) / 100,
            minCPU: el.minCPU,
          }))}
          excelData={data.map((el) => ({
            processName: el.processName,
            averageCPU: `${
              Math.round((el.averageCPU + Number.EPSILON) * 100) / 100
            }%`,
            minCPU: `${el.minCPU}%`,
          }))}
          columns={columns}
          rowsStrings={rowStrings}
        />
      </div>
      <LineChart lineData={cpuData} title={"Average Cpu Usage %"}></LineChart>
    </div>
  );
};
