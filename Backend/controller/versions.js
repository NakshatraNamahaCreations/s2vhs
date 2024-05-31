const versionsmodel = require("../model/versions");

class versions {
  async addversions(req, res) {
    let { version, desc } = req.body;
    // let file = req.file.filename;
    if (!version) {
      return res.status(500).json({ error: "Field must not be empty" });
    } else {
      let add = new versionsmodel({
        version: version,
        desc: desc,
      });
      let save = add.save();
      if (save) {
        return res.json({ sucess: "Added successfully" });
      }
    }
  }

  async getversions(req, res) {
    let versions = await versionsmodel.find({}).sort({ _id: -1 });
    if (versions) {
      return res.json({ versions: versions });
    }
  }

  async deleteversions(req, res) {
    let id = req.params.id;
    let data = await versionsmodel.deleteOne({ _id: id });
    return res.json({ sucess: "Successfully deleted" });
  }
}

const versionscontroller = new versions();
module.exports = versionscontroller;
