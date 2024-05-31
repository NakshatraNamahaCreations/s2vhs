import React, { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import B2Bnav from "../components/B2Bnav";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function B2Bedit() {
  const { b2bid } = useParams();
  const navigate = useNavigate();

  const admin = JSON.parse(sessionStorage.getItem("admin"));
  const [Data, setData] = useState([]);
  const [citydata, setcitydata] = useState([]);
  const [b2btypedata, setb2btypedata] = useState([]);
  const [b2bname, setb2bname] = useState(Data[0]?.b2bname);
  const [contactperson, setcontactperson] = useState(Data[0]?.contactperson);
  const [maincontact, setmaincontact] = useState(Data[0]?.maincontact);
  const [alternateno, setalternate] = useState(Data[0]?.alternateno);
  const [email, setemail] = useState(Data[0]?.email);
  const [gst, setgst] = useState(Data[0]?.gst);
  const [address, setaddress] = useState(Data[0]?.address);
  const [b2btype, setb2btype] = useState(Data[0]?.b2btype);
  const [city, setcity] = useState(Data[0]?.city);
  const [instructions, setinstructions] = useState(Data[0]?.instructions);
  const [approach, setapproach] = useState(Data[0]?.approach);
  const [referecetypedata, setreferecetypedata] = useState([]);

  const apiURL = process.env.REACT_APP_API_URL;

  const addb2b = async (e) => {
    e.preventDefault();

    try {
      const config = {
        url: `/editb2b/${Data[0]?._id}`,
        method: "post",
        baseURL: apiURL,
        // data: formdata,
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
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          console.log("success");
          alert(" Added");
          window.location.assign(`/b2bdetails/${Data[0]?.B2BId}`);
        }
      });
    } catch (error) {
      console.error(error);
      alert(" Not Added");
    }
  };

  useEffect(() => {
    getcity();
    getb2b();
    getb2btype();
    getreferencetype();
  }, []);

  const getcity = async () => {
    let res = await axios.get(apiURL + "/master/getcity");
    if (res.status === 200) {
      setcitydata(res.data?.mastercity);
    }
  };

  const getb2btype = async () => {
    let res = await axios.get(apiURL + "/master/getb2b");
    if (res.status === 200) {
      setb2btypedata(res.data?.masterb2b);
    }
  };
  const getreferencetype = async () => {
    let res = await axios.get(apiURL + "/master/getreferencetype");
    if (res.status === 200) {
      setreferecetypedata(res.data?.masterreference);
    }
  };

  const getb2b = async () => {
    let res = await axios.get(apiURL + `/getB2B`);
    if (res.status === 200) {
      setData(res.data?.B2B.filter((a) => a.B2BId == b2bid));
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
                        defaultValue={Data[0]?.b2bname}
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
                        defaultValue={Data[0]?.contactperson}
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
                        defaultValue={Data[0]?.maincontact}
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
                        defaultValue={Data[0]?.alternateno}
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
                        defaultValue={Data[0]?.email}
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
                        defaultValue={Data[0]?.email}
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
                        defaultValue={Data[0]?.address}
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
                        {Data[0]?.city ? (
                          <option value={Data[0]?.city}>{Data[0]?.city}</option>
                        ) : (
                          <option>--select--</option>
                        )}
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
                        {Data[0]?.b2btype ? (
                          <option value={Data[0]?.b2btype}>
                            {Data[0]?.b2btype}
                          </option>
                        ) : (
                          <option>--select--</option>
                        )}
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
                        {Data[0]?.approach ? (
                          <option value={Data[0]?.approach}>
                            {Data[0]?.approach}
                          </option>
                        ) : (
                          <option>-select all-</option>
                        )}
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
                        defaultValue={Data[0]?.instructions}
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

export default B2Bedit;
