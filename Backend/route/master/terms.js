const express=require("express");
const router=express.Router();
const termsController=require("../../controller/master/terms");

router.post("/addterms",termsController.addterm);
router.get("/getterms",termsController.getterms);
router.post("/editterms/:id",termsController.editterms);
router.post("/deleteterms/:id",termsController.postdeleteterms);

module.exports=router;