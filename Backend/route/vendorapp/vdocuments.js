const express = require("express");
const router = express.Router();
const vdocumentsController = require("../../controller/vendorapp/vdocuments");
const multer = require("multer");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/vDocuments");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname);
    },
  });

  const upload = multer({ storage: storage });


router.post("/addIDProof", upload.single("IDproofImg"), vdocumentsController.addIDProof);
router.post("/addAddressProof", upload.single("addressProofImg"), vdocumentsController.addAddressProof);

router.post("/addbankProof", upload.single("bankProofImg"), vdocumentsController.addbankProof);
router.post("/findwithvendorId/:vendorId", vdocumentsController.findWithVendorId);

router.get("/getvdocuments", vdocumentsController.getvdocuments);
router.get("/getallvdocuments", vdocumentsController.getallvdocuments);
router.post("/deletevdocuments/:id", vdocumentsController.postdeletevdocuments);



module.exports = router;