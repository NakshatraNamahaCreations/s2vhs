const express=require("express");
const router=express.Router();
const ajobcontroller=require("../../controller/master/A-job");

router.post("/addajob",ajobcontroller.addajob);
router.get("/getajob",ajobcontroller.getajob);
router.post("/editajob/:id",ajobcontroller.editajob);
router.post("/deleteajob/:id",ajobcontroller.postdeleteajob);
router.post("/postajob",ajobcontroller.postajob);


router.post("/postajobrate/:id",ajobcontroller.postajobrate);

module.exports=router;