const express=require("express");
const router=express.Router();
const headerimgcontroller=require("../../controller/master/quotationheader");
const multer=require("multer");
 
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/quotationheaderimg");
    },
    filename: function (req, file, cb) {
		cb(null, Date.now() + "_" + file.originalname);
	},
});
const  upload =multer({storage:storage});

router.post("/addheaderimg",upload.single("headerimg"),headerimgcontroller.addheaderimg);
router.get("/getheaderimg",headerimgcontroller.getheaderimg);
router.post("/deleteheaderimg/:id",headerimgcontroller.deleteheaderimg);

module.exports=router;

