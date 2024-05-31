import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Card } from "react-bootstrap";
import * as XLSX from "xlsx";

function Report_Catagory() {
  const apiURL = process.env.REACT_APP_API_URL;
  const [categorydata, setcategorydata] = useState([]);
  const [filteredCategoryData, setFilteredCategoryData] = useState([]);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchInput, setSearchInput] = useState(""); // New state for search input
  const [showMessage, setShowMessage] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [closeWindow, setCloseWindow] = useState(true);

  const getCategory = async () => {
    let res = await axios.get(apiURL + "/getcategory");
    console.log("API response:", res.data);
    if (res.status === 200) {
      const data = res.data?.category;
      console.log("catagory", data);
      setcategorydata(data);
    }
  };

  const filterCategoryData = () => {
    if (searchCategory === "") {
      setFilteredCategoryData(categorydata); // Show all categories when search input is empty
      setSearchInput(""); // Clear the search input
      setShowMessage(true); // Set showMessage to true when search input is empty
    } else {
      const filteredResults = categorydata.filter((item) =>
        item.category.toLowerCase().includes(searchCategory.toLowerCase())
      );
      setFilteredCategoryData(filteredResults);
      setSearchInput(searchCategory); // Set the search input to searchInput state
      setShowMessage(false); // Hide the message
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    if (categorydata.length > 0) {
      filterCategoryData();
    }
  }, [categorydata]);

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
    const worksheet = XLSX.utils.json_to_sheet(filteredCategoryData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Category Data");
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <div style={{ backgroundColor: "#f9f6f6" }} className="web">
      <div>
        <Header />
      </div>
      <div className="p-5 border">
        {closeWindow && (
          <>
            <Card className="p-2">
              <div
                className="pt-2 pe-3"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <i
                  class="fa-solid fa-circle-xmark report-font-hover"
                  title="Close"
                  style={{ color: "#bdbdbd", fontSize: "27px" }}
                  onClick={() => setCloseWindow(!closeWindow)}
                ></i>
              </div>
              <div className="p-4">
                <p>
                  <b>Category Report &gt; Filter</b>{" "}
                </p>
                <br />
                <p>
                  <span>Category</span> <span className="ms-4">:</span>
                  <span className="ms-4">
                    <input
                      className="vhs-input-value"
                      type="text"
                      placeholder="Search Category"
                      value={searchCategory}
                      onChange={(e) => setSearchCategory(e.target.value)}
                    />
                  </span>
                </p>
                <p style={{ justifyContent: "center", display: "flex" }}>
                  <button
                    className="ps-3 pt-2 pb-2 pe-3"
                    style={{
                      border: 0,
                      color: "white",
                      backgroundColor: "#a9042e",
                      borderRadius: "5px",
                    }}
                    onClick={() => {
                      filterCategoryData();
                      setButtonClicked(true);
                    }}
                  >
                    Show
                  </button>
                  {"   "}
                  <button
                    className="ps-3 pt-2 pb-2 pe-3 ms-2"
                    style={{
                      border: 0,
                      color: "white",
                      backgroundColor: "#a9042e",
                      borderRadius: "5px",
                    }}
                    onClick={exportData}
                  >
                    <i
                      class="fa-solid fa-download"
                      title="Download"
                      // style={{ color: "white", fontSize: "27px" }}
                    ></i>{" "}
                    Export
                  </button>
                </p>
                <p>
                  {showMessage && buttonClicked && (
                    <div
                      style={{
                        textAlign: "center",
                        marginBottom: "10px",
                        color: "#a9042e",
                      }}
                    >
                      Please enter a category to search!
                    </div>
                  )}
                </p>
              </div>
            </Card>
            <br />
          </>
        )}
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
            <h5>Vijay Home Services | Catagory {`, ${searchInput}`}</h5>
          </Card>
        </div>{" "}
        <br />
        <DataTable
          columns={columns}
          data={filteredCategoryData}
          pagination
          fixedHeader
          selectableRowsHighlight
          subHeaderAlign="left"
          highlightOnHover
        />
      </div>
    </div>
  );
}

export default Report_Catagory;
