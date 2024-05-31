import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import Nav1 from "../Nav1";
import Quotationnav from "../Quotationnav";
import Modal from "react-bootstrap/Modal";
import DataTable from "react-data-table-component";
import axios from "axios";

import Contentnav from "../Contentnav";

function Ajob() {
  const admin = JSON.parse(sessionStorage.getItem("admin"));
  const cat = sessionStorage.getItem("category");
  // const [data1, setdata1] = useState([]);
  const [material, setmaterial] = useState("");
  const [desc, setdesc] = useState("");
  const [rate, setrate] = useState("");
  const [search, setsearch] = useState("");
  const [ajobdata, setajobdata] = useState([]);
  const [filterdata, setfilterdata] = useState([]);
  const [data, setdata] = useState([]);
  const category = sessionStorage.getItem("category");
  const [material1, setmaterial1] = useState(data.material);
  const [category1, setcategory1] = useState(data.category);

  const [desc1, setdesc1] = useState(data.desc);
  const [rate1, setrate1] = useState(data.rate);
  const [newqtdata, setnewqtdata] = useState([]);
  const [materialdata, setmaterialdata] = useState([]);
  const formdata = new FormData();
  const apiURL = process.env.REACT_APP_API_URL;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getmaterial();
    getajob();
  }, []);

  const getmaterial = async () => {
    let res = await axios.get(apiURL + "/master/getamaterial");
    if ((res.status = 200)) {
      setmaterialdata(res.data?.amaterial);
    }
  };
  const postajob = async (e) => {
    e.preventDefault();

    try {
      const config = {
        url: "/master/addajob",
        method: "post",
        baseURL: apiURL,
        headers: { "content-type": "application/json" },

        data: {
          category: category,
          material: material,
          desc: desc,
          rate: rate,
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          console.log("success");
          alert("Ajob added successfuly");
          window.location.reload();
        }
      });
    } catch (error) {
      console.error(error);
      alert("category Name Not Added");
    }
  };
  const getajob = async () => {
    let res = await axios.get(apiURL + "/master/getajob");
    if ((res.status = 200)) {
      console.log(res);
      setajobdata(res.data?.ajob.filter((i)=>i.category ===cat));
      setfilterdata(res.data?.ajob.filter((i)=>i.category ===cat));
    }
  };

  const editajob = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: `/master/editajob/${data._id}`,
        method: "post",
        baseURL: apiURL,
        headers: { "content-type": "application/json" },
        data: {
          category:category1,
          material: material1,
          desc: desc1,
          rate: rate1,
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
  const columns = [
    {
      name: "Sl  No",
      selector: (row, index) => index + 1,
    },
    {
      name: "Category",
      selector: (row) => row.category,
    },

    {
      name: "Material ",
      selector: (row) => row.material,
    },

    {
      name: "Qty/Desc",
     
      cell:(row)=>(
        <div className="mt-2">

        <p>
          {row.desc.split('\n').map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </p>
      </div>
      )
    },
    {
      name: "Rate ",
      selector: (row) => row.rate,
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <a className="hyperlink" onClick={() => edit(row)}>
            Edit |
          </a>
          <a onClick={() => deleteajob(row._id)} className="hyperlink mx-1">
            Delete
          </a>
        </div>
      ),
    },
  ];

  const edit = (data) => {
    setdata(data);
    handleShow(true);
  };
  useEffect(() => {
    const result = ajobdata.filter((item) => {
      return item.material.toLowerCase().match(search.toLowerCase());
    });
    setfilterdata(result);
  }, [search]);
  let i = 0;

  const deleteajob = async (id) => {
    axios({
      method: "post",
      url: apiURL + "/master/deleteajob/" + id,
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
  return (
    <div className="web">
      <Header />
      <Nav1 />

      <div className="row m-auto">
        <div className="col-md-12">
          <div className="card" style={{ marginTop: "30px" }}>
            <div className="card-body p-3">
              <p>
                <b>Category :</b> {cat}
              </p>
              <Contentnav />

              <form className="mt-5">
                <div className="row">
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Material <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <select
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setmaterial(e.target.value)}
                      >
                        <option>--select--</option>
                        {materialdata.map((item) => (
                          <option value={item.material}>{item.material}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Desc/Qty <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <textarea
                         rows={5}
                         cols={10}
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setdesc(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Rate <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="vhs-input-value col-md-12"
                        onChange={(e) => setrate(e.target.value)}
                        placeholder="00.00"
                      />
                    </div>
                  </div>
                </div>

                <div className="row pt-3 ">
                  <div className="col-md-2">
                    <button className="vhs-button" onClick={postajob}>
                      Save
                    </button>
                  </div>
                  <div className="col-md-2">
                    {/* <Link to="/termsgroup">
                      <button className="vhs-button">Next</button>
                    </Link> */}
                  </div>
                </div>
              </form>
            </div>
          </div>
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
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        {/* <Modal.Header closeButton>
          <Modal.Title>A-Job</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <h4 className="text-center"> Ajob</h4>
          <div className="card" style={{ marginTop: "30px" }}>
            <div className="card-body p-3">
              <form>
                <div className="row">
                <div className="col-md-4">
                    <div className="vhs-input-label">
                      Category 
                    </div>
                    <div className="group pt-1">
                      <select
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setcategory1(e.target.value)}
                      >
                        <option value={data.category}>{data.category}</option>
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
                      Material <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <select
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setmaterial1(e.target.value)}
                      >
                        <option value={data.material}>{data.material}</option>
                        {materialdata.map((item) => (
                          <option value={item.material}>{item.material}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Description <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <textarea
                        rows={5}
                        cols={10}
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setdesc1(e.target.value)}
                        defaultValue={data.desc}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Rate <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="vhs-input-value col-md-12"
                        onChange={(e) => setrate1(e.target.value)}
                        defaultValue={data.rate}
                      />
                    </div>
                  </div>
                </div>

                <div className="row pt-3 justify-content-center mt-4">
                <div className="col-md-3 ">
                    <button className="vhs-button" onHide={handleClose}>
                      Cancel
                    </button>
                  </div>
                  <div className="col-md-3 ">
                    <button className="vhs-button" onClick={editajob}>
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

export default Ajob;
