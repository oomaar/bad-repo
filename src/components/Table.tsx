import { CSSProperties, ReactNode, useState } from "react";
import { Table as BootstrapTable } from "react-bootstrap";
import { useSortableData } from "../hooks/useSortedTable";
import { TablePagination } from "./TableComponents/TablePagination";
import { TableSearch } from "./TableComponents/TableSearch";
import { useUID } from "react-uid";
import jsPDF from "jspdf";
import "jspdf-autotable";

export const width62pxStyle = { width: "62px" };
export const width35pxStyle = { width: "35px" };
export const width80pxStyle = { width: "80px" };
export const width100pxStyle = { width: "100px" };
export const width150pxStyle = { width: "150px" };

export type TableProps =
  | {
      pageTitle: string;
      columns: Array<{ name: string; style?: CSSProperties; attr: string }>;
      rowsStrings: Array<Array<string>>;
      rowsData: Array<any>;
      rows: (currentPageRowsData: Array<any>) => Array<ReactNode>;
      excelData: any;
    }
  | {
      pageTitle: string;
      columns: Array<{ name: string; style?: CSSProperties; attr: string }>;
      rowsStrings: Array<Array<string>>;
      rowsData: Array<any>;
      getCells: (row: any) => Array<ReactNode>;
      excelData: any;
    };

export function Table(props: TableProps) {
  const { columns, rowsStrings, rowsData, pageTitle, excelData } = props;

  const [tableRowsPerPage, setTableRowsPerPage] = useState(10);

  // Making them in one object to change both of them atomically
  const [currentPageAndSearchTerm, setCurrentPageAndSearchTerm] = useState({
    currentPage: 1,
    searchTerm: "",
  });
  const uid = useUID();
  const headers: Array<string> = [];
  const arrOfData: Array<Array<any>> = [];
  const toPdf = () => {
    const pdf: any = new jsPDF();
    pdf.autoTable({ html: `#pdf-${uid}` });
    pdf.save(`${pageTitle}-report.pdf`);
  };
  columns.map((el) => {
    if (el.attr !== "") {
      headers.push(el.name);
    }
    return 0;
  });
  excelData.map((el: any) => {
    let singleRow: Array<any> = [];
    for (const [, value] of Object.entries(el)) {
      singleRow.push(value);
    }
    arrOfData.push(singleRow);
    return 0;
  });
  const excelContent: any = [headers, ...arrOfData];
  const currentPage = currentPageAndSearchTerm.currentPage;
  const searchTerm = currentPageAndSearchTerm.searchTerm;
  const setCurrentPage = (newCurrentPage: number) =>
    setCurrentPageAndSearchTerm({
      currentPage: newCurrentPage,
      searchTerm,
    });
  const setSearchTerm = (newSearchTerm: string) =>
    setCurrentPageAndSearchTerm({ currentPage: 1, searchTerm: newSearchTerm });

  const searchedData = rowsData.filter((row, rowIndex) => {
    if (searchTerm === "") {
      return true;
    } else {
      return rowsStrings[rowIndex].some((rowString) =>
        rowString.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  });

  const {
    items: sortedSearchedRowsData,
    requestSort,
    sortConfig,
  } = useSortableData(searchedData);

  const indexOfLastPost = currentPage * tableRowsPerPage;
  const indexOfFirstPost = indexOfLastPost - tableRowsPerPage;

  const currentPageRowsData = sortedSearchedRowsData.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const getClassNamesFor = (name: any) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  const tableHeadingFiltered = columns
    .filter((el) => {
      return el.attr !== "";
    })
    .map((column, index) => {
      return (
        <th
          key={index}
          className={`th-sm ${getClassNamesFor(column.attr)}`}
          style={column.style}
          onClick={
            column.attr === "" ? () => {} : () => requestSort(column.attr)
          }
        >
          {column.name}
        </th>
      );
    });
  const tableHeadings = columns.map((column, index) => {
    return (
      <th
        key={index}
        className={`th-sm ${getClassNamesFor(column.attr)}`}
        style={column.style}
        onClick={column.attr === "" ? () => {} : () => requestSort(column.attr)}
      >
        {column.name}
      </th>
    );
  });

  if ("getCells" in props) {
    return (
      <>
        <TableSearch
          toPdf={toPdf}
          pageTitle={pageTitle}
          excelContent={excelContent}
          arrayLength={sortedSearchedRowsData.length}
          setTableRowsPerPage={setTableRowsPerPage}
          setSearchTerm={setSearchTerm}
        />
        <BootstrapTable responsive="lg" size="sm" striped>
          <thead>
            <tr>{tableHeadings}</tr>
          </thead>
          <tbody>
            {currentPageRowsData.map((row, index) => (
              <tr key={index}>
                {props.getCells(row).map((cell, index) => (
                  <td key={index}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </BootstrapTable>
        <BootstrapTable
          responsive="lg"
          size="sm"
          striped
          id={`pdf-${uid}`}
          style={{ display: "none" }}
        >
          <thead>
            <tr>{tableHeadingFiltered}</tr>
          </thead>
          <tbody>
            {" "}
            {rowsData.map((row, index) => (
              <tr key={index}>
                {props.getCells(row).map((cell, index) => (
                  <td key={index}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </BootstrapTable>
        <TablePagination
          totalRowsCount={sortedSearchedRowsData.length}
          currentPage={currentPage}
          tableRowsPerPage={tableRowsPerPage}
          setCurrentPage={setCurrentPage}
        />
      </>
    );
  } else {
    return (
      <>
        <TableSearch
          toPdf={toPdf}
          pageTitle={pageTitle}
          excelContent={excelContent}
          arrayLength={sortedSearchedRowsData.length}
          setTableRowsPerPage={setTableRowsPerPage}
          setSearchTerm={setSearchTerm}
        />
        <BootstrapTable responsive="lg" size="sm" striped>
          <thead>
            <tr>{tableHeadings}</tr>
          </thead>
          <tbody>{props.rows(currentPageRowsData)}</tbody>
        </BootstrapTable>
        <BootstrapTable
          responsive="lg"
          size="sm"
          striped
          id={`pdf-${uid}`}
          style={{ display: "none" }}
        >
          <thead>
            <tr>{tableHeadingFiltered}</tr>
          </thead>
          <tbody>{props.rows(rowsData)}</tbody>
        </BootstrapTable>
        <TablePagination
          totalRowsCount={sortedSearchedRowsData.length}
          currentPage={currentPage}
          tableRowsPerPage={tableRowsPerPage}
          setCurrentPage={setCurrentPage}
        />
      </>
    );
  }
}
