import React, { ReactNode, useState } from "react";
import { Chart } from "react-google-charts";
import { TimeUtil } from "../client/AuthedClient";
import { Loader } from "../components/Loader/Loader";
import { TimeUtiHeader } from "../components/TimeUtiHeader/TimeUtiHeader";
import { useAuthedClient } from "../context/AuthedClientContext";
import { DateTime } from "luxon";
import fragment from "../utils/fragment";
import { Alert } from "react-bootstrap";
import { groupDataEntriesByHour } from "../utils/time-util/groupDataEntriesByHour";
import { map12To24 } from "../utils/time-util/map12to24";
import { groupedEntriesToChartData } from "../utils/time-util/groupedEntriesToChartData";
import { getUniqueAppsNames } from "../utils/time-util/getUniqueAppsNames";

export default function TimeUtilization() {
  const authedClient = useAuthedClient();

  /**
   * Added `date` to `loading` state to pass it to `loaded` state.
   */
  type State =
    | { kind: "not-all-filters-selected" }
    | { kind: "loading"; date: DateTime }
    | { kind: "loaded"; date: DateTime; filteredTimeUtilData: Array<TimeUtil> };

  type Msg =
    | { kind: "filters-updated"; id: number | undefined; date: DateTime }
    | { kind: "response-received"; timeUtilData: Array<TimeUtil> };

  const [state, setState] = useState<State>({
    kind: "not-all-filters-selected",
  });

  function update(state: State, msg: Msg): State {
    if (
      (state.kind === "not-all-filters-selected" || state.kind === "loaded") &&
      msg.kind === "filters-updated"
    ) {
      if (msg.id === undefined) {
        return { kind: "not-all-filters-selected" };
      } else {
        callTimeUtil(msg.id, msg.date);
        return { kind: "loading", date: msg.date };
      }
    }

    if (state.kind === "loading" && msg.kind === "response-received") {
      const filteredTimeUtilData = msg.timeUtilData.filter((timeUtil) =>
        DateTime.fromISO(timeUtil.applicationUtilizationStart).hasSame(
          DateTime.fromISO(timeUtil.applicationUtilizationEnd),
          "day"
        )
      );

      return {
        kind: "loaded",
        date: state.date,
        filteredTimeUtilData,
      };
    }

    return state;
  }

  function sendMsg(msg: Msg): void {
    setState((state) => update(state, msg));
  }

  function callTimeUtil(id: number, date: DateTime) {
    authedClient.getTimeUtilizationData(id, date.toJSDate()).then((res) =>
      sendMsg({
        kind: "response-received",
        timeUtilData: res,
      })
    );
  }

  const view: Array<ReactNode> = [];

  if (state.kind === "loading") {
    view.push(<Loader />);
  }

  if (state.kind === "not-all-filters-selected") {
    view.push(
      <div className="white-box">
        <Alert className="m-0">
          <div className="alert-icon">
            <i className="icon-bell" />
          </div>
          <div className="alert-message">
            <strong>Please</strong> choose the username and date to display the
            data here!
          </div>
        </Alert>
      </div>
    );
  }

  if (state.kind === "loaded" && state.filteredTimeUtilData.length === 0) {
    view.push(
      <div className="white-box">
        <Alert className="m-0">
          <div className="alert-icon">
            <i className="icon-bell" />
          </div>
          <div className="alert-message">There is no data for this day!</div>
        </Alert>
      </div>
    );
  }

  if (state.kind === "loaded" && state.filteredTimeUtilData.length > 0) {
    const hourToAppNameToDuration = groupDataEntriesByHour(
      state.filteredTimeUtilData,
      state.date
    );

    const appsNames = getUniqueAppsNames(state.filteredTimeUtilData);

    const chartData = groupedEntriesToChartData(
      state.filteredTimeUtilData,
      hourToAppNameToDuration,
      appsNames
    );

    view.push(
      <div className="white-box">
        <div
          className="chart_TimeUtilization"
          style={{ width: "80%", margin: "0 auto", overflow: "initial" }}
        >
          <h3>Applications Usage Duration</h3>
          <Chart
            chartType="ColumnChart"
            height="320px"
            options={{
              legend: { position: "top" },
              chartArea: { width: "90%" },
              isStacked: true,

              hAxis: {
                textStyle: {
                  fontSize: 12,
                },
                title: "Hours of the day",
                minValue: 0,
                format: "h:mm a",
                viewWindow: {
                  min: [7, 30, 0],
                  max: [31, 30, 0],
                },
              },
              vAxis: {
                title: "Duration(minutes)",
              },
            }}
            data={chartData}
            width="100%"
          />
        </div>
      </div>
    );

    const structuredData = hourToAppNameToDuration;
    const uniqueNames = appsNames;
    // Copy-pasted from TimeUtilization
    //accordion data
    let accordionData: any = [];
    for (var i = 0; i < 24; i++) {
      let dataObj = {};
      let sumData = 0;
      let element: any = structuredData.get(i);
      let appData: any = [];
      if (element !== undefined) {
        uniqueNames.forEach((name: string) => {
          let app: any = element.get(name);
          if (app !== undefined) {
            app = Math.floor(app / 1000 / 60);
            if (app !== 0.0 || app === 0.0) {
              sumData += app;
              appData.push({ ApplicationName: name, minutes: app });
            }
          }
        });
        dataObj = {
          hour: map12To24(i.toString()),
          AppData: appData,
          sumData: sumData,
          show: false,
        };

        accordionData.push(dataObj);
      }
    }

    view.push(
      <div className="white-box">
        <div className="accordion" id="accordionExample">
          {accordionData.map((el: any, index: number) => {
            return (
              <React.Fragment key={index}>
                <div
                  className="accordion-item"
                  onClick={(e: any) => {
                    const element = e.target;
                    element.classList.toggle("collapsed");
                    element.parentElement.nextSibling.classList.toggle("show");
                  }}
                >
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                    >
                      <i className="icon-stopwatch-1 me-2" /> {el.hour}
                      <small
                        onClick={(e: any) => {
                          const element = e.target;
                          element.parentElement.classList.toggle("collapsed");
                          element.parentElement.parentElement.nextSibling.classList.toggle(
                            "show"
                          );
                        }}
                        className="ms-2"
                      >
                        (
                        {el.sumData === 0
                          ? "Less Than 1 Minute"
                          : `${el.sumData} Minutes`}
                        )
                      </small>
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className={"accordion-collapse collapse "}
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <div className="timeUtilization-info">
                        {el.AppData.map((card: any, index: number) => {
                          return (
                            <div className="card" key={index}>
                              <div className="card-body">
                                <div className="row">
                                  <div className="col-xl-4 col-lg-5 col-md-6">
                                    {card.ApplicationName}
                                  </div>
                                  <div className="col-xl-8 col-lg-7 col-md-6">
                                    {card.minutes === 0
                                      ? "Less Than 1 Minute"
                                      : `${card.minutes}.00 Minutes`}
                                    <span></span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <TimeUtiHeader
        disabled={state.kind === "loading"}
        callTimeUtil={(id, date) => {
          sendMsg({
            kind: "filters-updated",
            id,
            date: DateTime.fromJSDate(date),
          });
        }}
      />
      {fragment(view)}
    </div>
  );
}
