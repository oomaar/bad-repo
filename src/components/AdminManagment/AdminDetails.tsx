import { CloseButton, Modal } from "react-bootstrap";

export const AdminDetails = (props: {
  showAdminDetailsModal: boolean;
  handleCloseAdminDetailsModal: () => void;
  currentUser: string;
  currentUserDetails: {
    userName: string;
    fullName: string;
    title: string;
    email: string;
    phoneNumber: string;
  };
}) => {
  const {
    showAdminDetailsModal,
    handleCloseAdminDetailsModal,
    currentUser,
    currentUserDetails,
  } = props;

  return (
    <Modal
      className={`${
        showAdminDetailsModal ? "popUpModal details-modal-opened" : "popUpModal"
      }`}
      keyboard={false}
      centered={true}
      scrollable={true}
      onHide={handleCloseAdminDetailsModal}
      show={showAdminDetailsModal}
      size="lg"
    >
      <div className="modal-content">
        <Modal.Header>
          <Modal.Title>{currentUser}'s Details</Modal.Title>
          <CloseButton onClick={handleCloseAdminDetailsModal} />
        </Modal.Header>
        <Modal.Body
          style={{
            background: "rgb(238, 242, 247)",
            padding: "1rem",
            borderRadius: "1rem",
          }}
        >
          <div
            className="admin-info-container"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              padding: "0.5rem 0",
            }}
          >
            <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              Username
            </div>
            <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              {currentUserDetails.userName}
            </span>
          </div>
          <div
            className="admin-info-container"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              padding: "0.5rem 0",
            }}
          >
            <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Full Name</p>
            <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              {currentUserDetails.fullName}
            </span>
          </div>
          <div
            className="admin-info-container"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              padding: "0.5rem 0",
            }}
          >
            <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Title</p>
            <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              {currentUserDetails.title}
            </span>
          </div>
          <div
            className="admin-info-container"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              padding: "0.5rem 0",
            }}
          >
            <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Email</p>
            <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              {currentUserDetails.email}
            </span>
          </div>
          <div
            className="admin-info-container"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              padding: "0.5rem 0",
            }}
          >
            <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              Phone Number
            </p>
            <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              {currentUserDetails.phoneNumber}
            </span>
          </div>
        </Modal.Body>
        <Modal.Footer className="mt-4">
          <button
            onClick={handleCloseAdminDetailsModal}
            className="btn btn-secondary"
          >
            Close
          </button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};
