const appresubcatModel = require("../../model/userapp/resubcat");

class appsubcat {
  async addappresubcat(req, res) {
    let { subcategory, sub_subcategory } = req.body;
    let file = req.files[0]?.filename;

    let add = new appresubcatModel({
      subcategory: subcategory,
      sub_subcategory: sub_subcategory,

      resubcatimg: file,
    });
    let save = add.save();
    if (save) {
      return res.json({ sucess: "subcategory name added successfully" });
    }
  }

  //edit user
  //   async editappresubcat(req, res) {
  //     let id = req.params.id;
  //     let { subcategory, sub_subcategory } = req.body;

  //     let file = req.files[0]?.filename;

  //     // console.log("subcategory",subcategory,sub_subcategory)

  //     // let data = await appresubcatModel.findOneAndUpdate(
  //     //   { _id: id },
  //     //   { subcategory:subcategory, sub_subcategory:sub_subcategory,resubcatimg:file },{new:true}
  //     // );
  //     // if (data) {
  //     //   return res.json({ success: "Updated" });
  //     // }

  //     let findService = await appresubcatModel.findOne({
  //       _id: id,
  //     });
  //     console.log("findService",findService)
  //     if (!findService) {
  //       return res.status(404).send("Not found");
  //     }

  //     console.log(findService?.sub_subcategory)
  //     subcategory = sub_subcategory ==="undefined"?findService?.subcategory :subcategory;
  //     sub_subcategory = sub_subcategory ==="undefined"?findService?.sub_subcategory:sub_subcategory;

  // console.log(subcategory,sub_subcategory)
  //     const saveLink = await appresubcatModel.findOneAndUpdate(
  //       {
  //         _id: id,
  //       },
  //       {subcategory,sub_subcategory},
  //       { new: true }
  //     );
  //     return res
  //     .status(200)
  //     .json({ message: "Link added to this serive",  });
  //   }

  async editappresubcat(req, res) {
    try {
      const subSubCategoryId = req.params.id;
      const { subcategory, sub_subcategory } = req.body;
      const file = req.file?.filename;

      const findSubsubCategory = await appresubcatModel.findOne({
        _id: subSubCategoryId,
      });
      if (!findSubsubCategory) {
        return res.json({ error: "No such record found" });
      }
      findSubsubCategory.subcategory = subcategory || findSubsubCategory.subcategory;
      findSubsubCategory.sub_subcategory =sub_subcategory || findSubsubCategory.sub_subcategory;
      if (file) {
        findSubsubCategory.resubcatimg = file;
      }
      const updatedUser = await appresubcatModel.findOneAndUpdate(
        { _id: subSubCategoryId },
        findSubsubCategory,
        { new: true }
      );
      return res
        .status(200)
        .json({ success: " updated successfully", data: updatedUser });
    } catch (error) {
      console.log("Error updating profile:", error);
      return res.status(500).json({ error: "An error occurred" });
    }
  }

  async getappresubcat(req, res) {
    let subcategory = await appresubcatModel.find({});
    if (subcategory) {
      return res.json({ subcategory: subcategory });
    }
  }

  async postappresubcat(req, res) {
    let { subcategory } = req.body;

    let data = await appresubcatModel.find({ subcategory }).sort({ _id: -1 });

    if (data) {
      return res.json({ subcategory: data });
    }
  }

  async deleteappresubcat(req, res) {
    let id = req.params.id;
    let data = await appresubcatModel.deleteOne({ _id: id });
    return res.json({ sucess: "Successfully deleted" });
  }
}

const appresubcatcontroller = new appsubcat();
module.exports = appresubcatcontroller;
