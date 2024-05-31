const express=require("express");
const router=express.Router();
const advpaymentController=require("../controller/advpayment");

router.post("/AdvPayment",advpaymentController.advPayment);


router.post("/getAdvPaymentByCustomerId/:customerId",advpaymentController.getPaymentByCustomerId);


module.exports=router;