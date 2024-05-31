import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Card } from "react-bootstrap";
import * as XLSX from "xlsx";
import moment from "moment";
import { parse, isBefore, isAfter, isSameDay } from "date-fns";

function Report_Survey() {
  const admin = JSON.parse(sessionStorage.getItem("admin"));

  const apiURL = process.env.REACT_APP_API_URL;
  const [surveyData, setSurveyData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [serviceName, setserviceName] = useState("");
  const [city, setCity] = useState("");
  const [techname, setTechnicianName] = useState("");
  const [fromdate, setfromdate] = useState(moment().format("YYYY-MM-DD"));
  const [todate, setToDate] = useState(moment().format("YYYY-MM-DD"));
  const [category, setCategory] = useState("");
  const [service, setService] = useState("");
  const [executive, setBackOffice] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [closeWindow, setCloseWindow] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  const [searchType, setSearchType] = useState("");
  const [serviceData, setServiceData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);


  const [techniciandata, settechniciandata] = useState([]);
  const [searchCatagory, setSearchCatagory] = useState("");
  const [searchDateTime, setSearchDateTime] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchContact, setSearchContact] = useState("");
  const [searchAddress, setSearchAddress] = useState("");
  const [searchReference, setSearchReference] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [searchInterest, setSearchInterest] = useState("");
  const [searchExecutive, setSearchExecutive] = useState("");
  const [searchAppoDateTime, setSearchAppoDateTime] = useState("");
  const [searchNote, setSearchNote] = useState("");
  const [searchTechnician, setSearchTechnician] = useState("");



  const [userdata, setuserdata] = useState([]);
  const getuser = async () => {
    try {
      let res = await axios.get(apiURL + "/master/getuser");
      if (res.status === 200) {
        setuserdata(res.data?.masteruser);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle the error, e.g., set an error state
    }
  };

  useEffect(() => {
    getuser();
    gettechnician();
  }, []);


  const gettechnician = async () => {
    let res = await axios.get(apiURL + "/getalltechnician");
    if ((res.status = 200)) {
      settechniciandata(res.data?.technician.filter((i) => i.Type == "executive"));

    }
  };

  const filterData = async () => {
    try {
      const res = await axios.post(`${apiURL}/surveyFilterdata`, {

        fromdate,
        todate,


      });

      if (res.status === 200) {

        setSearchResults(res.data?.enquiryadd)
        setFilteredData(res.data?.enquiryadd);

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
    setButtonClicked(true);
  };

  const exportData = () => {
    const fileName = "Survey_Repost.xlsx";

    const filteredData1 = searchResults?.map(item => ({
      datetime: `${item.date},${item.time}`,
      category: item?.enquirydata[0]?.category,
      customerName: item?.enquirydata[0]?.name,
      mobile: item.enquirydata[0]?.mobile,
      city: item?.enquirydata[0]?.city,

      address: item.enquirydata[0]?.address,
      reference1: item?.enquirydata[0]?.reference1,

      appoDate: item.appoDate ? item.appoDate : item.nxtfoll,
      intrestedfor: item.enquirydata[0]?.intrestedfor,

      desc: item?.desc,
      Backofficer: item?.enquirydata[0]?.executive,
      Executive: item?.technicianname,
      status: item.treatmentData.length > 0
        ? "QUOTE GENERATED"
        : item.technicianname
          ? "ASSIGNED FOR SURVEY"
          : item.quoteData[0]?.type === "QUOTE SHARED" ?
            "QUOTE SHARED"
            : "NOT ASSIGNED"


    }));
    const worksheet = XLSX.utils.json_to_sheet(filteredData1);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Category Data");
    XLSX.writeFile(workbook, fileName);
  };





  useEffect(() => {
    const filterResults = () => {
      let results = filteredData;
      if (searchCatagory) {
        results = results.filter(
          (item) =>
            item.category &&
            item.category.toLowerCase().includes(searchCatagory.toLowerCase())
        );
      }
      if (searchDateTime) {
        results = results.filter(
          (item) =>
          (item.enquirydata[0]?.date &&
            item.enquirydata[0]?.date
              .toLowerCase()
              .includes(searchDateTime.toLowerCase()))
        );
      }
      if (searchType) {
        results = results.filter((item) => {
          switch (searchType) {
            case "NOT ASSIGNED":
              return (
                item.treatmentData.length === 0 &&
                !item.technicianname &&
                item.quoteData[0]?.type !== "QUOTE SHARED"
              );
            case "QUOTE SHARED":
              return item.type === "QUOTE SHARED";
            case "ASSIGNED FOR SURVEY":
              return item.technicianname !== undefined;
            case "QUOTE GENERATED":
              return item.treatmentData.length > 0;
            default:
              return true;
          }
        });
      }

      if (searchName) {
        results = results.filter(
          (item) =>
            item.enquirydata[0]?.name &&
            item.enquirydata[0]?.name
              .toLowerCase()
              .includes(searchName.toLowerCase())
        );
      }
      if (executive) {
        results = results.filter(
          (item) =>
            item.enquirydata[0]?.executive &&
            item.enquirydata[0]?.executive
              .toLowerCase()
              .includes(executive.toLowerCase())
        );
      }

      if (searchContact) {
        results = results.filter((item) => {
          const mainContact = item.enquirydata[0]?.mobile;
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
      if (searchAddress) {
        results = results.filter(
          (item) =>
            item.enquirydata[0]?.address &&
            item.enquirydata[0]?.address
              .toLowerCase()
              .includes(searchAddress.toLowerCase())
        );
      }
      if (searchReference) {
        results = results.filter(
          (item) =>
            item.enquirydata[0]?.reference1 &&
            item.enquirydata[0]?.reference1
              .toLowerCase()
              .includes(searchReference.toLowerCase())
        );
      } //
      if (searchCity) {
        results = results.filter(
          (item) =>
            item.enquirydata[0]?.city &&
            item.enquirydata[0]?.city
              .toLowerCase()
              .includes(searchCity.toLowerCase())
        );
      }
      if (searchInterest) {
        results = results.filter(
          (item) =>
            item.enquirydata[0]?.intrestedfor &&
            item.enquirydata[0]?.intrestedfor
              .toLowerCase()
              .includes(searchInterest.toLowerCase())
        );
      }
      if (searchExecutive) {
        results = results.filter(
          (item) =>
            item.enquirydata[0]?.executive &&
            item.enquirydata[0]?.executive
              .toLowerCase()
              .includes(searchExecutive.toLowerCase())
        );
      }
      if (searchAppoDateTime) {
        results = results.filter(
          (item) =>
            item.appoDate &&
            item.appoDate
              .toLowerCase()
              .includes(searchAppoDateTime.toLowerCase())
        );
      }
      if (searchNote) {
        results = results.filter(
          (item) =>
            item.comment &&
            item.comment.toLowerCase().includes(searchNote.toLowerCase())
        );
      }
      if (searchTechnician) {
        results = results.filter(
          (item) =>
            item.technicianname &&
            item.technicianname
              .toLowerCase()
              .includes(searchTechnician.toLowerCase())
        );
      }
      // results = results.map((item) => ({
      // ...item,
      // category: getUniqueCategories()[item.category],
      // }));
      setSearchResults(results);
    };
    filterResults();
  }, [
    searchCatagory,
    searchName,
    searchDateTime,
    searchContact,
    searchAddress,
    searchReference,
    searchCity,
    searchInterest,
    searchExecutive,
    searchAppoDateTime,
    searchNote,
    searchTechnician,
    executive,
    searchType
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
                        onChange={handleCityChange}
                      >
                        <option>Select</option>
                        {admin?.city.map((item) => (
                          <option value={item.name}>{item.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-md-4">Service </div>
                    <div className="col-md-1 ms-4">:</div>
                    <div className="col-md-5 ms-4">
                      <select
                        className="report-select"
                        // style={{ width: "100%" }}
                        onChange={(e) => setserviceName(e.target.value)}
                      >
                        <option>Select</option>
                        {serviceData
                          .sort((a, b) => a.serviceName.localeCompare(b.serviceName))
                          .map((i) => (
                            <option key={i.serviceName}>{i.serviceName}</option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-md-4">Back office Executive </div>
                    <div className="col-md-1 ms-4">:</div>
                    <div className="col-md-5 ms-4">
                      <select
                        className="report-select"
                        // style={{ width: "100%" }}
                        onChange={(e) => setBackOffice(e.target.value)}
                      >
                        <option>Select</option>
                        {userdata
                          .sort((a, b) => a.displayname.localeCompare(b.displayname))
                          .map((i) => (
                            <option key={i.displayname}>{i.displayname}</option>
                          ))}

                      </select>
                    </div>
                  </div> */}

                  <br />
                </div>
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
                    <div className="col-md-4 ">Category </div>
                    <div className="col-md-1 ms-4">:</div>
                    <div className="col-md-5 ms-4">
                      <select
                        className="report-select"
                        onChange={handleCategoryChange}
                      >
                        <option>All</option>
                        {admin?.category.map((category, index) => (
                          <option key={index} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-md-4">Technician Name </div>
                    <div className="col-md-1 ms-4">:</div>
                    <div className="col-md-5 ms-4">
                      <select
                        className="report-select"
                        value={techname} // Set the selected value from state
                        onChange={handleTechnicianChange} // Call the new handler
                      >
                        <option>Select</option>
                        {techniciandata
                          .sort((a, b) => a.smsname.localeCompare(b.smsname))
                          .map((i) => (
                            <option key={i.smsname} value={i.vhsname}>{i.smsname}</option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-md-4">Status</div>
                    <div className="col-md-1 ms-4">:</div>
                    <div className="col-md-5 ms-4">
                      <select
                        className="report-select"
                        onClick={(e) => setService(e.target.value)}
                      >
                        <option>Select</option>
                        <option>Attended</option>
                        <option>Quotation prepared</option>
                        <option>quotation sent</option>
                      
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
                    // onClick={() => {
                    //   filterData();
                    //   setButtonClicked(true);
                    // }}
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
            <h5>Vijay Home Services | Survey Reports {`, ${searchValue}`}</h5>
          </Card>
        </div>{" "}
        <br />
        <table className="m-2">
          <thead>
            <tr className="bg ">
              <th className="bor"></th>
              <th className="bor">
                {" "}
                <select
                  value={searchCatagory}
                  onChange={(e) => setSearchCatagory(e.target.value)}
                  className="vhs-table-input"
                >
                  <option value="">Select</option>
                  {admin?.category.map((category, index) => (
                    <option key={index} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>{" "}
              </th>
              <th className="bor">
                {" "}
                {/* <input
                    className="vhs-table-input"
                    value={searchDateTime}
                    onChange={(e) => setSearchDateTime(e.target.value)}
                  />{" "} */}
              </th>
              <th className="bor">
                {" "}
                <input
                  className="vhs-table-input"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />{" "}
              </th>
              <th className="bor">
                {" "}
                <input
                  className="vhs-table-input"
                  value={searchContact}
                  onChange={(e) => setSearchContact(e.target.value)}
                />{" "}
              </th>
              <th className="bor">
                {" "}
                {/* <input
                    className="vhs-table-input"
                    value={searchAddress}
                    onChange={(e) => setSearchAddress(e.target.value)}
                  />{" "} */}
              </th>
              <th className="bor">
                <select
                  value={searchReference}
                  onChange={(e) => setSearchReference(e.target.value)}
                  className="vhs-table-input"
                >
                  <option value="">Select</option>
                  {[...new Set(filteredData?.map((i) => i.enquirydata[0]?.reference1))].map(
                    (uniqueCity) => (
                      <option value={uniqueCity} key={uniqueCity}>
                        {uniqueCity}
                      </option>
                    )
                  )}
                </select>{" "}
              </th>
              <th className="bor">
                {" "}
                <select
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
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
                  value={searchCity}
                  onChange={(e) => setBackOffice(e.target.value)}
                  className="vhs-table-input"
                >
                  <option value="">Select </option>
                  {[...new Set(filteredData?.map((i) => i.enquirydata[0]?.executive))].map(
                    (uniqueCity) => (
                      <option value={uniqueCity} key={uniqueCity}>
                        {uniqueCity}
                      </option>
                    )
                  )}
                </select>{" "}
              </th>
              <th className="bor">
                {" "}
                <input
                  className="vhs-table-input"
                  value={searchInterest}
                  onChange={(e) => setSearchInterest(e.target.value)}
                />
              </th>
              <th className="bor">
                <select
                  value={searchReference}
                  onChange={(e) => setSearchTechnician(e.target.value)}
                  className="vhs-table-input"
                >
                  <option value="">Select</option>
                  {[...new Set(filteredData?.map((i) => i.technicianname))].map(
                    (uniqueCity) => (
                      <option value={uniqueCity} key={uniqueCity}>
                        {uniqueCity}
                      </option>
                    )
                  )}
                </select>{" "}
              </th>
              <th className="bor">
                {" "}
                {/* <input
                    className="vhs-table-input"
                    value={searchAppoDateTime}
                    onChange={(e) => setSearchAppoDateTime(e.target.value)}
                  />{" "} */}
              </th>
              <th className="bor"></th>
              <th className="bor"></th>
              <th className="bor">
                {" "}
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="vhs-table-input"
                >
                  <option>Select</option>
                  <option value="NOT ASSIGNED">NOT ASSIGNED</option>
                  <option value="QUOTE SHARED">QUOTE SHARED</option>
                  <option value="ASSIGNED FOR SURVEY">ASSIGNED FOR SURVEY</option>
                  <option value="QUOTE GENERATED">QUOTE GENERATED</option>


                </select>{" "}
              </th>

              {/* <th className="bor"></th> */}

            </tr>
            <tr className="bg">
              <th className="bor">#</th>
              <th className="bor">Category</th>
              <th className="bor" style={{ width: "200px" }}>
                Enq Date Time
              </th>
              <th className="bor">Name</th>
              <th className="bor">Contact</th>
              <th className="bor">Address</th>
              <th className="bor">Reference</th>
              <th className="bor">City</th>
              <th className="bor">Backofficer</th>
              <th className="bor">Interested For</th>
              <th className="bor">Executive</th>

              <th className="bor" style={{ width: "200px" }}>
                {/* Appo. Date  */}
                Time
              </th>
              {/* <th className="bor">Note</th> */}
              <th className="bor">Description</th>
              <th className="bor">Comment</th>
              <th className="bor">Type</th>
              {/* <th className="bor">Reason for cancel</th> */}

            </tr>
          </thead>
          <tbody>
            {searchResults.map((item, index) => (
              <tr
                className="trnew"
                style={{
                  backgroundColor:
                    item.treatmentData.length > 0
                      ? "#dde9fd"
                      : item.technicianname
                        ? "#ffb9798f"
                        : "white",
                }}
              >

                <td>{index + 1}</td>
                <td>{item.category}</td>
                <td>
                  {item.enquirydata[0]?.date}
                  <br />
                  {item.enquirydata[0]?.Time}
                </td>

                <td>{item.enquirydata[0]?.name}</td>
                <td>{item.enquirydata[0]?.mobile}</td>
                <td>{item.enquirydata[0]?.address}</td>
                <td>{item.enquirydata[0]?.reference1}</td>

                <td>{item.enquirydata[0]?.city}</td>
                <td>{item.enquirydata[0]?.executive}</td>
                <td>{item.enquirydata[0]?.intrestedfor}</td>
                <td>{item.technicianname}</td>
                <td>
                  {item.appoDate ? item.appoDate : item.nxtfoll}
                  <br />
                  {item.appoTime}
                </td>
                <td>{item.desc}</td>
                {/* <td>{item.enquirydata[0]?.comment}</td> */}
                {/* <td>{item.technicianname}</td> */}
                <td>{item.enquirydata[0]?.intrestedfor}</td>

                <td>
                  {item.treatmentData.length > 0
                    ? "QUOTE GENERATED"
                    : item.technicianname
                      ? "ASSIGNED FOR SURVEY"
                      : item.quoteData[0]?.type === "QUOTE SHARED" ?
                        "QUOTE SHARED"
                        : "NOT ASSIGNED"}
                </td>
                {/* <td>
                      {item.reasonForCancel} <br />
                      {item.adminname} <br />
                      {item.admindate}
                    </td> */}



              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Report_Survey;
