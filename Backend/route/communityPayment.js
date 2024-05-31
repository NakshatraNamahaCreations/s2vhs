const express = require("express");
const router = express.Router();
const CommunityPaymentController = require("../controller/communityPayment");

router.post(
  "/addcommunitypayments",
  CommunityPaymentController.addCommunityPayment
);
router.get(
  "/getcommunitypayments/:id",
  CommunityPaymentController.getCommunityPayments
);

router.post(
    "/deletecommunitypayment/:id",
    CommunityPaymentController.deleteCommunityPayment
  );

module.exports = router;