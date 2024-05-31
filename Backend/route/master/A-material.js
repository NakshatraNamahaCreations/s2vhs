const express=require("express");
const router=express.Router();
const amaterialcontroller=require("../../controller/master/A-material");

router.post("/addamaterial",amaterialcontroller.addmaterial);
router.get("/getamaterial",amaterialcontroller.getmaterial);
router.post("/editamaterial/:id",amaterialcontroller.editmaterial);
router.post("/deleteamaterial/:id",amaterialcontroller.postdeleteamaterial);
router.post("/categorymaterial",amaterialcontroller.postcategory);

module.exports=router;