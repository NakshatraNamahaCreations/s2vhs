import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../layout/Header";
import Nav1 from "../Nav1";
import Quotationnav from "../Quotationnav";
import DataTable from "react-data-table-component";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";

function Quotationformat1() {
  const cat=sessionStorage.getItem("category");
  const [user, setUser] = useState(false);
  const [data, setdata] = useState([]);
  const [category, setcategory] = useState("");
  const [region, setregion] = useState("");
  const [qfdata, setqfdata] = useState([]);
  const [search, setsearch] = useState("");
  const [filterdata, setfilterdata] = useState([]);
  const [data1, setdata1] = useState([]);

  const [region1, setregion1] = useState(data1.region);
  const [category1, setcategory1] = useState(data1.category);
  const apiURL = process.env.REACT_APP_API_URL;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getcategory();
    getqf();
  }, []);

  const getcategory = async () => {
    let res = await axios.get(apiURL + "/getcategory");
    if ((res.status = 200)) {
      setdata(res.data?.category);
      console.log(res.data?.category);
    }
  };
  const postqf = async (e) => {
    e.preventDefault();

    try {
      const config = {
        url: "/master/addqf",
        method: "post",
        baseURL: apiURL,
        headers: { "content-type": "application/json" },
        data: {
          category: category,
          region: region,
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
      alert("category Name Not Added");
    }
  };
  const getqf = async () => {
    let res = await axios.get(apiURL + "/master/getqf");
    if ((res.status = 200)) {
      console.log(res);
      setqfdata(res.data?.quotationformat);
      setfilterdata(res.data?.quotationformat);
    }
  };
  let i = 0;
  const deleteqf = async (id) => {
    axios({
      method: "post",
      url: apiURL + "/master/deleteqf/" + id,
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
  const columns = [
    {
      name: "Sl No",
      selector: (row, index) => index + 1,
    },
    {
      name: "Category",
      selector: (row) => row.category,
    },
    {
      name: "Region",
      selector: (row) => row.region,
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <a className="hyperlink" onClick={() => edit(row)}>
            Edit |
          </a>
          <a onClick={() => deleteqf(row._id)} className="hyperlink mx-1">
            Delete
          </a>
        </div>
      ),
    },
  ];
  const edit = (data1) => {
    setdata1(data1);
    handleShow(true);
  };
  const editqf = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: `/master/editqf/${data._id}`,
        method: "post",
        baseURL: apiURL,
        headers: { "content-type": "application/json" },
        data: {
          category: category1,
          region: region1,
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
    const result = qfdata.filter((item) => {
      return item.category.toLowerCase().match(search.toLowerCase());
    });
    setfilterdata(result);
  }, [search]);
  return (
    <div className="web">
      <Header />
      <Nav1 />
      <div className="row m-auto">
        <div className="col-md-12">
       
    
          <div className="card" style={{ marginTop: "50px" }}>
            <div className="card-body p-3">
              <p><b>Category:</b>{cat}</p>
              <div>
                {" "}
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                  <Row>
                    <Col sm={12}>
                      <Nav variant="pills" className="flex flex-row">
                        <Nav.Item>
                          <Nav.Link eventKey="" href="/termsgroup">
                            Format
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="second" href="/region">
                            Content
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </Col>
                  </Row>
                </Tab.Container>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quotationformat1;
