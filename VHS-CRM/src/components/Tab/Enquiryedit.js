import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import Enquirynav from "../Enquirynav";
import axios from "axios";
import moment from "moment";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function Enquiryadd() {
  const admin = JSON.parse(sessionStorage.getItem("admin"));
  const { enquiryid } = useParams();
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const [serivceName, setSeviceName] = useState("");
  const [citydata, setcitydata] = useState([]);
  const [categorydata, setcategorydata] = useState([]);
  const [EnquiryId, setEnquiryId] = useState(data.EnquiryId);
  const [enquirydate, setenquirydate] = useState(data.enquirydate);
  const [executive, setexecutive] = useState(data.executive);
  const [name, setname] = useState(data.name);
  const [email, setemail] = useState(data.email);
  const [contact1, setcontact1] = useState(data.contact1);
  const [contact2, setcontact2] = useState(data.contact2);
  const [address, setaddress] = useState(data.address);
  const [city, setcity] = useState(data.city);
  const [category, setcategory] = useState(data.category);
  const [reference1, setreference1] = useState(data.reference1);
  const [reference2, setreference2] = useState(data.reference2);
  const [reference3, setreference3] = useState(data.reference3);
  const [comment, setcomment] = useState(data.comment);
  const [intrestedfor, setinterestedfor] = useState(data.intrestedfor);
  // const [executive, setinterestedfor] = useState(data.intrestedfor);
  const [serviceData, setServiceData] = useState([]);
  const [serivceId, setSeviceId] = useState("");

  const [time, settime] = useState(data.time);
  const apiURL = process.env.REACT_APP_API_URL;
  const [subcategorydata, setsubcategorydata] = useState([]);
  const [referecetypedata, setreferecetypedata] = useState([]);

  useEffect(() => {
    getsubcategory();
  }, []);

  const getsubcategory = async () => {
    let res = await axios.get(apiURL + "/getsubcategory");
    if ((res.status = 200)) {
      console.log(res);
      setsubcategorydata(res.data?.subcategory);
    }
  };

  console.log(data);
  const getServiceByCategory = async () => {
    try {
      let res = await axios.post(apiURL + `/userapp/getservicebycategory/`, {
        category: category,
      });
      if (res.status === 200) {
        setServiceData(res.data?.serviceData);
      } else {
        setServiceData([]);
      }
    } catch (error) {
      console.log("err", error);
    }
  };
  useEffect(() => {
    getServiceByCategory();
  }, [category]);

  const addenquiry = async (e) => {
    e.preventDefault();

    try {
      const config = {
        url: `/editenquiry/${data[0]?._id}`,
        method: "post",
        baseURL: apiURL,
        // data: formdata,
        headers: { "content-type": "application/json" },
        data: {
          EnquiryId: EnquiryId,
          date: enquirydate,
          executive: admin.displayname,
          name: name,
          Time: time,
          mobile: contact1,
          email: email,
          contact2: contact2,
          address: address,
          category: category,
          reference1: reference1,
          reference2: reference2,
          city: city,
          reference3: reference3,
          comment: comment,
          intrestedfor: intrestedfor,
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          
          alert(" Added");
         window.location.reload("")
        }
      });
    } catch (error) {
      console.error(error);
      alert(" Not Added");
    }
  };

  useEffect(() => {
    getcity();
    getcategory();
    getreferencetype();
    getenquiry();
  }, []);

  const getcity = async () => {
    let res = await axios.get(apiURL + "/master/getcity");
    if ((res.status = 200)) {
      setcitydata(res.data?.mastercity);
    }
  };

  const getenquiry = async () => {
    let res = await axios.get(apiURL + `/getenquiry`);
    if ((res.status = 200)) {
      console.log(res.data?.enquiryadd);
      console.log(res.data?.enquiryadd.filter((i) => i.EnquiryId == enquiryid));
      setdata(res.data?.enquiryadd.filter((a) => a.EnquiryId == enquiryid));
    }
  };

  const getcategory = async () => {
    let res = await axios.get(apiURL + "/getcategory");
    if ((res.status = 200)) {
      setcategorydata(res.data?.category);
    }
  };
  const getreferencetype = async () => {
    let res = await axios.get(apiURL + "/master/getreferencetype");
    if ((res.status = 200)) {
      setreferecetypedata(res.data?.masterreference);
    }
  };
  return (
    <div className="web">
      <Header />
      <Enquirynav />

      <div className="row m-auto">
        <div className="col-md-12">
          <div className="card" style={{ marginTop: "20px" }}>
            <div className="card-body p-4">
              <form>
                <div className="row">
                  <div className="col-md-4">
                    <div className="vhs-input-label">Enquiry ID</div>
                    {/* <div className="group pt-1 vhs-non-editable">105379</div> */}
                    <div className="group pt-1 vhs-non-editable">
                      {data[0]?.EnquiryId}
                    </div>
                    {/* <div className="group pt-1">
                      <input
                        type="text"
                        value={Math.floor(1000 + Math.random() * 9000)}
                        className="col-md-12 vhs-input-value vhs-non-editable"
                        onChange={(e) => setEnquiryId(e.target.value)}
                      />
                    </div> */}
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label">Enquiry Date</div>
                    <div className="group pt-1 vhs-non-editable">
                      {data[0]?.date}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      {" "}
                      Executive
                      <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1 vhs-non-editable">
                      {admin.displayname}
                    </div>
                  </div>
                </div>

                <div className="row pt-3">
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Name
                      <span className="text-danger">*</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setname(e.target.value)}
                        defaultValue={data[0]?.name}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Email Id
                      <span className="text-danger">*</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setemail(e.target.value)}
                        defaultValue={data[0]?.email}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Contact 1<span className="text-danger">*</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setcontact1(e.target.value)}
                        defaultValue={data[0]?.mobile}
                      />
                    </div>
                  </div>
                </div>

                <div className="row pt-3">
                  <div className="col-md-4">
                    <div className="vhs-input-label">Contact 2</div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setcontact2(e.target.value)}
                        defaultValue={data[0]?.contact2}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label">Address</div>
                    <div className="group pt-1">
                      <textarea
                        rows={4}
                        cols={5}
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setaddress(e.target.value)}
                        defaultValue={data[0]?.address}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      City <span className="text-danger">*</span>
                    </div>
                    <div className="group pt-1">
                      <select
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setcity(e.target.value)}
                        defaultValue={data[0]?.city}
                      >
                        <option> {data[0]?.city}</option>
                        {/* {citydata.map((item) => (
                          <option value={data[0]?.city}>{item.city}</option>
                        ))} */}
                        {admin?.city.map((item) => (
                          <option value={item.name}>{item.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row pt-3">
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Category <span className="text-danger">*</span>
                    </div>
                    <div className="group pt-1">
                      <select
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setcategory(e.target.value)}
                        defaultValue={data[0]?.category}
                      >
                        <option>{data[0]?.category}</option>
                        {/* {categorydata.map((item) => (
                          <option value={data[0]?.category}>{item.category}</option>
                        ))} */}
                        {admin?.category.map((category, index) => (
                          <option key={index} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Reference
                      <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <select
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setreference1(e.target.value)}
                      >
                        <option>{data[0]?.referencetype}</option>
                        {referecetypedata.map((item) => (
                          <option value={data[0]?.referencetype}>
                            {item.referencetype}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label"> Reference 2</div>
                    <div className="group pt-1">
                      <textarea
                        rows={4}
                        cols={5}
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setreference2(e.target.value)}
                        defaultValue={data[0]?.reference2}
                      />
                    </div>
                  </div>
                </div>

                <div className="row pt-3">
                  <div className="col-md-4">
                    <div className="vhs-input-label"> Reference 3</div>
                    <div className="group pt-1">
                      <textarea
                        rows={4}
                        cols={5}
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setreference3(e.target.value)}
                        defaultValue={data[0]?.reference3}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label"> Comment</div>
                    <div className="group pt-1">
                      <textarea
                        rows={4}
                        cols={5}
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setcomment(e.target.value)}
                        defaultValue={data[0]?.comment}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Interested For
                      <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <select
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => {
                          const selectedService = serviceData.find(
                            (item) => item._id === e.target.value
                          );
                          setSeviceId(e.target.value);
                          setSeviceName(
                            selectedService ? selectedService.serviceName : ""
                          );
                        }}
                        // onChange={(e) => setSeviceName(e.target.value)}
                      >
                        <option>---SELECT---</option>
                        {serviceData.map((item) => (
                          <option key={item.id} value={item._id}>
                            {item.Subcategory} - {item.serviceName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4"></div>
                </div>

                <div className="row pt-3 justify-content-center">
                  <div className="col-md-2">
                    <button className="vhs-button" onClick={addenquiry}>
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

export default Enquiryadd;
