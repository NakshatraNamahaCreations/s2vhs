const communitymodel = require("../model/community");

class community {
  //add
  async addcommunity(req, res) {
    let {
      appartmentname,
      communityn,
      percentage,
      projectmanager,
      contactperson,
      email,
      contactno,
      login,
      password,
      cpassword,
    } = req.body;

    try {
      let community = new communitymodel({
        appartmentname,
        communityn,
        percentage,
        projectmanager,
        contactperson,
        email,
        login,
        contactno,
        password,
        cpassword,
      });

      let save = community.save();
      if (save) {
        return res.json({ success: "customer added successfully" });
      }
    } catch (error) {
      console.log(error);
    }
  }
  async giveRights(req, res) {
    try {
      const userData = req.params.userId;
      const {
        city,
        category,
        master,
        enquiry,
        enquiryFollowup,
        survey,
        quote,
        customer,
        quoteFollowup,
        dsr,
        runningProjects,
        closeProjects,
        b2b,
        community,
        reports,
      } = req.body;
      let obj = {};
      // Check if the user exists
      const user = await communitymodel.findOne({ _id: userData });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      if (typeof master !== "undefined") {
        obj["master"] = master;
      }
      if (typeof enquiry !== "undefined") {
        obj["enquiry"] = enquiry;
      }
      if (typeof enquiryFollowup !== "undefined") {
        obj["enquiryFollowup"] = enquiryFollowup;
      }
      if (typeof survey !== "undefined") {
        obj["survey"] = survey;
      }
      if (typeof quote !== "undefined") {
        obj["quote"] = quote;
      }
      if (typeof customer !== "undefined") {
        obj["customer"] = customer;
      }
      if (typeof quoteFollowup !== "undefined") {
        obj["quoteFollowup"] = quoteFollowup;
      }
      if (typeof dsr !== "undefined") {
        obj["dsr"] = dsr;
      }
      if (typeof runningProjects !== "undefined") {
        obj["runningProjects"] = runningProjects;
      }
      if (typeof closeProjects !== "undefined") {
        obj["closeProjects"] = closeProjects;
      }
      if (typeof b2b !== "undefined") {
        obj["b2b"] = b2b;
      }
      if (typeof community !== "undefined") {
        obj["community"] = community;
      }
      if (typeof reports !== "undefined") {
        obj["reports"] = reports;
      }

      // if (typeof cityId !== "undefined") {
      //   obj["cityId"] = cityId;
      // }
      // if (typeof category !== "undefined") {
      //   obj["category"] = category;
      // }
      // Update category if provided
      if (typeof category !== "undefined") {
        // Save category data
        // const categoryData = await categorymodel.create(category);
        obj["category"] = category;
      }

      // Update city if provided
      if (typeof city !== "undefined") {
        // Save city data
        // const cityData = await cityymodel.create(city);
        obj["city"] = city;
      }
      let isData = await communitymodel.findOneAndUpdate(
        { _id: userData },
        { $set: obj },
        {
          new: true,
        }
      );
      if (isData) {
        return res
          .status(200)
          .json({ message: "Updated successfully", data: isData });
      } else {
        return res.status(500).json({ status: false, msg: "No such profile" });
      }
    } catch (error) {
      console.log("Error in updateprofile : ", error);
      return res.status(403).send({
        message:
          "Something went wrong while updating your details Please try again later.",
      });
    }
  }


  //edit
  async editcommunity(req, res) {
    let id = req.params.id;

    let {
      appartmentname,
      communityn,
      percentage,
      projectmanager,
      contactperson,
      email,
      contactno,
      login,
      password,
      cpassword,
    } = req.body;
    let data = await communitymodel.findOneAndUpdate(
      { _id: id },
      {
        appartmentname,
      communityn,
      percentage,
      projectmanager,
      contactperson,
      email,
      contactno,
      login,
      password,
      cpassword,
      }
    );
    if (data) {
      return res.json({ success: "Updated" });
    }
  }

  //Get all
  async getallcommunity(req, res) {
    let data = await communitymodel.find({}).sort({ _id: -1 });
    if (data) {
      return res.status(200).json({ community: data });
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }


  async getServicesByIdInCummunity(req, res) {
    try {
      // const customerId = req.query.customerId;
      // const userId = req.query.userId;
      let data = await communitymodel.aggregate([
        {
          $lookup: {
            from: "servicedetails",
            localField: "_id",
            foreignField: "communityId",
            as: "communityData",
          },
        },
      ]);
      if (data) {
        // console.log("data===", data);
        return res.json({ communityDetails: data });
      }
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  
  //Delete
  async deletecommunity(req, res) {
    let id = req.params.id;
    const data = await communitymodel.deleteOne({ _id: id });
    return res.json({ success: "Delete Successf" });
  }
}
const communitycontroller = new community();
module.exports = communitycontroller;
