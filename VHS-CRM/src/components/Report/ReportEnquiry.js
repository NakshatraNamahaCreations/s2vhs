import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Card } from "react-bootstrap";
import * as XLSX from "xlsx";
import { parse, isBefore, isAfter, isSameDay } from "date-fns";

import moment from "moment";
function Report_Enquiry() {
  const admin = JSON.parse(sessionStorage.getItem("admin"));
  const apiURL = process.env.REACT_APP_API_URL;

  const [filteredData, setFilteredData] = useState([]);
 
  const [reference2, setReference2] = useState("");
  const [reference1, setReference1] = useState("");
  const [response, setResponse] = useState("");
  const [city, setCity] = useState("");
  const [executive, setExcuitive] = useState("");
  const [fromdate, setfromdate] = useState("");
  const [todate, setToDate] = useState(moment().format("YYYY-MM-DD"));
  const [category, setCategory] = useState("");
  const [service, setService] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [closeWindow, setCloseWindow] = useState(true);
  const [searchValue, setSearchValue] = useState("");
 

  const [serviceData, setServiceData] = useState([]);
  const [serviceId, setSeviceId] = useState("");
  const [serviceName, setSeviceName] = useState("");
  const [reference, setreferecedata] = useState([]);
  const [userdata, setuserdata] = useState([]);
  const [responsedata, setreponsedata] = useState([])

  useEffect(() => {
    getreferencetype();
    getresponse();
  }, []);

  const getreferencetype = async () => {
    let res = await axios.get(apiURL + "/master/getreferencetype");
    if ((res.status = 200)) {
      setreferecedata(res.data?.masterreference);
    }
  };
  const getresponse = async () => {
    let res = await axios.get(apiURL + "/getresponse");
    if ((res.status = 200)) {
   
      setreponsedata(res.data?.response);
      
    }
  };


// const fff = reference.filter((item) =>item.)

  // get user=============
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
  }, []);
  

  const getServiceByCategory = async () => {
    try {
      let res = await axios.post(apiURL + `/userapp/getservicebycategory/`, {
        category,
      });
      if (res.status === 200) {
        setServiceData(res.data?.serviceData);
      } else {
        setServiceData([]);
      }
    } catch (error) {
      console.log("err", error);
    }
  };

  useEffect(() => {
    getServiceByCategory();
  }, [category]);

  const filterData = async () => {
    try {
      const res = await axios.post(`${apiURL}/searchenquiry1`, {
        category,
        fromdate,
        todate,
        serviceName,
        city,
        reference1,
        reference2,
        executive,
        response,

      });

      if (res.status === 200) {
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
    // Call the search function here

    filterData();
    setButtonClicked(true);
  };

  const exportData = () => {
    const fileName = "Enquiry_Reports.xlsx";

    const filteredData1 = filteredData?.map(item => ({
      Enquirdatetime: `${item.date},${item.Time}`,
      category: item?.category,
      customerName: item?.name,
      mobile: item.mobile,
      city: item?.city,
   
      address: item.address,
      reference1: item?.reference1,
      reference2: item?.reference2,
      reference3: item?.reference3,

      intrestedfor:item.intrestedfor,
      Comment: item?.Comment,
      desc: item?.desc,

      BackofficeExecutive: item?.BackofficeExecutive,
      status: item.enquiryFollow[0]?.response
    }));
    const worksheet = XLSX.utils.json_to_sheet(filteredData1);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Category Data");
    XLSX.writeFile(workbook, fileName);
  };

  const columns = [
    {
      name: "Sl  No",
      selector: (row, index) => index + 1,
    },
    {
      name: "Date",
      selector: (row) => (row.date ? row.date : "-"),
    },
    {
      name: "Time",
      selector: (row, index) => (row.Time ? row.Time : "-"),
    },
    {
      name: "Category",
      selector: (row, index) => (row.category ? row.category : "-"),
    },
    {
      name: "Name",
      selector: (row) => (row.name ? row.name : "-"),
    },
    {
      name: "Contact",
      selector: (row) => (row.mobile ? row.mobile : "-"),
    },
    {
      name: "Address",
      selector: (row) => (row.address ? row.address : "-"),
    },
    {
      name: "Reference1",
      selector: (row) => (row.reference1 ? row.reference1 : "-"),
    },
    {
      name: "Reference2",
      selector: (row) => (row.reference2 ? row.reference2 : "-"),
    },

    {
      name: "City",
      selector: (row) => (row.city ? row.city : "-"),
    },
    {
      name: "Interested For",
      selector: (row) => (row.intrestedfor ? row.intrestedfor : "-"),
    },
    {
      name: "Comment",
      selector: (row) => (row.comment ? row.comment : "-"),
    },
    {
      name: "Followup Remark",
      selector: (row) => (row.desc ? row.desc : "-"),
    },
    {
      name: "Executive",
      selector: (row) => (row.executive ? row.executive : "-"),
    },
    {
      name: "Status",
      selector: (row) => (row.enquiryFollow[0]?.response ? row.enquiryFollow[0]?.response : "-"),
    },
    // {
    //   name: "Value",
    //   selector: (row) => (row.value ? row.value : "-"),
    // },
  ];

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    console.log(selectedCity); // Check the selected city value
    setCity(selectedCity);
  };
  const handleExecutiveChange = (e) => {
    const selectedExecutive = e.target.value;
    console.log(selectedExecutive); // Check the selected executive value
    setExcuitive(selectedExecutive);
  };

  const handleReferenceChange = (e) => {
    const selectedReference = e.target.value;
    console.log(selectedReference); // Check the selected reference value
    setReference1(selectedReference);
  };
  const handleServiceChange = (e) => {
    const selectedService = e.target.value;
    console.log(selectedService); // Check the selected service value
    setService(selectedService);
  };


const handleClear =()=>{
  setfromdate("");
  setToDate("")
  setCity("");
  setExcuitive("");
  setReference1("");
  setService("");
  setSeviceId("");
  setSeviceName("");
  setResponse("")
}

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
                    <b>Enquiry Report &gt; Filter</b>{" "}
                  </p>
                  <div className="row">
                    <div className="col-md-4">From </div>
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
                  <div className="row">
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
                    <div className="col-md-4">Reference </div>
                    <div className="col-md-1 ms-4">:</div>
                    <div className="col-md-5 ms-4">
                      <select
                        className="report-select"
                        onChange={handleReferenceChange} // Use the handleReferenceChange function
                      >
                        <option>Select</option>
                        <option value="userapp">userapp</option>
                        <option value="website">website</option>
                        <option value="justdail">justdail</option>
                        {reference.map((i) => (
                          <option key={i.referencetype} value={i.referencetype}>
                            {i.referencetype}
                          </option>
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
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => {
                          const selectedService = serviceData.find(
                            (item) => item._id === e.target.value
                          );
                          setSeviceId(e.target.value);
                          setSeviceName(
                            selectedService ? selectedService.serviceName : ""
                          );
                        }}
                      >
                        <option>---SELECT---</option>
                        {serviceData.map((item) => (
                          <option key={item.id} value={item._id}>
                            {item.Subcategory} - {item.serviceName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <br />
                </div>
                <div className="col-md-5">
                  <br />
                  <div className="row"></div>
                  <div className="row mt-3">
                    <div className="col-md-4">To </div>
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
                  <div className="row">
                    <div className="col-md-4 ">Status </div>
                    <div className="col-md-1 ms-4">:</div>
                    <div className="col-md-5 ms-4">
                      <select
                        className="report-select"
                        onChange={(e) => setResponse(e.target.value)}
                      >
                        <option>All</option>
                        {responsedata.map((i) => (
                          <option value={i.response}>{i.response}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-md-4">Executive </div>
                    <div className="col-md-1 ms-4">:</div>
                    <div className="col-md-5 ms-4">
                      <select
                        className="report-select"
                        onChange={handleExecutiveChange} // Use the handleExecutiveChange function
                      >
                        <option>Select</option>
                        {userdata.map((i) => (
                          <option key={i.displayname}>{i.displayname}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <br />

                  <div className="row">
                    <div className="col-md-4">Category </div>
                    <div className="col-md-1 ms-4">:</div>
                    <div className="col-md-5 ms-4">
                      <select
                        className="report-select"
                        // style={{ width: "100%" }}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option>Select</option>
                        {admin?.category.map((category, index) => (
                          <option key={index} value={category.name}>
                            {category.name}
                          </option>
                        ))}
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
                  {/* <button
                    className="ps-3 pt-2 pb-2 pe-3 mx-3"
                    style={{
                      border: 0,
                      color: "white",
                      backgroundColor: "#a9042e",
                      borderRadius: "5px",
                    }}
                    onClick={handleClear}
                  >
                    Clear
                  </button> */}
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
            <h5>Vijay Home Services | Enquiry Reports {`, ${searchValue}`}</h5>
          </Card>
        </div>{" "}
        <br />
        <DataTable
          columns={columns}
          data={filteredData}
          // pagination
          fixedHeader
          selectableRowsHighlight
          subHeaderAlign="left"
          highlightOnHover
        />
      </div>
    </div>
  );
}

export default Report_Enquiry;
