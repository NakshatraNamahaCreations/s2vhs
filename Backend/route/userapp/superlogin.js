const express = require("express");
const router = express.Router();
const superloginController = require("../../controller/userapp/superlogin");

router.post("/signupSuperAdmin", superloginController.supersignup);

router.post("/loginSuperAdmin", superloginController.loginSuperadmin);

router.post("/changepassword/:userId", superloginController.changePassword);
router.post("/logout/:id", superloginController.getsignout);

module.exports = router;
