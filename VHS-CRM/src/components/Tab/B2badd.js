import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import B2Bnav from "../B2Bnav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";

function B2badd() {
  const admin = JSON.parse(sessionStorage.getItem("admin"));
  const [citydata, setcitydata] = useState([]);
  const [b2btypedata, setb2btypedata] = useState([]);
  const [b2bname, setb2bname] = useState("1234");
  const [contactperson, setcontactperson] = useState("");
  const [maincontact, setmaincontact] = useState("");
  const [alternateno, setalternate] = useState("");
  const [email, setemail] = useState("");
  const [gst, setgst] = useState("");
  const [address, setaddress] = useState("");
  const [b2btype, setb2btype] = useState("");
  const [city, setcity] = useState("");
  const [instructions, setinstructions] = useState("");
  const [approach, setapproach] = useState("");
  const [referecetypedata, setreferecetypedata] = useState([]);
  const [latestEnquiryId, setLatestEnquiryId] = useState(0);
  const navigate=useNavigate();

  const apiURL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    getb2b();
  }, []);

  const getb2b = async () => {
    let res = await axios.get(apiURL + "/getB2B");
    if (res.status === 200) {
      setLatestEnquiryId(res.data?.B2B[0]?.B2BId);
    }
  };

  const addb2b = async (e) => {
    e.preventDefault();
  
    if (
      !b2bname ||
      !contactperson ||
      !maincontact ||
      !email ||
      !address ||
      !city ||
      !b2btype ||
      !approach
    ) {
      alert("Please fill all fields");
    } else {
      try {
        const config = {
          url: "/addB2B",
          method: "post",
          baseURL: apiURL,
          headers: { "content-type": "application/json" },
          data: {
            b2bname: b2bname,
            contactperson: contactperson,
            maincontact: maincontact,
            alternateno: alternateno,
            email: email,
            gst: gst,
            address: address,
            b2btype: b2btype,
            city: city,
            instructions: instructions,
            approach: approach,
            executiveName: admin.displayname,
            executivenumber: admin.contactno,
            date: moment().format("YYYY-MM-DD"),
            time: moment().format('LTS')
          },
        };
        
        const response = await axios(config);
  
        if (response.status === 200) {
          alert("B2B Account created.");
          navigate(`/b2bdetails/${latestEnquiryId ? latestEnquiryId + 1 : 1}`);
        } else {
          alert("Failed to add B2B Account. Please try again.");
        }
      } catch (error) {
        if (error.response && error.response.status === 500) {
          const errorMessage = error.response.data.error;
          alert(`Failed to add B2B Account: ${errorMessage}`);
        } else {
          console.error(error.message);
          alert("Failed to add B2B Account. Please try again.");
        }
      }
    }
  };
  

  useEffect(() => {
    getcity();
    getb2btype();
    getreferencetype();
  }, []);

  const getcity = async () => {
    let res = await axios.get(apiURL + "/master/getcity");
    if ((res.status = 200)) {
      setcitydata(res.data?.mastercity);
    }
  };

  const getb2btype = async () => {
    let res = await axios.get(apiURL + "/master/getb2b");
    if ((res.status = 200)) {
      setb2btypedata(res.data?.masterb2b);
    }
  };
  const getreferencetype = async () => {
    let res = await axios.get(apiURL + "/master/getreferencetype");
    if ((res.status = 200)) {
      setreferecetypedata(res.data?.masterreference);
    }
  };
  return (
    <div>
      <Header />
      <B2Bnav />

      <div className="row m-auto">
        <div className="col-md-12">
          <div className="card" style={{ marginTop: "32px" }}>
            <div className="card-body p-4">
              <form>
                <div className="row">
                  <div className="vhs-sub-heading">B2B Basic Information</div>
                  <div className="col-md-4 pt-2">
                    <div className="vhs-input-label">
                      B2B Name <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setb2bname(e.target.value)}
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
                  <div className="col-md-4 pt-2">
                    <div className="vhs-input-label">
                      Main Contact
                      <span className="text-danger"> *</span>{" "}
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setmaincontact(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-4 pt-2">
                    <div className="vhs-input-label"> Alternate Contact</div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setalternate(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-4 pt-2">
                    <div className="vhs-input-label">
                      {" "}
                      Email<span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setemail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-4 pt-2">
                    <div className="vhs-input-label"> GSTIN Id.</div>
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
                  <div className="vhs-sub-heading">B2B Detail Address</div>
                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">
                      Address <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <textarea
                        rows={4}
                        cols={6}
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setaddress(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">
                      City <span className="text-danger"> *</span>{" "}
                    </div>
                    <div className="group pt-1">
                      <select
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setcity(e.target.value)}
                      >
                        <option>--select--</option>
                        {admin?.city.map((item) => (
                          <option value={item.name}>{item.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4 pt-3"></div>
                </div>

                <div className="row pt-2">
                  <div className="vhs-sub-heading">B2B Other Information</div>
                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">
                      B2B Type<span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <select
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setb2btype(e.target.value)}
                      >
                        <option>--select--</option>
                        {b2btypedata.map((item) => (
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
                      <span className="text-danger"> *</span>
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
                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">Instructions</div>
                    <div className="group pt-1">
                      <textarea
                        rows={4}
                        cols={6}
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setinstructions(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="row pt-3 justify-content-center">
                  <div className="col-md-2">
                    <button className="vhs-button" onClick={addb2b}>
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

export default B2badd;
