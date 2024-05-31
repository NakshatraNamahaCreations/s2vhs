const express=require("express");
const router=express.Router();
const whatsappcontroller=require("../../controller/master/whatsapp");

router.post("/addwhatsapptemplae",whatsappcontroller.addwhatsapptemplate);
router.get("/getwhatsapptemplate",whatsappcontroller.getwhatsapptemplate);
router.post("/editwhatsapptemplate/:id",whatsappcontroller.editwhatsapptemplate);
router.post("/deletewhatsapptemplate/:id",whatsappcontroller.postwhatsapptemplate);

module.exports=router;