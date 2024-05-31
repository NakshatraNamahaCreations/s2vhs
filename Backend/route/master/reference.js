const express=require("express");
const router=express.Router();
const referencetypecontroller=require("../../controller/master/reference");

router.post("/addreferencetype",referencetypecontroller.addreferencetype);
router.get("/getreferencetype",referencetypecontroller.getreferencetype);
router.post("/editreferencetype/:id",referencetypecontroller.editreferencetype);
router.post("/deletereferencetype/:id",referencetypecontroller.postdeletereferencetype);

module.exports=router;