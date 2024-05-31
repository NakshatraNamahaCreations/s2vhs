const aregionmodel = require("../../model/master/A-region");

class Aregion {
  async addaregion(req, res) {
    let { aregion,category } = req.body;
    let add = new aregionmodel({
        aregion: aregion,
        category:category
    });
    let save = add.save();
    if (save) {
      return res.json({ sucess: "added successfully" });
    }
  }

  //edit category
  async editaregion(req,res){
    let id=req.params.id;
    let{aregion,category}=req.body;
    
    let data=await aregionmodel.findOneAndUpdate(
        {_id:id},
        {aregion,category}
    );
    if (data) {
        return res.json({ success: "Updated" });
      }

  }
  async getaregion(req, res) {
    let data = await aregionmodel.find({}).sort({ _id: -1 });
    if (data) {
      return res.json({ aregion: data });
    }
  }

  async postcategory(req,res){
    let {category} =req.body;
    let region=await aregionmodel.find({category}).sort({_id:-1});

    if(region){
      return res.json({aregion:region})
    }
  }
  

  async postdeletearegion(req, res) {
    let id = req.params.id;
    const data = await aregionmodel.deleteOne({ _id: id });

    return res.json({ success: "Successfully" });
  }
}

const aregioncontroller = new Aregion();
module.exports = aregioncontroller;
