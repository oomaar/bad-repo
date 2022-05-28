import Chart from "react-google-charts";
import { useState } from "react";
import { CloseButton, Modal } from "react-bootstrap";
import AuthedClient, {
  GetWebAvailablityData,
  GetWebAvailablityProcess,
} from "../client/AuthedClient";
import { Page } from "../components/Page";
import { Table, width62pxStyle } from "../components/Table";
import { useAuthedClient } from "../context/AuthedClientContext";
import { Filters } from "../context/FiltersContext";
import { roundTo2Places } from "../utils/misc";
export type GoogleChartTicks = (
  | { v: number | Date; f: string }
  | number
  | Date
)[];
export const WebAvailability = () => {
  const authedClient = useAuthedClient();

  return (
    <Page<GetWebAvailablityProcess>
      fetchData={(filters) => fetchData(authedClient, filters)}
      shouldShowNoData={shouldShowNoData}
      body={body}
      title="Web Availability"
    />
  );
};

async function fetchData(
  authedClient: AuthedClient,
  filters: Filters
): Promise<GetWebAvailablityProcess> {
  const { startDate, endDate, group, user } = filters;

  return await authedClient.getWebAvailabilityData(
    startDate,
    endDate,
    group,
    user
  );
}

function shouldShowNoData(data: GetWebAvailablityProcess): boolean {
  return data.data.length === 0;
}

function body(data: GetWebAvailablityProcess) {
  return (
    <div className="white-box m-0">
      <div className="row">
        <WebAvailabilityTable data={data} />
      </div>
    </div>
  );
}

function WebAvailabilityTable(props: { data: GetWebAvailablityProcess }) {
  const { data } = props;

  const [showTrendModal, setShowTrendModal] = useState(false);
  const [currentAppName, setCurrentAppName] = useState("");

  const handleCloseTrendModal = () => setShowTrendModal(false);
  const handleShowTrendModal = (appName: string) => {
    setCurrentAppName(appName);
    setShowTrendModal(true);
  };

  const columns = [
    { name: "Name", attr: "applicationName" },
    { name: "Average Response Time (ms)", attr: "averageResponseTime" },
    { name: "Availability Percentage", attr: "percentage" },
    { name: "Trend", style: width62pxStyle, attr: "" },
  ];

  const rows = (array: Array<GetWebAvailablityData>) => {
    return array.map((element, index) => {
      return (
        <tr key={index}>
          <td>{element.applicationName}</td>
          <td>{element.averageResponseTime}</td>
          <td>{element.percentage}%</td>
          <td>
            <i
              className="icon-doc-text view-icon mouse-pointer"
              onClick={() => handleShowTrendModal(element.applicationName)}
            />
          </td>
        </tr>
      );
    });
  };

  const rowStrings = data.data.map((element) => [element.applicationName]);

  return (
    <div className="col-lg-12">
      <Table
        pageTitle={"Web Availability"}
        rows={rows}
        rowsData={data.data.map((element) => ({
          applicationName: element.applicationName,
          averageResponseTime: roundTo2Places(element.averageResponseTime),
          percentage: roundTo2Places(
            (element.successCount / element.totalCount) * 100
          ),
        }))}
        excelData={data.data.map((element) => ({
          applicationName: element.applicationName,
          averageResponseTime: roundTo2Places(element.averageResponseTime),
          percentage: `${roundTo2Places(
            (element.successCount / element.totalCount) * 100
          )}%`,
        }))}
        columns={columns}
        rowsStrings={rowStrings}
      />
      {showTrendModal ? (
        <WebAvailabilityTrendModal
          showTrendModal={showTrendModal}
          handleCloseTrendModal={handleCloseTrendModal}
          currentAppName={currentAppName}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

function WebAvailabilityTrendModal({
  showTrendModal,
  handleCloseTrendModal,
  currentAppName,
}: {
  showTrendModal: boolean;
  handleCloseTrendModal: () => void;
  currentAppName: string;
}) {
  return (
    <Modal
      keyboard={false}
      centered={true}
      scrollable={true}
      show={showTrendModal}
      onHide={handleCloseTrendModal}
      size="lg"
    >
      <Modal.Header>
        <h1>{currentAppName}</h1>
        <CloseButton onClick={handleCloseTrendModal} />
      </Modal.Header>
      <Modal.Body>
        <LineChart currentAppName={currentAppName} />
      </Modal.Body>
    </Modal>
  );
}

const lineData: any = {
  TimeLabel: "Day",
  data: [
    { xValue: "0", yValue: 100 },
    { xValue: "1", yValue: 0 },
    { xValue: "2", yValue: 0 },
    { xValue: "3", yValue: -100 },
    { xValue: "4", yValue: 100 },
    { xValue: "5", yValue: 0 },
    { xValue: "6", yValue: -100 },
    { xValue: "7", yValue: 100 },
    { xValue: "8", yValue: 0 },
    { xValue: "9", yValue: 0 },
    { xValue: "10", yValue: -100 },
    { xValue: "11", yValue: 0 },
    { xValue: "12", yValue: 100 },
    { xValue: "13", yValue: -100 },
    { xValue: "14", yValue: 0 },
    { xValue: "15", yValue: 100 },
    { xValue: "16", yValue: -100 },
    { xValue: "17", yValue: 0 },
    { xValue: "18", yValue: 0 },
    { xValue: "19", yValue: 100 },
    { xValue: "20", yValue: 0 },
    { xValue: "21", yValue: -100 },
    { xValue: "22", yValue: 100 },
    { xValue: "23", yValue: 100 },
  ],
};

function LineChart(props: { currentAppName: string }) {
  const { currentAppName } = props;

  const arrData: any = [];

  arrData.push([`time in ${lineData.TimeLabel}`, `${currentAppName}`]);
  lineData.data.map((el: any) => {
    let dataArr = [];

    dataArr.push(el.xValue, el.yValue);

    arrData.push(dataArr);
    dataArr = [];

    return 0;
  });

  return (
    <div className="col-xl-12">
      <div className="chart-box">
        <Chart
          chartType="LineChart"
          options={{
            curveType: "function",
            legend: { position: "top", alignment: "center" },
            hAxis: {
              title: `Hours of the Day`,
              maxAlternation: 1,
            },
            vAxis: {
              title: " 100 for Success, 0 for no Data,-100 for Failure",

              viewWindow: {
                max: 100,
                min: -100,
              },
              ticks: [100, 0, -100],
            },
          }}
          data={arrData}
          width={"100%"}
          height={300}
          formatters={[
            { type: "NumberFormat", column: 1, options: { fractionDigits: 5 } },
          ]}
        />
      </div>
    </div>
  );
}
