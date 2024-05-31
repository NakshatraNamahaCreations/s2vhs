import React, { useState, useEffect, useContext } from "react";
import Header from "../layout/Header";
import Surveynav from "../Surveynav";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { useParams, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import moment from "moment";

function Surveydatatable() {
  const [filteredData, setFilteredData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchCatagory, setSearchCatagory] = useState("");
  const [searchDateTime, setSearchDateTime] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchContact, setSearchContact] = useState("");
  const [searchAddress, setSearchAddress] = useState("");
  const [searchReference, setSearchReference] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [searchInterest, setSearchInterest] = useState("");
  const [searchExecutive, setSearchExecutive] = useState("");
  const [searchAppoDateTime, setSearchAppoDateTime] = useState("");
  const [searchNote, setSearchNote] = useState("");
  const [searchTechnician, setSearchTechnician] = useState("");

  const [reasonforcancel, setreasonforcancel] = useState("");

  const apiURL = process.env.REACT_APP_API_URL;
  const { date, category } = useParams();

  const [show, setShow] = useState(false);

  // const handleShow = () => setShow(true);
  const [showPopup, setShowPopup] = useState({});

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [catagories, setCatagories] = useState(new Set());
  const [reference, setReference] = useState(new Set());
  const [cities, setCities] = useState(new Set());

  useEffect(() => {
    const uniqueCatagories = new Set(
      searchResults.map((item) => item.category).filter(Boolean)
    );
    const uniquereference = new Set(
      searchResults
        .map((item) => item.enquirydata[0]?.reference1)
        .filter(Boolean)
    );
    const uniqueCities = new Set(
      searchResults.map((item) => item.enquirydata[0]?.city).filter(Boolean)
    );
    setCatagories(uniqueCatagories);
    setReference(uniquereference);
    setCities(uniqueCities);
  }, [searchResults]);
  useEffect(() => {
    getenquiry();
  }, []);

  const getenquiry = async () => {
    let res = await axios.get(apiURL + "/getsurveyaggredata");
    if (res.status === 200) {
      const fd = res.data?.enquiryfollowup.filter(
        (i) => i.response === "Survey"
      );
      const filteredData = fd.filter((entry) => entry.cancelStatus === "true");

      setFilteredData(filteredData);
      setSearchResults(filteredData);
    }
  };

  const openPop = (data) => {
    setShowPopup(data);
    setShow(true);
  };
  const handleClose = () => setShow(false);

  const cancelSurvey = async (e) => {
    e.preventDefault();
    const confirm = window.confirm(
      "Are you sure you want to cancel this survey?"
    );
    if (confirm) {
      try {
        // Cancel the survey
        const config = {
          url: `/canclesurvey/${showPopup._id}`,
          method: "post",
          baseURL: apiURL,
          headers: { "content-type": "application/json" },
          data: {
            userid: showPopup._id,
            reasonForCancel: reasonforcancel,
            cancelStatus: true,
          },
        };
        const response = await axios(config);
        if (response.status === 200) {
          alert("Successfully updates");
          window.location.reload("");
        }
      } catch (error) {
        console.error(error);
        alert("Something went wrong");
      }
    }
  };

  useEffect(() => {
    const filterResults = () => {
      let results = filteredData;
      if (searchCatagory) {
        results = results.filter(
          (item) =>
            item.category &&
            item.category.toLowerCase().includes(searchCatagory.toLowerCase())
        );
      }
      if (searchDateTime) {
        results = results.filter(
          (item) =>
            (item.enquirydata[0]?.date &&
              item.enquirydata[0]?.date
                .toLowerCase()
                .includes(searchDateTime.toLowerCase())) ||
            (item.appoTime &&
              item.appoTime
                .toLowerCase()
                .includes(searchDateTime.toLowerCase()))
        );
      }
      if (searchName) {
        results = results.filter(
          (item) =>
            item.enquirydata[0]?.name &&
            item.enquirydata[0]?.name
              .toLowerCase()
              .includes(searchName.toLowerCase())
        );
      }
      if (searchContact) {
        results = results.filter(
          (item) =>
            item.enquirydata[0]?.mobile &&
            item.enquirydata[0]?.mobile
              .toLowerCase()
              .includes(searchContact.toLowerCase())
        );
      }
      if (searchAddress) {
        results = results.filter(
          (item) =>
            item.enquirydata[0]?.address &&
            item.enquirydata[0]?.address
              .toLowerCase()
              .includes(searchAddress.toLowerCase())
        );
      }
      if (searchReference) {
        results = results.filter(
          (item) =>
            item.enquirydata[0]?.reference1 &&
            item.enquirydata[0]?.reference1
              .toLowerCase()
              .includes(searchReference.toLowerCase())
        );
      } //
      if (searchCity) {
        results = results.filter(
          (item) =>
            item.enquirydata[0]?.city &&
            item.enquirydata[0]?.city
              .toLowerCase()
              .includes(searchCity.toLowerCase())
        );
      }
      if (searchInterest) {
        results = results.filter(
          (item) =>
            item.enquirydata[0]?.intrestedfor &&
            item.enquirydata[0]?.intrestedfor
              .toLowerCase()
              .includes(searchInterest.toLowerCase())
        );
      }
      if (searchExecutive) {
        results = results.filter(
          (item) =>
            item.enquirydata[0]?.executive &&
            item.enquirydata[0]?.executive
              .toLowerCase()
              .includes(searchExecutive.toLowerCase())
        );
      }
      if (searchAppoDateTime) {
        results = results.filter(
          (item) =>
            item.appoDate &&
            item.appoDate
              .toLowerCase()
              .includes(searchAppoDateTime.toLowerCase())
        );
      }
      if (searchNote) {
        results = results.filter(
          (item) =>
            item.comment &&
            item.comment.toLowerCase().includes(searchNote.toLowerCase())
        );
      }
      if (searchTechnician) {
        results = results.filter(
          (item) =>
            item.technicianname &&
            item.technicianname
              .toLowerCase()
              .includes(searchTechnician.toLowerCase())
        );
      }
      // results = results.map((item) => ({
      // ...item,
      // category: getUniqueCategories()[item.category],
      // }));
      setSearchResults(results);
    };
    filterResults();
  }, [
    searchCatagory,
    searchName,
    searchDateTime,
    searchContact,
    searchAddress,
    searchReference,
    searchCity,
    searchInterest,
    searchExecutive,
    searchAppoDateTime,
    searchNote,
    searchTechnician,
  ]);

  let i = 1;

  // Pagination logic
  const totalPages = Math.ceil(searchResults.length / itemsPerPage);
  const pageOptions = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  // Get current items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  return (
    <div className="web">
      <Header />
      <Surveynav />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div className="shadow-sm" style={{ border: "1px #cccccc solid" }}>
          <div
            className="ps-1 pe-1"
            style={{ borderBottom: "1px #cccccc solid" }}
          >
            NOT ASSIGNED
          </div>
          <div
            className="ps-1 pe-1"
            style={{
              borderBottom: "1px #cccccc solid",
              backgroundColor: "#ffb9798f",
            }}
          >
            ASSIGNED FOR SURVEY
          </div>
          <div
            className="ps-1 pe-1"
            style={{
              borderBottom: "1px #cccccc solid",
              backgroundColor: "#dde9fd",
            }}
          >
            QUOTE GENERATED
          </div>
          <div className="ps-1 pe-1" style={{ backgroundColor: "#d1e8d1" }}>
            QUOTE SHARED
          </div>
        </div>
      </div>

      <div className="">
        <div className="col-md-12">
          {/* Pagination */}
          <div className="pagination p-2">
            <span>Page </span>
            <select
              className="m-1"
              value={currentPage}
              onChange={(e) => handlePageChange(Number(e.target.value))}
            >
              {pageOptions.map((page) => (
                <option value={page} key={page}>
                  {page}
                </option>
              ))}
            </select>
            <span> of {totalPages}</span>
          </div>
          <table className="m-2">
            <thead>
              <tr className="bg ">
                <th className="bor">
                  <input className="vhs-table-input" />{" "}
                </th>
                <th className="bor">
                  {" "}
                  <select
                    value={searchCatagory}
                    onChange={(e) => setSearchCatagory(e.target.value)}
                  >
                    <option value="">Select</option>
                    {[...catagories].map((catagories) => (
                      <option value={catagories} key={catagories}>
                        {catagories}{" "}
                      </option>
                    ))}
                  </select>{" "}
                </th>
                <th className="bor">
                  {" "}
                  <input
                    className="vhs-table-input"
                    placeholder="Enq Date Time"
                    value={searchDateTime}
                    onChange={(e) => setSearchDateTime(e.target.value)}
                  />{" "}
                </th>
                <th className="bor">
                  {" "}
                  <input
                    placeholder="Name"
                    className="vhs-table-input"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                  />{" "}
                </th>
                <th className="bor">
                  {" "}
                  <input
                    placeholder="Contact"
                    className="vhs-table-input"
                    value={searchContact}
                    onChange={(e) => setSearchContact(e.target.value)}
                  />{" "}
                </th>
                <th className="bor">
                  {" "}
                  <input
                    placeholder="Address"
                    className="vhs-table-input"
                    value={searchAddress}
                    onChange={(e) => setSearchAddress(e.target.value)}
                  />{" "}
                </th>
                <th className="bor">
                  <select
                    value={searchReference}
                    onChange={(e) => setSearchReference(e.target.value)}
                  >
                    <option value="">Select</option>
                    {[...reference].map((refere) => (
                      <option value={refere} key={refere}>
                        {refere}{" "}
                      </option>
                    ))}
                  </select>{" "}
                </th>
                <th className="bor">
                  {" "}
                  <select
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                  >
                    <option value="">Select </option>
                    {[...cities].map((city) => (
                      <option value={city} key={city}>
                        {city}{" "}
                      </option>
                    ))}
                  </select>{" "}
                </th>
                <th className="bor">
                  {" "}
                  <input
                    placeholder="Interested For"
                    className="vhs-table-input"
                    value={searchInterest}
                    onChange={(e) => setSearchInterest(e.target.value)}
                  />
                </th>
                <th className="bor">
                  {" "}
                  <input
                    placeholder="Executive"
                    className="vhs-table-input"
                    value={searchExecutive}
                    onChange={(e) => setSearchExecutive(e.target.value)}
                  />{" "}
                </th>
                <th className="bor">
                  {" "}
                  <input
                    placeholder="Appo. Date Time"
                    className="vhs-table-input"
                    value={searchAppoDateTime}
                    onChange={(e) => setSearchAppoDateTime(e.target.value)}
                  />{" "}
                </th>
                <th className="bor">
                  {" "}
                  <input
                    placeholder="Note"
                    className="vhs-table-input"
                    value={searchNote}
                    onChange={(e) => setSearchNote(e.target.value)}
                  />{" "}
                </th>
                <th className="bor">
                  <select
                    value={searchTechnician}
                    onChange={(e) => setSearchTechnician(e.target.value)}
                  >
                    <option value="">Select </option>
                    {searchResults.map((e) => (
                      <option value={e.technicianname} key={e.technicianname}>
                        {e.technicianname}{" "}
                      </option>
                    ))}
                  </select>{" "}
                </th>
                <th className="bor">
                  {" "}
                  <select
                  // value={filters.Type} onChange={handleInputChange}
                  >
                    <option>Select</option>
                  </select>{" "}
                </th>
                <th className="bor"></th>
                <th className="bor"></th>
                <th className="bor">Action</th>
              </tr>
              <tr className="bg">
                <th className="bor">#</th>
                <th className="bor">Category</th>
                <th className="bor">Enq Date Time</th>
                <th className="bor">Name</th>
                <th className="bor">Contact</th>
                <th className="bor">Address</th>
                <th className="bor">Reference</th>
                <th className="bor">City</th>
                <th className="bor">Interested For</th>
                <th className="bor">Executive</th>

                <th className="bor">Appo. Date Time</th>
                <th className="bor">Note</th>
                <th className="bor">Technician</th>
                <th className="bor">Comment</th>
                <th className="bor">Type</th>
                <th className="bor">Reason for cancel</th>
                <th className="bor">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr
                  className="trnew"
                  style={{
                    backgroundColor:
                      item.treatmentData.length > 0
                        ? "#dde9fd"
                        : item.technicianname
                        ? "#ffb9798f"
                        : "white",
                  }}
                >
                  <Link
                    to="/surveydetails"
                    state={{ data: item }}
                    style={{
                      display: "contents",
                      border: "1px solid gray ",
                      color: "black",
                    }}
                  >
                    <td>{i++}</td>
                    <td>{item.category}</td>
                    <td>
                      {item.enquirydata[0]?.date}
                      <br />
                      {item.enquirydata[0]?.Time}
                    </td>

                    <td>{item.enquirydata[0]?.name}</td>
                    <td>{item.enquirydata[0]?.mobile}</td>
                    <td>{item.enquirydata[0]?.address}</td>
                    <td>{item.enquirydata[0]?.reference1}</td>
                    <td>{item.enquirydata[0]?.city}</td>
                    <td>{item.enquirydata[0]?.intrestedfor}</td>
                    <td>{item.enquirydata[0]?.executive}</td>
                    <td>
                      {item.appoDate}
                      <br />
                      {item.appoTime}
                    </td>
                    <td>{item.enquirydata[0]?.comment}</td>
                    <td>{item.technicianname}</td>
                    <td>{item.enquirydata[0]?.comment}</td>

                    <td>
                      {item.treatmentData.length > 0
                        ? "QUOTE GENERATED"
                        : item.technicianname
                        ? "ASSIGNED FOR SURVEY"
                        : "NOT ASSIGNED"}
                    </td>
                    <td>{item.reasonForCancel}</td>
                  </Link>

                  <td>
                    {item?.cancelStatus ? (
                      <p style={{ color: "#a9042e" }}>Survey Cancelled</p>
                    ) : (
                      <button onClick={() => openPop(item)}>Cancel</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Cancel Survey</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="">
              <h5 class="vhs-sub-heading mx-3" for="flexCheckDefault">
                Reason for Cancel
              </h5>
              <textarea
                type="text"
                rows={4}
                cols={70}
                onChange={(e) => setreasonforcancel(e.target.value)}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="btn btn-danger" onClick={cancelSurvey}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Surveydatatable;
