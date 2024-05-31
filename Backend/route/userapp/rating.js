const express = require("express");
const router = express.Router();
const ratingController = require("../../controller/userapp/rating");

router.post(
  "/addrating",

  ratingController.postaddrating
);
router.get("/getallrating", ratingController.getallrating);
router.get("/findbyservicename", ratingController.findbyserviceID);
router.get("/getratingwithuser/:id", ratingController.getratingdatawithuser);
router.post("/deleterating/:id", ratingController.postdeleterating);

module.exports = router;
