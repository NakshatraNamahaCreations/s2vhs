// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import DataTable from "react-data-table-component";
// import AudioPlayer from './AudioPlayer';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import moment from "moment";

// import { styled } from '@mui/material/styles';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import { TablePagination } from '@mui/material';
// function Callerdesk() {

//     const StyledTableCell = styled(TableCell)(({ theme }) => ({
//         [`&.${tableCellClasses.head}`]: {
//             backgroundColor: theme.palette.common.black,
//             color: theme.palette.common.white,
//         },
//         [`&.${tableCellClasses.body}`]: {
//             fontSize: 14,
//         },
//     }));

//     const StyledTableRow = styled(TableRow)(({ theme }) => ({
//         '&:nth-of-type(odd)': {
//             backgroundColor: theme.palette.action.hover,
//         },
//         // hide last border
//         '&:last-child td, &:last-child th': {
//             border: 0,
//         },
//     }));

//     function createData(name, calories, fat, carbs, protein) {
//         return { name, calories, fat, carbs, protein };
//     }

//     const [hit, sethit] = useState(false);
//     const admin = JSON.parse(sessionStorage.getItem("admin"));
//     const [cusNum, setcusNum] = useState('')
//     const [latestEnquiryId, setLatestEnquiryId] = useState(0);
//     const [whatsappTemplate, setWhatsappTemplate] = useState("");
//     const [enquirydate, setenquirydate] = useState(moment().format("MM-DD-YYYY"));
//     // const [CallReportData, setCallReportData] = useState([])
//     const [name, setname] = useState("");
//     const [email, setemail] = useState("");
//     const [contact1, setcontact1] = useState(cusNum);
//     const [contact2, setcontact2] = useState("");
//     const [address, setaddress] = useState("");
//     const [city, setcity] = useState("");
//     const [category, setcategory] = useState("");
//     const [reference1, setreference1] = useState("");
//     const [reference2, setreference2] = useState("");
//     const [reference3, setreference3] = useState("");
//     const [comment, setcomment] = useState("");

//     const [serivceName, setSeviceName] = useState("");
//     const [serivceId, setSeviceId] = useState("");
//     const apiURL = process.env.REACT_APP_API_URL;

//     const [referecetypedata, setreferecetypedata] = useState([]);

//     const [whatsappdata, setwhatsappdata] = useState([]);
//     const [serviceData, setServiceData] = useState([]);

//     const handleInputChange = (e) => {
//         // Remove any non-numeric characters
//         const numericValue = e.target.value.replace(/\D/g, "");

//         // Limit the input to 10 characters
//         const limitedValue = numericValue.slice(0, 10);

//         setcontact1(limitedValue);
//     };

//     useEffect(() => {
//         getenquiry();
//     }, []);

//     const getenquiry = async () => {
//         let res = await axios.get(apiURL + "/getenquirydatlast");
//         if (res.status === 200) {
//             setLatestEnquiryId(res.data?.enquiryadd?.EnquiryId);
//         }
//     };

//     useEffect(() => {
//         getwhatsapptemplate();
//     }, []);

//     const getwhatsapptemplate = async () => {
//         let res = await axios.get(apiURL + "/getwhatsapptemplate");
//         if (res.status === 200) {
//             setwhatsappdata(res.data?.whatsapptemplate);
//         }
//     };

//     let getTemplateDatails = whatsappdata.find(
//         (item) => item.templatename === "Enquiry Add"
//     );

//     const getServiceByCategory = async () => {
//         try {
//             let res = await axios.post(apiURL + `/userapp/getservicebycategory/`, {
//                 category,
//             });
//             if (res.status === 200) {
//                 setServiceData(res.data?.serviceData);
//             } else {
//                 setServiceData([]);
//             }
//         } catch (error) {
//             console.log("err", error);
//         }
//     };
//     useEffect(() => {
//         getServiceByCategory();
//     }, [category]);

//     const addenquiry = async (e) => {
//         e.preventDefault();

