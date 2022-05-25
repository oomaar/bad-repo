import { GetApplicationsAndDevicesComplianceResponseDevice } from "../../client/AuthedClient";
import { Table } from "../Table";

export const ApplicationsComplianceDevicesTable = (props: {
  devices: Array<GetApplicationsAndDevicesComplianceResponseDevice>;
}) => {
  const { devices } = props;

  const columns = [
    { name: "Device Name", attr: "computerName" },
    { name: "Device Serial", attr: "computerSerial" },
  ];
  const rowsData: any = [];
  // eslint-disable-next-line array-callback-return
  devices.map((el) => {
    const dataObj = {
      computerName: el.computerName,
      computerSerial: el.computerSerial,
    };
    rowsData.push(dataObj);
  });
  const rowStrings = devices.map((device) => [
    device.computerName,
    device.computerSerial,
  ]);

  const rows = (
    array: Array<GetApplicationsAndDevicesComplianceResponseDevice>
  ) => {
    return array.map((device, index) => (
      <tr key={index}>
        <td>{device.computerName}</td>
        <td>{device.computerSerial}</td>
      </tr>
    ));
  };
  return (
    <div className="col-xl-7">
      {/* TODO: OMAR-HASSAN => I want to know whats are these classes */}
      {/* NOTE: The comment classes below was the reason for causing a bug in the ui */}
      {/* <div className="table table-striped"> */}
      <Table
        pageTitle={"Applications Compliance"}
        excelData={rowsData}
        rows={rows}
        rowsData={rowsData}
        columns={columns}
        rowsStrings={rowStrings}
      />
      {/* </div> */}
    </div>
  );
};
