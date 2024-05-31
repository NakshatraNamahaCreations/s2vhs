import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/layout/Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import Customernav from "../components/Customernav";
import moment from "moment";
import Customersernav from "./Customersernav";
import { NavLink } from "react-router-dom";

function Treatment() {
  const { cardNo } = useParams();
  const navigate = useNavigate();
  const admin = JSON.parse(sessionStorage.getItem("admin"));

  const { id } = useParams();
  const apiURL = process.env.REACT_APP_API_URL;
  const [serviceCharge, setserviceCharge] = useState("");
  const [dateofService, setdateofService] = useState([]);
  const [desc, setdesc] = useState("");
  const [serviceFrequency, setserviceFrequency] = useState("");
  const [startDate, setstartDate] = useState("00-00-0000");
  const [expiryDate, setexpiryDate] = useState("00-00-0000");
  const [category, setcategory] = useState("");
  const [firstserviceDate, setfirstserviceDate] = useState("00-00-0000");
  const [contractType, setcontractType] = useState("");
  const [treatment, settreatment] = useState("");
  const [treatmentdata, settreatmentdata] = useState([]);
  const [customerdata, setcustomerdata] = useState([]);
  const [servicedata, setservicedata] = useState([]);
  const [categorydata, setcategorydata] = useState([]);
  const [editenable, seteditEnable] = useState(false);
  const [onetime, setonetime] = useState([]);
  const [amtFrequency, setamtFrequency] = useState("");
  const [firstDateamt, setfirstDateamt] = useState("");
  const [expiryDateamt, setexpiryDateamt] = useState("");
  const [community, setCommunity] = useState("");

  useEffect(() => {
    getcustomer();
    getsubcategory();
    getcategory();
    gettreatment();
  }, []);

  const getcustomer = async () => {
    let res = await axios.get(apiURL + "/getcustomer");
    if (res.status === 200) {
      setcustomerdata(res.data?.customers.filter((i) => i.cardNo == id));
    }
  };

  useEffect(() => {
    getsubcategory();
  }, [category]);

  const getsubcategory = async () => {
    let res = await axios.post(apiURL + `/postsubcategory/`, { category });
    if (res.status === 200) {
      setservicedata(res.data?.subcategory);
    }
  };
  const getcategory = async () => {
    let res = await axios.get(apiURL + "/getcategory");
    if (res.status === 200) {
      setcategorydata(res.data?.category);
    }
  };
  const gettreatment = async () => {
    let res = await axios.get(apiURL + "/getservicedetails");
    if (res.status === 200) {
      settreatmentdata(res.data?.servicedetails.filter((i) => i.cardNo == id));
    }
  };

  const sDate = moment(dateofService, "YYYY-MM-DD");
  const eDate = moment(expiryDate, "YYYY-MM-DD");

  const totalDays = Math.ceil(eDate.diff(sDate, "days"));
  const interval = Math.ceil(totalDays / serviceFrequency);
  // const dividedServiceCharge = Math.ceil(serviceCharge / serviceFrequency);

  const dividedDates = [];
  // const dividedCharges = [];

  for (let i = 0; i < serviceFrequency; i++) {
    const date = sDate.clone().add(interval * i, "days");
    dividedDates.push(date);

    // const charge =
    //   i === serviceFrequency - 1
    //     ? serviceCharge - dividedServiceCharge * (serviceFrequency - 1)
    //     : dividedServiceCharge;
    // dividedCharges.push(charge);
  }

  const sAmtDate = moment(firstDateamt, "YYYY-MM-DD");
  const eamtDate = moment(expiryDateamt, "YYYY-MM-DD");

  const totalamtDays = Math.ceil(eamtDate.diff(sAmtDate, "days"));
  const intervalamt = Math.ceil(totalamtDays / amtFrequency);
  const dividedamtCharge = Math.ceil(serviceCharge / amtFrequency);

  const dividedamtDates = [];
  const dividedamtCharges = [];

  for (let i = 0; i < amtFrequency; i++) {
    const date = sDate.clone().add(intervalamt * i, "days");
    dividedamtDates.push(date);

    const charge =
      i === amtFrequency - 1
        ? serviceCharge - dividedamtCharge * (amtFrequency - 1)
        : dividedamtCharge;
    dividedamtCharges.push(charge);
  }
  const addtreatmentdetails = async (e) => {
    e.preventDefault();

    if (!contractType || !treatment || !serviceCharge) {
      alert("Fill all feilds");
    } else {
      try {
        const config = {
          url: "/addservicedetails",
          method: "post",
          baseURL: apiURL,
          // data: formdata,
          headers: { "content-type": "application/json" },
          data: {
            customerData: customerdata,
            dividedDates: contractType === "AMC" ? dividedDates : dateofService,
            dividedamtDates: dividedamtDates,
            dividedamtCharges: dividedamtCharges,
            cardNo: id,
            dCategory: customerdata[0].category,
            category: category,
            contractType: contractType,
            service: treatment,
            serviceCharge: serviceCharge,
            dateofService: dateofService,
            desc: desc,
            serviceFrequency: serviceFrequency,
            startDate: startDate,
            expiryDate: expiryDate,
            firstserviceDate: firstserviceDate,
            BackofficeExecutive: admin.displayname,
            date: moment().format("YYYY-MM-DD"),
            time: moment().format("LT"),
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

  const deleteservicedeatils = async (id) => {
    axios({
      method: "post",
      url: apiURL + "/deleteservicedetails/" + id,
    })
      .then(function (response) {
        //handle success
        console.log(response);
        alert("Deleted successfully");
        window.location.reload();
      })
      .catch(function (error) {
        //handle error
        console.log(error.response.data);
      });
  };

  const editservicedetails = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: `/editservicedetails/${editenable._id}`,
        method: "post",
        baseURL: apiURL,
        headers: { "content-type": "application/json" },
        data: {},
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert("Successfully Added");
          window.location.reload("");
        }
      });
    } catch (error) {
      console.error(error);
      alert("category  Not Added");
    }
  };
  let i = 1;

  const handleRowClick = (id) => {
    console.log(id);
    navigate(`/addcall/${id}`);
  };

  return (
    <div className="web">
      <Header />
      <Customernav />
      <div></div>
      <div className="row m-auto">
        {" "}
        <div style={{ background: "white", color: "black" }}>
          <div className="card" style={{ marginTop: "20px" }}>
            <div className="card-body p-4">
              <form>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h5>Billing Details</h5>

                  <h6
                    style={{ color: "red" }}
                    onClick={() => handleRowClick(id)}
                  >
                    Add call
                  </h6>
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
                          <b>Mobile No : </b>
                        </div>
                        <div className="group pt-1 vhs-non-editable">
                          {item.mainContact}
                        </div>
                      </div>
                    </div>
                    <div className="row">
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
                          <b>Address : </b>
                        </div>
                        <div className="group pt-1 vhs-non-editable">
                          {item.rbhf}
                          {item.cnap}
                          {item.lnf}
                        </div>
                      </div>
                      <div className="col-md-4 pt-2">
                        <div>
                          <Link to="/customeredit" state={{ data: item }}>
                            <button className="btnn">Edit Customer</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </form>
            </div>

            <div className="card-body p-4">
              <h5>Treatment Details</h5>
              <hr />
              {!editenable ? (
                <>
                  <form>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="vhs-input-label">
                          Category
                          <span className="text-danger">*</span>
                        </div>
                        <select
                          className="col-md-12 vhs-input-value"
                          onChange={(e) => setcategory(e.target.value)}
                          name="material"
                        >
                          <option>--select--</option>
                          {admin?.category.map((category, index) => (
                            <option key={index} value={category.name}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-4">
                        <div className="vhs-input-label">
                          Contract type
                          <span className="text-danger">*</span>
                        </div>
                        <select
                          className="col-md-12 vhs-input-value"
                          name="region"
                          onChange={(e) => setcontractType(e.target.value)}
                        >
                          <option>--select--</option>

                          <option value="One Time">One Time</option>
                          <option value="AMC">AMC</option>
                        </select>
                      </div>

                      <div className="col-md-4">
                        <div className="vhs-input-label">
                          Treatment
                          <span className="text-danger">*</span>
                        </div>
                        <select
                          className="col-md-12 vhs-input-value"
                          onChange={(e) => settreatment(e.target.value)}
                          name="material"
                        >
                          <option>--select--</option>
                          {servicedata.map((item) => (
                            <option value={item.subcategory}>
                              {item.subcategory}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {contractType === "One Time" ? (
                      <>
                        <div className="row mt-2">
                          <div className="col-md-4 pt-3">
                            <div className="vhs-input-label">
                              Service Charge{" "}
                              <span className="text-danger">*</span>
                            </div>
                            <input
                              type="number"
                              name="qty"
                              className="col-md-12 vhs-input-value"
                              onChange={(e) => setserviceCharge(e.target.value)}
                              defaultValue={editenable.serviceCharge}
                            />
                          </div>
                          <div className="col-md-4 pt-3">
                            <div className="vhs-input-label">
                              Date of Service
                            </div>
                            <input
                              type="date"
                              name="qty"
                              className="col-md-12 vhs-input-value"
                              onChange={(e) => setdateofService(e.target.value)}
                              defaultValue={editenable.dateofService}
                            />
                          </div>
                          <div className="col-md-4 pt-3">
                            <div className="vhs-input-label">Description</div>
                            <textarea
                              type="text"
                              name="desc"
                              className="col-md-12 vhs-input-value"
                              onChange={(e) => setdesc(e.target.value)}
                              rows={5}
                              cols={10}
                              defaultValue={editenable.desc}
                            />
                          </div>
                          <div className="col-md-4 pt-3">
                            <div className="vhs-input-label">1 Community</div>
                            <select
                              className="col-md-12 vhs-input-value"
                              onChange={(e) => setCommunity(e.target.value)}
                              name="material"
                              type="text"
                            >
                              <option>Select All</option>
                            </select>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="row mt-2">
                          <div className="col-md-4 pt-3">
                            <div className="vhs-input-label">
                              Service Frequency
                            </div>

                            <input
                              type="number"
                              name="qty"
                              className="col-md-12 vhs-input-value"
                              onChange={(e) =>
                                setserviceFrequency(e.target.value)
                              }
                              defaultValue={editenable.serviceFrequency}
                            />
                            <span style={{ fontSize: "10px" }}>
                              (Total No. Of Services In Given Contract Period)
                            </span>
                          </div>
                          <div className="col-md-4 pt-3">
                            <div className="vhs-input-label">
                              1st Service Date
                            </div>
                            <input
                              type="date"
                              name="startdate"
                              className="col-md-12 vhs-input-value"
                              onChange={(e) => setdateofService(e.target.value)}
                            />
                          </div>
                          <div className="col-md-4 pt-3">
                            <div className="vhs-input-label">Expiry Date</div>
                            <input
                              type="date"
                              name="startdate"
                              className="col-md-12 vhs-input-value"
                              onChange={(e) => setexpiryDate(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col-md-4 pt-3">
                            <div className="vhs-input-label">
                              Service Charge{" "}
                              <span className="text-danger">*</span>
                            </div>
                            <input
                              type="number"
                              name="qty"
                              className="col-md-12 vhs-input-value"
                              onChange={(e) => setserviceCharge(e.target.value)}
                            />
                          </div>
                          <div className="col-md-4 pt-3">
                            <div className="vhs-input-label">
                              Amount Frequency
                            </div>

                            <input
                              type="number"
                              name="qty"
                              className="col-md-12 vhs-input-value"
                              onChange={(e) => setamtFrequency(e.target.value)}
                              defaultValue={editenable.amtFrequency}
                            />
                            {/* <span style={{ fontSize: "10px" }}>
                              (Total No. Of Services In Given Contract Period)
                            </span> */}
                          </div>

                          <div className="col-md-4 pt-3">
                            <div className="vhs-input-label">
                              1st Service Amt Date
                            </div>
                            <input
                              type="date"
                              name="startdate"
                              className="col-md-12 vhs-input-value"
                              onChange={(e) => setfirstDateamt(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col-md-4 pt-3">
                            <div className="vhs-input-label">
                              Amt Expiry Date
                            </div>
                            <input
                              type="date"
                              name="startdate"
                              className="col-md-12 vhs-input-value"
                              onChange={(e) => setexpiryDateamt(e.target.value)}
                            />
                          </div>
                          <div className="col-md-4 pt-3">
                            <div className="vhs-input-label">Description</div>
                            <textarea
                              type="text"
                              name="desc"
                              className="col-md-12 vhs-input-value"
                              onChange={(e) => setdesc(e.target.value)}
                              rows={5}
                              cols={10}
                            />
                          </div>
                        </div>
                      </>
                    )}

                    <div className="col-md-4 pt-3 mt-4 justify-content-center">
                      <div className="col-md-2 ">
                        <button
                          className="vhs-button"
                          onClick={addtreatmentdetails}
                        >
                          Add Item
                        </button>
                      </div>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <form>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="vhs-input-label">
                          Category
                          <span className="text-danger">*</span>
                        </div>
                        <select
                          className="col-md-12 vhs-input-value"
                          onChange={(e) => setcategory(e.target.value)}
                          name="material"
                        >
                          <option>{editenable.category}</option>
                          {admin?.category.map((category, index) => (
                            <option key={index} value={category.name}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-4">
                        <div className="vhs-input-label">
                          Contract type
                          <span className="text-danger">*</span>
                        </div>
                        <select
                          className="col-md-12 vhs-input-value"
                          name="region"
                          onChange={(e) => setcontractType(e.target.value)}
                        >
                          <option>{editenable.contractType}</option>

                          <option value="One Time" disabled>
                            One Time
                          </option>
                          <option value="AMC" disabled>
                            AMC
                          </option>
                        </select>
                      </div>

                      <div className="col-md-4">
                        <div className="vhs-input-label">
                          Treatment
                          <span className="text-danger">*</span>
                        </div>
                        <select
                          className="col-md-12 vhs-input-value"
                          onChange={(e) => settreatment(e.target.value)}
                          name="material"
                        >
                          <option>--select--</option>
                          {servicedata.map((item) => (
                            <option value={item.subcategory}>
                              {item.subcategory}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {contractType === "One Time" ? (
                      <>
                        <div className="row mt-2">
                          <div className="col-md-4 pt-3">
                            <div className="vhs-input-label">
                              Service Charge{" "}
                              <span className="text-danger">*</span>
                            </div>
                            <input
                              type="number"
                              name="qty"
                              className="col-md-12 vhs-input-value"
                              onChange={(e) => setserviceCharge(e.target.value)}
                            />
                          </div>
                          <div className="col-md-4 pt-3">
                            <div className="vhs-input-label">
                              Date of Service
                            </div>
                            <input
                              type="date"
                              name="qty"
                              className="col-md-12 vhs-input-value"
                              onChange={(e) => setdateofService(e.target.value)}
                            />
                          </div>
                          <div className="col-md-4 pt-3">
                            <div className="vhs-input-label">Description</div>
                            <textarea
                              type="text"
                              name="desc"
                              className="col-md-12 vhs-input-value"
                              onChange={(e) => setdesc(e.target.value)}
                              rows={5}
                              cols={10}
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="row mt-2">
                          <div className="col-md-4 pt-3">
                            <div className="vhs-input-label">
                              Service Frequency
                            </div>

                            <input
                              type="number"
                              name="qty"
                              className="col-md-12 vhs-input-value"
                              onChange={(e) =>
                                setserviceFrequency(e.target.value)
                              }
                              defaultValue={editenable.serviceFrequency}
                            />
                            <span style={{ fontSize: "10px" }}>
                              (Total No. Of Services In Given Contract Period)
                            </span>
                          </div>
                          <div className="col-md-4 pt-3">
                            <div className="vhs-input-label">Start Date</div>
                            <input
                              type="date"
                              name="startdate"
                              className="col-md-12 vhs-input-value"
                              onChange={(e) => setdateofService(e.target.value)}
                              defaultValue={editenable.startDate}
                            />
                          </div>
                          <div className="col-md-4 pt-3">
                            <div className="vhs-input-label">Expiry Date</div>
                            <input
                              type="date"
                              name="startdate"
                              className="col-md-12 vhs-input-value"
                              onChange={(e) => setexpiryDate(e.target.value)}
                              defaultValue={editenable.expiryDate}
                            />
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col-md-4 pt-3">
                            <div className="vhs-input-label">
                              Service Charge{" "}
                              <span className="text-danger">*</span>
                            </div>
                            <input
                              type="number"
                              name="qty"
                              className="col-md-12 vhs-input-value"
                              onChange={(e) => setserviceCharge(e.target.value)}
                              defaultValue={editenable.serviceCharge}
                            />
                          </div>

                          <div className="col-md-4 pt-3">
                            <div className="vhs-input-label">
                              1st Service Date{" "}
                            </div>
                            <input
                              type="date"
                              name="qty"
                              className="col-md-12 vhs-input-value"
                              onChange={(e) =>
                                setfirstserviceDate(e.target.value)
                              }
                              defaultValue={editenable.firstserviceDate}
                            />
                          </div>
                          <div className="col-md-4 pt-3">
                            <div className="vhs-input-label">Description</div>
                            <textarea
                              type="text"
                              name="desc"
                              className="col-md-12 vhs-input-value"
                              onChange={(e) => setdesc(e.target.value)}
                              rows={5}
                              cols={10}
                              defaultValue={editenable.desc}
                            />
                          </div>
                        </div>
                      </>
                    )}

                    <div className="col-md-4 pt-3 mt-4 justify-content-center">
                      <div className="col-md-2 ">
                        <button
                          className="vhs-button"
                          onClick={editservicedetails}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
          <div className="mt-5">
            <h6>Treatment Details</h6>
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
                    Amount paid Date
                  </th>
                  <th className="table-head" scope="col">
                    Total Charges
                  </th>
                  <th className="table-head" scope="col">
                    Description
                  </th>
                  <th className="table-head" scope="col">
                    Action
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
                      {item.dateofService}/{item.expiryDate}
                    </td>
                    {item.contractType === "AMC" ? (
                      <td>
                        {item.dividedDates.map((a) => (
                          <div>
                            <p>{new Date(a).toLocaleDateString()}</p>
                          </div>
                        ))}
                      </td>
                    ) : (
                      <td>{item.dateofService}</td>
                    )}
                    {item.contractType === "AMC" ? (
                      <td>
                        {item.dividedamtDates.map((a) => (
                          <div>
                            <p>{new Date(a).toLocaleDateString()}</p>
                          </div>
                        ))}
                      </td>
                    ) : (
                      <td>{item.dateofService}</td>
                    )}
                    <td>{item.serviceCharge}</td>

                    <td>{item.desc}</td>

                    <td>
                      {" "}
                      <a>
                        <i
                          class="fa-solid fa-pen-to-square"
                          onClick={() => seteditEnable(item)}
                        ></i>{" "}
                        |
                      </a>
                      <a>
                        <i
                          class="fa-solid fa-trash"
                          style={{ color: "rgb(228, 47, 47)" }}
                          onClick={() => deleteservicedeatils(item._id)}
                        ></i>{" "}
                        |
                      </a>
                      <Link to="/servicebill" state={{ data: item }}>
                        <b style={{ color: "blue" }}>BILL</b>
                      </Link>
                    </td>
                  </tr>
                ))}

                <tr style={{ background: "lightgray" }}>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td style={{ textAlign: "center" }}> </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-5">
            <h6>Previous / Past Service & Complaint Calls Details</h6>
            <table class="table table-hover table-bordered mt-1">
              <thead className="">
                <tr className="table-secondary">
                  <th className="table-head" scope="col">
                    Sr
                  </th>
                  <th className="table-head" scope="col">
                    Cr.Date
                  </th>
                  <th className="table-head" scope="col">
                    Job Category
                  </th>
                  <th className="table-head" scope="col">
                    Complaints
                  </th>
                  <th className="table-head" scope="col">
                    Technician
                  </th>
                  <th className="table-head" scope="col">
                    Status
                  </th>
                  <th className="table-head" scope="col">
                    Service Details
                  </th>
                  <th className="table-head" scope="col">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* {quoteflowdata.map((item) => (
                  <div className="tbl">
                    {item.quotefollup.map((item) => (
                      <div className="tbl">
                        <tr className="user-tbale-body tbl1">
                          <td>{i++}</td>
                          <td>{item.folldate}</td>
                          <td>{item.staffname}</td>
                          <td>{item.response}</td>
                          <td>{item.descrption}</td>
                          <td>{item.quotenxtfoll}</td>
                          <td></td>
                          <td></td>
                        </tr>
                      </div>
                    ))}
                  </div>
                ))} */}
              </tbody>
            </table>
          </div>

          <div className="mt-5">
            <h6>Next / Future Service Calls Details</h6>
            <table class="table table-hover table-bordered mt-1">
              <thead className="">
                <tr className="table-secondary">
                  <th className="table-head" scope="col">
                    Sr
                  </th>
                  <th className="table-head" scope="col">
                    Treatment
                  </th>
                  <th className="table-head" scope="col">
                    Service Date
                  </th>
                  <th className="table-head" scope="col">
                    Amount Paid Date
                  </th>
                  <th className="table-head" scope="col">
                    Service Charges
                  </th>
                  <th className="table-head" scope="col">
                    Service Count
                  </th>
                  <th className="table-head" scope="col">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {treatmentdata.map((item, index) => (
                  <div className="tbl">
                    <tr className="user-tbale-body tbl1">
                      <td>{index++}</td>
                      <td>{item.service}</td>
                      {item.contractType === "AMC" ? (
                        <td>
                          {item.dividedDates.map((a) => (
                            <div>
                              <p>{new Date(a).toLocaleDateString()}</p>
                            </div>
                          ))}
                        </td>
                      ) : (
                        <td>{item.dateofService}</td>
                      )}
                      {item.contractType === "AMC" ? (
                        <td>
                          {item.dividedamtDates.map((a) => (
                            <div>
                              <p>{new Date(a).toLocaleDateString()}</p>
                            </div>
                          ))}
                        </td>
                      ) : (
                        <td>{item.dateofService}</td>
                      )}
                      {item.contractType === "AMC" ? (
                        <td>
                          {item.dividedamtCharges.map((a) => (
                            <div>
                              <p>{a}</p>
                            </div>
                          ))}
                        </td>
                      ) : (
                        <td>{item.serviceCharge}</td>
                      )}

                      <td></td>
                      <td></td>
                    </tr>
                  </div>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Treatment;
