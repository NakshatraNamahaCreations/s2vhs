const express = require("express");
const router = express.Router();
const webbannerController = require("../controller/websitebanner");

const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/webBanner");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/addwebbanner",
  upload.single("banner"),
  webbannerController.postaddwebbanner
);
router.get("/getallwebbanner", webbannerController.getallwebbanner);
router.post("/deletewebbanner/:id", webbannerController.postdeletewebbanner);

module.exports = router;
