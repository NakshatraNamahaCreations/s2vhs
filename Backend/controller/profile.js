const profileModel = require("../model/profile");

class profile {
  async profileBanner(req, res) {
    try {
      const { content, userId } = req.body;
      const file = req.file;

      if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const newProfile = new profileModel({
        profileimg: file.filename,
        content,
        userId,
      });

      const savedProfile = await newProfile.save();

      if (savedProfile) {
        return res
          .status(200)
          .json({ success: "Banner Added", profile: savedProfile });
      } else {
        return res.status(500).json({ error: "Something went wrong" });
      }
    } catch (error) {
      console.error("Error in profileBanner:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getprofile(req, res) {
    const profile = await profileModel.find({});
    if (profile) {
      return res.status(200).json({ profile: profile });
    } else {
      return res.status(403).json({ error: "not able to find" });
    }
  }

  async deletebanner(req, res) {
    let banner = req.params.bannerid;
    const data = await profileModel.deleteOne({ _id: banner });
    if (data) {
      return res.json({ success: "Deleted Successfully" });
    } else {
      return res.json({ error: "not able to complete" });
    }
  }

  async editprofile(req, res) {
    try {
      let id = req.params.id;
      let file = req.files?.filename;
      let data = await profileModel.findByIdAndUpdate(
        { _id: id },
        {
          profileimg: file,
        }
      );
      if (data) {
        return res.json({ success: "Updated" });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const profilecontroller = new profile();
module.exports = profilecontroller;
