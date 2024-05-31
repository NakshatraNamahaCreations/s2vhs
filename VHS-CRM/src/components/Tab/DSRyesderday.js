import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import DSRnav from "../DSRnav";
import { Link } from "react-router-dom";
import axios from "axios";

function DSRtoday() {
  const [treatmentdata, settreatmentdata] = useState([]);
  const apiURL = process.env.REACT_APP_API_URL;


  const currentDate = new Date();
  const yesterdayDate = new Date(currentDate);
  yesterdayDate.setDate(currentDate.getDate() - 1);
  const yesterdayDateString = yesterdayDate.toISOString().slice(0, 10);

  const filteredData = treatmentdata.filter(item => item.date === yesterdayDateString);

  useEffect(() => {
    getservicedata();
  }, []);

  const getservicedata = async () => {
    let res = await axios.get(apiURL + "/getservicedetails");
    if ((res.status = 200)) {
      settreatmentdata(res.data?.servicedetails);
    }
  };

  let i = 1;
  return (
    <div className="web">
      <Header />
      <DSRnav />

      <div className="row m-auto">
        <div className="col-md-12">
          <table
            class="table table-hover table-bordered mt-1"
            style={{ width: "113%" }}
          >
            <thead className="">
           
              <tr className="table-secondary">
                <th className="table-head" scope="col">
                  Sr.No
                </th>
                <th className="table-head" scope="col">
                  Date
                </th>
                <th className="table-head" style={{ width: "13%" }} scope="col">
                  Time
                </th>
                <th scope="col" className="table-head">
                  Job Category
                </th>
                <th scope="col" className="table-head">
                  Customer Name
                </th>
                <th scope="col" className="table-head">
                  City
                </th>
                <th scope="col" style={{ width: "15%" }} className="table-head">
                  Address
                </th>
                <th scope="col" className="table-head">
                  Contact No.
                </th>
                <th scope="col" className="table-head">
                  Technician
                </th>
                <th scope="col" className="table-head">
                  Job Type
                </th>
                <th scope="col" className="table-head">
                  Description
                </th>

                <th scope="col" className="table-head">
                  Amount
                </th>
                <th scope="col" className="table-head">
                  Start Time
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr className="user-tbale-body">
                  <Link
                    to="/dsrdetails "
                    className="tbl"
                    state={{ data: item }}
                  >
                    <td>{i++}</td>
                    <td>{item.date}</td>
                    <td>{item.time}</td>
                    <td>{item.contractType}</td>
                    <td>{item.customerName}</td>
                    <td>{item.city}</td>
                    <td>
                      {item.cnap}
                      {item.rbhf}
                      {item.lnf}
                    </td>
                    <td>{item.mainContact}</td>
                    <td>{}</td>

                    <td>{item.service}</td>
                    <td>{item.desc}</td>
                    <td>{item.serviceCharge}</td>
                    <td>{item.time}</td>
                  </Link>
                </tr>
              ))}
            </tbody>
          </table>{" "}
          <div className="row mt-3 pb-3 justify-content-center">
            <div className="col-md-2">
              <button className="vhs-button">Print</button>
            </div>

            <div className="col-md-2">
              <button className="vhs-button mx-5">Export</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DSRtoday;
