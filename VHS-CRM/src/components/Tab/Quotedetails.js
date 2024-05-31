import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../layout/Header";
import { Link, useLocation, useNavigate,  } from "react-router-dom";

import Quotenav from "../Quotenav";
import moment from "moment";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Quotedetails() {
  const [show, setShow] = useState(false);
  const data = useLocation();
  const EnquiryId = new URLSearchParams(data.search).get("id");
  const [jobId, setJobId] = useState("");
  const [jobName, setJobName] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const admin = JSON.parse(sessionStorage.getItem("admin"));

  const navigate = useNavigate();
  const [materialdata, setmaterialdata] = useState([]);
  const [regiondata, setregiondata] = useState([]);
  const apiURL = process.env.REACT_APP_API_URL;
  const [ajobdata, setajobdata] = useState([]);
  const [ajobdatarate, setajobdatarate] = useState([]);
  const [note, setnote] = useState("");

  const [region, setregion] = useState("");
  const [material, setmaterial] = useState("");
  const [qty, setqty] = useState("");
  const [job, setjob] = useState("");
  const [rate, setrate] = useState(ajobdatarate?.rate);
  const [quoteflowdata, setquoteflowdata] = useState([]);
  const [quotenxtfoll, setquotenxtfoll] = useState("00-00-0000");
  const [staffname, setstaffname] = useState("");
  const [folldate, setfolldate] = useState("");
  const [response, setresponse] = useState([]);
  const [response1, setresponse1] = useState("");
  const [quotedata, setquotedata] = useState([]);
  const [descrption, setdescrption] = useState("");
  const [category, setcategory] = useState("");
  const [treatmentdata, settreatmentdata] = useState([]);
  const [categorydata, setcategorydata] = useState([]);
  const [Gst, setGST] = useState(false);

  const [adjustments, setadjustment] = useState(quotedata[0]?.adjustments);
  const [SUM, setSUM] = useState("");
  const [quotepagedata, setquotepagedata] = useState([]);
  const [enquirydata, setenquirydata] = useState([]);
  const [projecttype, setprojecttype] = useState(
    quotepagedata[0]?.quotedata[0]?.projectType
  );

  const [paymentDetails, setPaymentDetails] = useState([]);
  const [paymentDate, setPaymentDate] = useState(moment().format("MM-DD-YYYY"));
  const [paymentType, setPaymentType] = useState("");
  const [paymentComments, setPaymentComments] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [colorcode, setcolorcode] = useState("");
  const [advpaymentdata, setAdvPaymentData] = useState([]);

  const getquote = async () => {
    let res = await axios.get(apiURL + `/getfilterwithEnquiryid/${EnquiryId}`);
    if ((res.status = 200)) {
      setquotedata(res.data?.quote);

    }
  };



  useEffect(() => {
    if (quotedata.length > 0) {
      const initialNetTotal = quotedata[0]?.netTotal;
      setnetTotal(
        initialNetTotal >= total
          ? quotedata[0]?.netTotal
          : Gst || adjustments
            ? total + Gst - parseFloat(quotedata[0]?.adjustments)
            : 0 // Replace 0 with a default value if needed
      );

    }
  }, [quotedata, quotepagedata]);


  useEffect(() => {
    getresponse();
    getcategory();
    getenquiryadd();
  }, []);

  const getcategory = async () => {
    let res = await axios.get(apiURL + "/getcategory");
    if ((res.status = 200)) {
      setcategorydata(res.data?.category);
    }
  };

  const getresponse = async () => {
    let res = await axios.get(apiURL + "/getresponse");
    if ((res.status = 200)) {
      setresponse(res.data?.response);
    }
  };
  const getenquiryadd = async () => {
    let res = await axios.get(apiURL + `/getwithenqid/${EnquiryId}`);
    if ((res.status = 200)) {
      setenquirydata(
        res.data?.enquiryadd
      );
      console.log("res.data?.enquiryadd", res.data?.enquiryadd)
    }
  };

  const addquotefollowup = async (e) => {
    e.preventDefault();
    if (response1)
      try {
        const config = {
          url: `/addquotefollowup`,
          method: "post",
          baseURL: apiURL,
          // data: formdata,
          headers: { "content-type": "application/json" },
          data: {
            EnquiryId: EnquiryId,
            category: quotepagedata[0]?.category,
            staffname: admin.displayname,
            folldate: moment().format("L"),
            folltime: moment().format("LT"),
            response: response1,
            nxtfoll: quotenxtfoll,
            desc: descrption,
            colorcode: colorcode,
          },
        };

        await axios(config).then(function (response) {


          if (response.status === 200) {
            console.log("success");
            if (response1 === "Confirmed") {
              updatedquotationtype();
              console.log("hello ")
            }
            window.location.reload('')
          }
        });
      } catch (error) {
        console.error(error);
        alert(" Not Added");
      }
  };

  const addtreatment = async (e) => {
    e.preventDefault();
    if (!region | !material | !qty | !jobName) {
      alert("Fill all fields");
    } else {
      try {
        const config = {
          url: "/addtreatment",
          method: "post",
          baseURL: apiURL,
          // data: formdata,
          headers: { "content-type": "application/json" },
          data: {
            EnquiryId: EnquiryId,
            number: enquirydata[0]?.mobile,
            category: category,
            region: region,
            material: material,
            job: jobName,
            qty: qty,
            rate: rate ? rate : ajobdatarate?.rate,
            subtotal:
              qty && (rate ? qty * rate : qty * (ajobdatarate?.rate || 0)),
            note: note,
          },
        };
        await axios(config).then(function (response) {
          if (response.status === 200) {
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
    getquotepage();
  }, [EnquiryId]);

  const getquotepage = async () => {
    let res = await axios.get(apiURL + `/getenquiryquote/${EnquiryId}`);
    if ((res.status = 200)) {
      setquotepagedata(
        res.data?.enquiryadd);
    }
  };
  const gettreatment = async () => {
    let res = await axios.get(apiURL + "/gettreatment");
    if ((res.status = 200)) {
      settreatmentdata(
        res.data?.treatment.filter((i) => i.EnquiryId == EnquiryId)
      );
    }
  };

  useEffect(() => {
    // getmaterial();
    // getregion();
    getquote();

    gettreatment();
  }, []);

  useEffect(() => {
    postallajob();
    postallmaterial();
    postallregion();
  }, [category]);

  const postallregion = async () => {
    let res = await axios.post(apiURL + "/master/categoryaregion", {
      category: category,
    });
    if ((res.status = 200)) {
      setregiondata(res.data?.aregion);
    }
  };

  const postallmaterial = async () => {
    let res = await axios.post(apiURL + "/master/categorymaterial", {
      category: category,
    });
    if ((res.status = 200)) {
      setmaterialdata(res.data?.amaterial);
    }
  };

  useEffect(() => {
    if (quotedata.length > 0) {
      setGST(quotedata[0]?.GST || false);
    }
  }, [quotedata]);

  useEffect(() => {
    postallajob();
  }, [material]);

  const postallajob = async () => {
    let res = await axios.post(apiURL + "/master/postajob", {
      material: material,
    });
    if ((res.status = 200)) {
      setajobdata(res.data?.ajob);
    }
  };

  useEffect(() => {
    postAllAJobRate();
  }, [jobId]);

  const postAllAJobRate = async () => {
    try {
      const res = await axios.post(apiURL + `/master/postajobrate/${jobId}`);
      if (res.status === 200) {
        const aJobData = res.data?.ajob;
        setajobdatarate(aJobData);
        if (aJobData && aJobData.length > 0) {
          setrate(aJobData[0]?.rate);
        }
      }
    } catch (error) {
      // Handle errors here, for example:
      console.error("Error fetching job rate:", error);
      // Set default values or handle the error accordingly
    }
  };

  var i = 1;

  const deletetreatment = async (id) => {
    axios({
      method: "post",
      url: apiURL + "/deletetreatment/" + id,
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

  function calculateTotalPrice(data) {
    let totalPrice = 0;
    for (let i = 0; i < data.length; i++) {
      totalPrice += parseInt(data[i].subtotal);
    }
    return totalPrice;
  }

  const total = calculateTotalPrice(treatmentdata);

  const savequote = async (e) => {
    e.preventDefault();

    if (!total) {
      alert("something went wrong");
    } else {
      try {
        // Calculate adjusted total and net total

        const config = {
          url: "/addquote",
          method: "post",
          baseURL: apiURL,
          // data: formdata,
          headers: { "content-type": "application/json" },
          data: {
            EnquiryId: EnquiryId,
            number: enquirydata[0]?.mobile,
            GST: Gst,
            projectType: projecttype,
            qamt: netTotal,
            adjustments: adjustments,
            SUM: total,
            total: total,
            netTotal: netTotal,
            Bookedby: admin.displayname,
            salesExecutive: admin.displayname,
            exenumber: admin.contactno,
            date: moment().format("L"),
            time: moment().format("LT"),
          },
        };
        await axios(config).then(function (response) {
          if (response.status === 200) {
            window.location.reload();
          }
        });
      } catch (error) {
        console.error(error);
        alert(" Not Added");
      }
    }
  };

  console.log("quotedata[0]?._id", quotedata[0]?._id)
  const updatequote = async (e) => {
    e.preventDefault();

    if (!total) {
      alert("something went wrong");
    } else {
      try {
        const config = {
          url: `/updatequotedetails/${quotedata[0]?._id}`,
          method: "post",
          baseURL: apiURL,
          // data: formdata,
          headers: { "content-type": "application/json" },
          data: {
            EnquiryId: EnquiryId,
            GST: Gst,
            projectType: projecttype,
            number: enquirydata[0]?.mobile,
            qamt: netTotal,
            adjustments: adjustments,
            SUM: total,
            total: total,
            netTotal: netTotal,
            date: quotedata[0]?.date,
            time: quotedata[0]?.time,
            salesExecutive: admin.displayname,
            Bookedby: admin.displayname,
            exenumber: admin.contactno,
          },
        };
        await axios(config).then(function (response) {
          if (response.status === 200) {
            window.location.reload();
          }
        });
      } catch (error) {
        console.error(error);
        alert(" Not Added");
      }
    }
  };

  const editdetails = (EnquiryId) => {
    navigate(`/editenquiry/${EnquiryId}`);
  };

  useEffect(() => {
    // Calculate adjusted netTotal based on Gst and adjustments
    const total = calculateTotalPrice(treatmentdata);
    const GSTAmount = total * 0.05;
    const totalWithGST = Gst ? total + GSTAmount : total;

    const adjustedNetTotal = Gst
      ? totalWithGST - parseFloat(adjustments) || totalWithGST
      : totalWithGST - parseFloat(adjustments) || totalWithGST;
    // Update the netTotal state
    setnetTotal(adjustedNetTotal);
  }, [adjustments, Gst,]);

  const postconvertcustomer = async (e) => {
    e.preventDefault();
    try {
      const phoneNumber = enquirydata[0]?.mobile;

      if (phoneNumber) {
        const res = await axios.post(
          apiURL + `/findcustomerwithnumber/${phoneNumber}`
        );

        if (res.status === 200) {
          const customerData = res.data.customer;
          const queryString = new URLSearchParams({
            rowData: JSON.stringify(customerData),
          }).toString();
          const newTab = window.open(
            `/customersearchdetailsqote/${customerData?._id}/${enquirydata[0]?.EnquiryId}?${queryString}`,
            "_blank"
          );

        } else {
          console.log("Phone number not available");
          const queryString = new URLSearchParams({
            enquiryData: JSON.stringify(enquirydata[0]),
          }).toString();
       
          navigate(`/convertcustomer/${enquirydata[0]?.EnquiryId}?${queryString}`);

        }
      }
    } catch (error) {
      console.error("Error fetching customer:", error);
      const queryString = new URLSearchParams({
        enquiryData: JSON.stringify(enquirydata[0]),
      }).toString();
   
      navigate(`/convertcustomer/${enquirydata[0]?.EnquiryId}?${queryString}`);

      // Handle errors accordingly
    }
  };

  // Assuming quotepagedata is an array of objects with quotefollowup property
  const confirmedResponses = quotepagedata[0]?.quotefollowup.filter(
    (item) => item.response === "Confirmed"
  );

  const addPayment = async () => {
    try {
      const config = {
        url: "/AdvPayment",
        method: "post",
        baseURL: apiURL,
        headers: { "content-type": "application/json" },
        data: {
          paymentDate: moment().format("DD-MM-YYYY"),

          paymentMode: paymentMode,
          amount: paymentAmount,
          Comment: paymentComments,
          EnquiryId: enquirydata[0]?.EnquiryId,
          userID: enquirydata[0]?._id,
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert("Payment Added");
          window.location.reload("");
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };

  useEffect(() => {
    getAdvPayment();
  }, [enquirydata]);

  const getAdvPayment = async () => {
    try {
      const res = await axios.post(
        `${apiURL}/getAdvPaymentByCustomerId/${enquirydata[0]?._id}`
      );
      if (res.status === 200) {
        setAdvPaymentData(res.data.payments);
      } else {
        console.error("Received non-200 status:", res.status);
        // Handle the error appropriately
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle the error appropriately
    }
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

  const [netTotal, setnetTotal] = useState(
    quotedata[0]?.netTotal !== null && quotedata[0]?.netTotal !== undefined
      ? quotedata[0]?.netTotal
      : Gst
        ? total + total * 0.05 - adjustments
        : total - adjustments
  );


  const [whatsappdata, setwhatsappdata] = useState([]);

  useEffect(() => {
    getwhatsapptemplate();
  }, []);

  const getwhatsapptemplate = async () => {
    try {
      let res = await axios.get(apiURL + "/getwhatsapptemplate");
      if (res.status === 200) {

        let getTemplateDatails = res.data?.whatsapptemplate?.filter(
          (item) => item.templatename === "Send Quotation"
        );
        setwhatsappdata(getTemplateDatails);
      }
    } catch (error) {
      console.error("err", error);
    }
  };

  const GoToInvoice = () => {
    if (whatsappdata.length > 0) {
      const selectedResponse = whatsappdata[0];
      const invoiceLink = `quotations?id=${EnquiryId}`;
      const a = "SHARED";
      if (quotedata[0]?.type !== "Confirmed") {
        updatedquotationtype(a);

      }
      makeApiCall(
        selectedResponse,
        quotepagedata[0]?.mobile,
        invoiceLink
      );
    } else {
      console.error("whatsappdata is empty. Cannot proceed.");
      alert("Not Added");
    }
    // Navigate(`/dsrquote/${data}`);
  };

  const updatedquotationtype = async (a) => {

    try {
      const config = {
        url: `/findwithidupdatetype/${quotedata[0]?._id}`,
        method: "post",
        baseURL: apiURL,
        // data: formdata,
        headers: { "content-type": "application/json" },
        data: {
          type: a === "SHARED" ? "QUOTE SHARED" : "CONFIRMED",

        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {

        }
      });
    } catch (error) {
      console.error(error);
      alert(" Not Added");
    }

  };

  const makeApiCall = async (selectedResponse, contactNumber, invoiceId) => {
    const apiURL =
      "https://wa.chatmybot.in/gateway/waunofficial/v1/api/v2/message";
    const accessToken = "c7475f11-97cb-4d52-9500-f458c1a377f4";

    const contentTemplate = selectedResponse?.template || "";

    if (!contentTemplate) {
      console.error("Content template is empty. Cannot proceed.");
      return;
    }

    const content = contentTemplate.replace(
      /\{Customer_name\}/g,
      quotepagedata[0]?.name
    );

    const serviceName = content.replace(/\{Service_name\}/g, quotepagedata[0]?.treatmentdetails[0]?.category);

    const serivePrice = serviceName.replace(
      /\{Executive_name\}/g,
      admin.displayname
    );

    const invoiceUrl = `https://vijayhomeservicebengaluru.in/quotations?id=${EnquiryId}`;

    const invoiceLink = serivePrice.replace(
      /\{Quote_link\}/g,
      `Click to view quotation  ${invoiceUrl}`
    );

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
        alert("Sent");
        // window.location.reload();
      } else {
        console.error("API call unsuccessful. Status code:", response.status);
      }
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };


  return (
    <div className="web">
      <Header />
      <Quotenav />

      <div className="row m-auto pb-4 mb-5">
        {" "}
        <div style={{ background: "white", color: "black" }}>
          <div className="card" style={{ marginTop: "20px" }}>
            <div className="card-body p-4">
              <form>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginRight: "100px",
                  }}
                >
                  <div>
                    <h5>Billing Details</h5>
                  </div>
                  {confirmedResponses?.length > 0 ? (
                    <div className="col-md-1 mt-2">
                      <Button
                        style={{
                          fontSize: "12px",
                          padding: "5px",
                          marginLeft: "50px",
                          backgroundColor: "rgb(169, 4, 46)",
                          border: "none",
                          width: "145px",
                        }}
                        onClick={handleShow}
                      >
                        Pay advance
                      </Button>
                      <button
                        className="vhs-button mx-5"
                        style={{ width: "150px" }}
                        onClick={postconvertcustomer}
                      >
                        Convert to Customer{" "}
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                {advpaymentdata?.amount ?
                  <p>
                    <b>
                      Advance Payment :
                      {advpaymentdata?.amount}
                    </b>
                  </p> : ""}
                {advpaymentdata?.paymentDate
                  ?
                  <p>
                    <b>
                      Adv Payment Date :
                      {advpaymentdata?.paymentDate}

                    </b>
                  </p> : ""}
                {advpaymentdata?.paymentMode ?
                  <p>
                    <b>
                      Adv Payment mode :

                      {advpaymentdata?.paymentMode}

                    </b>
                  </p> : ""}

                <hr />
                <div className="row">
                  <div className="col-md-4">
                    <b>Enquiry Id : </b>
                    {enquirydata[0]?.EnquiryId}
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <b>Mobile No : </b>
                      {enquirydata[0]?.mobile}{" "}
                      <a
                        href={`https://wa.me/+91${enquirydata[0]?.mobile}`}
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
                      <b>Customer Name : </b>
                      {enquirydata[0]?.name}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="">
                      <b>Email : </b>
                      {enquirydata[0]?.email}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <b>Address : </b>
                      {enquirydata[0]?.address}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <b>Interested for : </b>
                      {enquirydata[0]?.intrestedfor}
                    </div>
                  </div>
                </div>
                <div className="row pt-3 justify-content-end">
                  <div className="col-md-3 ">
                    <button
                      className="vhs-button"
                      style={{ width: "120px" }}
                      onClick={() => editdetails(EnquiryId)}
                    >
                      Edit Details
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="card-body p-4">
              <h5>Treatment Details</h5>
              <hr />
              <form>
                <div className="row">
                  <div className="col-md-4 ">
                    <div className="vhs-input-label">
                      Category<span className="text-danger">*</span>
                    </div>
                    <select
                      className="col-md-12 vhs-input-value"
                      onChange={(e) => setcategory(e.target.value)}
                      name="region"
                    >
                      <option>--select--</option>
                      {admin?.category.map((category, index) => (
                        <option key={index} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>{" "}
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Select Region
                      <span className="text-danger">*</span>
                    </div>
                    <select
                      className="col-md-12 vhs-input-value"
                      onChange={(e) => setregion(e.target.value)}
                      name="region"
                    >
                      <option>--select--</option>
                      {regiondata.map((item) => (
                        <option value={item.aregion}>{item.aregion}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Select material
                      <span className="text-danger">*</span>
                    </div>
                    <select
                      className="col-md-12 vhs-input-value"
                      onChange={(e) => setmaterial(e.target.value)}
                      name="material"
                    >
                      <option>--select--</option>
                      {materialdata.map((item) => (
                        <option value={item.material}>{item.material}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">Select Job</div>
                    <select
                      className="col-md-12 vhs-input-value"
                      onChange={(e) => {
                        const selectedJob = ajobdata.find(
                          (item) => item._id === e.target.value
                        );
                        if (selectedJob) {
                          setJobId(selectedJob._id);
                          setJobName(selectedJob.desc);
                        } else {
                          setJobId("");
                          setJobName("");
                        }
                      }}
                      name="job"
                    >
                      <option>--select--</option>
                      {ajobdata.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.desc}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">
                      Enter Qty <span className="text-danger">*</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="number"
                        name="qty"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setqty(e.target.value)}
                      />
                    </div>
                  </div>{" "}
                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">Enter Rate </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        name="rate"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setrate(e.target.value)}
                        defaultValue={ajobdatarate?.rate}
                      />
                    </div>
                  </div>{" "}
                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">Note </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        name="rate"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setnote(e.target.value)}
                      />
                    </div>
                  </div>{" "}
                  <div className="col-md-4 pt-3 mt-4 justify-content-center">
                    <div className="col-md-2 ">
                      <button className="vhs-button" onClick={addtreatment}>
                        Add Item
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <div className="mt-5">
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
                        Region
                      </th>
                      <th className="table-head" scope="col">
                        Material
                      </th>
                      <th className="table-head" scope="col">
                        Job
                      </th>
                      <th className="table-head" scope="col">
                        Qty
                      </th>
                      <th className="table-head" scope="col">
                        Rate
                      </th>
                      <th className="table-head" scope="col">
                        Amount
                      </th>
                      <th className="table-head" scope="col">
                        action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <div></div>
                    {quotepagedata[0]?.treatmentdetails.map((item) => (
                      <tr>
                        <td>{i++}</td>
                        <td>{item.category}</td>
                        <td>{item.region}</td>
                        <td>{item.material}</td>
                        <td>{item.job}</td>
                        <td>{item.qty}</td>
                        <td>{item.rate}</td>
                        <td style={{ textAlign: "center" }}>{item.subtotal}</td>
                        <td style={{ textAlign: "center" }}>
                          {" "}
                          <a onClick={() => deletetreatment(item._id)}>
                            {/* <img
                              src="./images/delete.png"
                              style={{ width: "30px", height: "30px" }}
                            /> */}
                            <i class="fa-solid fa-trash"></i>
                          </a>
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
                      <td></td>
                      <td style={{ textAlign: "center" }}> {total}</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="card" style={{ marginTop: "20px" }}>
            <div className="card-body p-4">
              <div className="row">
                <div className="col-md-4 pt-3">
                  <div className="vhs-input-label">Project Type </div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      className="col-md-12 vhs-input-value"
                      defaultValue={
                        quotepagedata[0]?.quotedata[0]?.projectType
                          ? quotepagedata[0]?.quotedata[0]?.projectType
                          : ""
                      }
                      onChange={(e) => setprojecttype(e.target.value)}
                    />
                  </div>
                </div>{" "}
                <div className="col-md-4 pt-3">
                  <div className="vhs-input-label">SUM </div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      className="col-md-12 vhs-input-value"
                      value={total}
                      onChange={(e) => setSUM(e.target.value)}
                    />
                  </div>
                </div>{" "}
                <div className="col-md-4 pt-3">
                  <div className="vhs-input-label">GST(5%) </div>
                  <div>
                    <input
                      class="form-check-input"
                      type="checkbox"
                      checked={Gst}
                      onChange={(e) => {
                        const newGstValue = e.target.checked;
                        setGST(newGstValue);

                        const newNetTotal = newGstValue
                          ? total + total * 0.05 - adjustments
                          : total - adjustments;

                        setnetTotal(newNetTotal);
                      }}
                    />
                    <label class="vhs-sub-heading mx-3" for="flexCheckDefault">
                      YES / NO
                    </label>
                  </div>
                </div>{" "}
              </div>
              <div className="row">
                <div className="col-md-4 pt-3">
                  <div className="vhs-input-label">Total </div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      className="col-md-12 vhs-input-value"
                      value={total}
                    />
                  </div>
                </div>{" "}
                <div className="col-md-4 pt-3">
                  <div className="vhs-input-label">Adjustments </div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      className="col-md-12 vhs-input-value"
                      onChange={(e) => {
                        const newAdjustment = parseFloat(e.target.value);
                        setadjustment(newAdjustment);

                        const newNetTotal = Gst
                          ? total + total * 0.05 - newAdjustment
                          : total - newAdjustment;

                        setnetTotal(newNetTotal);
                      }}
                      defaultValue={quotedata[0]?.adjustments}
                    />
                  </div>
                </div>{" "}
                <div className="col-md-4 pt-3">
                  <div className="vhs-input-label">Net Total </div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      className="col-md-12 vhs-input-value"
                      value={netTotal}
                      onChange={(e) => setnetTotal(e.target.value)}
                    />
                  </div>
                </div>{" "}
              </div>

              <div className="row pt-3 justify-content-center mt-3">
                <div className="col-md-2 ">
                  {quotepagedata[0]?.quotedata.length <= 0 ? (
                    <button
                      className="vhs-button "
                      style={{ width: "150px" }}
                      onClick={savequote}
                    >
                      Save Quote
                    </button>
                  ) : (
                    <button
                      className="vhs-button "
                      style={{ width: "150px" }}
                      onClick={updatequote}
                    >
                      Save quote
                    </button>
                  )}
                </div>
                <div className="col-md-2 ">
                  <Link to="/quotationterm" state={{ data: quotepagedata }}>
                    <button className="vhs-button " style={{ width: "150px" }}>
                      Print Quote
                    </button>
                  </Link>
                </div>
                {/* <div className="col-md-2 ">
                  <button className="vhs-button " style={{ width: "150px" }}>
                    Send Quote by SMS
                  </button>
                </div> */}
                <div className="col-md-2 ">
                  <button
                    className="vhs-button"
                    style={{ width: "200px" }}
                    onClick={GoToInvoice}
                  >
                    Send Quote by Whatsapp
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <h6>Followup Details</h6>
            <table class="table table-hover table-bordered mt-1">
              <thead className="">
                <tr className="table-secondary">
                  <th className="table-head" scope="col">
                    Sr
                  </th>
                  <th className="table-head" scope="col">
                    Foll Date
                  </th>
                  <th className="table-head" scope="col">
                    staffname
                  </th>
                  <th className="table-head" scope="col">
                    Response
                  </th>
                  <th className="table-head" scope="col">
                    Desc
                  </th>
                  <th className="table-head" scope="col">
                    Nxt foll
                  </th>
                </tr>
              </thead>
              <tbody>
                {quotepagedata[0]?.quotefollowup.map((item, index) => (
                  <div className="tbl">
                    <div className="tbl">
                      <tr
                        className="user-tbale-body tbl1"
                        key={item.id}
                        style={{
                          backgroundColor: getColor(item.colorcode),
                          color: "black",
                        }}
                      >
                        <td>{index + 1}</td>
                        <td>{item.folldate}</td>
                        <td>{item.staffname}</td>
                        <td>{item.response}</td>
                        <td>{item.desc}</td>
                        <td>{item.nxtfoll}</td>
                      </tr>
                    </div>
                  </div>
                ))}
              </tbody>
            </table>
          </div>
          <p>Take Follow-up</p>
          <div className="card" style={{ marginTop: "20px" }}>
            <div className="card-body p-4">
              <div className="row">
                <div className="col-md-4 pt-3">
                  <div className="vhs-input-label">Foll .Date </div>
                  <div className="group pt-1">
                    {moment().format("L")} {moment().format("LT")}
                    {/* <input
                      type="text"
                      className="col-md-12 vhs-input-value"
                      value=
                      onChange={(e) => setfolldate(e.traget.value)}
                    /> */}
                  </div>
                </div>{" "}
                <div className="col-md-4 pt-3">
                  <div className="vhs-input-label">Staff Name </div>
                  <div className="group pt-1">
                    <input
                      type="text"
                      className="col-md-12 vhs-input-value"
                      value={admin.displayname}
                      onChange={(e) => setstaffname(e.target.value)}
                    />
                  </div>
                </div>{" "}
                <div className="col-md-4 pt-3">
                  <div className="vhs-input-label">
                    Response
                    <span className="text-danger">*</span>
                  </div>
                  <div className="group pt-1">
                    <select
                      className="col-md-12 vhs-input-value"
                      onChange={(e) => setresponse1(e.target.value)}
                    >
                      <option>--select--</option>

                      <option value="Call Later">Call Later</option>
                      <option value="Not Intrested">Not Intrested</option>
                      <option value="Confirmed">Confirmed</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 pt-3">
                  <div className="vhs-input-label">Description </div>
                  <div className="group pt-1">
                    <textarea
                      rows={5}
                      type="text"
                      className="col-md-12 vhs-input-value"
                      onChange={(e) => setdescrption(e.target.value)}
                    />
                  </div>
                </div>{" "}
                <div className="col-md-4 pt-3">
                  <div className="vhs-input-label">Nxt Foll</div>
                  <div className="group pt-1">
                    <input
                      type="date"
                      className="col-md-12 vhs-input-value"
                      defaultValue={moment().format("DD-MM-YYYY")}
                      onChange={(e) => setquotenxtfoll(e.target.value)}
                    />
                  </div>
                </div>{" "}
                <div className="col-md-4 pt-3">
                  {response1 == "Call Later" ? (
                    <>
                      {" "}
                      <div className="row ">
                        <div className="">
                          <div className="vhs-input-label">
                            color code
                            <span className="text-danger">*</span>
                          </div>
                          <div className="group pt-1">
                            <select
                              className="col-md-12 vhs-input-value"
                              onChange={(e) => setcolorcode(e.target.value)}
                            >
                              <option>--select--</option>
                              <option value="easy">Easy</option>
                              <option value="medium">Medium</option>
                              <option value="different">Different</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              <div className="row pt-3 justify-content-center">
                <div className="col-md-3 ">
                  <button className="vhs-button " onClick={addquotefollowup}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Advance Payment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="card p-2">
              <div className="card-body p-4">
                <div className="row  ">
                  <div className="col-6 d-flex ">
                    <div className="col-4">
                      Payment Date <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1 col-5 ml-3">
                      <input
                        type="date"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setPaymentDate(e.target.value)}
                        value={paymentDate}
                      />
                    </div>
                  </div>

                  <div className="col-6 d-flex">
                    <div className="col-4">
                      {" "}
                      Amount <span className="text-danger"> *</span>
                    </div>

                    <div className="group pt-1 col-5">
                      <input
                        type="text"
                        placeholder="amounts"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setPaymentAmount(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row  mt-2">
                  <div className="col-6 d-flex">
                    <div className="col-4"> Comment</div>

                    <div className="group pt-1 col-5">
                      <textarea
                        type="text"
                        className="col-md-12 vhs-input-value"
                        placeholder="Comments"
                        style={{ height: "100px" }}
                        onChange={(e) => setPaymentComments(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row  mt-2">
                  <div className="col-6 d-flex ">
                    <div className="col-4">
                      Payment Mode <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1 col-5 ml-3">
                      <select
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setPaymentMode(e.target.value)}
                      >
                        <option value="">--select--</option>
                        <option value="Cash">Cash</option>
                        <option value="Cheque">Cheque</option>
                        <option value="Paytm">Paytm</option>
                        <option value="PhonePe">PhonePe</option>
                        <option value="Google Pay">Google Pay</option>
                        <option value="NEFT">NEFT</option>
                        <option value="IMPS">IMPS</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="row pt-3 justify-content-center">
              <div className="col-md-2">
                <button className="vhs-button" onClick={addPayment}>
                  Save
                </button>
              </div>
            </div> */}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={addPayment}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}

export default Quotedetails;
