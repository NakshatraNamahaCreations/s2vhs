const express=require("express");
const router=express.Router();
const pmaterialcontroller=require("../../controller/master/Pmateril");

router.post("/addpmaterial",pmaterialcontroller.addpmaterial);
router.get("/getpmaterial",pmaterialcontroller.getpmaterial);
router.post("/editpmaterial/:id",pmaterialcontroller.editpmaterial);
router.post("/deletepmaterial/:id",pmaterialcontroller.postdeletepmaterial);

module.exports=router;