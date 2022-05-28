import { ChangeEvent, useState } from "react";
import { CloseButton, Modal } from "react-bootstrap";
import { ToastSuccessFunction } from "../../utils/ToastFunction";

export const PasswordModal = (props: {
  showPasswordModal: boolean;
  handleClosePasswordModal: () => void;
  currentUser: string;
  newPassword: string;
  setNewPassword: (pass: string) => void;
  confirmPassword: string;
  setConfirmPassword: (pass: string) => void;
  resetPasswordUserAdmin: (id: string, newPassword: string) => void;
  userId: string;
}) => {
  const {
    showPasswordModal,
    handleClosePasswordModal,
    currentUser,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    resetPasswordUserAdmin,
    userId,
  } = props;

  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmationError, setConfirmationError] = useState(false);
  const [passLengthError, setPassLengthError] = useState(false);

  const validateForm = newPassword === confirmPassword;
  const validatePassword = newPassword === "" || confirmPassword === "";
  const passwordIsNotEmpty = newPassword !== "" && confirmPassword !== "";

  const resetForm = () => {
    setPasswordError(false);
    setConfirmPasswordError(false);
    setNewPassword("");
    setConfirmPassword("");
    setConfirmationError(false);
    setPassLengthError(false);
  };

  const handleCloseModalWithErrors = () => {
    handleClosePasswordModal();
    resetForm();
  };

  const handleSubmit = () => {
    if (validateForm && !validatePassword) {
      if (newPassword.length >= 6) {
        resetPasswordUserAdmin(userId, newPassword);
        handleCloseModalWithErrors();
        ToastSuccessFunction(`Success Change ${currentUser}'s Password`);
      } else {
        setPassLengthError(true);
      }
    }
    if (newPassword === "") {
      setPasswordError(true);
    }
    if (confirmPassword === "") {
      setConfirmPasswordError(true);
    }
    if (passwordIsNotEmpty && !validateForm) {
      setConfirmationError(true);
    }
  };

  const handleConfirmPasswordInputChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPasswordError(false);
    setConfirmationError(false);
    setConfirmPassword(e.target.value);
  };

  const handleNewPasswordInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordError(false);
    setConfirmationError(false);
    setNewPassword(e.target.value);
    setPassLengthError(false);
  };

  return (
    <Modal
      className={`${
        showPasswordModal ? "popUpModal details-modal-opened" : "popUpModal"
      }`}
      keyboard={false}
      centered={true}
      scrollable={true}
      onHide={handleCloseModalWithErrors}
      show={showPasswordModal}
      size="lg"
    >
      <form onSubmit={(e) => e.preventDefault()} className="modal-content">
        <Modal.Header>
          <Modal.Title>Change Password For {currentUser}</Modal.Title>
          <CloseButton onClick={handleCloseModalWithErrors} />
        </Modal.Header>

        <Modal.Body>
          <div className="row g-3">
            <div className="col-lg-6">
              <label className="form-label">New Password</label>
              <input
                autoComplete="new-password"
                type="password"
                className={`form-control ${
                  passwordError || passLengthError || confirmationError
                    ? "error-input"
                    : ""
                }`}
                placeholder="New Password"
                onChange={(e) => handleNewPasswordInputChange(e)}
                value={newPassword}
              />
              {passwordError ? (
                <span className="error-span">Required !</span>
              ) : confirmationError ? (
                <span className="error-span">Password mismatch</span>
              ) : passLengthError ? (
                <span className="error-span">
                  Password must be atleast 6 characters
                </span>
              ) : (
                <></>
              )}
            </div>
            <div className="col-lg-6">
              <label className="form-label">Confirm New Password</label>
              <input
                autoComplete="new-password"
                type="password"
                className={`form-control ${
                  confirmPasswordError || passLengthError || confirmationError
                    ? "error-input"
                    : ""
                }`}
                placeholder="Confirm New Password"
                onChange={(e) => handleConfirmPasswordInputChange(e)}
                value={confirmPassword}
              />
              {confirmPasswordError ? (
                <span className="error-span">Required !</span>
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
            onClick={() => handleSubmit()}
          >
            Submit
          </button>
          <button
            onClick={handleCloseModalWithErrors}
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
