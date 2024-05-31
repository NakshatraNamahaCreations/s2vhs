const b2bfollowupModel = require("../model/B2Bfollowup");

class addb2b {
  async AddB2Bfollowup(req, res) {
    try {
      // Generate the series number
      // const uniqueNumber = await generateSeriesNumber();
      let {
        B2BId,
        category,
        folldate,
        staffname,
        response,
        desc,
        value,  
        colorcode,
        nxtfoll,
      } = req.body;
      const newVendor = new b2bfollowupModel({
        B2BId,
        category,
        folldate,
        staffname,
        response,
        desc,
        value,
        colorcode,
        nxtfoll,
      });
      newVendor.save().then((data) => {
        return res
          .status(200)
          .json({ Success: "Account created. Please login" });
      });
    } catch (error) {
      console.error("Error enquiry add:", error);
    }
  }

  //Get all
  async getallB2Bfollowup(req, res) {
    let data = await b2bfollowupModel.find({}).sort({ _id: -1 });
    if (data) {
      return res.status(200).json({ B2B: data });
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }



  async getb2bflwdata(req, res) {
    try {
      let data = await b2bfollowupModel.aggregate([
        {
          $lookup: {
            from: "enquiryadds",
            localField: "B2BId",
            foreignField: "B2BId",
            as: "enquirydata",
          },
        },
      ]);

      if (data) {
        return res.json({ B2B: data });
      }
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  //Delete
  async deleteb2b(req, res) {
    let id = req.params.id;
    const data = await b2bfollowupModel.deleteOne({ _id: id });
    return res.json({ success: "Delete Successf" });
  }
}
const b2bfollowupcontroller = new addb2b();
module.exports = b2bfollowupcontroller;
