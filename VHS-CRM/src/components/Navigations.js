import "../App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Login from "../components/Login";
import Home from "../components/Home";
import User from "../components/User";
import Vendor from "../components/Vendor";
import Master from "../components/Master";
import Servicetype from "../components/Tab/Servicetype";
import Jobcategory from "../components/Tab/Jobcategory";
import City from "../components/Tab/City";
import Expensetype from "../components/Tab/Expensetype";
import Itemgroup from "../components/Tab/Itemgroup";
import Item from "../components/Tab/Item";
import Customertype from "../components/Tab/Customertype";
import Reference from "../components/Tab/Reference";
import Area from "../components/Tab/Area";
import Termsgroup from "../components/Tab/Termsgroup";
import Terms from "../components/Tab/Terms";
import Whatsapptemplate from "../components/Tab/Whatsapptemplate";
import Milesstone from "../components/Tab/Milesstone";
import B2Btype from "../components/Tab/B2Btype";
import UserEdit from "../components/Tab/UserEdit";
import Userchangepassword from "../components/Tab/Userchangepassword";
import Userrights from "../components/Userrights";
import Enquiry from "../components/Enquiry";
import Enquiryfollowup from "../components/Enquiryfollowup";
import Survey from "../components/Survey";
import Quote from "../components/Quote";
import Quotefollowup from "../components/Quotefollowup";
import DSR from "../components/DSR";
import RunningProject from "../components/RunningProject";
import Closeproject from "../components/Closeproject";
import B2B from "../components/B2B";
import Community from "../components/Community";
import Reports from "../components/Reports";
import Technician from "../components/Tab/Technician";
import Enquirynewdetail from "../components/Tab/Enquirynewdetail";
import Customer from "../components/Customer";
import Calender from "../components/Calender";
import Vendordetails from "../components/Tab/Vendordetails";
import Communitypayments from "../components/Tab/Communitypayment";
import Communityedit from "../components/Tab/Communityedit";
import Communitypassword from "../components/Tab/Communitypassword";
import Loginindex from "../components/Loginindex";
import Quotationterm from "../components/Tab/Quotationterm";
import Services from "../components/Tab/Services";
import Nav1 from "../components/Nav1";
import Category from "../components/Tab/Category";
import Responce from "../components/Tab/Responce";
import Quotationformat from "../components/Tab/Quotationformat";
import Quotationformat1 from "../components/Tab/Quotationformat1";
import Aregion from "../components/Tab/Aregion";
import Ajob from "../components/Tab/Ajob";
import Amaterial from "../components/Tab/Amaterial";
import Customeradd from "../components/Tab/Customeradd";
import Customersearch from "../components/Tab/Customersearch";
import Customerimport from "../components/Tab/Customerimport";
import Customersend from "../components/Tab/Customersend";
import Customerschedule from "../components/Tab/Customerschedule";
import Enquiryadd from "../components/Tab/Enquiryadd";
import Enquirynew from "../components/Tab/Enquirynew";
import Enquirysearch from "../components/Tab/Enquirysearch";
import B2badd from "../components/Tab/B2badd";
import Importexport from "../components/Tab/Importexport";
import B2bsearch from "../components/Tab/B2bsearch";
import B2btemplate from "../components/Tab/B2btemplate";
import B2bschedule from "../components/Tab/B2bschedule";
import DSRcategory from "../components/Tab/DSRcategory";
import DSRtoday from "../components/Tab/DSRtoday";
import DSRtommorow from "../components/Tab/DSRtommorow";
import DSRyesderday from "../components/Tab/DSRyesderday";
import DSRsearch from "../components/Tab/DSRsearch";
import Quotecategory from "../components/Tab/Quotecategory";
import Quotedetails from "../components/Tab/Quotedetails";
import Surveycategory from "../components/Tab/Surveycategory";
import Surveysearch from "../components/Tab/Surveysearch";
import Surveycancel from "../components/Tab/Surveycancel";
import Quotetoday from "../components/Tab/Quotetoday";
import Quotetommorow from "../components/Tab/Quotetommorow";
import Quoteyesterday from "../components/Tab/Quoteyesterday";
import Quotethisweek from "../components/Tab/Quotethisweek";
import Quotelastweek from "../components/Tab/Quotelastweek";
import Quotenextweek from "../components/Tab/Quotenextweek";
import Quotethismonth from "../components/Tab/Quotethismonth";
import Quotecall from "../components/Tab/Quotecall";
import Quoteconfirm from "../components/Tab/Quoteconfirm";
import Quotenot from "../components/Tab/Quotenot";
import Quotesend from "../components/Tab/Quotesend";
import Quotetemplate from "../components/Tab/Quotetemplate";
import Etoday from "../components/Tab/Etoday";
import Etommorow from "../components/Tab/Etommorow";
import Eyesterday from "../components/Tab/Eyesterday";
import Ethisweek from "../components/Tab/Ethisweek";
import Elastweek from "../components/Tab/Elastweek";
import Enextweek from "../components/Tab/Enextweek";
import Ethismonth from "../components/Tab/Ethismonth";
import Ecallletter from "../components/Tab/Ecallletter";
import Econfirmed from "../components/Tab/Econfirmed";
import Enotintrested from "../components/Tab/Enotintrested";
import Esend from "../components/Tab/Esend";
import Etemplate from "../components/Tab/Etemplate";
import Region from "../components/Tab/Region";
import Newqt from "../components/Tab/newqt";
import Termscondition from "../components/Tab/Termscondition";
import Format from "../components/Tab/Format";
import Addbank from "../components/Tab/Addbank";
import Enquiryedit from "../components/Tab/Enquiryedit";
import Convertcustomer from "../components/Convercustomer";
import Createquote from "../components/Createquote";
import Quoteadd from "../components/Quoteadd";
import Stoday from "../components/Stoday";
import Surveydetails from "../components/Surveydetails";
import Qheader from "../components/Qheader";
import Qfooter from "../components/Qfooter";
import Enquirydatatable from "../components/Tab/Enquirydatatable";
import Surveydatatable from "../components/Surveydatatable";
import Quotesearch from "../components/Quotesearch";
import Customersearchdetails from "../components/Customersearchdetails";
import Termsgroup2 from "../components/Tab/Termsgroup2";
import Contextdata from "../components/Contextdata";
import Dsrdetails from "../components/Dsrdetails";
import Dsrcallist from "../components/Dsrcallist";
import Addcall from "../components/Addcall";
import Servicebill from "../components/Servicebill";
import Painting from "../components/Painting";
import Payment from "../components/Payment";
import Work from "../components/Work";
// import Services from "../components/Services";
import Customersernav from "../components/Customersernav";
// import Cservices from "../components/Cservices";
import Dsrquote from "../components/Dsrquote";
import Quotedatatable from "../components/Quotedatatable";
import Communityrights from "../components/Communityrights";
import Customeredit from "../components/Customeredit";
import Quotecalldatatable from "../components/Quotecalldatatable";
import ReportCatagory from "../components/Report/ReportCatagory";
import ReportDSR from "../components/Report/ReportDSR";
import ReportEnquiry from "../components/Report/ReportEnquiry";
import ReportQuotation from "../components/Report/ReportQuotation";
import ReportRunningProjects from "../components/Report/ReportRunningProjects";
import ReportSurvey from "../components/Report/ReportSurvey";
import Treatment from "../components/Treatment";
import Payment_Reports from "../components/Payment_Reports";
import B2Bdetails from "../components/B2Bdetails";
import B2Bedit from "../components/B2Bedit";
import Paymentcalender from "../components/Paymentcalender";
import Paymentfilterlist from "../components/Paymentfilterlist";
import Quoteappconfirmed from "../components/Quoteappconfirmed";
import Paymentfulldetails from "../components/Paymentfulldetails";
import OneCommunityReports from "../components/OneCommunityReports";
import Report_B2B from "../components/Report/Report_B2B";
import Report_1Community from "../components/Report/Report_1Community";
import Paymentinvoice from "../components/Paymentinvoice";
import SendMessages from "../components/SendMessages";
import DSR_Invoice from "../components/DSR_Invoice";
import Test from "../components/Test";
import New from "../components/Tab/New";
import Quotations from "../components/Tab/Quotations";
import Today from "../components/Tab/Today";
import Customersearchdetailsqote from "../components/Customersearchdetailsqote";
import Pmaterial from "../components/Tab/Pmaterial";
import Reports_payments from "../components/Report/Reports_payments";
import Report_closedp from "../components/Report/Report_closedp";
import Outsidevendor from "../components/Tab/Outsidevendor";
import Callerdesk from "../components/Callerdesk";

