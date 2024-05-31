const express=require("express");
const router=express.Router();
const termgroup2Controller=require("../../controller/master/termsgroup2");

router.post("/addtermgroup2",termgroup2Controller.addtermgroup);
router.get("/gettermgroup2",termgroup2Controller.gettermgroup);
router.post("/edittermgroup2/:id",termgroup2Controller.edittermgroup);
router.post("/deletetermgroup2/:id",termgroup2Controller.postdeletetermgroup);

module.exports=router;