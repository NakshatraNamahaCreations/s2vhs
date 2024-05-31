const express = require("express");
const router = express.Router();
const vdocumentsController = require("../../controller/vendorapp/manual");

router.post("/updatejobmaualfromcrm", vdocumentsController.addjobs);

router.post("/assignjobmaualfromcrm", vdocumentsController.save);
router.get("/getmanuljobcrm/:id", vdocumentsController.getvendoraggreData);

router.get(
  "/getmanuljobwithserviceID/:id",
  vdocumentsController.findwithmanulserviceids
);
router.get(
  "/getmanuljobfromcrmdata",
  vdocumentsController.getmanualdatafromcrm
);

router.post("/updatemanualdsrdata/:id", vdocumentsController.editdsr);
module.exports = router;
