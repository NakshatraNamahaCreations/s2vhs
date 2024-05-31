const express=require("express");
const router=express.Router();
const aregioncontroller=require("../../controller/master/A-region");

router.post("/addaregion",aregioncontroller.addaregion);
router.get("/getaregion",aregioncontroller.getaregion);
router.post("/editaregion/:id",aregioncontroller.editaregion);
router.post("/deletearegion/:id",aregioncontroller.postdeletearegion);
router.post("/categoryaregion",aregioncontroller.postcategory);
module.exports=router;