import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import Nav1 from "../Nav1";
import Quotationnav from "../Quotationnav";
import Modal from "react-bootstrap/Modal";
import DataTable from "react-data-table-component";
import axios from "axios";
import Formatnav from "../Formatnav";

function Termsgroup() {
  const [bankdata, setbankdata] = useState([]);

  const [accno, setaccno] = useState("");
  const [accname, setaccname] = useState("");
  const [ifsccode, setifsccode] = useState("");
  const [bankname, setbankname] = useState("");
  const [upinumber, setupinumber] = useState("");
  const [branch, setbranch] = useState("");
  const apiURL = process.env.REACT_APP_API_URL;
  const imgURL = process.env.REACT_APP_IMAGE_API_URL;
  const [search, setsearch] = useState("");
  const [filterdata, setfilterdata] = useState([]);

  const formdata = new FormData();
const [data, setdata] = useState([]);

const [accno1, setaccno1] = useState(data.accno);
const [accname1, setaccname1] = useState(data.accname);
const [ifsccode1, setifsccode1] = useState(data.ifsccode);
const [bankname1, setbankname1] = useState(data.bankname);
const [upinumber1, setupinumber1] = useState(data.upinumber);
const [branch1, setbranch1] = useState(data.branch);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const addbank = async (e) => {
    e.preventDefault();
   
    try {
      const config = {
        url: "/addbank",
        method: "post",
        baseURL: apiURL,
        data: {
            accno:accno,
            accname:accname,
            ifsccode:ifsccode,
            bankname:bankname,
            upinumber:upinumber,
            branch:branch
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert("Successfully Added");
          window.location.assign("/addbank");
        }
      });
    } catch (error) {
      console.error(error);
      alert("  Not Added");
    }
  };
  
  useEffect(() => {
    getbank();

  }, []);

  const getbank = async () => {
    let res = await axios.get(apiURL + "/getbank");
    if ((res.status = 200)) {
      setbankdata(res.data?.bankacct);
      setfilterdata(res.data?.bankacct);
    }
  };

 

 
  const columns = [
    {
      name: "Sl  No",
      selector: (row, index) => index + 1,
    },
    {
      name: "Account Name",
      selector:(row)=>row.accname,
    },
    {
        name: "Account Number",
        selector:(row)=>row.accno,
      },
      {
        name: "Ifsc code",
        selector:(row)=>row.ifsccode,
      },
      {
        name: "Bank name",
        selector:(row)=>row.bankname,
      },
      {
        name: "Branch name",
        selector:(row)=>row.branch,
      },
    {
      name: "Action",
      cell: (row) => (
        <div>
             <a className="hyperlink" onClick={() => edit(row)}>
            Edit |
          </a>
          <a
            onClick={() => deletebank(row._id)}
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
    handleShow1(true);
  };
  const editbank = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: `/editbank/${data._id}`,
        method: "post",
        baseURL: apiURL,
        headers: { "content-type": "application/json" },
        data: {
            accno:accno1,
            accname:accname1,
            ifsccode:ifsccode1,
            bankname:bankname1,
            upinumber:upinumber1,
            branch:branch1
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

  const deletebank = async (id) => {
    axios({
      method: "post",
      url: apiURL + "/deletebank/" + id,
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
                Add Bank
              </button>

           
            </div>
          </div>
        
          <div></div>
        </div>
        <div className="mt-5">
            {/* <input
              type="text"
              placeholder="Search here.."
              className="w-25 form-control"
              value={search}
              onChange={(e) => setsearch(e.target.value)}
            /> */}
          </div>
          <div className="mt-1 border">
            <DataTable
              columns={columns}
              data={bankdata}
              pagination
              fixedHeader
              selectableRowsHighlight
              subHeaderAlign="left"
              highlightOnHover
            />
          </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> Add bank details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="" style={{ marginTop: "30px" }}>
            <div className="card-body p-3">
              <form>
                <div className="row">
                  <div className="col-md-4">
                    <div className="vhs-input-label">Account number</div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setaccno(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label">Account holder name</div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setaccname(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label">Ifsc code</div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setifsccode(e.target.value)}
                      />
                    </div>
                  </div>


                </div>
                <div className="row mt-3">
                  <div className="col-md-4">
                    <div className="vhs-input-label">Bank Name</div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setbankname(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label">Branch Name</div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setbranch(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label">Phonepe/google pay number</div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setupinumber(e.target.value)}
                      />
                    </div>
                  </div>
                 


                </div>
                <div className="row pt-3 justify-content-center">
                  <div className="col-md-2">
                    <button className="vhs-button" onClick={addbank}>
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={show1}
        onHide={handleClose1}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> Add bank details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="" style={{ marginTop: "30px" }}>
            <div className="card-body p-3">
              <form>
                <div className="row">
                  <div className="col-md-4">
                    <div className="vhs-input-label">Account number</div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setaccno1(e.target.value)}
                        placeholder={data.accno}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label">Account holder name</div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setaccname1(e.target.value)}
                        placeholder={data.accno}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label">Ifsc code</div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setifsccode1(e.target.value)}
                        placeholder={data.accno}
                      />
                    </div>
                  </div>


                </div>
                <div className="row mt-3">
                  <div className="col-md-4">
                    <div className="vhs-input-label">Bank Name</div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setbankname1(e.target.value)}
                        placeholder={data.bankname}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label">Branch Name</div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setbranch1(e.target.value)}
                        placeholder={data.branch}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label">Phonepe/google pay number</div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setupinumber1(e.target.value)}
                        placeholder={data.upinumber}
                      />
                    </div>
                  </div>
                 


                </div>
                <div className="row pt-3 justify-content-center">
                  <div className="col-md-2">
                    <button className="vhs-button" onClick={editbank}>
                      Update
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
