import {
  GetModalDevicesTabDetailsProcess,
  GetProcessesPerformanceDetailsProcess,
  GetProcessesPerformanceResponseProcess,
} from "../../client/AuthedClient";
import { roundTo2Places } from "../../utils/misc";
import { Table, width80pxStyle } from "../Table";
import { ApplicationPerformanceModal } from "./";

export const ApplicationPerformanceTable = (props: {
  processes: Array<GetProcessesPerformanceResponseProcess>;
  showModal: boolean;
  onHide: () => void;
  modalTitle: string;
  details: Array<GetProcessesPerformanceDetailsProcess>;
  devicesDetails: Array<GetModalDevicesTabDetailsProcess>;
  onDetailsClick: (processName: string) => void;
}) => {
  const {
    processes,
    showModal,
    onHide,
    modalTitle,
    details,
    devicesDetails,
    onDetailsClick,
  } = props;

  function calculatePercentage(
    process: GetProcessesPerformanceResponseProcess
  ): number {
    const ratio = process.failureCount / process.totalCount;
    const percentage = ratio * 100;

    return Math.round((percentage + Number.EPSILON) * 1000) / 1000;
  }

  const rowStrings = processes.map((name) => [name.processName]);

  const tableColumns = [
    { name: "Application Name", attr: "processName" },
    { name: "Duration (Minutes)", attr: "totalCount" },
    { name: "Failure Percentage", attr: "failPercentage" },
    { name: "Number of Devices", attr: "computersCount" },
    { name: "Details", attr: "", style: width80pxStyle },
  ];

  const rows = (array: Array<GetProcessesPerformanceResponseProcess>) => {
    return array.map((process, index) => (
      <tr key={index}>
        <td>{process.processName}</td>
        <td>{(process.totalCount / 3).toFixed(2)}</td>
        <td>{`${process.failPercentage}%`}</td>
        <td>{process.computersCount}</td>
        <td>
          <i
            onClick={() => onDetailsClick(array[index].processName)}
            className="icon-doc-text view-icon mouse-pointer"
          />
        </td>
      </tr>
    ));
  };

  return (
    <>
      <Table
        pageTitle={"ApplicationPerformance"}
        rows={rows}
        rowsData={processes.map((el) => ({
          processName: el.processName,
          totalCount: el.totalCount,
          failPercentage: calculatePercentage(el),
          computersCount: el.computersCount,
        }))}
        excelData={processes.map((el) => ({
          processName: el.processName,
          totalCount: (el.totalCount / 3).toFixed(2),
          failPercentage: calculatePercentage(el),
          computersCount: el.computersCount,
        }))}
        columns={tableColumns}
        rowsStrings={rowStrings}
      />
      {showModal ? (
        <ApplicationPerformanceModal
          devicesDetails={devicesDetails}
          showModal={showModal}
          onHide={onHide}
          modalTitle={modalTitle}
          details={details}
        />
      ) : (
        <></>
      )}
    </>
  );
};
