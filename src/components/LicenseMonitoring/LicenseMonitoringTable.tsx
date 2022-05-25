import { useState } from "react";
import {
  GetLicenseMonitoringResponse,
  GetLicenseMonitoringResponseDetailsProcess,
  GetLicenseMonitoringResponseProcess,
} from "../../client/AuthedClient";
import { useAuthedClient } from "../../context/AuthedClientContext";
import { useFilters } from "../../context/FiltersContext";
import { ToastFunction } from "../../utils/ToastFunction";
import { Table, width80pxStyle } from "../Table";
import { LicenseMonitoringModal } from "./";

type DetailsState = Array<GetLicenseMonitoringResponseDetailsProcess>;
export const LicenseMonitoringTable = (props: {
  license: GetLicenseMonitoringResponse;
}) => {
  const { license } = props;
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const filters = useFilters();
  const { startDate, endDate, group, user } = filters;
  const authedClient = useAuthedClient();
  const [details, setDetails] = useState<DetailsState>([]);

  const handleModalData = (appName: string) => {
    authedClient
      .getLicenseMonitoringDetails(appName, startDate, endDate, group, user)
      .then((res) => {
        if (res.length > 0) {
          setDetails(res);
          setShowModal(true);
        } else {
          ToastFunction("No Data Available.");
        }
      });
  };

  const rowStrings = license.map((name) => [name.applicationName]);

  const tableColumns = [
    { name: "Application Name", attr: "applicationName" },
    { name: "License Capacity", attr: "numberOfLicenses" },
    { name: "Actual Usage", attr: "numberOfDevices" },
    { name: "Utilization Percentage", attr: "utilization" },
    { name: "License Consumption", attr: "consumption" },
    { name: "Details", attr: "", style: width80pxStyle },
  ];

  const rows = (array: Array<GetLicenseMonitoringResponseProcess>) => {
    return array.map((lic, index) => (
      <tr key={index}>
        <td>{lic.applicationName}</td>
        <td>{lic.numberOfLicenses}</td>
        <td>{lic.numberOfDevices}</td>
        <td>
          {Math.round((lic.numberOfDevices / lic.numberOfLicenses) * 100)}%
        </td>
        <td>{lic.numberOfLicenses - lic.numberOfDevices}</td>
        <td>
          <i
            className="icon-doc-text view-icon mouse-pointer"
            onClick={() => {
              handleModalData(license[index].applicationName);
              setModalTitle(license[index].applicationName);
            }}
          />
        </td>
      </tr>
    ));
  };

  return (
    <>
      <Table
        pageTitle={"License Monitoring"}
        rows={rows}
        rowsData={license.map((el) => ({
          applicationName: el.applicationName,
          numberOfLicenses: el.numberOfLicenses,
          numberOfDevices: el.numberOfDevices,
          utilization: Math.round(
            (el.numberOfDevices / el.numberOfLicenses) * 100
          ),
          consumption: el.numberOfLicenses - el.numberOfDevices,
        }))}
        excelData={license.map((el) => ({
          applicationName: el.applicationName,
          numberOfLicenses: el.numberOfLicenses,
          numberOfDevices: el.numberOfDevices,
          utilization: `${Math.round(
            (el.numberOfDevices / el.numberOfLicenses) * 100
          )}%`,
          consumption: el.numberOfLicenses - el.numberOfDevices,
        }))}
        columns={tableColumns}
        rowsStrings={rowStrings}
      />
      {showModal && details.length > 0 ? (
        <LicenseMonitoringModal
          showModal={showModal}
          setShowModal={setShowModal}
          modalTitle={modalTitle}
          details={details}
        />
      ) : (
        <></>
      )}
    </>
  );
};
