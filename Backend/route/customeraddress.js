const express = require("express");
const router = express.Router();
const ccustomeraddressController = require("../controller/customeraddress");



router.post("/addcustomeraddress", ccustomeraddressController.addaddress);
router.get("/getcustomeraddress", ccustomeraddressController.getaddress);

router.get('/getcustomeraddresswithuserid/:id', ccustomeraddressController.getaddresswithuserid);

router.post("/deletecustomeraddress/:id", ccustomeraddressController.postdeleteaddress);



module.exports = router;