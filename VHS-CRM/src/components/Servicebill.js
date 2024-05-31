import React, { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import axios from "axios";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { da } from "date-fns/locale";
import numberToWords from "number-to-words";

function Servicebill() {
  const [tcdata, settcdata] = useState([]);
  const [headerimgdata, setheaderimgdata] = useState([]);
  const [footerimgdata, setfooterimgdata] = useState([]);
  const [bankdata, setbankdata] = useState([]);
  const [treatmentdata, settreatmentdata] = useState([]);
  const location = useLocation();
  const { data, } = location.state || null;

  const apiURL = process.env.REACT_APP_API_URL;
  const imgURL = process.env.REACT_APP_IMAGE_API_URL;

  // const [section2data, setsection2data] = useState([]);
  const [termsAndCondition, setTemsAndCondition] = useState([]);

  useEffect(() => {
    gettermsgroup();
  }, [data]);

  const gettermsgroup = async () => {
    let res = await axios.get(apiURL + "/master/gettermgroup");
    if (res.status === 200) {
      setTemsAndCondition(res.data?.termsgroup);
      const invoicType = res.data?.termsgroup.filter(
        (i) => i.type === "INVOICE"
      );
      const filterByCategory = invoicType.filter(
        (item) => item.category === data.category
      );
      settcdata(filterByCategory);
    }
  };

  let i = 1;

  useEffect(() => {
    getheaderimg();
    getfooterimg();
    getbank();

    // gettermsgroup2();
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

  const date = new Date(data?.creatAt);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDate = date.toLocaleString("en-US", options);

  const decimalValue = parseInt(data?._id, 16);

  // Get the last 5 digits
  const last5Digits = decimalValue % 100000;
  return (
    <div >
      {/* <Header />s */}

      <div className="row justify-content-center mt-3">
        <div className="col-md-12">
          <div
            className="card shadow  bg-white rounded"
            style={{ border: "none" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ marginLeft: "10px", display: "flex" }}>
                <img
                  src="/images/vhs.png"
                  style={{ width: "100PX", height: "100px" }}
                />
                <h6 className="nameinvoice">VIJAY HOME SERVICES</h6>
              </div>
              <div className="p-1">
                <h2>GST INVOICE</h2>
                <p>Original For Recipient</p>
                <p>
                  <b>Invoice No: VHS-{last5Digits}  <br />Date :</b> {formattedDate}
                </p>
              </div>
            </div>

            <div className=" col-12 mt-2 " style={{ display: "flex", gap: "10px" }}>
              <div className="col-6 b-col">
                <div className="" style={{ fontWeight: "bold" }}>
                  BILLED BY
                </div>
                <div className="" style={{ fontWeight: "bold" }}>
                  Vijay Home Services
                </div>
                <p>
                  #1/1, 2nd Floor, Shamraj building MN Krishnarao Road Mahadevapura Outer Ring Road, Banglore 560048
                </p>
                <p>GSTN : 29EIXPK0545M1ZE</p>
              </div>
              <div className="col-6 b-col" >
                <div className="" style={{ fontWeight: "bold" }}>
                  BILLED TO
                </div>

                <h5>{data?.customerData[0]?.customerName}</h5>
                <p className="mb-0">
                  {data?.deliveryAddress?.platNo},
                  {data?.deliveryAddress?.address}
                  {data?.deliveryAddress?.landmark}
                </p>
                <p className="mb-0">{data?.customerData[0]?.mainContact}</p>

              </div>
            </div>

            <div className="row m-auto mt-2 w-100">
              <div className="col-md-12">
                <table class="">
                  <thead>
                    <tr className="hclr">
                      <th className="text-center">S.No</th>
                      <th className="text-center">Category</th>
                      <th className="text-center">Description</th>
                      <th className="text-center">Contract</th>
                      <th className="text-center">Service Date</th>
                      {/* <th className="text-center">Amount Paid Date</th> */}

                      <th className="text-center">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td scope="row" className="text-center " style={{ border: "1px solid grey" }}>
                        {i++}
                      </td>
                      <td scope="row" className="text-center" style={{ border: "1px solid grey" }}>
                        {data.category}
                      </td>
                      <td scope="row" className="text-center " style={{ border: "1px solid grey" }}>
                        {data.desc}
                      </td>

                      <td className="text-center" style={{ border: "1px solid grey" }}>{data?.contractType}</td>
                      {data?.contractType === "AMC" ? (
                        <td className="text-center" style={{ border: "1px solid grey" }}>
                          {data?.dividedDates?.map((item) => (
                            <div>
                              <p className="text-center">
                                {new Date(item.date).toLocaleDateString()}
                              </p>
                            </div>
                          ))}
                          {/* <div>
                            <p className="text-center">
                              }
                            </p>
                          </div> */}

                        </td>
                      ) : (
                        <td className="text-center" style={{ border: "1px solid grey" }}>{data?.dateofService}</td>
                      )}

                      {/* {data?.contractType === "AMC" ? (
                        <td className="text-center" style={{ border: "1px solid grey" }}>
                          {data.dividedamtDates.map((item) => (
                            <div>
                              <p className="text-end">
                                {new Date(item.date).toLocaleDateString()}
                              </p>
                            </div>
                          ))}
                        </td>
                      ) : (
                        <td className="text-center" style={{ border: "1px solid grey" }}>{data?.dateofService}</td>
                      )} */}

                      {data?.contractType === "AMC" ? (
                        <td className="text-center" style={{ border: "1px solid grey" }}>
                          {data?.dividedamtCharges?.map((item) => (
                            <div>
                              <p className="text-end">{((item?.charge) / 105 * 100).toFixed(2)}</p>
                            </div>
                          ))}
                        </td>
                      ) : (
                        <td className="text-center" style={{ border: "1px solid grey" }}>{((data.GrandTotal / 105) * 100).toFixed(2)}</td>
                      )}
                    </tr>
                  </tbody>
                </table>



              </div>
            </div>


            <div className="row">


              <div className="col-sm-6 mt-4" style={{ paddingLeft: "25px" }}>
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

              <div className="col-sm-6">

                <div className="row mt-4">


                  <div className="" style={{ textAlign: "end", paddingRight: "50px" }}>
                    <h6> GST(5%):{(data.GrandTotal - (data.GrandTotal / 105) * 100).toFixed(2)}</h6>

                    <h5 >Total : {data.GrandTotal}</h5>   </div>
                  <div style={{ textAlign: "end", paddingRight: "50px" }}>
                    <h5> Amount In Words :{" "}
                      <span style={{ fontWeight: 400 }}>
                        {numberToWords.toWords(data.serviceCharge) + " Only"}
                      </span></h5>
                  </div>
                </div>
              </div>
            </div>


            {tcdata.map((item) => (
              <div>
                <div
                  className="row m-auto mt-3"
                  style={{
                    backgroundColor: "#a9042e",
                    color: "white",
                    fontWeight: "bold",
                    justifyContent: "center",
                    padding: "8px",
                  }}
                >
                  {item.header}
                </div>
                <table class="table table-bordered border-danger">
                  <tbody>
                    <tr>
                      <td scope="row">
                        <div class="form-check">
                          <div className="mt-2">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item.content,
                              }}
                            />
                          </div>
                        </div>
                      </td>
                      {/* <td className="">{item.content}</td> */}
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>
          <div>
            {footerimgdata.map((item) => (
              <div className="col-md-12">
                <img
                  src={"https://api.vijayhomeservicebengaluru.in/quotationfooterimg/" + item.footerimg}
                  height="auto"
                  width="100%"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Servicebill;
