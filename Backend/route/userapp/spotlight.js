const express = require("express");
const router = express.Router();
const spotlightbannerController = require("../../controller/userapp/spotlight");

const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/spotlight");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/addspotlightbanner",
  upload.single("banner"),
  spotlightbannerController.postaddspotlightbanner
);
router.get("/getallspotlightbanner", spotlightbannerController.getallspotlightbanner);
router.post("/deletespotlightbanner/:id", spotlightbannerController.postdeletespotlightbanner);

module.exports = router;
