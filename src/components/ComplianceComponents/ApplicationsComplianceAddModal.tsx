import { Button, CloseButton, Modal } from "react-bootstrap";
import { useAuthedClient } from "../../context/AuthedClientContext";
import { ToastFunction, ToastSuccessFunction } from "../../utils/ToastFunction";

export const ApplicationsComplianceAddModal = (props: {
  onDataChange: () => void;
  addMessageApplicationName: string;
  showModalAdd: boolean;
  setShowModalAdd: (showAddModalAdd: boolean) => void;
}) => {
  const {
    onDataChange,
    addMessageApplicationName,
    showModalAdd,
    setShowModalAdd,
  } = props;
  const authedClient = useAuthedClient();

  function handleAddCompliance(appName: string) {
    authedClient
      .addEditAllowedApplications(undefined, false, appName)
      .then((resp) => {
        if (resp) {
          onDataChange();
          ToastSuccessFunction("Added successfully");
        } else {
          ToastFunction("Adding failed");
        }
      })
      .catch((_) => ToastFunction("Adding failed catch"));
  }

  return (
    <Modal
      className="popUpModal"
      keyboard={false}
      centered={true}
      scrollable={true}
      show={showModalAdd}
      onHide={() => setShowModalAdd(false)}
    >
      <Modal.Body>
        <div className="d-flex">
          <CloseButton onClick={() => setShowModalAdd(false)} />
          <div className="flex-shrink-0">
            <i className="icon-doc-add" />
          </div>
          <div className="flex-grow-1">
            <h4>Are you sure?</h4>
            <p>You are about to add {addMessageApplicationName}.</p>
            <div className="popUpModalBtn">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => setShowModalAdd(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => handleAddCompliance(addMessageApplicationName)}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
