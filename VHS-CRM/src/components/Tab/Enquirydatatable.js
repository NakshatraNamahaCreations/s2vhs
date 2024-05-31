import React, { useState, useEffect, useContext } from "react";
import Header from "../layout/Header";
import Enquiryfollowupnav from "../Enquiryfollowupnav";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { useParams, Link, useNavigate } from "react-router-dom";

function Enquirydatatable() {
  const navigate = useNavigate();
  const [filterdata, setfilterdata] = useState([]);
  const apiURL = process.env.REACT_APP_API_URL;
  const { date } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [searchCatagory, setSearchCatagory] = useState("");
  const [searchDateTime, setSearchDateTime] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchContact, setSearchContact] = useState("");
  const [searchAddress, setSearchAddress] = useState("");
  const [searchReference, setSearchReference] = useState("");
  const [searchReference2, setSearchReference2] = useState("");

  const [searchCity, setSearchCity] = useState("");
  const [searchInterest, setSearchInterest] = useState("");
  const [searchFolldate, setSearchFolldate] = useState("");
  const [searchStaff, setSearchStaff] = useState("");
  const [searchResponse, setSearchResponse] = useState("");
  const [searchDesc, setSearchDesc] = useState("");
  const [searchNxtfoll, setSearchNxtfoll] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const today = new Date();
  useEffect(() => {
    getenquiry();
  }, []);

  const getenquiry = async () => {
    let res = await axios.get(apiURL + "/getcallquotedata");
    if ((res.status = 200)) {
      setfilterdata(
        res.data?.enquiryfollowup.filter((i) => i.nxtfoll === date)
      );
      setSearchResults(
        res.data?.enquiryfollowup.filter((i) => i.nxtfoll === date)
      );
    }
  };

 
  const enquirydetail = (data) => {
    navigate(`/enquirydetail/${data.EnquiryId}`);
    const queryString = new URLSearchParams({
      enquiryData: JSON.stringify(data),
    }).toString();
    const newTab = window.open(
      `/enquirydetail/${data.EnquiryId}?${queryString}`,
      "_blank"
    );
  };
  let i = 0;

  useEffect(() => {
    const filterResults = () => {
      let results = filterdata;
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
            item.enquirydata[0]?.date &&
            item.date.toLowerCase().includes(searchDateTime.toLowerCase())
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
      if (searchReference2) {
        results = results.filter(
          (item) =>
            item.enquirydata[0]?.reference2 &&
            item.enquirydata[0]?.reference2
              .toLowerCase()
              .includes(searchReference2.toLowerCase())
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
      if (searchFolldate) {
        results = results.filter(
          (item) =>
            item.folldate &&
            item.folldate.toLowerCase().includes(searchFolldate.toLowerCase())
        );
      }
      if (searchStaff) {
        results = results.filter(
          (item) =>
            item.staffname &&
            item.staffname.toLowerCase().includes(searchStaff.toLowerCase())
        );
      }
      if (searchResponse) {
        results = results.filter(
          (item) =>
            item.response &&
            item.response.toLowerCase().includes(searchResponse.toLowerCase())
        );
      }
      if (searchDesc) {
        results = results.filter(
          (item) =>
            item.desc &&
            item.desc.toLowerCase().includes(searchDesc.toLowerCase())
        );
      }
      if (searchNxtfoll) {
        results = results.filter(
          (item) =>
            item.nxtfoll &&
            item.nxtfoll.toLowerCase().includes(searchNxtfoll.toLowerCase())
        );
      }
      // results = results.map((item) => ({
      //   ...item,
      //   category: getUniqueCategories()[item.category],
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
    searchFolldate,
    searchStaff,
    searchResponse,
    searchDesc,
    searchNxtfoll,
  ]);

  function getColor(colorcode) {
    if (colorcode === "easy") {
      return "#ffb9798f";
    } else if (colorcode === "medium") {
      return "#0080002e";
    } else if (colorcode === "hard") {
      return '#ffb9798f"';
    } else {
      return "transparent";
    }
  }

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
    <div>
      <Header />
      <Enquiryfollowupnav />

      <div className="row m-auto">
        <div className="col-md-12">
          {/* Pagination */}
          <div className="pagination">
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
          <table>
            <thead>
              <tr className="tr ">
                <th scope="col">
                  <input className="vhs-table-input" />{" "}
                </th>
                <th scope="col">
                  {" "}
                  <select
                    value={searchCatagory}
                    onChange={(e) => setSearchCatagory(e.target.value)}
                  >
                    <option value="">Select</option>
                    {searchResults.map((e) => (
                      <option value={e.category} key={e.category}>
                        {e.category}{" "}
                      </option>
                    ))}
                  </select>{" "}
                </th>
                <th scope="col">
                  {" "}
                  <input
                    className="vhs-table-input"
                    placeholder="Enq Date "
                    value={searchDateTime}
                    onChange={(e) => setSearchDateTime(e.target.value)}
                  />{" "}
                </th>

                <th scope="col">
                  {" "}
                  <input
                    placeholder="Name"
                    className="vhs-table-input"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                  />{" "}
                </th>
                <th scope="col">
                  {" "}
                  <input
                    placeholder="Contact"
                    className="vhs-table-input"
                    value={searchContact}
                    onChange={(e) => setSearchContact(e.target.value)}
                  />{" "}
                </th>
                <th scope="col">
                  {" "}
                  <input
                    placeholder="Address"
                    className="vhs-table-input"
                    value={searchAddress}
                    onChange={(e) => setSearchAddress(e.target.value)}
                  />{" "}
                </th>
                <th scope="col">
                  {" "}
                  <select
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                  >
                    <option value="">Select </option>
                    {searchResults.map((e) => (
                      <option
                        value={e.enquirydata[0]?.city}
                        key={e.enquirydata[0]?.city}
                      >
                        {e.enquirydata[0]?.city}{" "}
                      </option>
                    ))}
                  </select>{" "}
                </th>

                <th scope="col">
                  <input
                    placeholder="Nxt foll"
                    className="vhs-table-input"
                    value={searchReference}
                    onChange={(e) => setSearchReference(e.target.value)}
                  />{" "}
                </th>
                <th scope="col">
                  <input
                    placeholder="Reference"
                    className="vhs-table-input"
                    value={searchReference2}
                    onChange={(e) => setSearchReference2(e.target.value)}
                  />{" "}
                </th>

                <th scope="col">
                  {" "}
                  <input
                    placeholder="Interested For"
                    className="vhs-table-input"
                    value={searchInterest}
                    onChange={(e) => setSearchInterest(e.target.value)}
                  />
                </th>
                <th scope="col">
                  {" "}
                  <input
                    placeholder="foll date"
                    className="vhs-table-input"
                    value={searchFolldate}
                    onChange={(e) => setSearchFolldate(e.target.value)}
                  />{" "}
                </th>

                <th scope="col">
                  <input
                    placeholder="Staff"
                    className="vhs-table-input"
                    value={searchStaff}
                    onChange={(e) => setSearchStaff(e.target.value)}
                  />{" "}
                </th>
                <th scope="col">
                  <input
                    placeholder="Response"
                    className="vhs-table-input"
                    value={searchResponse}
                    onChange={(e) => setSearchResponse(e.target.value)}
                  />{" "}
                </th>
                <th scope="col">
                  <input
                    placeholder="Desc"
                    className="vhs-table-input"
                    value={searchDesc}
                    onChange={(e) => setSearchDesc(e.target.value)}
                  />{" "}
                </th>
               
              </tr>
              <tr className="bg">
                <th>#</th>
                <th>Category</th>
                <th>Date</th>

                <th>Name</th>
                <th>Contact</th>
                <th>Address</th>
                <th>City</th>
                <th>Reference1</th>
                <th>Reference2</th>

                <th>Interested for</th>
                <th>Foll Date</th>
                <th>Staff</th>
                <th>Response</th>
                <th>Desc</th>
                {/* <th>Nxt Foll</th> */}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <a onClick={() => enquirydetail(item.enquirydata[0])} className="tbl">
                  <tr
                    key={item.id}
                    className="user-tbale-body tbl1 trnew"
                    style={{
                      backgroundColor: getColor(item.colorcode),
                      color: "black",
                    }}
                  >
                    <td>{index + 1}</td>
                    <td>{item.category}</td>
                    <td>{item.enquirydata[0]?.date} <br /> {item.enquirydata[0]?.Time}</td>

                    <td>{item.enquirydata[0]?.name}</td>
                    <td>{item.enquirydata[0]?.mobile}</td>
                    <td>{item.enquirydata[0]?.address}</td>
                    <td>{item.enquirydata[0]?.city}</td>
                    <td>{item.enquirydata[0]?.reference1}</td>
                    <td>{item.enquirydata[0]?.reference2}</td>
                    <td>{item.enquirydata[0]?.intrestedfor}</td>
                    <td>{item.folldate}</td>
                    <td>{item.staffname}</td>
                    <td>{item.response}</td>
                    <td>{item.desc}</td>
                    {/* <td>{item.nxtfoll}</td> */}
                  </tr>
                </a>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Enquirydatatable;
