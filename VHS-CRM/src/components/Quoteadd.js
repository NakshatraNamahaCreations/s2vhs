import React, { useState, useEffect } from "react";
import Header from "../components/layout/Header";

import axios from "axios";
import Table from "react-bootstrap/Table";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import Surveynav from "./Surveynav";
import Quotenav from "./Quotenav";

function Quotelist() {
  const admin = JSON.parse(sessionStorage.getItem("admin"));

  const navigate = useNavigate();
  const [enquiryflwdata, setenquiryflwdata] = useState([]);
  const apiURL = process.env.REACT_APP_API_URL;
  const [searchResults, setSearchResults] = useState([]);
  const [searchCatagory, setSearchCatagory] = useState("");
  const [searchDateTime, setSearchDateTime] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchContact, setSearchContact] = useState("");
  const [searchAddress, setSearchAddress] = useState("");
  const [searchReference, setSearchReference] = useState("");
  const [searchServices, setsearchServices] = useState("");
  const [searchenquirydate, setsearchenquirydate] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [searchTotal, setsearchTotal] = useState("");
  const [searchExecutive, setsearchExecutive] = useState("");
  const [searchStaff, setSearchStaff] = useState("");
  const [bookedBy, setbookedBy] = useState("");
  const [searchDesc, setSearchDesc] = useState("");
  const [searchNxtfoll, setSearchNxtfoll] = useState("");
  const [Type, setType] = useState("");
  const [duplicateCategory, setDuplicateCategory] = useState(new Set());
  const [duplicateCity, setDuplicateCity] = useState(new Set());
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25);
  // Get today's date
  const today = new Date();
  useEffect(() => {
    getenquiryadd();
  }, []);

  const getenquiryadd = async () => {
    let res = await axios.get(apiURL + "/getallagreegatequoteall");
    if (res.status === 200) {
      setenquiryflwdata(res.data?.quote);
      setSearchResults(res.data?.quote); // Update the searchResults state with the full data
    }
  };
  let i = 0;


  useEffect(() => {
    const uniqueCategory = new Set(
      enquiryflwdata
        .map((item) => item.enquirydata[0]?.category)
        .filter(Boolean)
    );
    const uniqueCity = new Set(
      enquiryflwdata.map((item) => item.enquirydata[0]?.city).filter(Boolean)
    );
    setDuplicateCategory(uniqueCategory);
    setDuplicateCity(uniqueCity);
  }, [enquiryflwdata]);

  const gettingResponse = enquiryflwdata.map((ele) =>
    ele.quotefollowup.map((item) => item.response)
  );



  useEffect(() => {
    const filterResults = () => {
      let results = enquiryflwdata;
      if (searchCatagory) {
        results = results.filter(
          (item) =>
            item.enquirydata[0]?.category &&
            item.enquirydata[0]?.category
              .toLowerCase()
              .includes(searchCatagory.toLowerCase())
        );
      }
      if (searchDateTime) {
        results = results.filter(
          (item) =>
            item.date &&
            item.date.toLowerCase().includes(searchDateTime.toLowerCase())
        );
      }
      if (Type) {
        results = results.filter((item) => {
          switch (Type) {
            case "NOT SHARED":
              return !(item.quotefollowup[0]?.response === "Confirmed" || item.type === "QUOTE SHARED");
            case "QUOTE SHARED":
              return item.type === "QUOTE SHARED";
            case "CONFIRMED":
              return item.quotefollowup[0]?.response === "Confirmed";
            default:
              return true;
          }
        });
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

      if (searchServices) {
        results = results.filter(
          (item) =>
            item.enquirydata[0]?.intrestedfor &&
            item.enquirydata[0]?.intrestedfor
              .toLowerCase()
              .includes(searchServices.toLowerCase())
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
      if (searchTotal) {
        results = results.filter(
          (item) =>
            item.netTotal &&
            item.netTotal.toLowerCase().includes(searchTotal.toLowerCase())
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
      if (searchStaff) {
        results = results.filter(
          (item) =>
            item.staffname &&
            item.staffname.toLowerCase().includes(searchStaff.toLowerCase())
        );
      }
      if (bookedBy) {
        results = results.filter(
          (item) =>
            item.Bookedby &&
            item.Bookedby.toLowerCase().includes(bookedBy.toLowerCase())
        );
      }
      if (searchDesc) {
        results = results.filter(
          (item) =>
            item.quotefollowup[0]?.desc &&
            item.quotefollowup[0]
              ?.desctoLowerCase()
              .includes(searchDesc.toLowerCase())
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
    searchServices,
    searchExecutive,
    searchStaff,
    bookedBy,
    searchDesc,
    searchNxtfoll,
    Type
  ]);

  const click = (data) => {
    if (data) {
      window.location.assign(`/quotedetails/?id=${data}`, {
        state: { data: data },
      });
    } else {
      // Handle the case when data is null or undefined
      // For example, show an error message or perform a different action
    }
  };

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
  const calculateBackgroundColor = (item) => {
    const response = item?.quotefollowup[0]?.response;
    const qshared = item?.type;

    const dateDifference = Date.now() - new Date(item?.updatedAt).getTime();
    const isDateOld = dateDifference > 30 * 60 * 60 * 1000; // 30 hours in milliseconds
    const daysDifference = Math.floor(dateDifference / (24 * 60 * 60 * 1000));

    return response === "Confirmed" || response === ""
      ? "#ffb9798f" :
      qshared === "QUOTE SHARED" ? "rgba(0, 128, 0, 0.18)"
        : isDateOld
          ? daysDifference > 10
            ? "pink"
            : "#ff00004a"
          : "white";
  };
  return (
    <div className="web">
      <Header />
      <Quotenav />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div className="shadow-sm" style={{ border: "1px #cccccc solid" }}>
          <div
            className="ps-1 pe-1"
            style={{ borderBottom: "1px #cccccc solid" }}
          >
            NOT SHARED
          </div>
          <div
            className="ps-1 pe-1"
            style={{
              borderBottom: "1px #cccccc solid",
              backgroundColor: "#0080002e",
            }}
          >
            QUOTE SHARED
          </div>
          <div
            className="ps-1 pe-1"
            style={{
              borderBottom: "1px #cccccc solid",
              backgroundColor: "#ffb9798f",
            }}
          >
            CONFIRMED
          </div>
          <div
            className="ps-1 pe-1"
            style={{
              borderBottom: "1px #pink solid",
              backgroundColor: "lightpink",
            }}
          >
            More than 10days overdue
          </div>
          <div
            className="ps-1 pe-1"
            style={{
              borderBottom: "1px #cccccc solid",
              backgroundColor: "red",
            }}
          >
            30hr quotation creation
          </div>
        </div>
      </div>
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

          <table className="my-table">
            <thead>
              <tr className="bg ">
                <th scope="col" className="bor">
                
                </th>
                <th scope="col" className="bor">
                  {" "}
                  <select
                    className="vhs-table-input"
                    value={searchCatagory}
                    onChange={(e) => setSearchCatagory(e.target.value)}
                  >
                    <option value="">Select</option>
                    {admin?.category.map((category, index) => (
                      <option key={index} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>{" "}
                </th>
                <th scope="col" className="bor"></th>
                <th scope="col" className="bor">
                  {/* {" "}
                  <input
                    className="vhs-table-input"
                    value={searchDateTime}
                    onChange={(e) => setSearchDateTime(e.target.value)}
                  />{" "} */}
                </th>
                <th scope="col" className="bor">
                  {" "}
                  <input
                    className="vhs-table-input"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                  />{" "}
                </th>
                <th scope="col" className="bor">
                  {" "}
                  <input
                    className="vhs-table-input"
                    value={searchContact}
                    onChange={(e) => setSearchContact(e.target.value)}
                  />{" "}
                </th>
                <th scope="col" className="bor">
                  {" "}
                  {/* <input
                    className="vhs-table-input"
                    value={searchAddress}
                    onChange={(e) => setSearchAddress(e.target.value)}
                  />{" "} */}
                </th>
                <th scope="col" className="bor">
                  {" "}
                  <select
                    className="vhs-table-input"
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                  >
                    <option value="">Select </option>

                    {admin?.city.map((item) => (
                      <option value={item.name}>{item.name}</option>
                    ))}
                  </select>{" "}
                </th>

                <th scope="col" className="bor">
                  <input
                    className="vhs-table-input"
                    value={searchServices}
                    onChange={(e) => setsearchServices(e.target.value)}
                  />{" "}
                </th>

                <th scope="col" className="bor">
                  {" "}
                  {/* <input
                    className="vhs-table-input"
                    value={searchTotal}
                    onChange={(e) => setsearchTotal(e.target.value)}
                  /> */}
                </th>

                <th scope="col" className="bor">
                  {" "}
                  <input
                    className="vhs-table-input"
                    value={searchExecutive}
                    onChange={(e) => setsearchExecutive(e.target.value)}
                  />{" "}
                </th>
                <th scope="col" className="bor">
                  <input
                    className="vhs-table-input"
                    value={bookedBy}
                    onChange={(e) => setbookedBy(e.target.value)}
                  />{" "}
                </th>

                <th scope="col" className="bor">
                  {/* <input
                    className="vhs-table-input"
                    value={searchenquirydate}
                    onChange={(e) => setsearchenquirydate(e.target.value)}
                  />{" "} */}
                </th>

                <th scope="col" className="bor">
                  {/* <input
                    className="vhs-table-input"
                    value={searchNxtfoll}
                    onChange={(e) => setSearchNxtfoll(e.target.value)}
                  />{" "} */}
                </th>
                <th scope="col" className="bor">
                  {/* <input
                    className="vhs-table-input"
                    value={searchDesc}
                    onChange={(e) => setSearchDesc(e.target.value)}
                  />{" "} */}
                </th>
                <th scope="col" className="bor">
                  <select className="vhs-table-input" onChange={(e) => setType(e.target.value)}>
                    <option>Select </option>

                    <option value="NOT SHARED">NOT SHARED </option>
                    <option value="QUOTE SHARED">QUOTE SHARED </option>
                    <option value="CONFIRMED">CONFIRMED </option>
                  </select>{" "}
                </th>
              </tr>
              <tr className="bg">
                <th className="bor">#</th>
                <th className="bor">Category</th>
                <th className="bor">QId</th>
                <th className="bor">Q Dt-Tm</th>
                <th className="bor">Name</th>
                <th className="bor">Contact</th>
                <th className="bor">Address</th>
                <th className="bor">City</th>
                <th className="bor">Service</th>
                <th className="bor">QAmt</th>
                <th className="bor">Executive</th>
                <th className="bor">Booked by</th>
                <th className="bor">Last F/W Dt</th>
                <th className="bor">Next F/W Dt</th>
                <th className="bor">Desc</th>
                <th className="bor">Type</th>
              </tr>
            </thead>

            <tbody>
              {currentItems.map((item, index) => (
                <a
                  key={index}
                  onClick={() => click(item.enquirydata[0].EnquiryId)}
                  className="tbl"
                >
                  <tr
                    className="trnew"
                    style={{ backgroundColor: calculateBackgroundColor(item) }}
                  >
                    <td>{index + 1}</td>
                    <td>{item?.enquirydata[0]?.category}</td>
                    <td>{item?.quoteId}</td>
                    <td>
                      {item?.date}
                      <br />
                      {item?.Time}
                    </td>
                    <td>{item?.enquirydata[0]?.name}</td>
                    <td>{item?.enquirydata[0]?.mobile}</td>
                    <td>{item?.enquirydata[0]?.address}</td>
                    <td>{item?.enquirydata[0]?.city}</td>
                    <td>{item?.enquirydata[0]?.intrestedfor} </td>
                    <td>{item?.netTotal}</td>
                    <td>{item?.enquirydata[0]?.executive}</td>
                    <td>{item?.Bookedby}</td>
                    <td>{item?.enquirydata[0]?.date}</td>
                    <td>{item?.quotefollowup[0]?.nxtfoll}</td>
                    <td>{item?.quotefollowup[0]?.desc}</td>
                    <td>
                      {item?.quotefollowup[0]?.response === "Confirmed"
                        ? "CONFIRMED"
                        : item?.type === "QUOTE SHARED"
                          ? "QUOTE SHARED"
                          : "NOT SHARED"
                      }


                    </td>
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

export default Quotelist;
