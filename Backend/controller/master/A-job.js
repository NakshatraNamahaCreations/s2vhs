const mongoose = require("mongoose");
const ajobmodel = require("../../model/master/A-job");

class amaterial {
  async addajob(req, res) {
    let { material, desc, rate, category } = req.body;
    let add = new ajobmodel({
      material: material,
      desc: desc,
      rate: rate,
      category: category,
    });
    let save = add.save();
    if (save) {
      return res.json({ sucess: "Added successfully" });
    }
  }

  //edit category
  async editajob(req, res) {
    let id = req.params.id;
    let { material, desc, rate, category } = req.body;

    let data = await ajobmodel.findOneAndUpdate(
      { _id: id },
      { material, desc, rate, category }
    );
    if (data) {
      return res.json({ success: "Updated" });
    }
  }
  async getajob(req, res) {
    let data = await ajobmodel.find({}).sort({ _id: -1 });
    if (data) {
      return res.json({ ajob: data });
    }
  }

  async postajob(req, res) {
    let { material } = req.body;
    let ajob = await ajobmodel.find({ material }).sort({ _id: -1 });

    if (ajob) {
      return res.json({ ajob: ajob });
    }
  }

  async postajobrate(req, res) {
    try {
      let id = req.params.id;

      let ajob = await ajobmodel.findById(id).sort({ _id: -1 });

      if (ajob) {
        return res.json({ ajob: ajob });
      } else {
        return res.json({ ajob: [] });
      }
    } catch (error) {
      // Handle any potential errors here
      console.error("Error fetching job:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async postdeleteajob(req, res) {
    let id = req.params.id;
    const data = await ajobmodel.deleteOne({ _id: id });

    return res.json({ success: "Successfully" });
  }
}

const ajobController = new amaterial();
module.exports = ajobController;
