const subcategoryModel = require("../model/subcategory");

class subcategory {
  async addsubcategory(req, res) {
    let { subcategory, category, videolink, serviceName, serivceID } = req.body;
    // let file = req.file.filename;
    if (!category | !subcategory) {
      return res.status(500).json({ error: "Field must not be empty" });
    } else {
      let add = new subcategoryModel({
        subcategory: subcategory,
        category: category,
        videolink: videolink,
        serviceName,
        serivceID: serivceID, //this 04-10
      });
      let save = add.save();
      if (save) {
        return res.json({ sucess: "subcategory name added successfully" });
      }
    }
  }

  //edit user
  async editsubcategory(req, res) {
    let id = req.params.id;
    let { subcategory, category, videolink, serviceName } = req.body;

    let data = await subcategoryModel.findOneAndUpdate(
      { _id: id },
      { subcategory, category, videolink, serviceName }
    );
    if (data) {
      return res.json({ success: "Updated" });
    }
  }

  async getsubcategory(req, res) {
    let subcategory = await subcategoryModel.find({}).sort({ _id: -1 });
    if (subcategory) {
      return res.json({ subcategory: subcategory });
    }
  }

  async postsubcategory(req, res) {
    let { category } = req.body;
    console.log(category);

    let subcategory = await subcategoryModel
      .find({ category })
      .sort({ _id: -1 });

    if (subcategory) {
      return res.json({ subcategory: subcategory });
    }
  }

  async deletesubcategory(req, res) {
    let id = req.params.id;
    let data = await subcategoryModel.deleteOne({ _id: id });
    return res.json({ sucess: "Successfully deleted" });
  }
}

const subcategorycontroller = new subcategory();
module.exports = subcategorycontroller;
