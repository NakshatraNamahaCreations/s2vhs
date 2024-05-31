const express=require("express");
const router=express.Router();
const slotscontroller=require("../../controller/userapp/slots");

router.post("/addslots",slotscontroller.addslots);
router.get("/getslots",slotscontroller.getslots);
router.post("/deleteslots/:id",slotscontroller.deleteslots);
router.post("/editslots/:id",slotscontroller.editslots);

module.exports=router;

 