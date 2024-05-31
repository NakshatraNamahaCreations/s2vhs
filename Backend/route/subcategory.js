const express=require("express");
const router=express.Router();
const subcategorycontroller=require("../controller/subcategory");
const multer=require("multer");
 
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/subcategory");
    },
    filename: function (req, file, cb) {
		cb(null, Date.now() + "_" + file.originalname);
	},
});
const  upload =multer({storage:storage});

router.post("/addsubcategory",subcategorycontroller.addsubcategory);
router.get("/getsubcategory",subcategorycontroller.getsubcategory);
router.post("/postsubcategory",subcategorycontroller.postsubcategory);
router.post("/deletesubcategory/:id",subcategorycontroller.deletesubcategory);
router.post("/editsubcategory/:id",subcategorycontroller.editsubcategory);

module.exports=router;

 