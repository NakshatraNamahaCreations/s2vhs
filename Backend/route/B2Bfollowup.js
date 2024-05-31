const express = require("express");
const router = express.Router();
const b2bfollowupcontroller = require("../controller/B2Bfollowup");

router.post("/addb2bfollowup", b2bfollowupcontroller.AddB2Bfollowup);
router.get("/getb2bfollowup", b2bfollowupcontroller.getallB2Bfollowup);

// router.get("/getallflwdata", b2bfollowupcontroller.getb2bflwdata);

router.post("/deleteb2b2follow/:id", b2bfollowupcontroller.deleteb2b);


module.exports = router;
