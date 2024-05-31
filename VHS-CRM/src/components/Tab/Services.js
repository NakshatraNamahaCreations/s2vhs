import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import Nav from "../Nav1";
import Header from "../layout/Header";
import DataTable from "react-data-table-component";
import Modal from "react-bootstrap/Modal";

function Services() {
  const admin = JSON.parse(sessionStorage.getItem("admin"));

  const [categoryData, setCategoryData] = useState([]);
  const [category, setcategory] = useState("");
  const [serivceName, setSeviceName] = useState("");
  const [serivceId, setSeviceId] = useState("");

  const [videolink, setvideolink] = useState("");
  const [search, setsearch] = useState("");
  const [filterdata, setfilterdata] = useState([]);
  const [data, setdata] = useState([]);

  const [category1, setcategory1] = useState(data.category);
  const [serivceName1, setSeviceName1] = useState(data.serviceName);
  const [videolink1, setvideolink1] = useState(data.videolink);
  const [subcategorydata, setsubcategorydata] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const formdata = new FormData();
  const apiURL = process.env.REACT_APP_API_URL;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    getcategory();
    getService();
  }, []);

  const getcategory = async () => {
    let res = await axios.get(apiURL + "/getcategory");
    if ((res.status = 200)) {
      setCategoryData(res.data?.category);
    }
  };

  const getServiceByCategory = async () => {
    try {
      let res = await axios.post(apiURL + `/userapp/getservicebycategory/`, {
        category,
      });
      if (res.status === 200) {
        setServiceData(res.data?.serviceData);
      } else {
        setServiceData([]);
      }
    } catch (error) {
      console.log("err", error);
    }
  };
  useEffect(() => {
    getServiceByCategory();
  }, [category]);

  console.log("service id", serivceId);

  const addSerive = async (e) => {
    e.preventDefault();

    try {
      const config = {
        url: `/userapp/addlink/${serivceId}`,
        method: "put",
        baseURL: apiURL,
        headers: { "content-type": "application/json" },
        data: {
          category: category,
          serviceName: serivceName,
          videoLink: videolink,
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          console.log("success");
          alert("Service added successfuly");
          window.location.reload();
        }
      });
    } catch (error) {
      console.error(error);
      alert(error.response.data.error);
    }
  };
  const getService = async () => {
    let res = await axios.get(apiURL + "/userapp/getservices");
    if (res.status === 200) {
      console.log(res);
      const getVideoLinkData = res.data.service.filter((e) => e.videoLink);

      setsubcategorydata(getVideoLinkData);
      setfilterdata(getVideoLinkData);
    }
  };

  const editservices = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: `/editsubcategory/${data._id}`,
        method: "post",
        baseURL: apiURL,
        headers: { "content-type": "application/json" },
        data: {
          category: category1,
          serviceName: serivceName1,
          videolink: videolink1,
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
      name: "Customer ",
      selector: (row) => row.category,
    },
    {
      name: "Service Name",
      selector: (row) => row.serviceName,
    },
    {
      name: "video Link",
      selector: (row) => (
        <a href={row.videoLink} target="_blank" alt="">
          {row.videoLink}
        </a>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <a className="hyperlink" onClick={() => edit(row)}>
            Edit |
          </a>
          <a onClick={() => deleteservices(row._id)} className="hyperlink mx-1">
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
    const result = subcategorydata.filter((item) => {
      return item.category.toLowerCase().match(search.toLowerCase());
    });
    setfilterdata(result);
  }, [search]);
  let i = 0;

  const deleteservices = async (id) => {
    axios({
      method: "post",
      url: apiURL + "/deletesubcategory/" + id,
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
      <Nav />

      <div className="row m-auto">
        <div className="col-md-12">
          <div className="card" style={{ marginTop: "30px" }}>
            <div className="card-body p-3">
              {/* <div className="vhs-sub-heading pb-2">Add New Record</div> */}
              <form>
                <div className="row">
                  <div className="col-md-4">
                    <div className="vhs-input-label">
                      Category <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <select
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setcategory(e.target.value)}
                      >
                        <option>---SELECT---</option>
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
                      Service Type <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <select
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => {
                          const selectedService = serviceData.find(
                            (item) => item._id === e.target.value
                          );
                          setSeviceId(e.target.value);
                          setSeviceName(
                            selectedService ? selectedService.serviceName : ""
                          );
                        }}
                        // onChange={(e) => setSeviceName(e.target.value)}
                      >
                        <option>---SELECT---</option>
                        {serviceData.map((item) => (
                          <option key={item.id} value={item._id}>
                            {item.Subcategory} - {item.serviceName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="vhs-input-label">Video Link</div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setvideolink(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="row pt-3 justify-content-center">
                  <div className="col-md-2">
                    <button className="vhs-button" onClick={addSerive}>
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
          <Modal.Title>Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card-body p-3">
            <form>
              <div className="col-md-4">
                <div className="vhs-input-label">
                  Category <span className="text-danger"> *</span>
                </div>
                <div className="group pt-1">
                  <div className="group pt-1">
                    <select
                      className="col-md-12 vhs-input-value"
                      onChange={(e) => setcategory1(e.target.value)}
                    >
                      <option value={data.category}>{data.category}</option>
                      {categoryData.map((item) => (
                        <option value={item.category}>{item.category}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="vhs-input-label">
                  Service name <span className="text-danger"> *</span>
                </div>
                <div className="group pt-1">
                  <input
                    type="text"
                    className="col-md-12 vhs-input-value"
                    onChange={(e) => setSeviceName1(e.target.value)}
                    placeholder={data.subcategory}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="vhs-input-label">
                  Category <span className="text-danger"> *</span>
                </div>
                <div className="group pt-1">
                  <input
                    type="text"
                    className="col-md-12 vhs-input-value"
                    onChange={(e) => setvideolink1(e.target.value)}
                    placeholder={data.videolink}
                  />
                </div>
              </div>

              <div className="row pt-3">
                <div className="col-md-2">
                  <button className="vhs-button" onClick={editservices}>
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Services;
