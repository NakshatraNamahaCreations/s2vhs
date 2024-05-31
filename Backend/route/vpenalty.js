const express=require("express");
const router=express.Router();
const vPenaltycontroller=require("../controller/vpenalty");

router.post("/addvPenalty",vPenaltycontroller.addvPenalty);
router.get("/getvPenalty/:id",vPenaltycontroller.getvPenalty);
router.get("/getpenaltywithservice",vPenaltycontroller.getpenaltywithservice);
router.get("/getpenaltywithservice1/:id",vPenaltycontroller.getpenaltywithservice1);
router.post("/deletevPenalty/:id",vPenaltycontroller.deletevPenalty);

module.exports=router;