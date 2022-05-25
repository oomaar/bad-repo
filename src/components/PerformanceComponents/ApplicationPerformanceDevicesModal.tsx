import { Modal } from "react-bootstrap";
import { GetModalDevicesTabDetailsProcess } from "../../client/AuthedClient";
import { Table } from "../Table";

export const ApplicationPerformanceDevicesModal = (props: {
  devicesDetails: Array<GetModalDevicesTabDetailsProcess>;
}) => {
  const { devicesDetails } = props;

  const columns = [{ name: "Devices", attr: "computerName" }];

  const rowStrings = devicesDetails.map((detail) => [detail.computerName]);

  const rows = (array: Array<GetModalDevicesTabDetailsProcess>) => {
    return array.map((detail, index) => (
      <tr key={index}>
        <td>{detail.computerName}</td>
      </tr>
    ));
  };

  return (
    <Modal.Body>
      {devicesDetails.length > 0 ? (
        <Table
          pageTitle={"Application Performance Details"}
          rows={rows}
          rowsData={devicesDetails.map((el) => ({
            computerName: el.computerName,
          }))}
          columns={columns}
          rowsStrings={rowStrings}
          excelData={devicesDetails.map((el) => ({
            computerName: el.computerName,
          }))}
        />
      ) : (
        <div className="flex-grow-1 text-center">
          <h4>No Devices Data</h4>
        </div>
      )}
    </Modal.Body>
  );
};
