import React, { useEffect, useState } from "react";
import Header from "./layout/Header";
import axios from "axios";

const active = {
  backgroundColor: "rgb(169, 4, 46)",
  color: "#fff",
  fontWeight: "bold",
  border: "none",
};
const inactive = { color: "black", backgroundColor: "white" };
function Closeproject() {
  const [selected, setSelected] = useState(0);
  const handleClick = (divNum) => () => {
    setSelected(divNum);
  };
  const [data, setdata] = useState([]);
  const apiURL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    getAlldsr();
  }, []);

  const getAlldsr = async () => {
    let res = await axios.get(apiURL + "/getfilterrunningdata");
    if (res.status === 200) {
      setdata(res.data.runningdata.filter((i) => i.closeProject === "closed"));
    }
  };

  return (
    <div className="web">
      <Header />

      {/* <div className="row m-auto mt-2" style={{ width: "100%" }}>
        <div className="col-md-12">
          <div className="card sticky">
            <div className="card-body">
              <div>Work List</div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="row m-auto" style={{ width: "100%" }}>
        <div className="col-md-12">
          <div className="mt-3">
            Page{" "}
            <span>
              <select className="vh-user-select">
                <option>1</option>
              </select>
            </span>{" "}
            of 1
          </div>
          <table className="table table-hover table-bordered mt-1">
            <thead className="">
              <tr>
                <th scope="col">
                  <input type="text" className="vhs-table-input" />
                </th>
                <th scope="col">
                  <input type="text" className="vhs-table-input" />
                </th>
                <th scope="col">
                  <select className="vhs-table-input">
                    <option>-show all-</option>
                    <option>Sunil</option>
                    <option>farooq</option>
                    <option>gajanan</option>
                    <option>mr.nandhu</option>
                  </select>
                </th>
                <th scope="col">
                  <select className="vhs-table-input">
                    <option>-show all-</option>
                    <option>Abhay</option>
                    <option>Mr.Abhay</option>
                    <option>hemakumar</option>
                    <option>mr.rajesh</option>
                  </select>
                </th>
                <th scope="col">
                  <input type="text" className="vhs-table-input" />
                </th>
                <th scope="col">
                  <input type="text" className="vhs-table-input" />
                </th>
                <th scope="col">
                  <input type="text" className="vhs-table-input" />
                </th>
              </tr>

              <tr className="table-secondary">
                <th className="table-head" scope="col">
                  Sr.No
                </th>
                <th className="table-head" scope="col">
                  Cr.Date
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
                <th scope="col" className="table-head">
                  Address
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr className="user-tbale-body">
                  <td>{index + 1}</td>
                  <td>{item.closeDate}</td>
                  <td>{item.dsrdata[0]?.TechorPMorVendorName}</td>
                  <td>{item.quotedata[0]?.salesExecutive}</td>
                  <td> {item.customerData[0]?.customerName}</td>
                  <td> {item.customerData[0]?.mainContact}</td>
                  <td>
                    {item.deliveryAddress ? (
                      <>
                        {item.deliveryAddress.platNo},{" "}
                        {item.deliveryAddress.address} -{" "}
                        {item.deliveryAddress.landmark}
                      </>
                    ) : (
                      <>
                        {item.customerData[0]?.lnf},{item.customerData[0]?.rbhf}
                        ,{item.customerData[0]?.cnap},
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>{" "}
        </div>
      </div>
    </div>
  );
}

export default Closeproject;
