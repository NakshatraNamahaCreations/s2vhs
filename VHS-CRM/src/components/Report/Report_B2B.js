import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Card } from "react-bootstrap";
import * as XLSX from "xlsx";
import moment from "moment";

function Report_B2B() {
  const admin = JSON.parse(sessionStorage.getItem("admin"));

  const apiURL = process.env.REACT_APP_API_URL;
  const [b2bData, setb2bdata] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [city, setCity] = useState("");
  const [fromdate, setfromdate] = useState(moment().format("YYYY-MM-DD"));
  const [todate, setToDate] = useState(moment().format("YYYY-MM-DD"));
  const [statusData, setStatus] = useState("");
  const [sentMails, setSentMails] = useState("");
  const [b2bType, setB2BType] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [closeWindow, setCloseWindow] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);



  const filterData = async () => {
    try {
      const res = await axios.get(`${apiURL}/getB2Breports`, {

        fromdate,
        todate,


      });

      if (res.status === 200) {

        setSearchResults(res.data?.b2bdata)
        setFilteredData(res.data?.b2bdata);

      } else {
        // Set filterdata to an empty array in case of an error
        setFilteredData([]);
      }
    } catch (error) {
      setFilteredData([]);
    }
  };


  const handleSearchClick = () => {
    filterData();

  };

  const exportData = () => {
    const fileName = `b2b_details.xlsx`;

      // Assuming each object in searchResults has properties like 'category' and 'img'
      const filteredData1 = searchResults?.map(item => ({
        date: item.date,
        b2bname: item?.b2bname,
        contactperson: item?.contactperson,
        maincontact: item?.maincontact,
        email: item?.email,
        city: item?.city,
        address: item?.address,
        b2btype: item?.b2btype,
        approach: item?.approach,
        executiveName:item?.executiveName
      }));
    
    const worksheet = XLSX.utils.json_to_sheet(filteredData1);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "B2B_details");
    XLSX.writeFile(workbook, fileName);
  };

  const [searchB2Btype, setsearchB2Btype] = useState("");
  const [searchReference, setsearchReference] = useState("");
  const [searchCity, setsearchCity] = useState("");
  const [searchExecutive, setsearchExecutive] = useState("")

  useEffect(() => {
    const filterResults = () => {
      let results = filteredData;

      if (searchB2Btype) {
        results = results.filter(
          (item) =>
            item.b2btype &&
            item.b2btype
              .toLowerCase()
              .includes(searchB2Btype.toLowerCase())
        );
      }
      if (searchReference) {
        results = results.filter(
          (item) =>
            item.approach &&
            item.approach
              .toLowerCase()
              .includes(searchReference.toLowerCase())
        );
      } //
      if (searchCity) {
        results = results.filter(
          (item) =>
            item.city &&
            item.city
              .toLowerCase()
              .includes(searchCity.toLowerCase())
        );
      }

      if (searchExecutive) {
        results = results.filter(
          (item) =>
            item.executiveName &&
            item.executiveName
              .toLowerCase()
              .includes(searchExecutive.toLowerCase())
        );
      }


      setSearchResults(results);
    };
    filterResults();
  }, [
    searchB2Btype,
    searchReference,
    searchCity, 
    searchExecutive,
   
  ]);


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
                    <b>Survey Report &gt; Filter</b>{" "}
                  </p>
                  <div className="row">
                    <div className="col-md-4">
                      Next Followup Date (From Date){" "}
                    </div>
                    <div className="col-md-1 ms-4">:</div>
                    <div className="col-md-5 ms-4">
                      <input
                        className="report-select"
                        onChange={(e) => setfromdate(e.target.value)}
                        type="date"
                        value={fromdate}
                      />
                    </div>
                  </div>
                  <br />
                  {/* <div className="row">
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
                  </div> */}
                  <br />
                  {/* <div className="row">
                    <div className="col-md-4">Type </div>
                    <div className="col-md-1 ms-4">:</div>
                    <div className="col-md-5 ms-4">
                      <select
                        className="report-select"
                        // style={{ width: "100%" }}
                        onChange={(e) => setB2BType(e.target.value)}
                      >
                        <option>Select</option>
                        {[...duplicateB2BType].map((typeOfB2B) => (
                          <option key={typeOfB2B}>{typeOfB2B}</option>
                        ))}
                      </select>
                    </div>
                  </div> */}
                  <br />
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
                        value={todate}
                      />
                    </div>
                  </div>
                  {/* <br />
                  <div className="row">
                    <div className="col-md-4 ">Status *</div>
                    <div className="col-md-1 ms-4">:</div>
                    <div className="col-md-5 ms-4">
                      <select
                        className="report-select"
                       
                      >
                        <option>All</option>
                       
                      </select>
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-md-4">
                      How many mails / Messages sent *
                    </div>
                    <div className="col-md-1 ms-4">:</div>
                    <div className="col-md-5 ms-4">
                      <select
                        className="report-select"
                        // onClick={(e) => setSentMails(e.target.value)}
                      >
                        <option>Select</option>
                     
                      </select>
                    </div>
                  </div>
                  <br /> */}

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
            <h5>Vijay Home Services | B2B Reports {`, ${searchValue}`}</h5>
          </Card>
        </div>{" "}
        <br />
        <table className="m-2">
          <thead>
            <tr className="bg ">
              <th className="bor"></th>
              <th className="bor">
              
              </th>
              <th className="bor">
              
              </th>
              <th className="bor">
                {" "}
               
              </th>
              <th className="bor">
                {" "}
              
              </th>
              <th className="bor">
                
              </th>
              <th className="bor">
               
              </th>
              <th className="bor">
                {" "}
              
              </th>
              <th className="bor">
              <select
                  value={searchB2Btype}
                  onChange={(e) => setsearchB2Btype(e.target.value)}
                  className="vhs-table-input"
                >
                  <option value="">Select</option>
                  {[...new Set(filteredData?.map((i) => i.b2btype))].map(
                    (uniqueCity) => (
                      <option value={uniqueCity} key={uniqueCity}>
                        {uniqueCity}
                      </option>
                    )
                  )}
                </select>{" "}
               
              </th>
              <th className="bor">
              <select
                  value={searchCity}
                  onChange={(e) => setsearchCity(e.target.value)}
                  className="vhs-table-input"
                >
                  <option value="">Select </option>
                  {admin?.city.map((item) => (
                    <option value={item.name}>{item.name}</option>
                  ))}
                </select>{" "}
              </th>
              <th className="bor">
              <select
                  value={searchReference}
                  onChange={(e) => setsearchReference(e.target.value)}
                  className="vhs-table-input"
                >
                  <option value="">Select</option>
                  {[...new Set(filteredData?.map((i) => i.approach))].map(
                    (uniqueCity) => (
                      <option value={uniqueCity} key={uniqueCity}>
                        {uniqueCity}
                      </option>
                    )
                  )}
                </select>{" "}
              </th>
              <th className="bor">
              <select
                  value={searchExecutive}
                  onChange={(e) => setsearchExecutive(e.target.value)}
                  className="vhs-table-input"
                >
                  <option value="">Select </option>
                  {[...new Set(filteredData?.map((i) => i.executiveName))].map(
                    (uniqueCity) => (
                      <option value={uniqueCity} key={uniqueCity}>
                        {uniqueCity}
                      </option>
                    )
                  )}
                </select>{" "}
            </th>
              
            

    

            </tr>
            <tr className="bg">
              <th className="bor">#</th>
              <th className="bor">Date & Time</th>
              <th className="bor" >
              Name
              </th>
              <th className="bor">Contact Person</th>
              <th className="bor">Contact 1</th>
              <th className="bor">Contact 2</th>
              <th className="bor">Email Id</th>
              <th className="bor">Address</th>
              <th className="bor">B2B type</th>
              <th className="bor">city</th>
              <th className="bor">Approach</th>

              <th className="bor" >
              Executive
              </th>
             

            </tr>
          </thead>
          <tbody>
            {searchResults.map((item, index) => (
              <tr
                className="trnew"
               
              >

                <td>{index + 1}</td>
             
                <td>
                  {item.date}
                  <br />
                  {item.time}
                </td>

                <td>{item.b2bname}</td>
                <td>{item.contactperson}</td>
                <td>{item.maincontact}</td>
                <td>{item.alternateno}</td>

                <td>{item.email}</td>
                <td>{item.address}</td>
                <td>{item.b2btype}</td>
                <td>{item.city}</td>
                <td>
                  {item.approach}
               
                </td>
                <td>{item.executiveName}</td>
               


              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Report_B2B;
