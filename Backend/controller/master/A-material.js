const amaterialmodel = require("../../model/master/A-material");

class amaterial {
  async addmaterial(req, res) {
    let { material,benefits,category } = req.body;
    let add = new amaterialmodel({
      material: material,
      benefits:benefits,
      category:category
    });
    let save = add.save();
    if (save) {
      return res.json({ sucess: "Added successfully" });
    }
  }

  //edit category
  async editmaterial(req,res){
    let id=req.params.id;
    let{material,benefits,category}=req.body;
    
    let data=await amaterialmodel.findOneAndUpdate(
        {_id:id},
        {material,benefits,category}
    );
    if (data) {
        return res.json({ success: "Updated" });
      }

  }
  async getmaterial(req, res) {
    let amaterial = await amaterialmodel.find({}).sort({ _id: -1 });
    if (amaterial) {
      return res.json({ amaterial: amaterial });
    }
  }

  async postcategory(req,res){
    let {category} =req.body;
    let amaterial=await amaterialmodel.find({category}).sort({_id:-1});

    if(amaterial){
      return res.json({amaterial:amaterial})
    }
  }


  async postdeleteamaterial(req, res) {
    let id = req.params.id;
    const data = await amaterialmodel.deleteOne({ _id: id });

    return res.json({ success: "Successfully" });
  }
}

const amaterialController = new amaterial();
module.exports = amaterialController;
