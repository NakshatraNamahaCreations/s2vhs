import React from 'react';

const Contextdata = ({ rowData }) => {
  // Render the details component with the received rowData
  console.log(rowData)
  return (
    <div>
      <h2>Details</h2>
      <p>ID: {rowData.id}</p>
      <p>Name: {rowData.displayname}</p>
      <p>Age: {rowData.age}</p>
    </div>
  );
};

export default Contextdata;
