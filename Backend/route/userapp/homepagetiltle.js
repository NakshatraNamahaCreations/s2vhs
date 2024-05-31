const express = require("express");
const router = express.Router();
const homepagetitleController = require("../../controller/userapp/homepagetiltle");



router.post("/addtitle", homepagetitleController.addhomepagetitle);
router.get("/gettitle", homepagetitleController.gethomepagetitle);
// router.get("/getallcategory", homepagetitleController.getallcategory);
router.post("/deletetitle/:id", homepagetitleController.postdeletehomepagetitle);
router.post("/edittitle/:id", homepagetitleController.edithomepagetitle);


module.exports = router;