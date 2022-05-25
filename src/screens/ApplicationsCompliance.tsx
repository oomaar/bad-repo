import { useCallback } from "react";
import { useAuthedClient } from "../context/AuthedClientContext";
import { CustomGaugeChart } from "../components/CustomGaugeChart";
import { Filters } from "../context/FiltersContext";
import AuthedClient, {
  GetApplicationsAndDevicesComplianceResponse,
} from "../client/AuthedClient";
import { TabbedPage } from "../components/TabbedPage";
import { ApplicationsComplianceTable } from "../components/ComplianceComponents/ApplicationsComplianceTable";
import { ApplicationsComplianceDevicesTable } from "../components/ComplianceComponents/ApplicationsComplianceDevicesTable";

export function ApplicationsCompliance() {
  const authedClient = useAuthedClient();

  const fetchDataCallback = useCallback(
    (filters) => fetchData(authedClient, filters),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const shouldShowNoDataCallback = useCallback(
    (data: GetApplicationsAndDevicesComplianceResponse) =>
      data.totalApplicationsCount === 0,
    []
  );

  return (
    <TabbedPage<GetApplicationsAndDevicesComplianceResponse>
      pageProps={{
        fetchData: fetchDataCallback,
        shouldShowNoData: shouldShowNoDataCallback,
        title: "Applications Compliance",
      }}
      tabs={[
        {
          title: "Applications Compliance",
          body: (data, onDataChange) =>
            ApplicationsComplianceTab(data, onDataChange),
        },
        {
          title: "Users Compliance",
          body: (data) => DevicesComplianceTab(data),
        },
      ]}
    />
  );
}

async function fetchData(
  authedClient: AuthedClient,
  filters: Filters
): Promise<GetApplicationsAndDevicesComplianceResponse> {
  const { startDate, endDate, group, user } = filters;
  return await authedClient.getApplicationsAndDevicesCompliance(
    startDate,
    endDate,
    group,
    user
  );
}

function ApplicationsComplianceTab(
  data: GetApplicationsAndDevicesComplianceResponse,
  onDataChange: () => void
) {
  return (
    <div className="row">
      <ComplianceSummaryCard
        complied={data.allowedApplicationsCount}
        notComplied={data.notAllowedApplicationsCount}
        text="Applications"
      />
      <ApplicationsComplianceTable
        onDataChange={onDataChange}
        applications={data.applicationsDetails}
      />
    </div>
  );
}

function DevicesComplianceTab(
  data: GetApplicationsAndDevicesComplianceResponse
) {
  return (
    <div className="row">
      <ComplianceSummaryCard
        complied={data.compliedDevicesCount}
        notComplied={data.notCompliedDevicesCount}
        text="Devices"
      />
      <ApplicationsComplianceDevicesTable devices={data.devicesList} />
    </div>
  );
}

function ComplianceSummaryCard(props: {
  complied: number;
  notComplied: number;
  text: "Applications" | "Devices";
}) {
  const { complied, notComplied, text } = props;

  const percentage = complied / (complied + notComplied);

  return (
    <div className="col-xl-5">
      <div className="chart-box">
        <div className="gauge-info application-compliance-chart-number">
          <h3>Compliance Percentage</h3>
          <CustomGaugeChart percent={percentage} />
          <div className="row g-2">
            <div className="col-6">
              <div className="countNo">
                <h1>{complied}</h1>
                <p>Complied {text}</p>
              </div>
            </div>
            <div className="col-6">
              <div className="countNo">
                <h1>{notComplied}</h1>
                <p>Not Complied {text}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
