const express = require("express");
const router = express.Router();
const vendorController = require("../../controller/master/Vendor");

router.post("/addvendor", vendorController.addvendor);
router.get("/getvendor", vendorController.getvendor);
router.post("/edituser/:vendorid", vendorController.editvendor);
router.post("/deleteuser/:id", vendorController.postdeletevendor);

module.exports = router;