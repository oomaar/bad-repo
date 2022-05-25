import { useEffect, useState } from "react";
import { CloseButton, Modal } from "react-bootstrap";
import { useAuthedClient } from "../context/AuthedClientContext";
import { ChangePassword } from "./ChangePassword";
// import jwt_decode from "jwt-decode";

type User = {
  username: string;
  role: string;
  token: string;
  expiration: string;
  fullName: string;
  title: string;
};

type UserDetails = {
  id: string;
  userName: string;
  normalizedUserName: string;
  email: string;
  fullName: string | null;
  title: string;
  phoneNumber: string | null;
};

export const Profile = (props: {
  myProfile: boolean;
  handleCloseMyProfile: () => void;
  user: User | undefined;
  handleShowChangePassword: () => void;
  changePassword: boolean;
  handleCloseChangePassword: () => void;
}) => {
  const {
    myProfile,
    handleCloseMyProfile,
    // user,
    handleShowChangePassword,
    changePassword,
    handleCloseChangePassword,
  } = props;

  const authedClient = useAuthedClient();

  const handleCloseAllModals = () => {
    handleCloseMyProfile();
    handleCloseChangePassword();
  };

  // This Code Is Commented In Case, Super Admin ID is Required
  // const [adminDetails, setAdminDetails] = useState<UserDetails>();
  // const [userId, setUserId] = useState<string>("");
  // const userToken: string = user?.token !== undefined ? user?.token : "";
  // console.log("🚀 ~ file: Profile.tsx ~ line 46 ~ userId", userId);

  // async function getUserObject() {
  //   const userObject: any = await jwt_decode(userToken);

  //   setUserId(userObject.UserId);
  // }

  // async function getAdminSummaryDetails(id: string) {
  //   await authedClient.getAdminSummary(id).then((res) => {
  //     if (res) {
  //       setAdminDetails(res.data);
  //     }
  //   });
  // }

  // useEffect(() => {
  //   const callBackFunction = async () => {
  //     await getUserObject();
  //     if (userId !== "") {
  //       getAdminSummaryDetails(userId);
  //     }
  //   };
  //   callBackFunction();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [userId]);
  // This Code Is Commented In Case, Super Admin ID is Required

  const [currentUserInfo, setCurrentUserInfo] = useState<
    UserDetails | undefined
  >({
    id: "",
    userName: "",
    normalizedUserName: "",
    email: "",
    fullName: "",
    title: "",
    phoneNumber: "",
  });

  async function getCurrentProfile() {
    await authedClient
      .getCurrentProfileSummary()
      .then((res) => setCurrentUserInfo(res.data));
  }

  useEffect(() => {
    getCurrentProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal
      className={`${
        myProfile ? "popUpModal details-modal-opened" : "popUpModal"
      }`}
      keyboard={false}
      centered={true}
      scrollable={true}
      onHide={() => handleCloseAllModals()}
      show={myProfile}
      size="lg"
    >
      {changePassword ? (
        <ChangePassword
          handleCloseAllModals={handleCloseAllModals}
          handleCloseChangePassword={handleCloseChangePassword}
        />
      ) : (
        <>
          <Modal.Header>
            <Modal.Title>Profile Information</Modal.Title>
            <CloseButton onClick={handleCloseAllModals} />
          </Modal.Header>
          <Modal.Body className="profile-modal-body">
            <div className="profile-container">
              <div className="profile-card">
                <label>Username: </label>
                <p>{currentUserInfo?.userName}</p>
              </div>
              <div className="profile-card">
                <label>Fullname: </label>
                <p>{`${currentUserInfo?.fullName}`}</p>
              </div>
              <div className="profile-card">
                <label>Title: </label>
                <p>{currentUserInfo?.title}</p>
              </div>
              <div className="profile-card">
                <label>Phone number: </label>
                <p>{`${currentUserInfo?.phoneNumber}`}</p>
              </div>
              <div className="profile-card">
                <label>Email: </label>
                <p>{`${currentUserInfo?.email}`}</p>
              </div>
            </div>
            <button
              className="profile-button"
              onClick={handleShowChangePassword}
            >
              Change Password
            </button>
          </Modal.Body>
        </>
      )}
    </Modal>
  );
};
