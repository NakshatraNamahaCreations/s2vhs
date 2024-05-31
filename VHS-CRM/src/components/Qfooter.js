import React, { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import Nav1 from "../components/Nav1";

import Modal from "react-bootstrap/Modal";
import DataTable from "react-data-table-component";
import axios from "axios";
import Formatnav from "../components/Formatnav";

function Termsgroup() {
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

  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const addfooterimg = async (e) => {
    e.preventDefault();
    formdata.append("footerimg", footerimg);

    try {
      const config = {
        url: "/master/addfooterimg",
        method: "post",
        baseURL: apiURL,
        data: formdata,
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert("Successfully Added");
          window.location.assign("/qfooter");
        }
      });
    } catch (error) {
      console.error(error);
      alert("category  Not Added");
    }
  };

  useEffect(() => {
    getfooterimg();
  }, []);

  const getfooterimg = async () => {
    let res = await axios.get(apiURL + "/master/getfooterimg");
    if (res.status === 200) {
      setfooterimgdata(res.data?.footerimg);
    }
  };

  function imageFormatter1(cell, row) {
    return (
      <img
        src={imgURL + "/quotationfooterimg/" + cell.footerimg}
        height="50px"
        width="50px"
      />
    );
  }

  const columns1 = [
    {
      name: "Sl  No",
      selector: (row, index) => index + 1,
    },
    {
      name: "Footer image",
      selector: imageFormatter1,
    },

    {
      name: "Action",
      cell: (row) => (
        <div>
          <a
            onClick={() => deletefooterimg(row._id)}
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

  const deletefooterimg = async (id) => {
    axios({
      method: "post",
      url: apiURL + "/master/deletefooterimg/" + id,
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
                <b>Category :</b>
                {cat}
              </p>
              <Formatnav />
            </div>
          </div>
          <div>
            <div className="d-flex float-end pt-3">
              <button
                style={{
                  background: "rgb(169, 4, 46)",
                  color: "white",
                  border: "none",
                }}
                onClick={handleShow1}
                className="btn-secondary-button"
              >
                Add footerimg
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col- 12 mt-5">
              <h5>Footer images</h5>

              <div className="mt-1 border">
                <DataTable
                  columns={columns1}
                  data={footerimgdata}
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
        show={show1}
        onHide={handleClose1}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> Footer image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="" style={{ marginTop: "30px" }}>
            <div className="p-3">
              <form>
                <div className="row">
                  <div className="col-md-4">
                    <div className="vhs-input-label">Footer image</div>
                    <div className="group pt-1">
                      <input
                        type="file"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setfooterimg(e.target.files[0])}
                      />
                      {/* <b style={{fontSize:"12px"}}>Note: width=500px height=200px</b> */}
                    </div>
                  </div>

                  <div className="col-md-4"></div>
                </div>

                <div className="row pt-3 ">
                  <div className="col-md-2">
                    <button className="vhs-button " onClick={addfooterimg}>
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

export default Termsgroup;
