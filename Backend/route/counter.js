const express=require("express");
const router=express.Router();
const countercontroller=require("../controller/counter");

// router.post("/addcounter",countercontroller.addcounter);
router.get("/serialNumber/:counterName",countercontroller.addcounter);
router.post("/updatecounter/:id",countercontroller.addupdate);

module.exports=router;