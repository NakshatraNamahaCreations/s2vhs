import React, { useState,useEffect } from "react";
import Header from "../layout/Header";
import Nav from "../Nav1";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Table from "react-bootstrap/Table";
import DataTable from "react-data-table-component";


function Expensetype() {

  const [show, setShow] = useState(false);
  const [expensetype, setexpensetype] = useState("");
  const [expensetypedata, setexpensetypedata] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [search, setsearch] = useState("");
  const [filterdata, setfilterdata] = useState([]);
  const [data, setdata] = useState([]);

const [expensetype1, setexpensetype1] = useState(data.expensetype);

  const apiURL = process.env.REACT_APP_API_URL;

  const addexpensetype = async (e) => {
    e.preventDefault();
   
    try {
      const config = {
        url: "/master/addexpensetype",
        method: "post",
        baseURL: apiURL,
        headers:{"content-type":"application/json"},
        data: {
          expensetype:expensetype
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          alert("Successfully Added");
          window.location.assign("/expensetype");
        }
      });
    } catch (error) {
      console.error(error);
      alert("category  Not Added");
    }
  };

  useEffect(() => {
    getexpensetype();
  }, []);

  const getexpensetype = async () => {
    let res = await axios.get(apiURL+"/master/getexpensetype");
    if ((res.status = 200)) {
      setexpensetypedata(res.data?.masterexpensetype);
      setfilterdata(res.data?.masterexpensetype);
    }
  };

  const editexpensetype = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: `/master/editexpensetype/${data._id}`,
        method: "post",
        baseURL: apiURL,
        headers: { "content-type": "application/json" },
        data: {
          expensetype: expensetype1,
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
      name: "Expense Type",
      selector: (row) => row.expensetype,
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <a className="hyperlink" onClick={() => edit(row)}>
            Edit |
          </a>
          <a onClick={() => deleteexpensetype(row._id)} className="hyperlink mx-1">
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
    const result = expensetypedata.filter((item) => {
      return item.expensetype.toLowerCase().match(search.toLowerCase());
    });
    setfilterdata(result);
  }, [search]);
  const deleteexpensetype = async (id) => {
    axios({
      method: "post",
      url: apiURL + "/master/deleteexpensetype/" + id,
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
                      Expense Type <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e)=>setexpensetype(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-4"></div>

                  <div className="col-md-4"></div>
                </div>

                <div className="row pt-3">
                  <div className="col-md-2">
                    <button className="vhs-button" onClick={addexpensetype}>Save</button>
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
          <Modal.Title> Expense Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card" style={{ marginTop: "30px" }}>
            <div className="card-body p-3">
              <form>
                <div className="row">
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Expense Type <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e)=>setexpensetype1(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-4"></div>

                  <div className="col-md-4"></div>
                </div>

                <div className="row pt-3">
                  <div className="col-md-2">
                    <button className="vhs-button" onClick={editexpensetype}>Save</button>
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

export default Expensetype;
