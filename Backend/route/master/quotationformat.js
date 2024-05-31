const express=require("express");
const router=express.Router();
const qfcontroller=require("../../controller/master/quotationformat");

router.post("/addqf",qfcontroller.addqf);
router.get("/getqf",qfcontroller.getqf);
router.post("/editqf/:id",qfcontroller.editqf);
router.post("/deleteqf/:id",qfcontroller.postdeleteqf);

module.exports=router;