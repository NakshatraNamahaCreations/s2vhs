const express=require("express");
const router=express.Router();
const appsubcatcontroller=require("../../controller/userapp/subcat");
const multer=require("multer");
 
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/subcat");
    },
    filename: function (req, file, cb) {
		cb(null, Date.now() + "_" + file.originalname);
	},
});
const  upload =multer({storage:storage});

router.post("/addappsubcat",upload.any(),appsubcatcontroller.addappsubcat);
router.get("/getappsubcat",appsubcatcontroller.getappsubcat);
router.post("/postappsubcat",appsubcatcontroller.postappsubcat);
router.post("/deleteappsubcat/:id",appsubcatcontroller.deleteappsubcat);
router.post("/editappsubcat/:id",upload.any(),appsubcatcontroller.editappsubcat);

module.exports=router;

 