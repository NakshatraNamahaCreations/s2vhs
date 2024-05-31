const express=require("express");
const router=express.Router();
const communitycontroller=require("../controller/community");

router.post("/addcommunity",communitycontroller.addcommunity);
router.get("/getcommunity",communitycontroller.getallcommunity);
router.post("/editcommunity/:id",communitycontroller.editcommunity);
router.post("/communityacces/:userId",communitycontroller.giveRights);
router.post("/deletetercommunity/:id",communitycontroller.deletecommunity);
router.post("/editcommunity/:id", communitycontroller.editcommunity);
router.get("/getcommunitydata", communitycontroller.getServicesByIdInCummunity);

module.exports=router;