//         if (
//             !name ||
//             !cusNum ||
//             !city ||
//             !category ||
//             !reference1 ||
//             !serivceName
//         ) {
//             alert("Please enter all fields");
//         } else {
//             sethit(true);
//             try {
//                 const config = {
//                     url: "/addnewenquiry",
//                     method: "post",
//                     baseURL: apiURL,
//                     // data: formdata,
//                     headers: { "content-type": "application/json" },
//                     data: {
//                         date: enquirydate,
//                         executive: admin?.displayname,
//                         name: name,
//                         Time: moment().format("h:mm:ss a"),
//                         mobile: cusNum,
//                         email: email,
//                         contact2: contact2,
//                         address: address,
//                         category: category,
//                         reference1: reference1,
//                         reference2: reference2,
//                         city: city,
//                         reference3: reference3,
//                         comment: comment,
//                         intrestedfor: serivceName,
//                         serviceID: serivceId,
//                         responseType: getTemplateDatails,
//                     },
//                 };
//                 await axios(config).then(function (response) {
//                     if (response.status === 200) {
//                         const enquiryId = response.data.data.EnquiryId;
//                         const data = response.data.data;

//                         const queryString = new URLSearchParams({
//                             enquiryData: JSON.stringify(data),
//                         }).toString();
//                         const newTab = window.open(
//                             `/enquirydetail/${enquiryId}?${queryString}`,
//                             "_blank"
//                         );

//                         makeApiCall(getTemplateDatails, cusNum);
//                         sethit(false);
//                     }
//                 });
//             } catch (error) {
//                 console.error(error);
//                 sethit(false);
//                 if (error.response) {
//                     alert(error.response.data.error); // Display error message from the API response
//                 } else {
//                     alert("An error occurred. Please try again later.");
//                 }
//             }
//         }
//     };

//     const makeApiCall = async (selectedResponse, contactNumber) => {
//         const apiURL =
//             "https://wa.chatmybot.in/gateway/waunofficial/v1/api/v2/message";
//         const accessToken = "c7475f11-97cb-4d52-9500-f458c1a377f4";

//         const contentTemplate = selectedResponse?.template || "";

//         if (!contentTemplate) {
//             console.error("Content template is empty. Cannot proceed.");
//             return;
//         }

//         const content = contentTemplate.replace(/\{Customer_name\}/g, name);
//         const contentWithNames = content.replace(
//             /\{Executive_name\}/g,
//             admin?.displayname
//         );
//         const contentWithMobile = contentWithNames.replace(
//             /\{Executive_contact\}/g,
//             admin?.contactno
//         );

//         // Replace <p> with line breaks and remove HTML tags
//         const convertedText = contentWithMobile
//             .replace(/<p>/g, "\n")
//             .replace(/<\/p>/g, "")
//             .replace(/<br>/g, "\n")
//             .replace(/&nbsp;/g, "")
//             .replace(/<strong>(.*?)<\/strong>/g, "<b>$1</b>")
//             .replace(/<[^>]*>/g, "");
//         const requestData = [
//             {
//                 dst: "91" + contactNumber,
//                 messageType: "0",
//                 textMessage: {
//                     content: convertedText,
//                 },
//             },
//         ];
//         try {
//             const response = await axios.post(apiURL, requestData, {
//                 headers: {
//                     "access-token": accessToken,
//                     "Content-Type": "application/json",
//                 },
//             });

//             if (response.status === 200) {

//                 setWhatsappTemplate(response.data);
//             } else {
//                 console.error("API call unsuccessful. Status code:", response.status);
//             }
//         } catch (error) {
//             console.error("Error making API call:", error);
//         }
//     };

//     useEffect(() => {
//         getreferencetype();
//     }, []);

//     const getreferencetype = async () => {
//         let res = await axios.get(apiURL + "/master/getreferencetype");
//         if ((res.status = 200)) {
//             setreferecetypedata(res.data?.masterreference);
//         }
//     };
//     const [show, setShow] = useState(false);

//     const handleClose = () => setShow(false);
//     const handleShow = (cusNum) => {
//         setShow(true);
//         setcusNum(cusNum.substring(1))
//     }
//     const [Livedata, setLivedata] = useState([]);
//     const [TotalLength, setTotalLength] = useState([]);