function Navigations() {
  const admin = JSON.parse(sessionStorage.getItem("admin"));
  return (
    <BrowserRouter basename="">
      <Routes>
        <Route path="/quotations" element={<Quotations />} />

        {admin === null ? (
          <Route path="/" element={<Login />} />
        ) : (
          <>
            <Route element={<Loginindex />}>
              <Route path="/user" element={<User />} />
              <Route path="/vendor" element={<Vendor />} />
              <Route path="/master" element={<Master />} />
              <Route path="/servicetype" element={<Servicetype />} />
              <Route path="/services" element={<Services />} />
              <Route path="/jobcategory" element={<Jobcategory />} />
              <Route path="/City" element={<City />} />
              <Route path="/callerdesk" element={<Callerdesk />} />
              <Route path="/expensetype" element={<Expensetype />} />
              <Route path="/itemgroup" element={<Itemgroup />} />
              <Route path="/item" element={<Item />} />
              <Route path="/customertype" element={<Customertype />} />
              <Route path="/reference" element={<Reference />} />
              <Route path="/area" element={<Area />} />
              <Route path="/termsgroup" element={<Termsgroup />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/web" element={<Whatsapptemplate />} />
              <Route path="/milesstone" element={<Milesstone />} />
              <Route path="/b2btype" element={<B2Btype />} />
              <Route path="/useredit" element={<UserEdit />} />
              <Route path="/chagepassword" element={<Userchangepassword />} />
              <Route path="/userrights" element={<Userrights />} />
              <Route path="/home" element={<Home />} />
              <Route path="/enquiry" element={<Enquiry />} />
              <Route path="/enquiryfollowup" element={<Enquiryfollowup />} />
              <Route path="/survey" element={<Survey />} />
              <Route path="/quote" element={<Quote />} />
              <Route path="/quotefollowup" element={<Quotefollowup />} />
              <Route path="/dsr" element={<DSR />} />
              <Route path="/runningproject" element={<RunningProject />} />
              <Route path="/closedproject" element={<Closeproject />} />
              <Route path="/b2b" element={<B2B />} />
              <Route path="/community" element={<Community />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/technician" element={<Technician />} />
              <Route path="/vendors" element={<Outsidevendor />} />

              <Route
                path="/enquirydetail/:EnquiryId"
                element={<Enquirynewdetail />}
              />
              <Route path="/customer" element={<Customer />} />
              <Route path="/calender" element={<Calender />} />
              <Route path="/vendordetail" element={<Vendordetails />} />
              <Route
                path="/communitypayments"
                element={<Communitypayments />}
              />
              <Route path="/communityedit" element={<Communityedit />} />
              <Route
                path="/communitypassword"
                element={<Communitypassword />}
              />
              <Route path="/communityrights" element={<Communityrights />} />
              <Route path="/nav" element={<Nav1 />} />
              <Route path="/technisian" element={<Technician />} />
              <Route path="/category" element={<Category />} />
              <Route path="/services" element={<Services />} />
              <Route path="/responce" element={<Responce />} />
              <Route path="/whatsapp" element={<Whatsapptemplate />} />
              <Route path="/b2btype" element={<B2Btype />} />
              <Route path="/quotationformat" element={<Quotationformat />} />
              <Route path="/quotationformat1" element={<Quotationformat1 />} />
              <Route path="/aregion" element={<Aregion />} />
              <Route path="/amaterial" element={<Amaterial />} />
              <Route path="/ajob" element={<Ajob />} />
              <Route path="/customeradd" element={<Customeradd />} />
              <Route path="/customersearch" element={<Customersearch />} />
              <Route path="/customerimport" element={<Customerimport />} />
              <Route path="/customersend" element={<Customersend />} />
              <Route path="/customerschedule" element={<Customerschedule />} />
              <Route path="/enquiryadd" element={<Enquiryadd />} />
              <Route path="/enquirynew" element={<Enquirynew />} />
              <Route path="/enquirysearch" element={<Enquirysearch />} />
              <Route path="/b2badd" element={<B2badd />} />
              <Route path="/b2bimport" element={<Importexport />} />
              <Route path="/b2bsearch" element={<B2bsearch />} />
              <Route path="/b2btemplate" element={<B2btemplate />} />
              <Route path="/b2bschedule" element={<B2bschedule />} />
              <Route path="/dsrcategory" element={<DSRcategory />} />
              <Route path="/dsrtoday" element={<DSRtoday />} />
              <Route path="/dsrtommorow" element={<DSRtommorow />} />
              <Route path="/dsryesterday" element={<DSRyesderday />} />
              <Route path="/dsrsearch" element={<DSRsearch />} />
              <Route path="/quotecategory" element={<Quotecategory />} />
              <Route path="/quotedetails" element={<Quotedetails />} />
              <Route path="/surveycategory" element={<Surveycategory />} />
              <Route path="/surveysearch" element={<Surveysearch />} />
              <Route path="/surveycancel" element={<Surveycancel />} />
              <Route path="/quotetoday" element={<Quotetoday />} />
              <Route path="/quotetommorow" element={<Quotetommorow />} />
              <Route path="/quoteyesterday" element={<Quoteyesterday />} />
              <Route path="/quotethisweek" element={<Quotethisweek />} />
              <Route path="/quotelastweek" element={<Quotelastweek />} />
              <Route path="/quotenextweek" element={<Quotenextweek />} />
              <Route path="/quotethismonth" element={<Quotethismonth />} />
              <Route path="/quotecall" element={<Quotecall />} />
              <Route path="/quoteconfirm" element={<Quoteconfirm />} />
              <Route path="/quotenote" element={<Quotenot />} />
              <Route path="/quotesend" element={<Quotesend />} />
              <Route path="/quotetemplate" element={<Quotetemplate />} />
              <Route path="/etoday" element={<Etoday />} />
              <Route path="/etommorow" element={<Etommorow />} />
              <Route path="/eyesterday" element={<Eyesterday />} />
              <Route path="/ethisweek" element={<Ethisweek />} />
              <Route path="/elastweek" element={<Elastweek />} />
              <Route path="/enextweek" element={<Enextweek />} />
              <Route path="/ethismonth" element={<Ethismonth />} />
              <Route path="/ecallletter" element={<Ecallletter />} />
              <Route path="/econfirm" element={<Econfirmed />} />
              <Route path="/enotintrested" element={<Enotintrested />} />
              <Route path="/esend" element={<Esend />} />
              <Route path="/communityrights" element={<Communityrights />} />
              <Route path="/etemplate" element={<Etemplate />} />
              <Route path="/region" element={<Region />} />
              <Route path="/newqt" element={<Newqt />} />
              <Route path="/termscondition" element={<Termscondition />} />
              <Route path="/format" element={<Format />} />
              <Route path="/addbank" element={<Addbank />} />
              <Route path="/editenquiry/:enquiryid" element={<Enquiryedit />} />
              <Route
                path="/convertcustomer/:id"
                element={<Convertcustomer />}
              />
              <Route path="/createquote/:EnquiryId" element={<Createquote />} />
              <Route path="/test/:test" element={<Test />} />
              <Route path="/quotelist" element={<Quoteadd />} />
              <Route path="/stoday" element={<Stoday />} />
              <Route path="/surveydetails" element={<Surveydetails />} />
              <Route path="/quotesearch" element={<Quotesearch />} />
              <Route path="/section2" element={<Termsgroup2 />} />
              <Route path="/new" element={<New />} />
              <Route path="/context" element={<Contextdata />} />
              <Route
                path="/quoteappconfirmed"
                element={<Quoteappconfirmed />}
              />
              <Route path="/enquirytoday" element={<Today />} />
              <Route
                path="/dsrcallist/:date/:category"
                element={<Dsrcallist />}
              />
              <Route path="/paymentcalender" element={<Paymentcalender />} />
              <Route
                path="/paymentfilterlist/:date"
                element={<Paymentfilterlist />}
              />

              <Route
                path="/quotedatatable/:date/:category"
                element={<Quotedatatable />}
              />
              <Route path="/B2Bdetails/:b2bid" element={<B2Bdetails />} />
              <Route path="/b2bedit/:b2bid" element={<B2Bedit />} />

              <Route
                path="/quotecalldatatable/:date"
                element={<Quotecalldatatable />}
              />

              <Route path="/addcall/:id" element={<Addcall />} />
              <Route
                path="/paymentfulldetails"
                element={<Paymentfulldetails />}
              />

              <Route path="/qheader" element={<Qheader />} />
              <Route path="/qfooter" element={<Qfooter />} />
              <Route path="/dsrdetails" element={<Dsrdetails />} />
              <Route path="/report/catagory" element={<ReportCatagory />} />
              <Route path="/report/dsr" element={<ReportDSR />} />
              <Route path="/report/enquiry" element={<ReportEnquiry />} />
              <Route path="/report/survey" element={<ReportSurvey />} />
              <Route path="/report/quotation" element={<ReportQuotation />} />
              <Route path="/report/b2b" element={<Report_B2B />} />
              <Route
                path="/report/onecommunity"
                element={<Report_1Community />}
              />
              <Route path="/report/payments" element={<Reports_payments />} />
              <Route path="/report/closedp" element={<Report_closedp />} />

              <Route
                path="/report/runningprojects"
                element={<ReportRunningProjects />}
              />
              <Route
                path="/customersearchdetails/:id"
                element={<Customersearchdetails />}
              />
              <Route
                path="/customersearchdetailsqote/:id/:enquiryid"
                element={<Customersearchdetailsqote />}
              />
              <Route path="/treatmentdetails/:id" element={<Treatment />} />

              <Route path="/painting/:id" element={<Painting />} />
              <Route path="/customeredit" element={<Customeredit />} />

              <Route path="/pmaterial" element={<Pmaterial />} />
              <Route path="/work/:id" element={<Work />} />

              <Route path="/payment/:id" element={<Payment />} />

              <Route path="/customerservnav" element={<Customersernav />} />

              <Route path="/paymentreports" element={<Payment_Reports />} />

              <Route
                path="/enquirydatatable/:date"
                element={<Enquirydatatable />}
              />
              <Route
                path="/surveydatatable/:date/:category"
                element={<Surveydatatable />}
              />
            </Route>

            <Route path="/quotationterm" element={<Quotationterm />} />
            <Route path="/servicebill" element={<Servicebill />} />
            <Route path="/dsrquote/:id" element={<Dsrquote />} />
            <Route path="/dsr_invoice_bill" element={<DSR_Invoice />} />

            <Route path="/raiseinvoice" element={<Paymentinvoice />} />

            <Route
              path="/onecommnityreport"
              element={<OneCommunityReports />}
            />
            <Route path="/sendmessage" element={<SendMessages />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default Navigations;
