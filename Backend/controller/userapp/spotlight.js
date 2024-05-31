const spotlightbannerModel = require("../../model/userapp/spotlight");

class spotlightbanner {
  async postaddspotlightbanner(req, res) {
    let file = req.file?.filename;
    let {category}=req.body;

    try {
      let newbanner = new spotlightbannerModel({
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

  async getallspotlightbanner(req, res) {

    let banner = await spotlightbannerModel.find({ }).sort({_id:-1});

    if (banner) {
      return res.json({ spotlightbanner: banner });
    } else {
      return res.status(403).json({ error: "not able find banner" });
    }
  }

  async postdeletespotlightbanner(req, res) {
    let id = req.params.id;
    const data = await spotlightbannerModel.deleteOne({ _id: id });

    return res.json({ success: "Successfully" });
  }
}

const spotlightbannerController = new spotlightbanner();
module.exports = spotlightbannerController;
