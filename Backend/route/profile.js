const express = require("express");
const router = express.Router();
const multer = require("multer");
const profilecontroller = require("../controller/profile");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Public/profile");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/addprofile",
  upload.single("profileimg"),
  profilecontroller.profileBanner
);
router.get("/getbanner", profilecontroller.getprofile);
router.post("/deletebanner/:bannerid", profilecontroller.deletebanner);
router.put("/editbanner/:id", profilecontroller.editprofile);

module.exports = router;
