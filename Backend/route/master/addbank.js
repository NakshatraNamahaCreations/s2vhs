const express=require("express");
const router=express.Router();
const bankcontroller=require("../../controller/master/addbank");

router.post("/addbank",bankcontroller.addbank);
router.get("/getbank",bankcontroller.getbank);
router.post("/editbank/:id",bankcontroller.editbank);
router.post("deletebank/:id",bankcontroller.postdeletebank);

module.exports=router;