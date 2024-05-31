const express=require("express");
const router=express.Router();
const customertypecontroller=require("../../controller/master/customertype");

router.post("/addcustomertype",customertypecontroller.addcustomertype);
router.get("/getcustomertype",customertypecontroller.getcustomertype);
router.post("/editcustomertype/:id",customertypecontroller.editcustomertype);
router.post("/deletecustomertype/:id",customertypecontroller.postdeletecustomertype);

module.exports=router;