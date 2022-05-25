import { ReactElement, useEffect, useState } from "react";
import { initialEndDate, initialStartDate, PageHeader } from "./PageHeader";
import { assertNever } from "../utils/misc";
import { Loader } from "./Loader/Loader";
import { NoData } from "./NoData";
import { Filters, FiltersProvider } from "../context/FiltersContext";

export type PageProps<T> = {
  title: string;
  fetchData: (filters: Filters) => Promise<T>;
  shouldShowNoData: (data: T) => boolean;
  body: (data: T, onDataChange: () => void) => ReactElement;
  loading?: ReactElement;
};

export function Page<T>(props: PageProps<T>) {
  const { title, fetchData, shouldShowNoData, body, loading } = props;

  const [filters, setFilters] = useState<Filters>({
    startDate: initialStartDate,
    endDate: initialEndDate,
    group: 0,
    user: undefined,
  });
  const [loadingState, setLoadingState] = useState<LoadingState<T>>({
    kind: "loading",
  });
  let ignore = false;

  function fetch() {
    (async () => {
      setLoadingState({ kind: "loading" });

      try {
        const data = await fetchData(filters);
        if (!ignore) {
          setLoadingState({ kind: "loaded", data });
        }
      } catch (error) {
        if (!ignore) {
          setLoadingState({ kind: "errored", error });
        }
      }
    })();
  }

  useEffect(() => {
    fetch();

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ignore = true;
    };
  }, [fetchData, filters]);

  const pageHeader = (
    <PageHeader
      disabled={loadingState.kind === "loading"}
      title={title}
      onFilterChanged={(startDate, endDate, group, user) => {
        setFilters({ startDate, endDate, group, user });
      }}
      isUserFilter={true}
    />
  );

  if (loadingState.kind === "loading") {
    return (
      <FiltersProvider filters={filters}>
        <div className="page-container">
          {pageHeader}
          {loading === undefined ? <Loader /> : loading}
        </div>
      </FiltersProvider>
    );
  } else if (loadingState.kind === "loaded") {
    return (
      <FiltersProvider filters={filters}>
        <div className="page-container">
          {pageHeader}
          {shouldShowNoData(loadingState.data) ? (
            <NoData />
          ) : (
            body(loadingState.data, () => {
              fetch();
            })
          )}
        </div>
      </FiltersProvider>
    );
  } else if (loadingState.kind === "errored") {
    return (
      <FiltersProvider filters={filters}>
        <div className="page-container">
          {pageHeader}
          <div>Something wrong happened. Please, contact the developers.</div>
        </div>
      </FiltersProvider>
    );
  } else {
    return assertNever(loadingState);
  }
}

type LoadingState<T> =
  | { kind: "loading" }
  | { kind: "loaded"; data: T }
  | { kind: "errored"; error: any };
