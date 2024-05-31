const express = require("express");
const router = express.Router();
const responsecontroller = require("../../controller/master/response");

router.post("/addresponse", responsecontroller.addresponse);
router.get("/getresponse", responsecontroller.getresponse);
router.post("/editresponse/:id", responsecontroller.editresponse);
router.post("/deleteresponse/:id", responsecontroller.postresponse);

module.exports = router;
