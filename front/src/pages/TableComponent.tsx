import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
type TableData = {
  location: string;
  name: string;
  price: number;
  onDelete: (index: number) => void;
};

const TableComponent: React.FC = () => {
  const [data, setData] = useState<TableData[]>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const entriesPerPage: number = 20;
  const numPages = Math.ceil(data?.length ? data.length / entriesPerPage : 0);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const getPageNumbers = (currentPage: number, numPages: number, maxPagesToShow: number) => {
    const startPage: number = Math.max(1, currentPage - maxPagesToShow);
    const endPage: number = Math.min(numPages, currentPage + maxPagesToShow);
    const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    return pages;
  };

  const pageNumbers = getPageNumbers(currentPage, numPages, 3);

  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentEntries = data?.slice(startIndex, endIndex);

  const getData = (path?: string) => {
    if (path) {
      fetch(`http://localhost:8080/inventories/${path}`).then((response): any => {
        response
          .json()

          .then((apiData) => {
            setData(apiData);
          });
      });
    } else {
      fetch(`http://localhost:8080/inventories`).then((response): any => {
        response
          .json()

          .then((apiData) => {
            setData(apiData);
          });
      });
    }
  };
  const handleFilter = (e: string) => {
    getData(e);
  };
  const handleDelete = (index: number) => {
    fetch(`http://localhost:8080/inventories/${index}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.status === 200) getData();
    });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Link to='/add'>Add</Link>
      <br />
      <select
        id='location'
        className='form-select'
        onChange={(event) => handleFilter(event.target.value)}
        required
      >
        <option>Choose Location:</option>
        <option value='Main Office'>Main Office</option>
        <option value='Cavea Gallery'>Cavea Gallery</option>
        <option value='Cavea Tbilisi Mall'>Cavea Tbilisi Mall</option>
        <option value='Cavea East Point'>Cavea East Point</option>
        <option value='Cavea City Mall'>Cavea City Mall</option>
      </select>
      <table className='table table-striped table-bordered table-hover'>
        <thead>
          <tr>
            <th>Location</th>
            <th>Name</th>
            <th>Price</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {currentEntries &&
            currentEntries.map((row: any) => (
              <tr key={row.id}>
                <td>{row.name}</td>
                <td>{row.location}</td>

                <td>{row.price} GEL</td>
                <td>
                  <button
                    type='button'
                    className='btn btn-danger'
                    onClick={() => handleDelete(row.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <nav className='d-flex justify-content-center'>
        <ul className='pagination'>
          <li className={`page-item${currentPage === 1 ? " disabled" : ""}`}>
            <button className='page-link' onClick={() => handlePageChange(currentPage - 1)}>
              Previous
            </button>
          </li>
          {pageNumbers.map((page) => (
            <li key={page} className={`page-item${currentPage === page ? " active" : ""}`}>
              <button className='page-link' onClick={() => handlePageChange(page)}>
                {page}
              </button>
            </li>
          ))}
          <li className={`page-item${currentPage === numPages ? " disabled" : ""}`}>
            <button className='page-link' onClick={() => handlePageChange(currentPage + 1)}>
              Next
            </button>
          </li>
          <li className={`page-item${currentPage === numPages ? " disabled" : ""}`}>
            <span className='badge bg-primary mx-3 mt-2'>
              <>Total: {data?.length}</>
            </span>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default TableComponent;
