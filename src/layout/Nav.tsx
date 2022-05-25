import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import userImage from "../img/user-pic.jpg";
import { Profile } from "./Profile";
import routesArray from "../staticData/sidebarMenu.json";

export const Nav = ({
  setShowSidebar,
  setShownGroupIndex,
  setShownLinkIndex,
}: {
  setShowSidebar: any;
  setShownGroupIndex: (index: number) => void;
  setShownLinkIndex: (index: number) => void;
}) => {
  const [show, setShow] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [myProfile, setMyProfile] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const user = useAuth().user;

  const auth = useAuth();
  let dropDownState = false;

  if (searchInput !== "") {
    dropDownState = true;
  }

  const handleCloseMyProfile = () => setMyProfile(false);
  const handleShowChangePassword = () => setChangePassword(true);
  const handleCloseChangePassword = () => setChangePassword(false);

  return (
    <>
      <div className={`top-nav`}>
        <button
          type="button"
          id="sidebarCollapse"
          className="btn"
          onClick={() => setShowSidebar((state: boolean) => !state)}
        >
          <i className="icon-menu-1" />
        </button>

        <form className="topbar-search me-auto d-none d-md-flex">
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Search projects…"
          />
          <button type="button" className="btn">
            <i className="icon-search" />
          </button>
        </form>

        <ul className="navbar navbar-expand topbar-menu">
          <li className="nav-item dropdown d-block d-md-none">
            <div
              className="nav-link dropdown-toggle mouse-pointer"
              id="navbarDropdown"
            >
              <i className="icon-search-7" />
            </div>

            <div
              className="dropdown-menu slideIn"
              aria-labelledby="navbarDropdown"
            >
              <form className="topbar-search d-flex">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search…"
                />
                <button type="button" className="btn">
                  <i className="icon-search" />
                </button>
              </form>
            </div>
          </li>
          <li
            className="nav-item dropdown user-control"
            onClick={() => setShow(!show)}
          >
            <div className="nav-link dropdown-toggle mouse-pointer">
              <i className="user-pic">
                <img src={userImage} alt="" />
                <span className="user-status"></span>
              </i>
              <span className="d-none d-md-inline">
                <span className="userName-text">
                  {auth.user?.username.toUpperCase()}
                </span>
                <small>{auth.user?.title?.toUpperCase()}</small>
              </span>
            </div>

            <ul
              className={
                show ? "dropdown-menu slideIn show" : "dropdown-menu slideIn"
              }
              aria-labelledby="navbarDropdown4"
            >
              <li>
                <button
                  className={show ? "dropdown-item show" : "dropdown-item"}
                  onClick={() => setMyProfile(true)}
                >
                  <i className="icon-user-2" /> My profile
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    auth.logout();
                  }}
                >
                  <i className="icon-logout-2" /> Log out
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div
        style={!dropDownState ? { display: "none" } : { display: "block" }}
        className={`${
          !dropDownState
            ? "routes-search-container-hide"
            : "routes-search-container"
        }`}
      >
        {routesArray.map((group) => {
          return group.links
            .filter((link) => {
              return link.RouteName.toLowerCase().includes(
                searchInput.toLowerCase()
              );
            })
            .map((route) => (
              <Link key={route.id} to={route.route}>
                <p
                  onClick={() => {
                    setShownGroupIndex(route.groupIndex);
                    setShownLinkIndex(route.id);
                    setSearchInput("");
                  }}
                >
                  {user?.role === "SuperAdmin" ? (
                    route.RouteName
                  ) : user?.role !== "SuperAdmin" &&
                    route.RouteName === "Admin Management" ? (
                    ""
                  ) : user?.role !== "SuperAdmin" &&
                    route.RouteName !== "Admin Management" ? (
                    route.RouteName
                  ) : (
                    <></>
                  )}
                </p>
              </Link>
            ));
        })}
        {myProfile ? (
          <Profile
            myProfile={myProfile}
            handleCloseMyProfile={handleCloseMyProfile}
            user={auth?.user}
            handleShowChangePassword={handleShowChangePassword}
            changePassword={changePassword}
            handleCloseChangePassword={handleCloseChangePassword}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
