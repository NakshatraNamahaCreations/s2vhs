


import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import axios from "axios";
import moment from "moment";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";

function RunningProject() {
  const apiURL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const admin = JSON.parse(sessionStorage.getItem("admin"));

  const [selected, setSelected] = useState(0);
  const [categorydata, setcategorydata] = useState([]);
  const [category, setcategory] = useState("");
  const [dsrdata, setdsrdata] = useState([]);
  const [treatmentData, settreatmentData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [data, setData] = useState([]);
  const [runningDate, setRunningDate] = useState("");
  const [catagoryData, setCatagoryData] = useState("");
  const [projectManager, setProjectManager] = useState("");
  const [salesExecutive, setSalesExecutive] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [address, setAddress] = useState("");
  const [city, setcity] = useState("");
  const [quoteNo, setQuoteNo] = useState("");
  const [projectType, setProjectType] = useState("");
  const [dateToComplete, setDateToComplete] = useState("");
  const [worker, setWorker] = useState("");
  const [vendorPayment, setVendorPayment] = useState(""); //need
  const [charges, setCharges] = useState("");
  const [quoteValue, setQuoteValue] = useState("");
  const [payment, setPayment] = useState(""); //need
  const [Type, setType] = useState(""); //need
  const [fromdate, setFromData] = useState(moment().format("YYYY-MM-DD"));
  const [todate, setToData] = useState(moment().format("YYYY-MM-DD"));
  const [SearchBackoffice, setSearchBackoffice] = useState("")

  //unique select option. removing duplicates--------
  const [catagories, setCatagories] = useState(new Set());
  const [techName, setTechName] = useState(new Set());
  const [addressType, setAddressType] = useState(new Set());

  useEffect(() => {
    const uniqueCatagories = new Set(
      treatmentData
        .map((item) => item.customerData[0]?.category)
        .filter(Boolean)
    );
    const uniqueTechName = new Set(
      treatmentData.map((item) => item.dsrdata[0]?.techName).filter(Boolean)
    );
    const uniqueAddress = new Set(
      treatmentData
        .map(
          (item) =>
            item.customerData[0]?.lnf &&
            item.customerData[0]?.rbhf &&
            item.customerData[0]?.cnap
        )
        .filter(Boolean)
    );
    setCatagories(uniqueCatagories);
    setTechName(uniqueTechName);
    setAddressType(uniqueAddress);
  }, [treatmentData]);

  const handleClick = (divNum) => () => {
    setSelected(divNum);
  };

  useEffect(() => {
    getcategory();
  }, []);

  const getcategory = async () => {
    let res = await axios.get(apiURL + "/getcategory");
    if (res.status === 200) {
      setcategorydata(res.data?.category);
    }
  };




  const getservicedata = async () => {
    try {
      let res = await axios.get(apiURL + "/runningpagefilter", {
        params: {
          fromdate,
          todate,
          city: admin.city,
        },
      });

      if (res.status === 200) {
        const allData = res.data?.dsrdata.filter((i) => !i.closeProject);
        console.log("allData---", allData)


        setSearchResults(allData);
        settreatmentData(allData);
      }
    } catch (error) {
      console.log("Error in Search", error);
    }
  };
  const handleSearchClick = () => {
    getservicedata();
    // getAlldata();

  };




  useEffect(() => {
    const filterResults = () => {
      let results = treatmentData;
      if (SearchBackoffice) {
        results = results.filter(
          (item) =>
            item.BackofficeExecutive &&
            item.BackofficeExecutive
              .toLowerCase()
              .includes(SearchBackoffice.toLowerCase())
        );
      }

      if (Type) {
        if (Type === "bookdeep") {
          results = results.filter(
            (item) => item.dsrdata[0]?.deepcleaningstart === "start"
          );
        } else if (Type === "closed") {
          results = results.filter(
            (item) => item.closeProject === "closed"
          );}
          else if (Type === "start") {
            results = results.filter(
              (item) => item.dsrdata[0]?.startproject === "start"
            );
        } else if (Type === "Running") {
          results = results.filter(
            (item) =>
              item.dsrdata[0]?.deepcleaningstart !== "start" && item.dsrdata[0]?.startproject !== "start" &&
              item.closeProject !== "closed"
          );
        } else {
          // Handle any other cases here, or skip this block if you want to do nothing for other values
        }
      }
      
      if (runningDate) {
        results = results.filter(
          (item) =>
            item.date &&
            item.date.toLowerCase().includes(runningDate.toLowerCase())
        );
      }
      if (catagoryData && catagoryData !== "Show All") {
        results = results.filter(
          (item) =>
            item.customerData[0]?.category &&
            item.customerData[0]?.category
              .toLowerCase()
              .includes(catagoryData.toLowerCase())
        );
      }
      if (projectManager && projectManager !== "Show All") {
        results = results.filter(
          (item) =>
            item.dsrdata[0]?.TechorPMorVendorName &&
            item.dsrdata[0]?.TechorPMorVendorName
              .toLowerCase()
              .includes(projectManager.toLowerCase())
        );
      }
      if (salesExecutive) {
        results = results.filter(
          (item) =>
            item.quotedata[0]?.salesExecutive &&
            item.quotedata[0]?.salesExecutive
              .toLowerCase()
              .includes(salesExecutive.toLowerCase())
        );
      }
      if (customerName) {
        results = results.filter(
          (item) =>
            item.customerData[0]?.customerName &&
            item.customerData[0]?.customerName
              .toLowerCase()
              .includes(customerName.toLowerCase())
        );
      }
      if (contactNo) {
        results = results.filter((item) => {
          const mainContact = item.customerData[0]?.mainContact;
          if (typeof mainContact === "number") {
            // Convert contactNo to a string before comparing (assuming it's a number)
            return mainContact.toString().includes(contactNo);
          }
          return false;
        });
      }

      if (address) {
        results = results.filter((item) => {
          const lnf = item.customerData[0]?.lnf;
          const cnap = item.customer[0]?.cnap;
          const rbhf = item.customer[0]?.rbhf;
          if (lnf && lnf.toLowerCase().includes(address.toLowerCase())) {
            return true;
          }
          if (cnap && cnap.toLowerCase().includes(address.toLowerCase())) {
            return true;
          }
          if (rbhf && rbhf.toLowerCase().includes(address.toLowerCase())) {
            return true;
          }
          return false;
        });
      }

      if (city) {
        results = results.filter(
          (item) =>
            item.city &&
            item.city
              .toLowerCase()
              .includes(city.toLowerCase())
        );
      }
      // if (quoteNo) {
      //   results = results.filter(
      //     (item) =>
      //       item.techName && //no technician name
      //       item.techName.toLowerCase().includes(quoteNo.toLowerCase())
      //   );
      // }
      if (projectType) {
        results = results.filter(
          (item) =>
            item.desc &&
            item.desc.toLowerCase().includes(projectType.toLowerCase())
        );
      }
      if (dateToComplete) {
        results = results.filter(
          (item) =>
            item.dsrdata[0]?.daytoComplete &&
            item.dsrdata[0]?.daytoComplete
              .toLowerCase()
              .includes(dateToComplete.toLowerCase())
        );
      }

      if (worker) {
        results = results.filter(
          (item) =>
            item.dsrdata[0]?.workerName &&
            item.dsrdata[0]?.workerName
              .toLowerCase()
              .includes(worker.toLowerCase())
        );
      }

      if (charges) {
        results = results.filter(
          (item) =>
            item.dsrdata[0]?.workerAmount &&
            item.dsrdata[0]?.workerAmount
              .toLowerCase()
              .includes(charges.toLowerCase())
        );
      }
      if (quoteValue) {
        results = results.filter(
          (item) =>
            item.serviceCharge &&
            item.serviceCharge.toLowerCase().includes(quoteValue.toLowerCase())
        );
      }

      setSearchResults(results);
    };
    filterResults();
  }, [
    runningDate,
    catagoryData,
    projectManager,
    salesExecutive,
    customerName,
    contactNo,
    address,
    city,
    quoteNo,
    projectType,
    dateToComplete,
    worker,
    vendorPayment,
    charges,
    quoteValue,
    payment,
    Type,
    SearchBackoffice
  ]);

  // Function to calculate the total amount from the paymentData array
  function calculateTotalPaymentAmount(paymentData) {
    let totalAmount = 0;
    for (const payment of paymentData) {
      const amountString = payment.amount;
      const cleanedAmountString = amountString.replace(/[^\d.-]/g, "");
      const amount = parseFloat(cleanedAmountString);
      if (!isNaN(amount)) {
        totalAmount += amount;
      }
    }
    return totalAmount.toFixed(2); // Format the total amount with two decimal places
  }

  // Function to calculate the total vendor payment amount
  function calculateTotalvendorAmount(paymentData) {
    let totalAmount = 0;

    // Loop through the payment data and sum up the amounts where the payment type is "Vendor"
    paymentData.forEach((payment) => {
      if (payment.paymentType === "Vendor") {
        totalAmount += parseFloat(payment.amount); // Assuming the amount is a string representing a number
      }
    });

    return totalAmount.toFixed(2); // You can adjust the number of decimal places as needed
  }

  // Function to calculate the pending amount (assuming the total amount is constant)
  function calculatePendingPaymentAmount(paymentData, serviceCharge) {
    const totalAmount = calculateTotalPaymentAmount(paymentData);
    const pendingAmount = parseFloat(serviceCharge) - totalAmount;
    return pendingAmount.toFixed(2); // Format the pending amount with two decimal places
  }

  function calculatePendingPaymentAmount(paymentData, serviceCharge) {
    const totalAmount = calculateTotalPaymentAmount(paymentData);
    const pendingAmount = parseFloat(serviceCharge) - totalAmount;
    return pendingAmount.toFixed(2); // Format the pending amount with two decimal places
  }

  function getRowStyle(item) {
    const isJobComplete = item.dsrdata[0]?.jobComplete === "YES";
    const isDeepCleaningStart =
      item.dsrdata[0]?.deepcleaningstartnote === "start";

    if (isJobComplete) {
      return { backgroundColor: "yellow", color: "black" };
    } else if (isDeepCleaningStart) {
      return { backgroundColor: "blue", color: "black" };
    } else {
      return { backgroundColor: "white", color: "black" };
    }
  }

  const exportData = () => {
    const fileName = "Running_project_report.xlsx";
    const filteredData1 = searchResults?.map(item => ({
      servicedate: item.dividedDates[0]?.date,
      category: item?.category,
      customerName: item?.customerData?.[0]?.customerName,
      salesExecutive: item.quotedata[0]?.salesExecutive,
      city: item?.city,
      number: item?.customerData?.[0]?.mainContact,
      service: item.service,
      address: `${item?.deliveryAddress?.platNo}, ${item?.deliveryAddress?.address} - ${item?.deliveryAddress?.landmark}`,
      desc: item?.desc,
      amount: item?.GrandTotal,
      workername:item.dsrdata[0]?.workerName,
      PM: item?.dsrdata?.[0]?.TechorPMorVendorName,
      BackofficeExecutive: item?.BackofficeExecutive,
      
    }));
    const worksheet = XLSX.utils.json_to_sheet(filteredData1);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "RunningProject");
    XLSX.writeFile(workbook, fileName);
  };



  return (
    <div className="web">
      <Header />
      <div className="p-4 row">
        <div className="col-md-1"></div>
        <div className="col-md-6 mt-2">
          <p style={{ fontSize: "20px" }}>
            <b>RUNNING PROJECRT REPORT &gt; Filter</b>{" "}
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
          <div className="row mt-2">
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
          <h5>Vijay Home Services | DSR Reports </h5>
        </Card>
      </div>{" "}
      <br />

      <div className="row m-auto" style={{ width: "100%" }}>
        <div className="col-md-12">
          <>
            <table class=" table-bordered mt-1">
              <thead className="">
                <tr
                  className="table-secondary"
                  style={{ background: "lightgrey" }}
                >
                  <th scope="col"></th>
                  <th scope="col">

                  </th>
                  <th scope="col">
                    {/* <select
                      className="vhs-table-input"
                      onChange={(e) => setCatagoryData(e.target.value)}
                    >
                      <option value="">-show all-</option>
                      {admin?.category.map((category, index) => (
                      <option key={index} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                    </select> */}
                  </th>
                  <th scope="col">
                    <select
                      className="vhs-table-input"
                      onChange={(e) => setProjectManager(e.target.value)}
                    >
                      <option value="">-show all-</option>
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
                      onChange={(e) => setSalesExecutive(e.target.value)}
                    >
                      <option value="">-show all-</option>
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
                    <select
                      className="vhs-table-input"
                      value={SearchBackoffice}
                      onChange={(e) => setSearchBackoffice(e.target.value)}
                    >
                      <option value="">Select</option>
                      {[
                        ...new Set(
                          treatmentData?.map(
                            (item) => item?.BackofficeExecutive
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
                      type="text"
                      className="vhs-table-input"
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                  </th>
                  <th scope="col">
                    {/* <input
                      type="text"
                      className="vhs-table-input"
                      onChange={(e) => setContactNo(e.target.value)}
                    /> */}
                  </th>
                  <th scope="col">
                    {/* <input
                      type="text"
                      className="vhs-table-input"
                      onChange={(e) => setAddress(e.target.value)}
                    /> */}
                    {/* <option>-show all-</option>
                        {treatmentData.map((item) => (
                          <option>
                            {item.customerData[0]?.lnf},
                            {item.customerData[0]?.rbhf},
                            {item.customerData[0]?.cnap}
                          </option>
                        ))}
                      </select> */}
                  </th>
                  <th scope="col">
                    <select
                      className="vhs-table-input"
                      value={city}
                      onChange={(e) => setcity(e.target.value)}
                    >
                      <option value="">Select</option>
                      {[...new Set(treatmentData?.map((city) => city.city))].map(
                        (uniqueCity) => (
                          <option value={uniqueCity} key={uniqueCity}>
                            {uniqueCity}
                          </option>
                        )
                      )}
                    </select>{" "}
                  </th>

                  <th scope="col">
                    
                  </th>
                  <th scope="col">
                    <input
                      type="text"
                      className="vhs-table-input"
                      onChange={(e) => setProjectType(e.target.value)}
                    />
                  </th>
                  <th scope="col">
                    <input
                      type="date"
                      className="vhs-table-input"
                      onChange={(e) => setDateToComplete(e.target.value)}
                    />
                  </th>
                  <th scope="col">
                    {/* <input
                      type="text"
                      className="vhs-table-input"
                      onChange={(e) => setWorker(e.target.value)}
                    /> */}
                  </th>
                  <th scope="col">
                    {/* <input
                        type="text"
                        className="vhs-table-input"
                        onChange={(e) => setVendorPayment(e.target.value)}
                      /> */}
                  </th>
                  <th scope="col">
                    {/* <input
                      type="text"
                      className="vhs-table-input"
                      onChange={(e) => setCharges(e.target.value)}
                    /> */}
                  </th>
                  <th scope="col">
                    {/* <input
                      type="text"
                      className="vhs-table-input"
                      onChange={(e) => setQuoteValue(e.target.value)}
                    /> */}
                  </th>
                  <th scope="col">
                    {/* <select
                        className="vhs-table-input"
                        onChange={(e) => setPayment(e.target.value)}
                      >
                        <option>-show all-</option>
                        <option>Book for deep cleaning</option>
                        <option>Closed by project manager</option>
                        <option>Running Projects</option>
                      </select> */}
                  </th>
                  <th scope="col">
                    {/* <input
                        type="text"
                        className="vhs-table-input"
                        onChange={(e) => setType(e.target.value)}
                      /> */}
                  </th>
                  <th scope="col"></th>
                  <th scope="col">

                    <select
                      className="vhs-table-input"
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option>-show all-</option>
                      <option value="bookdeep">Book for deep cleaning</option>
                      <option value="closed">Closed by project manager</option>
                      <option value="start">Projects start</option>

                      <option value="Running">Running Projects</option>
                    </select>
                  </th>
                  <th scope="col"></th>

                </tr>

                <tr
                  className="table-secondary"
                  style={{ background: "lightgrey" }}
                >
                  <th className="table-head" scope="col">
                    Sr.No
                  </th>
                  <th className="table-head" scope="col">
                    Cr.Date
                  </th>
                  <th className="table-head" scope="col">
                    Category
                  </th>
                  <th className="table-head" scope="col">
                    Project Manager
                  </th>
                  <th scope="col" className="table-head">
                    Sales Executive
                  </th>
                  <th scope="col" className="table-head">
                    BackOffice Executive
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
                  <th scope="col" className="table-head">
                    City
                  </th>
                  <th scope="col" className="table-head">
                    Quote No.
                  </th>
                  <th scope="col" className="table-head">
                    Project Type
                  </th>
                  <th scope="col" className="table-head">
                    Day To Complete
                  </th>
                  <th scope="col" className="table-head">
                    Worker
                  </th>
                  <th scope="col" className="table-head">
                    Vendor Amount
                  </th>
                  <th
                    scope="col"
                    className="table-head"
                    style={{ minWidth: "160px" }}
                  >
                    Vendor Payment
                  </th>
                  <th scope="col" className="table-head">
                    Quote Value
                  </th>
                  <th
                    scope="col"
                    className="table-head"
                    style={{ minWidth: "160px" }}
                  >
                    Customer  Payment
                  </th>

                  <th scope="col" className="table-head">
                    Man Power
                  </th>

                  <th scope="col" className="table-head">
                    Work details
                  </th>
                  <th scope="col" className="table-head">
                    TYPE
                  </th>
                  <th scope="col" className="table-head" style={{ width: "20%" }}>
                    Deep Clean Details
                  </th>


                </tr>
              </thead>
              <tbody>
                {searchResults.map((item, index) => (
                  <tr
                    className=""
                    key={index}
                    style={{
                      backgroundColor:
                        item.dsrdata[0]?.jobComplete === "YES"
                          ? "#ffb9798f"
                          : item.dsrdata[0]?.deepcleaningstart === "start" // Corrected key here
                            ? "#0080002e"
                            : item.dsrdata[0]?.startproject === "start" ?
                              "skyblue" :
                              "white",
                      color: "black",
                    }}
                  >
                    <td>{index + 1}</td>
                    <td>{item.date}</td>
                    <td>{item.category}</td>
                    <td>{item.dsrdata[0]?.TechorPMorVendorName}</td>
                    <td>{item.quotedata[0]?.salesExecutive}</td>
                    <td>{item.BackofficeExecutive}</td>
                    <td>{item.customerData[0]?.customerName}</td>
                    <td>{item.customerData[0]?.mainContact}</td>
                    <td>
                      {item.deliveryAddress ? (
                        <>
                          {item.deliveryAddress.platNo},{" "}
                          {item.deliveryAddress.address} -{" "}
                          {item.deliveryAddress.landmark}
                        </>
                      ) : (
                        <>
                          {item.customerData[0]?.lnf},
                          {item.customerData[0]?.rbhf},
                          {item.customerData[0]?.cnap},
                        </>
                      )}
                    </td>
                    <td>{item?.city}</td>
                    <td>{item.quotedata[0]?.quoteId}</td>
                    <td>{item.desc}</td>
                    <td>{item.dsrdata[0]?.daytoComplete}</td>
                    <td>{item.dsrdata[0]?.workerName}</td>
                    <td>
                      {/* {item.paymentData.some(
                        (i) =>
                          i.paymentType === "Vendor" && i.serviceId === item._id
                      ) ? (
                        <div>
                          {item.paymentData
                            .filter(
                              (i) =>
                                i.paymentType === "Vendor" &&
                                i.serviceId === item._id
                            )
                            .map((i) => (
                              <p key={i._id}>{i.amount}</p>
                            ))}
                        </div>
                      ) : (
                        <p>0.0</p>
                      )} */}
                      {item.dsrdata[0]?.workerAmount
                        ? item.dsrdata[0]?.workerAmount
                        : 0}
                    </td>
                    <td>
                      {item.paymentData.some(
                        (i) =>
                          i.paymentType === "Vendor" && i.serviceId === item._id
                      ) ? (
                        <div>
                          {item.paymentData
                            .filter(
                              (i) =>
                                i.paymentType === "Vendor" &&
                                i.serviceId === item._id
                            )
                            .map((i) => (
                              <p key={i._id} className="mb-0 text-right">
                                ({i.paymentDate}) {i.amount}
                              </p>
                            ))}
                          <div>
                            <hr className="mb-0 mt-0" />
                            <p className="mb-0 text-right">
                              <b>
                                {" "}
                                Total:{" "}
                                {calculateTotalvendorAmount(
                                  item.paymentData.filter(
                                    (i) => i.serviceId === item._id && i.paymentType === "Vendor"
                                  )
                                )}
                              </b>
                            </p>
                            <p className="text-right">
                              <b>
                                Balance:{" "}
                                {calculatePendingPaymentAmount(
                                  item.paymentData.filter(
                                    (i) =>
                                      i.paymentType === "Vendor" &&
                                      i.serviceId === item._id
                                  ),
                                  item.dsrdata[0]?.workerAmount
                                )}
                              </b>
                            </p>
                          </div>
                        </div>
                      ) : (
                        <p></p>
                      )}
                    </td>
                    <td>{item.quotedata[0]?.netTotal}</td>
                    <td>
                      {item.paymentData.some(
                        (i) =>
                          i.paymentType === "Customer" &&
                          i.serviceId === item._id
                      ) ? (
                        <div>
                          {item.paymentData
                            .filter(
                              (i) =>
                                i.paymentType === "Customer" &&
                                i.serviceId === item._id
                            )
                            .map((i) => (
                              <p key={i._id} className="mb-0 text-right">
                                ({i.paymentDate}) {i.amount}
                              </p>
                            ))}
                          <div>
                            <hr className="mb-0 mt-0" />
                            <p className="mb-0 text-right">
                              <b>
                                Total:{" "}
                                {calculateTotalPaymentAmount(
                                  item.paymentData.filter(
                                    (i) => i.serviceId === item._id && i.paymentType === "Customer"
                                  )
                                )}
                              </b>
                            </p>
                            <p className="text-right">
                              <b>
                                Pending:{" "}
                                {calculatePendingPaymentAmount(
                                  item.paymentData.filter(
                                    (i) =>
                                      i.paymentType === "Customer" &&
                                      i.serviceId === item._id
                                  ),
                                  item.quotedata[0]?.netTotal
                                )}
                              </b>
                            </p>
                          </div>
                        </div>
                      ) : (
                        <p></p>
                      )}
                    </td>

                    <td>
                      {item.manpowerdata.map((item) => (
                        <>
                          <div>{item.mandate}</div>
                          <div> {item.mandesc}</div>
                        </>
                      ))}
                    </td>

                    {/* <td>
                      <div>{item.materialdata[0]?.materialdate}</div>
                      <div> {item.materialdata[0]?.materialdesc}</div>
                    </td> */}

                    <td>
                      {item.materialdata.map((item) => (
                        <>
                          <div>{item.materialdate}</div>
                          <div> {item.materialdesc}</div>
                        </>
                      ))}
                    </td>
                    <td>
                      <div>
                        {item.dsrdata[0]?.jobComplete === "YES"
                          ? "CLOSED BY PROJECT MANAGER"
                          : item.dsrdata[0]?.deepcleaningstart === "start"
                            ? "BOOK FOR DEEP CLEANING"
                            : item.dsrdata[0]?.startproject === "start" ?
                              "PROJECT STARTED"
                              :
                              "RUNNING PROJECTS"
                        }
                      </div>
                    </td>
                    <td>

                      <div>{item.dsrdata[0]?.deepcleaningdate}<br />
                        {item.dsrdata[0]?.deepcleaningnote}</div>
                    </td>


                  </tr>
                ))}
              </tbody>
            </table>{" "}
          </>
        </div>
      </div>
    </div>
  );
}

export default RunningProject;
