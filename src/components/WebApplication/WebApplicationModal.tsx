import { ChangeEvent, useState } from "react";
import { CloseButton, Modal } from "react-bootstrap";

export const WebapplicationModal = (props: {
  showModal: boolean;
  handleCloseAddModal: () => void;
  handleModalTitle: string;
  appName: string;
  setAppName: (appName: string) => void;
  editing: boolean;
  handleInputValue: string;
  setCurrentVersion: (string: string) => void;
  currentVersion: string;
  handleSubmit: () => void;
  validateForm: boolean;
}) => {
  const {
    showModal,
    handleCloseAddModal,
    handleModalTitle,
    appName,
    setAppName,
    editing,
    handleInputValue,
    setCurrentVersion,
    currentVersion,
    handleSubmit,
    validateForm,
  } = props;

  const [applicationNameError, setApplicationNameError] = useState(false);
  const [applicationVersionError, setApplicationVersionError] = useState(false);

  const handleResetFormErrorsOnClose = () => {
    handleCloseAddModal();
    setApplicationNameError(false);
    setApplicationVersionError(false);
    setAppName("");
    setCurrentVersion("");
  };

  const handleSubmitFormWithErrors = () => {
    if (validateForm && !editing) {
      handleSubmit();
      setApplicationNameError(false);
      setApplicationVersionError(false);
    }

    if (currentVersion === "") {
      setApplicationVersionError(true);
    }

    if (appName === "") {
      setApplicationNameError(true);
    }

    if (editing) {
      setApplicationNameError(false);
      handleSubmit();
    }
  };

  const handleApplicationNameInputOnChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setAppName(e.target.value);
    setApplicationNameError(false);
  };

  const handleApplicationVersionInputOnChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentVersion(e.target.value);
    setApplicationVersionError(false);
  };

  return (
    <Modal
      className={`${
        showModal ? "popUpModal details-modal-opened" : "popUpModal"
      }`}
      keyboard={false}
      centered={true}
      scrollable={true}
      onHide={handleResetFormErrorsOnClose}
      show={showModal}
      size="lg"
    >
      <div className="modal-content">
        <Modal.Header>
          <Modal.Title>{handleModalTitle}</Modal.Title>
          <CloseButton onClick={handleResetFormErrorsOnClose} />
        </Modal.Header>

        <Modal.Body>
          <div className="row g-3">
            <div className="col-lg-6">
              <label className="form-label">Application name</label>
              <input
                onChange={(e) => handleApplicationNameInputOnChange(e)}
                type="text"
                disabled={editing}
                value={handleInputValue}
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
              <label className="form-label">Application URL</label>
              <input
                onChange={(e) => handleApplicationVersionInputOnChange(e)}
                type="text"
                value={currentVersion}
                className={`form-control ${
                  applicationVersionError ? "error-input" : ""
                }`}
                placeholder="Application URL"
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
            onClick={handleSubmitFormWithErrors}
            className="btn btn-primary"
          >
            Submit
          </button>
          <button
            onClick={handleResetFormErrorsOnClose}
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};
