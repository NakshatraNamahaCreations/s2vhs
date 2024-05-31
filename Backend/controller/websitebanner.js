const webBannermodel = require("../model/websitebanner");

class weBbanner {
  async postaddwebbanner(req, res) {
    let file = req.file?.filename;

    try {
      let newbanner = new webBannermodel({
        banner: file,
      });

      let save = newbanner.save();

      if (save) {
        return res.json({ success: "banner added successfully" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getallwebbanner(req, res) {

    let banner = await webBannermodel.find({ }).sort({_id:-1});

    if (banner) {
      return res.json({ banner: banner });
    } else {
      return res.status(403).json({ error: "not able find banner" });
    }
  }

  async postdeletewebbanner(req, res) {
    let id = req.params.id;
    const data = await webBannermodel.deleteOne({ _id: id });

    return res.json({ success: "Successfully" });
  }
}

const weBbannerController = new weBbanner();
module.exports = weBbannerController;
