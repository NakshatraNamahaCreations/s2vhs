const ratingModel = require("../../model/userapp/rating");

class rating {
  async postaddrating(req, res) {
    let file = req.file?.filename;
    const { rating,review,ServiceName ,userId,serviceID,customerName} = req.body;
    try {
      let newrating = new ratingModel({
        rating: rating,
        review:review,
        ServiceName:ServiceName,
        userId:userId,
        serviceID:serviceID,
        customerName:customerName
      });

      let save = newrating.save();

      if (save) {
        return res.json({ success: "rating added successfully" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getallrating(req, res) {

    let rating = await ratingModel.find({ }).sort({_id:-1});

    if (rating) {
      return res.json({ rating: rating });
    } else {
      return res.status(403).json({ error: "not able find rating" });
    }
  }


  async findbyserviceID(req, res) {
    try {
      let ServiceName = req.params.id;
  
      // Assuming you have a "ServiceName" field in your schema
      let rating = await ratingModel.find({ ServiceName: ServiceName }).sort({ _id: -1 });
  
      if (rating) {
        return res.json({ rating: rating });
      } else {
        return res.status(404).json({ error: "No ratings found for the specified ServiceID" });
      }
    } catch (error) {
      return res.status(500).json({ error: "An error occurred while fetching data" });
    }
  }

  async getratingdatawithuser(req, res) {
    try {
      const serviceId = req.params.id;
  
      let data = await ratingModel.aggregate([
        {
          $match: { ServiceID: serviceId }
        },
      
        {
          $lookup: {
            from: "customers",
            localField: "userId",
            foreignField: "_id",
            as: "customer",
          },
        },
      ]);

      if (data && data.length > 0) {
        return res.json({ rating: data[0] }); // Assuming you only expect one record
      } else {
        return res.status(404).json({ error: "Data not found for the specified serviceId" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  

  async postdeleterating(req, res) {
    let id = req.params.id;
    const data = await ratingModel.deleteOne({ _id: id });

    return res.json({ success: "Successfully" });
  }
}

const ratingController = new rating();
module.exports = ratingController;
