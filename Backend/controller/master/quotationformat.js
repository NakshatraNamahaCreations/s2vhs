const qfmodel = require("../../model/master/quotationformat");

class Category {
  async addqf(req, res) {
    let { category,region } = req.body;

    if(!category |!region){
      return res.status(500).json({error:"Field must not be empty"})
    }else{
      let add = new qfmodel({
        category: category,
        region:region
      });
      let save = add.save();
      if (save) {
        return res.json({ sucess: "Added successfully" });
      }
    }
   
  }

  //edit 
  async editqf(req, res) {
    let id = req.params.id;
    let { category, region } = req.body;

    let data = await qfmodel.findOneAndUpdate(
      { _id: id },
      { category, region }
    );
    if (data) {
      return res.json({ success: "Updated" });
    }
  }

  async getqf(req, res) {
    let qf = await qfmodel.find({}).sort({ _id: -1 });
    if (qf) {
      return res.json({ quotationformat: qf });
    }
  }

  async getallcategory(req, res) {
    let category = await categorymodel.aggregate([
      {
        $lookup: {
          from: "ca",
          localField: "categoryName",
          foreignField: "categoryName",
          as: "subcategories",
        },
      },
    ]);
    if (category) {
      return res.json({ category: category });
    }
  }

  async postdeleteqf(req, res) {
    let id = req.params.id;
    const data = await qfmodel.deleteOne({ _id: id });

    return res.json({ success: "Successfully" });
  }
}

const qfController = new Category();
module.exports = qfController;
