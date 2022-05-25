import { useState } from "react";
import { DateTime } from "luxon";
import {
  GetApplicationsAndDevicesComplianceDetail,
  GetNotCompliedApplicationsInstancesProcess,
} from "../../client/AuthedClient";
import { useAuthedClient } from "../../context/AuthedClientContext";
import { useFilters } from "../../context/FiltersContext";
import { Table, width80pxStyle } from "../Table";
import { ApplicationsComplianceAddModal } from "./ApplicationsComplianceAddModal";
import { ApplicationsComplianceDetailsModal } from "./ApplicationsComplianceDetailsModal";

export const ApplicationsComplianceTable = (props: {
  applications: Array<GetApplicationsAndDevicesComplianceDetail>;
  onDataChange: () => void;
}) => {
  const { applications, onDataChange } = props;
  const authedClient = useAuthedClient();
  const filters = useFilters();

  const [details, setDetails] = useState<
    Array<GetNotCompliedApplicationsInstancesProcess>
  >([]);
  const [lgShow, setLgShow] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [addMessageApplicationName, setAddMessageApplicationName] =
    useState("");
  const [modalTitle, setModalTitle] = useState("");

  function handleDetailsResponse(
    applicationName: string,
    fromDate: DateTime,
    toDate: DateTime,
    currentgroup: number,
    currentUser: number | undefined
  ) {
    authedClient
      .getNotCompliedApplicationsInstances(
        applicationName,
        fromDate,
        toDate,
        currentgroup,
        currentUser
      )
      .then((res) => {
        setDetails(res);
      });
  }

  const columns = [
    { name: "Application Name", attr: "applicationName" },
    { name: "No. of Devices", attr: "devicesCount" },
    { name: "Details", style: width80pxStyle, attr: "" },
    { name: "Add", style: width80pxStyle, attr: "" },
  ];

  const rows = (array: Array<GetApplicationsAndDevicesComplianceDetail>) => {
    return array.map((application, index) => (
      <tr key={index}>
        <td>{application.applicationName}</td>
        <td>{application.devicesCount}</td>
        <td>
          <i
            className="icon-doc-text view-icon mouse-pointer"
            onClick={() => {
              setModalTitle(application.applicationName);
              handleDetailsResponse(
                application.applicationName,
                filters.startDate,
                filters.endDate,
                filters.group,
                filters.user
              );
              setTimeout(() => {
                setLgShow(true);
              }, 500);
            }}
          />
        </td>
        <td>
          <i
            className="icon-plus-1 view-icon mouse-pointer"
            onClick={() => {
              setShowModalAdd(true);
              setAddMessageApplicationName(application.applicationName);
            }}
          />
        </td>
      </tr>
    ));
  };

  const rowStrings = applications.map((application) => [
    application.applicationName,
  ]);

  return (
    <div className="col-xl-7">
      <Table
        pageTitle={"Applications Compliance"}
        rows={rows}
        rowsData={applications}
        columns={columns}
        rowsStrings={rowStrings}
        excelData={applications}
      />
      <ApplicationsComplianceDetailsModal
        lgShow={lgShow}
        setLgShow={setLgShow}
        modalTitle={modalTitle}
        details={details}
      />
      <ApplicationsComplianceAddModal
        addMessageApplicationName={addMessageApplicationName}
        onDataChange={onDataChange}
        showModalAdd={showModalAdd}
        setShowModalAdd={setShowModalAdd}
      />
    </div>
  );
};
