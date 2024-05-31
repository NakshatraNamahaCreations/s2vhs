const express=require("express");
const router=express.Router();
const treatmentcontroller=require("../controller/treatment");

router.post("/addtreatment",treatmentcontroller.addtreatment);
router.get("/gettreatment",treatmentcontroller.gettreatment);
router.get("/gettreatmentwithenquiryid/:id",treatmentcontroller.findWithEnquiryID);
router.post("/deletetreatment/:id",treatmentcontroller.deletetreatment);

module.exports=router;