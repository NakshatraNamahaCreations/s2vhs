import React, { useState, useEffect } from "react";
// import Header from "../layout/Header";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Card, Table } from "react-bootstrap";
import * as XLSX from "xlsx";
import Header from "./layout/Header";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";

function OneCommunityReports() {
  const location = useLocation();
  const { data } = location.state || null;

  const apiURL = process.env.REACT_APP_API_URL;
  const [filteredCategoryData, setFilteredCategoryData] = useState([]);
  const [fromDate, setFromData] = useState("");
  const [toDate, setToDate] = useState("");
  const [oneCommunity, setOneCommunity] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [closeWindow, setCloseWindow] = useState(true);

  // const filterCategoryData = () => {
  //   if (searchCategory === "") {
  //     setFilteredCategoryData(categorydata); // Show all categories when search input is empty
  //     setSearchInput(""); // Clear the search input
  //     setShowMessage(true); // Set showMessage to true when search input is empty
  //   } else {
  //     const filteredResults = categorydata.filter((item) =>
  //       item.category.toLowerCase().includes(searchCategory.toLowerCase())
  //     );
  //     setFilteredCategoryData(filteredResults);
  //     setSearchInput(searchCategory); // Set the search input to searchInput state
  //     setShowMessage(false); // Hide the message
  //   }
  // };

  const columns = [
    {
      name: "Sr.No",
      selector: (row, index) => index + 1,
    },
    {
      name: "Category",
      selector: (row) => row.category,
    },
  ];

  const exportData = () => {
    const fileName = "category_data.xlsx";
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Category Data");
    XLSX.writeFile(workbook, fileName);
  };

  var i = 1;

  // const createdDate = data?.createdAt
  //   ? new Date(Date.parse(data?.createdAt))
  //   : null;

  // const createdDate =  {format(new Date(data.createdAt), 'yyyy-MM-dd')}

  const formattedCreatedAt = new Date(data?.createdAt)
    .toISOString()
    .slice(0, 10);
  return (
    <div style={{ backgroundColor: "#f9f6f6" }} className="web">
      <div>
        <Header />
      </div>
      <div className="p-5">
        <div>
          <div
            className="p-2"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              backgroundColor: "white",
            }}
          >
            <div className="ms-3">
              <i
                class="fa-solid fa-print report-font-hover"
                title="Print"
                style={{ color: "#bdbdbd", fontSize: "27px" }}
                onClick={() => window.print()}
              ></i>
            </div>{" "}
            <div className="ms-3">
              <i
                class="fa-solid fa-house report-font-hover"
                title="Home"
                style={{ color: "#bdbdbd", fontSize: "27px" }}
                onClick={() => window.location.assign("/home")}
              ></i>
            </div>{" "}
            <div className="ms-3">
              <i
                class="fa-solid fa-rotate-right report-font-hover"
                title="Reload"
                style={{ color: "#bdbdbd", fontSize: "27px" }}
                onClick={() => window.location.reload()}
              ></i>
            </div>
          </div>
          <br />
        </div>
        <div>
          <Card
            className="ps-3 p-2"
            style={{ color: "white", backgroundColor: "#a9042e" }}
          >
            <h5>
              Vijay Home Services | 1 Community {`, ${data.appartmentname}`}
            </h5>
          </Card>
        </div>{" "}
        <br />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Cr.Date</th>
              <th>Name</th>
              <th>Contact </th>
              <th>Address </th>
              <th>City </th>
              <th>Job Category </th>
              <th>Complete </th>
              <th>Amount </th>
              <th>1 Community Amount </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{i++} </td>
              <td> {formattedCreatedAt} </td>
              <td>{data?.communityData[0]?.customerData[0]?.customerName} </td>
              <td>{data?.communityData[0]?.customerData[0]?.mainContact} </td>
              <td>
                {data?.communityData[0]?.customerData[0]?.rbhf},
                {data?.communityData[0]?.customerData[0]?.lnf} ,
                {data?.communityData[0]?.customerData[0]?.cnap}-{" "}
                {data?.communityData[0]?.customerData[0]?.pinCode}{" "}
              </td>
              <td> {data?.communityData[0]?.customerData[0]?.city} </td>
              <td>{data?.communityData[0]?.category} </td>
              <td> </td>
              <td> 0.00 </td>
              <td>{data?.communityData[0]?.oneCommunity} </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default OneCommunityReports;
