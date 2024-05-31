import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import Enquirynav from "../Enquirynav";
import axios from "axios";
// import Table from "react-bootstrap/Table";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import moment from "moment";

function Enquirysearch() {
  const admin = JSON.parse(sessionStorage.getItem("admin"));
  const navigate = useNavigate();

  const [name, setname] = useState("");

  const [todate, settodate] = useState("");
  const [city, setcity] = useState("");
  const [contact, setcontact] = useState("");
  const [status, setstatus] = useState("");
  const [executive, setexecutive] = useState("");

  const apiURL = process.env.REACT_APP_API_URL;
  const [fromdate, setfromdate] = useState(moment().format("DD-MM-YYYY"));
  const [userdata, setuserdata] = useState([]);
  const [searchItems, setsearchItems] = useState();
  const handleDateChange = (e) => {
    // Update the state with the raw date value
    setfromdate(e.target.value);
  };

  useEffect(() => {
    getuser();
  }, []);

  const getuser = async () => {
    let res = await axios.get(apiURL + "/master/getuser");
    if ((res.status = 200)) {
      setuserdata(res.data?.masteruser);
    }
  };

  const [totalRecords, setTotalRecords] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterdata, setfilterdata] = useState([]);

  const filterData = async () => {
    try {
      const res = await axios.post(`${apiURL}/searchenquiry`, {
        name,
        fromdate,
        todate,
        contact,
        city,
        status,
        executive,
        page: currentPage,
      });

      if (res.status === 200) {
        setfilterdata(res.data?.enquiryadd);
      } else {
        // Set filterdata to an empty array in case of an error
        setfilterdata([]);
      }
    } catch (error) {
      console.log("err", error);
      // Set filterdata to an empty array in case of an error
      setfilterdata([]);
    }
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    filterData();
  };

  const columns = [
    {
      name: "Sl  No",
      cell: (row, i) => <div>{i + 1}</div>,
    },
    {
      name: "Date",
      selector: (row) => row.date,
    },
    {
      name: "Time",
      selector: (row) => row.Time,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Contact",
      selector: (row) => row.mobile,
    },
    {
      name: "Address",
      selector: (row) => row.address,
    },
    {
      name: "Reference1",
      selector: (row) => row.reference1,
    },
    {
      name: "Reference2",
      selector: (row) => row.reference2,
    },
    {
      name: "Reference3",
      selector: (row) => row.reference3,
    },
    {
      name: "City",
      selector: (row) => row.city,
    },
    {
      name: "Interested for",
      selector: (row) => row.intrestedfor,
    },
    {
      name: "Executive",
      selector: (row) => row.executive,
    },
  ];

  const handleRowClick = (row) => {
    // navigate(`/enquirydetail/${row.EnquiryId}`);
    const queryString = new URLSearchParams({
      enquiryData: JSON.stringify(row),
    }).toString();
    const newTab = window.open(
      `/enquirydetail/${row.EnquiryId}?${queryString}`,
      "_blank"
    );
  };

  return (
    <div className="web">
      <Header />
      <Enquirynav />

      <div className="row m-auto">
        <div className="col-md-12">
          <div className="card" style={{ marginTop: "20px" }}>
            <div className="card-body p-4">
              <div className="vhs-sub-heading pb-2">Enquiry Search :</div>
              <form>
                <div className="row">
                  <div className="col-md-4">
                    <div className="vhs-input-label">Name</div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        className="col-md-12 vhs-input-value"
                        value={name}
                        onChange={(e) => {
                          setname(e.target.value);
                          // console.log("name", name);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label">From Date</div>
                    <div className="group pt-1">
                      <input
                        type="date"
                        className="col-md-12 vhs-input-value"
                        value={fromdate}
                        onChange={handleDateChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="vhs-input-label"> To Date</div>
                    <div className="group pt-1">
                      <input
                        type="date"
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => settodate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">
                      Contact
                      <span className="text-danger"> *</span>
                    </div>
                    <div className="group pt-1">
                      <input
                        type="text"
                        value={contact}
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setcontact(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">City</div>
                    <div className="group pt-1">
                      <select
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setcity(e.target.value)}
                      >
                        <option>--select--</option>
                        {admin?.city.map((item) => (
                          <option value={item.name}>{item.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* <div className="col-md-4 pt-3">
                    <div className="vhs-input-label">Status</div>
                    <div className="group pt-1">
                      <select
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setstatus(e.target.value)}
                      >
                        <option>--select--</option>
                        <option>Annapurna</option>
                        <option>Bharath</option>
                        <option>Bhavya</option>
                        <option>Bindu</option>
                        <option>Gururaj</option>
                        <option>Hemanth</option>
                      </select>
                    </div>
                  </div> */}

                  <div className="col-md-4 pt-3">
                    <div className="vhs-input-label"> Executive</div>
                    <div className="group pt-1">
                      <select
                        className="col-md-12 vhs-input-value"
                        onChange={(e) => setexecutive(e.target.value)}
                      >
                        <option>--select--</option>
                        {userdata?.map((i) => (
                          <option value={i.displayname}>{i.displayname}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row pt-3 justify-content-center">
                  <div className="col-md-2">
                    <button className="vhs-button" onClick={handleSearchClick}>
                      Search
                    </button>
                  </div>
                  <div className="col-md-2">
                    <button className="vhs-button mx-3">Cancel</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <DataTable
            columns={columns}
            data={filterdata}
            pagination
            fixedHeader
            paginationTotalRows={totalRecords}
            paginationRowsPerPageOptions={[15, 30, 50]}
            onChangePage={(current) => setCurrentPage(current)}
            paginationPerPage={15}
            selectableRowsHighlight
            subHeaderAlign="left"
            highlightOnHover
            onRowClicked={handleRowClick}
          />
        </div>
      </div>
    </div>
  );
}

export default Enquirysearch;
