const pmaterialmodel = require("../../model/master/Pmaterial");

class pmaterial {
  async addpmaterial(req, res) {
    let { pmaterial } = req.body;
    if (!pmaterial) {
      return res.status(500).json({ error: "field must not be empty" });
    } else {
      let addpmaterial = new pmaterialmodel({
        pmaterial: pmaterial,
      });
      let save = addpmaterial.save();
      if (save) {
        return res.json({ sucess: "pmaterial name added successfully" });
      }
    }
  }

  //edit category
  async editpmaterial(req, res) {
    let id = req.params.id;
    let { pmaterial } = req.body;

    let data = await pmaterialmodel.findOneAndUpdate({ _id: id }, { pmaterial });
    if (data) {
      return res.json({ success: "Updated" });
    }
  }
  async getpmaterial(req, res) {
    let pmaterial = await pmaterialmodel.find({}).sort({ _id: -1 });
    if (pmaterial) {
      return res.json({ masterpmaterial: pmaterial });
    }
  }

  async postdeletepmaterial(req, res) {
    let id = req.params.id;
    const data = await pmaterialmodel.deleteOne({ _id: id });

    return res.json({ success: "Successfully" });
  }
}

const pmaterialcontroller = new pmaterial();
module.exports = pmaterialcontroller;
