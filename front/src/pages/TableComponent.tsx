import React from "react";
import { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
type TableData = {
  location: string;
  name: string;
  price: number;
  onDelete: (index: number) => void;
};

const TableComponent: React.FC = () => {
  const [data, setData] = useState<TableData[]>();

  const handleDelete = (index: number) => {};
  useEffect(() => {
    fetch("http://localhost:8080/items").then((response): any => {
      response
        .json()

        .then((apiData) => {
          console.log(apiData);
          setData(apiData);
        });
    });
  }, []);

  return (<>
    <Link to="/add">Add</Link>
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
        {data &&
          data.map((row: any, index: number) => (
            <tr key={index}>
              <td>{row.location}</td>
              <td>{row.name}</td>
              <td>{row.price}</td>
              <td>
                <button
                  type='button'
                  className='btn btn-danger'
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
    </>);
};

export default TableComponent;
