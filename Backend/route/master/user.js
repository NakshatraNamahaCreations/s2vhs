const express = require("express");
const router = express.Router();
const userController = require("../../controller/master/user");

router.post("/adduser", userController.adduser);
router.get("/getuser", userController.getuser);
router.post("/edituser/:userId", userController.edituser);
router.post("/giveaccess/:userId", userController.giveRights);
router.post("/loginuser", userController.loginUser);
router.post("/deleteuser/:id", userController.postdeleteuser);
router.post("/changepassword/:userId", userController.changePassword);
router.post("/logout/:id", userController.getsignout);


module.exports = router;