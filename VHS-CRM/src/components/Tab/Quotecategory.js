import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import Quotenav from "../Quotenav";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Table } from "react-bootstrap";

function Quotecategory() {
  const [categorydata, setcategorydata] = useState([]);
  // const [quote, setquote] = useState([]);
  const apiURL = process.env.REACT_APP_API_URL;
  const [search, setsearch] = useState("");
  const [quotedata, setquotedata] = useState([]);
  const [enquirydata, setenquirydata] = useState([]);
  const [data, setdata] = useState([]);

  console.log("data---", data);

  useEffect(() => {
    getcategory();
    getquote();
    getenquiryadd();
    getallquote();
  }, []);

  const getcategory = async () => {
    let res = await axios.get(apiURL + "/getcategory");
    if ((res.status = 200)) {
      setcategorydata(res.data?.category);
    }
  };

  const getallquote = async () => {
    let res = await axios.get(apiURL + "/getallquote");
    if ((res.status = 200)) {
      setdata(res.data?.quote);
    }
  };
  const getquote = async () => {
    let res = await axios.get(apiURL + "/getquote");
    if ((res.status = 200)) {
      setquotedata(res.data?.quote);
    }
  };
  const getenquiryadd = async () => {
    let res = await axios.get(apiURL + "/getenquiry");
    if ((res.status = 200)) {
      setenquirydata(res.data?.enquiryadd);
    }
  };

  let i = 1;
  return (
    <div className="web">
      <Header />
      {/* <Quotenav /> */}
      <div className="mt-t p-3">
        <ul className="nav-tab-ul">
          <li>
            <NavLink to="/quotecategory" activeClassName="active">
              Quote List
            </NavLink>
          </li>
          <li>
            <NavLink to="/quotesearch" activeClassName="active">
              Quote Search
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="row m-auto">
        <div className="col-md-12">
          <div className="card" style={{ marginTop: "30px" }}>
            <div className="card-body p-3">
              <div className="vhs-sub-heading pb-2"></div>
              <form>
                <div className="row">
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Category <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <select
                        className="col-md-12 vhs-input-value"
                        value={search}
                        onChange={(e) => setsearch(e.target.value)}
                      >
                        <option>-select-</option>
                        {categorydata.map((i) => (
                          <option>{i.category}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <table
            class="table table-hover table-bordered mt-1"
            style={{ width: "113%" }}
          >
            <thead>
              <tr>
                <th>#</th>
                <th>Enq Category</th>
                <th>Enq date</th>
                <th>Q ID</th>
                <th>Q Dt-Tm</th>
                <th>Name</th>
                <th>Contact No.</th>
                <th>Address</th>
                <th>City</th>
                <th>Services</th>
                <th>Q Amt</th>
                <th>Executive</th>
                <th>Last F/W Dt</th>
                <th> Nxt F/W Dt</th>
                <th>Description</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr className="user-tbale-body">
                  <td>{i++}</td>
                  <td>{item.enquirydata[0]?.category}</td>
                  <td>{item.enquirydata[0]?.date}</td>
                  <td></td>
                  <td>
                    {item.date} <br />
                    {item.time}
                  </td>
                  <td>{item.enquirydata[0]?.name}</td>
                  <td>{item.enquirydata[0]?.mobile}</td>
                  <td>{item.enquirydata[0]?.address}</td>

                  <td>{item.enquirydata[0]?.city}</td>
                  <td> {item.enquirydata[0]?.intrestedfor}</td>
                  <td>{item.SUM}</td>

                  <td>{item.enquirydata[0]?.technicianname}</td>

                  <td>
                    {item.enquirydata.map((a) => a.enquirydetails[0]?.nxtfoll)}
                  </td>
                  <td>
                    {" "}
                    {item.enquirydata.map((a) => a.enquirydetails[0]?.nxtfoll)}
                  </td>
                  <td>{item.enquirydata[0]?.comment}</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Quotecategory;
