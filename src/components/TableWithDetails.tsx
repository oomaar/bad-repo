import { Table, width80pxStyle } from "./Table";
import { Filters } from "../context/FiltersContext";
import { CSSProperties, ReactNode } from "react";

export type TableWithDetailsProps<RowData> = {
  columns: Array<{ name: string; style?: CSSProperties; attr: string }>;
  rows: Array<RowData>;
  rowsStrings: Array<Array<string>>;
  fetchDetails: (row: any, filters: Filters) => Promise<any>;
  getCells: (row: RowData) => Array<ReactNode>;
};

export function TableWithDetails<RowData>(
  props: TableWithDetailsProps<RowData>
) {
  const columns = [
    ...props.columns,
    { name: "Details", attr: "", style: width80pxStyle },
  ];

  const getCells = (row: RowData) => {
    const cells = props.getCells(row);

    return [...cells, <i className="icon-doc-text view-icon mouse-pointer" />];
  };

  return (
    <Table
      pageTitle={""}
      columns={columns}
      rowsStrings={props.rowsStrings}
      rowsData={props.rows}
      excelData={props.rows}
      getCells={getCells}
    />
  );
}
