

import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import axios from "axios";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { da } from "date-fns/locale";
import { toWords } from "number-to-words";
import { filledInputClasses } from "@mui/material";

function Quotationterm() {
  const [tcdata, settcdata] = useState([]);
  const [headerimgdata, setheaderimgdata] = useState([]);
  const [footerimgdata, setfooterimgdata] = useState([]);
  const [bankdata, setbankdata] = useState([]);
  const [materialdata, setmaterialdata] = useState([]);
  const location = useLocation();
  const { data } = location.state || null;

  const apiURL = process.env.REACT_APP_API_URL;
  const imgURL = process.env.REACT_APP_IMAGE_API_URL;

  const [section2data, setsection2data] = useState([]);
  const [filtcdata, setfiltcdata] = useState([]);
  const [filsecdata, setsec2data] = useState([]);

  useEffect(() => {
    const gettermsgroup = async () => {
      try {
        const response = await axios.get(apiURL + "/master/gettermgroup");
        if (response.status === 200) {
          settcdata(response.data?.termsgroup);
          console.log("res.data?.termsgroup", response.data?.termsgroup);
        }
      } catch (error) {
        console.error("Error fetching termsgroup:", error);
        // Handle the error as needed
      }
    };

    gettermsgroup();
  }, [data, /* Add any other dependencies here */]);
  const gettermsgroup2 = async () => {
    let res = await axios.get(apiURL + "/master/gettermgroup2");
    if ((res.status = 200)) {
      setsection2data(res.data?.termsgroup2);
    }
  };

  useEffect(() => {

      const uniqueCategories = [
        ...new Set(data[0].treatmentdetails.map((item) => item.category)),
      ];

   

      const filteredTcdata = tcdata.filter((item) =>
        uniqueCategories.includes(item.category)
      );
      const filteredsec2data = section2data.filter((item) =>
        uniqueCategories.includes(item.category)
      );

      setfiltcdata(filteredTcdata);
      setsec2data(filteredsec2data);
   
  }, [data,tcdata]);

  let i = 1;

  useEffect(() => {
    getheaderimg();
    getfooterimg();
    getbank();
    postallmaterial();
    gettermsgroup2();
  }, []);

  const getheaderimg = async () => {
    let res = await axios.get(apiURL + "/master/getheaderimg");
    if ((res.status = 200)) {
      setheaderimgdata(res.data?.headerimg);
    }
  };

  const getfooterimg = async () => {
    let res = await axios.get(apiURL + "/master/getfooterimg");
    if ((res.status = 200)) {
      setfooterimgdata(res.data?.footerimg);
    }
  };

  const getbank = async () => {
    let res = await axios.get(apiURL + "/getbank");
    if ((res.status = 200)) {
      setbankdata(res.data?.bankacct);
    }
  };
  const postallmaterial = async () => {
    let res = await axios.get(apiURL + "/master/getamaterial");
    if ((res.status = 200)) {
      setmaterialdata(res.data?.amaterial);
    }
  };

  function calculatebenefit(ml) {
    const a = materialdata.filter((i) => i.material === ml);
    const benfite = a[0]?.benefits;

    return benfite;
  }

  
  function calculateTotalPrice(data) {
    let totalPrice = 0;
    for (let i = 0; i < data?.length; i++) {
      totalPrice += parseInt(data[i].subtotal);
    }
    return totalPrice;
  }
  const total = calculateTotalPrice(data[0]?.treatmentdetails);

  const dataType = parseInt(data[0]?.quotedata[0]?.netTotal);

  const netTotal = isNaN(dataType) ? 0 : dataType;
  let netTotalInWords = "";

  if (typeof netTotal === "number" && isFinite(netTotal)) {
    netTotalInWords = toWords(netTotal).replace(/,/g, ""); // Remove commas
  }

  const a = ['','One ','Two ','Three ','Four ', 'Five ','Six ','Seven ','Eight ','Nine ','Ten ','Eleven ','Twelve ','Thirteen ','Fourteen ','Fifteen ','Sixteen ','Seventeen ','Eighteen ','Nineteen '];
  const b = ['', '', 'Twenty','Thirty','Forty','Fifty', 'Sixty','Seventy','Eighty','Ninety'];
  
  const inWords = (num) => {
    if ((num = num.toString()).length > 9) return 'overflow';
    const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return '';
    let str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
    // str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'Only ' : '';
   
    return str;
  };
  const [words, setWords] = useState('');
 
 console.log("wordsing",words)

  useEffect(() => {
    setWords(inWords(netTotal));
   
  }, [data])
  
  return (
    <div className="row">
      {/* <Header /> */}

      <div className="row justify-content-center mt-3">
        <div className="col-md-12">
          <div
            className="card shadow  bg-white rounded"
            style={{ border: "none" }}
          >
            {headerimgdata.map((item) => (
              <img
                src={"https://api.vijayhomeservicebengaluru.in/quotationheaderimg/" + item.headerimg}
                height="200px"
              />
            ))}

            <div className="q-row2">QUOTATION</div>

            <div className="d-flex m-auto mt-2 w-100">
              <div className=" b-col">
                <div className="" style={{ fontWeight: "bold" }}>
                  TO
                </div>
                <div className="" style={{ fontWeight: "bold" }}>
                  {data[0]?.name}
                </div>
                <p>
                  {data[0]?.address} <br />
                  {data[0]?.mobile}
                  <br />
                  {data[0]?.email}
                </p>
              </div>
              <div className=" b-col">
                <div className="" style={{ fontWeight: "bold" }}>
                  Quote#{" "}
                  <span style={{ color: "black", fontWeight: 400 }}>
                    {" "}
                    {data[0]?.quotedata[0]?.quoteId}
                  </span>
                </div>

                <div className="" style={{ fontWeight: "bold" }}>
                  Date :{" "}
                  <span style={{ color: "black", fontWeight: 400 }}>
                    {moment().format("L")}
                  </span>
                </div>

                <div className="" style={{ fontWeight: "bold" }}>
                  Project Type :{" "}
                  <span style={{ color: "black", fontWeight: 400 }}>
                    {data[0]?.quotedata[0]?.projectType}
                  </span>
                </div>

                <div className="" style={{ fontWeight: "bold" }}>
                  Sales Manager :
                  <span style={{ color: "black", fontWeight: 400 }}>
                    {data[0]?.quotedata[0]?.salesExecutive}
                  </span>
                </div>

                <div className="" style={{ fontWeight: "bold" }}>
                  Contact :{" "}
                  <span style={{ color: "black", fontWeight: 400 }}>
                    {data[0]?.quotedata[0]?.exenumber}
                  </span>
                </div>
              </div>
            </div>

            <div className="row m-auto mt-2 w-100">
              <div className="col-md-12">
                <table class="table table-bordered border-danger">
                  <thead
                    style={{
                      backgroundColor: "#a9042e",
                      color: "white",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col">Category</th>
                      <th scope="col">Scope Of Job </th>
                      <th scope="col">Qty/Sqft</th>
                      <th scope="col">Rate</th>
                      <th scope="col">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data[0]?.treatmentdetails.map((item) => (
                      <tr>
                        <th scope="row">{i++}</th>
                        <th scope="row">{item.category}</th>

                        <td>
                          <div className="" style={{ fontWeight: "bold" }}>
                            {item.region}
                            <div>{item.job.split("\n")
                              .map((item, index) => (
                                <p key={index}>{item}</p>
                              ))}</div>
                          </div>
                          <div>
                            <b>Note:</b>
                            {item.note}
                          </div>
                          <div>
                            <b>Benefits:</b>
                            {calculatebenefit(item.material)
                              ?.split("\n")
                              .map((item, index) => (
                                <p key={index}>{item}</p>
                              ))}
                          </div>
                        </td>

                        <td className="text-center">{item.qty}</td>
                        <td className="text-center">{item.rate}</td>
                        <td className="text-center"> {item.subtotal}</td>
                      </tr>
                    ))}
                    <tr>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>

                      <th scope="col" className="text-center">
                        {total}
                      </th>
                    </tr>
                  </tbody>
                </table>

                <div className="row">
                  <div className="col-sm-6">
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


                    <div
                      className="row  "
                      style={{ justifyContent: "flex-end", marginTop: "10px" }}
                    >
                      <div style={{ display: "flex", justifyContent: "end" }}>
                        <div className="col-4">
                          <h6 style={{ textAlign: "right" }}>Gst(5%) :</h6>
                        </div>
                       
                        <div className="col-4" style={{ textAlign: "right" }}>
                          {data[0]?.quotedata[0]?.GST == true ? (
                            <h6>{(total * 0.05).toFixed(2)}</h6>
                          ) : (
                            <>0</>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row " style={{ justifyContent: "flex-end" }}>
                      <div className="col-4">
                        <h6 style={{ textAlign: "right" }}>Adjustment :</h6>
                      </div>
                
                      <div className="col-4" style={{ textAlign: "right" }}>
                        {data[0]?.quotedata[0]?.adjustments ? (
                          <h6>{data[0]?.quotedata[0]?.adjustments}</h6>
                        ) : (
                          <>0</>
                        )}
                      </div>
                    </div>

                    <div className="row " style={{ justifyContent: "flex-end" }}>
                      <div style={{ display: "flex", justifyContent: "end" }}>
                        <div className="col-4">
                          <h6 style={{ textAlign: "right", fontWeight: "bold",fontSize:"20px" }}>
                            {" "}
                            Total :
                          </h6>
                        </div>
                        <div className="col-4" style={{ textAlign: "right" }}>
                          <h6 style={{fontSize:"20px"}}>
                            <b>{data[0]?.quotedata[0]?.netTotal}</b>
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div
                    className="text-center"
                    style={{
                      fontWeight: "bold",
                      paddingTop: "23px",
                      float: "inline-end",
                    }}
                  >
                    In Words :{" "}
                    <span style={{ fontWeight: 400 }}>
                      {netTotalInWords !== "" ? (
                        <>
                          {words+"Only"}
                          {/* {netTotalInWords.charAt(0).toUpperCase() +
                            netTotalInWords.slice(1)} */}
                        </>
                      ) : (
                        <>{data[0]?.quotedata[0]?.netTotal}</>
                      )}
                    </span>
                  </div>
                  </div>
                 
                </div>
              </div>
            </div>
            {filtcdata.map((item) => (
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
            <div>
              {filsecdata.map((item) => (
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
                      <div className="mt-2">
                        <div
                          dangerouslySetInnerHTML={{ __html: item.content }}
                        />
                      </div>
                    </tbody>
                    <hr />
                  </table>
                </div>
              ))}
            </div>

          </div>
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
  );
}

export default Quotationterm;
