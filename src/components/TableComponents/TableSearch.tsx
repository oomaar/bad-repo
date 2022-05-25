import { CSVLink } from "react-csv";

export const TableSearch = ({
  pageTitle,
  arrayLength,
  setTableRowsPerPage,
  setSearchTerm,
  excelContent,
  toPdf,
}: {
  pageTitle: string;
  arrayLength: number;
  setTableRowsPerPage: (tableRowsPerPage: number) => void;
  setSearchTerm: (searchTerm: string) => void;
  excelContent: any;
  toPdf: () => void;
}) => {
  return (
    <div className="row table-search-row">
      <div className="col-sm-12 col-md-6 table-show-entries">
        <div className="dataTables_length bs-select" id="dtBasicExample_length">
          <label>
            Show{" "}
            <select
              name="dtBasicExample_length"
              aria-controls="dtBasicExample"
              className="custom-select custom-select-sm form-control form-control-sm"
              onChange={(e) => setTableRowsPerPage(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={25} disabled={arrayLength < 25 ? true : false}>
                25
              </option>
              <option value={50} disabled={arrayLength < 50 ? true : false}>
                50
              </option>
              <option value={100} disabled={arrayLength < 100 ? true : false}>
                100
              </option>
            </select>{" "}
            entries
          </label>
        </div>
      </div>
      <div className="col-sm-12 col-md-6 table-search">
        <div id="dtBasicExample_filter" className="dataTables_filter">
          <label>
            Search:
            <input
              autoComplete="new-password"
              type="search"
              className="form-control form-control-sm"
              placeholder=""
              aria-controls="dtBasicExample"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </label>
        </div>
        <div className="download-btns-container">
          <div className="btn btn-primary btn-sm download-btn">
            <CSVLink
              filename={
                pageTitle !== undefined || pageTitle === " "
                  ? `${pageTitle}-Report.csv`
                  : "Data-Report.csv"
              }
              data={excelContent}
            >
              <i className="icon-file-excel" />
              Excel
            </CSVLink>
          </div>
          <div className="btn btn-red btn-sm download-btn-pdf" onClick={toPdf}>
            <i className="icon-file-pdf" />
            <button>PDF</button>
          </div>
        </div>
      </div>
    </div>
  );
};
