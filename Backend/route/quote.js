const express=require("express");
const router=express.Router();
const quoteaddcontroller=require("../controller/quote");


router.post("/addquote",quoteaddcontroller.addquote);
router.get("/getquote",quoteaddcontroller.getallquote);
// router.post("/editquote/:id",quoteaddcontroller.editquote);
router.post("/deletetequote/:id",quoteaddcontroller.deletequote);
router.get("/getallquote",quoteaddcontroller.getallagreegatequote);
router.get("/getallagreegatequoteall",quoteaddcontroller.getallagreegatequoteall);

router.get("/getfilterwithEnquiryid/:id",quoteaddcontroller.findWithEnquiryID);
router.post("/updatequotedetails/:id", quoteaddcontroller.updatequoteDetails);
router.post("/findwithidupdatetype/:id", quoteaddcontroller.findwithidupdatetype);
router.post("/QUOTEFilterdata", quoteaddcontroller.QUOTEFilterdata);

router.get("/getallaggregatequotewwithexeid/:id", quoteaddcontroller.getallaggregatequotewwithexeid);



module.exports=router;