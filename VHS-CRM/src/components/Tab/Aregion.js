import React, { useState,useEffect } from "react";
import Header from "../layout/Header";
import Nav from "../Nav1";
import Quotationnav from "../Quotationnav";
import Modal from "react-bootstrap/Modal";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

function Aregion() {
  const [aregion, setaregion] = useState("");
  const [aregiondata, setaregiondata] = useState([]);
  const apiURL = process.env.REACT_APP_API_URL;
  const [search, setsearch] = useState("");
  const [filterdata, setfilterdata] = useState([]);
  // const [data, setdata] = useState([]);
  // const [aregion1, setaregion1] = useState(data.aregion);
  const formdata = new FormData();
  const location = useLocation();
  const { data } = location.state;
  const { data1 } = location.state;
  const { data2 } = location.state;
  const { data3 } = location.state;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const addregion = async (e) => {
  //   e.preventDefault();
   
  //   try {
  //     const config = {
  //       url: "/master/addaregion",
  //       method: "post",
  //       baseURL: apiURL,
  //       data: {
  //         aregion:aregion
  //       },
  //     };
  //     await axios(config).then(function (response) {
  //       if (response.status === 200) {
  //         alert("Successfully Added");
  //         window.location.assign("/aregion");
  //       }
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     alert("category  Not Added");
  //   }
  // };

  // useEffect(() => {
  //   getaregion();
  // }, []);

  // const getaregion = async () => {
  //   let res = await axios.get(apiURL+"/master/getaregion");
  //   if ((res.status = 200)) {
  //     setaregiondata(res.data?.aregion);
  //     setfilterdata(res.data?.aregion);
  //   }
  // };

  // const editaregion = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const config = {
  //       url: `/master/editaregion/${data._id}`,
  //       method: "post",
  //       baseURL: apiURL,
  //       headers: { "content-type": "application/json" },
  //       data: {
  //         aregion: aregion1,
  //       },
  //     };
  //     await axios(config).then(function (response) {
  //       if (response.status === 200) {
  //         alert("Successfully Added");
  //         window.location.reload("");
  //       }
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     alert("category  Not Added");
  //   }
  // };
  // const columns = [
  //   {
  //     name: "Sl  No",
  //     selector: (row,index) => index+1,
  //   },
  //   {
  //     name: "A Region",
  //     selector: (row) => row.aregion,
  //   },
  //   {
  //     name: "Action",
  //     cell: (row) => (
  //       <div>
  //         <a className="hyperlink" onClick={() => edit(row)}>
  //           Edit |
  //         </a>
  //         <a onClick={() => deletearegion(row._id)} className="hyperlink mx-1">
  //           Delete
  //         </a>
  //       </div>
  //     ),
  //   },
  // ];

  // const edit = (data) => {
  //   setdata(data);
  //   handleShow(true);
  // };
  // useEffect(() => {
  //   const result = aregiondata.filter((item) => {
  //     return item.aregion.toLowerCase().match(search.toLowerCase());
  //   });
  //   setfilterdata(result);
  // }, [search]);

  // const deletearegion = async (id) => {
  //   axios({
  //     method: "post",
  //     url: apiURL+"/master/deletearegion/" + id,
  //   })
  //     .then(function (response) {
  //       //handle success
  //       console.log(response);
  //       alert("Deleted successfully");
  //       window.location.reload();
  //     })
  //     .catch(function (error) {
  //       //handle error
  //       console.log(error.response.data);
  //     });
  // };
 
  let i = 0;
  return (
    <div>
      <Header />
      <Nav />

      <div className="row m-auto">
        <div className="col-md-12">
          <div className="card" style={{ marginTop: "30px" }}>
            <div className="card-body p-3">
              <Quotationnav />
              <form>
                <div className="row">
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Category  :<h6>{data}</h6>
                    </div>
                    <div className="group pt-1">
                      {/* <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e)=>setmaterial(e.target.value)}
                      /> */}
                      
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      subcategory :  <h6>{data1}</h6>
                    </div>
                    <div className="group pt-1">
                      {/* <textarea
                        rows={5}
                        cols={10}
                        className="col-md-12 vhs-input-value"
                        onChange={(e)=>setbenefits(e.target.value)}
                      /> */}
                     
                    </div>
                  </div>

                  <div className="col-md-4"></div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      material  :<h6>{data2}</h6>
                    </div>
                    <div className="group pt-1">
                      {/* <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e)=>setmaterial(e.target.value)}
                      /> */}
                      
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      benefits :  <h6>{data3}</h6>
                    </div>
                    <div className="group pt-1">
                      {/* <textarea
                        rows={5}
                        cols={10}
                        className="col-md-12 vhs-input-value"
                        onChange={(e)=>setbenefits(e.target.value)}
                      /> */}
                     
                    </div>
                  </div>

                  <div className="col-md-4"></div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      A Region <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e)=>setaregion(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-4"></div>

                  <div className="col-md-4"></div>
                </div>

                <div className="row pt-3">
                  <div className="col-md-2">
                    <Link to="/ajob" state={{data:data,data1:data1,data2:data2,data3:data3,data4:aregion}}>
                    <button className="vhs-button" >Next</button>

                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* <div className="mt-5">
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
          </div> */}
        </div>
      </div>
      {/* <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>A-Region</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card" style={{ marginTop: "30px" }}>
            <div className="card-body p-3">
              <form>
                <div className="row">
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      A Region <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e)=>setaregion1(e.target.value)}
                        placeholder={data.aregion}
                      />
                    </div>
                  </div>

                  <div className="col-md-4"></div>

                  <div className="col-md-4"></div>
                </div>

                <div className="row pt-3">
                  <div className="col-md-2">
                    <button className="vhs-button" onClick={editaregion}>Save</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal> */}
    </div>
  );
}

export default Aregion;
