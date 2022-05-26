import { useState } from "react";
import { CloseButton, Dropdown, Modal } from "react-bootstrap";

export const ApplicationLicenseModal = (props: {
  handleCloseModal: () => void;
  lgShow: boolean;
  handleModalTitle: string;
  editing: boolean;
  handleDisabledApplicationName: string | null;
  appName: string | null;
  appsWithoutLicese: Array<{ appname: string; id: number }>;
  handleInputValue: string | number;
  handleSubmit: () => void;
  setAppName: (appName: string | null) => void;
  setCurrentAppVersion: (number: number) => void;
}) => {
  const {
    handleCloseModal,
    lgShow,
    handleModalTitle,
    editing,
    handleDisabledApplicationName,
    appName,
    appsWithoutLicese,
    handleInputValue,
    handleSubmit,
    setAppName,
    setCurrentAppVersion,
  } = props;

  const validateForm = handleInputValue !== "";

  const [appCapacityError, setAppCapacityError] = useState(false);

  const handleAddNewSubmition = () => {
    if (validateForm) {
      handleSubmit();
      setAppCapacityError(false);
    } else {
      setAppCapacityError(true);
    }
  };

  const handleResetFormOnClose = () => {
    handleCloseModal();
    setAppCapacityError(false);
  };

  return (
    <Modal
      keyboard={false}
      centered={true}
      scrollable={true}
      onHide={handleResetFormOnClose}
      show={lgShow}
      size="lg"
    >
      <form className="modal-content" onSubmit={(e) => e.preventDefault()}>
        <Modal.Header>
          <Modal.Title>{handleModalTitle}</Modal.Title>
          <CloseButton onClick={handleResetFormOnClose} />
        </Modal.Header>

        <Modal.Body className="overflow-visible">
          <div className="row g-3">
            <div className="col-lg-6">
              <label className="form-label">Application name</label>
              <Dropdown onSelect={(eventKey) => setAppName(eventKey)}>
                <Dropdown.Toggle
                  variant="light"
                  style={editing ? { pointerEvents: "none" } : {}}
                >
                  <i className="icon-user-o" /> {handleDisabledApplicationName}
                </Dropdown.Toggle>
                <Dropdown.Menu className="user-filter-dropdown-menu">
                  <Dropdown.Item
                    disabled={editing}
                    eventKey="All Applications"
                    className={`${
                      appName === "All Applications"
                        ? "page-header-dropdown page-header-dropdown-light-text-active"
                        : "page-header-dropdown"
                    }`}
                  >
                    All Applications
                  </Dropdown.Item>
                  {appsWithoutLicese.map(
                    (
                      option: { appname: string; id: number },
                      index: number
                    ) => (
                      <Dropdown.Item
                        disabled={editing}
                        href="#"
                        key={index}
                        eventKey={option.appname}
                        className={`${
                          option.appname === appName
                            ? "page-header-dropdown page-header-dropdown-light-text-active"
                            : "page-header-dropdown"
                        }`}
                      >
                        {option.appname}
                      </Dropdown.Item>
                    )
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="col-lg-6">
              <label className="form-label">Application Capacity</label>
              <input
                onChange={(e) => setCurrentAppVersion(Number(e.target.value))}
                value={handleInputValue}
                type="number"
                className={`form-control ${
                  appCapacityError ? "error-input" : ""
                }`}
                placeholder="Application Capacity"
              />
              {appCapacityError ? (
                <span className="error-span">Required</span>
              ) : (
                <></>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleAddNewSubmition}
          >
            Submit
          </button>
          <button
            onClick={handleResetFormOnClose}
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
