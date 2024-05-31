const express=require("express");
const router=express.Router();
const termgroupController=require("../../controller/master/termsgroup");

router.post("/addtermgroup",termgroupController.addtermgroup);
router.get("/gettermgroup",termgroupController.gettermgroup);
router.post("/edittermgroup/:id",termgroupController.edittermgroup);
router.post("/deletetermgroup/:id",termgroupController.postdeletetermgroup);

module.exports=router;