import React from "react";

type TableData = {
  location: string;
  name: string;
  price: number;
};

type TableProps = {
  data: TableData[];
  onDelete: (index: number) => void;
};

const TableComponent: React.FC<TableProps> = ({ data, onDelete }) => {
  const handleDelete = (index: number) => {
    onDelete(index);
  };

  return (
    <table className="table table-striped table-bordered table-hover">
      <thead>
        <tr>
          <th>Location</th>
          <th>Name</th>
          <th>Price</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.location}</td>
            <td>{row.name}</td>
            <td>{row.price}</td>
            <td>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
