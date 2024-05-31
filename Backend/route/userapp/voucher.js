const express = require("express");
const router = express.Router();
const voucherController = require("../../controller/userapp/voucher");





router.post("/addvoucher",voucherController.addvoucher);
router.get("/getvoucher", voucherController.getvoucher);
router.post("/deletevoucher/:id", voucherController.postdeletevoucher);
router.post("/editvoucher/:id", voucherController.editvoucher);
router.post("/couponcode/:id", voucherController.couponcode);


module.exports = router;