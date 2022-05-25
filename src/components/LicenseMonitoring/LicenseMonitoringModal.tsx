import { CloseButton, Modal } from "react-bootstrap";
import {
  GetLicenseMonitoringDetails,
  GetLicenseMonitoringResponseDetailsProcess,
} from "../../client/AuthedClient";
import { Table } from "../Table";

export const LicenseMonitoringModal = (props: {
  showModal: boolean;
  setShowModal: (boolean: boolean) => void;
  modalTitle: string;
  details: GetLicenseMonitoringDetails;
}) => {
  const { showModal, modalTitle, setShowModal, details } = props;

  const rowStrings = details.map(
    (detail: GetLicenseMonitoringResponseDetailsProcess) => [
      detail.applicationName,
    ]
  );

  const columns = [{ name: "Devices", attr: "computerName" }];

  const rows = (array: Array<GetLicenseMonitoringResponseDetailsProcess>) => {
    return array.map((detail, index) => (
      <tr key={index}>
        <td>{detail.computerName}</td>
      </tr>
    ));
  };

  return (
    <Modal
      keyboard={false}
      centered={true}
      scrollable={true}
      show={showModal}
      onHide={() => setShowModal(false)}
      size="lg"
    >
      <Modal.Header>
        <Modal.Title>{modalTitle}</Modal.Title>
        <CloseButton onClick={() => setShowModal(false)} />
      </Modal.Header>
      <Modal.Body>
        <Table
          pageTitle={" "}
          rows={rows}
          rowsData={details.map(
            (el: GetLicenseMonitoringResponseDetailsProcess) => ({
              computerName: el.computerName,
            })
          )}
          excelData={details.map(
            (el: GetLicenseMonitoringResponseDetailsProcess) => ({
              computerName: el.computerName,
            })
          )}
          columns={columns}
          rowsStrings={rowStrings}
        />
      </Modal.Body>
    </Modal>
  );
};
