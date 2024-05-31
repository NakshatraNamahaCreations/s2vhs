const express = require("express");
const router = express.Router();
const paymentgetwaycontroller = require("../../controller/paymentgatway/payment");

router.post("/addpayment", paymentgetwaycontroller.initiatePayment);
router.post(
  "/addpaymentforvendor",
  paymentgetwaycontroller.initiatePaymentforvendor
);

// router.post("/pay", paymentgetwaycontroller.pay);
router.post(
  "/status/:merchantId/:merchantTransactionId/:userId/:serviceId",
  paymentgetwaycontroller.checkTransactionStatus
);
router.get(
  "/paymentstatus/:userId",
  paymentgetwaycontroller.getpaymentstatusByUserId
);
router.get("/getpayments", paymentgetwaycontroller.getAllPayment);

router.post(
  "/vendorstatus/:merchantId/:merchantTransactionId/:vendorId/:vendorAmt",
  paymentgetwaycontroller.checkTransactionStatusinvendor
);

router.post("/yogipayment", paymentgetwaycontroller.yogipayment);
router.post("/yogistatus/:transactionId", paymentgetwaycontroller.yogiStatus);

module.exports = router;