//     useEffect(() => {
//         getLivecalls();
//     }, []);

//     const getLivecalls = async () => {
//         let res = await axios.get("https://app.callerdesk.io/api/live_call_v2?authcode=19312ab5442e86147609cc6784aaf3c2");
//         if (res.status === 200) {

//             setTotalLength(res.data?.total_live_calls)
//             setLivedata(res.data?.live_calls.filter((i) => i.member_name === admin?.displayname));
//         }

//     };
//     const [memberName, setMemberName] = useState('');
//     // useEffect(() => {
//     //     const filteredData = Livedata.filter((item) => item.callstatus === "Picked");
//     //     if (filteredData.length > 0) {
//     //         setMemberName(filteredData[0].msisdn); // Assuming member_name is the property you want to display
//     //         setShow(true);
//     //     } else {
//     //         setShow(false);
//     //     }
//     // }, [Livedata]);

//     const [page, setPage] = useState(1);
//     const [rowsPerPage, setRowsPerPage] = useState(25);
//     const [totalNoData, setTotalNoData] = useState(0);
//     const [callReportData, setCallReportData] = useState([]);

//     const handleChangePage = (event, newPage) => {
//         console.log("newPage",newPage)
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.post(`https://app.callerdesk.io/api/call_list_v2?authcode=19312ab5442e86147609cc6784aaf3c2&current_page=${page}`);

//                 setCallReportData(response.data?.result || []);
//                 setTotalNoData(response.data?.total || 0);
//             } catch (error) {
//                 console.log(error);
//             }
//         };

//         fetchData();
//     }, [page]);

//     return (
//         <div className='web'>

//                 <h4> Call logs</h4>

//             <div>
//             <TableContainer component={Paper} sx={{ width: '100%' }}>
//                     <Table aria-label=" table">
//                         <TableHead>
//                             <TableRow>
//                                 <StyledTableCell>S.No</StyledTableCell>
//                                 <StyledTableCell align="right">DESKPHONE</StyledTableCell>
//                                 <StyledTableCell align="right">CALLER</StyledTableCell>
//                                 <StyledTableCell align="right">MEMBER</StyledTableCell>
//                                 <StyledTableCell align="right">CALL GROUP</StyledTableCell>
//                                 <StyledTableCell align="right">DATE TIME</StyledTableCell>
//                                 <StyledTableCell align="right">DURATION</StyledTableCell>
//                                 <StyledTableCell align="right">STATUS</StyledTableCell>
//                                 <StyledTableCell align="right">CALL STATUS</StyledTableCell>
//                                 <StyledTableCell align="right">CIRCLE</StyledTableCell>
//                                 <StyledTableCell align="right">ACTION</StyledTableCell>

//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {callReportData?.map((row, index) => (
//                                 <StyledTableRow key={row.name}>
//                                     <StyledTableCell component="th" scope="row">
//                                         {index + 1}
//                                     </StyledTableCell>
//                                     <StyledTableCell align="right">{row.deskphone}</StyledTableCell>
//                                     <StyledTableCell align="right">{row.caller_num}</StyledTableCell>
//                                     <StyledTableCell align="right">{row.member_name}</StyledTableCell>
//                                     <StyledTableCell align="right">{row.group_name}</StyledTableCell>
//                                     <StyledTableCell align="right">{row.call_date}</StyledTableCell>
//                                     <StyledTableCell align="right">{row.total_duration}</StyledTableCell>
//                                     <StyledTableCell align="right" className={row.callresult == "Answered" ? 'badgeico' : 'rcl'}>{row.callresult}</StyledTableCell>
//                                     <StyledTableCell align="right">{row.callstatus}</StyledTableCell>

//                                     <StyledTableCell align="right">{row.circle}</StyledTableCell>
//                                     <StyledTableCell align="right"> <i class="fa-solid fa-arrow-up-from-bracket" onClick={() => handleShow(row.caller_num)}></i></StyledTableCell>

