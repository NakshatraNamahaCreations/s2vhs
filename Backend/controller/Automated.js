const automatedServiceModel = require("../model/Automated");

class AutomatedService {
  async addvendorconfigure(req, res) {
    try {
      const { city, category, discount, datewise, action } = req.body;
      const data = await automatedServiceModel.find({ city, category });

      if (data.length > 0) {
        return res
          .status(401)
          .json({ error: "City and category already added" });
      }

      const newAutomatedService = new automatedServiceModel({
        city,
        category,
        discount,
        action,
        datewise,
      });

      const savedData = await newAutomatedService.save();

      if (savedData) {
        return res.status(200).json({ success: "Data added successfully" });
      } else {
        return res.status(500).json({ error: "Failed to save data" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async editAutomated(req, res) {
    try {
      const id = req.params.id;
      const { city, category, discount, datewise, action } = req.body;
      const data1 = await automatedServiceModel.find({ city, category });

      if (data1.length > 0) {
        return res
          .status(401)
          .json({ error: "City and category already added" });
      }

      const data = await automatedServiceModel.findOneAndUpdate(
        { _id: id },
        { city, category, discount, action, datewise },
        { new: true } // This option returns the modified document
      );

      if (data) {
        return res.json({ success: "Updated", data });
      } else {
        return res.status(404).json({ error: "Not Found" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async checkthevendorCharge(req, res) {
    const { city, category } = req.query;
    console.log("yogi", city, category);
    const categoryNames = category.map((cat) => cat.name); // Extracting category names from the array

    try {
      const data = await automatedServiceModel.findOne({
        city,
        category: { $in: categoryNames },
      });

      if (data && data.length > 0) {
        return res.status(200).json({ AutomatedService: data });
      } else {
        return res.status(404).json({
          error: "No automated services found for the provided criteria",
        });
      }
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async getallAutomatedService(req, res) {
    let data = await automatedServiceModel.find({});
    if (data) {
      return res.status(200).json({ AutomatedService: data });
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async deleteVendorConfigure(req, res) {
    let id = req.params.id;
    let data = await automatedServiceModel.deleteOne({ _id: id });
    return res.json({ sucess: "Successfully deleted" });
  }
}
const AutomatedServicecontroller = new AutomatedService();
module.exports = AutomatedServicecontroller;
