import React, { useState, useEffect } from "react";
import Customernav from "../Customernav";
import Header from "../layout/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Customeradd() {
  const admin = JSON.parse(sessionStorage.getItem("admin"));
  const navigate = useNavigate();

  const [customertypedata, setcustomertypedata] = useState([]);
  const [customername, setcustomername] = useState("");
  const [contactperson, setcontactperson] = useState("");
  const [maincontact, setmaincontact] = useState("");
  const [alternatenumber, setalternate] = useState("");
  const [email, setemail] = useState("");
  const [gst, setgst] = useState("");
  const [rbhf, setrbhf] = useState("");
  const [cnap, setcnap] = useState("");
  const [lnf, setlnf] = useState("");
  const [mainarea, setarea] = useState("");
  const [city, setcity] = useState("");
  const [pincode, setpincode] = useState("");
  const [customertype, setcustomertype] = useState("");

  const [approach, setapproach] = useState("");

  const apiURL = process.env.REACT_APP_API_URL;
  const [referecetypedata, setreferecetypedata] = useState([]);

  const [latestCardNo, setLatestCardNo] = useState([]);

  const handleInputChange = (e) => {
    // Remove any non-numeric characters
    const numericValue = e.target.value.replace(/\D/g, "");

    // Limit the input to 10 characters
    const limitedValue = numericValue.slice(0, 10);

    setmaincontact(limitedValue);
  };

  const addcustomer = async (e) => {
    e.preventDefault();
    if (
      !customername ||
      !contactperson ||
      !maincontact ||
      !lnf ||
      !rbhf ||
      !cnap ||
      !city
    ) {
      alert("Please fill all the fields");
    } else {
      try {
        const config = {
          url: "/addcustomer",
          method: "post",
          baseURL: apiURL,
          headers: { "content-type": "application/json" },
          data: {
            customerName: customername,
            contactPerson: contactperson,
            deliveryAddress: {
              landmark: cnap,
              platNo: rbhf,
              saveAs: mainarea,
              address: lnf,
            },
            mainContact: maincontact,
            alternateContact: alternatenumber,
            email: email,
            gst: gst,
            rbhf: rbhf,
            cnap: cnap,
            lnf: lnf,
            mainArea: mainarea,
            city: city,
            pinCode: pincode,
            customerType: customertype,

            approach: approach,
          },
        };
        const response = await axios(config);

        if (response.status === 200) {
          const id = response.data.user;
          const queryString = new URLSearchParams({
            rowData: JSON.stringify(id),
          }).toString();
          const newTab = window.open(
            `/customersearchdetails/${id?._id}?${queryString}`,
            "_blank"
          );
        }
      } catch (error) {
        console.error(error);
        if (error.response) {
          alert(error.response.data.error); // Display error message from the API response
        } else {
          alert("An error occurred. Please try again later.");
        }
      }
    }
  };

  useEffect(() => {
    getcustomertype();
    getreferencetype();
    getcustomerlastdata()
  }, []);
  const getcustomerlastdata = async () => {
    let res = await axios.get(apiURL + "/getlastcustomer");
    if (res.status === 200) {
      setLatestCardNo(res.data?.customers);
    }
  };

  const getcustomertype = async () => {
    let res = await axios.get(apiURL + "/master/getcustomertype");
    if ((res.status = 200)) {
      setcustomertypedata(res.data?.mastercustomertype);
    }
  };

  const getreferencetype = async () => {
    let res = await axios.get(apiURL + "/master/getreferencetype");
    if ((res.status = 200)) {
      setreferecetypedata(res.data?.masterreference);
    }
  };

  return (
    <div className="">
      <Header />
      <Customernav />

      <div className="row m-auto">
        <div className="col-md-12">
          <div className="card" style={{ marginTop: "32px" }}>
            <div className="card-body p-4">
              <form>
                <div className="row">
                  <div className="vhs-sub-heading">
                    <h5>Customer Basic Information</h5>
                  </div>
                  <div className="col-md-4 pt-2">
                    <div className="vhs-sub-heading">Card No :</div>
                    <div className="group pt-1 vhs-non-editable">
                      {latestCardNo ? latestCardNo[0]?.cardNo + 1 : 1}{" "}
                    </div>
                  </div>
                  <div className="col-md-4 pt-2">
                    <div className="vhs-input-label">
                      Customer Name <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setcustomername(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 pt-2">
                    <div className="vhs-input-label">
                      {" "}
                      Contact Person<span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setcontactperson(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="row pt-2">
                  <div className="vhs-sub-heading">
                    Customer Contact & GST Information
                  </div>
                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">
                      Main Contact <span className="text-danger"> *</span>{" "}
                    </div>
                    <div className="group pt-1">
                      <input
                        type="tel"
                        className="col-md-12 vhs-input-value"
                        value={maincontact}
                        onInput={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">Alternate Contact</div>
                    <div className="group pt-1">
                      <input
                        type="tel"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setalternate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">Email</div>
                    <div className="group pt-1">
                      <input
                        type="email"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setemail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">GSTIN Id.</div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setgst(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="row pt-2">
                  <div className="vhs-sub-heading mt-3">
                    <h5>Customer Detail Address</h5>
                  </div>
                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">
                      Room / Bunglow / House / Flat No.
                      <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setrbhf(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">
                      Landmark
                      <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <textarea
                        rows={4}
                        cols={6}
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setcnap(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">
                      Full Address
                      <span className="text-danger">*</span>
                    </div>
                    <div className="group pt-1">
                      <textarea
                        rows={4}
                        cols={6}
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setlnf(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">Office/Home</div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setarea(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">
                      City <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <select
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setcity(e.target.value)}
                      >
                        <option>-select all-</option>
                        {admin?.city.map((item) => (
                          <option value={item.name}>{item.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">Pincode</div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setpincode(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="row pt-2">
                  <div className="vhs-sub-heading mt-3">
                    <h5>Customer Other Information</h5>
                  </div>
                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">
                      Customer Type
                      <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <select
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setcustomertype(e.target.value)}
                      >
                        <option>-select-</option>
                        {customertypedata.map((item) => (
                          <option value={item.customertype}>
                            {item.customertype}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">
                      Approach
                      {/* <span className="text-danger">*</span> */}
                    </div>
                    <div className="group pt-1">
                      <select
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setapproach(e.target.value)}
                      >
                        <option>-select all-</option>
                        {referecetypedata.map((item) => (
                          <option value={item.referencetype}>
                            {item.referencetype}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row pt-3 justify-content-center">
                  <div className="col-md-2">
                    <button className="vhs-button" onClick={addcustomer}>
                      Save
                    </button>
                  </div>
                  <div className="col-md-2">
                    <button className="vhs-button mx-3">Cancel</button>
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

export default Customeradd;