//                                 </StyledTableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//                 <TablePagination
//                     // rowsPerPageOptions={[25, 50, 100]}
//                     component="div"
//                     count={totalNoData}
//                     rowsPerPage={rowsPerPage}
//                     page={page}
//                     onPageChange={handleChangePage}
//                     // onRowsPerPageChange={handleChangeRowsPerPage}
//                 />
//             </div>

//             <>

//                 <Modal show={show} onHide={handleClose}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>Enquiry</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>

//                         <div className="row m-auto">
//                             <div className="col-md-12">
//                                 <div className="card" style={{ marginTop: "20px" }}>
//                                     <div className="card-body p-4">
//                                         <form>
//                                             <div className="row">
//                                                 <div className="col-md-4">
//                                                     <div className="vhs-sub-heading">Enquiry ID :</div>
//                                                     <div className="group pt-1 vhs-non-editable">
//                                                         {latestEnquiryId ? latestEnquiryId + 1 : 1}{" "}
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-md-4">
//                                                     <div className="vhs-input-label">Enquiry Date</div>
//                                                     <div className="group pt-1 vhs-non-editable">
//                                                         {enquirydate}
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-md-4">
//                                                     <div className="vhs-input-label">
//                                                         {" "}
//                                                         Executive
//                                                         <span className="text-danger"> *</span>
//                                                     </div>
//                                                     <div className="group pt-1 vhs-non-editable">
//                                                         {admin?.displayname}
//                                                     </div>
//                                                 </div>
//                                             </div>

//                                             <div className="row pt-3">
//                                                 <div className="col-md-4">
//                                                     <div className="vhs-input-label">
//                                                         Name
//                                                         <span className="text-danger">*</span>
//                                                     </div>
//                                                     <div className="group pt-1">
//                                                         <input
//                                                             type="text"

//                                                             className="col-md-12 vhs-input-value"
//                                                             onChange={(e) => setname(e.target.value)}
//                                                         />
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-md-4">
//                                                     <div className="vhs-input-label">
//                                                         Email Id
//                                                         <span className="text-danger">*</span>
//                                                     </div>
//                                                     <div className="group pt-1">
//                                                         <input
//                                                             type="email"
//                                                             className="col-md-12 vhs-input-value"
//                                                             onChange={(e) => setemail(e.target.value)}
//                                                         />
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-md-4">
//                                                     <div className="vhs-input-label">
//                                                         Contact 1<span className="text-danger">*</span>
//                                                     </div>
//                                                     <div className="group pt-1">
//                                                         <input
//                                                             type="number"
//                                                             // defaultValue={cusNum}
//                                                             className="col-md-12 vhs-input-value"
//                                                             value={cusNum}
//                                                             onInput={handleInputChange}
//                                                         />
//                                                     </div>
//                                                 </div>
//                                             </div>

//                                             <div className="row pt-3">
//                                                 <div className="col-md-4">
//                                                     <div className="vhs-input-label">Contact 2</div>
//                                                     <div className="group pt-1">
//                                                         <input
//                                                             type="text"
//                                                             className="col-md-12 vhs-input-value"
//                                                             onChange={(e) => setcontact2(e.target.value)}
//                                                         />
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-md-4">
//                                                     <div className="vhs-input-label">Address</div>
//                                                     <div className="group pt-1">
//                                                         <textarea
//                                                             rows={4}
//                                                             cols={5}
//                                                             className="col-md-12 vhs-input-value"
//                                                             onChange={(e) => setaddress(e.target.value)}
//                                                         />
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-md-4">
//                                                     <div className="vhs-input-label">
//                                                         City <span className="text-danger">*</span>
//                                                     </div>
//                                                     <div className="group pt-1">
//                                                         <select
//                                                             className="col-md-12 vhs-input-value"
//                                                             onChange={(e) => setcity(e.target.value)}
//                                                         >
//                                                             <option>--select--</option>
//                                                             {admin?.city.map((item) => (
//                                                                 <option value={item.name}>{item.name}</option>
//                                                             ))}
//                                                         </select>
//                                                     </div>
//                                                 </div>
//                                             </div>

