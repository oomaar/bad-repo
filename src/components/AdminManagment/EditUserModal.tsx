import { CloseButton, Modal } from "react-bootstrap";
import { ToastSuccessFunction } from "../../utils/ToastFunction";
import isEmail from "validator/lib/isEmail";
import { useState } from "react";

export const EditUserModal = (props: {
  showEditModal: boolean;
  handleCloseEditModal: () => void;
  currentUser: string;
  currentTitle: string;
  currentFullName: string;
  currentPhoneNumber: string;
  currentEmail: string;
  setCurrentTitle: (title: string) => void;
  setCurrentFullName: (fullName: string) => void;
  setCurrentPhoneNumber: (phoneNumber: string) => void;
  setCurrentEmail: (email: string) => void;
  userId: string;
  updateUserAdmin: (
    id: string,
    fullName: string,
    title: string,
    phoneNumber: string,
    email: string
  ) => void;
}) => {
  const {
    showEditModal,
    handleCloseEditModal,
    currentUser,
    currentTitle,
    currentFullName,
    currentPhoneNumber,
    currentEmail,
    setCurrentTitle,
    setCurrentFullName,
    setCurrentPhoneNumber,
    setCurrentEmail,
    userId,
    updateUserAdmin,
  } = props;
  const [emailError, setEmailError] = useState({ show: false, msg: "" });
  const [phoneError, setPhoneError] = useState({ show: false, msg: "" });
  const handleSubmit = (
    userName: string,
    id: string,
    fullName: string,
    title: string,
    phoneNumber: string,
    email: string
  ) => {
    if (email === "") {
      setEmailError({ show: true, msg: "Empty Email Input" });
    } else if (
      isEmail(email) &&
      !(
        phoneNumber.includes("e") ||
        phoneNumber.includes(".") ||
        phoneNumber === ""
      )
    ) {
      updateUserAdmin(id, fullName, title, phoneNumber, email);
      setEmailError({ show: false, msg: "" });
      handleCloseEditModal();
      ToastSuccessFunction(`Success Editing ${userName}'s Information.`);
    } else {
      if (!isEmail(email)) {
        setEmailError({ show: true, msg: "Invalid Email Format" });
      }
      if (
        phoneNumber.includes("e") ||
        phoneNumber.includes(".") ||
        phoneNumber === ""
      ) {
        setPhoneError({ show: true, msg: "Invalid Phone Number" });
      }
    }
  };

  return (
    <Modal
      className={`${
        showEditModal ? "popUpModal details-modal-opened" : "popUpModal"
      }`}
      keyboard={false}
      centered={true}
      scrollable={true}
      onHide={handleCloseEditModal}
      show={showEditModal}
      size="lg"
    >
      <div className="modal-content">
        <Modal.Header>
          <Modal.Title>Edit User {currentUser}</Modal.Title>
          <CloseButton onClick={handleCloseEditModal} />
        </Modal.Header>

        <Modal.Body>
          <div className="row g-3">
            <div className="col-lg-6">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={currentUser}
                disabled
              />
            </div>
            <div className="col-lg-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className={`form-control ${
                  emailError.show ? "error-input" : ""
                }`}
                placeholder="Edit Email"
                onChange={(e) => setCurrentEmail(e.target.value)}
                value={currentEmail}
              />
              {emailError.show && (
                <span className="error-span">{emailError.msg}</span>
              )}
            </div>
            <div className="col-lg-6">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Edit Title"
                onChange={(e) => setCurrentTitle(e.target.value)}
                value={currentTitle}
              />
            </div>
            <div className="col-lg-6">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Edit Full Name"
                onChange={(e) => setCurrentFullName(e.target.value)}
                value={currentFullName}
              />
            </div>
            <div className="col-lg-6">
              <label className="form-label">Phone Number</label>
              <input
                type="number"
                className="form-control"
                placeholder="Edit Phone Number"
                onChange={(e) => setCurrentPhoneNumber(e.target.value)}
                value={currentPhoneNumber}
                onKeyDown={(e) =>
                  (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
                }
              />
              {phoneError.show && (
                <span className="error-span">{phoneError.msg}</span>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="mt-4">
          <button
            className="btn btn-primary"
            onClick={() =>
              handleSubmit(
                currentUser,
                userId,
                currentFullName,
                currentTitle,
                currentPhoneNumber,
                currentEmail
              )
            }
          >
            Submit
          </button>
          <button
            onClick={() => {
              setEmailError({ show: false, msg: "" });
              handleCloseEditModal();
            }}
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
