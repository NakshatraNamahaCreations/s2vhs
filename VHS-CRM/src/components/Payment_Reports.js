import React, { useState, useEffect } from "react";
import Header from "./layout/Header";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const active = {
  backgroundColor: "rgb(169, 4, 46)",
  color: "#fff",
  fontWeight: "bold",
  border: "none",
};
const inactive = { color: "black", backgroundColor: "white" };

function Payment_Reports() {
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

  //unique select option. removing duplicates--------
  const [catagories, setCatagories] = useState(new Set());
  const [techName, setTechName] = useState(new Set());
  const [addressType, setAddressType] = useState(new Set());
  const [vendorPayments, setVendorPayments] = useState([]);

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
    let res = await axios.get(apiURL + "/getrunningdata");
    if (res.status === 200) {
      const filteredData = res.data?.runningdata.filter(
        (i) => i.contractType === "AMC" && !i.closeProject
      );
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
    navigate(`/paymentreportdetailedview/${data.cardNo}`);
  };

  useEffect(() => {
    const filterResults = () => {
      let results = treatmentdata;
      if (projectManager && projectManager !== "Show All") {
        results = results.filter(
          (item) =>
            item.dsrdata[0]?.techName &&
            item.dsrdata[0]?.techName
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
    projectManager,
    salesExecutive,
    customerName,
    contactNo,
    worker,
    vendorPayment,
    charges,
    quoteValue,
    payment,
  ]);

  const vendorPaymentsData = () => {
    const vendorPayments = treatmentdata[0]?.paymentData;
    if (vendorPayments) {
      const getThePaymentType = vendorPayments.filter(
        (payment) => payment.paymentType === "Vendor"
      );
      return getThePaymentType;
    }
    return [];
  };

  useEffect(() => {
    const vendorPayments = vendorPaymentsData();
    setVendorPayments(vendorPayments);
  }, [treatmentdata]);

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
    const pendingAmount = totalAmount - parseFloat(serviceCharge);
    return pendingAmount.toFixed(2); // Format the pending amount with two decimal places
  }
  return (
    <div className="web">
      <Header />
      <div className="col-md-4 p-3">
        <div className="vhs-input-label">
          <h3>Payment Report</h3>
        </div>
      </div>

      <div className="row m-auto" style={{ width: "100%" }}>
        <div className="col-md-12">
          {selected == 0 ? (
            <>
              <table class="table table-hover table-bordered mt-1">
                <thead className="">
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">
                      <select
                        className="vhs-table-input"
                        onChange={(e) => setProjectManager(e.target.value)}
                      >
                        <option value="">--Project Manager--</option>
                        {[...techName].map((techName) => (
                          <option key={techName}>{techName}</option>
                        ))}
                      </select>
                    </th>
                    <th>
                      <input
                        type="text"
                        className="vhs-table-input"
                        onChange={(e) => setSalesExecutive(e.target.value)}
                      />
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
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    {/* <th scope="col">
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
                    </th> */}
                  </tr>

                  <tr className="table-secondary">
                    <th className="table-head" scope="col">
                      Sr.No
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

                    <th
                      scope="col"
                      className="table-head"
                      style={{ textAlign: "center" }}
                    >
                      Vendor Payment
                    </th>
                    <th scope="col" className="table-head">
                      Charges
                    </th>
                    <th scope="col" className="table-head">
                      Quote Value
                    </th>
                    <th scope="col" className="table-head">
                      Payment
                    </th>
                    <th scope="col" className="table-head">
                      Status
                    </th>
                    <th scope="col" className="table-head">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((item, index) => (
                    <tr className="user-tbale-body">
                      <td>{index + 1}</td>
                      <td>{item.dsrdata[0]?.techName}</td>
                      <td>{item.quotedata[0]?.salesExecutive}</td>
                      <td>{item.customerData[0]?.customerName}</td>
                      <td>{item.customerData[0]?.mainContact}</td>

                      <td style={{ textAlign: "center" }}>
                        {item.paymentData.some(
                          (i) => i.paymentType === "Vendor"
                        ) ? (
                          <div>
                            {item.paymentData
                              .filter((i) => i.paymentType === "Vendor")
                              .map((i) => (
                                <p key={i._id}>{i.amount}</p>
                              ))}
                          </div>
                        ) : (
                          <p>0.0</p>
                        )}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {item.paymentData.some(
                          (i) => i.paymentType === "Vendor"
                        ) ? (
                          <div>
                            {item.paymentData
                              .filter((i) => i.paymentType === "Vendor")
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
                                  {calculateTotalvendorAmount(item.paymentData)}
                                </b>
                              </p>
                            </div>
                          </div>
                        ) : (
                          <p></p>
                        )}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {item.serviceCharge}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {item.paymentData.some(
                          (i) => i.paymentType === "Customer"
                        ) ? (
                          <div>
                            {item.paymentData
                              .filter((i) => i.paymentType === "Customer")
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
                                    item.paymentData
                                  )}
                                </b>
                              </p>
                              <p className="text-right">
                                <b>
                                  Pending:{" "}
                                  {calculatePendingPaymentAmount(
                                    item.paymentData.filter(
                                      (i) => i.paymentType === "Customer"
                                    ),
                                    item.serviceCharge
                                  )}
                                </b>
                              </p>
                            </div>
                          </div>
                        ) : (
                          <p></p>
                        )}
                      </td>
                      <td>Pending</td>
                      <td>
                        <div>
                          <span>
                            <a
                              className="payment-report-page-view"
                              onClick={() => redirectURL(item)}
                            >
                              View
                            </a>
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>{" "}
            </>
          ) : (
            <>
              <div className="row">
                <div className="col-md-12">
                  <div className="card" style={{ marginTop: "80px" }}>
                    <div className="card-body p-4">
                      <form>
                        <div className="row">
                          <div className="col-md-4 pt-2">
                            <div className="vhs-input-label">By Name</div>
                            <div className="group pt-1">
                              <input
                                type="text"
                                className="col-md-12 vhs-input-value"
                              />
                            </div>
                          </div>
                          <div className="col-md-4 pt-2">
                            <div className="vhs-input-label">Number</div>
                            <div className="group pt-1">
                              <input
                                type="text"
                                className="col-md-12 vhs-input-value"
                              />
                            </div>
                          </div>
                          <div className="col-md-4 pt-2">
                            <div className="vhs-input-label">Date Range</div>
                            <div className="group pt-1">
                              <input
                                type="date"
                                className="col-md-12 vhs-input-value"
                              />
                            </div>
                          </div>

                          <div className="col-md-4 pt-2">
                            <div className="vhs-input-label">PM wise</div>
                            <div className="group pt-1">
                              <input
                                type="text"
                                className="col-md-12 vhs-input-value"
                              />
                            </div>
                          </div>

                          <div className="col-md-4 pt-2">
                            <div className="vhs-input-label">
                              Executive wise
                            </div>
                            <div className="group pt-1">
                              <input
                                type="text"
                                className="col-md-12 vhs-input-value"
                              />
                            </div>
                          </div>

                          <div className="col-md-4 pt-2">
                            <div className="vhs-input-label">
                              Technician wise
                            </div>
                            <div className="group pt-1">
                              <input
                                type="text"
                                className="col-md-12 vhs-input-value"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row pt-3 justify-content-center">
                          <div className="col-md-2">
                            <button className="vhs-button">Save</button>
                          </div>
                          <div className="col-md-2">
                            <button className="vhs-button mx-3">Cancel</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Payment_Reports;
