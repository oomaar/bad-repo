import { Modal } from "react-bootstrap";
import { GetProcessesPerformanceDetailsProcess } from "../../client/AuthedClient";
import { convertISOStringToHumanFormat } from "../../utils/convertISOStringToHumanFormat";
import { Table } from "../Table";

export const ApplicationPerformanceFailuresModal = (props: {
  details: Array<GetProcessesPerformanceDetailsProcess>;
}) => {
  const { details } = props;

  const columns = [
    { name: "Username", attr: "computerName" },
    { name: "Timestamp", attr: "sampleTime" },
  ];

  const rowStrings = details.map((detail) => [detail.computerName]);

  const rows = (array: Array<GetProcessesPerformanceDetailsProcess>) => {
    return array.map((detail, index) => (
      <tr key={index}>
        <td>{detail.computerName}</td>
        <td>{detail.sampleTime}</td>
      </tr>
    ));
  };

  return (
    <Modal.Body>
      {details.length > 0 ? (
        <Table
          pageTitle={"Application performance Failure"}
          rows={rows}
          rowsData={details.map((el) => ({
            computerName: el.computerName,
            sampleTime: convertISOStringToHumanFormat(el.sampleTime),
          }))}
          excelData={details.map((el) => ({
            computerName: el.computerName,
            sampleTime: convertISOStringToHumanFormat(el.sampleTime),
          }))}
          columns={columns}
          rowsStrings={rowStrings}
        />
      ) : (
        <div className="flex-grow-1 text-center">
          <h4>No Failure Data</h4>
        </div>
      )}
    </Modal.Body>
  );
};
