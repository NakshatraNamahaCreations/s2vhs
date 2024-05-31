const feqModel = require("../../model/userapp/feq");

class feq {
  async postaddfeq(req, res) {
    try {
      const { title, category } = req.body;
      const files = req.files;
      if (!files || files.length === 0) {
        return res.status(400).json({ error: "No files uploaded" });
      }

      const images = files.map((file) => ({
        data: file.filename,
        contentType: file.mimetype,
      }));

      const newfeq = new feqModel({
        img: images,
        title: title,
        category,
      });

      await newfeq.save();

      return res.json({ success: "feq added successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getallfeq(req, res) {
    let feq = await feqModel.find({}).sort({ _id: -1 });

    if (feq) {
      return res.json({ feq: feq });
    } else {
      return res.status(403).json({ error: "not able find feq" });
    }
  }

  async postdeletefeq(req, res) {
    let id = req.params.id;
    const data = await feqModel.deleteOne({ _id: id });

    return res.json({ success: "Successfully" });
  }

  async updatefeq(req, res) {
    try {
      const categoryId = req.params.ccid;
      const { category, title } = req.body;
      const file = req.file?.filename;

      const findCategory = await feqModel.findOne({
        _id: categoryId,
      });
      if (!findCategory) {
        return res.json({ error: "No such record found" });
      }
      //
      findCategory.category = category || findCategory.category;
      findCategory.title = title || findCategory.title;
      if (file) {
        findCategory.img = file;
      }

      const updateCategory = await feqModel.findOneAndUpdate(
        { _id: categoryId },
        findCategory,
        { new: true } // Return the updated document
      );
      return res.json({
        message: "Updated successfully",
        date: updateCategory,
      });
    } catch (error) {
      console.log("error", error.message);
      return res.status(500).json({ error: "Unable to update the Category" });
    }
  }
}

const feqController = new feq();
module.exports = feqController;
