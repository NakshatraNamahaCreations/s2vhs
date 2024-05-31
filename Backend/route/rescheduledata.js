const express=require("express");
const router=express.Router();
const recheduledatacontroller=require("../controller/rescheduledata");

router.post("/addrecheduledata",recheduledatacontroller.addrecheduledata);
router.get("/getrecheduledata",recheduledatacontroller.getrecheduledata);
router.get("/filterwithserviceId/:id",recheduledatacontroller.getRechedulewithidData);
router.post("/deleterecheduledata/:id",recheduledatacontroller.deleterecheduledata);

module.exports=router;