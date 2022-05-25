import { MutableRefObject, useRef, useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { user } from "../../client/AuthedClient";
import Datepicker, { ReactDatePicker } from "react-datepicker";
import { useAuthedClient } from "../../context/AuthedClientContext";
import "react-datepicker/dist/react-datepicker.css";

export const TimeUtiHeader = (props: {
  disabled: boolean;
  callTimeUtil: (id: number | undefined, date: Date) => void;
}) => {
  const userInputEl = useRef<HTMLInputElement | null>(null);
  const datePicker = useRef<ReactDatePicker | null>(null);

  const { callTimeUtil, disabled } = props;
  const [dropdownSearchTerm, setDropDownSearchTerm] = useState("");

  const [users, setUsers] = useState<Array<user>>([]);
  const [currentUser, setCurrentUser] = useState<number | undefined>(undefined);
  const [currentUserName, setCurrentUserName] = useState("");
  const [calender, setCalender] = useState(true);
  const [date, setDate] = useState(new Date());
  const auth = useAuthedClient();
  useEffect(() => {
    auth.getUsers().then((res) => setUsers(res));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (calender) {
      datePicker.current?.setOpen(false);
    } else {
      datePicker.current?.setOpen(true);
    }
  }, [calender]);
  function getUserName(id: number) {
    const currentUser = users.filter((el) => {
      return el.computerId === id;
    });
    return currentUser[0].computerName;
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
    <div className="page-title d-xl-flex">
      <h1 className="me-auto">Time Utilization</h1>

      <div className="topFilter row g-2">
        <div className="col-auto">
          <div className="selectpicker-iconUsers w-auto">
            <div className="dropdown bootstrap-select">
              <Dropdown
                onSelect={(eventKey) => {
                  if (eventKey !== null) {
                    setCurrentUser(Number(eventKey));
                    setCurrentUserName(getUserName(Number(eventKey)));
                  }
                }}
                onToggle={(nextShow) => focus(nextShow, userInputEl)}
              >
                <Dropdown.Toggle
                  variant="light"
                  style={
                    disabled
                      ? { pointerEvents: "none", width: "auto" }
                      : { width: "auto" }
                  }
                >
                  {currentUser === undefined ? "Select User" : currentUserName}
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
                    .map((el: user, index: number) => {
                      return (
                        <Dropdown.Item
                          href="#"
                          key={index}
                          eventKey={el.computerId}
                          // active={index === selectedOptionIndex}
                          className={`${
                            index + 1 === currentUser
                              ? "page-header-dropdown page-header-dropdown-light-text-active"
                              : "page-header-dropdown"
                          }`}
                        >
                          {el.computerName}
                        </Dropdown.Item>
                      );
                    })}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
        <div
          className="col-auto time-date-picker"
          style={disabled ? { pointerEvents: "none" } : {}}
        >
          <i
            className="icon-calendar-empty"
            onClick={() => setCalender(!calender)}
          />
          <Datepicker
            ref={datePicker}
            selected={date}
            onChange={(e: Date) => setDate(e)}
          />
          <i
            className="icon-down-open-mini"
            onClick={() => setCalender(!calender)}
          />
        </div>
        <button
          className="time-apply-button"
          disabled={disabled}
          onClick={() => {
            if (currentUser === undefined) {
              alert("choose a userName");
            } else {
              callTimeUtil(currentUser, date);
            }
          }}
        >
          Apply
        </button>
      </div>
    </div>
  );
};
