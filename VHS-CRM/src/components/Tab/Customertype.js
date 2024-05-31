import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import Nav from "../Nav1";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Table from "react-bootstrap/Table";
import DataTable from "react-data-table-component";

function Customertype() {
  const [show, setShow] = useState(false);
  const [customertype, setcustomertype] = useState("");
  const [customertypedata, setcustomertypedata] = useState([]);
  const [search, setsearch] = useState("");
  const [filterdata, setfilterdata] = useState([]);
  const [data, setdata] = useState([]);
  const [type, settype] = useState(data.customertype);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const apiURL = process.env.REACT_APP_API_URL;

  const addcustomertype = async (e) => {
    e.preventDefault();

    try {
      const config = {
        url: "/master/addcustomertype",
        method: "post",
        baseURL: apiURL,
        headers: { "content-type": "application/json" },
        data: {
          customertype: customertype,
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

  useEffect(() => {
    getcustomertype();
  }, []);

  const getcustomertype = async () => {
    let res = await axios.get(
      apiURL+"/master/getcustomertype"
    );
    if ((res.status = 200)) {
      setcustomertypedata(res.data?.mastercustomertype);
      setfilterdata(res.data?.mastercustomertype);
    }
  };

  const deletecustomertype = async (id) => {
    axios({
      method: "post",
      url: apiURL + "/master/deletecustomertype/" + id,
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

  const columns = [
    {
      name: "Sl  No",
      selector: (row,index) => index+1,
    },
    {
      name: "Customer Type",
      selector: (row) => row.customertype,
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <a className="hyperlink" onClick={() => edit(row)}>
            Edit  |
          </a>
          <a onClick={() => deletecustomertype(row._id)} className="hyperlink mx-1">
            Delete
          </a>
        </div>
      ),
    },
  ];

  const edit =(data)=>{
    setdata(data);
    handleShow(true);
  }

  useEffect(() => {
    const result = customertypedata.filter((item) => {
      return item.customertype.toLowerCase().match(search.toLowerCase());
    });
    setfilterdata(result);
  }, [search]);

  const editcustomertype = async (e) => {
  e.preventDefault();
    try {
      const config = {
        url: `/master/editcustomertype/${data._id}`,
        method: "post",
        baseURL: apiURL,
        headers: { "content-type": "application/json" },
        data: {
          customertype: type,
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


  return (
    <div>
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
                      Customer Type <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setcustomertype(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-4"></div>

                  <div className="col-md-4"></div>
                </div>

                <div className="row pt-3">
                  <div className="col-md-2">
                    <button className="vhs-button" onClick={addcustomertype}>
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
          <Modal.Title> Customer Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card" style={{ marginTop: "30px" }}>
            <div className="card-body p-3">
              <form>
                <div className="row">
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Customer Type <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        
                        placeholder={data.customertype}
                        onChange={(e)=>settype(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-4"></div>

                  <div className="col-md-4"></div>
                </div>

                <div className="row pt-3">
                  <div className="col-md-2">
                    <button className="vhs-button" onClick={editcustomertype}>Save</button>
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

export default Customertype;
