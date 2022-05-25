import { useState, ChangeEvent } from "react";
import { CloseButton, Modal } from "react-bootstrap";

export const AllowedApplicationsModal = (props: {
  showModal: boolean;
  handleCloseAddModal: () => void;
  handleModalTitle: string;
  newAppName: string;
  setNewAppName: (newAppName: string) => void;
  editing: boolean;
  handleEditInputValue: string;
  setCurrentVersion: (string: string) => void;
  currentVersion: string;
  handleSubmit: () => void;
  validateForm: boolean;
}) => {
  const {
    showModal,
    handleCloseAddModal,
    handleModalTitle,
    newAppName,
    setNewAppName,
    editing,
    handleEditInputValue,
    setCurrentVersion,
    currentVersion,
    handleSubmit,
    validateForm,
  } = props;

  const [applicationNameError, setApplicationNameError] = useState(false);
  const [applicationVersionError, setApplicationVersionError] = useState(false);

  const handleResetFormErrorOnClose = () => {
    handleCloseAddModal();
    setApplicationNameError(false);
    setApplicationVersionError(false);
    setCurrentVersion("");
    setNewAppName("");
  };

  const handleApplicationNameInputOnChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setApplicationNameError(false);
    setNewAppName(e.target.value);
  };

  const handleApplicationVersionInputOnChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setApplicationVersionError(false);
    setCurrentVersion(e.target.value);
  };

  const handleSubmitWithErrors = () => {
    if (validateForm && !editing) {
      handleSubmit();
      setApplicationNameError(false);
      setApplicationVersionError(false);
    }

    if (currentVersion === "") {
      setApplicationVersionError(true);
    }

    if (newAppName === "") {
      setApplicationNameError(true);
    }

    if (editing) {
      setApplicationNameError(false);
      handleSubmit();
    }
  };

  return (
    <Modal
      className={`${
        showModal ? "popUpModal details-modal-opened" : "popUpModal"
      }`}
      keyboard={false}
      centered={true}
      scrollable={true}
      onHide={handleResetFormErrorOnClose}
      show={showModal}
      size="lg"
    >
      <form onSubmit={(e) => e.preventDefault()} className="modal-content">
        <Modal.Header>
          <Modal.Title>{handleModalTitle}</Modal.Title>
          <CloseButton onClick={handleResetFormErrorOnClose} />
        </Modal.Header>

        <Modal.Body>
          <div className="row g-3">
            <div className="col-lg-6">
              <label className="form-label">Application name</label>
              <input
                onChange={(e) => handleApplicationNameInputOnChange(e)}
                type="text"
                disabled={editing}
                value={handleEditInputValue}
                className={`form-control ${
                  applicationNameError ? "error-input" : ""
                }`}
                placeholder="Application name"
              />
              {applicationNameError ? (
                <span className="error-span">Required</span>
              ) : (
                <></>
              )}
            </div>
            <div className="col-lg-6">
              <label className="form-label">Application Version</label>
              <input
                onChange={(e) => handleApplicationVersionInputOnChange(e)}
                type="text"
                value={currentVersion}
                className={`form-control ${
                  applicationVersionError ? "error-input" : ""
                }`}
                placeholder="Application Version"
              />
              {applicationVersionError ? (
                <span className="error-span">Required</span>
              ) : (
                <></>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="mt-4">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmitWithErrors}
          >
            Submit
          </button>
          <button
            onClick={handleResetFormErrorOnClose}
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
