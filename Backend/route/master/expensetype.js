const express=require("express");
const router=express.Router();
const expensetypecontroller=require("../../controller/master/expensetype");

router.post("/addexpensetype",expensetypecontroller.addexpensetype);
router.get("/getexpensetype",expensetypecontroller.getexpensetype);
router.post("/editexpensetype/:id",expensetypecontroller.editexpensetype);
router.post("/deleteexpensetype/:id",expensetypecontroller.postdeleteexpensetype);

module.exports=router;