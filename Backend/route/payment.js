const express=require("express");
const router=express.Router();
const paymentController=require("../controller/payment");

router.post("/addPayment",paymentController.addPayment);
// router.get("/getservicedetails",servicedetailscontroller.getservicedetails);
// router.post("/deleteservicedetails/:id",servicedetailscontroller.deleteservicedetails);
// router.post("/editservicedetails/:id",servicedetailscontroller.editservicedetails);
// router.post("/postservicecategory", servicedetailscontroller.postcategory);
// router.post("/closeproject/:id", servicedetailscontroller.updateclose);
// router.post("/postservicecat",servicedetailscontroller.postservicecategory);

router.get("/getPaymentByCustomerId/:customerId",paymentController.getPaymentByCustomerId);
router.put("/updatepayment/:id", paymentController.updatePayment);

module.exports=router;