const express=require("express");
const router=express.Router();
const citycontroller=require("../../controller/master/city");

router.post("/addcity",citycontroller.addcity);
router.get("/getcity",citycontroller.getcity);
router.post("/editcity/:id",citycontroller.editcity);
router.post("/deletecity/:id",citycontroller.postdeletecity);

module.exports=router;