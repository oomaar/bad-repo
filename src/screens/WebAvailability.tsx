import Chart from "react-google-charts";
import { useState } from "react";
import { CloseButton, Modal } from "react-bootstrap";
import AuthedClient, {
  GetWebAvailablityData,
  GetWebAvailablityProcess,
} from "../client/AuthedClient";
import { Page } from "../components/Page";
import { Table, width52pxStyle } from "../components/Table";
import { useAuthedClient } from "../context/AuthedClientContext";
import { Filters } from "../context/FiltersContext";
import { roundTo2Places } from "../utils/misc";

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
    { name: "Trend", style: width52pxStyle, attr: "" },
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
    { xValue: "2022-04-26", yValue: 0.00019673515902498743 },
    { xValue: "2022-04-27", yValue: 0.00012321410640593497 },
    { xValue: "2022-04-28", yValue: 0.00014855943453013666 },
    { xValue: "2022-04-29", yValue: 5.038789630161567e-7 },
    { xValue: "2022-04-30", yValue: 6.368949163469947e-9 },
    { xValue: "2022-05-01", yValue: 1.5094560247012505e-8 },
    { xValue: "2022-05-02", yValue: 9.371977748801316e-9 },
    { xValue: "2022-05-03", yValue: 0.000019852355820835492 },
    { xValue: "2022-05-04", yValue: 0.00003363487411114845 },
    { xValue: "2022-05-05", yValue: 0.000034693443750297875 },
    { xValue: "2022-05-06", yValue: 0.000033087998431822127 },
    { xValue: "2022-05-07", yValue: 0.00006043101867399604 },
    { xValue: "2022-05-08", yValue: 0.0002580947261489404 },
    { xValue: "2022-05-09", yValue: 0.00028810984681698995 },
    { xValue: "2022-05-10", yValue: 0.0006433132992634397 },
    { xValue: "2022-05-11", yValue: 0.00014869123154631167 },
    { xValue: "2022-05-12", yValue: 0.000026882206648808807 },
    { xValue: "2022-05-13", yValue: 0.00038717985153198243 },
    { xValue: "2022-05-14", yValue: 1.8350219153677608e-7 },
    { xValue: "2022-05-15", yValue: 0.000013427160957411411 },
    { xValue: "2022-05-16", yValue: 0 },
    { xValue: "2022-05-17", yValue: 0.000026569826750374127 },
    { xValue: "2022-05-18", yValue: 0.000270810043602659 },
    { xValue: "2022-05-19", yValue: 0.0000046140032468036245 },
    { xValue: "2022-05-20", yValue: 0.0000016384323602398953 },
    { xValue: "2022-05-21", yValue: 0.000021757739487068122 },
    { xValue: "2022-05-22", yValue: 0.00003125249689275568 },
    { xValue: "2022-05-23", yValue: 0.0000472977047874814 },
    { xValue: "2022-05-24", yValue: 0.00005613873768600235 },
    { xValue: "2022-05-25", yValue: 0.00004247639277209974 },
  ],
};

function LineChart(props: { currentAppName: string }) {
  const { currentAppName } = props;

  const arrData: any = [];

  arrData.push([`time in ${lineData.TimeLabel}`, `${currentAppName}`]);
  lineData.data.map((el: any) => {
    let dataArr = [];

    dataArr.push(
      `${el.xValue.slice(el.xValue.length - 5, el.xValue.length)}`,
      el.yValue
    );

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
              title: `Time in ${lineData.TimeLabel}s`,
            },
            vAxis: {
              // title: ["Success", "Failure", "NoData"],
              minValue: "Success",
              maxValue: "Failure",
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
