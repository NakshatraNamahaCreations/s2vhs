import React, { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import Nav1 from "../components/Nav1";

import Modal from "react-bootstrap/Modal";
import DataTable from "react-data-table-component";
import axios from "axios";
import Formatnav from "../components/Formatnav";

function Qheader() {
  const cat = sessionStorage.getItem("category");
  const [serno, setserno] = useState("");
  const [headerimgdata, setheaderimgdata] = useState([]);
  const [footerimgdata, setfooterimgdata] = useState([]);
  const [termsgroup, settermsgroup] = useState("");
  const [terms, setterms] = useState("");
  const [headerimg, setheaderimg] = useState("");
  const [footerimg, setfooterimg] = useState("");

  const apiURL = process.env.REACT_APP_API_URL;
  const imgURL = process.env.REACT_APP_IMAGE_API_URL;
  const [search, setsearch] = useState("");
  const [filterdata, setfilterdata] = useState([]);

  const formdata = new FormData();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const postformat = async (e) => {
    e.preventDefault();
    formdata.append("headerimg", headerimg);

    try {
      const config = {
        url: "/master/addheaderimg",
        method: "post",
        baseURL: apiURL,
        data: formdata,
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert("Successfully Added");
          window.location.assign("/qheader");
        }
      });
    } catch (error) {
      console.error(error);
      alert("category  Not Added");
    }
  };

  useEffect(() => {
    getheaderimg();
  }, []);

  const getheaderimg = async () => {
    let res = await axios.get(apiURL + "/master/getheaderimg");
    if (res.status === 200) {
      setheaderimgdata(res.data?.headerimg);
    }
  };

  function imageFormatter(cell, row) {
    return (
      <img
        src={imgURL + "/quotationheaderimg/" + cell.headerimg}
        height="50px"
        width="50px"
      />
    );
  }

  const columns = [
    {
      name: "Sl  No",
      selector: (row, index) => index + 1,
    },
    {
      name: "Header image",
      selector: imageFormatter,
    },

    {
      name: "Action",
      cell: (row) => (
        <div>
          <a
            onClick={() => deleteheaderimg(row._id)}
            className="hyperlink mx-1"
          >
            Delete
          </a>
        </div>
      ),
    },
  ];

  const deleteheaderimg = async (id) => {
    axios({
      method: "post",
      url: apiURL + "/master/deleteheaderimg/" + id,
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
      <Nav1 />

      <div className="row m-auto">
        <div className="col-md-12">
          <div className="card" style={{ marginTop: "30px" }}>
            <div className="card-body p-3">
              <p>
                <b>Category:</b> {cat}
              </p>
              <Formatnav />
            </div>
          </div>
          <div>
            <div className="d-flex float-end pt-3">
              <button
                className="btn-primary-button mx-2"
                style={{
                  background: "rgb(169, 4, 46)",
                  color: "white",
                  border: "none",
                }}
                onClick={handleShow}
              >
                Add headerimg
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <h5>Header images</h5>
              <div className="mt-1 border">
                <DataTable
                  columns={columns}
                  data={headerimgdata}
                  pagination
                  fixedHeader
                  selectableRowsHighlight
                  subHeaderAlign="left"
                  highlightOnHover
                />
              </div>
            </div>
          </div>

          <div></div>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> Header image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="" style={{ marginTop: "30px" }}>
            <div className="card-body p-3">
              <form>
                <div className="row">
                  <div className="col-md-4">
                    <div className="vhs-input-label">Header image</div>
                    <div className="group pt-1">
                      <input
                        type="file"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setheaderimg(e.target.files[0])}
                      />
                    </div>
                    <b>Note:</b>width: 1000px<b>Height:</b>200px
                  </div>

                  <div className="col-md-4"></div>
                </div>

                <div className="row pt-3 justify-content-center">
                  <div className="col-md-2">
                    <button className="vhs-button" onClick={postformat}>
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

export default Qheader;
