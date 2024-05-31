import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/layout/Header";
import { useNavigate, useParams } from "react-router-dom";
// import Customernav from "../components/Customernav";
import moment from "moment";
import DSRnav from "./DSRnav";

function Addcall() {
  const admin = JSON.parse(sessionStorage.getItem("admin"));
  const { id } = useParams();
  const apiURL = process.env.REACT_APP_API_URL;
  const [treatmentdata, settreatmentdata] = useState([]);
  const [customerdata, setcustomerdata] = useState([]);
  const [servicedata, setservicedata] = useState([]);
  const [techniciandata, settechniciandata] = useState([]);
  const [bookingDate, setbookingDate] = useState(moment().format("DD-MM-YYYY"));

  const [priorityLevel, setpriorityLevel] = useState("");
  const [appoDate, setappoDate] = useState(moment().format("YYYY-MM-DD"));
  const [appoTime, setappoTime] = useState(moment().format("LT"));
  const [customerFeedback, setcustomerFeedback] = useState("");
  const [jobType, setjobType] = useState("");
  const [techComment, settechComment] = useState("");
  const [techName, settechName] = useState("");
  const [complaintRef, setcomplaintRefo] = useState(0);
  const [Showinapp, setShowinapp] = useState("");
  const [jobComplete, setjobComplete] = useState("");
  const [sendSms, setsendSms] = useState("");
  const [workerAmount, setworkerAmount] = useState("");
  const [workerName, setworkerName] = useState("");
  const [daytoComplete, setdaytoComplete] = useState("");
  const [dsrdata, setdsrdata] = useState([]);

  useEffect(() => {
    getcustomer();
    getsubcategory();
    getAlldsr();
    gettreatment();
  }, []);

  const getcustomer = async () => {
    let res = await axios.get(apiURL + "/getcustomer");
    if (res.status === 200) {
      setcustomerdata(res.data?.customers.filter((i) => i.cardNo == id));
    }
  };

  const getsubcategory = async () => {
    let res = await axios.get(apiURL + "/getsubcategory");
    if (res.status === 200) {
      setservicedata(res.data?.subcategory);
    }
  };

  const gettreatment = async () => {
    let res = await axios.get(apiURL + "/getservicedetails");
    if (res.status === 200) {
      settreatmentdata(res.data?.servicedetails.filter((i) => i.cardNo == id));
    }
  };
  const getAlldsr = async () => {
    let res = await axios.get(apiURL + "/getalldsrlist");
    if (res.status === 200) {
      setdsrdata(res.data.addcall);
      setcomplaintRefo(res.data?.addcall[0]?.complaintRef);
    }
  };
  function calculateTotalPrice(data) {
    let totalPrice = 0;
    for (let i = 0; i < data.length; i++) {
      totalPrice += parseInt(data[i].serviceCharge);
    }
    return totalPrice;
  }

  const total = calculateTotalPrice(treatmentdata);

  const save = async (e) => {
    e.preventDefault();

    if (!workerName || !Showinapp || !daytoComplete) {
      alert("Fill all feilds");
    } else {
      try {
        const config = {
          url: "/adddsrcall",
          method: "post",
          baseURL: apiURL,
          // data: formdata,
          headers: { "content-type": "application/json" },
          data: {
            cardNo: id,
            category: customerdata[0].category,
            bookingDate: bookingDate,

            priorityLevel: priorityLevel,
            appoDate: appoDate,
            appoTime: appoTime,

            customerFeedback: customerFeedback,
            techComment: techComment,
            workerName: workerName,
            workerAmount: workerAmount,

            daytoComplete: daytoComplete,
            backofficerno: admin.contactno,
            techName: techName,
            showinApp: Showinapp,
            sendSms: sendSms,
            jobComplete: jobComplete,
            amount: total,
          },
        };
        await axios(config).then(function (response) {
          if (response.status === 200) {
            console.log("success");
            alert(" Added");

            window.location.reload();
          }
        });
      } catch (error) {
        console.error(error);
        alert(" Not Added");
      }
    }
  };

  useEffect(() => {
    getservices();
    gettechnician();
  }, []);

  const getservices = async () => {
    let res = await axios.get(apiURL + "/getsubcategory");
    if (res.status === 200) {
      setservicedata(res.data?.subcategory);
    }
  };
  const gettechnician = async () => {
    let res = await axios.get(apiURL + "/getalltechnician");
    if (res.status === 200) {
      settechniciandata(res.data?.technician);
    }
  };

  const handleChange = (event) => {
    setShowinapp(event.target.value);
  };
  const handleChange1 = (event) => {
    setjobComplete(event.target.value);
  };

  let i = 1;

  return (
    <div className="web">
      <Header />
      <DSRnav />

      <div className="row m-auto pb-5">
        {" "}
        <div style={{ background: "white", color: "black" }}>
          <div style={{ marginTop: "20px" }}>
            <div className="card-body p-4">
              <h5>Job Information</h5>
              <hr />

              <div className="row pt-3">
                <div className="col-md-4">
                  <div className="vhs-input-label">Booking Date</div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      className="col-md-12 vhs-input-value"
                      value={moment().format("DD-MM-YY")}
                      onChange={(e) => setbookingDate(e.target.value)}
                    />
                  </div>
                </div>
                {/* <div className="col-md-4">
                  <div className="vhs-input-label">
                    Job Category
                    <span className="text-danger">*</span>
                  </div>
                  <div className="group pt-1">
                    <select
                      className="col-md-12 vhs-input-value"
                      onChange={(e) => setjobCategory(e.target.value)}
                    >
                      <option>--select--</option>
                      <option value="01 ST Services">01 ST Services</option>
                      <option value="02 Nd Services">02 Nd Services</option>
                      <option value="03 Rd Services">03 Rd Services</option>
                      <option value="04 Th Services">04 Th Services</option>
                      <option value="05 Th Services">05 Th Services</option>
                      <option value="06 Th Services">06 Th Services</option>
                      <option value="07 Th Services">07 Th Services</option>
                      <option value="08 Th Services">08 Th Services</option>
                      <option value="09 Th Services">09 Th Services</option>
                      <option value="10 Th Services">10 Th Services</option>
                      <option value="11 Th Services">11 Th Services</option>
                      <option value="12 Th Services">12 Th Services</option>
                      <option value="Cancel Services">Cancel Services</option>
                      <option value="Complaint Services">
                        Complaint Services
                      </option>
                      <option value="Half work Services">
                        Half work Services
                      </option>
                      <option value="Pending work">Pending work</option>
                    </select>
                  </div>
                </div> */}
                <div className="col-md-4">
                  <div className="vhs-input-label">Complaint Ref. </div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      className="col-md-12 vhs-input-value"
                      value={complaintRef ? complaintRef + 1 : 1}
                    />
                  </div>
                </div>
              </div>

              <div className="row pt-3">
                <div className="col-md-4">
                  <div className="vhs-input-label">Priority Level</div>
                  <div className="group pt-1">
                    <select
                      className="col-md-12 vhs-input-value"
                      onChange={(e) => setpriorityLevel(e.target.value)}
                    >
                      <option>--select--</option>
                      <option>High</option>
                      <option>Low</option>
                      <option>Normal</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="vhs-input-label">Appointment Date</div>
                  <div className="group pt-1">
                    <input
                      type="date"
                      className="col-md-12 vhs-input-value"
                      defaultvalue={moment().format("DD-MM-YY")}
                      onChange={(e) => setappoDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="vhs-input-label">Appointment Time</div>
                  <div className="group pt-1">
                    <input
                      type="time"
                      className="col-md-12 vhs-input-value"
                      defaultValue={moment().format("LT")}
                      onChange={(e) => setappoTime(e.target.value)}
                    />
                    <p>Time Given</p>
                  </div>
                </div>
              </div>
              <form>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h5>Customer Information</h5>
                  {/* <h6 style={{color:"red"}} onClick={handleRowClick}>Add call</h6> */}
                </div>

                <hr />
                {customerdata.map((item) => (
                  <div>
                    <div className="row">
                      <div className="col-md-4 pt-2">
                        <div className="vhs-sub-heading">
                          <b>Customer Name :</b>
                        </div>
                        <div className="group pt-1 vhs-non-editable">
                          {item.customerName}{" "}
                        </div>
                      </div>

                      <div className="col-md-4 pt-2">
                        <div className="vhs-sub-heading">
                          <b>Contact 1 : </b>
                        </div>
                        <div className="group pt-1 vhs-non-editable">
                          {item.mainContact}
                        </div>
                      </div>
                      <div className="col-md-4 pt-2">
                        <div className="vhs-sub-heading">
                          <b>Contact 2 : </b>
                        </div>
                        <div className="group pt-1 vhs-non-editable">
                          {item.alternateContact}
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-4 pt-2">
                        <div className="vhs-sub-heading">
                          <b>Card No : </b>
                        </div>
                        <div className="group pt-1 vhs-non-editable">
                          {item.cardNo}
                        </div>
                      </div>
                      <div className="col-md-4 pt-2">
                        <div className="vhs-sub-heading">
                          <b>Email : </b>
                        </div>
                        <div className="group pt-1 vhs-non-editable">
                          {item.email}
                        </div>
                      </div>
                      <div className="col-md-4 pt-2">
                        <div className="vhs-sub-heading">
                          <b>Customer Type : </b>
                        </div>
                        <div className="group pt-1 vhs-non-editable">
                          {item.customerType}
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3 ">
                      <div className="col-md-4 pt-2">
                        <div className="vhs-sub-heading">
                          <b>Address : </b>
                        </div>
                        <div className="group pt-1 vhs-non-editable">
                          {item.rbhf}
                          {item.cnap}
                          {item.lnf}
                        </div>
                      </div>
                      <div className="col-md-4 pt-2">
                        <div className="vhs-sub-heading">
                          <b>Special Instruction : </b>
                        </div>
                        <div className="group pt-1 vhs-non-editable">
                          {item.instructions}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </form>
            </div>
          </div>
          <div className="mt-5">
            <h6>Customer Product Details</h6>
            <table class="table table-hover table-bordered mt-1">
              <thead className="">
                <tr className="table-secondary">
                  <th className="table-head" scope="col">
                    Sr
                  </th>
                  <th className="table-head" scope="col">
                    Category
                  </th>
                  <th className="table-head" scope="col">
                    Cont.Type
                  </th>
                  <th className="table-head" scope="col">
                    Treatment
                  </th>
                  <th className="table-head" scope="col">
                    Service Freq.
                  </th>
                  <th className="table-head" scope="col">
                    Contract Period
                  </th>
                  <th className="table-head" scope="col">
                    Service Date
                  </th>
                  <th className="table-head" scope="col">
                    Description
                  </th>
                  <th className="table-head" scope="col">
                    Charges
                  </th>
                </tr>
              </thead>
              <tbody>
                <div></div>
                {treatmentdata.map((item) => (
                  <tr>
                    <td>{i++}</td>
                    <td>{item.category}</td>
                    <td>{item.contractType}</td>
                    <td>{item.service}</td>
                    <td>{item.serviceFrequency}</td>
                    <td>
                      {item.startDate}/{item.expiryDate}
                    </td>
                    <td>{item.firstserviceDate}</td>
                    <td>{item.desc}</td>
                    <td>{item.serviceCharge}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h5 className="mt-5">Service & Repair Information</h5>
          <hr />

          <div className="row pt-3">
            <div className="row">
              <div className="col-6 d-flex">
                <div className="col-4">Customer Feedback</div>
                <div className="col-1">:</div>
                <div className="group pt-1 col-7">
                  <textarea
                    name="postContent"
                    rows={5}
                    cols={20}
                    className="col-md-12 vhs-input-label"
                    onChange={(e) => setcustomerFeedback(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-6 d-flex">
                <div className="col-4">Technician Comment </div>
                <div className="col-1">:</div>
                <div className="group pt-1 col-7">
                  <textarea
                    name="postContent"
                    rows={4}
                    cols={40}
                    className="col-md-12 vhs-input-label"
                    onChange={(e) => settechComment(e.target.value)}
                  />
                </div>
              </div>

              {/* <div className="col-6 d-flex">
                <div className="col-4">
                  Job Type
                  <span className="text-danger">*</span>
                </div>
                <div className="col-1">:</div>
                <div className="group pt-1 col-7">
                  <select
                    className="col-md-12 vhs-input-value"
                    onChange={(e) => setjobType(e.target.value)}
                  >
                    <option>--select--</option>
                    {servicedata.map((item) => (
                      <option>{item.subcategory}</option>
                    ))}
                  </select>
                </div>
              </div> */}
            </div>
          </div>

          <div className="row pt-3">
            <div className="row">
              <div className="col-6 d-flex">
                <div className="col-4">
                  Worker Names <span className="text-danger"> *</span>
                </div>
                <div className="col-1">:</div>
                <div className="group pt-1 col-7">
                  <textarea
                    name="postContent"
                    rows={4}
                    cols={40}
                    className="col-md-12 vhs-input-label"
                    onChange={(e) => setworkerName(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-6 d-flex">
                <div className="col-4">Worker Amount </div>
                <div className="col-1">:</div>
                <div className="group pt-1 col-7">
                  <textarea
                    name="postContent"
                    rows={4}
                    cols={40}
                    className="col-md-12 vhs-input-label"
                    onChange={(e) => setworkerAmount(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row pt-3">
            <div className="row">
              <div className="col-6 d-flex">
                <div className="col-4">
                  Day To Complete <span className="text-danger"> *</span>
                </div>
                <div className="col-1">:</div>
                <div className="group pt-1 col-7">
                  <input
                    type="date"
                    className="col-md-12 vhs-input-value"
                    onChange={(e) => setdaytoComplete(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row pt-3">
            <div className="row">
              <div className="col-6 d-flex">
                <div className="col-4">Sales Executive</div>
                <div className="col-1">:</div>
                <div className="group pt-1 col-7">
                  <p style={{ marginBottom: 0 }}> {admin.displayname}</p>
                </div>
              </div>

              <div className="col-6 d-flex">
                <div className="col-4">
                  Project manager
                  {/* <span className="text-danger">*</span> */}
                </div>
                <div className="col-1">:</div>
                <div className="group pt-1 col-7">
                  <select
                    className="col-md-12 vhs-input-value"
                    onChange={(e) => settechName(e.target.value)}
                  >
                    <option>--select--</option>
                    {techniciandata.map((item) => (
                      <option>{item.vhsname}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="row pt-3">
            <div className="row">
              <div className="col-6 d-flex">
                <div className="col-4">Logged User</div>
                <div className="col-1">:</div>
                <div className="group pt-1 col-7">
                  <p style={{ marginBottom: 0 }}> {admin.displayname}</p>
                  <p>{admin.contactno}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="row pt-3">
            <div className="row">
              <div className="col-6 d-flex">
                <div className="col-4">
                  SHOW IN APP <span className="text-danger"> *</span>
                </div>
                <div className="col-1">:</div>
                <div className="group pt-1 col-7">
                  <div className="d-flex">
                    <label>
                      <input
                        type="radio"
                        value="YES"
                        className="custom-radio mx-2"
                        checked={Showinapp === "YES"}
                        onChange={handleChange}
                      />
                      YES
                    </label>
                    <label className="mx-5">
                      <input
                        type="radio"
                        value="NO"
                        className="custom-radio mx-2"
                        checked={Showinapp === "NO"}
                        onChange={handleChange}
                      />
                      NO
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-6 d-flex">
                <div className="col-4">Send SMS</div>
                <div className="col-1">:</div>
                <div className="group pt-1 col-7">
                  <select
                    className="col-md-12 vhs-input-value"
                    onChange={(e) => setsendSms(e.target.value)}
                  >
                    <option>--select--</option>
                    <option value="yes">YES</option>
                    <option value="no">NO</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="row pt-3">
            <div className="row">
              <div className="col-6 d-flex">
                <div className="col-4">(IN) Sign Date & Time</div>
                <div className="col-1">:</div>
                <div className="group pt-1 col-7">0000-00-00 00:00:00</div>
              </div>

              <div className="col-6 d-flex">
                <div className="col-4">
                  (OUT) Sign Date & Time
                  <span className="text-danger">*</span>
                </div>
                <div className="col-1">:</div>
                <div className="group pt-1 col-7">0000-00-00 00:00:00</div>
              </div>
            </div>
          </div>
          <div className="row pt-3">
            <div className="row">
              <div className="col-6 d-flex">
                <div className="col-4">
                  Job Complete
                  <span className="text-danger">*</span>
                </div>
                <div className="col-1">:</div>
                <div className="group pt-1 col-7">
                  <label>
                    <input
                      type="radio"
                      value="YES"
                      className="custom-radio mx-2"
                      checked={jobComplete === "YES"}
                      onChange={handleChange1}
                    />
                    YES
                  </label>
                  <label className="mx-3">
                    <input
                      type="radio"
                      value="NO"
                      className="custom-radio mx-2"
                      checked={jobComplete === "NO"}
                      onChange={handleChange1}
                    />
                    NO
                  </label>
                  {/* <label className="mx-3">
                <input
                  type="radio"
                  value="cancel"
                  className="custom-radio mx-2"
                  checked={jobComplete === "cancel"}
                  onChange={handleChange1}
                />
                Cancel
              </label> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row pt-3 justify-content-center">
          <div className="col-md-2">
            <button className="vhs-button" onClick={save}>
              Save
            </button>
          </div>
          <div className="col-md-2">
            <button className="vhs-button">Cancel</button>
          </div>
          {/* <div className="col-md-2">
            <button className="vhs-button">Invoice</button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Addcall;
