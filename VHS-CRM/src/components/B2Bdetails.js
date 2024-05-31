import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { useNavigate, useParams } from "react-router-dom";
// import Enquiryadd from "./Enquiryadd";
// import Enquirysearch from "./Enquirysearch";
// import Enquirynew from "./Enquirynew";
import Header from "../components/layout/Header";
import { Link, json, useLocation } from "react-router-dom";
import moment from "moment";
import axios from "axios";

function B2Bdetails() {
  const { b2bid } = useParams();

  const admin = JSON.parse(sessionStorage.getItem("admin"));

  const navigate = useNavigate();

  const [staffname, setstaffname] = useState("");
  const [folldate, setfolldate] = useState("");
  const [response, setresponse] = useState("");
  const [desc, setdesc] = useState("");
  const [colorcode, setcolorcode] = useState("");
  const [nxtfoll, setnxtfoll] = useState("00/00/0000");
  const [value, setvalue] = useState("");
  const [filterdata, setfilterdata] = useState([]);
  const [responsedata, setresponsedata] = useState([]);
  const [flwdata, setflwdata] = useState([]);

  const apiURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    getresponse();
  }, []);

  const getresponse = async () => {
    let res = await axios.get(apiURL + "/getresponse");
    if (res.status === 200) {
      console.log(res.data.response);
      setresponsedata(res.data?.response);
    }
  };

  useEffect(() => {
    getb2b();
    getb2bfollowup();
  }, []);

  const getb2b = async () => {
    let res = await axios.get(apiURL + "/getB2B");
    if (res.status === 200) {
      setfilterdata(res.data?.B2B.filter((item) => item.B2BId == b2bid));
    }
  };

  const getb2bfollowup = async () => {
    let res = await axios.get(apiURL + "/getb2bfollowup");
    if (res.status === 200) {
      setflwdata(res.data?.B2B.filter((item) => item.B2BId == b2bid));
    }
  };
  let i = 1;

  const addenquiryfollowup1 = async (e) => {
    e.preventDefault();

    if (!desc || !response) {
      alert("Fill all feilds");
    } else {
      try {
        const config = {
          url: `/addb2bfollowup`,
          method: "post",
          baseURL: apiURL,
          // data: formdata,
          headers: { "content-type": "application/json" },
          data: {
            B2BId: b2bid,
            staffname: admin.displayname,
            category: filterdata[0]?.category,
            folldate: moment().format("llll"),
            response: response,
            desc: desc,
            value: value,
            colorcode: colorcode,
            nxtfoll: nxtfoll,
          },
        };
        await axios(config).then(function (response) {
          if (response.status === 200) {
            console.log("success");
            alert(" Added");

            window.location.assign(`/b2bdetail/${b2bid}`);
          }
        });
      } catch (error) {
        console.error(error);
        alert(" Not Added");
      }
    }
  };

  const addcalllater = async (e) => {
    e.preventDefault();

    if (!desc || !response || !nxtfoll || !colorcode) {
      alert("Fill all feilds");
    } else {
      try {
        const config = {
          url: `/addb2bfollowup`,
          method: "post",
          baseURL: apiURL,
          // data: formdata,
          headers: { "content-type": "application/json" },
          data: {
            B2BId: b2bid,
            staffname: admin.displayname,
            category: filterdata[0]?.category,
            folldate: moment().format("llll"),
            response: response,
            desc: desc,
            value: value,
            colorcode: colorcode,
            nxtfoll: nxtfoll,
          },
        };
        await axios(config).then(function (response) {
          if (response.status === 200) {
            console.log("success");
            alert(" Added");

            window.location.assign(`/b2bdetails/${b2bid}`);
          }
        });
      } catch (error) {
        console.error(error);
        alert(" Not Added");
      }
    }
  };
  const addsurvey = async (e) => {
    e.preventDefault();

    if (!desc || !nxtfoll) {
      alert("Fill all feilds");
    } else {
      try {
        const config = {
          url: `/addb2bfollowup`,
          method: "post",
          baseURL: apiURL,
          // data: formdata,
          headers: { "content-type": "application/json" },
          data: {
            B2BId: b2bid,
            staffname: admin.displayname,
            category: filterdata[0]?.category,
            folldate: moment().format("llll"),
            response: response,
            desc: desc,
            value: value,
            colorcode: colorcode,
            nxtfoll: nxtfoll,
          },
        };
        await axios(config).then(function (response) {
          if (response.status === 200) {
            console.log("success");
            alert(" Added");

            window.location.assign(`/b2bdetails/${b2bid}`);
          }
        });
      } catch (error) {
        console.error(error);
        alert(" Not Added");
      }
    }
  };

  const postconvertcustomer = async (e) => {
    e.preventDefault();

    if (!desc) {
      alert("fill all fields");
    } else {
      try {
        const config = {
          url: `/addb2bfollowup`,
          method: "post",
          baseURL: apiURL,
          // data: formdata,
          headers: { "content-type": "application/json" },
          data: {
            B2BId: b2bid,
            category: filterdata[0]?.category,
            staffname: admin.displayname,
            folldate: moment().format("llll"),
            response: response,
            desc: desc,
            value: value,
            nxtfoll: nxtfoll,
          },
        };
        await axios(config).then(function (response) {
          if (response.status === 200) {
            console.log("success");
            alert(" Added");
            window.location.assign(`/b2bdetails/${b2bid}`);

            // window.location.assign("/convertcustomer",{data});
          }
        });
      } catch (error) {
        console.error(error);
        alert(" Not Added");
      }
    }
  };

  const deleteenquiry = async () => {
    let Ask = window.confirm("Are you sure you want to delete this message?");
    // alert("Are you sure want delete")
    if (Ask === true) {
      axios({
        method: "post",
        url: apiURL + "/deleteteenquiry/" + filterdata[0]?._id,
      })
        .then(function (response) {
          //handle success
          console.log(response);
          window.alert("Deleted successfully");
          window.location.assign("/enquirynew");
        })
        .catch(function (error) {
          //handle error
          console.log(error.response.data);
        });
    } else {
      window.location.assign("/enquirynew");
    }
  };
  const editdetails = (data) => {
    navigate(`/b2bedit/${data}`);
  };
  const createQuote = (data) => {
    navigate(`/createquote/${data}`);
  };

  function getColor(colorcode) {
    if (colorcode === "easy") {
      return "#ffb9798f";
    } else if (colorcode === "medium") {
      return "#0080002e";
    } else if (colorcode === "different") {
      return '#ffb9798f"';
    } else {
      return "transparent";
    }
  }

  const convertISOToNormalDate = (isoDate) => {
    const isoDateObj = new Date(isoDate);
    const normalDateStr = isoDateObj.toLocaleDateString();
    return normalDateStr;
  };

  return (
    <div className="row">
      <Header />

      <div className="row m-auto">
        <div className="col-md-12">
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={12}>
                <Nav variant="pills" className="flex-row">
                  <Nav.Item>
                    <Nav.Link eventKey="">
                      <Link to="/b2badd"> B2B Add</Link>
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link eventKey="third">
                      <Link to="/b2bsearch">B2B Search</Link>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="first">
                      <Link to="/enquirysearch">B2B details</Link>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={12}>
                <Tab.Content>
                  <Tab.Pane eventKey="first"> </Tab.Pane>
                  <Tab.Pane eventKey="second"></Tab.Pane>
                  <Tab.Pane eventKey="third"></Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </div>

      <div className="row m-auto">
        <div className="col-md-12">
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={12}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="row mt-3">
                          <div className="col-md-5">
                            <div className="vhs-sub-heading">B2B Detail</div>
                            <div className="mt-1">
                              <div
                                className="row m-auto"
                                style={{
                                  backgroundColor: "#e2e3e5",
                                  padding: "8px",
                                }}
                              >
                                <div
                                  className="text-end "
                                  style={{ color: "black" }}
                                >
                                  <span onClick={() => editdetails(b2bid)}>
                                    Modify
                                  </span>
                                </div>
                              </div>
                              <table class="table table-hover table-bordered">
                                <tbody>
                                  <tr className="user-tbale-body">
                                    <td colspan="2">
                                      <b>B2B Basic Information</b>
                                    </td>
                                  </tr>
                                  <tr className="user-tbale-body">
                                    <td className="text-center">B2B ID</td>
                                    <td>{filterdata[0]?.B2BId}</td>
                                  </tr>
                                  <tr className="user-tbale-body">
                                    <td className="text-center">B2B Name</td>
                                    <td> {filterdata[0]?.b2bname}</td>
                                  </tr>
                                  <tr className="user-tbale-body">
                                    <td className="text-center">
                                      Contact Person
                                    </td>
                                    <td> {filterdata[0]?.contactperson}</td>
                                  </tr>

                                  <tr className="user-tbale-body">
                                    <td className="text-center">
                                      Main Contact
                                    </td>
                                    <td>{filterdata[0]?.maincontact}</td>
                                  </tr>

                                  <tr className="user-tbale-body">
                                    <td className="text-center">
                                      Alternate Number
                                    </td>
                                    <td>{filterdata[0]?.alternateno}</td>
                                  </tr>

                                  <tr className="user-tbale-body">
                                    <td className="text-center">Email</td>
                                    <td>{filterdata[0]?.email}</td>
                                  </tr>
                                  <tr className="user-tbale-body">
                                    <td colspan="2">
                                      <b>B2B Details Address</b>
                                    </td>
                                  </tr>
                                  <tr className="user-tbale-body">
                                    <td className="text-center">Address</td>
                                    <td>{filterdata[0]?.address}</td>
                                  </tr>

                                  <tr className="user-tbale-body">
                                    <td className="text-center">City</td>
                                    <td>{filterdata[0]?.city}</td>
                                  </tr>

                                  <tr className="user-tbale-body">
                                    <td colspan="2">
                                      <b>B2B other Infirmation</b>
                                    </td>
                                  </tr>

                                  <tr className="user-tbale-body">
                                    <td className="text-center">B2B type</td>
                                    <td>{filterdata[0]?.b2btype}</td>
                                  </tr>

                                  <tr className="user-tbale-body">
                                    <td className="text-center">Approach</td>
                                    <td>{filterdata[0]?.approach}</td>
                                  </tr>

                                  <tr className="user-tbale-body">
                                    <td className="text-center">
                                      Interested For
                                    </td>
                                    <td>{filterdata[0]?.intrestedfor}</td>
                                  </tr>
                                  <tr className="user-tbale-body">
                                    <td colspan="2">
                                      <b>Executive details</b>
                                    </td>
                                  </tr>
                                  <tr className="user-tbale-body">
                                    <td className="text-center">
                                      Executive Name
                                    </td>
                                    <td>{filterdata[0]?.executiveName}</td>
                                  </tr>
                                  <tr className="user-tbale-body">
                                    <td className="text-center">
                                      Executive Number
                                    </td>
                                    <td>{filterdata[0]?.executivenumber}</td>
                                  </tr>
                                  <tr className="user-tbale-body">
                                    <td className="text-center">Entry Date</td>
                                    <td>
                                      {convertISOToNormalDate(
                                        filterdata[0]?.createdAt
                                      )}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>{" "}
                              <div
                                className="row"
                                style={{
                                  backgroundColor: "#e2e3e5",
                                  padding: "8px",
                                  marginTop: "-17px",
                                  marginLeft: "0px",
                                  marginRight: "0px",
                                }}
                              >
                                <div className="text-center"></div>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-7">
                            <div className="vhs-sub-heading">
                              Follow-Up Detail
                            </div>
                            <table class=" mt-1">
                              <thead className="">
                                <tr className="bg">
                                  <th className="bor" scope="col">
                                    Sr
                                  </th>
                                  <th className="bor" scope="col">
                                    Date
                                  </th>
                                  <th className="bor" scope="col">
                                    Staff
                                  </th>
                                  <th className="bor" scope="col">
                                    Response
                                  </th>
                                  <th className="bor" scope="col">
                                    Description
                                  </th>
                                  <th className="bor" scope="col">
                                    Value
                                  </th>
                                  <th className="bor" scope="col">
                                    Next Foll.
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {flwdata.map((item) => (
                                  <tr
                                    key={item.id}
                                    className="user-tbale-body tbl1"
                                    style={{
                                      backgroundColor: getColor(item.colorcode),
                                      color: "black",
                                    }}
                                  >
                                    <td>{i++}</td>
                                    <td>{item.folldate}</td>
                                    <td>{item.staffname}</td>
                                    <td>{item.response}</td>
                                    <td>{item.desc}</td>
                                    <td>{item.value}</td>
                                    <td>{item.nxtfoll}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>

                            <div className="card" style={{ marginTop: "20px" }}>
                              <div className="card-body p-4">
                                <form>
                                  <div className="row">
                                    <div className="col-md-4">
                                      <div className="vhs-input-label">
                                        Staff Name
                                      </div>
                                      <div className="group pt-1 vhs-non-editable">
                                        {admin.displayname}
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="vhs-input-label">
                                        Foll. Date
                                      </div>
                                      <div className="group pt-1 vhs-non-editable">
                                        {moment().format("llll")}
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="vhs-input-label">
                                        Response
                                        <span className="text-danger">*</span>
                                      </div>
                                      <div className="group pt-1">
                                        <select
                                          className="col-md-12 vhs-input-value"
                                          onChange={(e) =>
                                            setresponse(e.target.value)
                                          }
                                        >
                                          <option>--select--</option>
                                          {responsedata.map((i) => (
                                            <option value={i.response}>
                                              {i.response}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row pt-3">
                                    <div className="col-md-4">
                                      <div className="vhs-input-label">
                                        Description
                                        <span className="text-danger"> *</span>
                                      </div>
                                      <div className="group pt-1">
                                        <textarea
                                          rows={20}
                                          cols={20}
                                          className="col-md-12 vhs-input-value"
                                          onChange={(e) =>
                                            setdesc(e.target.value)
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  {response == "New" ? (
                                    <>
                                      <div className="row pt-3">
                                        <div className="col-md-4"></div>
                                        <div className="col-md-2">
                                          <button
                                            className="vhs-button mx-5"
                                            onClick={addenquiryfollowup1}
                                          >
                                            Save
                                          </button>
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    <></>
                                  )}

                                  {response == "Not Intrested" ? (
                                    <>
                                      <div className="row pt-3">
                                        <div className="col-md-4"></div>
                                        <div className="col-md-2">
                                          <button
                                            className="vhs-button mx-5"
                                            onClick={addenquiryfollowup1}
                                          >
                                            Save
                                          </button>
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    <></>
                                  )}

                                  {response == "Survey" ? (
                                    <>
                                      <div className="row pt-3">
                                        <div className="col-md-4">
                                          <div className="vhs-input-label">
                                            Nxt Foll date
                                            <span className="text-danger">
                                              *
                                            </span>
                                          </div>
                                          <div className="group pt-1">
                                            <input
                                              type="date"
                                              className="col-md-12 vhs-input-value"
                                              onChange={(e) =>
                                                setnxtfoll(e.target.value)
                                              }
                                              placeholder={moment().format("L")}
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-2">
                                          <button
                                            className="vhs-button mx-5"
                                            onClick={addsurvey}
                                          >
                                            Save
                                          </button>
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                  {response == "Call Later" ? (
                                    <>
                                      {" "}
                                      <div className="row pt-3">
                                        <div className="col-md-4">
                                          <div className="vhs-input-label">
                                            color code
                                            <span className="text-danger">
                                              *
                                            </span>
                                          </div>
                                          <div className="group pt-1">
                                            <select
                                              className="col-md-12 vhs-input-value"
                                              onChange={(e) =>
                                                setcolorcode(e.target.value)
                                              }
                                            >
                                              <option>--select--</option>
                                              <option value="easy">Easy</option>
                                              <option value="medium">
                                                Medium
                                              </option>
                                              <option value="different">
                                                Different
                                              </option>
                                            </select>
                                          </div>

                                          <div className="col-md-12 mt-2">
                                            <div className="vhs-input-label">
                                              Nxt Foll date
                                              <span className="text-danger">
                                                *
                                              </span>
                                            </div>
                                            <div className="group pt-1">
                                              <input
                                                type="date"
                                                className="col-md-12 vhs-input-value"
                                                onChange={(e) =>
                                                  setnxtfoll(e.target.value)
                                                }
                                                placeholder={moment().format(
                                                  "L"
                                                )}
                                              />
                                            </div>
                                          </div>
                                        </div>

                                        <div className="col-md-2">
                                          <button
                                            className="vhs-button mx-5"
                                            onClick={addcalllater}
                                          >
                                            Save
                                          </button>
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    <></>
                                  )}

                                  {response === "Confirmed" ? (
                                    <div className="col-md-12 mt-2">
                                      {/* <div className="vhs-input-label">
                                        Value
                                        <span className="text-danger">*</span>
                                      </div>
                                      <div className="group pt-1">
                                        <input
                                          type="text"
                                          className="col-md-4 vhs-input-value"
                                          onChange={(e) =>
                                            setvalue(e.target.value)
                                          }
                                        />
                                      </div> */}

                                      <div className="col-md-1 mt-2">
                                        <button
                                          className="vhs-button mx-5"
                                          style={{ width: "150px" }}
                                          onClick={postconvertcustomer}
                                        >
                                          Convert to Customer{" "}
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="col-md-2">
                                      {/* <button
                                          className="vhs-button mx-5"
                                          onClick={addenquiryfollowup1}
                                        >
                                          Save
                                        </button> */}
                                    </div>
                                  )}
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* <div className="vhs-sub-heading pb-2 mt-3">
                          Send SMS
                        </div>
                        <div className="card mb-5" style={{}}>
                          <div className="card-body p-3">
                            <form>
                              <div className="row">
                                <div className="col-md-4">
                                  <div className="vhs-input-label">
                                    SMS Template{" "}
                                    <span className="text-danger"> *</span>
                                  </div>
                                  <div className="group pt-1">
                                    <select className="col-md-12 vhs-input-value">
                                      <option>--select--</option>
                                      <option>After Payment (use this)</option>
                                      <option>
                                        After Service Booked (use this)
                                      </option>
                                      <option>
                                        After Service Schedule (use this)
                                      </option>
                                      <option>Bindu Followup</option>
                                      <option>Enquiry (use this)</option>
                                    </select>
                                  </div>
                                </div>

                                <div className="col-md-4">
                                  <div className="vhs-input-label">
                                    Template ID
                                  </div>
                                  <div className="group pt-1">
                                    <input
                                      type="text"
                                      className="col-md-12 vhs-input-value"
                                    />
                                  </div>
                                </div>

                                <div className="col-md-4">
                                  <div className="vhs-input-label">
                                    SMS Text
                                    <span className="text-danger"> *</span>
                                  </div>
                                  <div className="group pt-1">
                                    <textarea
                                      rows={4}
                                      cols={6}
                                      className="col-md-12 vhs-input-value"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="row pt-3 justify-content-center">
                                <div className="col-md-2">
                                  <button className="vhs-button">
                                    Send SMS
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </Tab.Pane>

                  {/* <Tab.Pane eventKey="second">
                    <Enquiryadd />
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    <Enquirynew />
                  </Tab.Pane>
                  <Tab.Pane eventKey="four">
                    <Enquirysearch />
                  </Tab.Pane> */}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </div>
    </div>
  );
}

export default B2Bdetails;
