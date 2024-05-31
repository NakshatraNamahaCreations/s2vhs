import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Card } from "react-bootstrap";
import * as XLSX from "xlsx";
import { parse, isBefore, isAfter, isSameDay } from "date-fns";
import moment from "moment";

function Report_Quotation() {
  const admin = JSON.parse(sessionStorage.getItem("admin"));
  const apiURL = process.env.REACT_APP_API_URL;
  const [quotationData, setQuotationData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [service, setService] = useState("");
  const [city, setCity] = useState("");
  const [saleExecutive, setSalesExcuitive] = useState("");
  const [fromdate, setfromdate] = useState(moment().format("YYYY-MM-DD"));
  const [todate, setToDate] = useState(moment().format("YYYY-MM-DD"));
  const [category, setCategory] = useState("");
  const [backOfExcuitive, setBackOfExcuitive] = useState("");
  const [staus, setStatus] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [closeWindow, setCloseWindow] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchCatagory, setSearchCatagory] = useState("");
  const [searchDateTime, setSearchDateTime] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchContact, setSearchContact] = useState("");
  const [searchAddress, setSearchAddress] = useState("");
  const [searchReference, setSearchReference] = useState("");
  const [searchServices, setsearchServices] = useState("");
  const [searchenquirydate, setsearchenquirydate] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [searchTotal, setsearchTotal] = useState("");
  const [searchExecutive, setsearchExecutive] = useState("");
  const [searchStaff, setSearchStaff] = useState("");
  const [bookedBy, setbookedBy] = useState("");
  const [searchDesc, setSearchDesc] = useState("");
  const [searchNxtfoll, setSearchNxtfoll] = useState("");
  const [Type, setType] = useState("");



  const filterData = async () => {
    try {
      const res = await axios.post(`${apiURL}/QUOTEFilterdata`, {
        category,
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
    const fileName = "Quotation_Report.xlsx";
    const filteredData1 = searchResults?.map(item => ({
      Quotedatetime: `${item.date},${item.time}`,
      category: item?.enquirydata[0]?.category,
      customerName: item?.enquirydata[0]?.name,
      mobile: item.enquirydata[0]?.mobile,
      city: item?.enquirydata[0]?.city,

      address: item.enquirydata[0]?.address,
      reference1: item?.enquirydata[0]?.reference1,

      QuoteAmt: item?.netTotal,
      intrestedfor: item.enquirydata[0]?.intrestedfor,
      Comment: item?.Comment,
      desc: item?.quotefollowup[0]?.desc,
      Bookedby: item?.Bookedby,
      SalesExecutive: item?.enquirydata[0]?.executive,
      status: item?.quotefollowup[0]?.response === "Confirmed"
        ? "CONFIRMED"
        : item?.type === "QUOTE SHARED"
          ? "QUOTE SHARED"
          : "NOT SHARED"


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
            item.enquirydata[0]?.category &&
            item.enquirydata[0]?.category
              .toLowerCase()
              .includes(searchCatagory.toLowerCase())
        );
      }
      if (searchDateTime) {
        results = results.filter(
          (item) =>
            item.date &&
            item.date.toLowerCase().includes(searchDateTime.toLowerCase())
        );
      }
      if (Type) {
        results = results.filter((item) => {
          switch (Type) {
            case "NOT SHARED":
              return !(item.quotefollowup[0]?.response === "Confirmed" || item.type === "QUOTE SHARED");
            case "QUOTE SHARED":
              return item.type === "QUOTE SHARED";
            case "CONFIRMED":
              return item.quotefollowup[0]?.response === "Confirmed";
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
      if (searchContact) {
        results = results.filter(
          (item) =>
            item.enquirydata[0]?.mobile &&
            item.enquirydata[0]?.mobile
              .toLowerCase()
              .includes(searchContact.toLowerCase())
        );
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

      if (searchServices) {
        results = results.filter(
          (item) =>
            item.enquirydata[0]?.intrestedfor &&
            item.enquirydata[0]?.intrestedfor
              .toLowerCase()
              .includes(searchServices.toLowerCase())
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
      if (searchTotal) {
        results = results.filter(
          (item) =>
            item.netTotal &&
            item.netTotal.toLowerCase().includes(searchTotal.toLowerCase())
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
      if (searchStaff) {
        results = results.filter(
          (item) =>
            item.staffname &&
            item.staffname.toLowerCase().includes(searchStaff.toLowerCase())
        );
      }
      if (bookedBy) {
        results = results.filter(
          (item) =>
            item.Bookedby &&
            item.Bookedby.toLowerCase().includes(bookedBy.toLowerCase())
        );
      }
      if (searchDesc) {
        results = results.filter(
          (item) =>
            item.quotefollowup[0]?.desc &&
            item.quotefollowup[0]
              ?.desctoLowerCase()
              .includes(searchDesc.toLowerCase())
        );
      }
      if (searchNxtfoll) {
        results = results.filter(
          (item) =>
            item.nxtfoll &&
            item.nxtfoll.toLowerCase().includes(searchNxtfoll.toLowerCase())
        );
      }
      // results = results.map((item) => ({
      //   ...item,
      //   category: getUniqueCategories()[item.category],
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
    searchServices,
    searchExecutive,
    searchStaff,
    bookedBy,
    searchDesc,
    searchNxtfoll,
    Type
  ]);
  const calculateBackgroundColor = (item) => {
    const response = item?.quotefollowup[0]?.response;
    const qshared = item?.type;

    const dateDifference = Date.now() - new Date(item?.updatedAt).getTime();
    const isDateOld = dateDifference > 30 * 60 * 60 * 1000; // 30 hours in milliseconds
    const daysDifference = Math.floor(dateDifference / (24 * 60 * 60 * 1000));

    return response === "Confirmed" || response === ""
      ? "#ffb9798f" :
      qshared === "QUOTE SHARED" ? "rgba(0, 128, 0, 0.18)"
        : isDateOld
          ? daysDifference > 10
            ? "pink"
            : "#ff00004a"
          : "white";
  };

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
                    <b>Quotation Report &gt; Filter</b>{" "}
                  </p>
                  <div className="row">
                    <div className="col-md-4">From Date</div>
                    <div className="col-md-1 ms-4">:</div>
                    <div className="col-md-5 ms-4">
                      <input
                        className="report-select"
                        onChange={(e) => setfromdate(e.target.value)}
                        value={fromdate}
                        type="date"
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
                        onChange={(e) => setCity(e.target.value)}
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
                        onChange={handleServiceChange}
                      >
                        <option>Select</option>
                        {[...duplicateService].map((Service) => (
                          <option key={Service}>{Service}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-md-4"> Back office Executive</div>
                    <div className="col-md-1 ms-4">:</div>
                    <div className="col-md-5 ms-4">
                      <select
                        className="report-select"
                        onClick={handleExecutiveChange}
                      >
                        <option>Select</option>
                        {userdata
                          .sort((a, b) => a.displayname.localeCompare(b.displayname))
                          .map((i) => (
                            <option key={i.displayname}>{i.displayname}</option>
                          ))}

                      </select>
                    </div>
                  </div>
                  <br />
                  <br /> */}

                  <br />
                </div>
                <div className="col-md-5">
                  <br />
                  <div className="row"></div>
                  <div className="row mt-3">
                    <div className="col-md-4"> To Date</div>
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
                  <br />
                  {/* <div className="row">
                    <div className="col-md-4 ">Category </div>
                    <div className="col-md-1 ms-4">:</div>
                    <div className="col-md-5 ms-4">
                      <select
                        className="report-select"
                        onChange={(e) => setCategory(e.target.value)}
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
                    <div className="col-md-4"> Sales Executive</div>
                    <div className="col-md-1 ms-4">:</div>
                    <div className="col-md-5 ms-4">
                      <select
                        className="report-select"
                        onClick={handleSalesExecutiveChange}
                      >
                        <option>Select</option>
                        {[...duplicateSaleExecutive].map((Bookedby) => (
                          <option key={Bookedby}>{Bookedby}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-md-4"> Status</div>
                    <div className="col-md-1 ms-4">:</div>
                    <div className="col-md-5 ms-4">
                      <select
                        className="report-select"
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option>Select</option>

                        <option value="Call Later">call later</option>
                        <option value="Confirmed">confirmed</option>
                        <option value="Cancelled">cancelled</option>
                      </select>
                    </div>
                  </div> */}
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
            <h5>
              Vijay Home Services | Quotation Reports {`, ${searchValue}`}
            </h5>
          </Card>
        </div>{" "}
        <br />
        <div className="row m-auto">
          <div className="col-md-12">
            {/* Pagination */}


            <table className="my-table">
              <thead>
                <tr className="bg ">
                  <th scope="col" className="bor">

                  </th>
                  <th scope="col" className="bor">
                    {" "}
                    <select
                      className="vhs-table-input"
                      value={searchCatagory}
                      onChange={(e) => setSearchCatagory(e.target.value)}
                    >
                      <option value="">Select</option>
                      {admin?.category.map((category, index) => (
                        <option key={index} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>{" "}
                  </th>
                  <th scope="col" className="bor"></th>
                  <th scope="col" className="bor">
                    {/* {" "}
                  <input
                    className="vhs-table-input"
                    value={searchDateTime}
                    onChange={(e) => setSearchDateTime(e.target.value)}
                  />{" "} */}
                  </th>
                  <th scope="col" className="bor">
                    {" "}
                    <input
                      className="vhs-table-input"
                      value={searchName}
                      onChange={(e) => setSearchName(e.target.value)}
                    />{" "}
                  </th>
                  <th scope="col" className="bor">
                    {" "}
                    <input
                      className="vhs-table-input"
                      value={searchContact}
                      onChange={(e) => setSearchContact(e.target.value)}
                    />{" "}
                  </th>
                  <th scope="col" className="bor">
                    {" "}
                    {/* <input
                    className="vhs-table-input"
                    value={searchAddress}
                    onChange={(e) => setSearchAddress(e.target.value)}
                  />{" "} */}
                  </th>
                  <th scope="col" className="bor">
                    {" "}
                    <select
                      className="vhs-table-input"
                      value={searchCity}
                      onChange={(e) => setSearchCity(e.target.value)}
                    >
                      <option value="">Select </option>

                      {admin?.city.map((item) => (
                        <option value={item.name}>{item.name}</option>
                      ))}
                    </select>{" "}
                  </th>

                  <th scope="col" className="bor">
                    <input
                      className="vhs-table-input"
                      value={searchServices}
                      onChange={(e) => setsearchServices(e.target.value)}
                    />{" "}
                  </th>

                  <th scope="col" className="bor">
                    {" "}
                    {/* <input
                    className="vhs-table-input"
                    value={searchTotal}
                    onChange={(e) => setsearchTotal(e.target.value)}
                  /> */}
                  </th>

                  <th scope="col" className="bor">
                    {" "}
                    <input
                      className="vhs-table-input"
                      value={searchExecutive}
                      onChange={(e) => setsearchExecutive(e.target.value)}
                    />{" "}
                  </th>
                  <th scope="col" className="bor">
                    <input
                      className="vhs-table-input"
                      value={bookedBy}
                      onChange={(e) => setbookedBy(e.target.value)}
                    />{" "}
                  </th>

                  <th scope="col" className="bor">
                    {/* <input
                    className="vhs-table-input"
                    value={searchenquirydate}
                    onChange={(e) => setsearchenquirydate(e.target.value)}
                  />{" "} */}
                  </th>

                  <th scope="col" className="bor">
                    {/* <input
                    className="vhs-table-input"
                    value={searchNxtfoll}
                    onChange={(e) => setSearchNxtfoll(e.target.value)}
                  />{" "} */}
                  </th>
                  <th scope="col" className="bor">
                    {/* <input
                    className="vhs-table-input"
                    value={searchDesc}
                    onChange={(e) => setSearchDesc(e.target.value)}
                  />{" "} */}
                  </th>
                  <th scope="col" className="bor">
                    <select className="vhs-table-input" onChange={(e) => setType(e.target.value)}>
                      <option>Select </option>

                      <option value="NOT SHARED">NOT SHARED </option>
                      <option value="QUOTE SHARED">QUOTE SHARED </option>
                      <option value="CONFIRMED">CONFIRMED </option>
                    </select>{" "}
                  </th>
                </tr>
                <tr className="bg">
                  <th className="bor">#</th>
                  <th className="bor">Category</th>
                  <th className="bor">QId</th>
                  <th className="bor">Q Dt-Tm</th>
                  <th className="bor">Name</th>
                  <th className="bor">Contact</th>
                  <th className="bor">Address</th>
                  <th className="bor">City</th>
                  <th className="bor">Service</th>
                  <th className="bor">QAmt</th>
                  <th className="bor">Sales Executive</th>
                  <th className="bor">Booked by</th>
                  <th className="bor">Last F/W Dt</th>
                  <th className="bor">Next F/W Dt</th>
                  <th className="bor">Desc</th>
                  <th className="bor">Type</th>
                </tr>
              </thead>

              <tbody>
                {searchResults.map((item, index) => (

                  <tr
                    className="trnew"
                    style={{ backgroundColor: calculateBackgroundColor(item) }}
                  >
                    <td>{index + 1}</td>
                    <td>{item?.enquirydata[0]?.category}</td>
                    <td>{item?.quoteId}</td>
                    <td>
                      {item?.date}
                      <br />
                      {item?.time}
                    </td>
                    <td>{item?.enquirydata[0]?.name}</td>
                    <td>{item?.enquirydata[0]?.mobile}</td>
                    <td>{item?.enquirydata[0]?.address}</td>
                    <td>{item?.enquirydata[0]?.city}</td>
                    <td>{item?.enquirydata[0]?.intrestedfor} </td>
                    <td>{item?.netTotal}</td>
                    <td>{item?.enquirydata[0]?.executive}</td>
                    <td>{item?.Bookedby}</td>
                    <td>{item?.enquirydata[0]?.date}</td>
                    <td>{item?.quotefollowup[0]?.nxtfoll}</td>
                    <td>{item?.quotefollowup[0]?.desc}</td>
                    <td>
                      {item?.quotefollowup[0]?.response === "Confirmed"
                        ? "CONFIRMED"
                        : item?.type === "QUOTE SHARED"
                          ? "QUOTE SHARED"
                          : "NOT SHARED"
                      }


                    </td>
                  </tr>

                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report_Quotation;
