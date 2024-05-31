import React, { useState, useEffect } from "react";
import Header from "../layout/Header";

import Modal from "react-bootstrap/Modal";
import Nav from "../Nav1";
import axios from "axios";
import DataTable from "react-data-table-component";
import Multiselect from "multiselect-react-dropdown";
import { Link } from "react-router-dom";

const active = {
  backgroundColor: "rgb(169, 4, 46)",
  color: "#fff",
  fontWeight: "bold",
  border: "none",
};
const inactive = { color: "black", backgroundColor: "white" };

function Technician() {
  const admin = JSON.parse(sessionStorage.getItem("admin"));
  const [selected, setSelected] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [city, setcity] = useState("");
  const [category, setcategory] = useState("");
  const [vhsname, setvhsname] = useState("");
  const [smsname, setsmsname] = useState("");
  const [number, setnumber] = useState("");
  const [password, setpassword] = useState("");
  const [experiance, setexperiance] = useState("");
  const [language, setlanguagesknow] = useState("");
  const [Type, setType] = useState("");
  const [data, setdata] = useState([]);

  const [city1, setcity1] = useState(data.city);
  const [category1, setcategory1] = useState(data?.category || []);
  const [vh, setvh] = useState(data.vhsname);
  const [smsname1, setsmsname1] = useState(data.smsname);
  const [number1, setnumber1] = useState(data.number);
  const [password1, setpassword1] = useState(data.password);
  const [experiance1, setexperiance1] = useState(data.experiance);
  const [language1, setlanguagesknow1] = useState(data.language);
  const [Type1, setType1] = useState(data.Type);
  const [selectedCatagory, setSelectedCatagory] = useState(
    data?.category || []
  );
  const [selectedCatagory1, setSelectedCatagory1] = useState(
    data?.category || []
  );

  const [techniciandata, settechniciandata] = useState([]);
  const [citydata, setcitydata] = useState([]);
  const [categorydata, setcategorydata] = useState([]);
  const [search, setsearch] = useState("");
  const [filterdata, setfilterdata] = useState([]);

  const apiURL = process.env.REACT_APP_API_URL;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addtechnician = async (e) => {
    e.preventDefault();
    if (number.length !== 10) {
      alert("Please enter 10 digit mobile number correctly")
    } else {


      if (
        !city ||
        !category1 ||
        !vhsname ||
        !number ||
        !password ||
        !experiance ||
        !language
      ) {
        alert("Please fill all fields");
      } else {
        try {
          const config = {
            url: "/addtechnician",
            method: "post",
            baseURL: apiURL,
            // data: formdata,
            headers: { "content-type": "application/json" },
            data: {
              Type: Type,
              category: category1,
              vhsname: vhsname,
              smsname: smsname,
              number: number,
              password: password,
              experiance: experiance,
              languagesknow: language,
              city: city,
            },
          };
          await axios(config).then(function (response) {
            if (response.status === 200) {
              console.log("success");
              alert(" Added");
              window.location.assign("/technician");
            }
          });
        } catch (error) {
          console.error(error); // Log the error to the browser console
          alert("An error occurred: " + error.response.data.error);
        }
      }
    }
  };
  useEffect(() => {
    gettechnician();
    getcity();
    getcategory();
  }, []);

  const gettechnician = async () => {
    let res = await axios.get(apiURL + "/getalltechnician");
    if ((res.status = 200)) {
      settechniciandata(res.data?.technician.filter((i) => i.Type !== "outVendor"));
      setfilterdata(res.data?.technician.filter((i) => i.Type !== "outVendor"));
    }
  };

  const getcity = async () => {
    let res = await axios.get(apiURL + "/master/getcity");
    if ((res.status = 200)) {
      setcitydata(res.data?.mastercity);
    }
  };
  const getcategory = async () => {
    let res = await axios.get(apiURL + "/getcategory");
    if ((res.status = 200)) {
      setcategorydata(res.data?.category);
    }
  };
  let i = 0;
  const deletetechnician = async (id) => {
    axios({
      method: "post",
      url: apiURL + "/deletetechnician/" + id,
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

  const columns = [
    {
      name: "Sl  No",
      selector: (row, index) => index + 1,
    },
    {
      name: "Type",
      selector: (row) => row.Type,
    },
    {
      name: "VHS Name",
      selector: (row) => row.vhsname,
    },
    {
      name: "SMS Name",
      selector: (row) => row.smsname,
    },
    {
      name: "City",
      selector: (row) => row.city,
    },
    {
      name: "Mobile no",
      selector: (row) => row.number,
    },
    {
      name: "category",
      cell: (row) => (
        <div>
          {row.category.map((i) => (
            <div> {i.name},</div>
          ))}
        </div>
      ),
    },
    {
      name: "Password",
      selector: (row) => row.password,
    },
    {
      name: "experiance",
      selector: (row) => row.experiance,
    },
    {
      name: "Languages",
      selector: (row) => row.languagesknow,
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <a className="hyperlink" onClick={() => edit(row)}>
            Edit |
          </a>

          <a
            onClick={() => deletetechnician(row._id)}
            className="hyperlink mx-1"
          >
            Delete
          </a>
        </div>
      ),
    },
  ];
  const edit = (data) => {
    setdata(data);
    setSelectedCatagory1(data.category);
    handleShow();
  };

  useEffect(() => {
    const filteredData = techniciandata.filter((item) => {
      const searchString = search.toLowerCase();
      const vhsname = item.vhsname?.toLowerCase().includes(searchString);
      const smsname = item.smsname?.toLowerCase().includes(searchString);
      const number = item.number?.toLowerCase().includes(searchString);
      const Type = item.Type?.toLowerCase().includes(searchString);
      const city = item.city?.toLowerCase().includes(searchString);

      return vhsname || smsname || Type || city || number;
    });

    setfilterdata(filteredData);
  }, [search, techniciandata]);

  const edittechnician = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: `/edittechnician/${data._id}`,
        method: "post",
        baseURL: apiURL,
        headers: { "content-type": "application/json" },
        data: {
          Type: Type1,
          category: selectedCatagory1,
          vhsname: vh,
          smsname: smsname1,
          number: number1,
          password: password1,
          experiance: experiance1,
          languagesknow: language1,
          city: city1,
        },
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

  const onSelectCatagory = (selectedList, selectedItem) => {
    // Handle select event
    setcategory1(selectedList);
    console.log(selectedList);
  };

  const onEditCatagory = (selectedList, selectedItem) => {
    // Handle select event
    setSelectedCatagory1(selectedList);
  };

  const onRemoveCatagory = (selectedList, removedItem) => {
    // Handle remove event
    setSelectedCatagory(selectedList);
  };

  return (
    <div className="web">
      <Header />
      <Nav />

      <div className="row m-auto">
        <div className="col-md-12">
          <div className="row justify-content-end pt-3">
            <div className="col-md-1 p-0">
              <Link to="/technisian">
                <button className="btn-primary-technician-button1">
                  Inhouse
                </button>
              </Link>

            </div>
            <div className="col-md-1 p-0">
              <Link to="/vendors">

                <button className="btn-primary-technician-button1" >
                  Vendor
                </button>
              </Link>

            </div>
          </div>
          <div className="card" style={{ marginTop: "30px" }}>
            <h4 className="p-3">Inhouse </h4>

            <div className="card-body p-3">
              <form>
                <div className="row pt-2">
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Type <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <select
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setType(e.target.value)}
                      >
                        <option>--select--</option>
                        <option value="executive">Executive</option>
                        <option value="technician">Technician</option>
                        <option value="pm">Project Manager</option>
                        <option value="Vendor">Vendor</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      City <span className="text-danger"> *</span>
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
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      VHS Name <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setvhsname(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="row pt-3">
                  <div className="col-md-4">
                    <div className="vhs-input-label">SMS Name</div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setsmsname(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Mobile Number <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setnumber(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Password <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        onChange={(e) => setpassword(e.target.value)}
                        type="text"
                        className="col-md-12 vhs-input-value"
                      />
                    </div>
                  </div>
                </div>

                <div className="row pt-3">
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Experiance <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setexperiance(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Languages Known <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setlanguagesknow(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Category<span className="text-danger"> *</span>
                    </div>
                    <Multiselect
                      className="mt-3"
                      options={admin.category.map((category) => ({
                        name: category.name,
                      }))}
                      defaultValue="Select Catagory"
                      selectedValues={selectedCatagory}
                      onSelect={onSelectCatagory}
                      onRemove={onRemoveCatagory}
                      displayValue="name"
                      showCheckbox={true}
                    />{" "}
                  </div>

                  <div className="col-md-4"></div>
                </div>

                <div className="row pt-2">
                  <div className="vhs-sub-heading">
                    Note: One Mobile Number Will Register Only Once For
                    Technician
                  </div>
                </div>

                <div className="row pt-3">
                  <div className="col-md-2">
                    <button className="vhs-button" onClick={addtechnician}>
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="mt-5">
            <input
              type="text"
              placeholder="Search Type or name or city number"
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
        </div>
      </div>
      {/* ============================================ edit ======================================================================= */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Technician</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card" style={{ marginTop: "30px" }}>
            <div className="card-body p-3">
              <form>
                <div className="row pt-2">
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Type <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <select
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setType1(e.target.value)}
                        defaultValue={data?.Type}
                      >
                        <option>--select--</option>
                        <option value="executive">Executive</option>
                        <option value="technician">Technician</option>
                        <option value="pm">Project Manager</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      City <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <select
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setcity1(e.target.value)}
                      >
                        <option value={data.city}>{data.city}</option>
                        {admin?.city.map((item) => (
                          <option value={item.name}>{item.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <Multiselect
                      className="mt-3"
                      options={admin.category.map((category) => ({
                        name: category.name,
                      }))}
                      selectedValues={selectedCatagory1}
                      onSelect={onEditCatagory}
                      onRemove={onRemoveCatagory}
                      displayValue="name"
                      showCheckbox={true}
                    />
                  </div>
                </div>

                <div className="row pt-3">
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      VHS Name <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setvh(e.target.value)}
                        defaultValue={data.vhsname}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      SMS Name <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setsmsname1(e.target.value)}
                        defaultValue={data.smsname}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Mobile Number <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setnumber1(e.target.value)}
                        defaultValue={data.number}
                      />
                    </div>
                  </div>
                </div>

                <div className="row pt-3">
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Password <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setpassword1(e.target.value)}
                        defaultValue={data.password}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Experiance <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        defaultValue={data.experiance}
                        onChange={(e) => setexperiance1(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Languages Known <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        defaultValue={data.languagesknow}
                        onChange={(e) => setlanguagesknow1(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-4"></div>
                </div>

                <div className="row pt-2">
                  <div className="vhs-sub-heading">
                    Note: One Mobile Number Will Register Only Once For
                    Technician
                  </div>
                </div>

                <div className="row pt-3">
                  <div className="col-md-2">
                    <button className="vhs-button" onClick={edittechnician}>
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
      
      </Modal>
    </div>
  );
}

export default Technician;
