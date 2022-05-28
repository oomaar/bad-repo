import { range } from "lodash";
import { useEffect, useState } from "react";

export const TablePagination = ({
  currentPage,
  tableRowsPerPage,
  setCurrentPage,
  totalRowsCount,
}: {
  currentPage: number;
  tableRowsPerPage: number;
  setCurrentPage: (currentPage: number) => void;
  totalRowsCount: number;
}) => {
  const [screenWidth, setScreenWidth] = useState(700);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    if (window.innerWidth <= screenWidth) {
      setVisibleCount(3);
      setScreenWidth(window.innerWidth);
    } else {
      setVisibleCount(5);
      setScreenWidth(700);
    }
  }, [screenWidth]);

  const numberOfPages = range(
    1,
    Math.ceil(totalRowsCount / tableRowsPerPage) + 1
  );
  const getSliceStart = () => {
    if (range(0, Math.ceil(visibleCount / 2)).includes(currentPage)) {
      return numberOfPages[0] - 1;
    } else if (
      range(
        numberOfPages.length - Math.floor(visibleCount / 2),
        numberOfPages.length + 1
      ).includes(currentPage)
    ) {
      return numberOfPages[numberOfPages.length - 1 - visibleCount];
    } else {
      return currentPage - Math.ceil(visibleCount / 2);
    }
  };

  const getSliceEnd = () => {
    if (
      range(
        numberOfPages.length - Math.floor(visibleCount / 2),
        numberOfPages.length + 1
      ).includes(currentPage)
    ) {
      return numberOfPages[numberOfPages.length - 1];
    } else if (range(0, Math.ceil(visibleCount / 2)).includes(currentPage)) {
      return visibleCount;
    } else {
      return currentPage + Math.floor(visibleCount / 2);
    }
  };

  const displayNumberOfEntriesPerPage = () => {
    if (currentPage === numberOfPages.length) {
      if (totalRowsCount % tableRowsPerPage === 0) {
        return tableRowsPerPage;
      } else {
        return totalRowsCount % tableRowsPerPage;
      }
    } else if (totalRowsCount === 0) {
      return 0;
    } else {
      return tableRowsPerPage;
    }
  };

  return (
    <div className="row table-pagination-row">
      <div className="col-sm-12 col-md-5">
        <div
          className="dataTables_info table-pagination-entries"
          id="dtBasicExample_info"
          role="status"
          aria-live="polite"
        >
          Showing {totalRowsCount === 0 ? "0" : "1"} to{" "}
          {displayNumberOfEntriesPerPage()} of {totalRowsCount} entries
        </div>
      </div>
      <div className="col-sm-12 col-md-7">
        <div
          className="dataTables_paginate paging_simple_numbers table-pagination-numbers"
          id="dtBasicExample_paginate"
        >
          <ul className="pagination">
            <li
              className="paginate_button page-item previous"
              id="dtBasicExample_previous"
            >
              <button
                className="page-link"
                onClick={() =>
                  setCurrentPage(
                    currentPage > 1 ? currentPage - 1 : currentPage
                  )
                }
                disabled={currentPage <= 1 ? true : false}
              >
                Previous
              </button>
            </li>
            {numberOfPages.length > 5 && currentPage > visibleCount - 2 && (
              <li className="paginate_button page-item">
                <button
                  className="page-link"
                  onClick={() =>
                    setCurrentPage(
                      currentPage - visibleCount > 0
                        ? currentPage - visibleCount
                        : 1
                    )
                  }
                >
                  ...
                </button>
              </li>
            )}
            {numberOfPages
              .slice(getSliceStart(), getSliceEnd())
              .map((number: number, i) => (
                <li
                  key={i}
                  className={`${
                    currentPage === number
                      ? "paginate_button page-item active"
                      : "paginate_button page-item"
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(number)}
                  >
                    {number}
                  </button>
                </li>
              ))}
            {numberOfPages.length > 5 &&
              currentPage <
                numberOfPages[numberOfPages.length - 1] -
                  Math.floor(visibleCount / 2) && (
                <li className="paginate_button page-item ">
                  <button
                    className="page-link"
                    onClick={() => {
                      setCurrentPage(
                        currentPage + visibleCount <= numberOfPages.length
                          ? numberOfPages[currentPage + visibleCount - 1]
                          : numberOfPages[numberOfPages.length - 1]
                      );
                    }}
                  >
                    ...
                  </button>
                </li>
              )}
            <li
              className="paginate_button page-item next"
              id="dtBasicExample_next"
            >
              <button
                className="page-link"
                onClick={() =>
                  setCurrentPage(
                    currentPage < numberOfPages.length
                      ? currentPage + 1
                      : currentPage
                  )
                }
                disabled={currentPage === numberOfPages.length ? true : false}
              >
                Next
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
