import { useMemo, useState } from "react";
import { Nav } from "./Nav";
import { SideBar } from "./SideBar";
import { useLocation } from "react-router-dom";
import routesArray from "../staticData/sidebarMenu.json";

export function Layout(props: any) {
  const location = useLocation().pathname;

  // Running it only on first load to be as initial values with `useState`
  const groupAndLinkIndex = useMemo(
    () => getGroupAndLinkIndexes(location),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const [showSidebar, setShowSidebar] = useState(false);
  const [shownGroupIndex, setShownGroupIndex] = useState<number | undefined>(
    groupAndLinkIndex.groupIndex
  );
  const [shownLinkIndex, setShownLinkIndex] = useState<number>(
    groupAndLinkIndex.linkIndex
  );

  const onGroupClicked = (index: number) => {
    if (index === shownGroupIndex) {
      setShownGroupIndex(undefined);
    } else {
      setShownGroupIndex(index);
    }
  };

  return (
    <div className="wrapper">
      <div id="content" className={`${showSidebar && "active"}`}>
        <SideBar
          shownLinkIndex={shownLinkIndex}
          setShownLinkIndex={setShownLinkIndex}
          shownGroupIndex={shownGroupIndex}
          onGroupClicked={onGroupClicked}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
        <Nav
          setShownLinkIndex={setShownLinkIndex}
          setShownGroupIndex={setShownGroupIndex}
          setShowSidebar={setShowSidebar}
        />
        {props.children}
        <p className="copyright2">Copyright © 2022 Fly Insights.</p>
      </div>
    </div>
  );
}

function getGroupAndLinkIndexes(location: string): {
  groupIndex: number;
  linkIndex: number;
} {
  for (const group of routesArray) {
    for (const route of group.links) {
      if (route.route === location) {
        return { groupIndex: route.groupIndex, linkIndex: route.id };
      }
    }
  }

  // Should never happen because the router would redirect to landing
  // But to be robust, let's use these as default values. A possible enhancement in the future is to log errors
  return { groupIndex: 0, linkIndex: 0 };
}
