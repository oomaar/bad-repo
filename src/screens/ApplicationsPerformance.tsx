import AuthedClient, {
  GetProcessesPerformanceResponse,
} from "../client/AuthedClient";
import { Page } from "../components/Page";
import { useAuthedClient } from "../context/AuthedClientContext";
import { Filters } from "../context/FiltersContext";
import { ApplicationsPerformanceBody } from "../components/PerformanceComponents";

export const ApplicationsPerformance = () => {
  const authedClient = useAuthedClient();

  return (
    <Page
      fetchData={(filters) => fetchData(authedClient, filters)}
      shouldShowNoData={shouldShowNoData}
      body={body}
      title="Applications Performance"
    />
  );
};

async function fetchData(
  authedClient: AuthedClient,
  filters: Filters
): Promise<GetProcessesPerformanceResponse> {
  const { startDate, endDate, group, user } = filters;

  return await authedClient.getProcessesPerformance(
    startDate,
    endDate,
    group,
    user
  );
}

function shouldShowNoData(data: GetProcessesPerformanceResponse): boolean {
  return data.length === 0;
}

function body(data: GetProcessesPerformanceResponse) {
  return <ApplicationsPerformanceBody processes={data} />;
}
