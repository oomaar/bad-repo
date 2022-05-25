import { webApps } from "../../client/AuthedClient";
import { Table, width80pxStyle } from "../Table";

export const WebApplicationTable = (props: {
  handleEdit: (id: number, applicationName: string, url: string) => void;
  handleDelete: (id: number, applicationName: string) => void;
  processes: Array<webApps>;
  handleAddNew: () => void;
}) => {
  const { handleEdit, handleDelete, processes, handleAddNew } = props;

  const columns = [
    { name: "Application Name", attr: "applicationName" },
    { name: "Application URL", attr: "url" },
    { name: "Edit", attr: "", style: width80pxStyle },
    { name: "Delete", attr: "", style: width80pxStyle },
  ];

  const rows = (array: Array<webApps>) => {
    return array.map((process, index) => (
      <tr key={index}>
        <td>{process.applicationName}</td>
        <td>{process.url}</td>
        <td>
          <i
            onClick={() =>
              handleEdit(process.id, process.applicationName, process.url)
            }
            className="icon-pencil-alt-1 edit-icon mouse-pointer"
          />
        </td>
        <td>
          <i
            onClick={() => handleDelete(process.id, process.applicationName)}
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
      url: el.url,
    };
    let obj = {
      id: el.id,
      applicationName: el.applicationName,
      url: el.url,
    };
    rowsData.push(obj);
    excelData.push(excelObj);
    return 0;
  });
  return (
    <div className="white-box m-0">
      <Table
        excelData={excelData}
        pageTitle={"Web Applications"}
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
