import React, { useState, useEffect } from "react";
import Header from "../components/layout/Header";

import axios from "axios";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import moment from "moment";
import Surveynav from "./Surveynav";

function Stoday() {
  const [filterdata, setfilterdata] = useState([]);
  const apiURL = process.env.REACT_APP_API_URL;

  const today = new Date();

  useEffect(() => {
    getenquiry();
  }, []);

  const getenquiry = async () => {
    let res = await axios.get(apiURL + "/getenquiry");
    if (res.status === 200) {
      setfilterdata(res.data?.enquiryadd);
    }
  };
  let i = 0;

  return (
    <div className="web">
      <Header />
      <Surveynav />

      <div className="row m-auto">
        {/* <div className="col-md-12"> */}
        <Table striped bordered hover responsive>
          <thead>
            <tr className="tr">
              <th>#</th>
              <th>Category</th>
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
              <th>Appo. Date</th>
              <th>Note</th>
              <th>Technician</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {filterdata.map((item) =>
              item.enquirydetails.map((ele) => {
                const nxtfollArray = Array.isArray(ele.nxtfoll)
                  ? ele.nxtfoll
                  : [ele.nxtfoll];
                let i = 1;

                return nxtfollArray.map((date) => {
                  const currentDate = new Date(date);

                  if (
                    currentDate.getDate() === today.getDate() &&
                    currentDate.getMonth() === today.getMonth() &&
                    currentDate.getFullYear() === today.getFullYear()
                  ) {
                    return ele.response.includes("Survey") ? (
                      <tr key={i} className="trnew">
                        <Link
                          to="/surveydetails"
                          state={{ data: item, data1: ele }}
                          style={{
                            display: "contents",
                            border: "1px solid gray ",
                            color: "black",
                          }}
                        >
                          <td>{i++}</td>
                          <td>{item.category}</td>
                          <td>{item.date}</td>
                          <td>{item.Time}</td>
                          <td>{item.name}</td>
                          <td>{item.mobile}</td>
                          <td>{item.address}</td>
                          <td>{item.reference1}</td>
                          <td>{item.reference2}</td>
                          <td>{item.reference3}</td>
                          <td>{item.city}</td>
                          <td>{item.intrestedfor}</td>
                          <td>{date}</td>
                          <td>{item.comment}</td>
                          <td>{ele.response}</td>
                          <td>{item.technician}</td>
                        </Link>
                      </tr>
                    ) : null;
                  }

                  return null;
                });
              })
            )}
          </tbody>
        </Table>
      </div>
    </div>
    // </div>
  );
}

// state sta

export default Stoday;
