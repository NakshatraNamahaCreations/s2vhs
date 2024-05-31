const express = require("express");
const router = express.Router();
const feqController = require("../../controller/userapp/feq");
// const upload = multer({ dest: 'uploads/' });
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/feq");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/addfeq", upload.array("img", 10), feqController.postaddfeq);
router.get("/getallfeq", feqController.getallfeq);
router.post("/deletefeq/:id", feqController.postdeletefeq);
router.put("/editfeq/:ccid", upload.single("img"), feqController.updatefeq);
module.exports = router;
