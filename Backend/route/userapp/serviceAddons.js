const express = require("express");
const router = express.Router();
const ServiceAddonsController = require("../../controller/userapp/serviceAddons");

const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/addOns");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post(
  "/addServiceAddOns",
  upload.single("addOnsImage"),
  ServiceAddonsController.addServiceAddOns
);
router.get("/getServiceAddOns", ServiceAddonsController.getAllAddOns);
router.put(
  "/updateServiceAddOns/:id",
  upload.single("addOnsImage"),
  ServiceAddonsController.updateAddOns
);
router.delete("/deleteServiceAddOns/:id", ServiceAddonsController.deleteAddOns);

module.exports = router;