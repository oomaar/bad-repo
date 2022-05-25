import { useState } from "react";
import { CloseButton, Modal } from "react-bootstrap";
import { useAuthedClient } from "../context/AuthedClientContext";
import { ToastSuccessFunction } from "../utils/ToastFunction";

export const ChangePassword = (props: {
  handleCloseAllModals: () => void;
  handleCloseChangePassword: () => void;
}) => {
  const { handleCloseChangePassword, handleCloseAllModals } = props;

  const [oldPassWord, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldpassError, setoldpassError] = useState({ msg: "", show: false });
  const [newpassError, setNewPassError] = useState({ msg: "", show: false });
  const [confirmPassError, setConfirmPassError] = useState({
    msg: "",
    show: false,
  });
  const auth = useAuthedClient();
  async function handlesumbit() {
    if (oldPassWord !== "" && newPassword !== "" && confirmPassword !== "") {
      if (newPassword === confirmPassword) {
        if (newPassword.length < 6) {
          setNewPassError({
            show: true,
            msg: "Password must be atleast 6 characters",
          });
        } else {
          const res = await auth.changeUserPassword(oldPassWord, newPassword);
          if (res.data) {
            ToastSuccessFunction("Password Changed Successfully");
            handleCloseChangePassword();
          } else {
            setoldpassError({ msg: "Wrong Password", show: true });
            setNewPassError({
              msg: "",
              show: false,
            });
            setConfirmPassError({
              msg: "",
              show: false,
            });
          }
        }
      } else {
        setoldpassError({ msg: "", show: false });
        setNewPassError({
          msg: "passWord And Confirm Password MissMatch",
          show: true,
        });
        setConfirmPassError({
          msg: "passWord And Confirm Password MissMatch",
          show: true,
        });
      }
    } else {
      if (oldPassWord === "") {
        setoldpassError({ msg: "Required", show: true });
      }
      if (newPassword === "") {
        setNewPassError({ msg: "Required", show: true });
      }
      if (confirmPassword === "") {
        setConfirmPassError({ msg: "Required", show: true });
      }
    }
  }
  return (
    <>
      <Modal.Header>
        <Modal.Title>Profile Information</Modal.Title>
        <CloseButton onClick={handleCloseAllModals} />
      </Modal.Header>
      <Modal.Body className="change-password-modal-body">
        <div>
          <label className="form-label">Old Password</label>
          <input
            onChange={(e) => {
              setOldPassword(e.target.value);
              setoldpassError({ msg: "", show: false });
            }}
            value={oldPassWord}
            autoComplete="new-password"
            type="password"
            className={`form-control ${oldpassError.show ? "error-input" : ""}`}
            placeholder="Old Password"
          />
          {oldpassError.show && (
            <span className="error-span">{oldpassError.msg}</span>
          )}
        </div>
        <div>
          <label className="form-label">New Password</label>
          <input
            onChange={(e) => {
              setNewPassword(e.target.value);
              setNewPassError({ msg: "", show: false });
            }}
            value={newPassword}
            autoComplete="new-password"
            type="password"
            className={`form-control ${newpassError.show ? "error-input" : ""}`}
            placeholder="New Password"
          />
          {newpassError.show && (
            <span className="error-span">{newpassError.msg}</span>
          )}
        </div>
        <div>
          <label className="form-label">Confirm New Password</label>
          <input
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setConfirmPassError({ msg: "", show: false });
            }}
            value={confirmPassword}
            autoComplete="new-password"
            type="password"
            className={`form-control ${
              confirmPassError.show ? "error-input" : ""
            }`}
            placeholder="Confirm New Password"
          />
          {confirmPassError.show && (
            <span className="error-span">{confirmPassError.msg}</span>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer className="mt-4">
        <button
          type="submit"
          className="btn btn-primary"
          onClick={() => handlesumbit()}
        >
          Submit
        </button>
        <button
          onClick={handleCloseChangePassword}
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Back
        </button>
      </Modal.Footer>
    </>
  );
};
