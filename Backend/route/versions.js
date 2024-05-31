const express=require("express");
const router=express.Router();
const versionscontroller=require("../controller/versions");

router.post("/addversions",versionscontroller.addversions);
router.get("/getversions",versionscontroller.getversions);
router.post("/deleteversions/:id",versionscontroller.deleteversions);

module.exports=router;