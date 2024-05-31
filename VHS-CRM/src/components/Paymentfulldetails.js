import React, { useEffect, useState } from "react";
import Header from "./layout/Header";
import Customersernav from "./Customersernav";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import axios from "axios";
import moment from "moment";

function Payment() {
  const apiURL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const location = useLocation();
  const { data, data1 } = location.state;

  const [data2, setdata2] = useState([]);

  const [paymentDetails, setPaymentDetails] = useState([]);
  const [paymentDate, setPaymentDate] = useState(moment().format("DD/MM/YYYY"));
  const [paymentType, setPaymentType] = useState("");
  const [paymentComments, setPaymentComments] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [customerPayments, setCustomerPayments] = useState([]);
  const [vendorPayments, setVendorPayments] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [editPayment, setEditPayment] = useState(null);

  const [editPaymentDate, setEditPaymentDate] = useState("");
  const [editPaymentAmount, setEditPaymentAmount] = useState("");
  const [editPaymentType, setEditPaymentType] = useState("");
  const [editPaymentComments, setEditPaymentComments] = useState("");
  const [editPaymentMode, setEditPaymentMode] = useState("");

  // Function to update paymentDetails state
  const handleEdit = (paymentData) => {
    setEditPayment(paymentData);
    setShowEdit(true); // Show the edit form when clicking "Edit"
  };


  const addPayment = async () => {
    try {
      const config = {
        url: "/addPayment",
        method: "post",
        baseURL: apiURL,
        headers: { "content-type": "application/json" },
        data: {
          paymentDate: moment().format("DD/MM/YYYY"),
          paymentType: "Customer",
          paymentMode: paymentMode,
          amount: paymentAmount,
          Comment: paymentComments,
          serviceDate: data1,
          serviceId: data?._id,
          customerId: data?.customerData[0]?._id,
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert("Payment Added");
          window.location.reload("");
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };

  const updatePayment = async () => {
    try {
      const paymentId = editPayment._id;
      const updatedData = {
        paymentDate: editPaymentDate || editPayment.paymentDate,
        paymentType: editPaymentType || editPayment.paymentType,
        paymentMode: editPaymentMode || editPayment.paymentMode,
        amount: editPaymentAmount || editPayment.amount,
        Comment: editPaymentComments || editPayment.Comment,
        serviceId: data._id || editPayment.serviceId,
        serviceDate:data1 ||editPayment.serviceDate,
        customerId: data2[0]?.customerData[0]._id,
      };
      const config = {
        url: `/updatepayment/${paymentId}`,
        method: "put",
        baseURL: apiURL,
        headers: { "content-type": "application/json" },
        data: updatedData,
      };

      const response = await axios(config);

      if (response.status === 200) {
        alert("Payment Updated");
        window.location.reload("");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };

 


  const getPaymentById = async () => {
    try {


      let res = await axios.get(
        apiURL + `/getPaymentByCustomerId/${data._id }`
      );
      if (res.status === 200) {
        console.log("payments",res.data?.payments)
        setPaymentDetails(
          res.data?.payments
        );
      }
    } catch (error) {
      console.log("error:", error);
    }
  };
  useEffect(() => {
    getPaymentById();
  }, [data]);

  useEffect(() => {
    // Filter payments by paymentType
    const customerPayments = paymentDetails.filter(
      (payment) => payment.paymentType === "Customer"
    );
    const vendorPayments = paymentDetails.filter(
      (payment) => payment.paymentType === "Vendor"
    );

    setCustomerPayments(customerPayments);
    setVendorPayments(vendorPayments);
  }, [paymentDetails]);

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };



  return (
    <div className="web">
      <Header />

      <div className="navbar">
        <ul className="nav-tab-ul">
          <li>
            <NavLink to="/paymentcalender" activeClassName="active">
              Payment calendar view
            </NavLink>
          </li>
        </ul>
      </div>
      <div
        style={{
          border: "1px solid color(srgb 0.855 0.855 0.855)",
          width: "97%",
          margin: "0px 15px",
          padding: "8px",
          borderRadius: "5px",
        }}
      >
        <b>Customer Payment &gt; {data.customerData[0]?.customerName}</b>
      </div>
      <div className="m-3">
        {showEdit ? (
          <>
            <div className="card p-2">
              <div className="card-body p-4">
                <div className="row  ">
                  <div>
                    <div
                      className="d-flex"
                      style={{ justifyContent: "flex-end" }}
                    >
                      <i
                        class="fa-regular fa-circle-xmark"
                        title="Close"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowEdit(!showEdit)}
                      ></i>
                    </div>

                    <h5>Edit</h5>
                    <br />
                  </div>
                  <div className="col-6 d-flex ">
                    <div className="col-4">
                      Payment Date <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1 col-5 ml-3">
                      <input
                        type="date"
                        className="col-md-12 vhs-input-value"
                        defaultValue={editPayment?.paymentDate}
                        onChange={(e) => setEditPaymentDate(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-6 d-flex">
                    <div className="col-4">
                      {" "}
                      Amount <span className="text-danger"> *</span>
                    </div>

                    <div className="group pt-1 col-5">
                      <input
                        type="text"
                        defaultValue={editPayment?.amount}
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setEditPaymentAmount(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row  mt-2">
                  <div className="col-6 d-flex ">
                    <div className="col-4">
                      Payment Type <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1 col-5 ml-3">
                      <select
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setEditPaymentType(e.target.value)}
                        defaultValue={editPayment?.paymentType}
                        // value={editPaymentType}
                      >
                        <option value="">--select--</option>
                        <option value="Customer">Customer</option>
                        {/* <option value="Vendor">Vendor</option> */}
                      </select>
                    </div>
                  </div>
                  <div className="col-6 d-flex">
                    <div className="col-4"> Comment</div>

                    <div className="group pt-1 col-5">
                      <textarea
                        type="text"
                        className="col-md-12 vhs-input-value"
                        defaultValue={editPayment?.Comment}
                        style={{ height: "100px" }}
                        onChange={(e) => setEditPaymentComments(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row  mt-2">
                  <div className="col-6 d-flex ">
                    <div className="col-4">
                      Payment Mode <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1 col-5 ml-3">
                      <select
                        className="col-md-12 vhs-input-value"
                        defaultValue={editPayment?.paymentMode}
                        onChange={(e) => setEditPaymentMode(e.target.value)}
                      >
                        <option value="">--select--</option>
                        <option value="Cash">Cash</option>
                        <option value="Cheque">Cheque</option>
                        <option value="Paytm">Paytm</option>
                        <option value="PhonePe">PhonePe</option>
                        <option value="Google Pay">Google Pay</option>
                        <option value="NEFT">NEFT</option>
                        <option value="IMPS">IMPS</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row pt-3 justify-content-center">
                <div className="col-md-2">
                  <button className="vhs-button" onClick={updatePayment}>
                    UPDATE
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="card p-2">
            <div className="card-body p-4">
              <div className="row  ">
                <div className="col-6 d-flex ">
                  <div className="col-4">
                    Payment Date <span className="text-danger"> *</span>
                  </div>
                  <div className="group pt-1 col-5 ml-3">
                    <input
                      type="date"
                      className="col-md-12 vhs-input-value"
                      value={moment().format("DD/MM/YYYY")}
                      onChange={(e) => setPaymentDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-6 d-flex">
                  <div className="col-4">
                    {" "}
                    Amount <span className="text-danger"> *</span>
                  </div>

                  <div className="group pt-1 col-5">
                    <input
                      type="text"
                      placeholder="amounts"
                      className="col-md-12 vhs-input-value"
                      onChange={(e) => setPaymentAmount(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row  mt-2">
                <div className="col-6 d-flex ">
                  <div className="col-4">
                    Payment Type <span className="text-danger"> *</span>
                  </div>
                  <div className="group pt-1 col-5 ml-3">
                    <select
                      className="col-md-12 vhs-input-value"
                      onChange={(e) => setPaymentType(e.target.value)}
                    >
                      {/* <option value="">--select--</option> */}
                      <option value="Customer">Customer</option>
                      {/* <option value="Vendor">Vendor</option> */}
                    </select>
                  </div>
                </div>
                <div className="col-6 d-flex">
                  <div className="col-4"> Comment</div>

                  <div className="group pt-1 col-5">
                    <textarea
                      type="text"
                      className="col-md-12 vhs-input-value"
                      placeholder="Comments"
                      style={{ height: "100px" }}
                      onChange={(e) => setPaymentComments(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row  mt-2">
                <div className="col-6 d-flex ">
                  <div className="col-4">
                    Payment Mode <span className="text-danger"> *</span>
                  </div>
                  <div className="group pt-1 col-5 ml-3">
                    <select
                      className="col-md-12 vhs-input-value"
                      onChange={(e) => setPaymentMode(e.target.value)}
                    >
                      <option value="">--select--</option>
                      <option value="Cash">Cash</option>
                      <option value="Cheque">Cheque</option>
                      <option value="Paytm">Paytm</option>
                      <option value="PhonePe">PhonePe</option>
                      <option value="Google Pay">Google Pay</option>
                      <option value="NEFT">NEFT</option>
                      <option value="IMPS">IMPS</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="row pt-3 justify-content-center">
              <div className="col-md-2">
                <button className="vhs-button" onClick={addPayment}>
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-2 p-3">
          <h5>Customer Payment</h5>

          <table class="table table-hover table-bordered mt-1">
            <thead>
              <tr className="tr clr">
                <th scope="col">
                  <input className="vhs-table-input" />{" "}
                </th>

                <th scope="col">
                  {" "}
                  <input className="vhs-table-input" />{" "}
                </th>

                <th scope="col">
                  {" "}
                  <input className="vhs-table-input" />{" "}
                </th>
                <th scope="col">
                  {" "}
                  <input className="vhs-table-input" />{" "}
                </th>
                <th scope="col">
                  <input className="vhs-table-input" />{" "}
                </th>
                <th scope="col"></th>
              </tr>
              <tr className="tr table-secondary  clr">
                <th>#</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Payment Mode</th>
                <th>Comment</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {customerPayments.map((payment, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{payment?.paymentDate}</td>
                  <td>{payment?.amount}</td>
                  <td>{payment?.paymentMode}</td>
                  <td>{payment?.Comment}</td>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEdit(payment)}
                  >
                    {" "}
                    <b>Edit</b>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

       
      </div>
    </div>
  );
}

export default Payment;
