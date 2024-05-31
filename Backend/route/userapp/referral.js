const express = require("express");
const router = express.Router();
const referralController = require("../../controller/userapp/referral");


router.post("/addvoucher",referralController.addreferral);

module.exports = router;