const AddOnsModel = require("../../model/userapp/serviceAddons");

class serviceAddOns {
  async addServiceAddOns(req, res) {
    try {
      let {
        addOnsCategory,
        addOnsName,
        addOnsPrice,
        addOnsOfferPrice,
        addOnsDescription,
      } = req.body;

      let file = req.file?.filename;
      let add = new AddOnsModel({
        addOnsImage: file,
        addOnsCategory,
        addOnsName,
        addOnsPrice,
        addOnsOfferPrice,
        addOnsDescription,
      });

      const data = await add.save();
      console.log(data);
      return res
        .status(200)
        .json({ success: "Add-On's added successfully", service: data });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "An error occurred while adding the Add-On's" });
    }
  }

  async getAllAddOns(req, res) {
    let AddOns = await AddOnsModel.find({}).sort({ _id: -1 });

    if (AddOns) {
      return res.json({ AddOns: AddOns });
    } else {
      return res.status(403).json({ error: "not able find addon's" });
    }
  }

  // 14-9 today
  async updateAddOns(req, res) {
    try {
      const addOnsId = req.params.id;
      const {
        addOnsCategory,
        addOnsName,
        addOnsPrice,
        addOnsOfferPrice,
        addOnsDescription,
      } = req.body;
      const file = req.file?.filename;

      const findAddOns = await AddOnsModel.findOne({
        _id: addOnsId,
      });
      if (!findAddOns) {
        return res.json({ error: "No such record found" });
      }
      //
      findAddOns.addOnsCategory = addOnsCategory || findAddOns.addOnsCategory;
      findAddOns.addOnsName = addOnsName || findAddOns.addOnsName;
      findAddOns.addOnsPrice = addOnsPrice || findAddOns.addOnsPrice;
      findAddOns.addOnsOfferPrice =
        addOnsOfferPrice || findAddOns.addOnsOfferPrice;

      findAddOns.addOnsDescription =
        addOnsDescription || findAddOns.addOnsDescription;
      if (file) {
        findAddOns.addOnsImage = file;
      }

      const updateData = await AddOnsModel.findOneAndUpdate(
        { _id: addOnsId },
        findAddOns,
        { new: true }
      );
      return res.json({
        message: "Updated successfully",
        date: updateData,
      });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({ error: "Unable to update the addon's" });
    }
  }

  async deleteAddOns(req, res) {
    try {
      let id = req.params.id;
      const data = await AddOnsModel.deleteOne({ _id: id });

      if (data.deletedCount === 1) {
        return res.status(200).json({ success: "Successfully deleted" });
      } else {
        return res.status(404).json({ error: "Item not found" });
      }
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "An error occurred while deleting" });
    }
  }
}

const ServiceAddonsController = new serviceAddOns();
module.exports = ServiceAddonsController;