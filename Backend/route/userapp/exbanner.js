const express = require("express");
const router = express.Router();
const exbannerController = require("../../controller/userapp/exbanner");

const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/exbanner");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/addexbanner",
  upload.single("exbanner"),
  exbannerController.postaddbanner
);
router.get("/getallexbanner", exbannerController.getallbanner);
router.post("/deleteexbanner/:id", exbannerController.postdeletebanner);

module.exports = router;
