const termsgroup2model = require("../../model/master/termgroup2");

class Termsgroup {
  async addtermgroup(req, res) {
    let { content, header, category,type } = req.body;
    if (!category  | !content) {
      return res.status(500).json({ error: "fill all fields" });
    } else {
      let add = new termsgroup2model({
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
    let  { content, header, category ,type} = req.body;

    let data = await termsgroup2model.findOneAndUpdate(
      { _id: id },
      { content, header, category ,type}
    );
    if (data) {
      return res.json({ success: "Updated" });
    }
  }
  async gettermgroup(req, res) {
    let termsgroup2 = await termsgroup2model.find({});
    if (termsgroup2) {
      return res.json({ termsgroup2: termsgroup2 });
    }
  }

  async getallcategory(req, res) {
    let termsgroup = await termsgroup2model.aggregate([
      {
        $lookup: {
          from: "ca",
          localField: "categoryName",
          foreignField: "categoryName",
          as: "subcategories",
        },
      },
    ]);
    if (termsgroup2) {
      return res.json({ termsgroup2: termsgroup2 });
    }
  }

  async postdeletetermgroup(req, res) {
    let id = req.params.id;
    const data = await termsgroup2model.deleteOne({ _id: id });

    return res.json({ success: "Successfully" });
  }
}

const termgroup2Controller = new Termsgroup();
module.exports = termgroup2Controller;
