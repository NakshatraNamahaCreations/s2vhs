import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import Contentnav from "../Contentnav";
import Nav1 from "../Nav1";
import Modal from "react-bootstrap/Modal";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

function Amaterial() {
  const admin = JSON.parse(sessionStorage.getItem("admin"));
  const cat = sessionStorage.getItem("category");
  const [material, setmaterial] = useState("");
  const [materialdata, setmaterialdata] = useState([]);
  const [benefits, setbenefits] = useState("");
  const apiURL = process.env.REACT_APP_API_URL;
  const [search, setsearch] = useState("");
  const [filterdata, setfilterdata] = useState([]);
  const category = sessionStorage.getItem("category");
  const [data, setdata] = useState([]);
  const [category1, setcategory1] = useState(materialdata.category);
  const [material1, setmaterial1] = useState(materialdata.material);
  const [benefits1, setbenefits1] = useState(materialdata.benefits);

  // console.log(data)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const postamaterial = async (e) => {
    e.preventDefault();

    try {
      const config = {
        url: "/master/addamaterial",
        method: "post",
        baseURL: apiURL,
        data: {
          category: category,
          material: material,
          benefits: benefits,
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert("Successfully Added");
          window.location.assign("/amaterial");
        }
      });
    } catch (error) {
      console.error(error);
      alert("material  Not Added");
    }
  };

  useEffect(() => {
    getmaterial();
  }, []);

  const getmaterial = async () => {
    let res = await axios.get(apiURL + "/master/getamaterial");
    if ((res.status = 200)) {
      setmaterialdata(res.data?.amaterial.filter((i)=>i.category === cat));
      setfilterdata(res.data?.amaterial.filter((i)=>i.category === cat));
    }
  };

  const edittermsgroup = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: `/master/editamaterial/${data._id}`,
        method: "post",
        baseURL: apiURL,
        headers: { "content-type": "application/json" },
        data: {
          category: category1,
          material: material1,
          benefits: benefits1,
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
      cell: (row, index) => index + 1,
    },
    {
      name: "Category",
      selector: (row) => row.category,
    },
    {
      name: "Material",
      selector: (row) => row.material,
    },
    {
      name: "Benefits",
      // selector: (row) => row.benefits,
      cell:(row)=>(
        <div className="mt-2">

        <p>
          {row.benefits.split('\n').map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </p>
      </div>
      )
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <a className="hyperlink" onClick={() => edit(row)}>
            Edit |
          </a>
          <a
            onClick={() => deleteamaterial(row._id)}
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
    handleShow(true);
  };

  useEffect(() => {
    const result = materialdata.filter((item) => {
      return item.material.toLowerCase().match(search.toLowerCase());
    });
    setfilterdata(result);
  }, [search]);

  const deleteamaterial = async (id) => {
    axios({
      method: "post",
      url: apiURL + "/master/deleteamaterial/" + id,
    })
      .then(function (response) {
        //handle success

        alert("Deleted successfully");
        window.location.reload();
      })
      .catch(function (error) {
        //handle error
        console.log(error.response.data);
      });
  };

  let i = 0;
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
              <div> </div>
              <form className="mt-5">
                <div className="row">
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      A Material <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setmaterial(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Benefits <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <textarea
                        rows={5}
                        cols={10}
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setbenefits(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-4"></div>
                </div>

                <div className="row pt-3 ">
                  <div className="col-md-2">
                    <button className="vhs-button" onClick={postamaterial}>
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
              placeholder="Search Material here.."
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
          <Modal.Title>A-Material</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <h4 className="text-center">Amaterial</h4>

          <div className="card" style={{ marginTop: "30px" }}>
            <div className="card-body p-3">
              <form>
                <div className="row">
                  <div className="col-md-4">
                    <div className="vhs-input-label">Category</div>
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
                      A Material <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setmaterial1(e.target.value)}
                        defaultValue={data.material}
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Benefits <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <textarea
                        rows={5}
                        cols={10}
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setbenefits1(e.target.value)}
                        defaultValue={data.benefits}
                      />
                    </div>
                  </div>

                  <div className="col-md-4"></div>
                </div>

                <div className="row pt-3 justify-content-center mt-4">
                  <div className="col-md-3 ">
                    <button className="vhs-button" onHide={handleClose}>
                      Cancel
                    </button>
                  </div>
                  <div className="col-md-2">
                    <button className="vhs-button" onClick={edittermsgroup}>
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

export default Amaterial;
