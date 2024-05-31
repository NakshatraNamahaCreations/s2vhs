import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import * as XLSX from "xlsx";
import moment from "moment";
import { Card } from "react-bootstrap";

function Report_closedp() {
  const admin = JSON.parse(sessionStorage.getItem("admin"));
  const apiURL = process.env.REACT_APP_API_URL;
  const [fromdate, setFromData] = useState(moment().format("YYYY-MM-DD"));
  const [todate, setToData] = useState(moment().format("YYYY-MM-DD"));
  const [treatmentData, settreatmentData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const handleSearchClick = () => {
    getservicedata();


  };


  const getservicedata = async () => {
    try {
      let res = await axios.get(apiURL + "/getcloseprojectreport", {
        params: {
          fromdate,
          todate,
          city: admin.city,
        },
      });

      if (res.status === 200) {
        console.log("res.data?.dsrdata", res.data?.dsrdata)
        const allData = res.data?.dsrdata;



        setSearchResults(allData);
        settreatmentData(allData);
      }
    } catch (error) {
      console.log("Error in Search", error);
    }
  };


  const exportData = () => {
    const fileName = "Closed_Project_Report.xlsx";


    const filteredData1 = searchResults?.map(item => ({
      date: item.date,
      closeDate: item?.closeDate,
      Projectmanager: item.dsrdata[0]?.TechorPMorVendorName,
      salesExecutive: item.quotedata[0]?.salesExecutive,
      customerName: item.customerData[0]?.customerName,
      mainContact: item.customerData[0]?.mainContact,
      address:
        item.deliveryAddress.address
      ,

    }));
    const worksheet = XLSX.utils.json_to_sheet(filteredData1);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Category Data");
    XLSX.writeFile(workbook, fileName);
  };

  const [searchName, setsearchName] = useState("");
  const [searchDateTime, setsearchDateTime] = useState("")
  const [executive, setexecutive] = useState("");
  const [searchContact, setsearchContact] = useState("");
  const [searchpm, setsearchpm] = useState("");


  useEffect(() => {
    const filterResults = () => {
      let results = treatmentData;

      if (searchDateTime) {
        results = results.filter(
          (item) =>
          (item.date &&
            item.date
              .toLowerCase()
              .includes(searchDateTime.toLowerCase()))
        );
      }


      if (searchName) {
        results = results.filter(
          (item) =>
            item.customerData[0]?.customerName &&
            item.customerData[0]?.customerName
              .toLowerCase()
              .includes(searchName.toLowerCase())
        );
      }

      if (searchpm) {
        results = results.filter(
          (item) =>
            item.dsrdata[0]?.TechorPMorVendorName &&
            item.dsrdata[0]?.TechorPMorVendorName
              .toLowerCase()
              .includes(searchpm.toLowerCase())
        );
      }
      if (executive) {
        results = results.filter(
          (item) =>
            item.quotedata[0]?.salesExecutive &&
            item.quotedata[0]?.salesExecutive
              .toLowerCase()
              .includes(executive.toLowerCase())
        );
      }

      if (searchContact) {
        results = results.filter((item) => {
          const mainContact = item.customerData[0]?.mainContact;
          if (typeof mainContact === "string") {
            return mainContact
              .toLowerCase()
              .includes(searchContact.toLowerCase());
          } else if (typeof mainContact === "number") {
            const stringMainContact = String(mainContact); // Convert number to string
            return stringMainContact
              .toLowerCase()
              .includes(searchContact.toLowerCase());
          }
          return false; // Exclude if mainContact is neither string nor number
        });
      }



      setSearchResults(results);
    };
    filterResults();
  }, [
    executive,
    searchName,
    searchDateTime,
    searchContact,
    searchpm

  ]);



  return (
    <div className="web">
      <Header />

      <div style={{ display: "flex", justifyContent: "flex-end" }}>

      </div>

      <div className="row p-5">
        <div className="col-md-6 mt-2">
          <p style={{ fontSize: "25px" }}>
            <b>Closed Project  Report &gt; Filter</b>{" "}
          </p>
          <div className="row ">
            <div className="col-md-4"> From Date </div>
            <div className="col-md-1 ms-4">:</div>
            <div className="col-md-5 ms-4">
              <input
                className="report-select"
                type="date"
                defaultValue={moment().format("YYYY-MM-DD")}
                onChange={(e) => setFromData(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <br />
          <br />

          <div className="row"></div>
          <div className="row mt-3">
            <div className="col-md-4 "> To Date </div>
            <div className="col-md-1 ms-4">:</div>
            <div className="col-md-5 ms-4">
              <input
                className="report-select"
                type="date"
                defaultValue={moment().format("YYYY-MM-DD")}
                onChange={(e) => setToData(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <p style={{ justifyContent: "center", display: "flex", marginTop: "30px" }}>
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
          <h5>Vijay Home Services | Closed Project Reports </h5>
        </Card>
      </div>{" "}
      <br />








      <table className="table table-hover table-bordered mt-1">
        <thead className="">
          <tr>
            <th scope="col">
              <input type="text" className="vhs-table-input" />
            </th>
            <th scope="col">
              <input type="text" className="vhs-table-input" />
            </th>
            <th scope="col">
              <input type="text" className="vhs-table-input" />
            </th>
            <th scope="col">
              <select
                className="vhs-table-input"
                value={searchpm}
                onChange={(e) => setsearchpm(e.target.value)}
              >
                <option value="">Select</option>
                {[
                  ...new Set(
                    treatmentData?.sort((a, b) => a.dsrdata[0]?.TechorPMorVendorName.localeCompare(b.dsrdata[0]?.TechorPMorVendorName)).map(
                      (item) => item?.dsrdata[0]?.TechorPMorVendorName
                    )
                  ),
                ].map((uniqueName) => (
                  <option value={uniqueName} key={uniqueName}>
                    {uniqueName}
                  </option>
                ))}
              </select>
            </th>
            <th scope="col">
              <select
                className="vhs-table-input"
                value={executive}
                onChange={(e) => setexecutive(e.target.value)}
              >
                <option value="">Select</option>
                {[
                  ...new Set(
                    treatmentData?.sort((a, b) => a.quotedata[0]?.salesExecutive.localeCompare(b.quotedata[0]?.salesExecutive)).map(
                      (item) => item?.quotedata[0]?.salesExecutive
                    )
                  ),
                ].map((uniqueName) => (
                  <option value={uniqueName} key={uniqueName}>
                    {uniqueName}
                  </option>
                ))}
              </select>
            </th>
            <th scope="col">
              <input
                className="vhs-table-input"
                value={searchName}
                onChange={(e) => setsearchName(e.target.value)}
              />{" "}
            </th>
            <th scope="col">
              <input
                className="vhs-table-input"
                value={searchContact}
                onChange={(e) => setsearchContact(e.target.value)}
              />
            </th>
            <th scope="col">
              <input type="text" className="vhs-table-input" />
            </th>
          </tr>

          <tr className="table-secondary">
            <th className="table-head" scope="col">
              Sr.No
            </th>
            <th className="table-head" scope="col">
              Book Date
            </th>
            <th className="table-head" scope="col">
              Close Date
            </th>
            <th className="table-head" scope="col">
              Project Manager
            </th>
            <th scope="col" className="table-head">
              Sales Executive
            </th>
            <th scope="col" className="table-head">
              Customer
            </th>
            <th scope="col" className="table-head">
              Contact No.
            </th>
            <th scope="col" className="table-head">
              Address
            </th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((item, index) => (
            <tr className="user-tbale-body">
              <td>{index + 1}</td>
              <td>{item.date}</td>

              <td>{item.closeDate}</td>
              <td>{item.dsrdata[0]?.TechorPMorVendorName}</td>
              <td>{item.quotedata[0]?.salesExecutive}</td>
              <td> {item.customerData[0]?.customerName}</td>
              <td> {item.customerData[0]?.mainContact}</td>
              <td>
                {item.deliveryAddress ? (
                  <>
                    {item.deliveryAddress.platNo},{" "}
                    {item.deliveryAddress.address} -{" "}
                    {item.deliveryAddress.landmark}
                  </>
                ) : (
                  <>
                    {item.customerData[0]?.lnf},{item.customerData[0]?.rbhf}
                    ,{item.customerData[0]?.cnap},
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Report_closedp