import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Card } from "react-bootstrap";
import * as XLSX from "xlsx";

function Report_1Community() {
  const apiURL = process.env.REACT_APP_API_URL;
  const [communityData, setCommunityData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [city, setCity] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [category, setCategory] = useState("");
  const [commisions, setCommisions] = useState("");
  const [service, setService] = useState("");
  const [communityType, setCommunityType] = useState("");
  const [discount, setDiscount] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [closeWindow, setCloseWindow] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  // removing duplicate value from the select option
  const [duplicateCity, setduplicateCity] = useState(new Set());
  const [duplicateB2BType, setduplicateB2BType] = useState(new Set());

  useEffect(() => {
    const uniqueCities = new Set(
      communityData?.map((item) => item.city).filter(Boolean)
    );

    const uniqueB2BType = new Set(
      communityData?.map((item) => item.b2btype).filter(Boolean)
    );

    setduplicateCity(uniqueCities);
    setduplicateB2BType(uniqueB2BType);
  }, [communityData]);

  const getComnnuityById = async () => {
    try {
      let res = await axios.get(apiURL + "/getcommunitydata");
      if (res.status === 200) {
        console.log("getComnnuityById", res);
        setCommunityData(res.data?.communityDetails);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComnnuityById();
  }, []);

  const handleSearch = () => {
    setFilteredData(communityData);
    setSearchValue("");
    setShowMessage(true);
    const filteredResults = communityData.filter((item) => {
      const itemCity =
        item.city?.toLowerCase().includes(city.toLowerCase()) ?? true;

      const itemFromDate =
        item.createdAt?.toLowerCase().includes(fromDate.toLowerCase()) ?? true;

      const itemToDate =
        item.createdAt?.toLowerCase().includes(toDate.toLowerCase()) ?? true;

      // const itemService =
      //   item.status?.toLowerCase().includes(service.toLowerCase()) ?? true;

      //   const itemCommisions=
      //   item.status?.toLowerCase().includes(commisions.toLowerCase()) ?? true;

      //   const itemDiscount =
      //   item.status?.toLowerCase().includes(discount.toLowerCase()) ?? true;

      // const itemCommunityType =
      //   item.b2btype?.toLowerCase().includes(communityType.toLowerCase()) ?? true;

      //   const itemCategory =
      //   item.status?.toLowerCase().includes(category.toLowerCase()) ?? true;

      return itemFromDate && itemToDate && itemCity;
    });
    setFilteredData(filteredResults);
    setSearchValue(city || fromDate || toDate);
    setShowMessage(false);
  };

  const handleSearchClick = () => {
    handleSearch();
    setButtonClicked(true);
  };

  const exportData = () => {
    const fileName = "One_Community.xlsx";
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "1Communitydetails");
    XLSX.writeFile(workbook, fileName);
  };

  const columns = [
    {
      name: "S.No",
      selector: (row, index) => index + 1,
    },
    {
      name: "Cr.Date",
      selector: (row) => row.createdAt,
    },
    {
      name: "Name",
      selector: (row) => row.b2bname,
    },
    {
      name: "Contact",
      selector: (row) => row.contactperson,
    },
    {
      name: "Address",
      selector: (row) => row.address,
    },
    {
      name: "City",
      selector: (row) => row.city,
    },
    {
      name: "Job Category",
      selector: (row) => row.approach,
    },
    {
      name: "Complete",
      selector: (row) => row.approach,
    },
    {
      name: "Amount",
      selector: (row) => row.approach,
    },
    {
      name: "1 Community Amount",
      selector: (row) => row.executiveName,
    },
  ];

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
              <div className="p-4 row">
                <div className="col-md-1"></div>
                <div className="col-md-6">
                  <p>
                    <b>1 Community Report &gt; Filter</b>{" "}
                  </p>
                  <div className="row">
                    <div className="col-md-4">
                      Next Followup Date (From Date){" "}
                    </div>
                    <div className="col-md-1 ms-4">:</div>
                    <div className="col-md-5 ms-4">
                      <input
                        className="report-select"
                        onChange={(e) => setFromDate(e.target.value)}
                        type="date"
                      />
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-md-4">City </div>
                    <div className="col-md-1 ms-4">:</div>
                    <div className="col-md-5 ms-4">
                      <select
                        className="report-select"
                        onClick={(e) => setCity(e.target.value)}
                      >
                        <option>Select</option>
                        {[...duplicateCity].map((city) => (
                          <option key={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-md-4">Community </div>
                    <div className="col-md-1 ms-4">:</div>
                    <div className="col-md-5 ms-4">
                      <select
                        className="report-select"
                        // style={{ width: "100%" }}
                        onChange={(e) => setCommunityType(e.target.value)}
                      >
                        <option>Select</option>
                        {[...duplicateB2BType].map((typeOfB2B) => (
                          <option key={typeOfB2B}>{typeOfB2B}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <br />
                  <div className="row">
                    <div className="col-md-4">Discount </div>
                    <div className="col-md-1 ms-4">:</div>
                    <div className="col-md-5 ms-4">
                      <select
                        className="report-select"
                        // style={{ width: "100%" }}
                        onChange={(e) => setDiscount(e.target.value)}
                      >
                        <option>Select</option>
                        {[...duplicateB2BType].map((typeOfB2B) => (
                          <option key={typeOfB2B}>{typeOfB2B}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                {/* next column=========================== */}
                <div className="col-md-5">
                  <br />
                  <div className="row"></div>
                  <div className="row mt-3">
                    <div className="col-md-4">
                      {" "}
                      Next Followup Date (To Date){" "}
                    </div>
                    <div className="col-md-1 ms-4">:</div>
                    <div className="col-md-5 ms-4">
                      <input
                        className="report-select"
                        onChange={(e) => setToDate(e.target.value)}
                        type="date"
                      />
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-md-4 ">Commission *</div>
                    <div className="col-md-1 ms-4">:</div>
                    <div className="col-md-5 ms-4">
                      <select
                        className="report-select"
                        onClick={(e) => setCommisions(e.target.value)}
                      >
                        <option>All</option>
                        {/* {[...duplicateCategory].map((statusData) => (
                          <option key={statusData}>{statusData}</option>
                        ))} */}
                      </select>
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-md-4">Services</div>
                    <div className="col-md-1 ms-4">:</div>
                    <div className="col-md-5 ms-4">
                      <select
                        className="report-select"
                        onClick={(e) => setService(e.target.value)}
                      >
                        <option>Select</option>
                        {/* <option>Attended</option>
                        <option>Quotation prepared</option>
                        <option>quotation sent</option> */}
                      </select>
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-md-4"> Category</div>
                    <div className="col-md-1 ms-4">:</div>
                    <div className="col-md-5 ms-4">
                      <select
                        className="report-select"
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option>Select</option>
                      </select>
                    </div>
                  </div>
                  <br />
                </div>
                <p style={{ justifyContent: "center", display: "flex" }}>
                  <button
                    className="ps-3 pt-2 pb-2 pe-3"
                    style={{
                      border: 0,
                      color: "white",
                      backgroundColor: "#a9042e",
                      borderRadius: "5px",
                    }}
                    onClick={handleSearchClick}
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
                      Please select option to search!
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
            <h5>
              Vijay Home Services | 1 community Reports {`, ${searchValue}`}
            </h5>
          </Card>
        </div>{" "}
        <br />
        <DataTable
          columns={columns}
          data={filteredData}
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

export default Report_1Community;
