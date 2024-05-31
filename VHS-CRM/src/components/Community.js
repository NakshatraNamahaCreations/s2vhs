import React, { useState, useEffect } from "react";
import Header from "./layout/Header";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

const active = {
  backgroundColor: "rgb(169, 4, 46)",
  color: "#fff",
  fontWeight: "bold",
  border: "none",
};
const inactive = { color: "black", backgroundColor: "white" };

function Community() {
  const [selected, setSelected] = useState(0);
  const handleClick = (divNum) => () => {
    setSelected(divNum);
  };

  const [appartmentname, setappartmentname] = useState("");
  const [communityn, setcommunity] = useState("");
  const [percentage, setpercentage] = useState("");
  const [projectmanager, setmanager] = useState("");
  const [contactperson, setcontactperson] = useState("");
  const [contactno, setcontactno] = useState("");
  const [email, setemailid] = useState("");
  const [login, setlogin] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const apiURL = process.env.REACT_APP_API_URL;
  const [communitydata, setcommunitydata] = useState([]);
  const [search, setsearch] = useState("");
  const [filterdata, setfilterdata] = useState([]);
  const [data, setdata] = useState([]);
  const [communityData, setCommunityData] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [editCommunity, setEditCommunity] = useState(null);

  const [editAppartmentname, setEditAppartmentname] = useState("");
  const [editOneCommunity, setEditOneCommunity] = useState("");
  const [editPercentage, setEditPercentage] = useState("");
  const [editManager, setEditManager] = useState("");
  const [editContactperson, setEditContactperson] = useState("");
  const [editContactno, setEditContactno] = useState("");
  const [editEmailid, setEditEmailid] = useState("");
  const [editLogin, setEditLogin] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editCPassword, setEditCPassword] = useState("");
  const addcommunity = async (e) => {
    e.preventDefault();

    try {
      const config = {
        url: "/addcommunity",
        method: "post",
        baseURL: apiURL,
        // data: formdata,
        headers: { "content-type": "application/json" },
        data: {
          appartmentname: appartmentname,
          communityn: communityn,
          percentage: percentage,
          projectmanager: projectmanager,
          contactperson: contactperson,
          contactno: contactno,
          email: email,
          login: login,
          password: password,
          cpassword: cpassword,
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          console.log("success");
          alert(" Added");
          window.location.assign("/community");
        }
      });
    } catch (error) {
      console.error(error);
      alert(" Not Added");
    }
  };
  useEffect(() => {
    getcommunity();
  }, []);

  const getcommunity = async () => {
    let res = await axios.get(apiURL + "/getcommunity");
    if (res.status === 200) {
      // console.log("communityData", res);
      setcommunitydata(res.data?.community);
    }
  };

  const getComnnuityById = async () => {
    try {
      let res = await axios.get(apiURL + "/getcommunitydata");
      if (res.status === 200) {
        // console.log("communityDetails", res);
        setCommunityData(res.data?.communityDetails);
        setfilterdata(res.data?.communityDetails);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComnnuityById();
  }, []);


  const deletecommunity = async (id) => {
    axios({
      method: "post",
      url: apiURL + "/deletetercommunity/" + id,
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
      name: "Sl  No",
      selector: (row, index) => index + 1,
    },
    {
      name: "Appartment Name",
      selector: (row) => row.appartmentname,
    },
    {
      name: "Community",
      selector: (row) => row.communityn,
    },
    {
      name: "Percentage",
      selector: (row) => row.percentage,
    },
    {
      name: "projectmanager",
      selector: (row) => row.projectmanager,
    },
    {
      name: "contactperson",
      selector: (row) => row.contactperson,
    },
    {
      name: "contactno",
      selector: (row) => row.contactno,
    },
    {
      name: "email",
      selector: (row) => row.email,
    },
    {
      name: "login",
      selector: (row) => row.login,
    },
    {
      name: "password",
      selector: (row) => row.password,
    },
    {
      name: "cpassword",
      selector: (row) => row.cpassword,
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <Link
            className="hyperlink"
            to="/communitypayments"
            state={{ data: row }}
          >
            Payments |
          </Link>{" "}
          <div style={{ cursor: "pointer" }} onClick={() => handleEdit(row)}>
            Edit |
          </div>
          <Link
            className="hyperlink"
            to="/onecommnityreport"
            state={{ data: row }}
          >
            Reports |
          </Link>
          <div
            onClick={() => deletecommunity(row._id)}
            className="hyperlink mx-1"
            style={{ cursor: "pointer" }}
          >
            Delete
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const result = communitydata.filter((item) => {
      return item.appartmentname.toLowerCase().match(search.toLowerCase());
    });
    setfilterdata(result);
  }, [search]);

  const handleEdit = (data) => {
    setEditCommunity(data);
    setShowEdit(true);
  };

  const updateCommunity = async () => {
    try {
      const communityId = editCommunity._id;
      const updatedData = {
        appartmentname: editAppartmentname || editCommunity.appartmentname,
        communityn: editOneCommunity || editCommunity.communityn,
        percentage: editPercentage || editCommunity.percentage,
        projectmanager: editManager || editCommunity.projectmanager,
        contactperson: editContactperson || editCommunity.contactperson,
        contactno: editContactno || editCommunity.contactno,
        email: editEmailid || editCommunity.email,
        login: editLogin || editCommunity.login,
        password: editPassword || editCommunity.password,
        cpassword: editCPassword || editCommunity.cpassword,
        // customerId: data[0]?.customerData[0]._id,
      };
      const config = {
        url: `/editcommunity/${communityId}`,
        method: "POST",
        baseURL: apiURL,
        headers: { "content-type": "application/json" },
        data: updatedData,
      };

      const response = await axios(config);

      if (response.status === 200) {
        alert("Updated Successfully");
        window.location.reload("");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };

  return (
    <div className="web">
      <Header />

      {/* <div className="row m-auto mt-2">
        <div className="col-md-12">
          <div className="card sticky">
            <div className="card-body">
              <div>1 Community > View</div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="row m-auto">
        <div className="col-md-12">
          <div className="d-flex float-end pt-3">
            <button
              className="btn-primary-button mx-2"
              style={selected == 1 ? active : inactive}
              onClick={handleClick(1)}
            >
              1 Community Add
            </button>

            <button
              style={selected == 0 ? active : inactive}
              onClick={handleClick(0)}
              className="btn-secondary-button"
            >
              1 Community View
            </button>
          </div>

          {showEdit ? (
            <div className="card" style={{ marginTop: "62px" }}>
              <div className="card-body p-4">
                <form>
                  <div className="row">
                    <div
                      className="d-flex"
                      style={{ justifyContent: "space-between" }}
                    >
                      <h5>Edit Community</h5>
                      <h5>
                        <i
                          class="fa-regular fa-circle-xmark"
                          title="Close"
                          style={{ cursor: "pointer" }}
                          onClick={() => setShowEdit(!showEdit)}
                        ></i>
                      </h5>
                    </div>
                    <div className="vhs-sub-heading mt-2">Company Details</div>
                    <div className="col-md-4 pt-2">
                      <div className="vhs-input-label">Appartment Name</div>
                      <div className="group pt-1">
                        <input
                          type="text"
                          className="col-md-12 vhs-input-value"
                          defaultValue={editCommunity?.appartmentname}
                          onChange={(e) =>
                            setEditAppartmentname(e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-4 pt-2">
                      <div className="vhs-input-label">1 Community</div>
                      <div className="group pt-1">
                        <input
                          type="text"
                          className="col-md-12 vhs-input-value"
                          defaultValue={editCommunity?.communityn}
                          onChange={(e) => setEditOneCommunity(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-4 pt-2">
                      <div className="vhs-input-label">Percentage</div>
                      <div className="group pt-1">
                        <input
                          type="text"
                          className="col-md-12 vhs-input-value"
                          defaultValue={editCommunity?.percentage}
                          onChange={(e) => setEditPercentage(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-md-4 pt-2">
                      <div className="vhs-input-label"> Project Manager</div>
                      <div className="group pt-1">
                        <select
                          className="col-md-12 vhs-input-value"
                          defaultValue={editCommunity?.projectmanager}
                          onChange={(e) => setEditManager(e.target.value)}
                        >
                          <option>--select--</option>
                          <option>Abhay</option>
                          <option>Anil</option>
                          <option>Farooq</option>
                          <option>Baskar Vhs Bangalore</option>
                          <option>Mr.ravish</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="row pt-2">
                    <div className="vhs-sub-heading">Contact Details</div>
                    <div className="col-md-4 pt-3">
                      <div className="vhs-input-label">Contact Person</div>
                      <div className="group pt-1">
                        <input
                          type="text"
                          className="col-md-12 vhs-input-value"
                          defaultValue={editCommunity?.contactperson}
                          onChange={(e) => setEditContactperson(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-4 pt-3">
                      <div className="vhs-input-label">Contact No</div>
                      <div className="group pt-1">
                        <input
                          type="text"
                          className="col-md-12 vhs-input-value"
                          defaultValue={editCommunity?.contactno}
                          onChange={(e) => setEditContactno(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-4 pt-3">
                      <div className="vhs-input-label">Email ID</div>
                      <div className="group pt-1">
                        <input
                          type="text"
                          className="col-md-12 vhs-input-value"
                          defaultValue={editCommunity?.email}
                          onChange={(e) => setEditEmailid(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row pt-2">
                    <div className="vhs-sub-heading">Login Details</div>
                    <div className="col-md-4 pt-3">
                      <div className="vhs-input-label">
                        Login<span className="text-danger"> *</span>
                      </div>
                      <div className="group pt-1">
                        <input
                          type="text"
                          className="col-md-12 vhs-input-value"
                          defaultValue={editCommunity?.login}
                          onChange={(e) => setEditLogin(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-4 pt-3">
                      <div className="vhs-input-label">
                        Password
                        <span className="text-danger"> *</span>
                      </div>
                      <div className="group pt-1">
                        <input
                          type="text"
                          className="col-md-12 vhs-input-value"
                          defaultValue={editCommunity?.password}
                          onChange={(e) => setEditPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-4 pt-3">
                      <div className="vhs-input-label">
                        Confirm Password
                        <span className="text-danger">*</span>
                      </div>
                      <div className="group pt-1">
                        <input
                          type="text"
                          className="col-md-12 vhs-input-value"
                          defaultValue={editCommunity?.cpassword}
                          onChange={(e) => setEditCPassword(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row pt-3 justify-content-center">
                    <div className="col-md-2">
                      <button className="vhs-button" onClick={updateCommunity}>
                        Update
                      </button>
                    </div>
                    <div className="col-md-2">
                      <button className="vhs-button mx-3">Cancel</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            ""
          )}

          {selected == 0 ? (
            <>
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
            </>
          ) : (
            <>
              {" "}
              <div className="card" style={{ marginTop: "62px" }}>
                <div className="card-body p-4">
                  <form>
                    <div className="row">
                      <h5>Add</h5>
                      <div className="vhs-sub-heading">Company Details</div>
                      <div className="col-md-4 pt-2">
                        <div className="vhs-input-label">Appartment Name</div>
                        <div className="group pt-1">
                          <input
                            type="text"
                            className="col-md-12 vhs-input-value"
                            onChange={(e) => setappartmentname(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-4 pt-2">
                        <div className="vhs-input-label">1 Community</div>
                        <div className="group pt-1">
                          <input
                            type="text"
                            className="col-md-12 vhs-input-value"
                            onChange={(e) => setcommunity(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-4 pt-2">
                        <div className="vhs-input-label">Percentage</div>
                        <div className="group pt-1">
                          <input
                            type="text"
                            className="col-md-12 vhs-input-value"
                            onChange={(e) => setpercentage(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-md-4 pt-2">
                        <div className="vhs-input-label"> Project Manager</div>
                        <div className="group pt-1">
                          <select
                            className="col-md-12 vhs-input-value"
                            onChange={(e) => setmanager(e.target.value)}
                          >
                            <option>--select--</option>
                            <option>Abhay</option>
                            <option>Anil</option>
                            <option>Farooq</option>
                            <option>Baskar Vhs Bangalore</option>
                            <option>Mr.ravish</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row pt-2">
                      <div className="vhs-sub-heading">Contact Details</div>
                      <div className="col-md-4 pt-3">
                        <div className="vhs-input-label">Contact Person</div>
                        <div className="group pt-1">
                          <input
                            type="text"
                            className="col-md-12 vhs-input-value"
                            onChange={(e) => setcontactperson(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-4 pt-3">
                        <div className="vhs-input-label">Contact No</div>
                        <div className="group pt-1">
                          <input
                            type="text"
                            className="col-md-12 vhs-input-value"
                            onChange={(e) => setcontactno(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-4 pt-3">
                        <div className="vhs-input-label">Email ID</div>
                        <div className="group pt-1">
                          <input
                            type="text"
                            className="col-md-12 vhs-input-value"
                            onChange={(e) => setemailid(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row pt-2">
                      <div className="vhs-sub-heading">Login Details</div>
                      <div className="col-md-4 pt-3">
                        <div className="vhs-input-label">
                          Login<span className="text-danger"> *</span>
                        </div>
                        <div className="group pt-1">
                          <input
                            type="text"
                            className="col-md-12 vhs-input-value"
                            onChange={(e) => setlogin(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-4 pt-3">
                        <div className="vhs-input-label">
                          Password
                          <span className="text-danger"> *</span>
                        </div>
                        <div className="group pt-1">
                          <input
                            type="text"
                            className="col-md-12 vhs-input-value"
                            onChange={(e) => setpassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-4 pt-3">
                        <div className="vhs-input-label">
                          Confirm Password
                          <span className="text-danger">*</span>
                        </div>
                        <div className="group pt-1">
                          <input
                            type="text"
                            className="col-md-12 vhs-input-value"
                            onChange={(e) => setcpassword(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row pt-3 justify-content-center">
                      <div className="col-md-2">
                        <button className="vhs-button" onClick={addcommunity}>
                          Save
                        </button>
                      </div>
                      <div className="col-md-2">
                        <button className="vhs-button mx-3">Cancel</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Community;