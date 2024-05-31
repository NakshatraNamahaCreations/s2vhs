const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const cookieParser = require("cookie-parser");

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    console.log("=============MongoDb Database connected successfuly")
  )
  .catch((err) => console.log("Database Not connected !!!"));

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));
app.use(express.static("public"));

// import routes
const admin = require("./route/adminlogin");
const technician = require("./route/master/technician");
const vendor = require("./route/master/vendor");
const category = require("./route/category");
const subcategory = require("./route/subcategory");
const banner = require("./route/userapp/banner");
const userrouter = require("./route/master/user");
const cityrouter = require("./route/master/city");
const customertype = require("./route/master/customertype");
const expensetype = require("./route/master/expensetype");
const referencetype = require("./route/master/reference");
const b2brouter = require("./route/master/b2b");
const termgroup = require("./route/master/termsgroup");
const termgroup2 = require("./route/master/termsgroup2");
const Pmaterial = require("./route/master/Pmaterial");
const amaterial = require("./route/master/A-material");
const aregion = require("./route/master/A-region");
const ajob = require("./route/master/A-job");
const customer = require("./route/customer");
const community = require("./route/community");
const B2B = require("./route/B2B");
const qf = require("./route/master/quotationformat");
const terms = require("./route/master/terms");
const enquiryadd = require("./route/enquiryadd");
const qtheaderimg = require("./route/master/quotationheader");
const qtfooterimg = require("./route/master/quotationfooter");
const response = require("./route/master/response");
const whatsapptemplate = require("./route/master/whatsapptemplate");
const newqt = require("./route/master/newqt");
const bank = require("./route/master/addbank");
const quote = require("./route/quote");
const counter = require("./route/counter");
const treatment = require("./route/treatment");
const servicedetails = require("./route/servicedetails");
const addcall = require("./route/addcall");
const enquiryfollow = require("./route/enquiryfollowup");
const quotefollowup = require("./route/quotefollowup");
const payment = require("./route/payment");
const work = require("./route/work");
const b2bfollowup = require("./route/B2Bfollowup");
const communitPayments = require("./route/communityPayment");
const advPayments = require("./route/advpayment");
const AddPaymentGetWay = require("./route/paymentgatway/payment");
const vdocuments = require("./route/vendorapp/vdocuments");

const notification = require("./route/notification");
const manual = require("./route/vendorapp/manual");

//user app
const userauth = require("./route/userapp/userauth");
const ubanner = require("./route/userapp/banner");
const uservice = require("./route/userapp/serviceManament");
const usubcat = require("./route/userapp/subcat");
const uresubcat = require("./route/userapp/resubcat");
const uvoucher = require("./route/userapp/voucher");
const usuperlogin = require("./route/userapp/superlogin");
const uofferbanner = require("./route/userapp/offerbanner");
const uspotlightbanner = require("./route/userapp/spotlight");
const uhomebanner = require("./route/userapp/homepagebanner");
const uhometitle = require("./route/userapp/homepagetiltle");
const uslots = require("./route/userapp/slots");

const ufeq = require("./route/userapp/feq");
const addOnsRoute = require("./route/userapp/serviceAddons");
const numbersRoute = require("./route/userapp/whatsappNumber");
const paymentgateway = require("./route/paymentgatway/payment");
const sPayment = require("./route/paymentgatway/servicePayment");
const rating = require("./route/userapp/rating");
const webbanner = require("./route/websitebanner");
const exbanner = require("./route/userapp/exbanner");
const customerAddress = require("./route/customeraddress");
const versions = require("./route/versions");
const otp = require("./route/otp");
const recheduledata = require("./route/rescheduledata");
const vpenalty = require("./route/vpenalty");

const profile = require("./route/profile");

//not added db
const Automated = require("./route/Automated");
const referral = require("./route/userapp/referral");

app.use("/api/notification", notification);
app.use("/api/userapp", referral);
app.use("/api", vpenalty);
app.use("/api", manual);
app.use("/api", otp);
app.use("/api", admin);
app.use("/api", technician);
app.use("/api", category);
app.use("/api", subcategory);
app.use("/api", vendor);
app.use("/api", banner);
app.use("/api/master", userrouter);
app.use("/api/master", cityrouter);
app.use("/api/master", customertype);
app.use("/api/master", expensetype);
app.use("/api/master", referencetype);
app.use("/api/master", b2brouter);
app.use("/api/master", termgroup);
app.use("/api/master", termgroup2);
app.use("/api/master", terms);
app.use("/api/master", amaterial);
app.use("/api/master", aregion);
app.use("/api/master", qf);
app.use("/api/master", ajob);
app.use("/api/master", qtfooterimg);
app.use("/api/master", qtheaderimg);
app.use("/api/master", Pmaterial);
app.use("/api", customer);
app.use("/api", community);
app.use("/api", B2B);
app.use("/api", enquiryadd);
app.use("/api", response);
app.use("/api", whatsapptemplate);
app.use("/api", newqt);
app.use("/api", bank);
app.use("/api", servicedetails);
app.use("/api", quote);
app.use("/api", counter);
app.use("/api", treatment);
app.use("/api", addcall);
app.use("/api", enquiryfollow);
app.use("/api", quotefollowup);
app.use("/api", payment);
app.use("/api", work);
app.use("/api", b2bfollowup);
app.use("/api", communitPayments);
app.use("/api", communitPayments);
app.use("/api", advPayments);
app.use("/api", customerAddress);
app.use("/api", versions);
app.use("/api", recheduledata);

//user app
app.use("/api/userapp", userauth);
app.use("/api/userapp", ubanner);
app.use("/api/userapp", uservice);
app.use("/api/userapp", usubcat);
app.use("/api/userapp", uresubcat);
app.use("/api/userapp", uvoucher);
app.use("/api/super", usuperlogin);
app.use("/api/userapp", uofferbanner);
app.use("/api/userapp", uhomebanner);
app.use("/api/userapp", uhometitle);
app.use("/api/userapp", uspotlightbanner);
app.use("/api/userapp", uslots);
app.use("/api/userapp", ufeq);
app.use("/api/userapp", rating);
app.use("/api/userapp", exbanner);

app.use("/api/userapp", addOnsRoute);
app.use("/api/userapp", numbersRoute);
app.use("/api", profile);
app.use("/api/payment", paymentgateway);
app.use("/api/payment/service", sPayment);

//website
app.use("/api/website", webbanner);
app.use("/api/payment", AddPaymentGetWay);

//vendor
app.use("/api/vendor", vdocuments);

//not added DB
app.use("/api", Automated);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server is running on", PORT);
});
