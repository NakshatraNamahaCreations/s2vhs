const express = require("express");
const router = express.Router();
const ServiceManagemntController = require("../../controller/userapp/serviceManagement");

const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/service");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get(
  "/getservicedetailsfindwithidsuper/:id",
  ServiceManagemntController.getservicedetailsfindwithidsuper
);

router.post(
  "/addservices",
  upload.any(),
  ServiceManagemntController.addserviceManagement
);
router.get("/getservices", ServiceManagemntController.getserviceManagement);
router.get(
  "/getservicespagewise",
  ServiceManagemntController.getserviceManagementpagewise
);
router.post(
  "/editservices/:id",
  ServiceManagemntController.editserviceManagement
);

router.post(
  "/deleteservices/:id",
  ServiceManagemntController.postdeleteserviceManagement
);
router.post("/postsubcatservice", ServiceManagemntController.postsubcategory);
router.post("/postcatservice", ServiceManagemntController.postcategory);

// 27-09
router.post(
  "/getservicebycategory",
  ServiceManagemntController.getServiceByCategory
);
// 03-10
router.post("/getslotsbyservice", ServiceManagemntController.getSlotsByService);

router.get(
  "/getserviceNameManagement",
  ServiceManagemntController.getserviceNameManagement
);

router.get(
  "/getserviceDirection",
  ServiceManagemntController.getserviceDirection
);

router.delete(
  "/deleteStoreSlot/:serviceId/:storeSlotId",
  ServiceManagemntController.deletebyindex
);
router.delete(
  "/deleteprice/:id/:index",
  ServiceManagemntController.deletebyindexofprice
);
// 04-10
router.put("/addlink/:id", ServiceManagemntController.addVideo);
router.put(
  "/updateservices/:id",
  upload.any(),
  ServiceManagemntController.updateServices
);

router.post("/updateadvanceddata/:id", ServiceManagemntController.addadvance);
router.post(
  "/updateenabledisble/:id",
  ServiceManagemntController.activeStatusenble
);

module.exports = router;
