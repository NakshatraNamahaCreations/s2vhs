import React, { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import DSRnav from "./DSRnav";
import moment from "moment";

function Dsrcallist() {
  const apiURL = process.env.REACT_APP_API_URL;
  const admin = JSON.parse(sessionStorage.getItem("admin"));

  const { date, category } = useParams();
  // console
  const currentdate = new Date();
  const formattedDate = moment(currentdate).format("YYYY-MM-DD");

  const comparedate = formattedDate === date;

  function name() {
    if (formattedDate === date) {
      return true;
    } else {
      return false;
    }
  }
  const yokesh = name();
  useEffect(() => {
    getAlldata1();
  }, []);

  const [treatmentData, settreatmentData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [dsrdata1, setdsrdata1] = useState([]);
  const [searchJobCatagory, setSearchJobCatagory] = useState("");
  const [searchCustomerName, setSearchCustomerName] = useState("");
  const [city, setcity] = useState("");
  const [searchAddress, setSearchAddress] = useState("");
  const [searchContact, setSearchContact] = useState("");
  const [searchTechName, setSearchTechName] = useState("");
  const [searchJobType, setSearchJobType] = useState("");
  const [searchDesc, setSearchDesc] = useState("");
  const [searchpaymentMode, setsearchpaymentMode] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [Totalcount, setTotalcount] = useState();

  const pageSize = 25; // Set your desired page size here

  const totalPages = Math.ceil(Totalcount / pageSize);

  useEffect(() => {
    getservicedata();
  }, []);

  const getservicedata = async () => {
    try {
      let res = await axios.get(apiURL + "/getservicedatawithaddcalnew", {
        params: {
          category: category,
          date: date,
          // page: currentPage,
          city: admin.city,
          customerName: searchCustomerName,
          number: searchContact,
          techname: searchTechName,
        },
      });

      if (res.status === 200) {
        const allData = res.data?.runningdata;

        setTotalcount(res.data?.totalCount);
        setSearchResults(allData);
        settreatmentData(allData);
      }
    } catch (error) {
      console.log("Error in Search", error);
    }
  };

  useEffect(() => {
    getAlldata();
  }, []);

  const getAlldata = async () => {
    try {
      const res = await axios.get(apiURL + `/filteredservicedate/${date}`);

      if (res.status === 200) {
        setdsrdata1(res.data.filterwithservicedata);
      }
    } catch (error) {
      // Handle error
    }
  };

  const [manualcrmdata, setmanualcrmdata] = useState([]);
  const getAlldata1 = async () => {
    try {
      const res = await axios.get(apiURL + `/getmanuljobfromcrmdata`);

      if (res.status === 200) {
        setmanualcrmdata(res.data.data);
      }
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    async function filterResults() {
      try {
        let results = treatmentData;
        if (searchJobCatagory) {
          results = results.filter(
            (item) =>
              item.jobCategory &&
              item.jobCategory
                .toLowerCase()
                .includes(searchJobCatagory.toLowerCase())
          );
        }
        if (searchCustomerName) {
          results = results.filter(
            (item) =>
              item.customerData[0]?.customerName &&
              item.customerData[0]?.customerName
                .toLowerCase()
                .includes(searchCustomerName.toLowerCase())
          );
        }
        if (city) {
          results = results.filter(
            (item) =>
              item.city && item.city.toLowerCase().includes(city.toLowerCase())
          );
        }
        if (searchAddress) {
          results = results.filter(
            (item) =>
              (item.customerData[0]?.cnap &&
                item.customerData[0]?.cnap
                  .toLowerCase()
                  .includes(searchAddress.toLowerCase())) ||
              (item.customerData[0]?.rbhf &&
                item.customerData[0]?.rbhf
                  .toLowerCase()
                  .includes(searchAddress.toLowerCase()))
          );
        }
        if (searchContact) {
          results = results.filter((item) => {
            const mainContact = item.customerData[0]?.mainContact;
            if (typeof mainContact === "string") {
              return mainContact
                .toLowerCase()
                .includes(searchContact.toLowerCase());
            } else if (typeof mainContact === "number") {
              const stringMainContact = String(mainContact); // Convert number to string
              return stringMainContact
                .toLowerCase()
                .includes(searchContact.toLowerCase());
            }
            return false; // Exclude if mainContact is neither string nor number
          });
        }

        if (searchTechName) {
          results = results.filter(
            (item) =>
              // item.dsrdata[0]?.TechorPMorVendorName &&
              item.dsrdata[0]?.TechorPMorVendorName === searchTechName
          );
        }
        if (searchJobType) {
          results = results.filter(
            (item) =>
              item.service &&
              item.service.toLowerCase().includes(searchJobType.toLowerCase())
          );
        }
        if (searchDesc) {
          results = results.filter(
            (item) =>
              item.desc &&
              item.desc.toLowerCase().includes(searchDesc.toLowerCase())
          );
        }
        if (searchpaymentMode) {
          results = results.filter(
            (item) =>
              item.paymentMode &&
              item.paymentMode
                .toLowerCase()
                .includes(searchpaymentMode.toLowerCase())
          );
        }
        setSearchResults(results);
      } catch (error) {
        console.log("Error in Search", error);
      }
    }
    filterResults();
  }, [
    searchJobCatagory,
    searchCustomerName,
    city,
    searchAddress,
    searchContact,
    searchJobType,
    searchDesc,
    searchpaymentMode,
    searchTechName,
  ]);
  let TTnameValue = null;
  let vCancel = null;
  const passfunction1 = (sId) => {
    const filt = manualcrmdata?.filter((i) => i.serviceId == sId?._id);

    TTnameValue = filt[0];
    vCancel = filt[0]?.vCancel;

    return TTnameValue;
  };

  const passfunction = (sId) => {
    const filt = dsrdata1.filter(
      (i) => i.serviceInfo[0]?._id === sId._id && i.serviceDate === date
    );
    const TTnameValue = filt[0]?.TechorPMorVendorName;

    return TTnameValue;
  };

  useEffect(() => {
    SERVICESTARTED();
  }, []);

  const SERVICESTARTED = (service) => {
    const filterStartTime = dsrdata1.filter(
      (item) =>
        item.serviceInfo[0]?._id === service?._id && item?.serviceDate === date
    );

    return filterStartTime[0]?.startJobTime;
  };

  const SERVICECOMPLETED = (service) => {
    const filterStartTime = dsrdata1.filter(
      (item) =>
        item.serviceInfo[0]?._id === service?._id && item.serviceDate === date
    );
    return filterStartTime[0]?.endJobTime;
  };

  const SERVICECOMPLETEDBYOP = (service) => {
    const filterStartTime = dsrdata1.filter(
      (item) =>
        item.serviceInfo[0]?._id === service?._id && item.serviceDate == date
    );

    return filterStartTime[0]?.jobComplete;
  };

  const SERVICECANCLE = (service) => {
    const filterStartTime = dsrdata1.filter(
      (item) => item.serviceInfo[0]?._id === service._id
    );

    return filterStartTime[0]?.jobComplete;
  };

  const SERVICEMode = (service) => {
    const filterpaymentmde = dsrdata1.filter(
      (item) => item.serviceInfo[0]?._id === service._id
    );

    return filterpaymentmde[0]?.paymentType;
  };

  const returndata = (data) => {
    const dateToMatch = new Date(date);
    const matchingData = [];

    let charge = 0;
    data.dividedamtDates.forEach((dateObj, index) => {
      const dividedDate = new Date(dateObj.date);
      console.log(
        "dividedDate.getDate() === dateToMatch.getDate()",
        dividedDate.getDate() === dateToMatch.getDate()
      );
      if (dividedDate.getDate() === dateToMatch.getDate()) {
        matchingData.push({
          date: dateObj.date,
          charge: data?.dividedamtCharges[index]?.charge,
        });
      } else {
      }
    });

    return matchingData[0]?.charge ? matchingData[0]?.charge : 0;
  };

  const [selectedStatus, setSelectedStatus] = useState("");

  // Function to handle legend item clicks and filter data
  const handleLegendItemClick = (status) => {
    setSelectedStatus(status);

    // Use the original treatmentData if searchResults is empty
    const dataToFilter =
      searchResults.length > 0 ? searchResults : treatmentData;

    // Logic to filter data based on the selected status
    const filteredData = dataToFilter.filter((item) => {
      switch (status) {
        case "COMPLETED":
          return item?.dsrdata[0]?.jobComplete === "YES"; // Filter for "Service Completed"
        case "CANCELLED":
          return item?.dsrdata[0]?.jobComplete === "CANCEL"; // Filter for "Service Cancelled"
        case "startJobTime":
          return item?.dsrdata[0]?.startJobTime; // Filter for "Service Started"
        case "SCOMpleted":
          return item?.dsrdata[0]?.endJobTime; // Filter for "Service Completed"
        case "DELAY":
          return item?.dsrdata[0]?.endJobTime; // Filter for "Service delay"
        case "ASSIGNTECH":
          return (
            item?.dsrdata[0]?.jobComplete !== "YES" &&
            item?.dsrdata[0]?.TechorPMorVendorName
          ); // Filter for "Assigned for Technician"
        case "NOTASSIGNTECH":
          return !item?.dsrdata[0]; // Filter for "Assigned for Technician"
        default:
          return true;
      }
    });

    setSearchResults(filteredData);
  };

  const SERVICEdelay = (selectedData) => {
    // Check if selectedData is defined
    if (!yokesh == true) {
      return;
    }

    const givenDate = moment(date, "YYYY-MM-DD");

    // Get the current date
    const currentDate = moment();

    const isPast = givenDate.isBefore(currentDate, "day");

    if (selectedData?.dsrdata[0]?.startJobTime) {
      return;
    } else {
      const selectedSlotText = selectedData?.selectedSlotText;

      if (!selectedSlotText) {
        // Handle the case where the time range is not available
        console.log("Time range not found for the selected service.");
        return false; // or handle it accordingly
      }

      // Get the current moment
      const currentMoment = moment();

      // Extract start and end times from the selected slot text
      const [startTime, endTime] = selectedSlotText?.split(" - ");

      // Parse the start time using moment
      const slotStartTime = moment(startTime, "hA");

      // Compare current time with the selected time slot
      const isPast = currentMoment.isAfter(slotStartTime);

      // Return true if the selected slot is past the current time, otherwise false
      return isPast;
    }
  };

  // const openNewTab = () => {
  //   const url = `/dsrdetails?data=${encodeURIComponent(selectedData)}&data1=${encodeURIComponent(date)}&TTname=${encodeURIComponent(passfunction(selectedData))}`;
  //   const newTab = window.open(url, '_blank');
  //   if (newTab) {
  //     newTab.focus();
  //   }
  // };

  return (
    <div className="web">
      <Header />
      <DSRnav />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div className="shadow-sm" style={{ border: "1px #cccccc solid" }}>
          <div
            className="ps-1 pe-1"
            style={{ borderBottom: "1px #cccccc solid", cursor: "pointer" }}
            onClick={() => handleLegendItemClick("NOTASSIGNTECH")}
          >
            NOT ASSIGNED
          </div>
          <div
            className="ps-1 pe-1"
            style={{
              backgroundColor: "#e2e3e5",
              cursor: "pointer",
            }}
            onClick={() => handleLegendItemClick("ASSIGNTECH")}
          >
            ASSIGNED FOR TECHNICIAN
          </div>
          <div
            className="ps-1 pe-1"
            style={{
              backgroundColor: "#ffeb3b",
              cursor: "pointer",
            }}
            onClick={() => handleLegendItemClick("startJobTime")}
          >
            SERVICE STARTED
          </div>
          <div
            className="ps-1 pe-1"
            style={{ backgroundColor: "#4caf50", cursor: "pointer" }}
            onClick={() => handleLegendItemClick("SCOMpleted")}
          >
            SERIVCE COMPLETED
          </div>
          <div
            className="ps-1 pe-1"
            style={{ backgroundColor: "#f44336", cursor: "pointer" }}
            onClick={() => handleLegendItemClick("CANCELLED")}
          >
            SERIVCE CANCELLED
          </div>
          <div
            className="ps-1 pe-1"
            style={{ backgroundColor: "#2196f3", cursor: "pointer" }}
            onClick={() => handleLegendItemClick("DELAY")}
          >
            SERIVCE DELAYED
          </div>
          <div
            className="ps-1 pe-1"
            style={{ backgroundColor: "rgb(182, 96, 255)", cursor: "pointer" }}
            onClick={() => handleLegendItemClick("COMPLETED")}
          >
            CLOSED OPERATION MANAGER
          </div>
          <b>Double click for filter </b>
        </div>
      </div>

      <div className="row m-auto">
        <div className="pagination-container">
          <span>Page:</span>
          <select
            value={currentPage}
            onChange={(e) => {
              setCurrentPage(Number(e.target.value));
            }}
          >
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <option key={page} value={page}>
                  {page}
                </option>
              )
            )}
          </select>
        </div>
        <div className="col-md-12">
          <table
            class="table table-hover table-bordered mt-1"
            style={{ width: "113%" }}
          >
            <thead className="">
              <tr className="table-secondary">
                {/* <th className="table-head" scope="col"></th> */}
                <th className="table-head" scope="col"></th>

                <th
                  className="table-head"
                  style={{ width: "7%" }}
                  scope="col"
                ></th>
                <th scope="col" className="table-head" style={{ width: "7%" }}>
                  <input
                    className="vhs-table-input"
                    value={searchJobCatagory}
                    onChange={(e) => setSearchJobCatagory(e.target.value)}
                  />{" "}
                </th>

                <th scope="col" className="table-head">
                  <input
                    className="vhs-table-input"
                    value={searchCustomerName}
                    onChange={(e) => setSearchCustomerName(e.target.value)}
                  />{" "}
                </th>
                <th scope="col" className="table-head">
                  <select
                    className="vhs-table-input"
                    value={city}
                    onChange={(e) => setcity(e.target.value)}
                  >
                    <option value="">Select</option>
                    {[...new Set(treatmentData?.map((city) => city.city))].map(
                      (uniqueCity) => (
                        <option value={uniqueCity} key={uniqueCity}>
                          {uniqueCity}
                        </option>
                      )
                    )}
                  </select>{" "}
                </th>
                <th scope="col" style={{ width: "15%" }} className="table-head">
                  <input
                    className="vhs-table-input"
                    value={searchAddress}
                    onChange={(e) => setSearchAddress(e.target.value)}
                  />{" "}
                </th>
                <th scope="col" className="table-head">
                  <input
                    className="vhs-table-input"
                    value={searchContact}
                    onChange={(e) => setSearchContact(e.target.value)}
                  />{" "}
                </th>
                <th scope="col" className="table-head">
                  <select
                    className="vhs-table-input"
                    value={searchTechName}
                    onChange={(e) => setSearchTechName(e.target.value)}
                  >
                    <option value="">Select</option>
                    {[
                      ...new Set(
                        treatmentData?.map(
                          (item) => item?.dsrdata[0]?.TechorPMorVendorName
                        )
                      ),
                    ].map((uniqueName) => (
                      <option value={uniqueName} key={uniqueName}>
                        {uniqueName}
                      </option>
                    ))}
                  </select>
                </th>
                {/* <th scope="col" className="table-head">
                
                </th> */}
                <th scope="col" className="table-head">
                  <input
                    className="vhs-table-input"
                    value={searchJobType}
                    onChange={(e) => setSearchJobType(e.target.value)}
                  />{" "}
                </th>

                <th scope="col" className="table-head"></th>
                <th scope="col" className="table-head">
                  <select
                    className="vhs-table-input"
                    value={searchpaymentMode}
                    onChange={(e) => setsearchpaymentMode(e.target.value)}
                  >
                    <option value="">Select</option>

                    <option value="cash">Cash</option>
                    <option value="online">Online</option>
                  </select>{" "}
                </th>
                <th scope="col" className="table-head">
                  <input
                    className="vhs-table-input"
                    value={searchDesc}
                    onChange={(e) => setSearchDesc(e.target.value)}
                  />{" "}
                </th>
              </tr>
              <tr className="table-secondary">
                <th className="table-head" scope="col">
                  Sr.No
                </th>
                {/* <th className="table-head" scope="col">
                  Category
                </th> */}
                <th className="table-head" scope="col">
                  Date
                </th>
                <th className="table-head" scope="col">
                  Time
                </th>

                <th scope="col" className="table-head">
                  Customer Name
                </th>
                <th scope="col" className="table-head">
                  City
                </th>
                <th scope="col" style={{ width: "15%" }} className="table-head">
                  Address
                </th>
                <th scope="col" className="table-head">
                  Contact No.
                </th>

                <th scope="col" className="table-head">
                  Technician
                </th>

                {/* <th scope="col" className="table-head">
                  Worker Name
                </th> */}
                <th scope="col" className="table-head">
                  Job Type
                </th>

                <th scope="col" className="table-head">
                  Job Amount
                </th>
                <th scope="col" className="table-head">
                  Payment mode
                </th>
                <th scope="col" className="table-head">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {searchResults
                .filter((selectedData) => {
                  const techName = passfunction(selectedData) || ""; // Default to an empty string if techName is undefined
                  return (
                    techName.includes(searchTechName) || searchTechName === ""
                  );
                })
                .map((selectedData, index) => (
                  // const chargeForCurrentRow = charge[index] || 0;
                  <tr
                    className="user-tbale-body"
                    key={index}
                    // style={{ backgroundColor: SERVICEdelay(selectedData) ? 'darkgrey' : 'pink' }}
                    style={{
                      backgroundColor:
                        SERVICECOMPLETEDBYOP(selectedData) === "YES"
                          ? "#b660ff87"
                          : SERVICECOMPLETED(selectedData)
                          ? "#4caf50ba"
                          : SERVICECANCLE(selectedData) === "CANCEL"
                          ? "#f38981"
                          : SERVICEdelay(selectedData)
                          ? "#21e0f38c"
                          : SERVICESTARTED(selectedData)
                          ? "#ffeb3b70"
                          : passfunction(selectedData)
                          ? "darkgrey"
                          : "",
                    }}
                  >
                    <Link
                      to="/dsrdetails"
                      className="tbl"
                      state={{
                        data: selectedData,
                        data1: date,
                        TTname: passfunction(selectedData),
                      }}
                    >
                      <td>{index + 1}</td>
                      {/* <td>{selectedData.category}</td> */}
                      <td>
                        {date} {SERVICEdelay(selectedData)}
                      </td>

                      <td>{selectedData?.selectedSlotText}</td>

                      <td>{selectedData?.customerdata[0]?.customerName}</td>

                      {/* {selectedData.city ? (
                      <td>{selectedData.city}</td>
                    ) : ( */}
                      <td>{selectedData?.city}</td>
                      {/* )} */}
                      <td>
                        {selectedData?.deliveryAddress
                          ? `
                        ${selectedData?.deliveryAddress?.platNo},
                        ${selectedData?.deliveryAddress?.address} - 
                        ${selectedData?.deliveryAddress?.landmark}
                        `
                          : ""}
                      </td>

                      <td>{selectedData?.customerdata[0]?.mainContact}</td>

                      <td>
                        {/* {selectedData?.dsrdata &&
                        selectedData?.dsrdata.length > 0 && (
                          <p>
                            {selectedData?.dsrdata[0]?.TechorPMorVendorName}
                          </p>
                        )} */}
                        {passfunction(selectedData) ? (
                          passfunction(selectedData)
                        ) : passfunction1(selectedData)
                            ?.TechorPMorVendorName ? (
                          <p
                            style={{
                              background:
                                passfunction1(selectedData)?.vCancel ===
                                "cancel"
                                  ? "red"
                                  : "orange",
                            }}
                          >
                            M ={" "}
                            {passfunction1(selectedData)?.TechorPMorVendorName}
                          </p>
                        ) : (
                          ""
                        )}

                        {selectedData?.dsrdata[0]?.Tcanceldate && (
                          <>
                            <p
                              style={{
                                textDecoration: "underline",
                                marginBottom: 0,
                              }}
                            >
                              Cancel details
                            </p>
                            <p style={{ color: "red" }}>
                              {selectedData?.dsrdata[0]?.Tcanceldate}
                              <br />
                              {selectedData?.dsrdata[0]?.Tcancelreason}
                            </p>
                          </>
                        )}
                        {selectedData?.dsrdata[0]?.rescheduledate && (
                          <>
                            <p
                              style={{
                                textDecoration: "underline",
                                marginBottom: 0,
                              }}
                            >
                              Reschedule details
                            </p>
                            <p style={{ color: "orange" }}>
                              {selectedData?.dsrdata[0]?.rescheduledate}
                              <br />
                              {selectedData?.dsrdata[0]?.reschedulereason}
                              <br />
                              {selectedData?.dsrdata[0]?.rescheduletime}
                            </p>
                          </>
                        )}
                      </td>

                      {/* <td>{dsrdata[0]?.workerName}</td> */}

                      <td>{selectedData?.service}</td>

                      <td>
                        {selectedData?.contractType === "AMC"
                          ? returndata(selectedData)
                            ? returndata(selectedData)
                            : "0"
                          : selectedData.GrandTotal}
                      </td>

                      {selectedData.paymentMode ? (
                        <td>{selectedData.paymentMode}</td>
                      ) : (
                        <td>{SERVICEMode(selectedData)}</td>
                      )}

                      <td>{selectedData?.desc}</td>
                    </Link>
                  </tr>
                ))}
            </tbody>
          </table>{" "}
        </div>
      </div>
    </div>
  );
}

export default Dsrcallist;
