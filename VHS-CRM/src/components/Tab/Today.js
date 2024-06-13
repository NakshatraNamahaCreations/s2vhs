import React, { useState, useEffect, useContext } from "react";
import Header from "../layout/Header";
import Enquiryfollowupnav from "../Enquiryfollowupnav";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { Link, useNavigate } from "react-router-dom";
import Enquirynav from "../Enquirynav";

function Today() {
  const navigate = useNavigate();
  const [filterdata, setfilterdata] = useState([]);
  const apiURL = process.env.REACT_APP_API_URL;
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

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25);

  useEffect(() => {
    getenquiry();
  }, []);

  const getenquiry = async () => {
    let res = await axios.get(apiURL + "/getenquiry12");
    if ((res.status = 200)) {
      const reverseArray = res.data?.enquiryadd.reverse();
      setfilterdata(reverseArray);

      setSearchResults(res.data?.enquiryadd);
    }
  };

  const enquirydetail = (row) => {
    const queryString = new URLSearchParams({
      enquiryData: JSON.stringify(row),
    }).toString();
    const newTab = window.open(
      `/enquirydetail/${row.EnquiryId}?${queryString}`,
      "_blank"
    );
  };

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
            item.date &&
            item.date.toLowerCase().includes(searchDateTime.toLowerCase())
        );
      }

      if (searchName) {
        results = results.filter(
          (item) =>
            item.name &&
            item.name.toLowerCase().includes(searchName.toLowerCase())
        );
      }
      if (searchContact) {
        results = results.filter(
          (item) =>
            item.mobile &&
            item.mobile.toLowerCase().includes(searchContact.toLowerCase())
        );
      }
      if (searchAddress) {
        results = results.filter(
          (item) =>
            item.address &&
            item.address.toLowerCase().includes(searchAddress.toLowerCase())
        );
      }
      if (searchReference) {
        results = results.filter(
          (item) =>
            item.reference1 &&
            item.reference1
              .toLowerCase()
              .includes(searchReference.toLowerCase())
        );
      } //
      if (searchReference2) {
        results = results.filter(
          (item) =>
            item.reference2 &&
            item.reference2
              .toLowerCase()
              .includes(searchReference2.toLowerCase())
        );
      } //
      if (searchCity) {
        results = results.filter(
          (item) =>
            item.city &&
            item.city.toLowerCase().includes(searchCity.toLowerCase())
        );
      }
      if (searchInterest) {
        results = results.filter(
          (item) =>
            item.intrestedfor &&
            item.intrestedfor
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
            item?.enquiryfollowData[0]?.staffname &&
            item.enquiryfollowData[0]?.staffname
              .toLowerCase()
              .includes(searchStaff.toLowerCase())
        );
      }
      if (searchResponse) {
        results = results.filter(
          (item) =>
            item.enquiryfollowData[0]?.response &&
            item.enquiryfollowData[0]?.response
              .toLowerCase()
              .includes(searchResponse.toLowerCase())
        );
      }
      if (searchDesc) {
        results = results.filter(
          (item) =>
            item.enquiryfollowData[0]?.desc &&
            item.enquiryfollowData[0]?.desc
              .toLowerCase()
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

  return (
    <div>
      <Header />

      <Enquirynav />

      <div className="row m-auto">
        <div className="col-md-12">
          <table>
            <thead>
              <tr className="bg ">
                <th scope="col"></th>
                <th scope="col">
                  {" "}
                  <select
                    className="vhs-table-input"
                    value={searchCatagory}
                    onChange={(e) => setSearchCatagory(e.target.value)}
                  >
                    <option value="">Select</option>
                    {[
                      ...new Set(
                        filterdata?.map((category) => category.category)
                      ),
                    ].map((uniquecategory) => (
                      <option value={uniquecategory} key={uniquecategory}>
                        {uniquecategory}
                      </option>
                    ))}
                  </select>{" "}
                </th>
                <th scope="col">
                  {" "}
                  <input
                    className="vhs-table-input"
                    placeholder="mm-dd-yyyy "
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
                    className="vhs-table-input"
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                  >
                    <option value="">Select </option>
                    {[...new Set(filterdata?.map((city) => city.city))].map(
                      (uniquecity) => (
                        <option value={uniquecity} key={uniquecity}>
                          {uniquecity}
                        </option>
                      )
                    )}
                  </select>{" "}
                </th>

                <th scope="col">
                  <input
                    placeholder="Reference"
                    className="vhs-table-input"
                    value={searchReference}
                    onChange={(e) => setSearchReference(e.target.value)}
                  />{" "}
                </th>
                {/* <th scope="col " style={{width:"10%"}}>
                  <input
                    placeholder="Reference"
                    className=""
                    value={searchReference2}
                    onChange={(e) => setSearchReference2(e.target.value)}
                    
                  />{" "}
                </th> */}
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
                  <select
                    className="vhs-table-input"
                    value={searchStaff}
                    onChange={(e) => setSearchStaff(e.target.value)}
                  >
                    <option value="">Select</option>
                    {[
                      ...new Set(
                        filterdata?.map(
                          (i) => i.enquiryfollowData[0]?.staffname
                        )
                      ),
                    ].map((uniqueexe) => (
                      <option value={uniqueexe} key={uniqueexe}>
                        {uniqueexe}
                      </option>
                    ))}
                  </select>{" "}
                  {/* <input placeholder="Excutive" value={searchStaff}  onChange={(e) => setSearchStaff(e.target.value)} className="vhs-table-input" /> */}
                </th>
                <th scope="col">
                  <select
                    className="vhs-table-input"
                    value={searchResponse}
                    onChange={(e) => setSearchResponse(e.target.value)}
                  >
                    <option value="">Select</option>
                    {[
                      ...new Set(
                        filterdata?.map((i) => i.enquiryfollowData[0]?.response)
                      ),
                    ].map((uniqueexe) => (
                      <option value={uniqueexe} key={uniqueexe}>
                        {uniqueexe}
                      </option>
                    ))}
                  </select>{" "}
                </th>
                <th scope="col">
                  <input
                    placeholder="Desc"
                    className="vhs-table-input"
                    value={searchDesc}
                    onChange={(e) => setSearchDesc(e.target.value)}
                  />
                </th>
              </tr>
              <tr className="bg">
                <th className="bor">#</th>
                <th className="bor">Category</th>
                <th className="bor" style={{ width: "100px" }}>
                  Date & Time
                </th>

                <th className="bor">Name</th>
                <th className="bor">Contact</th>
                <th className="bor">Address</th>
                <th className="bor">City</th>
                <th className="bor">Reference1</th>
                {/* <th className="bor">Reference2</th> */}
                <th className="bor">Interested for</th>
                <th className="bor">Executive Name</th>
                <th className="bor">responce </th>
                <th className="bor">Description</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((item, index) => (
                <a onClick={() => enquirydetail(item)} className="tbl">
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
                    <td>
                      {item.date} <br /> {item.Time}
                    </td>

                    <td>{item.name}</td>
                    <td>{item.mobile}</td>
                    <td>{item.address}</td>
                    <td>{item.city}</td>

                    <td>{item.reference1}</td>
                    {/* <td style={{display:"flex",flexWrap:"wrap",width:"50px"}}>{item.reference2}</td> */}
                    <td>{item.intrestedfor}</td>
                    <td>{item.enquiryfollowData[0]?.staffname}</td>
                    <td>{item.enquiryfollowData[0]?.response}</td>
                    <td>{item.enquiryfollowData[0]?.desc}</td>

                    {/* <td>{item.folldate}</td>
                    <td>{item.staffname}</td>
                    <td>{item.response}</td>
                    <td>{item.desc}</td>
                    <td>{item.nxtfoll}</td> */}
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

export default Today;
