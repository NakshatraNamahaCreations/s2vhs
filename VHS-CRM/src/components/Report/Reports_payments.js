import React, { useState, useEffect, useContext } from "react";
import Header from "../layout/Header";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { useParams, Link, NavLink } from "react-router-dom";
import * as XLSX from "xlsx";
import "react-multi-date-picker/styles/colors/purple.css"
import DatePicker, { DateObject } from "react-multi-date-picker"
import size from "react-element-popper/animations/size";
import moment from "moment";

function Reports_payments() {
    const admin = JSON.parse(sessionStorage.getItem("admin"));
    const defaultFromDate = new DateObject();
    const defaultToDate = new DateObject();

    const [values, setValues] = useState([defaultFromDate, defaultToDate]);


    const fromdate = values[0] || defaultFromDate;
    const todate = values[1] || defaultToDate;



    const [treatmentData, settreatmentData] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [dsrdata, setdsrdata] = useState([]);
    const [searchJobCatagory, setSearchJobCatagory] = useState("");
    const [searchCustomerName, setSearchCustomerName] = useState("");
    const [city, setcity] = useState("");
    const [searchAddress, setSearchAddress] = useState("");
    const [searchContact, setSearchContact] = useState("");
    const [searchTechName, setSearchTechName] = useState("");
    const [searchJobType, setSearchJobType] = useState("");
    const [searchDesc, setSearchDesc] = useState("");

    const [approach, setApproach] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(25);

    const apiURL = process.env.REACT_APP_API_URL;
    const { date } = useParams();

    // Pagination logic
    const totalPages = Math.ceil(searchResults.length / itemsPerPage);
    const pageOptions = Array.from(
        { length: totalPages },
        (_, index) => index + 1
    );



    // Calculate the starting serial number based on the current page
    const startSerialNumber = (currentPage - 1) * itemsPerPage + 1;
    // useEffect(() => {
    //     getservicedata();
    // }, [currentPage]);

    const godaterange = () => {
        getservicedata()
    }
    const getservicedata = async () => {
        try {
            let res = await axios.get(apiURL + "/getpaymentrepotsdaterangewise", {
                params: {
                    fromdate,
                    todate,
                    city: admin.city,
                },
            });

            if (res.status === 200) {

                settreatmentData(res.data?.runningdata);
                setSearchResults(res.data?.runningdata);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };



    useEffect(() => {
        getAlldata();
    }, [treatmentData]);

    const getAlldata = async () => {
        try {
            const res = await axios.get(apiURL + `/getservicedatafromtodate/${fromdate}/${todate}`);


            if (res.status === 200) {
                setdsrdata(res.data.filterwithservicedata); // Assuming the response has the correct key
            }
        } catch (error) {
            // Handle error
        }
    };

    const fddata = (id) => {
        const data = dsrdata.filter((i) => i.serviceInfo[0]?._id === id);

        return data;
    };

    // filter and search
    useEffect(() => {
        const filterResults = () => {
            let results = treatmentData;
            if (searchJobCatagory) {
                results = results.filter(
                    (item) =>
                        item.category &&
                        item.category
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

            if (approach) {
                results = results.filter(
                    (item) =>
                        item.customerData[0]?.approach &&
                        item.customerData[0]?.approach
                            .toLowerCase()
                            .includes(approach.toLowerCase())
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
                        item.dsrdata[0]?.TechorPMorVendorName &&
                        item.dsrdata[0]?.TechorPMorVendorName.toLowerCase().includes(
                            searchTechName.toLowerCase()
                        )
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
                        item.customerFeedback &&
                        item.customerFeedback
                            .toLowerCase()
                            .includes(searchDesc.toLowerCase())
                );
            }
            setSearchResults(results);
        };
        filterResults();
    }, [
        searchJobCatagory,
        searchCustomerName,
        city,
        searchAddress,
        searchContact,
        searchJobType,
        searchDesc,
        approach,
        searchTechName,
    ]);

    let i = 1;

    // Function to calculate the total amount from the paymentData array
    function calculateTotalPaymentAmount(paymentData) {
        let totalAmount = 0;
        for (const payment of paymentData) {
            const amountString = payment.amount;
            const cleanedAmountString = amountString.replace(/[^\d.-]/g, "");
            const amount = parseFloat(cleanedAmountString);
            if (!isNaN(amount)) {
                totalAmount += amount;
            }
        }
        return totalAmount.toFixed(2); // Format the total amount with two decimal places
    }

    function calculatePendingPaymentAmount(paymentData, serviceCharge, GT, contractType) {
        const totalAmount = calculateTotalPaymentAmount(paymentData);

        const check = contractType === "AMC" ? serviceCharge[0]?.charge : GT
        const pendingAmount = totalAmount - parseFloat(check);

        return pendingAmount.toFixed(2); // Format the pending amount with two decimal places
    }

    const confirm = async (id) => {
        try {
            const config = {
                url: `/updatestatus/${id}`,
                method: "put",
                baseURL: apiURL,
                // data: formdata,
                headers: { "content-type": "application/json" },
                data: {
                    status: "confirm",
                },
            };
            await axios(config).then(function (response) {
                if (response.status === 200) {
                    window.location.assign(`/paymentfilterlist/${date}`);
                }
            });
        } catch (error) {
            console.error(error);
            alert("Somthing went wrong");
        }
    };
    const [totalGrandTotal, setTotalGrandTotal] = useState(0);
    const calculateColumnTotals = () => {
        let grandTotal = 0;

        searchResults.forEach((selectedData) => {
            // Calculate the grand total
            if (selectedData?.type === "userapp") {
                if (selectedData.dsrdata[0]?.jobComplete !== "CANCEL") {
                    grandTotal += Number(selectedData?.GrandTotal) || 0;
                }


            } else {
                if (selectedData.dsrdata[0]?.jobComplete !== "CANCEL") {
                    if (selectedData.dividedamtCharges.length > 0) {
                        grandTotal += Number(selectedData.dividedamtCharges[0].charge) || 0;
                    }
                }
            }
            // ... Calculate other totals for different columns similarly
        });

        // Update state with the calculated totals
        setTotalGrandTotal(grandTotal);
        // ... Update other state variables for different columns similarly
    };

    useEffect(() => {
        // Call the function to calculate totals when searchResults changes
        calculateColumnTotals();
    }, [searchResults]);

    useEffect(() => {
        // Call the function to calculate totals when searchResults changes
        calculateColumnTotals();
    }, [searchResults]);

    const calculateTotalAndCount = (searchResults, paymentModes) => {
        return searchResults?.reduce(
            (result, selectedData) => {
                const matchingPayments = selectedData?.paymentData?.filter(
                    (i) =>
                        i.paymentType === "Customer" &&
                        i.serviceId === selectedData._id &&
                        paymentModes.includes(i.paymentMode.toLowerCase())
                );

                const subtotal = matchingPayments.reduce(
                    (subtotal, payment) => subtotal + parseFloat(payment.amount),
                    0
                );

                return {
                    total: result.total + subtotal,
                    count: result.count + matchingPayments.length,
                };
            },
            { total: 0, count: 0 }
        );
    };

    const cashTotalInfo = calculateTotalAndCount(searchResults, ["cash"]);
    const cashTotal = cashTotalInfo.total;
    const cashCount = cashTotalInfo.count;

    const chequeTotalInfo = calculateTotalAndCount(searchResults, ["cheque"]);
    const chequeTotal = chequeTotalInfo.total;
    const chequeCount = chequeTotalInfo.count;

    const GooglePayTotalInfo = calculateTotalAndCount(searchResults, [
        "google pay",
    ]);
    const GooglePayTotal = GooglePayTotalInfo.total;
    const GooglePayCount = GooglePayTotalInfo.count;

    const PaytmTotalInfo = calculateTotalAndCount(searchResults, ["paytm"]);
    const PaytmTotal = PaytmTotalInfo.total;
    const PaytmCount = PaytmTotalInfo.count;

    const PhonePeTotalInfo = calculateTotalAndCount(searchResults, "phonepe");
    const PhonePeTotal = PhonePeTotalInfo.total;
    const PhonePeCount = PhonePeTotalInfo.count;

    const onlineTotalInfo = calculateTotalAndCount(searchResults, "online");
    const onlineTotal = onlineTotalInfo.total;
    const onlineCount = onlineTotalInfo.count;

    const NEFTTotalInfo = calculateTotalAndCount(searchResults, "neft");
    const NEFTTotal = NEFTTotalInfo.total;
    const NEFTCount = NEFTTotalInfo.count;

    const IMPSTotalInfo = calculateTotalAndCount(searchResults, "imps");
    const IMPSTotal = IMPSTotalInfo.total;
    const IMPSCount = IMPSTotalInfo.count;





    const exportData = () => {
        const fileName = "Payment_Report.xlsx";

        // Assuming each object in searchResults has properties like 'category' and 'img'
        const filteredData1 = searchResults?.map(item => ({
            date: date,
            category: item?.category,
            customerName: item?.customerData?.[0]?.customerName,
            city: item?.city,
            number: item?.customerData?.[0]?.mainContact,
            desc: item?.desc,
            amount: item?.GrandTotal,
            Technician: item?.dsrdata?.[0]?.TechorPMorVendorName,
            paymentmode: (item?.dsrdata?.[0]?.jobComplete === "CANCEL") ? "CANCEL" : (item?.paymentData?.[0]?.paymentMode)
        }));

        const worksheet = XLSX.utils.json_to_sheet(filteredData1);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Category Data");
        XLSX.writeFile(workbook, fileName);
    };



    return (
        <div className="web">
            <Header />

            <div></div>
            <div className="row m-auto">

                <div style={{ justifyContent: "center" }}>


                    <h4>Payment Reports</h4>
                    <div style={{ display: "grid" }}>

                        <DatePicker
                            value={values}
                            onChange={setValues}
                            range
                            animations={[size()]}
                            className="yellow"
                            style={{
                                backgroundColor: "#86b7fe",
                                height: "24px",
                                borderRadius: "8px",
                                fontSize: "14px",
                                padding: "15px 20px",
                                color: "black"
                            }}
                        />
                        <button
                            onClick={godaterange}
                            style={{
                                marginTop: " 10px",
                                borderRadius: "5px",
                                border: "none",
                                background: "#ffc107",
                                width: "200px"
                            }}>Search</button>
                    </div>

                    <button

                        className="ps-3 pt-2 pb-2 pe-3 ms-2"
                        style={{
                            border: 0,
                            color: "white",
                            backgroundColor: "#a9042e",
                            borderRadius: "5px",
                            width: "150px",
                            marginTop: "20px"
                        }}
                        onClick={exportData}
                    >
                        <i
                            class="fa-solid fa-download"
                            title="Download"
                        // style={{ color: "white", fontSize: "27px" }}
                        ></i>{" "}
                        Export
                    </button>

                </div>
                <div className="col-md-12">
                    <table style={{ width: "113%" }} class=" table-bordered mt-1">
                        <thead className="">
                            <tr className="table-secondary" style={{ background: "#e0a7a7" }}>
                                <th className="table-head" scope="col"></th>

                                <th className="table-head" style={{ width: "13%" }} scope="col">
                                    <select
                                        className="vhs-table-input"
                                        value={searchJobCatagory}
                                        onChange={(e) => setSearchJobCatagory(e.target.value)}
                                    >
                                        <option value="">Select</option>
                                        {[
                                            ...new Set(
                                                treatmentData.map((category) => category.category)
                                            ),
                                        ].map((uniquecategory) => (
                                            <option value={uniquecategory} key={uniquecategory}>
                                                {uniquecategory}
                                            </option>
                                        ))}
                                    </select>{" "}
                                </th>
                                <th scope="col" className="table-head"></th>

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
                                        {[...new Set(treatmentData.map((city) => city.city))].map(
                                            (uniqueCity) => (
                                                <option value={uniqueCity} key={uniqueCity}>
                                                    {uniqueCity}
                                                </option>
                                            )
                                        )}
                                    </select>{" "}
                                </th>

                                <th scope="col" style={{ width: "15%" }} className="table-head">
                                    <select
                                        className="vhs-table-input"
                                        value={approach}
                                        onChange={(e) => setApproach(e.target.value)}
                                    >
                                        <option value="">Select</option>
                                        {[
                                            ...new Set(
                                                treatmentData.map(
                                                    (item) => item.customerData[0]?.approach
                                                )
                                            ),
                                        ].map((uniqueApproach) => (
                                            <option value={uniqueApproach} key={uniqueApproach}>
                                                {uniqueApproach}
                                            </option>
                                        ))}
                                    </select>
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
                                    <input
                                        className="vhs-table-input"
                                        value={searchJobType}
                                        onChange={(e) => setSearchJobType(e.target.value)}
                                    />{" "}
                                </th>
                                <th scope="col" className="table-head">
                                    <input
                                        className="vhs-table-input"
                                        value={searchDesc}
                                        onChange={(e) => setSearchDesc(e.target.value)}
                                    />{" "}
                                </th>
                                <th className="table-head" scope="col"></th>
                                <th className="table-head" scope="col">
                                    <select
                                        className="vhs-table-input"
                                        value={searchTechName}
                                        onChange={(e) => setSearchTechName(e.target.value)}
                                    >
                                        <option value="">Select</option>
                                        {[
                                            ...new Set(
                                                treatmentData?.map(
                                                    (TECH) => TECH?.dsrdata[0]?.TechorPMorVendorName
                                                )
                                            ),
                                        ].map((uniqueTECH) => (
                                            <option value={uniqueTECH} key={uniqueTECH}>
                                                {uniqueTECH}
                                            </option>
                                        ))}
                                    </select>{" "}
                                </th>
                                <th className="table-head" scope="col"></th>
                                <th className="table-head" scope="col"></th>
                                {/* <th className="table-head" scope="col"></th> */}
                            </tr>
                            <tr className="table-secondary" style={{ background: "#e0a7a7" }}>
                                <th className="table-head" scope="col">
                                    Sr.No
                                </th>
                                <th className="table-head" scope="col">
                                    Category
                                </th>
                                <th className="table-head" scope="col">
                                    Payment Date
                                </th>

                                <th scope="col" className="table-head">
                                    Customer Name
                                </th>
                                <th scope="col" className="table-head">
                                    City
                                </th>
                                <th scope="col" className="table-head">
                                    Reference
                                </th>
                                <th scope="col" style={{ width: "15%" }} className="table-head">
                                    Address
                                </th>
                                <th scope="col" className="table-head">
                                    Contact No.
                                </th>

                                <th scope="col" className="table-head">
                                    Job Type
                                </th>
                                <th scope="col" className="table-head">
                                    Description
                                </th>

                                <th scope="col" className="table-head">
                                    Amount
                                </th>
                                <th scope="col" className="table-head">
                                    Technician
                                </th>
                                <th
                                    scope="col"
                                    className="table-head"
                                    style={{ minWidth: "160px" }}
                                >
                                    Status
                                </th>
                                <th
                                    scope="col"
                                    className="table-head"
                                    style={{ minWidth: "200px" }}
                                >
                                    Payment details
                                </th>

                                {/* <th scope="col" className="table-head">
                                    Action
                                </th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {searchResults.map((selectedData, index) => (
                                <tr
                                    className="user-tbale-body"
                                    style={{
                                        backgroundColor:
                                            selectedData?.status === "confirm"
                                                ? "orange"
                                                : selectedData.dsrdata[0]?.jobComplete === "CANCEL"
                                                    ? "rgb(186, 88, 88)"
                                                    : "white",
                                    }}
                                >
                                    <td>{startSerialNumber + index}</td>
                                    <td>{selectedData.category}</td>
                                    <td>{selectedData?.dividedamtDates[0]?.date}</td>

                                    <td>{selectedData.customerData[0]?.customerName}</td>

                                    <td>{selectedData.city}</td>

                                    {selectedData?.type === "userapp" ? (
                                        <td>user app</td>
                                    ) : (
                                        <td>{selectedData.customerData[0]?.approach}</td>
                                    )}

                                    {selectedData?.deliveryAddress ? (
                                        <td>
                                            {selectedData?.deliveryAddress?.platNo},
                                            {selectedData?.deliveryAddress?.landmark},
                                            {selectedData?.deliveryAddress?.address}
                                        </td>
                                    ) : (
                                        <td>
                                            {selectedData.customerData[0]?.rbhf},
                                            {selectedData.customerData[0]?.cnap},
                                            {selectedData.customerData[0]?.lnf}
                                        </td>
                                    )}
                                    <td>{selectedData.customerData[0]?.mainContact}</td>
                                    {/* <td>{dsrdata[0]?.techName}</td>

 <td>{dsrdata[0]?.workerName}</td> */}
                                    <td>{selectedData.service}</td>

                                    <td>{selectedData.desc}</td>

                                    {selectedData?.type === "userapp" ? (
                                        <td>{selectedData?.GrandTotal}</td>
                                    ) : (
                                        <td>
                                            {selectedData.dividedamtCharges.length > 0 && (
                                                <div>
                                                    <p>{selectedData.dividedamtCharges[0].charge}</p>
                                                </div>
                                            )}
                                        </td>
                                    )}
                                    <td>{selectedData?.dsrdata[0]?.TechorPMorVendorName}</td>
                                    {selectedData?.paymentMode === "online" ? (
                                        <td>
                                            {" "}
                                            <p style={{ color: "green" }}>PAYMENT COLLECTED</p>
                                        </td>
                                    ) : (
                                        <td>
                                            <b>
                                                {calculatePendingPaymentAmount(
                                                    selectedData.paymentData.filter(
                                                        (i) =>
                                                            i.paymentType === "Customer" &&
                                                            i.serviceId === selectedData._id &&
                                                            i.serviceDate === date
                                                    ),
                                                    selectedData.dividedamtCharges, selectedData?.GrandTotal, selectedData?.contractType
                                                ) == 0 ? (
                                                    <p style={{ color: "green" }}>PAYMENT COLLECTED</p>
                                                ) : (
                                                    <div>
                                                        {new Date(date) < new Date() ? (
                                                            <p
                                                                style={{
                                                                    background: "red",
                                                                    color: "white",
                                                                    width: "80px",
                                                                    textAlign: "center",
                                                                }}
                                                            >
                                                                Delayed
                                                            </p>
                                                        ) : (
                                                            "Pending"
                                                        )}
                                                    </div>
                                                )}
                                            </b>
                                            {fddata(selectedData?._id).map((item, index) => (
                                                <div>
                                                    {item.endJobTime ? (
                                                        <p
                                                            style={{
                                                                background: "purple",
                                                                color: "white",
                                                                padding: 2,
                                                                textAlign: "center",
                                                            }}
                                                        >
                                                            Updated by tech
                                                        </p>
                                                    ) : (
                                                        <p></p>
                                                    )}
                                                    {item.jobComplete === "YES" ? (
                                                        <p
                                                            style={{
                                                                background: "green",
                                                                color: "white",
                                                                padding: 2,
                                                                textAlign: "center",
                                                            }}
                                                        >
                                                            Closed by OPM{" "}
                                                        </p>
                                                    ) : (
                                                        ""
                                                    )}{" "}
                                                    <div>{ }</div>
                                                </div>
                                            ))}
                                        </td>
                                    )}

                                    <td>
                                        {selectedData.paymentData.some(
                                            (i) =>
                                                i.paymentType === "Customer" &&
                                                i.serviceId === selectedData._id
                                            // &&
                                            // i.serviceDate === date
                                        ) ? (
                                            <div>
                                                {selectedData.paymentData
                                                    .filter(
                                                        (i) =>
                                                            i.paymentType === "Customer" &&
                                                            i.serviceId === selectedData._id
                                                        // &&
                                                        // i.serviceDate === date
                                                    )
                                                    .map((i) => (
                                                        <p key={i._id} className="mb-0 text-right">
                                                            ({i.paymentDate}) {i.amount}({i.paymentMode})
                                                        </p>
                                                    ))}
                                                <div>
                                                    <hr className="mb-0 mt-0" />
                                                    <p className="mb-0 text-right">
                                                        <b>
                                                            Total:{" "}
                                                            {calculateTotalPaymentAmount(
                                                                selectedData.paymentData.filter(
                                                                    (i) =>
                                                                        i.serviceId === selectedData._id &&
                                                                        i.paymentType === "Customer"
                                                                    // &&
                                                                    // i.serviceDate === date
                                                                )
                                                            )}
                                                        </b>
                                                    </p>
                                                    <p className="text-right">
                                                        <b>
                                                            Pending:{" "}
                                                            {calculatePendingPaymentAmount(
                                                                selectedData.paymentData.filter(
                                                                    (i) =>
                                                                        i.paymentType === "Customer" &&
                                                                        i.serviceId === selectedData._id
                                                                    // &&
                                                                    // i.serviceDate === date
                                                                ),
                                                                selectedData.dividedamtCharges, selectedData?.GrandTotal, selectedData?.contractType
                                                            )}
                                                        </b>
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <p></p>
                                        )}
                                    </td>
                                  
                                </tr>
                            ))}
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>{totalGrandTotal}</td>
                                <td></td>

                                <td>
                                    <b>
                                        Online (
                                        {onlineCount +
                                            PaytmCount +
                                            PhonePeCount +
                                            NEFTCount +
                                            IMPSCount +
                                            GooglePayCount}
                                        ):{" "}
                                        {(
                                            onlineTotal +
                                            PaytmTotal +
                                            PhonePeTotal +
                                            GooglePayTotal +
                                            NEFTTotal +
                                            IMPSTotal
                                        ).toFixed(2)}
                                    </b>
                                    <br />
                                    <b>
                                        Cash ({cashCount}): {cashTotal.toFixed(2)}
                                    </b>
                                    <br />
                                    <b>
                                        Cheque ({chequeCount}): {chequeTotal.toFixed(2)}
                                    </b>
                                </td>
                            </tr>
                        </tbody>
                    </table>{" "}
                </div>
            </div>
        </div>
    );
}

export default Reports_payments;
