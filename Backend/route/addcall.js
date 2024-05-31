const express = require("express");
const router = express.Router();
const addcallcontroller = require("../controller/addcall");

const multer = require("multer");

const upload = multer({ dest: "uploads/" }).array("sImg", 2);

router.get(
  "/findthetotalcountsofjobs/:id",
  addcallcontroller.findthetotalcountsofjobs
);

router.get(
  "/getfindwithvendorAppTodayhistroyid/:id",
  addcallcontroller.getfindwithvendorAppTodayhistroyid
);
router.get(
  "/findwithvendorAppThisWeekHistoryId/:id",
  addcallcontroller.findwithvendorAppThisWeekHistoryId
);
router.get(
  "/findwithvendorAppThisMonthHistoryId/:id",
  addcallcontroller.findwithvendorAppThisMonthHistoryId
);

router.get(
  "/getfindwithvendorandductedamt/:id",
  addcallcontroller.getfindwithvendorandductedamt
);

router.get(
  "/vendorcompletedhistroy/:id",
  addcallcontroller.vendorcompletedhistroy
);

router.get(
  "/findwithvendorAppCustomMonthHistoryId/:id",
  addcallcontroller.findwithvendorAppCustomMonthHistoryId
);

router.post("/deductvendoramount/:id", addcallcontroller.deductamtformvendor);
router.get("/getVendorSeviceReport", addcallcontroller.getVendorServiceReports);
router.get(
  "/todayvendorservices/:id",
  addcallcontroller.findtodayservicesoutvendor
);

router.get(
  "/getfindwithtechidwithfiltertoday/:id",
  addcallcontroller.getfindwithtechidwithfiltertoday
);
router.get(
  "/getfindwithtechidwithfiltertomorrow/:id",
  addcallcontroller.getfindwithtechidwithfiltertomorrow
);

//newe
router.get(
  "/findwithvendorcompletedservice/:id",
  addcallcontroller.getfindwithvendorcompletedservice
);

router.get(
  "/getfilteredrunningdataforpm/:id",
  addcallcontroller.getfilteredrunningdataforpm
);
router.post("/adddsrcall", addcallcontroller.save);

router.post("/outsideVendorassign", addcallcontroller.outsideVendorassign);

router.post(
  "/outsideVendorassignwithcrm",
  addcallcontroller.outsideVendorassignwithcrm
);
router.get("/getalldsrlist/:id", addcallcontroller.getalldsrcall);
router.post("/postdsrcategory", addcallcontroller.postcategory);
router.post("/vendorDataCalendor", addcallcontroller.getVendorDateSchedules);

router.post("/updatedsrdata/:id", addcallcontroller.editdsr);
router.post("/reshecdule/:id", addcallcontroller.reshecdule);
router.put("/tcancelproject/:id", addcallcontroller.Tcancelproject);
router.put("/reschedulejob/:id", addcallcontroller.schedulejob);
router.get("/getaggredsrdata", addcallcontroller.getallagreedata);
router.put("/startjob/:id", addcallcontroller.startJob);
router.put("/endjob/:id", addcallcontroller.endJob);
router.put("/endjobforvendor/:id", addcallcontroller.endJobforvendor);
router.get("/getfindwithtechid/:id", addcallcontroller.getfindwithtechid);
router.get("/getfindwithpmid/:id", addcallcontroller.getfindwithpmid);
router.get(
  "/getfindwithtechidwithfilter/:id",
  addcallcontroller.getfindwithtechidwithfilter
);
router.put("/startproject/:id", addcallcontroller.startproject);
router.get(
  "/filteredservicedate/:serviceDate",
  addcallcontroller.getservicedatadate
);
router.get(
  "/getservicedatafromtodate/:fromDate/:toDate",
  addcallcontroller.getservicedatafromtodate
);
router.get(
  "/filteredserviceIDanddate/:serviceDate/:serviceId",
  addcallcontroller.getserviceIDanddate
);
router.get(
  "/filteredservicedateandtechid/:serviceDate/:techid",
  addcallcontroller.filterwithtectandservicedate
);
module.exports = router;
