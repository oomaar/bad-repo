import { ChangeEvent, useState } from "react";
import { CloseButton, Modal } from "react-bootstrap";
import isEmail from "validator/lib/isEmail";

export const AddNewUserModal = (props: {
  showAddModal: boolean;
  handleCloseAddModal: () => void;
  createUserAdmin: (
    username: string,
    email: string,
    password: string,
    fullName: string,
    phoneNumber: string,
    title: string
  ) => void;
  userNamesArray: Array<string>;
}) => {
  const {
    showAddModal,
    handleCloseAddModal,
    createUserAdmin,
    userNamesArray,
  } = props;

  // Values
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [title, setTitle] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  // Errors
  const [userNameError, setUserNameError] = useState(false);
  const [emailError, setEmailError] = useState<{ show: boolean; msg: string }>({
    show: false,
    msg: "",
  });
  const [fullNameError, setFullNameError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState({
    show: false,
    msg: "",
  });
  const [passwordError, setPasswordError] = useState({ show: false, msg: "" });
  const [userNameExistError, setUserNameExistError] = useState(false);

  // Validation
  const formIsValid =
    username !== "" &&
    email !== "" &&
    fullName !== "" &&
    title !== "" &&
    phoneNumber !== "" &&
    password !== "" &&
    isEmail(email) &&
    password.length >= 6 &&
    !(phoneNumber.includes("e") || phoneNumber.includes("."));

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setFullName("");
    setTitle("");
    setPhoneNumber("");
    setUserNameError(false);
    setEmailError({ show: false, msg: "" });
    setFullNameError(false);
    setTitleError(false);
    setPhoneNumberError({ show: false, msg: "" });
    setPasswordError({ show: false, msg: "" });
    setUserNameExistError(false);
  };

  const handleSubmit = (
    username: string,
    email: string,
    password: string,
    fullName: string,
    phoneNumber: string,
    title: string
  ) => {
    createUserAdmin(username, email, password, fullName, phoneNumber, title);
    resetForm();
  };

  const validateForm = (
    username: string,
    email: string,
    password: string,
    fullName: string,
    phoneNumber: string,
    title: string
  ) => {
    if (formIsValid) {
      handleSubmit(username, email, password, fullName, phoneNumber, title);
    }
    if (username === "") {
      setUserNameError(true);
    }
    if (email === "") {
      setEmailError({ show: true, msg: "Required" });
    } else if (!isEmail(email)) {
      setEmailError({ show: true, msg: "Invalid Email Format" });
    }
    if (password === "") {
      setPasswordError({ show: true, msg: "Required" });
    } else if (password.length < 6) {
      setPasswordError({
        show: true,
        msg: "Password must be atleast 6 characters",
      });
    }
    if (fullName === "") {
      setFullNameError(true);
    }
    if (phoneNumber === "") {
      setPhoneNumberError({ show: true, msg: "Required" });
    } else if (phoneNumber.includes("e") || phoneNumber.includes(".")) {
      setPhoneNumberError({ show: true, msg: "Invalid PhoneNumber" });
    }
    if (title === "") {
      setTitleError(true);
    }
    if (userNamesArray.includes(username)) {
      setUserNameExistError(true);
    }
  };

  // Input Functions
  const handleUserNameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserNameError(false);
    setUserNameExistError(false);
    setUsername(e.target.value);
  };

  const handleEmailInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailError({ show: false, msg: "" });
    setEmail(e.target.value);
  };

  const handlePasswordInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordError({ show: false, msg: "" });
    setPassword(e.target.value);
  };

  const handleFullNameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFullNameError(false);
    setFullName(e.target.value);
  };

  const handlePhoneNumberInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumberError({ show: false, msg: "" });
    setPhoneNumber(e.target.value);
  };

  const handleTitleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleError(false);
    setTitle(e.target.value);
  };

  const handleCloseModalAndResetForm = () => {
    handleCloseAddModal();
    resetForm();
  };

  return (
    <Modal
      className={`${
        showAddModal ? "popUpModal details-modal-opened" : "popUpModal"
      }`}
      keyboard={false}
      centered={true}
      scrollable={true}
      onHide={handleCloseModalAndResetForm}
      show={showAddModal}
      size="lg"
    >
      <form onSubmit={(e) => e.preventDefault()} className="modal-content">
        <Modal.Header>
          <Modal.Title>Add New Admin</Modal.Title>
          <CloseButton onClick={handleCloseModalAndResetForm} />
        </Modal.Header>

        <Modal.Body>
          <div className="row g-3">
            <div className="col-lg-6">
              <label className="form-label">Username</label>
              <input
                type="text"
                className={`form-control ${
                  userNameError || userNameExistError ? "error-input" : ""
                }`}
                placeholder="Username"
                onChange={(e) => handleUserNameInputChange(e)}
                value={username}
              />
              {userNameError ? (
                <span className="error-span">Required</span>
              ) : userNameExistError ? (
                <span className="error-span">Username already exists</span>
              ) : (
                <></>
              )}
            </div>
            <div className="col-lg-6">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className={`form-control ${fullNameError ? "error-input" : ""}`}
                placeholder="Full Name"
                onChange={(e) => handleFullNameInputChange(e)}
                value={fullName}
              />
              {fullNameError ? (
                <span className="error-span">Required</span>
              ) : (
                <></>
              )}
            </div>
            <div className="col-lg-6">
              <label className="form-label">Title</label>
              <input
                type="text"
                className={`form-control ${titleError ? "error-input" : ""}`}
                placeholder="Title"
                onChange={(e) => handleTitleInputChange(e)}
                value={title}
              />
              {titleError ? (
                <span className="error-span">Required</span>
              ) : (
                <></>
              )}
            </div>
            <div className="col-lg-6">
              <label className="form-label">Phone Number</label>
              <input
                className={`form-control ${
                  phoneNumberError.show ? "error-input" : ""
                }`}
                placeholder="Phone Number"
                onChange={(e) => handlePhoneNumberInputChange(e)}
                type={"number"}
                value={phoneNumber}
                // onKeyPress={(evt) => {
                //   if (
                //     (evt.which !== 8 && evt.which !== 0 && evt.which < 48) ||
                //     evt.which > 57
                //   ) {
                //     evt.preventDefault();
                //   }
                // }}

                onKeyDown={(e) =>
                  (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
                }
              />
              {phoneNumberError.show ? (
                <span className="error-span">{phoneNumberError.msg}</span>
              ) : (
                <></>
              )}
            </div>
            <div className="col-lg-6">
              <label className="form-label">Email</label>
              <input
                autoComplete="off"
                type="email"
                className={`form-control ${
                  emailError.show ? "error-input" : ""
                }`}
                placeholder="Email"
                onChange={(e) => handleEmailInputChange(e)}
                value={email}
              />
              {emailError.show ? (
                <span className="error-span">{emailError.msg}</span>
              ) : (
                <></>
              )}
            </div>
            <div className="col-lg-6">
              <label className="form-label">Password</label>
              <input
                autoComplete="new-password"
                type="password"
                className={`form-control ${
                  passwordError.show ? "error-input" : ""
                }`}
                placeholder="Password"
                onChange={(e) => handlePasswordInputChange(e)}
                value={password}
              />
              {passwordError.show ? (
                <span className="error-span">{passwordError.msg}</span>
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
            onClick={() =>
              validateForm(
                username,
                email,
                password,
                fullName,
                phoneNumber,
                title
              )
            }
          >
            Submit
          </button>
          <button
            onClick={handleCloseModalAndResetForm}
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
