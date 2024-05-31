const appsubcatModel = require("../../model/userapp/subcat");
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

class appsubcat {
  async addappsubcat(req, res) {
    let { subcategory, category, videolink, homePagetitle } = req.body;
    const receivedOthService = JSON.parse(req.body.othservice);
    let file = req.files[0]?.filename;
    let file1 = req.files[1]?.filename;

    let add = new appsubcatModel({
      subcategory: subcategory,
      category: category,
      videolink: videolink,
      subcatimg: file,
      subcatvideo: file1,
      homePagetitle: homePagetitle,
      othservice: receivedOthService,
    });

    try {
      let save = await add.save();
      if (save) {
        // Invalidate cache after adding a new subcategory
        cache.del("allAppSubcategories");
        return res.json({ success: "Subcategory added successfully" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Failed to add subcategory" });
    }
  }

  async editappsubcat(req, res) {
    const subcategoryId = req.params.id;
    const { subcategory, category, videolink, homePagetitle, othservice } =
      req.body;

    const file = req.files[0]?.filename;
    const file1 = req.files[1]?.filename;

    const decodedFile = file ? decodeURIComponent(file) : null;
    const decodedFile1 = file1 ? decodeURIComponent(file1) : null;

    try {
      const findCategory = await appsubcatModel.findOne({ _id: subcategoryId });
      if (!findCategory) {
        return res.json({ error: "No data found" });
      }

      findCategory.category = category || findCategory.category;
      findCategory.othservice =
        JSON.parse(othservice) || findCategory.othservice;
      findCategory.subcategory = subcategory || findCategory.subcategory;
      findCategory.homePagetitle = homePagetitle || findCategory.homePagetitle;
      findCategory.videolink = videolink || findCategory.videolink;

      if (req.files[0]) {
        if (
          decodedFile &&
          (req.files[0].mimetype.startsWith("image/") ||
            req.files[0].mimetype === "application/octet-stream" ||
            req.files[0].mimetype === "image/jpeg")
        ) {
          findCategory.subcatimg = decodedFile;
        }
        if (decodedFile && req.files[0].mimetype === "video/mp4") {
          findCategory.subcatvideo = decodedFile;
        }
      }

      if (req.files[1]) {
        if (
          decodedFile1 &&
          (req.files[1].mimetype.startsWith("image/") ||
            req.files[1].mimetype === "application/octet-stream" ||
            req.files[1].mimetype === "image/jpeg")
        ) {
          findCategory.subcatimg = decodedFile1;
        }
        if (decodedFile1 && req.files[1].mimetype === "video/mp4") {
          findCategory.subcatvideo = decodedFile1;
        }
      }

      let updatedData = await appsubcatModel.findOneAndUpdate(
        { _id: subcategoryId },
        findCategory,
        { new: true }
      );

      if (updatedData) {
        // Invalidate cache after updating a subcategory
        cache.del("allAppSubcategories");
        return res.json({ success: "Updated", data: updatedData });
      } else {
        return res.json({ error: "Update failed" });
      }
    } catch (error) {
      console.log("error", error);
      return res
        .status(500)
        .json({ error: "Unable to update the subcategory" });
    }
  }

  async getappsubcat(req, res) {
    let cachedSubcategories = cache.get("allAppSubcategories");
    if (cachedSubcategories) {
      return res.json({ subcategory: cachedSubcategories });
    } else {
      try {
        let subcategory = await appsubcatModel.find({});
        if (subcategory) {
          cache.set("allAppSubcategories", subcategory);
          return res.json({ subcategory: subcategory });
        } else {
          return res.status(404).json({ error: "No subcategories found" });
        }
      } catch (error) {
        return res
          .status(500)
          .json({ error: "Failed to retrieve subcategories" });
      }
    }
  }

  async postappsubcat(req, res) {
    let { category } = req.body;
    try {
      let subcategory = await appsubcatModel.find({ category });
      if (subcategory) {
        return res.json({ subcategory: subcategory });
      } else {
        return res
          .status(404)
          .json({ error: "No subcategories found for the specified category" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Failed to retrieve subcategories" });
    }
  }

  async deleteappsubcat(req, res) {
    let id = req.params.id;
    try {
      let data = await appsubcatModel.deleteOne({ _id: id });
      if (data.deletedCount > 0) {
        // Invalidate cache after deleting a subcategory
        cache.del("allAppSubcategories");
        return res.json({ success: "Successfully deleted" });
      } else {
        return res.status(404).json({ error: "Subcategory not found" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Failed to delete subcategory" });
    }
  }
}

const appsubcatcontroller = new appsubcat();
module.exports = appsubcatcontroller;
