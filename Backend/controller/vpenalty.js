const vPenaltymodel = require("../model/vpenalty");
const servicedetailsmodel = require("../model/servicedetails");
const mongoose = require("mongoose");

class vPenalty {
  async addvPenalty(req, res) {
    let { vendorId,serviceId,vPenalty} = req.body;
    
    if (!vendorId ) {
      return res.status(500).json({ error: "Field must not be empty" });
    } else {
      let add = new vPenaltymodel({
        serviceId,
        vPenalty,
        vendorId
        
      });
      let save = add.save();
      if (save) {
        return res.json({ sucess: "Added successfully" });
      }
    }
  }

   
  
  async getvPenalty(req, res) {
    let id=req.params.id;
    let vPenalty = await vPenaltymodel.find({vendorId:id}).sort({ _id: -1 });
    if (vPenalty) {
      return res.json({ vPenalty: vPenalty });
    }
  }

  async getpenaltywithservice1(req, res) {
    try {
      let vendorId = req.params.id;
      let data = await vPenaltymodel.aggregate([
        {
          $match: { vendorId: mongoose.Types.ObjectId(vendorId) } // match vendorId
        },
        {
          $lookup: {
            from: "servicedetails",
            localField: "serviceId",
            foreignField: "_id",
            as: "servicedetails",
          },
        },
        {
          $unwind: "$servicedetails" // unwind the servicedetails array
        }
      ]);
      if (data) {
        return res.json({ addcall: data });
      }
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  
  async getpenaltywithservice(req, res) {
    try {
      let data = await vPenaltymodel.aggregate([
        {
          $lookup: {
            from: "servicedetails",
            localField: "serviceId",
            foreignField: "_id",
            as: "servicedetails",
          },
        },
      ]);
      if (data) {
        return res.json({ addcall: data });
      }
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async getpenaltywithservice1(req, res) {
    try {
      let vendorId = req.params.id;
  
      const pipeline = [
        {
          $match: {
            vendorId: mongoose.Types.ObjectId(vendorId),
          
          },
        },
        {
          $lookup: {
            from: "servicedetails",
            localField: "serviceId",
            foreignField: "_id",
            as: "servicedetails",
          },
        },
        {
          $sort: {
            _id: -1,
          },
        },
      ];

      const data = await vPenaltymodel.aggregate(pipeline);

      if (data) {
        return res.json({
          vPenaltyData: data,
        });
      } else {
        return res.status(404).json({ message: "No data found" });
      }
    } catch (error) {
      console.log("error.message", error.message);
      return res
        .status(500)
        .json({ error: error.message || "Something went wrong" });
    }
  }

  async deletevPenalty(req, res) {
    let id = req.params.id;
    let data = await vPenaltymodel.deleteOne({ _id: id });
    return res.json({ sucess: "Successfully deleted" });
  }
}

const vPenaltycontroller = new vPenalty();
module.exports = vPenaltycontroller;
