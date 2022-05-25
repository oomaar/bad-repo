import { useState } from "react";
import { CloseButton, Modal } from "react-bootstrap";
import {
  GetProcessesVisitedSitesDetailsProcess,
  GetVisitedSitesResponse,
  GetVisitedSitesResponseProcess,
} from "../../client/AuthedClient";
import { useAuthedClient } from "../../context/AuthedClientContext";
import { useFilters } from "../../context/FiltersContext";
import { ToastFunction } from "../../utils/ToastFunction";
import { Table, width100pxStyle, width80pxStyle } from "../Table";
import { VisitedSitesModal } from "./VisitedSitesModal";

export const VisitedSitesTable = (props: {
  sites: GetVisitedSitesResponse;
}) => {
  const { sites } = props;

  const authedClient = useAuthedClient();
  const filters = useFilters();
  const { startDate, endDate, user, group } = filters;

  type DetailsState = Array<GetProcessesVisitedSitesDetailsProcess>;
  const [details, setDetails] = useState<DetailsState>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const handleModalData = (appName: string) => {
    authedClient
      .getVisitedSitesDetails(appName, startDate, endDate, group, user)
      .then((res) => {
        if (res.length > 0) {
          setDetails(res);
          setShowModal(true);
        } else {
          ToastFunction("No Data Available.");
        }
      });
  };

  const columns = [
    { name: "Website", attr: "tabName" },
    { name: "Total Visits %", attr: "percentage", style: width100pxStyle },
    { name: "Details", attr: "", style: width80pxStyle },
  ];

  const rowStrings = sites.map((site) => [site.tabName]);

  const truncate = (str: string, n: number) =>
    str?.length > n ? str.substr(0, n - 1) + "..." : str;

  const rows = (array: Array<GetVisitedSitesResponseProcess>) => {
    return array.map((site, index) => (
      <tr key={index}>
        <td>{truncate(site.tabName, 60)}</td>
        <td>{(site.percentage * 100).toFixed(2)}%</td>
        <td>
          <i
            className="icon-doc-text view-icon mouse-pointer"
            onClick={() => {
              handleModalData(sites[index].tabName);
              setModalTitle(sites[index].tabName);
            }}
          />
        </td>
      </tr>
    ));
  };

  const getCells = (site: any) => [
    <>{truncate(site.tabName, 55)}</>,
    <>{(site.percentage * 100).toFixed(2)}%</>,
    <i
      className="icon-doc-text view-icon mouse-pointer"
      onClick={() => {
        handleModalData(site.tabName);
        setModalTitle(site.tabName);
      }}
    />,
  ];

  return (
    <>
      <div className="col-xl-7">
        <Table
          pageTitle={"visited Sites"}
          rows={rows}
          getCells={getCells}
          rowsData={sites.map((el) => ({
            tabName: el.tabName,
            percentage: el.percentage,
          }))}
          excelData={sites.map((el) => ({
            tabName: truncate(el.tabName, 55),
            percentage: `${(el.percentage * 100).toFixed(2)}%`,
          }))}
          columns={columns}
          rowsStrings={rowStrings}
        />
      </div>
      {showModal ? (
        <Modal
          keyboard={false}
          centered={true}
          scrollable={true}
          show={showModal}
          onHide={() => setShowModal(false)}
          size="lg"
        >
          <Modal.Header>
            <Modal.Title>{modalTitle}</Modal.Title>
            <CloseButton onClick={() => setShowModal(false)} />
          </Modal.Header>
          <Modal.Body>
            <VisitedSitesModal details={details} />
          </Modal.Body>
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
};
