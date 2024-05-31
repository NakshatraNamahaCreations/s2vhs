const termsmodel = require("../../model/master/terms");

class Termsgroup {

  async addterm(req, res) {
    let { header,content } = req.body;
    let add = new termsmodel({
      header: header,
      content:content
    });
    let save = add.save();
    if (save) {
      return res.json({ sucess: "Added successfully" });
    }
  }

  //edit 
  async editterms(req,res){
    let id=req.params.id;
    let{header,content}=req.body;
    
    let data=await termsmodel.findOneAndUpdate(
        {_id:id},
        {content,header}
    );
    if (data) {
        return res.json({ success: "Updated" });
      }

  }
  async getterms(req, res) {
    let terms = await termsmodel.find({}).sort({ _id: -1 });
    if (terms) {
      return res.json({ terms: terms });
    }
  }

  async getallcategory(req, res) {
    let termsgroup = await termsmodel.aggregate([
      {
        $lookup: {
          from: "ca",
          localField: "categoryName",
          foreignField: "categoryName",
          as: "subcategories",
        },
      },
    ]);
    if (termsgroup) {
      return res.json({ termsgroup: termsgroup });
    }
  }

  async postdeleteterms(req, res) {
    let id = req.params.id;
    const data = await termsmodel.deleteOne({ _id: id });

    return res.json({ success: "Successfully" });
  }
}

const termsController = new Termsgroup();
module.exports = termsController;
