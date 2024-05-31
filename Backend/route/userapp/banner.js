const express = require("express");
const router = express.Router();
const bannerController = require("../../controller/userapp/banner");

const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/userbanner");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/addbanner",
  upload.single("banner"),
  bannerController.postaddbanner
);
router.get("/getallbanner", bannerController.getallbanner);
router.post("/deletebanner/:id", bannerController.postdeletebanner);

module.exports = router;
