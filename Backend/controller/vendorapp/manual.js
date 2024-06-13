const manualModel = require("../../model/vendorapp/manual");
const technicianmodel = require("../../model/vendorapp/manual");
const { firebase } = require("../../firebase");

const sendNotificationToMultipleDevices = async () => {
  try {
    // Fetch FCM tokens from the database
    const vendors = await technicianmodel.find({}).select("fcmtoken");

    const filterdata = vendors.filter((i) => i.fcmtoken);
    // Check if vendors array is not empty
    if (!vendors || vendors.length === 0) {
      console.log("No vendors found");
      return;
    }

    // Loop through each vendor and send the notification
    const notificationPromises = filterdata.map(async (vendor) => {
      try {
        await firebase.messaging().send({
          token: vendor.fcmtoken,
          notification: {
            title: "Job alert",
            body: "New job assigned from crm please check",
          },
          data: {
            navigationId: "login",
            chatId: "12345",
          },
        });
      } catch (error) {
        console.error(
          `Error sending notification to vendor with FCM token ${vendor.fcmtoken}:`,
          error
        );
      }
    });

    // Wait for all notifications to be sent
    const results = await Promise.all(notificationPromises);

    // Log results
    results.forEach((res, index) => {
      console.log(`Notification ${index + 1} sent successfully:`, res);
    });
  } catch (error) {
    console.log("Error sending FCM notification:", error);
  }
};

class ManualJobs {
  async addjobs(req, res) {
    try {
      let { serviceID, vendorID, type, vendorName } = req.body;
      let add = new manualModel({
        serviceID,
        vendorID,
        vendorName,
        type,
      });
      let save = add.save();
      if (save) {
        return res.json({ sucess: "added successfully" });
      }
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({ error: "Unable to update " });
    }
  }

  async save(req, res) {
    let {
      serviceInfo,
      serviceId,
      serviceDate,
      bookingDate,
      jobCategory,
      TechorPMorVendorID, //this
      appoDate,
      appoTime,
      workerName,
      workerAmount,
      daytoComplete,
      techComment,
      backofficerExe,
      backofficerno,
      techName,
      salesExecutive,
      jobComplete,
      category,
      amount,
      type,
      jobType,
      BackofficeExecutive,
      TechorPMorVendorName,
      cancelOfficerName,
      cancelOfferNumber,
      reason,
      vCancel,
    } = req.body;

    const checkService = await manualModel.findOne({
      serviceId: serviceId,
      TechorPMorVendorID: TechorPMorVendorID,
    });

    if (checkService) {
      return res
        .status(401)
        .json({ error: "Service ID already exists in the database" });
    }
    try {
      const customer = new manualModel({
        serviceInfo,
        serviceId,
        serviceDate,
        category,
        bookingDate,
        jobCategory,

        appoDate,
        TechorPMorVendorID,
        appoTime,

        workerName,
        workerAmount,
        daytoComplete,
        techComment,
        salesExecutive,
        backofficerExe,
        backofficerno,
        techName,

        type,
        jobComplete,
        amount,
        jobType,
        BackofficeExecutive,
        TechorPMorVendorName,
        cancelOfficerName,
        cancelOfferNumber,
        reason,
        vCancel,
      });
      // Save the customer data to the database
      const savedCustomer = await customer.save();

      if (savedCustomer) {
        sendNotificationToMultipleDevices();
        return res.json({ success: "dsr data added successfully" });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async editdsr(req, res) {
    try {
      let id = req.params.id;

      let { vCancel, cancelDate } = req.body;
      let data = await manualModel.findOneAndUpdate(
        { _id: id },
        {
          vCancel,
          cancelDate,
        },
        { new: true }
      );
      if (data) {
        return res.json({ success: "Updated" });
      }
    } catch (error) {
      console.log("console vcancel error", error.message);
    }
  }

  async findwithmanulserviceids(req, res) {
    try {
      let serviceID = req.params.id;

      const data = await manualModel.findOne({ serviceID });
      if (data) {
        return res.status(200).json({ data: data });
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  async getvendoraggreData(req, res) {
    try {
      const vendorId = req.params?.id;
      const data = await manualModel.find({
        TechorPMorVendorID: vendorId,
        $or: [{ vCancel: "" }, { vCancel: { $exists: false } }],
      });
      if (data.length === 0) {
        return res.status(404).json({ error: "no data found!" });
      } else {
        return res.status(200).json({ data: data });
      }
    } catch (error) {
      console.log("error.message", error.message);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // async getvendoraggreData(req, res) {
  //   try {
  //     const vendorId = req.params?.id;
  //     const data = await manualModel.find({
  //       TechorPMorVendorID: vendorId,
  //       vCancel: "",
  //     });
  //     if (data.length === 0) {
  //       return res.status(404).json({ error: "no data found!" });
  //     } else {
  //       return res.status(200).json({ data: data });
  //     }
  //   } catch (error) {
  //     console.log("error.message", error.message);
  //   }
  // }

  async getmanualdatafromcrm(req, res) {
    let data = await manualModel.find({}).sort({ _id: -1 });
    if (data) {
      return res.status(200).json({ data: data });
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
}
const Manualcontroller = new ManualJobs();
module.exports = Manualcontroller;
