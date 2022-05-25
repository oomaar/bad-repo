import { AllowedApps } from "../../client/AuthedClient";
import { Table, width80pxStyle } from "../Table";

export const AllowedApplicationsTable = (props: {
  handleEdit: (
    recordId: number,
    applicationName: string,
    applicationVersion: string
  ) => void;
  handleDelete: (recordId: number, applicationName: string) => void;
  processes: Array<AllowedApps>;
  handleAddNew: () => void;
}) => {
  const { handleEdit, handleDelete, processes, handleAddNew } = props;

  const columns = [
    { name: "Application Name", attr: "applicationName" },
    { name: "Application Version", attr: "applicationVersion" },
    { name: "Edit", attr: "", style: width80pxStyle },
    { name: "Delete", attr: "", style: width80pxStyle },
  ];

  const rows = (array: Array<AllowedApps>) => {
    return array.map((process, index) => (
      <tr key={index}>
        <td>{process.applicationName}</td>
        <td>{process.applicationVersion}</td>
        <td>
          <i
            onClick={() =>
              handleEdit(
                process.recordId,
                process.applicationName,
                process.applicationVersion
              )
            }
            className="icon-pencil-alt-1 edit-icon mouse-pointer"
          />
        </td>
        <td>
          <i
            onClick={() =>
              handleDelete(process.recordId, process.applicationName)
            }
            className="icon-trash-2 delete-icon mouse-pointer"
          />
        </td>
      </tr>
    ));
  };

  const rowStrings = processes.map((process) => [process.applicationName]);
  const rowsData: any = [];
  const excelData: any = [];
  processes.map((el) => {
    let excelObj = {
      applicationName: el.applicationName,
      applicationVersion: el.applicationVersion,
    };
    let obj = {
      recordId: el.recordId,
      applicationName: el.applicationName,
      applicationVersion: el.applicationVersion,
    };
    rowsData.push(obj);
    excelData.push(excelObj);
    return 0;
  });
  return (
    <div className="white-box m-0">
      <Table
        excelData={excelData}
        pageTitle={"Allowed Applications"}
        rows={rows}
        rowsData={rowsData}
        columns={columns}
        rowsStrings={rowStrings}
      />
      <br />
      <div onClick={handleAddNew} className="btn btn-sm btn-success">
        <i className="icon-plus-circle" /> Add New
      </div>
    </div>
  );
};
