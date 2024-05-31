import React, { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import axios from "axios";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { da } from "date-fns/locale";
import numberToWords from "number-to-words";

function Paymentinvoice() {
  const [tcdata, settcdata] = useState([]);
  const [headerimgdata, setheaderimgdata] = useState([]);
  const [footerimgdata, setfooterimgdata] = useState([]);
  const [bankdata, setbankdata] = useState([]);
  const [treatmentdata, settreatmentdata] = useState([]);
  const [charge, setcharge] = useState("");
  const location = useLocation();
  const { data, data1 } = location.state || null;

  const apiURL = process.env.REACT_APP_API_URL;
  const imgURL = process.env.REACT_APP_IMAGE_API_URL;

  const [section2data, setsection2data] = useState([]);

  useEffect(() => {
    gettermsgroup();
  }, []);

  const gettermsgroup = async () => {
    let res = await axios.get(apiURL + "/master/gettermgroup");
    if (res.status === 200) {
      settcdata(res.data?.termsgroup);
    }
  };
  const gettermsgroup2 = async () => {
    let res = await axios.get(apiURL + "/master/gettermgroup2");
    if (res.status === 200) {
      setsection2data(res.data?.termsgroup2);
    }
  };

  let i = 1;

  useEffect(() => {
    getheaderimg();
    getfooterimg();
    getbank();

    gettermsgroup2();
  }, []);

  const getheaderimg = async () => {
    let res = await axios.get(apiURL + "/master/getheaderimg");
    if (res.status === 200) {
      setheaderimgdata(res.data?.headerimg);
    }
  };

  const getfooterimg = async () => {
    let res = await axios.get(apiURL + "/master/getfooterimg");
    if (res.status === 200) {
      setfooterimgdata(res.data?.footerimg);
    }
  };

  const getbank = async () => {
    let res = await axios.get(apiURL + "/getbank");
    if (res.status === 200) {
      setbankdata(res.data?.bankacct);
    }
  };
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="row mb-4">
      {/* <Header />s */}

      <div className="row justify-content-center mt-3">
        <div className="col-md-11">
          <div
            className="card shadow  bg-white rounded"
            style={{ border: "none" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                {headerimgdata.map((item) => (
                  <img
                    src={imgURL + "/quotationheaderimg/" + item.headerimg}
                    height="120px"
                  />
                ))}
              </div>
              <div className="p-1">
                <h2>GST INVOICE</h2>
                <p>Original For Recipient</p>
                <p>
                  <b>Invoice# , Date :</b> {moment().format("DD-MM-YYYY")}
                </p>
              </div>
            </div>

            <div className="d-flex  mt-2">
              <div className=" b-col">
                <div className="" style={{ fontWeight: "bold" }}>
                  BILLED BY
                </div>
                <div className="" style={{ fontWeight: "bold" }}>
                  Vijay Home Services
                </div>
                <p>
                  #21, 4th Cross. Baddi Krishnappa Layout, Near Gangama Temple
                  Road, Mahadevpura Outer Ring Road, Bangalore - 560048
                </p>
              </div>
              <div className=" b-col" style={{ marginLeft: "9px" }}>
                <div className="" style={{ fontWeight: "bold" }}>
                  BILLED TO
                </div>

                <h5>{data?.customerData[0]?.customerName}</h5>
                <p className="mb-0">
                  {data?.customerData[0]?.lnf}
                  {data?.customerData[0]?.rbhf}
                  {data?.customerData[0]?.mainArea}
                  {data?.customerData[0]?.pinCode}
                </p>
                <p className="mb-0">{data?.customerData[0]?.mainContact}</p>
                <b> GSTIN</b>
              </div>
            </div>

            <div className="row m-auto mt-2 w-100">
              <div className="col-md-12">
                <table class="table table-bordered border-danger">
                  <thead>
                    <tr className="hclr">
                      <th className="text-center">S.No</th>
                      <th className="text-center">Description</th>
                      <th className="text-center">Contract</th>
                      {/* <th className="text-center">Service Date</th> */}
                      <th className="text-center">Payment Date</th>

                      <th className="text-center">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td scope="row" className="text-center">
                        {i++}
                      </td>
                      <td scope="row" className="text-center">
                        {data.desc}
                      </td>

                      <td className="text-center">{data?.contractType}</td>

                      {data?.contractType === "AMC" ? (
                        <td className="text-center">{data1}</td>
                      ) : (
                        <td>{data?.dateofService}</td>
                      )}

                      {data?.contractType === "AMC" ? (
                        <td className="text-center">
                          {data.dividedamtCharges.length > 0 && (
                            <div>
                              <p>{data.dividedamtCharges[0].charges}</p>
                            </div>
                          )}
                        </td>
                      ) : (
                        <td>{data?.serviceCharge}</td>
                      )}
                    </tr>
                  </tbody>
                </table>
                <div className="float-end px-1">
                  <h5>
                    Total :{" "}
                    {data.dividedamtCharges.length > 0 && (
                      <>
                        <>{data.dividedamtCharges[0].charge}</>
                      </>
                    )}
                  </h5>
                </div>
              </div>
            </div>
            <div className="text-end px-2" style={{ fontWeight: "bold" }}>
              Amount In Words :{" "}
              <span style={{ fontWeight: 400 }}>
                {data.dividedamtCharges.length > 0 && (
                  <>
                    {numberToWords.toWords(data.dividedamtCharges[0].charge) +
                      " Only"}
                  </>
                )}
              </span>
            </div>

            <div className="p-3">
              <h3>Terms & Conditions</h3>
              <ul>
                <li>100% Payment Post Work Completion Immediately.</li>
                <li>In Cleaning Any Hard Stain Will Not Be Resolved 100%.</li>
                <li>
                  If Any Compliant On Service Quality, Customer Need To Notify
                  Within 24 Hours.
                </li>
                <li>
                  Customer Need To Verify The Work Before Service Team Leaves
                  The Premises.
                </li>
                <li>
                  For GPC Warranty Would Be 90 Days From The Date Of First
                  Service.
                </li>
                <li>
                  For BBMS Warranty Would Be 60 Days From The Date Of First
                  Service.
                </li>

                <li>
                  In Case Of Any Renovation Happened In The Premises Then The
                  Warranty Will Not Be Applicable.{" "}
                </li>
                <li>
                  Result Of Pest Control Service Is Based On Weather Variation,
                  House Maintenance And House Surrounding Environments.
                </li>
                <li>
                  This Is A Computer Generated Invoice, No Need Of Signature.
                </li>
              </ul>
            </div>
            <div className="mx-5">
              <div>
                <div className="" style={{ fontWeight: "bold" }}>
                  BANK DETAILS
                </div>
              </div>

              {bankdata.map((item) => (
                <div>
                  <div className="pt-2" style={{ fontWeight: "bold" }}>
                    Account Name :{" "}
                    <span style={{ color: "black", fontWeight: 400 }}>
                      {item.accname}
                    </span>
                  </div>

                  <div className="" style={{ fontWeight: "bold" }}>
                    Account Number :{" "}
                    <span style={{ color: "black", fontWeight: 400 }}>
                      {item.accno}
                    </span>
                  </div>

                  <div className="" style={{ fontWeight: "bold" }}>
                    IFSC :{" "}
                    <span style={{ color: "black", fontWeight: 400 }}>
                      {item.ifsccode}
                    </span>
                  </div>

                  <div className="" style={{ fontWeight: "bold" }}>
                    BANK NAME :{" "}
                    <span style={{ color: "black", fontWeight: 400 }}>
                      {item.bankname}
                    </span>
                  </div>
                  <div className="" style={{ fontWeight: "bold" }}>
                    Branch Name :{" "}
                    <span style={{ color: "black", fontWeight: 400 }}>
                      {item.branch}
                    </span>
                  </div>

                  <div className="mt-3" style={{ fontWeight: "bold" }}>
                    Gpay / Phonepe Details
                  </div>

                  <div className="pb-3" style={{ fontWeight: "bold" }}>
                    Mobile No. :{" "}
                    <span style={{ color: "black", fontWeight: 400 }}>
                      {item.upinumber}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="row pt-3 justify-content-center">
        <div className="col-3">
          <button className="vhs-button">Send Invoice</button>
        </div>
        <div className="col-3">
          <button className="vhs-button" onClick={handlePrint}>
            Print
          </button>
        </div>
      </div>
    </div>
  );
}

export default Paymentinvoice;
