const sPaymentmodel = require("../../model/paymentgatway/servicePayment");

class sPayment {
  async getpaymentstatusByUserId(req, res) {
    let userId = req.params.userId;
    try {
      const status = await sPaymentmodel.find({
        userId,
      });

      if (status) {
        return res.json({ getPaymentStatus: status });
      } else {
        return res.json({ getPaymentStatus: [] });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Failed to fetch user status" });
    }
  }
  async getAllPayment(req, res) {
    try {
      const payment = await sPaymentmodel.find({});
      if (payment) {
        res.status(200).json({ success: payment });
      } else {
        res.status(404).json({ error: "something went wrong" });
      }
    } catch (error) {
      console.log("error:", error);
    }
  }

  async getagreeuserdata(req, res) {
    try {
      let data = await sPaymentmodel.aggregate([
        {
          $lookup: {
            from: "servicepayments",
            localField: "userId",
            foreignField: "_id",
            as: "userdata",
          },
        },
      ]);

      if (data) {
        return res.json({ userdata: data });
      } else {
        return res.json({ error: "Something went wrong" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }


 
}

const sPaymentcontroller = new sPayment();
module.exports = sPaymentcontroller;
