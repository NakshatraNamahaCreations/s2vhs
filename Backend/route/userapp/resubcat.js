const express=require("express");
const router=express.Router();
const appresubcatcontroller=require("../../controller/userapp/resubcat");
const multer=require("multer");
 
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/resubcat");
    },
    filename: function (req, file, cb) {
		cb(null, Date.now() + "_" + file.originalname);
	},
});
const  upload =multer({storage:storage});

router.post("/addappresubcat",upload.any(),appresubcatcontroller.addappresubcat);
router.get("/getappresubcat",appresubcatcontroller.getappresubcat);
router.post("/postappresubcat",appresubcatcontroller.postappresubcat);
router.post("/deleteappresubcat/:id",appresubcatcontroller.deleteappresubcat);
router.post("/editappresubcat/:id",upload.single("resubcatimg"),appresubcatcontroller.editappresubcat);

module.exports=router;

 