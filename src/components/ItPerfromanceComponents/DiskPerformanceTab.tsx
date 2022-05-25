import {
  GetItPerformanceResponse,
  GetProcessesItPerformanceResponseProcess,
} from "../../client/AuthedClient";
import { Table, width150pxStyle } from "../Table";
import { itSummaryCard } from "./";
import { LineChart } from "./LineChart";

export const DiskPerformanceTab = (
  data: GetItPerformanceResponse,
  lineData: any
) => {
  const columns = [
    { name: "Application Name", attr: "processName", style: width150pxStyle },
    {
      name: "Average Usage (MB/s)",
      attr: "averageDiskInMb",
      style: width150pxStyle,
    },
    { name: "Max Usage (MB/s)", attr: "maxDiskInMb", style: width150pxStyle },
  ];

  const rowStrings = data.map((application) => [application.processName]);
  const deskData: { TimeLabel: string; data: Array<{}> } = {
    TimeLabel: lineData.data.timeLabel,
    data: [],
  };
  lineData.data.data.length !== 0 &&
    lineData.data.data.map((el: any) => {
      let sampleDiskObj = {
        xValue: el.xAxisValue,
        yValue: el.averageDiskInMb,
      };
      deskData.data.push(sampleDiskObj);

      return 0;
    });
  const rows = (array: Array<GetProcessesItPerformanceResponseProcess>) => {
    return array.map((application, index) => (
      <tr key={index}>
        <td>{application.processName}</td>
        <td>{application.averageDiskInMb}</td>

        <td>{application.maxDiskInMb}</td>
      </tr>
    ));
  };

  return (
    <div className="row">
      {itSummaryCard(data, "averageDiskInMb")}
      <div className="col-xl-7">
        <Table
          pageTitle={"Disk Performance"}
          rows={rows}
          excelData={data.map((el) => ({
            processName: el.processName,
            averageDiskInMb: el.averageDiskInMb.toFixed(8),
            maxDiskInMb: el.maxDiskInMb.toFixed(8),
          }))}
          rowsData={data.map((el) => ({
            processName: el.processName,
            averageDiskInMb: el.averageDiskInMb.toFixed(8),
            maxDiskInMb: el.maxDiskInMb.toFixed(8),
          }))}
          columns={columns}
          rowsStrings={rowStrings}
        />
      </div>
      <LineChart
        lineData={deskData}
        title="Average Disk Usage MB/s"
      ></LineChart>
    </div>
  );
};
