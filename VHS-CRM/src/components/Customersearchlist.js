import React from "react";
import Header from "../components/layout/Header";
import DataTable from "react-data-table-component";

function Customersearchlist() {
  const columns = [
    {
      name: "Sl  No",
      selector: (row, index) => index + 1,
    },
    {
      name: "Card No.",
      selector: (row) => "",
    },
    {
      name: "Customer Name",
      selector: (row) => "Mr.rajan",
    },
    {
      name: "Contact Person",
      selector: (row) => "Mr.rajan",
    },
    {
      name: "Contact",
      selector: (row) => "7689567434",
    },
    {
      name: "Address",
      selector: (row) =>
        "Pyramid pinnacle flat no - 207 38/2,35th A main road 17th cross jp nagar 560078",
    },
    {
      name: "Area",
      selector: (row) => "hdhdhd",
    },

    {
      name: "City",
      selector: (row) => "hdhdhd",
    },
    {
      name: "Pending Amount",
      selector: (row) => "hdhdhd",
    },
  ];

  const customStyles = {
    rows: {
      fontSize: "8px",
    },
  };

  const data = [
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
  ];
  return (
    <div className="web">
      <Header />

      <div className="row m-auto">
        <div className="d-flex float-end pt-3">
          <button className="btn-primary-button mx-2">Community Add</button>

          <button className="btn-secondary-button">Community Search</button>
        </div>
        <div className="col-md-12">
          <div className="mt-3 border">
            <a href="/customersearchdetails">
              <DataTable
                columns={columns}
                data={data}
                customStyles={customStyles}
                pagination
                fixedHeader
                selectableRowsHighlight
                subHeaderAlign="left"
                highlightOnHover
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customersearchlist;