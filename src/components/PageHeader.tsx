import { MutableRefObject, useEffect, useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { DateTime } from "luxon";
import { Group, user } from "../client/AuthedClient";
import { useAuthedClient } from "../context/AuthedClientContext";
import { DateRangePicker } from "rsuite";
import enUS from "rsuite/locales/en_US";

const options: Array<{
  name: string;
  startDate: DateTime;
  endDate: DateTime;
}> = [
  {
    name: "Today",
    startDate: DateTime.now(),
    endDate: DateTime.now(),
  },
  {
    name: "Yesterday",
    startDate: DateTime.now().minus({ day: 1 }),
    endDate: DateTime.now().minus({ day: 1 }),
  },
  {
    name: "Last 7 Days",
    startDate: DateTime.now().minus({ day: 6 }),
    endDate: DateTime.now(),
  },
  {
    name: "Last 30 Days",
    startDate: DateTime.now().minus({ day: 29 }),
    endDate: DateTime.now(),
  },
  {
    name: "This month",
    startDate: DateTime.now().set({ day: 1 }),
    endDate: DateTime.now(),
  },
  {
    name: "Last month",
    startDate: DateTime.now().minus({ month: 1 }).set({ day: 1 }),
    endDate: DateTime.now().set({ day: 1 }).minus({ day: 1 }),
  },
];

const dateRangePickerRanges = options.map((option) => ({
  label: option.name,
  value: [option.startDate.toJSDate(), option.endDate.toJSDate()],
  closeOverlay: true,
}));

const initialOptionIndex = 3;
export const initialStartDate = options[initialOptionIndex].startDate;
export const initialEndDate = options[initialOptionIndex].endDate;
export const current = 0;
export const selctedUser = undefined;
export const PageHeader = ({
  title,
  disabled,
  onFilterChanged,
  isUserFilter,
}: {
  title: string;
  disabled: boolean;
  onFilterChanged: (
    startDate: DateTime,
    endDate: DateTime,
    groupId: number,
    userId: number | undefined
  ) => void;
  isUserFilter: boolean;
}) => {
  const authedClient = useAuthedClient();

  const [groups, setGroups] = useState<Array<Group>>([]);
  const [currentGroup, setCurrentGroup] = useState<number>(0);
  const [users, setUsers] = useState<Array<user>>([]);
  const [currentUser, setCurrentUser] = useState<number | undefined>(undefined);
  const [dropdownSearchTerm, setDropDownSearchTerm] = useState("");
  const [dropdownGroupSearchTerm, setDropDownGroupSearchTerm] = useState("");
  const [startEndDate, setStartEndDate] = useState<[Date, Date]>([
    initialStartDate.toJSDate(),
    initialEndDate.toJSDate(),
  ]);

  const userInputEl = useRef<HTMLInputElement | null>(null);
  const groupInputEl = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    authedClient.getGroups().then((res) => setGroups(res));
    authedClient.getUsers().then((res) => setUsers(res));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getGroupName() {
    let groupName = "";
    if (currentGroup === 0) {
      groupName = "All Groups";
    } else {
      const group = groups.filter((el) => {
        return el.recordId === currentGroup;
      });
      groupName = group[0].groupName;
    }
    return groupName;
  }

  function getUserName() {
    let UserName = "";
    if (currentUser === undefined) {
      UserName = "All Users";
    } else {
      const user = users.filter((el) => {
        return el.computerId === currentUser;
      });
      UserName = user[0].computerName;
    }
    return UserName;
  }

  function handleGroupDropdownItemSelected(eventKey: string | null) {
    if (eventKey !== null) {
      if (eventKey === "all") {
        setCurrentGroup(0);

        onFilterChanged(
          DateTime.fromJSDate(startEndDate[0]),
          DateTime.fromJSDate(startEndDate[1]),
          0,
          currentUser
        );
      } else {
        setCurrentGroup(Number(eventKey));
        onFilterChanged(
          DateTime.fromJSDate(startEndDate[0]),
          DateTime.fromJSDate(startEndDate[1]),
          Number(eventKey),
          currentUser
        );
      }
    }
  }

  function handleUserDropdownItemSelected(eventKey: string | null) {
    if (eventKey !== null) {
      if (eventKey === "all") {
        setCurrentUser(undefined);
        onFilterChanged(
          DateTime.fromJSDate(startEndDate[0]),
          DateTime.fromJSDate(startEndDate[1]),
          currentGroup,
          undefined
        );
      } else {
        setCurrentUser(Number(eventKey));
        onFilterChanged(
          DateTime.fromJSDate(startEndDate[0]),
          DateTime.fromJSDate(startEndDate[1]),
          currentGroup,
          Number(eventKey)
        );
      }
    }
  }

  function focus(
    nextShow: boolean,
    el: MutableRefObject<HTMLInputElement | null>
  ) {
    if (nextShow) {
      setTimeout(() => el.current?.focus());
    }
  }

  return (
    <div className="page-title d-lg-flex">
      <h1 className="me-auto">{title}</h1>
      <div className="topFilter row g-2">
        {isUserFilter ? (
          <div className="col-auto">
            <Dropdown
              onSelect={(eventKey) => handleUserDropdownItemSelected(eventKey)}
              onToggle={(nextShow) => focus(nextShow, userInputEl)}
            >
              <Dropdown.Toggle
                variant="light"
                style={disabled ? { pointerEvents: "none" } : {}}
              >
                <i className="icon-user-o" /> {getUserName()}
              </Dropdown.Toggle>
              <Dropdown.Menu className="user-filter-dropdown-menu">
                <div className="dropdown-search-input table-search">
                  <input
                    ref={userInputEl}
                    type="search"
                    className="form-control form-control-sm"
                    placeholder=""
                    aria-controls="dtBasicExample"
                    onChange={(e) => setDropDownSearchTerm(e.target.value)}
                  />
                </div>
                <Dropdown.Item
                  eventKey={"all"}
                  className={`${
                    currentUser === undefined
                      ? "page-header-dropdown page-header-dropdown-light-text-active"
                      : "page-header-dropdown"
                  }`}
                >
                  All Users
                </Dropdown.Item>
                {users
                  .filter((user) => {
                    if (dropdownSearchTerm === "") {
                      return user;
                    } else if (
                      user.computerName
                        .toLowerCase()
                        .includes(dropdownSearchTerm.toLowerCase())
                    ) {
                      return user;
                    }
                    return 0;
                  })
                  .map((option: user, index: number) => (
                    <Dropdown.Item
                      href="#"
                      key={index}
                      eventKey={option.computerId}
                      // active={index === selectedOptionIndex}
                      className={`${
                        index + 3 === currentUser
                          ? "page-header-dropdown page-header-dropdown-light-text-active"
                          : "page-header-dropdown"
                      }`}
                    >
                      {option.computerName}
                    </Dropdown.Item>
                  ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ) : (
          <></>
        )}
        <div className="col-auto">
          <Dropdown
            onSelect={(eventKey) => handleGroupDropdownItemSelected(eventKey)}
            onToggle={(nextShow) => focus(nextShow, groupInputEl)}
          >
            <Dropdown.Toggle
              variant="light"
              style={disabled ? { pointerEvents: "none" } : {}}
            >
              <i className="icon-user-o" /> {getGroupName()}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <div className="dropdown-search-input table-search">
                <input
                  ref={groupInputEl}
                  type="search"
                  className="form-control form-control-sm"
                  placeholder=""
                  aria-controls="dtBasicExample"
                  onChange={(e) => setDropDownGroupSearchTerm(e.target.value)}
                />
              </div>
              <Dropdown.Item
                eventKey={"all"}
                className={`${
                  currentGroup === 0
                    ? "page-header-dropdown page-header-dropdown-light-text-active"
                    : "page-header-dropdown"
                }`}
              >
                All Groups
              </Dropdown.Item>
              {groups
                .filter((group) => {
                  if (dropdownGroupSearchTerm === "") {
                    return group;
                  } else if (
                    group.groupName
                      .toLowerCase()
                      .includes(dropdownGroupSearchTerm.toLowerCase())
                  ) {
                    return group;
                  }
                  return 0;
                })
                .map((option: Group, index: number) => (
                  <Dropdown.Item
                    href="#"
                    key={index}
                    eventKey={option.recordId}
                    // active={index === selectedOptionIndex}
                    className={`${
                      index === currentGroup - 2
                        ? "page-header-dropdown page-header-dropdown-light-text-active"
                        : "page-header-dropdown"
                    }`}
                  >
                    {option.groupName}
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="col-auto rsuite-custom-class">
          <div className="topFilter row g-2">
            <DateRangePicker
              style={disabled ? { pointerEvents: "none" } : {}}
              cleanable={false}
              format="MMM dd, yyyy"
              locale={enUS}
              value={startEndDate}
              ranges={dateRangePickerRanges as any}
              onChange={(value) => {
                if (value !== null) {
                  setStartEndDate(value);
                  onFilterChanged(
                    DateTime.fromJSDate(value[0]),
                    DateTime.fromJSDate(value[1]),
                    currentGroup,
                    currentUser
                  );
                }
              }}
            />
            <i className="icon-down-open-mini" />
          </div>
        </div>
      </div>
    </div>
  );
};
