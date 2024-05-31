const express=require("express");
const router=express.Router();
const footerimgcontroller=require("../../controller/master/quotationfooter");
const multer=require("multer");
 
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/quotationfooterimg");
    },
    filename: function (req, file, cb) {
		cb(null, Date.now() + "_" + file.originalname);
	},
});
const  upload =multer({storage:storage});

router.post("/addfooterimg",upload.single("footerimg"),footerimgcontroller.addfooterimg);
router.get("/getfooterimg",footerimgcontroller.getfooterimg);
router.post("/deletefooterimg/:id",footerimgcontroller.deletefooterimg);

module.exports=router;

