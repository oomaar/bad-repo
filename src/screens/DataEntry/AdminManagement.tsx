import { useEffect, useState } from "react";
import { GetUsersAdmins, GetUsersAdminsData } from "../../client/AuthedClient";
import {
  Table,
  width35pxStyle,
  width52pxStyle,
  width80pxStyle,
} from "../../components/Table";
import { useAuthedClient } from "../../context/AuthedClientContext";
import {
  AddNewUserModal,
  AdminDetails,
  EditUserModal,
  PasswordModal,
} from "../../components/AdminManagment";
import { DeleteModal } from "../../components/DataEntry";
import { ToastSuccessFunction } from "../../utils/ToastFunction";

type AdminDetailsType = {
  userName: string;
  fullName: string;
  title: string;
  email: string;
  phoneNumber: string;
};

export const AdminManagement = () => {
  const authedClient = useAuthedClient();
  const [userAdmins, setUserAdmins] = useState<GetUsersAdmins | undefined>();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAdminDetailsModal, setShowAdminDetailsModal] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [currentUserDetails, setCurrentUserDetails] =
    useState<AdminDetailsType>({
      userName: "",
      fullName: "",
      title: "",
      email: "",
      phoneNumber: "",
    });
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentFullName, setCurrentFullName] = useState("");
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userId, setUserId] = useState("");
  const arrayOfUsers: Array<GetUsersAdminsData> =
    userAdmins !== undefined ? userAdmins?.data : [];

  const handleCloseAddModal = () => setShowAddModal(false);

  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = (userName: string) => {
    setCurrentUser(userName);
    setShowDeleteModal(true);
  };

  const handleCloseAdminDetailsModal = () => setShowAdminDetailsModal(false);
  const handleShowAdminDetailsModal = (userName: string) => {
    setCurrentUser(userName);
    setShowAdminDetailsModal(true);
  };

  const handleClosePasswordModal = () => setShowPasswordModal(false);
  const handleShowPasswordModal = (userName: string) => {
    setCurrentUser(userName);
    setNewPassword("");
    setConfirmPassword("");
    setShowPasswordModal(true);
  };

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = (
    userName: string,
    email: string,
    title: string,
    fullName: string,
    phoneNumber: string
  ) => {
    setShowEditModal(true);
    setCurrentEmail(email);
    setCurrentUser(userName);
    setCurrentTitle(title);
    setCurrentFullName(fullName);
    setCurrentPhoneNumber(phoneNumber);
  };

  async function getAllUsersAdmins() {
    await authedClient.getUsersAdmins().then((data) => setUserAdmins(data));
  }

  async function getAdminUserDetails(id: string) {
    await authedClient
      .getAdminSummary(id)
      .then((res) => setCurrentUserDetails(res.data));
  }

  async function createUserAdmin(
    username: string,
    email: string,
    password: string,
    fullName: string,
    phoneNumber: string,
    title: string
  ) {
    await authedClient.postUsersAdmins(
      username,
      email,
      password,
      fullName,
      phoneNumber,
      title
    );
    setShowAddModal(false);
    await getAllUsersAdmins();

    ToastSuccessFunction("Success Adding New Admin");
  }

  async function updateUserAdmin(
    id: string,
    fullName: string,
    title: string,
    phoneNumber: string,
    email: string
  ) {
    await authedClient
      .updateUserAdmins(id, fullName, title, phoneNumber, email)
      .then((res) => {
        handleCloseEditModal();
        if (res) {
          getAllUsersAdmins();
        }
      });
  }

  async function resetPasswordUserAdmin(id: string, newPassword: string) {
    await authedClient.resetUsersAdminsPassword(id, newPassword).then((res) => {
      handleClosePasswordModal();
    });
  }

  async function deleteUserAdmin(id: string) {
    await authedClient.deleteAdmin(id).then((res) => {
      handleCloseDeleteModal();
      if (res) {
        getAllUsersAdmins();
      }
    });
  }

  const handleDeleteUser = (currentUser: string, userId: string) => {
    deleteUserAdmin(userId);
    ToastSuccessFunction(`Success Delete User ${currentUser}`);
    handleCloseDeleteModal();
  };

  useEffect(() => {
    getAllUsersAdmins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    { name: "Username", attr: "userName", style: width80pxStyle },
    { name: "Full Name", attr: "fullName", style: width80pxStyle },
    { name: "Email", attr: "email", style: width80pxStyle },
    { name: "Title", attr: "title", style: width80pxStyle },
    { name: "Reset Password", style: width52pxStyle, attr: "" },
    { name: "Edit", style: width35pxStyle, attr: "" },
    { name: "Delete", style: width35pxStyle, attr: "" },
    { name: "Details", style: width35pxStyle, attr: "" },
  ];

  const rows = (array: Array<GetUsersAdminsData>) => {
    return array.map((user, index) => (
      <tr key={index}>
        <td>{user.userName}</td>
        <td>{user.fullName}</td>
        <td>{user.email}</td>
        <td>{user.title}</td>
        <td style={{ textAlign: "center" }}>
          <i
            className="mouse-pointer edit-icon bx bxs-lock-alt"
            onClick={() => {
              setUserId(user.id);
              handleShowPasswordModal(user.userName);
            }}
          />
        </td>
        <td style={{ textAlign: "center" }}>
          <i
            className="mouse-pointer edit-icon icon-pencil-alt-1"
            onClick={() => {
              setUserId(user.id);
              handleShowEditModal(
                user.userName,
                user.email,
                user.title,
                user.fullName,
                user.phoneNumber
              );
            }}
          />
        </td>
        <td style={{ textAlign: "center" }}>
          <i
            className="mouse-pointer delete-icon icon-trash-2"
            onClick={() => {
              handleShowDeleteModal(user.userName);
              setUserId(user.id);
            }}
          />
        </td>
        <td style={{ textAlign: "center" }}>
          <i
            className="icon-doc-text view-icon mouse-pointer"
            onClick={() => {
              setUserId(user.id);
              handleShowAdminDetailsModal(user.userName);
              getAdminUserDetails(user.id);
            }}
          />
        </td>
      </tr>
    ));
  };

  const excelData: any = [];
  const rowsData: any = [];
  arrayOfUsers.map((user) => {
    let excelObj = {
      userName: user.userName,
      fullName: user.fullName,
      email: user.email,
      title: user.title,
    };
    let obj = {
      id: user.id,
      userName: user.userName,
      email: user.email,
      fullName: user.fullName,
      title: user.title,
      phoneNumber: user.phoneNumber,
    };
    rowsData.push(obj);
    excelData.push(excelObj);
    return 0;
  });
  const rowStrings = arrayOfUsers.map((user) => [user.userName]);

  const deleteButton = (
    <button
      onClick={() => handleDeleteUser(currentUser, userId)}
      className="btn btn-primary btn-sm"
    >
      Confirm
    </button>
  );

  return (
    <div className="page-container">
      <div className="page-title d-xl-flex">
        <h1 className="me-auto">Admin Management</h1>
      </div>
      <div className="white-box m-0">
        <Table
          pageTitle={"Admin Management"}
          rows={rows}
          rowsData={rowsData}
          columns={columns}
          rowsStrings={rowStrings}
          excelData={excelData}
        />
        <br />
        <div
          className="btn btn-sm btn-success"
          onClick={() => setShowAddModal(true)}
        >
          <i className="icon-plus-circle" /> Add New
        </div>
        <AddNewUserModal
          showAddModal={showAddModal}
          handleCloseAddModal={handleCloseAddModal}
          createUserAdmin={createUserAdmin}
        />
        <DeleteModal
          currentAppName={currentUser}
          deleteButton={deleteButton}
          handleCloseDeleteModal={handleCloseDeleteModal}
          showDeleteModal={showDeleteModal}
        />
        <PasswordModal
          setNewPassword={setNewPassword}
          setConfirmPassword={setConfirmPassword}
          newPassword={newPassword}
          confirmPassword={confirmPassword}
          showPasswordModal={showPasswordModal}
          handleClosePasswordModal={handleClosePasswordModal}
          currentUser={currentUser}
          resetPasswordUserAdmin={resetPasswordUserAdmin}
          userId={userId}
        />
        <EditUserModal
          currentEmail={currentEmail}
          setCurrentEmail={setCurrentEmail}
          showEditModal={showEditModal}
          handleCloseEditModal={handleCloseEditModal}
          currentUser={currentUser}
          currentTitle={currentTitle}
          currentFullName={currentFullName}
          currentPhoneNumber={currentPhoneNumber}
          setCurrentTitle={setCurrentTitle}
          setCurrentFullName={setCurrentFullName}
          setCurrentPhoneNumber={setCurrentPhoneNumber}
          userId={userId}
          updateUserAdmin={updateUserAdmin}
        />
        <AdminDetails
          showAdminDetailsModal={showAdminDetailsModal}
          handleCloseAdminDetailsModal={handleCloseAdminDetailsModal}
          currentUser={currentUser}
          currentUserDetails={currentUserDetails}
        />
      </div>
    </div>
  );
};
