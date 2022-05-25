import { ReactElement } from "react";
import { CloseButton, Modal } from "react-bootstrap";

export const DeleteModal = (props: {
  showDeleteModal: boolean;
  handleCloseDeleteModal: () => void;
  currentAppName: string;
  deleteButton: ReactElement<HTMLButtonElement>;
}) => {
  const {
    showDeleteModal,
    handleCloseDeleteModal,
    currentAppName,
    deleteButton,
  } = props;

  return (
    <Modal
      className={`${
        showDeleteModal ? "popUpModal details-modal-opened" : "popUpModal"
      }`}
      keyboard={false}
      centered={true}
      scrollable={true}
      onHide={handleCloseDeleteModal}
      show={showDeleteModal}
      size="lg"
    >
      <div className="modal-content">
        <Modal.Body>
          <div className="d-flex">
            <CloseButton onClick={handleCloseDeleteModal} />
            <div className="flex-shrink-0">
              <i className="icon-trash-empty"></i>
            </div>
            <div className="flex-grow-1">
              <h4>Are you sure?</h4>
              <p>
                You are about to delete {currentAppName}, once deleted you can
                not undo this action.
              </p>
              <div className="popUpModalBtn">
                <button
                  onClick={handleCloseDeleteModal}
                  className="btn btn-outline-secondary btn-sm"
                >
                  Cancel
                </button>
                {deleteButton}
              </div>
            </div>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
};
