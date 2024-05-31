const express = require("express");
const router = express.Router();
const AutomatedServicecontroller = require("../controller/Automated");

router.post("/editAutomated/:id", AutomatedServicecontroller.editAutomated);
router.get(
  "/getAutomateddata",
  AutomatedServicecontroller.getallAutomatedService
);
router.get(
  "/getvendordiscountamt",
  AutomatedServicecontroller.checkthevendorCharge
);

router.post(
  "/updatevendorconfigure",
  AutomatedServicecontroller.addvendorconfigure
);

router.post(
  "/updatevendorconfiguredelete/:id",
  AutomatedServicecontroller.deleteVendorConfigure
);

module.exports = router;
