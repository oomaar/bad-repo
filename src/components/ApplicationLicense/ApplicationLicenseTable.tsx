import { AppLicense } from "../../client/AuthedClient";
import { Table, width80pxStyle } from "../Table";

export const ApplicationLicenseTable = (props: {
  handleEdit: (
    noLicenses: number,
    applicationName: string,
    recordId: number
  ) => void;
  handleDelete: (recordId: number, applicationName: string) => void;
  processes: Array<AppLicense>;
  handleAddNew: () => void;
}) => {
  const { handleEdit, handleDelete, processes, handleAddNew } = props;

  const columns = [
    { name: "Application Name", attr: "applicationName" },
    { name: "Application Capacity", attr: "devicesCount" },
    { name: "Edit", attr: "", style: width80pxStyle },
    { name: "Delete", attr: "", style: width80pxStyle },
  ];

  const rows = (array: Array<AppLicense>) => {
    return array.map((process, index) => (
      <tr key={index}>
        <td>{process.applicationName}</td>
        <td>{process.noLicenses}</td>
        <td>
          <i
            onClick={() =>
              handleEdit(
                process.noLicenses,
                process.applicationName,
                process.recordId
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
      noLicenses: el.noLicenses,
    };
    let obj = {
      recordId: el.recordId,
      applicationName: el.applicationName,
      noLicenses: el.noLicenses,
    };
    excelData.push(excelObj);
    rowsData.push(obj);
    return 0;
  });

  return (
    <div className="white-box m-0">
      <Table
        excelData={excelData}
        pageTitle={"Application License"}
        rows={rows}
        rowsData={rowsData}
        columns={columns}
        rowsStrings={rowStrings}
      />
      <div onClick={handleAddNew} className="btn btn-sm btn-success mt-3">
        <i className="icon-plus-circle" /> Add New
      </div>
    </div>
  );
};
