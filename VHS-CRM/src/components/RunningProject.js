import React, { useState, useEffect } from "react";
import Header from "./layout/Header";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function RunningProject() {
  const admin = JSON.parse(sessionStorage.getItem("admin"));

  const apiURL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);
  const [categorydata, setcategorydata] = useState([]);
  const [category, setcategory] = useState("");
  const [dsrdata, setdsrdata] = useState([]);
  const [treatmentdata, settreatmentData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [data, setData] = useState([]);
  const [runningDate, setRunningDate] = useState("");
  const [catagoryData, setCatagoryData] = useState("");
  const [projectManager, setProjectManager] = useState("");
  const [salesExecutive, setSalesExecutive] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [quoteNo, setQuoteNo] = useState("");
  const [projectType, setProjectType] = useState("");
  const [dateToComplete, setDateToComplete] = useState("");
  const [worker, setWorker] = useState("");
  const [vendorPayment, setVendorPayment] = useState(""); //need
  const [charges, setCharges] = useState("");
  const [quoteValue, setQuoteValue] = useState("");
  const [payment, setPayment] = useState(""); //need
  const [type, setType] = useState(""); //need

  console.log("searchResults===", searchResults);

  //unique select option. removing duplicates--------
  const [catagories, setCatagories] = useState(new Set());
  const [techName, setTechName] = useState(new Set());
  const [addressType, setAddressType] = useState(new Set());

  useEffect(() => {
    const uniqueCatagories = new Set(
      treatmentdata
        .map((item) => item.customerData[0]?.category)
        .filter(Boolean)
    );
    const uniqueTechName = new Set(
      treatmentdata.map((item) => item.dsrdata[0]?.techName).filter(Boolean)
    );
    const uniqueAddress = new Set(
      treatmentdata
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
  }, [treatmentdata]);

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

  useEffect(() => {
    // console.log("date", date);
    // console.log("category", category);
    getservicedata();
  }, [category]);

  const getservicedata = async () => {
    let res = await axios.get(apiURL + "/getfilterrunningdata");
    if (res.status === 200) {
      const filteredData = res.data?.runningdata.filter(
        (i) => !i.closeProject && i.dsrdata[0]?.startproject
      );

      console.log("res.data?.runningdata", res.data?.runningdata);

      settreatmentData(filteredData);
      setSearchResults(filteredData);
    }
  };

  const updatetoclose = async (id) => {
    try {
      const config = {
        url: `/closeproject/${id}`,
        method: "post",
        baseURL: apiURL,
        headers: { "content-type": "application/json" },
        data: {
          closeProject: "closed",
          closeDate: moment().format("L"),
        },
      };
      await axios(config);
      // Remove the closed row from the state
      const updatedData = treatmentdata.filter((item) => item._id !== id);

      settreatmentData(updatedData);
      alert("Updated");
      // Reload the page
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Not updated");
    }
  };

  const redirectURL = (data) => {
    navigate(`/painting/${data?._id}`);
  };

  useEffect(() => {
    const filterResults = () => {
      let results = treatmentdata;
      if (runningDate) {
        results = results.filter(
          (item) =>
            item.dsrdata[0]?.serviceDate &&
            item.dsrdata[0]?.serviceDate
              .toLowerCase()
              .includes(runningDate.toLowerCase())
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
            item.dsrdata[0]?.TechorPMorVendorName.toLowerCase().includes(
              projectManager.toLowerCase()
            )
        );
      }
      if (salesExecutive) {
        results = results.filter(
          (item) =>
            item.enquiryFollowupData[0]?.technicianname &&
            item.enquiryFollowupData[0]?.technicianname
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
            return mainContact.toString().includes(contactNo);
          }
          return false;
        });
      }

      if (address) {
        results = results.filter((item) => {
          const lnf = item.customerData[0]?.lnf;
          const cnap = item.customerData[0]?.cnap;
          const rbhf = item.customerData[0]?.rbhf;
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
            item.city && item.city.toLowerCase().includes(city.toLowerCase())
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
    type,
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

  const [selectedStatus, setSelectedStatus] = useState("");

  // Function to handle legend item clicks and filter data
  const handleLegendItemClick = (status) => {
    setSelectedStatus(status);

    // Use the original treatmentData if searchResults is empty
    const dataToFilter =
      searchResults.length > 0 ? searchResults : treatmentdata;

    // Logic to filter data based on the selected status
    const filteredData = dataToFilter.filter((item) => {
      switch (status) {
        case "START":
          return (
            item.dsrdata[0]?.startproject === "start" &&
            item.dsrdata[0]?.jobComplete !== "YES" &&
            item.dsrdata[0]?.deepcleaningstart !== "start"
          );
        case "CLOSED":
          return item.dsrdata[0]?.jobComplete === "YES";
        case "DEEPCLEANING":
          return item.dsrdata[0]?.deepcleaningstart === "start";

        default:
          return true;
      }
    });

    setSearchResults(filteredData);
  };
  return (
    <div className="web">
      <Header />
      <div className="col-md-4 p-3">
        <div className="vhs-input-label">
          <h3>Running Projects</h3>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div className="shadow-sm" style={{ border: "1px #cccccc solid" }}>
          <div
            className="ps-1 pe-1"
            style={{
              borderBottom: "1px #cccccc solid",
              backgroundColor: "skyblue",
              cursor: "pointer",
            }}
            onClick={() => handleLegendItemClick("START")}
          >
            Job start
          </div>

          <div
            className="ps-1 pe-1"
            style={{
              backgroundColor: "#0080002e",
              cursor: "pointer",
            }}
            onClick={() => handleLegendItemClick("DEEPCLEANING")}
          >
            Deep cleaning Assigned
          </div>
          <div
            className="ps-1 pe-1"
            style={{ backgroundColor: "#ffb9798f", cursor: "pointer" }}
            onClick={() => handleLegendItemClick("CLOSED")}
          >
            Job closed
          </div>
        </div>
      </div>
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
                    <input
                      className="vhs-table-input"
                      type="date"
                      onChange={(e) => setRunningDate(e.target.value)}
                    />
                  </th>
                  <th scope="col">
                    <select
                      className="vhs-table-input"
                      onChange={(e) => setCatagoryData(e.target.value)}
                    >
                      <option value="">-show all-</option>
                      {[...catagories].map((catagories) => (
                        <option key={catagories}>{catagories}</option>
                      ))}
                    </select>
                  </th>
                  <th scope="col">
                    <select
                      className="vhs-table-input"
                      onChange={(e) => setProjectManager(e.target.value)}
                    >
                      <option value="">-show all-</option>
                      {[
                        ...new Set(
                          treatmentdata?.map(
                            (item) => item.dsrdata[0]?.TechorPMorVendorName
                          )
                        ),
                      ].map((uniqueCity) => (
                        <option value={uniqueCity} key={uniqueCity}>
                          {uniqueCity}
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
                          treatmentdata?.map(
                            (item) =>
                              item.enquiryFollowupData[0]?.technicianname
                          )
                        ),
                      ].map((uniqueCity) => (
                        <option value={uniqueCity} key={uniqueCity}>
                          {uniqueCity}
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
                    <input
                      type="text"
                      className="vhs-table-input"
                      onChange={(e) => setContactNo(e.target.value)}
                    />
                  </th>
                  <th scope="col">
                    <input
                      type="text"
                      className="vhs-table-input"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    {/* <option>-show all-</option>
                        {treatmentdata.map((item) => (
                          <option>
                            {item.customerData[0]?.lnf},
                            {item.customerData[0]?.rbhf},
                            {item.customerData[0]?.cnap}
                          </option>
                        ))}
                      </select> */}
                  </th>
                  <th scope="col">
                    <input
                      type="text"
                      className="vhs-table-input"
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </th>
                  <th scope="col">
                    <input
                      type="text"
                      className="vhs-table-input"
                      onChange={(e) => setQuoteNo(e.target.value)}
                    />
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
                    <input
                      type="text"
                      className="vhs-table-input"
                      onChange={(e) => setWorker(e.target.value)}
                    />
                  </th>
                  <th scope="col">
                    {/* <input
                        type="text"
                        className="vhs-table-input"
                        onChange={(e) => setVendorPayment(e.target.value)}
                      /> */}
                  </th>
                  <th scope="col">
                    <input
                      type="text"
                      className="vhs-table-input"
                      onChange={(e) => setCharges(e.target.value)}
                    />
                  </th>
                  <th scope="col">
                    <input
                      type="text"
                      className="vhs-table-input"
                      onChange={(e) => setQuoteValue(e.target.value)}
                    />
                  </th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
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
                    Customer Payment
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
                  <th
                    scope="col"
                    className="table-head"
                    style={{ width: "20%" }}
                  >
                    Deep Clean Details
                  </th>

                  <th scope="col" className="table-head">
                    Action
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
                          : item.dsrdata[0]?.startproject === "start"
                          ? "skyblue"
                          : "white",
                      color: "black",
                    }}
                  >
                    <td>{index + 1}</td>
                    <td>{item.dsrdata[0]?.serviceDate}</td>
                    <td>{item.category}</td>
                    <td>{item.dsrdata[0]?.TechorPMorVendorName}</td>
                    <td>{item.enquiryFollowupData[0]?.technicianname}</td>
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
                                    (i) =>
                                      i.serviceId === item._id &&
                                      i.paymentType === "Vendor"
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
                                    (i) =>
                                      i.serviceId === item._id &&
                                      i.paymentType === "Customer"
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
                          : item.dsrdata[0]?.startproject === "start"
                          ? "PROJECT STARTED"
                          : "RUNNING PROJECTS"}
                      </div>
                    </td>
                    <td>
                      <div>
                        {item.dsrdata[0]?.deepcleaningdate}
                        <br />
                        {item.dsrdata[0]?.deepcleaningnote}
                      </div>
                    </td>

                    <td>
                      <div>
                        <span>
                          <a
                            onClick={() => redirectURL(item)}
                            style={{ cursor: "pointer" }}
                          >
                            Details
                          </a>
                        </span>{" "}
                        /{" "}
                        <span
                          style={{ color: "orange", cursor: "pointer" }}
                          onClick={() => updatetoclose(item._id)}
                        >
                          Close
                        </span>
                      </div>
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
