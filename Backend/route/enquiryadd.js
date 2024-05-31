const express = require("express");
const router = express.Router();
const enquiryaddcontroller = require("../controller/enquiryadd");

router.get("/getallenquirycount", enquiryaddcontroller.getallenquirycount);

router.post("/addnewenquiry", enquiryaddcontroller.Addenquiry);
//router.post("/addjustdailenquiry", enquiryaddcontroller.Addjdenquiry);
router.post("/searchenquiry", enquiryaddcontroller.getenquiryfilter);
router.post("/searchenquiry1", enquiryaddcontroller.getenquiryfilter1);
router.get("/getenquiry", enquiryaddcontroller.getallenquiryadd);
router.get("/getenquirydatlast", enquiryaddcontroller.getLatestEnquiryAdd);
router.get("/getenquiryid/:id", enquiryaddcontroller.getallenquiryid);
router.get("/getenquiryquote/:id", enquiryaddcontroller.getallagreegate);
router.get(
  "/getenquiryquotewithfilter/:id",
  enquiryaddcontroller.getEnquiryAndAggregate
);
router.get("/getallnewfollow", enquiryaddcontroller.getallnewfollow);
router.get("/getwithenqid/:id", enquiryaddcontroller.findWithEnquiryID);
router.post("/editenquiry/:id", enquiryaddcontroller.editenquiry);

router.post("/updatequote/:id", enquiryaddcontroller.updatequote);
router.get("/getenquiry12", enquiryaddcontroller.getallenquiryadd12);
router.post("/deleteteenquiry/:id", enquiryaddcontroller.deleteenquiryadd);
router.post("/postenquirycategory", enquiryaddcontroller.postsubcategory);

module.exports = router;
