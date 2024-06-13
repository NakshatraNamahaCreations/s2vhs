import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { useNavigate, useParams } from "react-router-dom";
import Enquiryadd from "./Enquiryadd";
import Enquirysearch from "./Enquirysearch";
import Enquirynew from "./Enquirynew";
import Header from "../layout/Header";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";

function Enquirynewdetail(props) {
  const { EnquiryId } = useParams();
  const admin = JSON.parse(sessionStorage.getItem("admin"));

  const navigate = useNavigate();

  const [whatsappTemplate, setWhatsappTemplate] = useState("");
  const [desc, setdesc] = useState("");
  const [colorcode, setcolorcode] = useState("");
  const [nxtfoll, setnxtfoll] = useState("00/00/0000");
  const [value, setvalue] = useState("00.00");
  const [responsedata, setresponsedata] = useState([]);
  const [flwdata, setflwdata] = useState([]);

  const apiURL = process.env.REACT_APP_API_URL;
  const [enquiryData, setenquiryData] = useState({});
  const [urlParams, seturlParams] = useState();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const enquiryDataString = urlParams.get("enquiryData");
    const enquiryData = JSON.parse(enquiryDataString);
    seturlParams(urlParams);
    setenquiryData(enquiryData);
  }, [EnquiryId]);

  useEffect(() => {
    const getresponse = async () => {
      try {
        let res = await axios.get(apiURL + "/getresponse");
        if (res.status === 200) {
          setresponsedata(res.data?.response);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    getresponse();
  }, []);

  const getenquiryfollowup = async () => {
    try {
      let res = await axios.get(apiURL + `/filterwithEnquiryId/${EnquiryId}`);
      if ((res.status = 200)) {
        setflwdata(res.data?.enquiryfollowup);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getenquiryfollowup();
  }, []);

  let i = 1;

  // new andr
  const addenquiryfollowup1 = async (e) => {
    e.preventDefault();

    try {
      const config = {
        url: `/addenquiryfollowup`,
        method: "post",
        baseURL: apiURL,
        // data: formdata,
        headers: { "content-type": "application/json" },
        data: {
          EnquiryId: EnquiryId,
          staffname: admin.displayname,
          category: enquiryData?.category,
          folldate: moment().format("llll"),
          response: whatsappTemplate?.response,
          desc: desc,
          value: value,
          colorcode: colorcode,
          nxtfoll: nxtfoll,
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          makeApiCall(whatsappTemplate, enquiryData?.mobile);
          getenquiryfollowup();
          // window.location.reload(`  `);
        }
      });
    } catch (error) {
      console.error(error);
      alert(" Not Added");
    }
  };

  // call later
  const addcalllater = async (e) => {
    e.preventDefault();

    if (!desc || !whatsappTemplate || !nxtfoll || !colorcode) {
      alert("Fill all feilds");
    } else {
      try {
        const config = {
          url: `/addenquiryfollowup`,
          method: "post",
          baseURL: apiURL,
          // data: formdata,
          headers: { "content-type": "application/json" },
          data: {
            EnquiryId: EnquiryId,
            staffname: admin.displayname,
            category: enquiryData?.category,
            folldate: moment().format("llll"),
            response: whatsappTemplate?.response,
            desc: desc,
            value: value,
            colorcode: colorcode,
            nxtfoll: nxtfoll,
          },
        };
        await axios(config).then(function (response) {
          if (response.status === 200) {
            // console.log("success");
            getenquiryfollowup();
            alert(" Added");

            makeApiCall(whatsappTemplate, enquiryData?.mobile);

            // window.location.assign(`/enquirydetail/${EnquiryId}?${urlParams}`);
          }
        });
      } catch (error) {
        console.error(error);
        alert(" Not Added");
      }
    }
  };

  // survey
  const addsurvey = async (e) => {
    e.preventDefault();
    if (!desc || !nxtfoll) {
      alert("Fill all feilds");
    } else {
      try {
        const config = {
          url: `/addenquiryfollowup`,
          method: "post",
          baseURL: apiURL,
          // data: formdata,
          headers: { "content-type": "application/json" },
          data: {
            EnquiryId: EnquiryId,
            staffname: admin.displayname,
            category: enquiryData?.category,
            folldate: moment().format("llll"),
            response: whatsappTemplate?.response,
            desc: desc,
            value: value,
            colorcode: colorcode,
            nxtfoll: nxtfoll,
          },
        };
        await axios(config).then(function (response) {
          if (response.status === 200) {
            getenquiryfollowup();

            makeApiCall(whatsappTemplate, enquiryData?.mobile);
          }
        });
      } catch (error) {
        console.error(error);
        alert("Not Added");
      }
    }
  };
  // confirm
  const postconvertcustomer = async (e) => {
    e.preventDefault();

    if (!desc || !value) {
      alert("fill all fields");
    } else {
      try {
        const config = {
          url: `/addenquiryfollowup`,
          method: "post",
          baseURL: apiURL,
          // data: formdata,
          headers: { "content-type": "application/json" },
          data: {
            EnquiryId: EnquiryId,
            category: enquiryData?.category,
            staffname: admin.displayname,
            folldate: moment().format("llll"),
            response: whatsappTemplate?.response,
            desc: desc,
            value: value,
            nxtfoll: nxtfoll,
          },
        };
        await axios(config).then(function (response) {
          if (response.status === 200) {
            makeApiCall(whatsappTemplate, enquiryData?.mobile);
            getenquiryfollowup();
            navigate(`/convertcustomer/${EnquiryId}?${urlParams}`);
          }
        });
      } catch (error) {
        console.error(error);
        alert(" Not Added");
      }
    }
  };
  console.log("whatsappTemplate---", whatsappTemplate, enquiryData?.mobile);
  // Quote
  const postcreatequote = async (e) => {
    e.preventDefault();

    if (!desc || !nxtfoll) {
      alert("fill all fields");
    } else {
      try {
        const config = {
          url: `/addenquiryfollowup`,
          method: "post",
          baseURL: apiURL,
          // data: formdata,
          headers: { "content-type": "application/json" },
          data: {
            EnquiryId: EnquiryId,
            category: enquiryData?.category,
            staffname: admin.displayname,
            folldate: moment().format("llll"),
            response: whatsappTemplate?.response,
            desc: desc,
            value: value,
            nxtfoll: nxtfoll,
          },
        };
        await axios(config).then(function (response) {
          if (response.status === 200) {
            makeApiCall(whatsappTemplate, enquiryData?.mobile);

            navigate(`/createquote/${EnquiryId}`);
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
        url: apiURL + "/deleteteenquiry/" + enquiryData?._id,
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
    navigate(`/editenquiry/${data}`);
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

  // const makeApiCall = async (selectedResponse, contactNumber) => {
  //   console.log("heelo yogesh gi ");
  //   const apiURL = "http://private.itswhatsapp.com/wapp/api/send";
  //   const accessToken = "ed90cfb9843241b3afb223e56e64aa0c";

  //   const contentTemplate = selectedResponse?.template || "";
  //   const executivename = admin.displayname || "";

  //   if (!contentTemplate) {
  //     console.error("Content template is empty. Cannot proceed.");
  //     return;
  //   }

  //   const content = contentTemplate.replace(
  //     /\{Customer_name\}/g,
  //     enquiryData?.name
  //   );

  //   const contentWithNames = content.replace(
  //     /\{Executive_name\}/g,
  //     admin?.displayname
  //   );

  //   const contentWithMobile = contentWithNames.replace(
  //     /Executive_contact/gi,
  //     admin?.contactno
  //   );

  //   // Replace <p> with line breaks and remove HTML tags
  //   const convertedText = contentWithMobile
  //     .replace(/<p>/g, "\n")
  //     .replace(/<\/p>/g, "")
  //     .replace(/<br>/g, "\n")
  //     .replace(/&nbsp;/g, "")
  //     .replace(/<strong>(.*?)<\/strong>/g, "<b>$1</b>")
  //     .replace(/<[^>]*>/g, "");

  //   const requestData = {
  //     apikey: "ed90cfb9843241b3afb223e56e64aa0c",
  //     mobile: "6363022752",
  //     msg: convertedText,
  //   };

  //   try {
  //     const response = await axios.post(apiURL, requestData, {
  //       headers: {
  //         params: requestData,
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (response.status === 200) {
  //       // window.location.assign(`/enquirydetail/${EnquiryId}?${urlParams}`);
  //       window.location.reload(`  `);
  //     } else {
  //       console.error("API call unsuccessful. Status code:", response.status);
  //     }
  //   } catch (error) {
  //     // alert(error.message)
  //     console.error("Error making API call:", error.message);
  //   }
  // };
  const makeApiCall = async (selectedResponse, contactNumber) => {
    const contentTemplate = selectedResponse?.template || "";
    const executivename = admin.displayname || "";

    if (!contentTemplate) {
      console.error("Content template is empty. Cannot proceed.");
      return;
    }

    const content = contentTemplate.replace(
      /\{Customer_name\}/g,
      enquiryData?.name
    );

    const contentWithNames = content.replace(
      /\{Executive_name\}/g,
      admin?.displayname
    );

    const contentWithMobile = contentWithNames.replace(
      /Executive_contact/gi,
      admin?.contactno
    );

    // Replace <p> with line breaks and remove HTML tags
    const convertedText = contentWithMobile
      .replace(/<p>/g, "\n")
      .replace(/<\/p>/g, "")
      .replace(/<br>/g, "\n")
      .replace(/&nbsp;/g, "")
      .replace(/<strong>(.*?)<\/strong>/g, "<b>$1</b>")
      .replace(/<[^>]*>/g, "");

    console.log("convertedText===", convertedText);

    try {
      const response = await axios.post(
        "https://api.vijayhomeservicebengaluru.in/send-message",
        {
          mobile: contactNumber,
          msg: convertedText,
        }
      );

      if (response.status === 200) {
        window.location.reload(``);
      }
    } catch (error) {
      console.error(error);
    }
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
                      <Link to="/enquiryadd"> Enquiry Add</Link>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">
                      <Link to="/enquirynew">Enquiry New</Link>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="fourth">
                      <Link to="/new">New</Link>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="third">
                      <Link to="/enquirysearch">Enquiry Search</Link>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={12}>
                <Tab.Content>
                  <Tab.Pane eventKey="first"></Tab.Pane>
                  <Tab.Pane eventKey="second"></Tab.Pane>
                  <Tab.Pane eventKey="third"></Tab.Pane>
                  <Tab.Pane eventKey="fourth"></Tab.Pane>
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
                            <div className="vhs-sub-heading">
                              Enquiry Detail
                            </div>
                            <div className="mt-1">
                              <div
                                className="row m-auto"
                                style={{
                                  backgroundColor: "#e2e3e5",
                                  padding: "8px",
                                }}
                              >
                                <div
                                  className="text-center "
                                  style={{ color: "black" }}
                                >
                                  <span onClick={() => editdetails(EnquiryId)}>
                                    Modify
                                  </span>
                                  |<Link onClick={deleteenquiry}>Delete </Link>
                                  {/* <span onClick={() => createQuote(EnquiryId)}>
                                    Create Quote
                                  </span> */}
                                </div>
                              </div>
                              <table class="table table-hover table-bordered">
                                <tbody>
                                  <tr className="user-tbale-body">
                                    <td className="text-center">Enquiry ID</td>
                                    <td>{enquiryData?.EnquiryId}</td>
                                  </tr>
                                  <tr className="user-tbale-body">
                                    <td className="text-center">Category</td>
                                    <td> {enquiryData?.category}</td>
                                  </tr>
                                  <tr className="user-tbale-body">
                                    <td className="text-center">
                                      Enquiry Date
                                    </td>
                                    <td> {enquiryData?.date}</td>
                                  </tr>

                                  <tr className="user-tbale-body">
                                    <td className="text-center">Executive</td>
                                    <td>{enquiryData?.executive}</td>
                                  </tr>

                                  <tr className="user-tbale-body">
                                    <td className="text-center">Name</td>
                                    <td>{enquiryData?.name}</td>
                                  </tr>

                                  <tr className="user-tbale-body">
                                    <td className="text-center">Contact 1</td>
                                    <td>
                                      {enquiryData?.mobile} {""}{" "}
                                      <a
                                        href={`https://wa.me/+91${enquiryData?.mobile}`}
                                        target="_blank"
                                      >
                                        <i
                                          class="fa-brands fa-whatsapp"
                                          style={{
                                            fontSize: "25px",
                                            color: "green",
                                          }}
                                        ></i>
                                      </a>
                                    </td>
                                  </tr>

                                  <tr className="user-tbale-body">
                                    <td className="text-center">Contact 2</td>
                                    <td>{enquiryData?.contact2} </td>
                                  </tr>

                                  <tr className="user-tbale-body">
                                    <td className="text-center">Email Id</td>
                                    <td>{enquiryData?.email}</td>
                                  </tr>

                                  <tr className="user-tbale-body">
                                    <td className="text-center">Address</td>
                                    <td>{enquiryData?.address}</td>
                                  </tr>

                                  <tr className="user-tbale-body">
                                    <td className="text-center">Reference</td>
                                    <td>{enquiryData?.reference1}</td>
                                  </tr>

                                  <tr className="user-tbale-body">
                                    <td className="text-center">Reference 2</td>
                                    <td>{enquiryData?.reference2}</td>
                                  </tr>

                                  <tr className="user-tbale-body">
                                    <td className="text-center">
                                      Interested For
                                    </td>
                                    <td>{enquiryData?.intrestedfor}</td>
                                  </tr>
                                  <tr className="user-tbale-body">
                                    <td className="text-center">Comment</td>
                                    <td>{enquiryData?.comment}</td>
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
                                {flwdata?.map((item) => (
                                  <tr
                                    key={item.id}
                                    className="user-tbale-body tbl1"
                                    style={{
                                      backgroundColor: getColor(item.colorcode),
                                      color: "black",
                                    }}
                                  >
                                    <td>{i++}</td>
                                    <td>{item?.folldate}</td>
                                    <td>{item?.staffname}</td>
                                    <td>{item?.response}</td>
                                    <td>{item?.desc}</td>
                                    <td>{item?.value}</td>
                                    <td>{item?.nxtfoll}</td>
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
                                        <p style={{ fontSize: "12px" }}>
                                          {moment().format("llll")}
                                        </p>
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
                                          onChange={(e) => {
                                            const selectedResponse =
                                              responsedata?.find(
                                                (item) =>
                                                  item?.response ===
                                                  e.target.value
                                              );

                                            setWhatsappTemplate(
                                              selectedResponse
                                            );
                                          }}
                                        >
                                          <option>--select--</option>
                                          {responsedata?.map((i) => (
                                            <option value={i?.response}>
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

                                  {whatsappTemplate &&
                                  whatsappTemplate?.response === "New" ? (
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

                                  {whatsappTemplate &&
                                  whatsappTemplate.response ===
                                    "Not Intrested" ? (
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
                                  {whatsappTemplate &&
                                  whatsappTemplate.response === "Quote" ? (
                                    <>
                                      <div className="col-md-4">
                                        <div className="vhs-input-label">
                                          color code
                                          <span className="text-danger">*</span>
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
                                              placeholder={moment().format("L")}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row pt-3">
                                        <div className="col-md-4"></div>
                                        <div className="col-md-5">
                                          <button
                                            className="vhs-button mx-5"
                                            onClick={postcreatequote}
                                          >
                                            Create Quote
                                          </button>
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    <></>
                                  )}

                                  {whatsappTemplate &&
                                  whatsappTemplate.response === "Survey" ? (
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
                                  {whatsappTemplate &&
                                  whatsappTemplate.response === "Call Later" ? (
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

                                  {whatsappTemplate &&
                                  whatsappTemplate.response === "Confirmed" ? (
                                    <div className="col-md-12 mt-2">
                                      <div className="vhs-input-label">
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
                                      </div>

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
                                    <div className="col-md-2"></div>
                                  )}
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tab.Pane>

                  <Tab.Pane eventKey="second">
                    <Enquiryadd />
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    <Enquirynew />
                  </Tab.Pane>
                  <Tab.Pane eventKey="four">
                    <Enquirysearch />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </div>
    </div>
  );
}

export default Enquirynewdetail;
