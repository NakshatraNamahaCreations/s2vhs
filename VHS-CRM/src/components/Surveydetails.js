import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./layout/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import moment from "moment";

function Createquote() {
  const admin = JSON.parse(sessionStorage.getItem("admin"));
  const navigate = useNavigate();
  const location = useLocation();
  const { data, sydate } = location.state;

  const [techniciandata, settechniciandata] = useState([]);
  const [vendordata, setvendordata] = useState([]);
  const apiURL = process.env.REACT_APP_API_URL;
  const [technician, settechnician] = useState();
  const [appoDate, setappoDate] = useState(
    data?.appoDate ? data?.appoDate : data?.nxtfoll
  );

  const [appoTime, setappTime] = useState(
    data.appoTime ? data.appoTime : moment().format("LT")
  );
  const [sendSms, setsendSms] = useState(data.sendSms);
  const [whatsappdata, setwhatsappdata] = useState([]);
  const [whatsappTemplate, setWhatsappTemplate] = useState("");
  const [serviceSlots, setServiceSlots] = useState([]);
  const [serviceDetails, setServiceDetails] = useState([]);
  let defaultChecked = false;
  if (data.length > 0 && typeof data.Type !== "undefined") {
    defaultChecked = data.Type || "";
  }
  const [type, settype] = useState(defaultChecked);

  const handleChange2 = (event) => {
    settype(event.target.value);
  };
  const [serviceId, setServiceId] = useState("");

  const [wtype, setwtype] = useState("YES");

  const handleChange3 = (event) => {
    setwtype(event.target.value);
  };

  useEffect(() => {
    gettechnician();
  }, []);

  // const gettechnician = async () => {
  //   let res = await axios.get(apiURL + "/findwithexexutivefromcrm", {
  //     city: data.enquirydata[0].city,
  //     category: data.enquirydata[0].category,
  //   });
  //   if (res.status === 200) {
  //     const TDdata = res.data?.technician;
  //     const filteredTechnicians = TDdata.filter((technician) => {
  //       return technician.category.some(
  //         (cat) => cat.name === data.enquirydata[0].category
  //       );
  //     });
  //     // console.log("filteredTechnicians", filteredTechnicians);
  //     settechniciandata(
  //       filteredTechnicians.filter(
  //         (i) => i.city === data.enquirydata[0].city && i.Type === "executive"
  //       )
  //     );
  //     setvendordata(
  //       filteredTechnicians.filter(
  //         (i) => i.city === data.enquirydata[0].city && i.Type === "Vendor"
  //       )
  //     );
  //   }
  // };

  const gettechnician = async () => {
    console.log("api hit");
    try {
      let res = await axios.get(apiURL + "/findwithexexutivefromcrm", {
        params: {
          city: data.enquirydata[0].city,
          category: data.enquirydata[0].category,
        },
      });
      if (res.status === 200) {
        console.log("res.data?.technician", res.data?.technician);
        settechniciandata(res.data?.technician);
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error here
    }
  };

  // useEffect(() => {
  //   const getServicebyCategory = async () => {
  //     try {
  //       let res = await axios.post(apiURL + `/userapp/getservicebycategory/`, {
  //         category: data?.enquirydata[0]?.category,
  //       });
  //       if (res.status === 200) {
  //         // console.log("service details by category", res.data);
  //         setServiceDetails(res.data?.serviceData);
  //         if (res.data?.serviceData.length > 0) {
  //           setServiceId(res.data.serviceData[0]._id);
  //         } else {
  //           setServiceSlots([]);
  //         }
  //       }
  //     } catch (error) {
  //       console.log("Error", error);
  //     }
  //   };

  //   getServicebyCategory();
  // }, [data?.category]);

  useEffect(() => {
    const getSlotsByService = async () => {
      try {
        let res = await axios.post(apiURL + `/userapp/getslots/`);
        if (res.status === 200) {
          setServiceSlots(res.data?.slots);
        }
      } catch (error) {
        console.log("Error", error);
      }
    };

    if (serviceId) {
      getSlotsByService();
    }
  }, [serviceId, data]);

  useEffect(() => {
    getwhatsapptemplate();
  }, []);

  const [srechdule, setsreschdule] = useState([]);
  const getwhatsapptemplate = async () => {
    let res = await axios.get(apiURL + "/getwhatsapptemplate");
    if (res.status === 200) {
      const data = res?.data?.whatsapptemplate;
      setsreschdule(
        data?.filter((item) => item.templatename === "Survey reschedule")
      );
      setwhatsappdata(data);
    }
  };

  useEffect(() => {
    getallslots();
  }, [data]);

  const getallslots = async () => {
    let res = await axios.get(apiURL + "/userapp/getslots");
    if (res.status === 200) {
      // console.log("res.data?.slots",res.data?.slots)
      setServiceSlots(res.data?.slots);
    }
  };

  let getTemplateDatails = whatsappdata.find(
    (item) => item.templatename === "Survey assign"
  );

  const Save = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: `/updateserviceexe/${data._id}`,
        method: "post",
        baseURL: apiURL,
        headers: { "content-type": "application/json" },
        data: {
          technicianname: technician?.vhsname,
          techId: technician?._id,
          appoDate: appoDate,
          appoTime: appoTime,
          sendSms: sendSms,
          responseType: getTemplateDatails,
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          if (wtype === "YES") {
            if (!data?.technicianname) {
              makeApiCall(getTemplateDatails, data?.enquirydata[0]?.mobile);
            } else {
              reschdulewhat(srechdule[0], data?.enquirydata[0]?.mobile);
            }
          } else {
            window.location.assign(
              `/surveydatatable/${sydate}/${data?.category}`
            );
          }
        }
      });
    } catch (error) {
      console.error(error);
      alert("  Not Added");
    }
  };

  const makeApiCall = async (getTemplateDatails, contactNumber, invoiceId) => {
    const apiURL =
      "https://wa.chatmybot.in/gateway/waunofficial/v1/api/v2/message";
    const accessToken = "c7475f11-97cb-4d52-9500-f458c1a377f4";

    const contentTemplate = getTemplateDatails?.template || "";

    if (!contentTemplate) {
      console.error("Content template is empty. Cannot proceed.");
      return;
    }
    const invoiceLink = contentTemplate
      .replace(/\{Customer_name\}/g, data.enquirydata[0].name)
      .replace(/\{Service_name\}/g, data.enquirydata[0].intrestedfor)
      .replace(/\{Appointment_datetime\}/g, appoDate)
      .replace(/\{Executive_name\}/g, technician?.smsname)
      .replace(/\{Executive_contact\}/g, technician.number)
      .replace(/\{Technician_experiance\}/g, technician?.experiance)
      .replace(/\{Technician_languages_known\}/g, technician?.languagesknow);

    // Replace <p> with line breaks and remove HTML tags
    const convertedText = invoiceLink
      .replace(/<p>/g, "\n")
      .replace(/<\/p>/g, "")
      .replace(/<br>/g, "\n")
      .replace(/&nbsp;/g, "")
      .replace(/<strong>(.*?)<\/strong>/g, "<b>$1</b>")
      .replace(/<[^>]*>/g, "");

    const requestData = [
      {
        dst: "91" + contactNumber,
        messageType: "0",
        textMessage: {
          content: convertedText,
        },
      },
    ];
    try {
      const response = await axios.post(apiURL, requestData, {
        headers: {
          "access-token": accessToken,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        // setWhatsappTemplate(response.data);
        window.location.assign(`/surveydatatable/${sydate}/${data?.category}`);
      } else {
        console.error("API call unsuccessful. Status code:", response.status);
      }
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };
  const reschdulewhat = async (
    getTemplateDatails,
    contactNumber,
    invoiceId
  ) => {
    const apiURL =
      "https://wa.chatmybot.in/gateway/waunofficial/v1/api/v2/message";
    const accessToken = "c7475f11-97cb-4d52-9500-f458c1a377f4";

    const contentTemplate = getTemplateDatails?.template || "";

    if (!contentTemplate) {
      console.error("Content template is empty. Cannot proceed.");
      return;
    }
    const invoiceLink = contentTemplate
      .replace(/\{Customer_name\}/g, data.enquirydata[0].name)
      .replace(/\{Service_name\}/g, data.enquirydata[0].intrestedfor)
      .replace(/\{survey_date\}/g, data?.nxtfoll)
      .replace(/\{reschedule_ survey_date\}/g, appoDate);

    // Replace <p> with line breaks and remove HTML tags
    const convertedText = invoiceLink
      .replace(/<p>/g, "\n")
      .replace(/<\/p>/g, "")
      .replace(/<br>/g, "\n")
      .replace(/&nbsp;/g, "")
      .replace(/<strong>(.*?)<\/strong>/g, "<b>$1</b>")
      .replace(/<[^>]*>/g, "");

    const requestData = [
      {
        dst: "91" + contactNumber,
        messageType: "0",
        textMessage: {
          content: convertedText,
        },
      },
    ];
    try {
      const response = await axios.post(apiURL, requestData, {
        headers: {
          "access-token": accessToken,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        // setWhatsappTemplate(response.data);
        window.location.assign(`/surveydatatable/${sydate}/${data?.category}`);
      } else {
        console.error("API call unsuccessful. Status code:", response.status);
      }
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

  const today = new Date();
  const numberOfDaysToAdd = 3;
  const date = today.setDate(today.getDate() + numberOfDaysToAdd);
  const todaydate = new Date(date).toISOString().split("T")[0];

  const editdetails = (data) => {
    navigate(`/editenquiry/${data.EnquiryId}`);
  };

  const quotation = (data) => {
    if (data) {
      window.location.assign(`/quotedetails/?id=${data.EnquiryId}`, {
        state: { data: data },
      });
    } else {
    }
  };

  return (
    <div className="web">
      <Header />
      {/* <Surveynav /> */}
      <div className="row m-auto">
        {" "}
        <div style={{ background: "white", color: "black" }}>
          <div className="card" style={{ marginTop: "20px" }}>
            <div className="card-body p-4">
              <div className="row pt-3  ">
                <div className="col-md-2">
                  <button
                    className="vhs-button"
                    style={{ width: "120px" }}
                    onClick={() => editdetails(data)}
                  >
                    Edit Details
                  </button>
                </div>
                <div className="col-md-2">
                  <button
                    className="vhs-button mx-5"
                    onClick={() => quotation(data)}
                  >
                    Quotation
                  </button>
                </div>
              </div>

              <form>
                <div className="row mt-4">
                  <div className="">
                    <b>Customer Name : </b>
                    {data.enquirydata[0]?.name}
                  </div>

                  <div className="col-md-4">
                    <div className="">
                      <b>Contact1 : </b>
                      {data.enquirydata[0]?.mobile}{" "}
                      <a
                        href={`https://wa.me/+91${data.enquirydata[0]?.mobile}`}
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
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <b>Contact2 : </b>
                      {data.enquirydata[0]?.contact2}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <b>Email : </b>
                      {data.enquirydata[0]?.email}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="">
                      <b>Address : </b>
                      {data.enquirydata[0]?.address}
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="">
                      <b>Customer Type : </b>
                      {/* {data.enquirydata[0]?.customertype} */}
                      other
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="">
                      <b>desc : </b>
                      {data?.desc}
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="">
                    <b>Executive : </b>
                    {data.staffname}
                  </div>
                </div>
              </form>
            </div>

            <div className="card-body p-4">
              <h5>Job Information</h5>
              <hr />
              <form>
                <div className="row">
                  {" "}
                  <div className="col-md-4">
                    <div className="vhs-input-label">Enquiry Date</div>
                    <div className="group pt-1">
                      <input
                        value={data.enquirydata[0]?.date}
                        className="col-md-12 vhs-input-value"
                        placeholder={data.date}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label">Enquiry time</div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        // defaultValue={data.enquirydata[0]?.time}
                        className="col-md-12 vhs-input-value"
                        value={data.enquirydata[0]?.Time}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">Apppointment Date</div>
                    <div className="group pt-1">
                      <input
                        type="date"
                        className="col-md-12 vhs-input-value"
                        defaultValue={
                          data?.appoDate ? data?.appoDate : data?.nxtfoll
                        }
                        onChange={(e) => setappoDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">Apppointment Time </div>
                    <div className="group pt-1">
                      <select
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setappTime(e.target.value)}
                        name="material"
                        defaultValue={data.appoTime}
                      >
                        {data.appoTime ? (
                          <option>{data.appoTime}</option>
                        ) : (
                          <option>--select--</option>
                        )}
                        {serviceSlots?.map((slot, index) => (
                          <option key={index} value={`${slot.startTime}`}>
                            {`${slot.startTime} `}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <h5>Service and Repair information</h5>
                  <hr />

                  <div className="row">
                    <div className="group pt-1 mt-3">
                      <label>
                        <input
                          type="radio"
                          value="executive"
                          className="custom-radio mx-2"
                          checked={type === "executive"}
                          onChange={handleChange2}
                        />
                        Executive Name
                      </label>

                      <label className="mx-3">
                        <input
                          type="radio"
                          value="Vendor"
                          className="custom-radio mx-2"
                          checked={type === "Vendor"}
                          onChange={handleChange2}
                        />
                        Vendor
                      </label>
                    </div>{" "}
                    <div className="col-md-4 mt-3">
                      {type === "executive" ? (
                        <div>
                          <div className="vhs-input-label">Executive Name</div>
                          <select
                            className="col-md-12 vhs-input-value"
                            onChange={(e) => {
                              const selectedTechnician = techniciandata.find(
                                (item) => item.vhsname === e.target.value
                              );
                              console.log(
                                "selectedTechnician",
                                selectedTechnician
                              );

                              settechnician(selectedTechnician);
                            }}
                          >
                            {!data.technicianname ? (
                              <option>-select-</option>
                            ) : (
                              <option>{data.technicianname}</option>
                            )}
                            {techniciandata.map((i) => (
                              <option value={i.vhsname}>{i.vhsname}</option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <div>
                          <div className="vhs-input-label">
                            Vendor Name
                            {/* <span className="text-danger">*</span> */}
                          </div>
                          <select
                            className="col-md-12 vhs-input-value"
                            onChange={(e) => settechnician(e.target.value)}
                          >
                            {!data.technicianname ? (
                              <option>-select-</option>
                            ) : (
                              <option>{data.technicianname}</option>
                            )}
                            {vendordata.map((i) => (
                              <option value={i.vhsname}>{i.vhsname}</option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="group pt-1 mt-3">
                      <h6 className="mt-3">Send whatsapp Template</h6>
                      <label>
                        <input
                          type="radio"
                          value="YES"
                          className="custom-radio mx-2"
                          checked={wtype === "YES"}
                          onChange={handleChange3}
                        />
                        YES
                      </label>

                      <label className="mx-3">
                        <input
                          type="radio"
                          value="NO"
                          className="custom-radio mx-2"
                          checked={wtype === "NO"}
                          onChange={handleChange3}
                        />
                        NO
                      </label>
                    </div>{" "}
                  </div>
                </div>
                <div className="row pt-3 mt-5 ">
                  <div className="col-md-2">
                    <button className="vhs-button" onClick={Save}>
                      Save
                    </button>
                  </div>
                  <div className="col-md-2">
                    <Link to="/surveycategory">
                      <button className="vhs-button mx-5">Cancel</button>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Createquote;