//                                             <div className="row pt-3">
//                                                 <div className="col-md-4">
//                                                     <div className="vhs-input-label">
//                                                         Category <span className="text-danger">*</span>
//                                                     </div>
//                                                     <div className="group pt-1">
//                                                         <select
//                                                             className="col-md-12 vhs-input-value"
//                                                             onChange={(e) => setcategory(e.target.value)}
//                                                         >
//                                                             <option>--select--</option>

//                                                             {admin?.category.map((category, index) => (
//                                                                 <option key={index} value={category.name}>
//                                                                     {category.name}
//                                                                 </option>
//                                                             ))}
//                                                         </select>
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-md-4">
//                                                     <div className="vhs-input-label">
//                                                         Reference
//                                                         <span className="text-danger"> *</span>
//                                                     </div>
//                                                     <div className="group pt-1">
//                                                         <select
//                                                             className="col-md-12 vhs-input-value"
//                                                             onChange={(e) => setreference1(e.target.value)}
//                                                         >
//                                                             <option>--select--</option>
//                                                             {referecetypedata.map((item) => (
//                                                                 <option value={item.referencetype}>
//                                                                     {item.referencetype}
//                                                                 </option>
//                                                             ))}
//                                                         </select>
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-md-4">
//                                                     <div className="vhs-input-label"> Reference 2</div>
//                                                     <div className="group pt-1">
//                                                         <textarea
//                                                             rows={4}
//                                                             cols={5}
//                                                             className="col-md-12 vhs-input-value"
//                                                             onChange={(e) => setreference2(e.target.value)}
//                                                         />
//                                                     </div>
//                                                 </div>
//                                             </div>

//                                             <div className="row pt-3">
//                                                 <div className="col-md-4">
//                                                     <div className="vhs-input-label"> Reference 3</div>
//                                                     <div className="group pt-1">
//                                                         <textarea
//                                                             rows={4}
//                                                             cols={5}
//                                                             className="col-md-12 vhs-input-value"
//                                                             onChange={(e) => setreference3(e.target.value)}
//                                                         />
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-md-4">
//                                                     <div className="vhs-input-label"> Comment</div>
//                                                     <div className="group pt-1">
//                                                         <textarea
//                                                             rows={4}
//                                                             cols={5}
//                                                             className="col-md-12 vhs-input-value"
//                                                             onChange={(e) => setcomment(e.target.value)}
//                                                         />
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-md-4">
//                                                     <div className="vhs-input-label">
//                                                         Interested For
//                                                         <span className="text-danger"> *</span>
//                                                     </div>
//                                                     <div className="group pt-1">
//                                                         <select
//                                                             className="col-md-12 vhs-input-value"
//                                                             onChange={(e) => {
//                                                                 const selectedService = serviceData.find(
//                                                                     (item) => item._id === e.target.value
//                                                                 );
//                                                                 setSeviceId(e.target.value);
//                                                                 setSeviceName(
//                                                                     selectedService ? selectedService.serviceName : ""
//                                                                 );
//                                                             }}

//                                                         >
//                                                             <option>---SELECT---</option>
//                                                             {serviceData.map((item) => (
//                                                                 <option key={item.id} value={item._id}>
//                                                                     {item.Subcategory} - {item.serviceName}
//                                                                 </option>
//                                                             ))}
//                                                         </select>
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-md-4"></div>
//                                             </div>

//                                             {/* <div className="row pt-3 justify-content-center">
//                                                 <div className="col-md-2">
//                                                     <button className="vhs-button" onClick={addenquiry}>
//                                                         Save
//                                                     </button>
//                                                 </div>
//                                                 <div className="col-md-2">
//                                                     <button className="vhs-button mx-3">Cancel</button>
//                                                 </div>
//                                             </div> */}
//                                         </form>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={handleClose}>
//                             Close
//                         </Button>
//                         <Button variant="primary" onClick={addenquiry}>
//                             Save Changes
//                         </Button>
//                     </Modal.Footer>
//                 </Modal>
//             </>
//         </div>
//     )
// }

// export default Callerdesk

import React from "react";

function Callerdesk() {
  return <div>Callerdesk</div>;
}

export default Callerdesk;
