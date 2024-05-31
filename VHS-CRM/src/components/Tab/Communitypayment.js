import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

function Communitypayment() {
  const apiURL = process.env.REACT_APP_API_URL;
  const location = useLocation();
  const { data } = location.state || null;
  console.log("community", data);

  // const covertDataIntoArray = Object.keys(data);

  const [date, setDate] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [comments, setComments] = useState("");
  const [selected, setSelected] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [editCommunity, setEditCommunity] = useState(null);
  const [editDate, setEditDate] = useState("");
  const [editPaymentAmount, setEditPaymentAmount] = useState("");
  const [editPaymentType, setEditPaymentType] = useState("");
  const [editComments, setEditComments] = useState("");
  const [payments, setPayments] = useState([]);
  const handleClick = (divNum) => () => {
    setSelected(divNum);
  };

  const addPayment = async (e) => {
    e.preventDefault();
    try {
      const formattedPaymentAmount = parseFloat(paymentAmount).toFixed(2);
      const config = {
        url: "/addcommunitypayments",
        method: "post",
        baseURL: apiURL,
        headers: { "content-type": "application/json" },
        data: {
          paymentAddedDate: date,
          amountPaidToCommunity: formattedPaymentAmount,
          paymentMode: paymentType,
          comment: comments,
          communityId: data._id,
        },
      };

      await axios(config).then(function (res) {
        if (res.status === 200) {
          console.log("success");
          alert("Added");
          window.location.reload();
        }
      });
    } catch (error) {
      console.log(error);
      alert("not able to complete");
    }
  };

  var i = 1;

  const paymentDate = payments[0]?.paymentAddedDate
    ? new Date(Date.parse(payments[0]?.paymentAddedDate))
    : null;

  const deletePayment = async (id) => {
    try {
      const response = await axios.post(
        apiURL + "/deletecommunitypayment/" + id
      );
      console.log(response);
      alert("Deleted successfully");
      window.location.reload()
      // After successful deletion, remove the deleted payment from the payments state
      setPayments((prevPayments) =>
        prevPayments.filter((payment) => payment._id !== id)
      );
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleEdit = (data) => {
    setEditCommunity(data);
    setShowEdit(true);
  };

  const updatePayment = async (e) => {
    e.preventDefault();
    try {
      const formattedPaymentAmount = parseFloat(editPaymentAmount).toFixed(2);
      const communityId = editCommunity._id;
      const config = {
        url: `/addcommunitypayment/${communityId}`,
        method: "post",
        baseURL: apiURL,
        headers: { "content-type": "application/json" },
        data: {
          paymentAddedDate: editDate || editCommunity.paymentAddedDate,
          amountPaidToCommunity:
            formattedPaymentAmount || editCommunity.amountPaidToCommunity, // Use the formatted value
          paymentMode: editPaymentType || editCommunity.paymentMode,
          comment: editComments || editCommunity.comment,
        },
      };
      await axios(config).then(function (res) {
        if (res.status === 200) {
          console.log("success");
          alert("Added");
          window.location.reload();
        }
      });
    } catch (error) {
      console.log(error);
      alert("not able to complete");
    }
  };

  const fetchPayments = async () => {
    try {
      const communityId = data._id;
      const response = await axios.get(
        apiURL + `/getcommunitypayments/${communityId}`
      );
      if (response.status === 200) {
        setPayments(response.data?.paymentData);
        console.log("communityPayment", response.data?.paymentData);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    fetchPayments();
  }, []);


  const TOTAL_PENDING_AMOUNT =    Math.abs(data.communityData[0]?.oneCommunity - payments[0]?.amountPaidToCommunity);
  // console.log("TOTAL_PENDING_AMOUNT",TOTAL_PENDING_AMOUNT)
  return (
    <div className="row">
      <Header />

      <div className="row m-auto mt-2">
        <div className="col-md-12">
          <div className="card sticky">
            <div className="card-body">
              <div>
                <b> 1 Community &gt; {data?.appartmentname} </b>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row m-auto">
        <div className="col-md-12">
          <div className="d-flex float-end pt-3">
            <Link to="/community">
              <button
                className="btn-primary-button mx-2"
                onClick={handleClick(1)}
              >
                1 Community Add
              </button>
            </Link>

            <Link to="/community">
              <button onClick={handleClick(0)} className="btn-secondary-button">
                1 Community View
              </button>
            </Link>
          </div>
          {showEdit ? (
            <>
              <div className="card" style={{ marginTop: "62px" }}>
                <div
                  className="ps-4 pe-4 pt-3"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h4>Edit</h4>
                  <h4>
                    <i
                      class="fa-regular fa-circle-xmark"
                      title="Close"
                      style={{ cursor: "pointer" }}
                      onClick={() => setShowEdit(!showEdit)}
                    ></i>
                  </h4>
                </div>
                <div className="card-body p-4">
                  <form>
                    <div className="row">
                      <div className="col-md-4 pt-2">
                        <div className="vhs-input-label">
                          Payment Date
                          <span className="text-danger"> *</span>
                        </div>
                        <div className="group pt-1">
                          <input
                            type="date"
                            className="col-md-12 vhs-input-value"
                            defaultValue={editCommunity.paymentAddedDate}
                            onChange={(e) => setEditDate(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-4 pt-2">
                        <div className="vhs-input-label">
                          Amount
                          <span className="text-danger"> *</span>
                        </div>
                        <div className="group pt-1">
                          <input
                            type="text"
                            className="col-md-12 vhs-input-value"
                            defaultValue={editCommunity.amountPaidToCommunity}
                            onChange={(e) =>
                              setEditPaymentAmount(e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="col-md-4 pt-2">
                        <div className="vhs-input-label">Payment Mode</div>
                        <div className="group pt-1">
                          <select
                            className="col-md-12 vhs-input-value"
                            onChange={(e) => setEditPaymentType(e.target.value)}
                            defaultValue={editCommunity.paymentMode}
                          >
                            <option value="">--select--</option>
                            <option value="Cash">Cash</option>
                            <option value="Cheque">Cheque</option>
                            <option value="Card">Card</option>
                            <option value="Paytm">Paytm</option>
                            <option value="Phonepay">Phonepay</option>
                            <option value="Googlepay">Googlepay</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-4 pt-2">
                        <div className="vhs-input-label">Comment</div>
                        <div className="group pt-1">
                          <textarea
                            className="col-md-12 vhs-input-value"
                            onChange={(e) => setEditComments(e.target.value)}
                            rows={3}
                            cols={6}
                            defaultValue={editCommunity.comment}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row pt-3 justify-content-center">
                      <div className="col-md-2">
                        <button className="vhs-button" onClick={updatePayment}>
                          Update
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="card" style={{ marginTop: "62px" }}>
                <div className="card-body p-4">
                  <form>
                    <div className="row">
                      <h5>Add</h5>
                      <div className="col-md-4 pt-2">
                        <div className="vhs-input-label">
                          Payment Date
                          <span className="text-danger"> *</span>
                        </div>
                        <div className="group pt-1">
                          <input
                            type="date"
                            className="col-md-12 vhs-input-value"
                            onChange={(e) => setDate(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-4 pt-2">
                        <div className="vhs-input-label">
                          Amount
                          <span className="text-danger"> *</span>
                        </div>
                        <div className="group pt-1">
                          <input
                            type="text"
                            className="col-md-12 vhs-input-value"
                            onChange={(e) => setPaymentAmount(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-4 pt-2">
                        <div className="vhs-input-label">Payment Mode</div>
                        <div className="group pt-1">
                          <select
                            className="col-md-12 vhs-input-value"
                            onChange={(e) => setPaymentType(e.target.value)}
                          >
                            <option value="">--select--</option>
                            <option value="Cash">Cash</option>
                            <option value="Cheque">Cheque</option>
                            <option value="Card">Card</option>
                            <option value="Paytm">Paytm</option>
                            <option value="Phonepay">Phonepay</option>
                            <option value="Googlepay">Googlepay</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-4 pt-2">
                        <div className="vhs-input-label">Comment</div>
                        <div className="group pt-1">
                          <textarea
                            className="col-md-12 vhs-input-value"
                            onChange={(e) => setComments(e.target.value)}
                            rows={3}
                            cols={6}
                          />
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
                  </form>
                </div>
              </div>
            </>
          )}
          <div className="mt-5 vhs-sub-heading">1 Community Payment</div>
          <table class="table table-hover table-bordered mt-1">
            <thead className="">
              <tr className="table-secondary">
                <th className="table-head" scope="col">
                  Sr
                </th>
                <th className="table-head" scope="col" style={{ width: "16%" }}>
                  Date
                </th>
                <th className="table-head" scope="col">
                  Amount
                </th>
                <th scope="col" className="table-head">
                  Payment Mode
                </th>
                <th scope="col" className="table-head">
                  Comment
                </th>
                <th scope="col" className="table-head">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={index} className="user-tbale-body">
                  <td style={{ textAlign: "center" }}>{index + 1} </td>
                  <td style={{ textAlign: "center" }}>
                    {payment.paymentAddedDate
                      ? new Date(Date.parse(payment.paymentAddedDate))
                          .toISOString()
                          .substring(0, 10)
                      : ""}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {payment.amountPaidToCommunity}
                  </td>
                  <td style={{ textAlign: "center" }}>{payment.paymentMode}</td>
                  <td style={{ textAlign: "center" }}>{payment.comment}</td>
                  <td style={{ textAlign: "center" }}>
                    <span
                      title="Delete"
                      style={{ color: "#a9042e", cursor: "pointer" }}
                      onClick={() => deletePayment(payment._id)} // Pass the correct payment id here
                    >
                      <i className="fa-solid fa-trash-can"></i> Delete
                    </span>{" "}
                    {/* /{" "}
                    <span
                      title="Edit"
                      style={{ color: "#ffca00", cursor: "pointer" }}
                      onClick={() => handleEdit(payment)} // Pass the correct payment object here
                    >
                      <i className="fa-solid fa-pen"></i> Edit{" "}
                    </span> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>{" "}
          <div className="mt-3 vhs-sub-heading">1 Community Payment</div>
          <div className="row" style={{ textAlign: "end" }}>
            <div className="col-md-12">
              <div className="vhs-desc">
                TOTAL 1 COMMUNITY AMOUNT :
                 {data.communityData[0]?.oneCommunity}{" "}
              </div>
              <div className="vhs-desc">
                TOTAL PAID AMOUNT : {payments[0]?.amountPaidToCommunity}
              </div>
              <div className="vhs-sub-heading pt-2">
                TOTAL PENDING AMOUNT : {TOTAL_PENDING_AMOUNT}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Communitypayment;