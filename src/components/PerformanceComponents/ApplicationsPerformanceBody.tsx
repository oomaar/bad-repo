import { useState } from "react";
import {
  GetModalDevicesTabDetailsProcess,
  GetProcessesPerformanceDetailsProcess,
  GetProcessesPerformanceResponse,
} from "../../client/AuthedClient";
import { useAuthedClient } from "../../context/AuthedClientContext";
import { useFilters } from "../../context/FiltersContext";
import {
  ApplicationPerformanceSummaryCard,
  ApplicationPerformanceTable,
} from "./";

export const ApplicationsPerformanceBody = (props: {
  processes: GetProcessesPerformanceResponse;
}) => {
  type DetailsState = Array<GetProcessesPerformanceDetailsProcess>;
  type DevicesDetailsState = Array<GetModalDevicesTabDetailsProcess>;
  const { processes } = props;
  const topProcesses = processes.slice(0, 3);

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [details, setDetails] = useState<DetailsState>([]);
  const [devicesDetails, setDevicesDetails] = useState<DevicesDetailsState>([]);

  const filters = useFilters();
  const { startDate, endDate, group, user } = filters;
  const authedClient = useAuthedClient();

  const handleModalData = (proccessName: string) => {
    authedClient
      .getFailureDetails(proccessName, startDate, endDate, group, user)
      .then((res) => {
        setDetails(res);
        setShowModal(true);
      });
  };

  const handleDevicesModalData = (processName: string) => {
    authedClient
      .getDevicesDetails(processName, startDate, endDate, group, user)
      .then((response) => setDevicesDetails(response));
  };

  const onDetailsClick = (processName: string) => {
    handleModalData(processName);
    handleDevicesModalData(processName);
    setModalTitle(processName);
  };

  return (
    <>
      <div className="row widgets g-4">
        <ApplicationPerformanceSummaryCard
          topProcesses={topProcesses}
          onDetailsClick={onDetailsClick}
        />
      </div>
      <div className="white-box m-0">
        <div className="row">
          <div className="col-lg-12">
            <ApplicationPerformanceTable
              processes={processes}
              showModal={showModal}
              onHide={() => setShowModal(false)}
              modalTitle={modalTitle}
              details={details}
              devicesDetails={devicesDetails}
              onDetailsClick={onDetailsClick}
            />
          </div>
        </div>
      </div>
    </>
  );
};
