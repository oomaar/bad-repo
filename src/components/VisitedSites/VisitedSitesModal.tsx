import {
  GetProcessesVisitedSitesDetails,
  GetProcessesVisitedSitesDetailsProcess,
} from "../../client/AuthedClient";
import { Table } from "../Table";

export const VisitedSitesModal = (props: {
  details: GetProcessesVisitedSitesDetails;
}) => {
  const { details } = props;

  const columns = [
    { name: "Device", attr: "computerName" },
    { name: "Date", attr: "time" },
  ];

  const rowStrings = details.map((detail) => [detail.computerName]);

  const rows = (array: Array<GetProcessesVisitedSitesDetailsProcess>) => {
    return array.map((site, index) => (
      <tr key={index}>
        <td>{site.computerName}</td>
        <td>{site.time.substring(0, 10)}</td>
      </tr>
    ));
  };

  return (
    <Table
      pageTitle={" "}
      rows={rows}
      rowsData={details.map((el) => ({
        computerName: el.computerName,
        time: el.time.substring(0, 10),
      }))}
      excelData={details.map((el) => ({
        computerName: el.computerName,
        time: el.time.substring(0, 10),
      }))}
      columns={columns}
      rowsStrings={rowStrings}
    />
  );
};
