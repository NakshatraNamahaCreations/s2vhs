const express = require("express");
const router = express.Router();
const customercontroller = require("../controller/customer");

router.post("/addcustomer", customercontroller.addcustomer);
router.post("/usersign", customercontroller.usersignin);
router.post(
  "/findcustomerwithnumber/:number",
  customercontroller.getCustomerByPhoneNumber
);
router.get(
  "/getcustomerdatapagewise",
  customercontroller.getcustomerdatapagewise
);
router.get("/getcustomer", customercontroller.getallcustomer);
router.get("/searchcustomer", customercontroller.getFilteredCustomers);
router.get("/getCustomerById/:id", customercontroller.getCustomerById);
router.post("/editcustomer/:id", customercontroller.editcustomer);
router.post("/userupdate/:id", customercontroller.userupdate);
router.post("/addservicedetails/:id", customercontroller.addservicedetails);
router.post(
  "/addcustomersviaexcelesheet",
  customercontroller.addCustomersViaExcelSheet
);
router.post("/deletetercustomer/:id", customercontroller.deletecustomer);
router.post(
  "/addDeliveryAddress/:cardNo",
  customercontroller.addDeliveryAddress
);
router.get("/getcustomercount", customercontroller.getallcustomercount);

router.get("/getlastcustomer", customercontroller.getlastcustomer);
module.exports = router;
