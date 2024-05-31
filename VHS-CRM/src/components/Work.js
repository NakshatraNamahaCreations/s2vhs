import React, { useEffect, useState } from "react";
import Header from "./layout/Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Work() {
  const apiURL = process.env.REACT_APP_API_URL;
  const { id } = useParams();
  const navigate = useNavigate();

  const [workDetails, setWorkDetails] = useState([]);
  const [workDate, setWorkDate] = useState("");
  const [mileStone, setMileStone] = useState("");
  const [details, setDetails] = useState("");
  const [matrialUse, setMatrialUse] = useState("");
  const [remark, setRemark] = useState("");

  const PaintingURL = () => {
    navigate(`/painting/${id}`);
  };
  const PaymentURL = () => {
    navigate(`/payment/${id}`);
  };
  const WorkURL = () => {
    navigate(`/work/${id}`);
  };

  const treatmentURL = () => {
    navigate(`/treatmentdetails/${id}`);
  };
  const customerAddURL = () => {
    navigate(`/customeradd/${id}`);
  };
  const [data, setdata] = useState([]);

  const addWork = async () => {
    try {
      const config = {
        url: "/addWork",
        method: "post",
        baseURL: apiURL,
        headers: { "content-type": "application/json" },
        data: {
          workDate: workDate,
          workMileStone: mileStone,
          workDetails: details,
          workMaterialUse: matrialUse,
          workRemark: remark,
          customerId: data[0]?.customerData[0]._id,
          serviceId:id
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert("work Added");
          window.location.reload("");
        }
      });
    } catch (error) {
      // console.log(error);
      alert("something went wrong", error);
    }
  };

  const getservicedata = async () => {
    let res = await axios.get(apiURL + "/getrunningdata");
    if (res.status === 200) {
      const filteredData = res.data?.runningdata.filter(
        (i) => i._id == id
      );
      setdata(filteredData);
    }
  };

  useEffect(() => {
    getservicedata();
  }, []);

  console.log("Work Component", data);
  const getWorkById = async () => {
    try {
      const customerId = data[0]?.customerData[0]._id;
      console.log("customerId", customerId);
      let res = await axios.get(apiURL + `/getWorkByCustomerId/${customerId}`);
      if (res.status === 200) {
        console.log("workDetails", res);
        setWorkDetails(res.data?.works.filter((i)=>i.serviceId ===id));
      }
    } catch (error) {
      console.log("error:", error);
    }
  };
  useEffect(() => {
    getWorkById();
  }, [data]);

  return (
    <div className="web">
      <Header />
      <ul className="nav-tab-ul">
        <li>
          <a
            onClick={() => customerAddURL()}
            className="hover-tabs"
            style={{ cursor: "pointer" }}
          >
            Customeradd
          </a>
        </li>
        <li>
          <a
            onClick={() => treatmentURL()}
            className="hover-tabs"
            style={{ cursor: "pointer",  }}
          >
            Treatment
          </a>
        </li>
        <li>
          <a
            onClick={() => PaintingURL()}
            className="hover-tabs"
            style={{ cursor: "pointer" }}
          >
            Painting
          </a>
        </li>
        <li>
          <a
            onClick={() => PaymentURL()}
            className="hover-tabs"
            style={{ cursor: "pointer" }}
          >
            Payment
          </a>
        </li>
        <li>
          <a
            onClick={() => WorkURL()}
            className="hover-tabs currentTab"
            
          >
            Work
          </a>
        </li>
      </ul>
      <div
        style={{
          border: "1px solid color(srgb 0.855 0.855 0.855)",
          width: "97%",
          margin: "0px 15px",
          padding: "8px",
          borderRadius: "5px",
        }}
      >
        <b>
          Customer Payment &gt;{" "}
          {data[0]?.customerData[0].customerName.charAt(0).toUpperCase() +
            data[0]?.customerData[0].customerName.slice(1)}
        </b>
      </div>
      <div className="m-3">
        <div className="card p-2">
          <div className="card-body p-4">
            <div className="row  ">
              <div className="col-6 d-flex ">
                <div className="col-4">
                  Date <span className="text-danger"> *</span>
                </div>
                {/* <div className="col-0">:</div> */}
                <div className="group pt-1 col-5 ml-3">
                  <input
                    type="date"
                    className="col-md-12 vhs-input-value"
                    onChange={(e) => setWorkDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row  mt-2">
              <div className="col-6 d-flex ">
                <div className="col-4">
                  Milestone<span className="text-danger"> *</span>
                </div>
                {/* <div className="col-0">:</div> */}
                <div className="group pt-1 col-5 ml-3">
                  <select
                    className="col-md-12 vhs-input-value"
                    onChange={(e) => setMileStone(e.target.value)}
                  >
                    <option value="">--select--</option>
                    <option value="50% Work Complete">50% Work Complete</option>
                    <option value="75% Work Complete">75% Work Complete</option>
                    <option value="Complete">Complete</option>
                    <option value="Final Touch Pending">
                      Final Touch Pending
                    </option>
                    <option value="Wall Cleaning">Wall Cleaning</option>
                    <option value="Wall Polishing">Wall Polishing</option>
                    <option value="Wall Puty 1Coat">Wall Puty 1Coat </option>
                    <option value="Wall Puty 2Coat">Wall Puty 2Coat</option>
                  </select>
                </div>
              </div>
              <div className="col-6 d-flex">
                <div className="col-4"> Work Details</div>

                <div className="group pt-1 col-5">
                  <textarea
                    type="text"
                    className="col-md-12 vhs-input-value"
                    style={{ height: "100px" }}
                    onChange={(e) => setDetails(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row  mt-2">
              <div className="col-6 d-flex ">
                <div className="col-4">
                  Material Use <span className="text-danger"> *</span>
                </div>
                {/* <div className="col-0">:</div> */}
                <div className="group pt-1 col-5 ml-3">
                  <textarea
                    type="text"
                    className="col-md-12 vhs-input-value"
                    style={{ height: "100px" }}
                    onChange={(e) => setMatrialUse(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-6 d-flex ">
                <div className="col-4">Remark</div>
                {/* <div className="col-0">:</div> */}
                <div className="group pt-1 col-5 ml-3">
                  <textarea
                    type="text"
                    className="col-md-12 vhs-input-value"
                    style={{ height: "100px" }}
                    onChange={(e) => setRemark(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row pt-3 justify-content-center">
            <div className="col-md-2">
              <button className="vhs-button" onClick={addWork}>
                Save
              </button>
            </div>
          </div>
        </div>

        <div className="mt-2 p-3">
          <h5>Work Details</h5>

          <table class="table table-hover table-bordered mt-1">
            <thead>
              <tr className="tr table-secondary  clr">
                <th>#</th>
                <th>Date</th>
                <th>Milestone</th>
                <th>Work Details</th>
                <th>Material Uses</th>
                <th>Remark</th>
              </tr>
            </thead>
            <tbody>
              {workDetails.map((work, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{work?.workDate}</td>
                  <td>{work?.workMileStone}</td>
                  <td>{work?.workDetails}</td>
                  <td>{work?.workMaterialUse}</td>
                  <td>{work?.workRemark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Work;
