import AuthedClient, {
  GetLicenseMonitoringResponse,
} from "../client/AuthedClient";
import { LicenseMonitoringTable } from "../components/LicenseMonitoring";
import { Page } from "../components/Page";
import { useAuthedClient } from "../context/AuthedClientContext";
import { Filters } from "../context/FiltersContext";

export const LicenseMonitoring = () => {
  const authedClient = useAuthedClient();

  return (
    <Page
      fetchData={(filters) => fetchData(authedClient, filters)}
      shouldShowNoData={shouldShowNoData}
      body={body}
      title="License Monitoring"
    />
  );
};

async function fetchData(
  authedClient: AuthedClient,
  filters: Filters
): Promise<GetLicenseMonitoringResponse> {
  const { startDate, endDate, group, user } = filters;

  return await authedClient.getLicenseMonitoring(
    startDate,
    endDate,
    group,
    user
  );
}

function shouldShowNoData(data: GetLicenseMonitoringResponse): boolean {
  return data.length === 0;
}

function body(data: GetLicenseMonitoringResponse) {
  return (
    <div className="white-box m-0">
      <div className="row">
        <div className="col-lg-12">
          <LicenseMonitoringTable license={data} />
        </div>
      </div>
    </div>
  );
}
