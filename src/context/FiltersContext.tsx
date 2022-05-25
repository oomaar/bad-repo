import * as React from "react";
import { PropsWithChildren } from "react";
import { DateTime } from "luxon";

export type Filters = {
  startDate: DateTime;
  endDate: DateTime;
  group: number;
  user: number | undefined;
};

const FiltersContext = React.createContext<Filters | undefined>(undefined);

function FiltersProvider(props: PropsWithChildren<{ filters: Filters }>) {
  const { filters } = props;

  return (
    <FiltersContext.Provider value={filters}>
      {props.children}
    </FiltersContext.Provider>
  );
}

function useFilters() {
  const context = React.useContext(FiltersContext);
  if (context === undefined) {
    throw new Error(`useFilters must be used within a FiltersProvider`);
  }
  return context;
}

export { FiltersProvider, useFilters };
