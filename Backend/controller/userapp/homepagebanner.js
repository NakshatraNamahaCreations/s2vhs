const homebannermodel = require("../../model/userapp/homepagebanner");

class homebanner {
  async postaddhomebanner(req, res) {
    let file = req.file?.filename;
    let {category}=req.body;

    try {
      let newbanner = new homebannermodel({
        banner: file,
        category:category
      });

      let save = newbanner.save();

      if (save) {
        return res.json({ success: "banner added successfully" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getallhomebanner(req, res) {

    let banner = await homebannermodel.find({ }).sort({_id:-1});

    if (banner) {
      return res.json({ homebanner: banner });
    } else {
      return res.status(403).json({ error: "not able find banner" });
    }
  }

  async postdeletehomebanner(req, res) {
    let id = req.params.id;
    const data = await homebannermodel.deleteOne({ _id: id });

    return res.json({ success: "Successfully" });
  }
}

const homebannerController = new homebanner();
module.exports = homebannerController;
