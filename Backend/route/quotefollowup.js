const express = require("express");
const router = express.Router();
const quotefollowupcontroller = require("../controller/quotefollowup");

router.post("/addquotefollowup", quotefollowupcontroller.Addquotefollowup);
router.get("/getquotefollowup", quotefollowupcontroller.getallquotefollowup);
router.get("/getquotecalldata", quotefollowupcontroller.getquotedata);
router.post("/quotecategory", quotefollowupcontroller.postquotecall);
router.get("/getenquirydata", quotefollowupcontroller.getquoteagreegate);



module.exports = router;
