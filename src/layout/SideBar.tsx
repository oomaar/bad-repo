/* eslint-disable array-callback-return */
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import sidebarMenu from "../staticData/sidebarMenu.json";

export const SideBar = ({
  showSidebar,
  setShowSidebar,
  shownGroupIndex,
  onGroupClicked,
  shownLinkIndex,
  setShownLinkIndex,
}: {
  showSidebar: boolean;
  setShowSidebar: (showSideBar: boolean) => void;
  shownGroupIndex: number | undefined;
  onGroupClicked: (index: number) => void;
  shownLinkIndex: number;
  setShownLinkIndex: (index: number) => void;
}) => {
  const user = useAuth().user;
  const sideBarMainMenu = sidebarMenu.map((menu, index) => {
    if (menu.singleLink) {
      return (
        <li key={index}>
          <a href="/">
            <i className={menu.iconClassName}></i> {menu.title}
          </a>
        </li>
      );
    } else if (!menu.singleLink) {
      return (
        <li
          key={index}
          className={shownGroupIndex === menu.groupIndex ? "active" : ""}
        >
          <a
            onClick={(e) => onGroupClicked(menu.groupIndex)}
            href="#submenu-1"
            data-bs-toggle="collapse"
            aria-expanded={shownGroupIndex === menu.groupIndex}
            className="dropdown-toggle "
          >
            <i className={menu.iconClassName} /> {menu.title}
          </a>
          <ul
            className={
              shownGroupIndex === menu.groupIndex
                ? "collapse submenu-collapse sidebar-links-list show"
                : "collapse submenu-collapse sidebar-links-list"
            }
            id="submenu-1"
            data-bs-parent="#main-menu"
          >
            {menu.links.map((link, index) => {
              if (
                link.RouteName === "Admin Management" &&
                user?.role === "SuperAdmin"
              ) {
                return (
                  <li
                    key={index}
                    onClick={() => {
                      if (window.innerWidth < 769) {
                        setShowSidebar(false);
                      }
                      setShownLinkIndex(link.id);
                    }}
                    className={`${
                      shownLinkIndex === link.id
                        ? "sidebar-link sidebar-link-active"
                        : "sidebar-link"
                    }`}
                  >
                    <Link to={link.route}>{link.RouteName}</Link>
                  </li>
                );
              } else if (
                link.RouteName !== "Admin Management" &&
                user?.role === "SuperAdmin"
              ) {
                return (
                  <li
                    key={index}
                    onClick={() => {
                      if (window.innerWidth < 769) {
                        setShowSidebar(false);
                      }
                      setShownLinkIndex(link.id);
                    }}
                    className={`${
                      shownLinkIndex === link.id
                        ? "sidebar-link sidebar-link-active"
                        : "sidebar-link"
                    }`}
                  >
                    <Link to={link.route}>{link.RouteName}</Link>
                  </li>
                );
              } else if (
                link.RouteName !== "Admin Management" &&
                user?.role !== "SuperAdmin"
              ) {
                return (
                  <li
                    key={index}
                    onClick={() => {
                      if (window.innerWidth < 769) {
                        setShowSidebar(false);
                      }
                      setShownLinkIndex(link.id);
                    }}
                    className={`${
                      shownLinkIndex === link.id
                        ? "sidebar-link sidebar-link-active"
                        : "sidebar-link"
                    }`}
                  >
                    <Link to={link.route}>{link.RouteName}</Link>
                  </li>
                );
              } else return <></>;
            })}
          </ul>
        </li>
      );
    } else {
      // Should never happen
      return <></>;
    }
  });

  return (
    <nav id="sidebar" className={showSidebar ? "active" : undefined}>
      <span className="top-triangle"></span>
      <div id="dismiss">
        <i
          className="icon-right-small"
          onClick={() => setShowSidebar(false)}
        ></i>
      </div>
      <div className="sidebar-header">
        <span className="top-triangle"></span>
        <div className="logo">
          <span>Fly</span> Insights
        </div>
      </div>
      <div className="menu-title">Main Menu</div>
      <ul id="main-menu">{sideBarMainMenu}</ul>
    </nav>
  );
};
