const express=require("express");
const router=express.Router();
const newqtcontroller=require("../../controller/master/newqt");

router.post("/addnewqt",newqtcontroller.addnewqt);
router.get("/getnewqt",newqtcontroller.getnewqt);
router.post("/editnewqt/:id",newqtcontroller.editnewqt);
router.post("/deletenewqt/:id",newqtcontroller.postdeletenewqt);

module.exports=router;