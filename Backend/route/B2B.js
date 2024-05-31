const express = require("express");
const router = express.Router();
const b2bcontroller = require("../controller/B2B");

router.post("/addB2B", b2bcontroller.addB2B);
router.get("/getB2B", b2bcontroller.getallB2B);
router.get("/getB2Breports", b2bcontroller.getb2breport);

router.post("/editb2b/:id", b2bcontroller.editBuisness);

router.post("/deleteterB2B/:id", b2bcontroller.deleteB2B);
router.post("/storeB2B", b2bcontroller.addB2BViaExcelSheet);

module.exports = router;
