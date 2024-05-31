
const express=require("express");
const router=express.Router();
const b2bcontroller=require("../../controller/master/b2b");

router.post("/addb2b",b2bcontroller.addb2b);
router.get("/getb2b",b2bcontroller.getb2b);
router.post("/editb2b/:id",b2bcontroller.editb2b);
router.post("/deleteb2b/:id",b2bcontroller.postdeleteb2b);

module.exports=router;