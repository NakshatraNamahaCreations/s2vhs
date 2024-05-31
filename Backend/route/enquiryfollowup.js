const express = require("express");
const router = express.Router();
const enquiryfollowupcontroller = require("../controller/enquiryfollowup");


router.get(
  "/findwithuseridinenquiryfollowup/:id",
  enquiryfollowupcontroller.findWithUserIdInEnquiryFollowup
);

router.post(
  "/addenquiryfollowup",
  enquiryfollowupcontroller.Addenquiryfollowup
);
router.get(
  "/getenquiryfollowup",
  enquiryfollowupcontroller.getallenquiryfollowup
);
router.get("/getsurveydata", enquiryfollowupcontroller.getsurveydata);
router.post("/getsurveyaggredata", enquiryfollowupcontroller.getallagreedata);
router.get(
  "/getcalllateraggredata",
  enquiryfollowupcontroller.getcalllaterdata
);
router.get("/getallflwdata", enquiryfollowupcontroller.getflwdata);
router.get("/getnewflwdata", enquiryfollowupcontroller.getnewdata);
router.get(
  "/getcallquotedata",
  enquiryfollowupcontroller.getcalllaterandquotedata
);
router.post("/canclesurvey/:id", enquiryfollowupcontroller.cancelsurvey);
router.post(
  "/addenquiryfollowup",
  enquiryfollowupcontroller.Addenquiryfollowup
);
router.post("/postsurveycat", enquiryfollowupcontroller.postsurveycat);
router.get(
  "/filterwithEnquiryId/:enquiryId",
  enquiryfollowupcontroller.getEnquiryFollowupByEnquiryId
);
router.post("/updateserviceexe/:id", enquiryfollowupcontroller.updateDetails);

router.get(
  "/getsurveyaggredata12/:id",
  enquiryfollowupcontroller.getallagreedataexe
);
router.get(
  "/getsurveyaggredataexe/:id",
  enquiryfollowupcontroller.getsurveyaggredataexe
);
router.post("/surveyFilterdata", enquiryfollowupcontroller.surveyFilterdata);
  

module.exports = router;
