import React, { useState,useEffect } from "react";
import Header from "../layout/Header";
import Nav from "../Nav1";
import Modal from "react-bootstrap/Modal";
import DataTable from "react-data-table-component";
import axios from "axios";

function Reference() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const [referencetype, setreferencetype] = useState("");
  const [referecetypedata, setreferecetypedata] = useState([]);
  const [search, setsearch] = useState("");
  const [filterdata, setfilterdata] = useState([]);
  const apiURL = process.env.REACT_APP_API_URL;

  const addreference = async (e) => {
    e.preventDefault();

    try {
      const config = {
        url: "/master/addreferencetype",
        method: "post",
        baseURL: apiURL,
        headers: { "content-type": "application/json" },
        data: {
          referencetype: referencetype,
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
    getreferencetype();
  }, []);

  const getreferencetype = async () => {
    let res = await axios.get(
      apiURL+"/master/getreferencetype"
    );
    if ((res.status = 200)) {
      setreferecetypedata(res.data?.masterreference);
      setfilterdata(res.data?.masterreference);
    }
  };

  const deletereferencetype = async (id) => {
    axios({
      method: "post",
      url: apiURL + "/master/deletereferencetype/" + id,
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

  const columns = [
    {
      name: "Sl No",
      selector: (row,index) => index+1,
    },
    {
      name: "Customer Type",
      selector: (row) => row.referencetype,
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <a className="hyperlink" onClick={() => handleShow(row)}>
            Edit  |
          </a>
          <a onClick={() => deletereferencetype(row._id)} className="hyperlink mx-1">
            Delete
          </a>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const result = referecetypedata.filter((item) => {
      return item.referencetype.toLowerCase().match(search.toLowerCase());
    });
    setfilterdata(result);
  }, [search]);

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
                      Reference Type <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e)=>setreferencetype(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-4"></div>

                  <div className="col-md-4"></div>
                </div>

                <div className="row pt-3">
                  <div className="col-md-2">
                    <button className="vhs-button" onClick={addreference}>Save</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="mt-5 border">
            <DataTable
              columns={columns}
              data={filterdata}
              pagination
              fixedHeader
              fixedHeaderScrollHeight="450px"
            
              selectableRowsHighlight
              subHeader
              subHeaderComponent={
                <input
                  type="text"
                  placeholder="Search here.."
                  className="w-25 form-control"
                  value={search}
                  onChange={(e) => setsearch(e.target.value)}
                />
              }
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
          <Modal.Title>Reference</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card" style={{ marginTop: "30px" }}>
            <div className="card-body p-3">
              <form>
                <div className="row">
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Reference Type <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                      />
                    </div>
                  </div>

                  <div className="col-md-4"></div>

                  <div className="col-md-4"></div>
                </div>

                <div className="row pt-3">
                  <div className="col-md-2">
                    <button className="vhs-button">Save</button>
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

export default Reference;
