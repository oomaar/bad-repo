import { CloseButton, Modal } from "react-bootstrap";
import {
  GetModalDevicesTabDetailsProcess,
  GetProcessesPerformanceDetailsProcess,
} from "../../client/AuthedClient";
import { TabbedContainer } from "../TabbedContainer";
import {
  ApplicationPerformanceDevicesModal,
  ApplicationPerformanceFailuresModal,
} from "./";

export const ApplicationPerformanceModal = (props: {
  showModal: boolean;
  onHide: () => void;
  modalTitle: string;
  details: Array<GetProcessesPerformanceDetailsProcess>;
  devicesDetails: Array<GetModalDevicesTabDetailsProcess>;
}) => {
  const { showModal, onHide, modalTitle } = props;

  return (
    <Modal
      keyboard={false}
      centered={true}
      scrollable={true}
      show={showModal}
      onHide={() => onHide()}
      size="lg"
    >
      <div className="app-performance-modal">
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
          <CloseButton onClick={() => onHide()} />
        </Modal.Header>
        <TabbedContainer
          tabs={[
            {
              title: "Devices",
              body: ApplicationPerformanceDevicesModal(props),
            },
            {
              title: "Failures",
              body: ApplicationPerformanceFailuresModal(props),
            },
          ]}
        />
      </div>
    </Modal>
  );
};
