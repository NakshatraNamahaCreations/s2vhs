import React, { useState, useEffect } from "react";
import Header from "../components/layout/Header";

import axios from "axios";
import Table from "react-bootstrap/Table";
import { NavLink } from "react-router-dom";

function Quotesearch() {
  const [citydata, setcitydata] = useState([]);
  const [enquiryadddata, setenquiryadddata] = useState([]);
  const [name, setname] = useState("");
  const [fromdate, setfromdate] = useState("");
  const [todate, settodate] = useState("");
  const [city, setcity] = useState("");
  const [contact, setcontact] = useState("");
  const [status, setstatus] = useState("");
  const [executive, setexecutive] = useState("");
  const [category, setcategory] = useState("");
  const [filterdata, setfilterdata] = useState([]);
  const [categorydata, setcategorydata] = useState([]);
  const apiURL = process.env.REACT_APP_API_URL;

  const getcategory = async () => {
    let res = await axios.get(apiURL + "/getcategory");
    if (res.status === 200) {
      setcategorydata(res.data?.category);
    }
  };
  useEffect(() => {
    getcity();
    getenquiryadd();
    getcategory();
  }, []);

  const getcity = async () => {
    let res = await axios.get(apiURL + "/master/getcity");
    if (res.status === 200) {
      setcitydata(res.data?.mastercity);
    }
  };
  const getenquiryadd = async () => {
    let res = await axios.get(apiURL + "/getenquiry");
    if (res.status === 200) {
      setenquiryadddata(res.data?.enquiryadd);
    }
  };

  useEffect(() => {
    const result = enquiryadddata.filter((item) => {
      return (
        item.name.toLowerCase().match(name.toLowerCase()) &&
        item.city.toLowerCase().match(city.toLowerCase()) &&
        item.executive.toLowerCase().match(executive.toLowerCase())
      );
    });
    setfilterdata(result);
  }, [name, city, contact, executive]);

  let i = 0;
  return (
    <div className="web">
      <Header />
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
          <div className="card" style={{ marginTop: "20px" }}>
            <div className="card-body p-4">
              <div className="vhs-sub-heading pb-2">Enquiry Search :</div>
              <form>
                <div className="row">
                  <div className="col-md-4">
                    <div className="vhs-input-label">Name</div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setname(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label">From Date</div>
                    <div className="group pt-1">
                      <input
                        type="date"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setfromdate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label"> To Date</div>
                    <div className="group pt-1">
                      <input
                        type="date"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => settodate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">
                      Contact
                      <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setcontact(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">City</div>
                    <div className="group pt-1">
                      <select
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setcity(e.target.value)}
                      >
                        <option>--select--</option>
                        {citydata.map((item) => (
                          <option value={item.value}>{item.city}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">Category</div>
                    <div className="group pt-1">
                      <select
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setcategory(e.target.value)}
                      >
                        <option>--select--</option>
                        {categorydata.map((i) => (
                          <option value={i.category}>{i.category}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label"> Executive</div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setexecutive(e.target.value)}
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
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Time</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Address</th>
                <th>Reference1</th>
                <th>Reference2</th>
                <th>Reference3</th>
                <th>City</th>

                <th>Interested for</th>
                <th>Executive</th>
              </tr>
            </thead>
            <tbody>
              {filterdata.map((item) => (
                <tr>
                  <td>{i++}</td>
                  <td>{item.enquirydate}</td>
                  <td>{item.time}</td>
                  <td>{item.name}</td>
                  <td>{item.mobile}</td>
                  <td>{item.address}</td>
                  <td>{item.reference1}</td>
                  <td>{item.reference2}</td>
                  <td>{item.reference3}</td>
                  <td>{item.city}</td>
                  <td>{item.intrestedfor}</td>
                  <td>{item.executive}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Quotesearch;
