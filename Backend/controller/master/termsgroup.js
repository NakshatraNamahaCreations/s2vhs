const termsgroupmodel = require("../../model/master/termgroup");

class Termsgroup {
  async addtermgroup(req, res) {
    let { content, header, category,type } = req.body;
    if (!category  | !content) {
      return res.status(500).json({ error: "fill all fields" });
    } else {
      let add = new termsgroupmodel({
        category: category,
        type:type,
        content: content,
        header: header,
      });
      let save = add.save();
      if (save) {
        return res.json({ sucess: "Added successfully" });
      }
    }
  }

  //edit
  async edittermgroup(req, res) {
    let id = req.params.id;
    let  { content, header, category,type } = req.body;

    let data = await termsgroupmodel.findOneAndUpdate(
      { _id: id },
      { content, header, category,type }
    );
    if (data) {
      return res.json({ success: "Updated" });
    }
  }
  async gettermgroup(req, res) {
    let termsgroup = await termsgroupmodel.find({});
    if (termsgroup) {
      return res.json({ termsgroup: termsgroup });
    }
  }

  async getallcategory(req, res) {
    let termsgroup = await termsgroupmodel.aggregate([
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

  async postdeletetermgroup(req, res) {
    let id = req.params.id;
    const data = await termsgroupmodel.deleteOne({ _id: id });

    return res.json({ success: "Successfully" });
  }
}

const termgroupController = new Termsgroup();
module.exports = termgroupController;
