const PaymentModal = require("../model/payment");

class Payment {
  async addPayment(req, res) {
    try {
      let {
        paymentDate,
        paymentType,
        paymentMode,
        amount,
        Comment,
        customerId,
        serviceId,
        serviceDate
      } = req.body;
      if ( !paymentMode ||!amount ) {
        return res.status(500).json({ error: "Field must not be empty" });
      } else {
        let add = new PaymentModal({
          paymentDate,
          paymentType,
          paymentMode,
          amount,
          Comment,
          customer: customerId,
          serviceId,
          serviceDate
        });
        const savedPayment = await add.save();
        if (savedPayment) {
          return res.status(200).json({ success: "Payment added successfully" });
        }
      }
    } catch (error) {
      return res
        .status(500)
        .json({ error: "An error occurred while adding payment" });
    }
  }

  async getPaymentByCustomerId(req, res) {
    try {
      const customerId = req.params.customerId;
      const payments = await PaymentModal.find({ serviceId: customerId });
  
      console.log(payments);
      if (!payments) {
        return res.status(404).json({ error: 'Payment details not found' });
      }
  
      return res.status(200).json({ payments });
    } catch (error) {
      return res.status(500).json({ error: 'An error occurred' });
    }
  }
  async updatePayment(req, res) {
    try {
      const paymentId = req.params.id;
      const { paymentDate, paymentType, paymentMode, amount, Comment, serviceId,
        serviceDate } =
        req.body;

      // Find the payment by ID and update its data
      const updatedPayment = await PaymentModal.findByIdAndUpdate(
        paymentId,
        {
          paymentDate,
          paymentType,
          paymentMode,
          amount,
          Comment,
          serviceId,
          serviceDate
        },
        { new: true } // Set {new: true} to return the updated document
      );
      if (!updatedPayment) {
        return res.status(404).json({ error: "Payment not found" });
      }
      return res.status(200).json({
        success: "Payment updated successfully",
        payment: updatedPayment,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "An error occurred while updating payment" });
    }
  }

}

const paymentController = new Payment();
module.exports = paymentController;
