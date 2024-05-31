const express = require("express");
const router = express.Router();
const numbersController = require("../../controller/userapp/whatsappNumber");

router.post("/addNumbers", numbersController.addNumbers);
router.get("/getwhatsNumbers", numbersController.getAllNumbers);
router.put("/updateWhatsAppNumber/:id", numbersController.updateNumbers);
router.delete("/deletenumbers/:id", numbersController.deleteNumbers);

module.exports = router;