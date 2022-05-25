import { CloseButton, Modal } from "react-bootstrap";
import { GetNotCompliedApplicationsInstancesProcess } from "../../client/AuthedClient";
import { complianceFormatConvertISOStringToHumanFormat } from "../../utils/convertISOStringToHumanFormat";
import { Table } from "../Table";

export const ApplicationsComplianceDetailsModal = ({
  details,
  lgShow,
  setLgShow,
  modalTitle,
}: {
  details: Array<GetNotCompliedApplicationsInstancesProcess>;
  lgShow: boolean;
  setLgShow: (lgShow: boolean) => void;
  modalTitle: string;
}) => {
  const columns = [
    { name: "Device Name", attr: "computerName" },
    { name: "Date", attr: "time" },
  ];

  const rowStrings = details.map((detail) => [detail.applicationName]);

  const rows = (array: Array<GetNotCompliedApplicationsInstancesProcess>) => {
    return array.map((details, index) => (
      <tr key={index}>
        <td>{details.computerName}</td>
        <td>{complianceFormatConvertISOStringToHumanFormat(details.time)}</td>
      </tr>
    ));
  };

  return (
    <Modal
      className={`${lgShow ? "popUpModal details-modal-opened" : "popUpModal"}`}
      keyboard={false}
      centered={true}
      scrollable={true}
      onHide={() => setLgShow(false)}
      show={lgShow}
      size="lg"
    >
      <div className="modal-content">
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
          <CloseButton
            onClick={() => {
              setLgShow(false);
            }}
          />
        </Modal.Header>
        <Modal.Body>
          <Table
            pageTitle={"Application Compliance Details"}
            rows={rows}
            rowsData={details}
            columns={columns}
            rowsStrings={rowStrings}
            excelData={details}
          />
        </Modal.Body>
      </div>
    </Modal>
  );
};
