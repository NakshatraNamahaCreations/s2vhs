const express = require("express");
const router = express.Router();
const userauthController = require("../../controller/userapp/userauth");

router.post("/signup", userauthController.usersignup);
router.get("/getuser", userauthController.getuser);
router.post("/edituser/:userId", userauthController.edituser);
router.post("/signin", userauthController.usersignin);
router.post("/deleteuser/:id", userauthController.postdeleteuser);
router.post("/changepassword/:userId", userauthController.changePassword);
router.post("/logout/:id", userauthController.getsignout);


module.exports = router;