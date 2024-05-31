const express = require("express");
const router = express.Router();
const offerbannerController = require("../../controller/userapp/offerbanner");

const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/offerbanner");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/addofferbanner",
  upload.single("icon"),
  offerbannerController.postaddofferbanner
);
router.get("/getallofferbanner", offerbannerController.getallofferbanner);
router.post("/deleteofferbanner/:id", offerbannerController.postdeleteofferbanner);
router.put("/editoofferbanner/:id", upload.single("icon"), offerbannerController.editappofferbanner);

module.exports = router;
