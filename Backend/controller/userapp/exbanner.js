const exbannermodel = require("../../model/userapp/exbanner");

class banner {
  async postaddbanner(req, res) {
    let file = req.file?.filename;
    const { Link, Height} = req.body;
    try {
      let newbanner = new exbannermodel({
        banner: file,
        Height:Height,
        Link:Link
      });

      let save = newbanner.save();

      if (save) {
        return res.json({ success: "banner added successfully" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getallbanner(req, res) {

    let banner = await exbannermodel.find({ });

    if (banner) {
      return res.json({ banner: banner });
    } else {
      return res.status(403).json({ error: "not able find banner" });
    }
  }

  async postdeletebanner(req, res) {
    let id = req.params.id;
    const data = await exbannermodel.deleteOne({ _id: id });

    return res.json({ success: "Successfully" });
  }
}

const exbannerController = new banner();
module.exports = exbannerController;
