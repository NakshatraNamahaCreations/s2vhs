const express = require("express");
const router = express.Router();
const homebannerController = require("../../controller/userapp/homepagebanner");

const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/homepagebanner");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/addhomebanner",
  upload.single("banner"),
  homebannerController.postaddhomebanner
);
router.get("/getallhomebanner", homebannerController.getallhomebanner
);
router.post("/deletehomebanner/:id", homebannerController.postdeletehomebanner);

module.exports = router;
