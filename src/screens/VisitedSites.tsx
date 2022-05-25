import { useAuthedClient } from "../context/AuthedClientContext";
import AuthedClient, { GetVisitedSitesResponse } from "../client/AuthedClient";
import { Page } from "../components/Page";
import { Filters } from "../context/FiltersContext";
import {
  VisitedSitesChart,
  VisitedSitesTable,
} from "../components/VisitedSites";

export function VisitedSites() {
  const authedClient = useAuthedClient();

  return (
    <Page<GetVisitedSitesResponse>
      fetchData={(filters) => fetchData(authedClient, filters)}
      shouldShowNoData={shouldShowNoData}
      body={body}
      title="Visited Sites"
    />
  );
}

async function fetchData(
  authedClient: AuthedClient,
  filters: Filters
): Promise<GetVisitedSitesResponse> {
  const { startDate, endDate, group, user } = filters;

  return await authedClient.getVisitedSites(startDate, endDate, group, user);
}

function shouldShowNoData(data: GetVisitedSitesResponse): boolean {
  return data.length === 0;
}

function body(data: GetVisitedSitesResponse) {
  return (
    <div className="white-box m-0">
      <div className="row">
        <VisitedSitesChart sites={data} />
        <VisitedSitesTable sites={data} />
      </div>
    </div>
  );
}
