import React, { useState, useEffect } from "react";
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";
import Button from "react-bootstrap/Button";
import Nav from "./Nav1";
import axios from "axios";
import DataTable from "react-data-table-component";
import Modal from "react-bootstrap/Modal";

const active = {
  backgroundColor: "rgb(169, 4, 46)",
  color: "#fff",
  fontWeight: "bold",
  border: "none",
};
const inactive = { color: "black", backgroundColor: "white" };

function Vendor() {
  const admin = JSON.parse(sessionStorage.getItem("admin"));

  const [selected, setSelected] = useState(0);
  const [vendordata, setvendordata] = useState([]);
  const [vendorname, setvendorname] = useState("");
  const [contactperson, setcontactperson] = useState("");
  const [maincontact, setmaincontact] = useState("");
  const [alternateno, setalternateno] = useState("");
  const [email, setemail] = useState("");
  const [gstid, setgstid] = useState("");
  const [address, setaddress] = useState("");
  const [LNF, setlnfp] = useState("");
  const [city, setcity] = useState("");
  const [pincode, setpincode] = useState("");
  const [instructions, setinstructions] = useState("");
  const [color, setcolor] = useState("");
  const [citydata, setcitydata] = useState("");
  const [search, setsearch] = useState("");
  const [filterdata, setfilterdata] = useState([]);
  const [data, setdata] = useState({});
  const [vendorname1, setvendorname1] = useState("");
  const [contactperson1, setcontactperson1] = useState("");
  const [maincontact1, setmaincontact1] = useState("");
  const [alternateno1, setalternateno1] = useState("");
  const [email1, setemail1] = useState("");
  const [gstid1, setgstid1] = useState("");
  const [address1, setaddress1] = useState("");
  const [LNF1, setlnfp1] = useState("");
  const [city1, setcity1] = useState("");
  const [pincode1, setpincode1] = useState("");
  const [instructions1, setinstructions1] = useState("");
  const [color1, setcolor1] = useState("");
  const [citydata1, setcitydata1] = useState("");
  const apiURL = process.env.REACT_APP_API_URL;

  const handleClick = (divNum) => () => {
    setSelected(divNum);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    getcity();
  }, []);

  const getcity = async () => {
    let res = await axios.get(apiURL + "/master/getcity");
    if (res.status === 200) {
      setcitydata(res.data?.mastercity);
    }
  };
  const addvendor = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: "/addvendor",
        method: "post",
        baseURL: apiURL,
        // data: formdata,
        headers: { "content-type": "application/json" },
        data: {
          vendorname: vendorname,
          contactperson: contactperson,
          maincontact: maincontact,
          alternateno: alternateno,
          email: email,
          gstid: gstid,
          address: address,
          LNF: LNF,
          pincode: pincode,
          city: city,
          color: color,
          pincode: pincode,
          instructions: instructions,
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          console.log("success");
          alert(" Added");
          window.location.assign("/vendor");
        }
      });
    } catch (error) {
      console.error(error);
      alert(" Not Added");
    }
  };
  useEffect(() => {
    getvendor();
  }, []);

  const getvendor = async () => {
    let res = await axios.get(apiURL + "/getvendor");
    if (res.status === 200) {
      console.log("vendorData===", res);
      setvendordata(res.data?.vendors);
      setfilterdata(res.data?.vendors);
    }
  };

  const edit = (data) => {
    setdata(data);
    handleShow(true);
  };
  useEffect(() => {
    const result = vendordata.filter((item) => {
      return item.vendorname.toLowerCase().match(search.toLowerCase());
    });
    setfilterdata(result);
  }, [search]);

  const deletevendor = async (id) => {
    try {
      axios({
        method: "post",
        url: apiURL + "/deleteuser/" + id,
      }).then(function (res) {
        // handle success
        if (res.status === 200) {
          console.log(res.data);
          alert("Deleted successfully");
          window.location.reload();
        }
      });
    } catch (error) {
      //handle error
      console.log(error.res.data);
      alert("can not able to do");
    }
  };
  const editVendor = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: `/edituser/${data._id}`,
        method: "post",
        baseURL: apiURL,
        headers: { "content-type": "application/json" },
        data: {
          userid: data._id,
          vendorname: vendorname1,
          contactperson: contactperson1,
          maincontact: maincontact1,
          alternateno: alternateno1,
          email: email1,
          gstid: gstid1,
          address: address1,
          // LNF: LNF1,
          pincode: pincode1,
          city: city1,
          color: color1,
          pincode: pincode1,
          instructions: instructions1,
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert("Updated Successfully");
          window.location.reload("");
        }
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const columns = [
    {
      name: "Sl  No",
      selector: (row, index) => index + 1,
    },
    {
      name: "Vendor Name",
      selector: (row) => row.vendorname,
    },
    {
      name: "Contact Person",
      selector: (row) => row.contactperson,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Address",
      selector: (row) => row.address,
    },
    {
      name: "City",
      selector: (row) => row.city,
    },
    {
      name: "Instructions",
      selector: (row) => row.instructions,
    },

    {
      name: "Action",
      cell: (row) => (
        <div>
          <span
            className="hyperlink"
            onClick={() => edit(row)}
            style={{ cursor: "pointer" }}
          >
            <i
              class="fa-solid fa-pen"
              title="Edit"
              style={{ color: "#ffc107" }}
            ></i>{" "}
          </span>{" "}
          |
          <span
            onClick={() => deletevendor(row._id)}
            className="hyperlink mx-1"
            style={{ cursor: "pointer" }}
          >
            <i
              class="fa-solid fa-trash"
              title="Delete"
              style={{ color: "#dc3545" }}
            ></i>
          </span>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Header />
      <Nav />

      <div className="row mt-1 m-auto">
        <div className="col-md-12">
          <div className="d-flex float-end mt-3 mb-3">
            <button
              className="btn-primary-button mx-2"
              style={selected == 1 ? active : inactive}
              onClick={handleClick(1)}
            >
              Vendor Add
            </button>

            <button
              style={selected == 0 ? active : inactive}
              onClick={handleClick(0)}
              className="btn-secondary-button"
            >
              All Vendors
            </button>
          </div>
          {/* default it will show user data in table view ======================================== */}
          {selected == 0 ? (
            <>
              <div className="mt-5">
                <input
                  type="text"
                  placeholder="Search here.."
                  className="w-25 form-control"
                  value={search}
                  onChange={(e) => setsearch(e.target.value)}
                />
              </div>
              <div className="mt-1 border">
                <DataTable
                  columns={columns}
                  data={filterdata}
                  pagination
                  fixedHeader
                  selectableRowsHighlight
                  subHeaderAlign="left"
                  highlightOnHover
                />
              </div>
            </>
          ) : (
            <>
              {" "}
              {/* Vendor Basic Information will visible when click vendor Add button ================================== */}
              <div className="card" style={{ marginTop: "62px" }}>
                <div className="card-body p-4">
                  <form>
                    <div className="row">
                      <div className="vhs-sub-heading">
                        Vendor Basic Information
                      </div>
                      <div className="col-md-4 pt-2">
                        <div className="vhs-input-label">Vendor Name</div>
                        <div className="group pt-1">
                          <input
                            type="text"
                            className="col-md-12 vhs-input-value"
                            onChange={(e) => setvendorname(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-4 pt-2">
                        <div className="vhs-input-label">
                          Contact Person
                          <span className="text-danger"> *</span>
                        </div>
                        <div className="group pt-1">
                          <input
                            type="text"
                            className="col-md-12 vhs-input-value"
                            onChange={(e) => setcontactperson(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-4 pt-2"></div>
                    </div>

                    <div className="row pt-2">
                      <div className="vhs-sub-heading">
                        Vendor Contact & GST Information
                      </div>
                      <div className="col-md-4 pt-3">
                        <div className="vhs-input-label">
                          Main Contact
                          <span className="text-danger"> *</span>
                        </div>
                        <div className="group pt-1">
                          <input
                            type="text"
                            className="col-md-12 vhs-input-value"
                            onChange={(e) => setmaincontact(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-4 pt-3">
                        <div className="vhs-input-label">Alternate Contact</div>
                        <div className="group pt-1">
                          <input
                            type="text"
                            className="col-md-12 vhs-input-value"
                            onChange={(e) => setalternateno(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-4 pt-3">
                        <div className="vhs-input-label">Email</div>
                        <div className="group pt-1">
                          <input
                            type="text"
                            className="col-md-12 vhs-input-value"
                            onChange={(e) => setemail(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row pt-2">
                      <div className="col-md-4">
                        <div className="vhs-input-label">
                          GST Id.
                          <span className="text-danger"> *</span>
                        </div>
                        <div className="group pt-1">
                          <input
                            type="text"
                            className="col-md-12 vhs-input-value"
                            onChange={(e) => setgstid(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-md-4"></div>
                      <div className="col-md-4"></div>
                    </div>

                    <div className="row pt-2">
                      <div className="vhs-sub-heading">
                        Vendor Contact & GST Information
                      </div>
                      <div className="col-md-4 pt-3">
                        <div className="vhs-input-label">Address</div>
                        <div className="group pt-1">
                          <textarea
                            rows={3}
                            cols={6}
                            type="text"
                            className="col-md-12 vhs-input-value"
                            onChange={(e) => setaddress(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-4 pt-3">
                        <div className="vhs-input-label">
                          Landmark / Near By Famous Place{" "}
                          <span className="text-danger">*</span>
                        </div>
                        <div className="group pt-1">
                          <textarea
                            rows={3}
                            cols={6}
                            type="text"
                            className="col-md-12 vhs-input-value"
                            onChange={(e) => setlnfp(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-4 pt-3">
                        <div className="vhs-input-label">
                          City
                          <span className="text-danger">*</span>
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
                    </div>

                    <div className="row pt-2">
                      <div className="col-md-4">
                        <div className="vhs-input-label">Pin Code</div>
                        <div className="group pt-1">
                          <input
                            type="text"
                            className="col-md-12 vhs-input-value"
                            onChange={(e) => setpincode(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-md-4"></div>
                      <div className="col-md-4"></div>
                    </div>

                    <div className="row pt-2">
                      <div className="vhs-sub-heading">
                        Vendor Other Information
                      </div>
                      <div className="col-md-4 pt-3">
                        <div className="vhs-input-label">
                          Color
                          <span className="text-danger">*</span>
                        </div>
                        <div className="group pt-1">
                          <select
                            className="col-md-12 vhs-input-value"
                            onChange={(e) => setcolor(e.target.value)}
                          >
                            <option>-Slect-</option>
                            <option>Red</option>
                            <option>Orange</option>
                            <option>Green</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-4 pt-3">
                        <div className="vhs-input-label">
                          Instructions
                          <span className="text-danger">*</span>
                        </div>
                        <div className="group pt-1">
                          <textarea
                            rows={3}
                            cols={6}
                            type="text"
                            className="col-md-12 vhs-input-value"
                            onChange={(e) => setinstructions(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-4"></div>
                    </div>

                    <div className="row pt-3 justify-content-center">
                      <div className="col-md-2">
                        <button className="vhs-button" onClick={addvendor}>
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
            </>
          )}
        </div>
      </div>

      {/* model for edit user data and update password ============================================*/}
      <Modal
       size="lg"
       aria-labelledby="example-modal-sizes-title-lg"
        show={show}
        onHide={handleClose}
        backdrop="dynamic"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Vendor Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card-body p-3">
            {/* this form for change user name ================================== */}

            <div className="card">
              <div className="card-body p-2">
                <div className="row">
                  <div className="col-md-4">
                    <div className="vhs-input-label">Vendor Name</div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setvendorname1(e.target.value)}
                        defaultValue={data?.vendorname}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label">Contact person Name</div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        defaultValue={data?.contactperson}
                        onChange={(e) => setcontactperson1(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label">Contact Number</div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        defaultValue={data?.maincontact}
                        onChange={(e) => setmaincontact1(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label">GST ID</div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        defaultValue={data?.gstid}
                        onChange={(e) => setgstid1(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Email
                      <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        defaultValue={data?.email}
                        onChange={(e) => setemail1(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Address
                      <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        defaultValue={data?.address}
                        onChange={(e) => setaddress1(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      City
                      <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        defaultValue={data?.city}
                        onChange={(e) => setcity1(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Instructions
                      <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <textarea
                        type="text"
                        className="col-md-12 vhs-input-value"
                        defaultValue={data?.instructions}
                        onChange={(e) => setinstructions1(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row pt-3 justify-content-center">
                  <div className="col-md-1 ">
                    <button className="vhs-button" onClick={editVendor}>
                      Update
                    </button>
                  </div>
                  <div className="col-md-1 mx-3">
                    <button className="vhs-button mx-3">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Vendor;