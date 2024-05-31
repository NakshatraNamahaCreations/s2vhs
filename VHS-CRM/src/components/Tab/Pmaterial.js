import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import Nav from "../Nav1";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import DataTable from "react-data-table-component";


function Pmaterial() {
  const [show, setShow] = useState(false);
  const [pmaterial, setpmaterial] = useState("");
  const [pmaterialdata, setpmaterialdata] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const apiURL = process.env.REACT_APP_API_URL;
  
  const [search, setsearch] = useState("");
  const [filterdata, setfilterdata] = useState([]);
  const [data, setdata] = useState([]);
  const [pmaterial1, setpmaterial1] = useState(data.pmaterial);

  const addpmaterial = async (e) => {
    e.preventDefault();
   
    try {
      const config = {
        url: "/master/addpmaterial",
        method: "post",
        baseURL: apiURL,
        headers:{"content-type":"application/json"},
        data: {
          pmaterial:pmaterial
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert("Successfully Added");
          window.location.assign("/pmaterial");
        }
      });
    } catch (error) {
      console.error(error);
      alert("category  Not Added");
    }
  };

  useEffect(() => {
    getpmaterial();
  }, []);

  const getpmaterial = async () => {
    let res = await axios.get(apiURL+"/master/getpmaterial");
    if ((res.status = 200)) {
      setpmaterialdata(res.data?.masterpmaterial);
      setfilterdata(res.data?.masterpmaterial);
    }
  };


  const editpmaterial = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: `/master/editpmaterial/${data._id}`,
        method: "post",
        baseURL: apiURL,
        headers: { "content-type": "application/json" },
        data: {
          pmaterial: pmaterial1,
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
      selector: (row,index) => index+1,
    },
    {
      name: "material",
      selector: (row) => row.pmaterial,
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <a className="hyperlink" onClick={() => edit(row)}>
            Edit |
          </a>
          <a onClick={() => deletepmaterial(row._id)} className="hyperlink mx-1">
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
    const result = pmaterialdata.filter((item) => {
      return item.pmaterial.toLowerCase().match(search.toLowerCase());
    });
    setfilterdata(result);
  }, [search]);

  const deletepmaterial = async (id) => {
    axios({
      method: "post",
      url: apiURL+"/master/deletepmaterial/" + id,
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
 

  let i = 0;
  return (
    <div className="web">
      <Header />
      <Nav />

      <div className="row m-auto">
        <div className="col-md-12">
          <div className="card" style={{ marginTop: "30px" }}>
            <div className="card-body p-3">
              <form>
                <div className="row">
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Material <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setpmaterial(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="row pt-3 justify-content-center">
                  <div className="col-md-2">
                    <button className="vhs-button" onClick={addpmaterial}>
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
        <Modal.Header closeButton>
          <Modal.Title>Material</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card" style={{ marginTop: "30px" }}>
            <div className="card-body p-3">
              <form>
                <div className="row">
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      material <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        defaultValue={data.pmaterial}
                        onChange={(e)=>setpmaterial1(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="row pt-3 justify-content-center">
                  <div className="col-md-2">
                    <button className="vhs-button" onClick={editpmaterial}>Save</button>
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

export default Pmaterial;
