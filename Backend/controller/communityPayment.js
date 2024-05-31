const communityPaymentModal = require("../model/communityPayment");

class communityPayment {
  async addCommunityPayment(req, res) {
    let {
      amountPaidToCommunity,
      paymentMode,
      comment,
      paymentAddedDate,
      communityId,
    } = req.body;

    try {
      let newCommunityPayment = new communityPaymentModal({
        amountPaidToCommunity,
        paymentMode,
        comment,
        paymentAddedDate,
        communityId,
      });

      let save = newCommunityPayment.save();
      if (save) {
        return res.status(200).json({ success: "success" });
      } else {
        return res.status(500).json({ Error: "Error while saving the data." });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getCommunityPayments(req, res) {
    try {
      const communityId = req.params.id;
      const payment = await communityPaymentModal.find({
        communityId: communityId,
      });
      if (payment.length > 0) {
        return res.status(200).json({ paymentData: payment });
      } else {
        return res.status(404).json({ message: "No Payment Found" });
      }
    } catch (error) {
      console.log("getCommunityPayments", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async deleteCommunityPayment(req, res) {
    try {
      let id = req.params.id;
      const data = await communityPaymentModal.deleteOne({ _id: id });
      if (data) {
        return res.status(200).json({ success: "Delete successfully" });
      } else {
        return res.status(500).json({ Error: "Can't do to" });
      }
    } catch (error) {
      console.log("error:", error);
    }
  }

}
const CommunityPaymentController = new communityPayment();
module.exports = CommunityPaymentController;
