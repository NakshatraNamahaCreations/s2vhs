import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import Quotenav from "./Quotenav";
import Header from "./layout/Header";

function Quoteappconfirmed() {
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
  const [searchResponse, setSearchResponse] = useState("");
  const [searchDesc, setSearchDesc] = useState("");
  const [searchNxtfoll, setSearchNxtfoll] = useState("");
  const [searchBookedby,setsearchBookedby] = useState("");
const [Type, setType] = useState("")


  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);



  useEffect(() => {
    getenquiryadd();
  }, []);

  const getenquiryadd = async () => {
    let res = await axios.get(apiURL + "/getenquirydata");
    if (res.status === 200) {
      setenquiryflwdata(res.data?.quotefollowup.filter((item) => item.response === "Confirmed"));
      setSearchResults(res.data?.quotefollowup.filter((item) => item.response === "Confirmed")); 
    }
  };
  let i = 0;

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
          item?.quotedata[0]?.netTotal &&
            item.quotedata[0]?.netTotal.toLowerCase().includes(searchTotal.toLowerCase())
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
      if (searchBookedby) {
        results = results.filter(
          (item) =>
            item.quotedata[0]?.Bookedby &&
            item.quotedata[0]?.Bookedby
              .toLowerCase()
              .includes(searchBookedby.toLowerCase())
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

    searchExecutive,
    searchStaff,
    searchResponse,
    searchDesc,
    searchNxtfoll,
    searchBookedby
  ]);



  const click = (data) => {
    if (data) {
      window.location.assign(`/quotedetails/?id=${data.EnquiryId}`, {
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

        <table>
          <thead>
            <tr className="bg ">
              <th scope="col" className="bor">
                <input className="vhs-table-input" />{" "}
              </th>
              <th scope="col" className="bor">
                {" "}
                <select
                  value={searchCatagory}
                  onChange={(e) => setSearchCatagory(e.target.value)}
                >
                  <option value="">Select</option>
                  {searchResults.map((e) => (
                    <option
                      value={e.enquirydata[0]?.category}
                      key={e.enquirydata[0]?.category}
                    >
                      {e.enquirydata[0]?.category}{" "}
                    </option>
                  ))}
                </select>{" "}
              </th>
              <th scope="col" className="bor">
                {" "}
                <input
                  className="vhs-table-input"
                  // value={searchDateTime}
                  // onChange={(e) => setSearchDateTime(e.target.value)}
                />{" "}
              </th>
              <th scope="col" className="bor">
                {" "}
                <input
                  className="vhs-table-input"
                  value={searchDateTime}
                  onChange={(e) => setSearchDateTime(e.target.value)}
                />{" "}
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
                <input
                  className="vhs-table-input"
                  value={searchAddress}
                  onChange={(e) => setSearchAddress(e.target.value)}
                />{" "}
              </th>
              <th scope="col" className="bor">
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

              <th scope="col" className="bor">
                <input
                  className="vhs-table-input"
                  value={searchServices}
                  onChange={(e) => setsearchServices(e.target.value)}
                />{" "}
              </th>

              <th scope="col" className="bor">
                {" "}
                <input
                  className="vhs-table-input"
                  value={searchTotal}
                  onChange={(e) => setsearchTotal(e.target.value)}
                />
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
                  value={searchResponse}
                  onChange={(e) => setSearchResponse(e.target.value)}
                />{" "}
              </th>

              <th scope="col" className="bor">
                <input
                  className="vhs-table-input"
                  value={searchenquirydate}
                  onChange={(e) => setsearchenquirydate(e.target.value)}
                />{" "}
              </th>

             
              <th scope="col" className="bor">
                <input
                  className="vhs-table-input"
                  value={searchNxtfoll}
                  onChange={(e) => setSearchNxtfoll(e.target.value)}
                />{" "}
              </th>
              <th scope="col" className="bor">
                <input
                  className="vhs-table-input"
                  value={searchDesc}
                  onChange={(e) => setSearchDesc(e.target.value)}
                />{" "}
              </th>
              <th scope="col" className="bor">
              <select
                  
                  onChange={(e) => setType(e.target.value)}
                >
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
            {currentItems.map((item) => (
              <a onClick={() => click(item)} className="tbl">
                <tr className="trnew"  style={{
                backgroundColor: item.response === "Confirmed"
                  ? "#ffb9798f"
                  : item.response ===""
                    ? "#ffb9798f"
                    : "white",
              }}>
                  <td>{i++}</td>
                  <td>{item?.enquirydata[0]?.category}</td>
                  <td>{item?.quoteId}</td>
                  <td>
                    {item?.date}
                    <br />
                    {item?.time}
                  </td>
                  <td>{item?.enquirydata[0]?.name}</td>
                  <td>{item?.enquirydata[0]?.mobile}</td>
                  <td>{item?.enquirydata[0]?.address}</td>

                  <td>{item?.enquirydata[0]?.city}</td>
                  <td>{item?.enquirydata[0]?.intrestedfor}</td>
                  <td>{item?.netTotal}</td>
                  <td>{item?.enquirydata[0]?.executive}</td>
                  <td>{item?.Bookedby}</td>
                  <td>{item?.enquirydata[0]?.date}</td>
                  <td>{item?.nxtfoll}</td>
                  <td>{item?.desc}</td>
                  {item?.response === "Confirmed" ?
                  <td>CONFIRMED</td>: <td>NOT SHARED</td>
                  
                }

                </tr>
              </a>
              // </Link>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  );
}

export default Quoteappconfirmed;
