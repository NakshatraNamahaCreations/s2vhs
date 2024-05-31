const { default: mongoose } = require("mongoose");
const addcallModel = require("../model/addcall");
const servicedetailsmodel = require("../model/servicedetails");
const technicianmodel = require("../model/master/technician");
const vPenaltymodel = require("../model/vpenalty");
const moment = require("moment");
const { firebase } = require("../firebase");
const manualModel = require("../model/vendorapp/manual");

function isSameDate(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function isSameWeek(date1, date2) {
  const firstDate = new Date(date1);
  const secondDate = new Date(date2);

  const firstWeek = getWeekNumber(firstDate);
  const secondWeek = getWeekNumber(secondDate);

  return firstWeek === secondWeek;
}

function getWeekNumber(date) {
  const d = new Date(date);

  d.setHours(0, 0, 0, 0);

  d.setDate(d.getDate() + 4 - (d.getDay() || 7));

  const yearStart = new Date(d.getFullYear(), 0, 1);

  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

const sendNotification = async (token) => {
  console.log("token", token);
  try {
    let res = await firebase.messaging().send({
      token: token,
      notification: {
        title: "Hey you earned money",
        body: "hey suman love you",
      },
      data: {
        navigationId: "login",
        chatId: "12345",
      },
    });
    console.log("notifincatiojn send succesfully", res);
  } catch (error) {
    console.log("erro fcm send noification", error);
  }
};

class addcall {
  async outsideVendorassignwithcrm(req, res) {
    try {
      let {
        cardNo,
        serviceInfo,
        serviceId,
        serviceDate,
        bookingDate,
        jobCategory,
        priorityLevel,
        TechorPMorVendorID,
        appoDate,
        appoTime,
        customerFeedback,
        workerName,
        workerAmount,
        daytoComplete,
        techComment,
        backofficerExe,
        backofficerno,
        techName,
        salesExecutive,
        showinApp,
        sendSms,
        inSignDateTime,
        outSignDateTime,
        jobComplete,
        category,
        amount,
        type,
        jobType,
        manualId,
        BackofficeExecutive,
        TechorPMorVendorName,
        cancelOfficerName,
        cancelOfferNumber,
        reason,
        EnquiryId,
        vendorId,
        vendorChargeAmount,
        vVendor,
      } = req.body;

      if (
        vendorChargeAmount === null ||
        vendorChargeAmount === undefined ||
        vendorChargeAmount <= 0
      ) {
        return res.status(400).json({
          error: "Invalid vendor charge amount. Please try again later.",
        });
      }

      const tech = await technicianmodel.findById({ _id: vendorId });

      if (!tech) {
        return res.status(404).json({
          error: "Technician not found.",
        });
      }

      if (vendorChargeAmount > tech?.vendorAmt) {
        return res.status(400).json({
          error:
            "Your wallet amount is insufficient to accept the service. Please recharge.",
        });
      }

      const existingService = await addcallModel.findOne({ serviceId }).exec();
      if (existingService) {
        return res
          .status(400)
          .json({ error: "Service ID already exists in the database" });
      }

      const vendorData = await technicianmodel.findOneAndUpdate(
        { _id: vendorId },
        { $inc: { vendorAmt: -parseFloat(vendorChargeAmount) } },
        { new: true }
      );

      if (!vendorData) {
        return res.status(402).json({
          error: "Failed to update vendor data. Please try again later.",
        });
      }

      const customer = new addcallModel({
        cardNo,
        serviceInfo,
        serviceId,
        serviceDate,
        category,
        bookingDate,
        jobCategory,
        vendorChargeAmount,
        priorityLevel,
        appoDate,
        TechorPMorVendorID,
        appoTime,
        customerFeedback,
        workerName,
        workerAmount,
        daytoComplete,
        techComment,
        salesExecutive,
        backofficerExe,
        backofficerno,
        techName,
        showinApp,
        sendSms,
        type,
        inSignDateTime,
        outSignDateTime,
        jobComplete,
        amount,
        jobType,
        BackofficeExecutive,
        TechorPMorVendorName,
        cancelOfficerName,
        cancelOfferNumber,
        reason,
        EnquiryId,
        vVendor,
      });

      const savedCustomer = await customer.save();

      const updatedService = await servicedetailsmodel.findOneAndUpdate(
        { _id: serviceId },
        { techName: TechorPMorVendorID },
        { new: true }
      );

      if (savedCustomer && updatedService) {
        await manualModel.deleteOne({ serviceId: serviceId });

        return res
          .status(200)
          .json({ success: "DSR data added successfully", user: vendorData });
      } else {
        return res.status(500).json({
          error: "Failed to save customer data or update service details",
        });
      }
    } catch (error) {
      console.error("Error occurred:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deductamtformvendor(req, res) {
    try {
      let vendorId = req.params.id;
      const { fcmtoken } = req.body;

      const data = await addcallModel
        .findOne({
          TechorPMorVendorID: vendorId,

          vVendor: "vendorApp",
          startJobTime: "",
        })
        .lean()
        .sort({ _id: -1 });

      if (data) {
        const currentTime = moment().format("LT");
        const [startTime, endTime] = data.appoTime.split(" - ");
        const currentTimePlus20 = moment(currentTime, "LT")
          .add(20, "minutes")
          .format("LT");

        const today = moment().format("YYYY-MM-DD");
        var currentTimeMoment = moment(currentTimePlus20, "h:mm A");
        var startTimeMoment = moment(startTime, "h:mm A");
        const date1 = moment(today, "DD-MM-YYYY").valueOf();
        const date2 = moment(data?.appoDate, "DD-MM-YYYY").valueOf();

        if (
          currentTimeMoment.isSameOrAfter(startTimeMoment) == true &&
          date1 >= date2
        ) {
          let add = new vPenaltymodel({
            vendorId: vendorId,
            serviceId: data?.serviceId,
            vPenalty: "50",
          });
          let save = add.save();
          const vendorData = await technicianmodel.findOneAndUpdate(
            { _id: vendorId },
            { $inc: { vendorAmt: -50 } },
            { new: true }
          );

          if (save) {
            sendNotification(fcmtoken);
            const data1 = await addcallModel.deleteOne({ _id: data?._id });
            res.status(200).json({
              success: true,
            });
          }
        } else {
          res.status(401).json({
            success: true,
            message:
              "No operation performed, adjusted current time is not within appoTime range.",
          });
        }
      } else {
        res.status(404).json({
          success: false,
          message: "No operation performed, no data found.",
        });
      }
    } catch (error) {
      // Handle errors
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error." });
    }
  }

  async getfindwithvendorandductedamt(req, res) {
    const TechorPMorVendorID = req.params.id;

    try {
      const data = await addcallModel
        .find({ TechorPMorVendorID })
        .select("category serviceDate vendorChargeAmount serviceInfo createdAt") // Selecting only category and serviceDate fields
        .sort({ _id: -1 });

      if (data && data.length > 0) {
        return res.status(200).json({ deducteddata: data });
      } else {
        return res
          .status(404)
          .json({ error: "No data found for the provided ID" });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async getfindwithtechidwithfiltertoday(req, res) {
    const TechorPMorVendorID = req.params.id;
    const today = moment().format("YYYY-MM-DD");
    console.log("today", today, TechorPMorVendorID);
    try {
      const data = await addcallModel
        .find({ TechorPMorVendorID, serviceDate: today })
        .sort({ _id: -1 });

      if (data && data.length > 0) {
        return res.status(200).json({ techservicedata: data });
      } else {
        return res.status(404).json({ techservicedata: [] });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async getfindwithtechidwithfilterCompleted(req, res) {
    const TechorPMorVendorID = req.params.id;

    try {
      const data = await addcallModel
        .find({ TechorPMorVendorID })
        .sort({ _id: -1 });

      if (data && data.length > 0) {
        return res.status(200).json({ techservicedata: data });
      } else {
        return res.status(404).json({ techservicedata: [] });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async getfindwithtechidwithfiltertomorrow(req, res) {
    const TechorPMorVendorID = req.params.id;
    const today = moment().format("YYYY-MM-DD");

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    try {
      const data = await addcallModel
        .find({
          TechorPMorVendorID,
          serviceDate: moment(tomorrow).format("YYYY-MM-DD"),
        })
        .sort({ _id: -1 });

      if (data && data.length > 0) {
        return res.status(200).json({ techservicedata: data });
      } else {
        return res.status(404).json({ techservicedata: [] });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async getVendorServiceReports(req, res) {
    try {
      const { category, date } = req.query;
      const pipeline = [
        {
          $match: {
            category: category,
            serviceDate: date,
            vVendor: "vendorApp",
          },
        },
        {
          $lookup: {
            from: "customers",
            localField: "userId",
            foreignField: "_id",
            as: "customerdata",
          },
        },
        {
          $sort: {
            _id: -1,
          },
        },
      ];

      const data = await addcallModel.aggregate(pipeline);

      if (data) {
        return res.json({
          runningdata: data,
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

  async getVendorDateSchedules(req, res) {
    let { category, startDate, endDate } = req.body;

    try {
      let data = await addcallModel
        .find({
          category,
          vVendor: "vendorApp",
          serviceDate: {
            $gte: startDate,
            $lte: endDate,
          },
        })
        .lean()
        .select("serviceDate");
      if (data && data.length > 0) {
        return res.json({ VendorData: data });
      } else {
        return res.json({ VendorData: [] });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  //new
  async getfindwithvendorcompletedservice(req, res) {
    const TechorPMorVendorID = req.params.id;
    const jobCategory = "YES"; // Set your jobCategory value
    try {
      const data = await addcallModel
        .find({ TechorPMorVendorID, jobCategory })
        .sort({ _id: -1 });

      if (data) {
        return res.status(200).json({ vcomplete: data });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async outsideVendorassign(req, res) {
    let {
      cardNo,
      serviceInfo,
      serviceId,
      serviceDate,
      bookingDate,
      jobCategory,
      priorityLevel,
      TechorPMorVendorID, //this
      appoDate,
      appoTime,
      customerFeedback,
      workerName,
      workerAmount,
      daytoComplete,
      techComment,
      backofficerExe,
      backofficerno,
      techName,
      salesExecutive,
      showinApp,
      sendSms,
      inSignDateTime,
      outSignDateTime,
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
      EnquiryId,
      vendorAmt,
      vendorChargeAmount,
      vVendor,
    } = req.body;

    const convertedAmount = vendorAmt / 100;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Check if the serviceId already exists in the database
      const existingService = await addcallModel
        .findOne({ serviceId })
        .session(session)
        .exec();

      if (existingService) {
        // If serviceId exists, handle the case accordingly (perhaps return an error response)
        await session.abortTransaction();
        session.endSession();
        return res
          .status(400)
          .json({ error: "ServiceId already exists in the database" });
      }

      // Get the latest card number from the database
      const latestCustomer = await addcallModel
        .findOne()
        .sort({ complaintRef: -1 })
        .exec();
      const latestCardNo = latestCustomer ? latestCustomer.complaintRef : 0;

      // Increment the card number by 1
      const newCardNo = latestCardNo + 1;

      const vendorData = await technicianmodel.findOneAndUpdate(
        { _id: TechorPMorVendorID },
        { $inc: { vendorAmt: -convertedAmount } },
        { new: true }
      );

      // Create a new customer instance with the generated card number
      const customer = new addcallModel({
        cardNo,
        serviceInfo,
        serviceId,
        serviceDate,
        category,
        bookingDate,
        jobCategory,
        complaintRef: newCardNo,
        priorityLevel,
        appoDate,
        TechorPMorVendorID,
        appoTime,
        customerFeedback,
        workerName,
        workerAmount,
        daytoComplete,
        techComment,
        salesExecutive,
        backofficerExe,
        backofficerno,
        techName,
        showinApp,
        sendSms,
        type,
        inSignDateTime,
        outSignDateTime,
        jobComplete,
        amount,
        jobType,
        BackofficeExecutive,
        TechorPMorVendorName,
        cancelOfficerName,
        cancelOfferNumber,
        reason,
        EnquiryId,
        vendorChargeAmount,
        vVendor,
      });

      // Save the customer data to the database
      const savedCustomer = await customer.save();
      const update = await servicedetailsmodel.findOneAndUpdate(
        { _id: serviceId },
        { techName: TechorPMorVendorID },
        { new: true }
      );
      if (savedCustomer) {
        await session.commitTransaction();
        session.endSession();

        return res
          .status(200)
          .json({ success: "dsr data added successfully", user: vendorData });
      }
    } catch (error) {
      await session.abortTransaction();
      session.endSession();

      if (
        error.code === 11000 &&
        error.keyPattern &&
        error.keyPattern.serviceId
      ) {
        // Duplicate key error (serviceId already exists)
        return res
          .status(400)
          .json({ error: "ServiceId already exists in the database" });
      }

      console.log(error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getservicedatafromtodate(req, res) {
    const fromDate = req.params.fromDate;
    const toDate = req.params.toDate;

    try {
      const data = await addcallModel
        .find({
          serviceDate: {
            $gte: fromDate,
            $lte: toDate,
          },
        })
        .sort({ _id: -1 });

      if (data && data.length > 0) {
        console.log("data", data.length);
        return res.status(200).json({ filterwithservicedata: data });
      } else {
        return res
          .status(404)
          .json({ error: "No data found for the provided date range" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async save(req, res) {
    let {
      cardNo,
      serviceInfo,
      serviceId,
      serviceDate,
      bookingDate,
      jobCategory,
      priorityLevel,
      TechorPMorVendorID, //this
      appoDate,
      appoTime,
      customerFeedback,
      workerName,
      workerAmount,
      daytoComplete,
      techComment,
      backofficerExe,
      backofficerno,
      techName,
      salesExecutive,
      showinApp,
      sendSms,
      inSignDateTime,
      outSignDateTime,
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
      EnquiryId,
    } = req.body;

    try {
      // Get the latest card number from the database
      const latestCustomer = await addcallModel
        .findOne()
        .sort({ complaintRef: -1 })
        .exec();
      const latestCardNo = latestCustomer ? latestCustomer.complaintRef : 0;

      // Increment the card number by 1
      const newCardNo = latestCardNo + 1;

      // Create a new customer instance with the generated card number
      const customer = new addcallModel({
        cardNo,
        serviceInfo,
        serviceId,
        serviceDate,
        category,
        bookingDate,
        jobCategory,
        complaintRef: newCardNo,
        priorityLevel,
        appoDate,
        TechorPMorVendorID,
        appoTime,
        customerFeedback,
        workerName,
        workerAmount,
        daytoComplete,
        techComment,
        salesExecutive,
        backofficerExe,
        backofficerno,
        techName,
        showinApp,
        sendSms,
        type,
        inSignDateTime,
        outSignDateTime,
        jobComplete,
        amount,
        jobType,
        BackofficeExecutive,
        TechorPMorVendorName,
        cancelOfficerName,
        cancelOfferNumber,
        reason,
        EnquiryId,
      });
      // Save the customer data to the database
      const savedCustomer = await customer.save();

      if (savedCustomer) {
        const update = await servicedetailsmodel.findOneAndUpdate(
          { _id: serviceId },
          { techName: TechorPMorVendorID }
        );
        return res.json({ success: "dsr data added successfully" });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async editdsr(req, res) {
    let id = req.params.id;

    let {
      cardNo,
      serviceInfo,
      serviceDate,
      category,
      bookingDate,
      jobCategory,
      complaintRef,
      priorityLevel,
      appoDate,
      appoTime,
      customerFeedback,
      workerName,
      workerAmount,
      daytoComplete,
      techComment,
      salesExecutive,
      backofficerExe,
      backofficerno,
      techName,
      showinApp,
      sendSms,
      type,
      inSignDateTime,
      outSignDateTime,
      jobComplete,
      amount,
      TechorPMorVendorID,
      TechorPMorVendorName, //this
      jobType,
      cancelOfficerName,
      cancelOfferNumber,
      reason,
    } = req.body;
    let data = await addcallModel.findOneAndUpdate(
      { _id: id },
      {
        cardNo,
        serviceInfo,
        serviceDate,
        category,
        bookingDate,
        jobCategory,
        complaintRef,
        priorityLevel,
        appoDate,
        appoTime,
        customerFeedback,
        workerName,
        workerAmount,
        daytoComplete,
        techComment,
        salesExecutive,
        backofficerExe,
        backofficerno,
        techName,
        showinApp,
        sendSms,
        type,
        inSignDateTime,
        outSignDateTime,
        jobComplete,
        amount,
        jobType,
        TechorPMorVendorID: TechorPMorVendorID,
        TechorPMorVendorName,
        cancelOfficerName,
        cancelOfferNumber,
        reason,
      }
    );
    if (data) {
      return res.json({ success: "Updated" });
    }
  }

  async reshecdule(req, res) {
    try {
      const id = req.params.id;
      const { serviceDate } = req.body;

      // Check if serviceDate is provided
      if (!serviceDate) {
        return res.status(400).json({ error: "Service date is required" });
      }

      // Use the { new: true } option to return the updated document
      const data = await addcallModel.findOneAndUpdate(
        { _id: id },
        { serviceDate },
        { new: true }
      );

      // Check if the document was found and updated
      if (data) {
        return res.json({ success: "Updated", data });
      } else {
        return res.json({ success: "" });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async startJob(req, res) {
    let callId = req.params.id;
    let file = req.file.filename;
    try {
      const updatedCall = await addcallModel.findByIdAndUpdate(
        callId,
        { $set: { startJobTime: new Date(), bImg: file } },
        { new: true }
      );

      if (!updatedCall) {
        return res.status(404).json({ error: "Call not found." });
      }

      res.status(200).json(updatedCall);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Error updating the call data." });
    }
  }

  async endJob(req, res) {
    const callId = req.params.id;
    const {
      remarkOrComments,
      endJobReason,
      jobAmount,
      paymentType,
      chemicals,
    } = req.body;

    let file = req.files[0]?.filename;
    let file1 = req.files[1]?.filename;
    try {
      const updatedCall = await addcallModel.findByIdAndUpdate(
        callId,
        {
          $set: {
            endJobTime: new Date(),
            remarkOrComments,
            endJobReason,
            jobAmount,
            paymentType,
            chemicals,
            sImg: file,
            pImg: file1,
          },
        },
        { new: true }
      );

      if (!updatedCall) {
        return res.status(404).json({ error: "Call not found." });
      }
      res.status(200).json(updatedCall);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Error updating the call data." });
    }
  }

  async endJobforvendor(req, res) {
    const callId = req.params.id;
    const {
      remarkOrComments,
      endJobReason,
      jobAmount,
      paymentType,
      chemicals,
    } = req.body;

    let file = req.files[0]?.filename;
    let file1 = req.files[1]?.filename;
    let file2 = req.files[1]?.filename;
    try {
      const updatedCall = await addcallModel.findByIdAndUpdate(
        callId,
        {
          $set: {
            endJobTime: new Date(),
            remarkOrComments,
            endJobReason,
            jobAmount,
            paymentType,
            chemicals,
            sImg: file,
            pImg: file1,
            dsImg: file2,
          },
        },
        { new: true }
      );

      if (!updatedCall) {
        return res.status(404).json({ error: "Call not found." });
      }
      res.status(200).json(updatedCall);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Error updating the call data." });
    }
  }
  async getfindwithtechid(req, res) {
    const TechorPMorVendorID = req.params.id;

    try {
      const data = await addcallModel
        .find({ TechorPMorVendorID })
        .sort({ _id: -1 });

      if (data && data.length > 0) {
        return res.status(200).json({ techservicedata: data });
      } else {
        return res
          .status(404)
          .json({ error: "No data found for the provided ID" });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async getfindwithvendorAppTodayhistroyid(req, res) {
    const TechorPMorVendorID = req.params.id;

    const Today = moment().format("YYYY-MM-DD");
    try {
      const data = await addcallModel
        .find({ TechorPMorVendorID: TechorPMorVendorID, serviceDate: Today })
        .select(
          "amount appoDate serviceDate endJobTime serviceInfo.service serviceInfo.desc serviceInfo.GrandTotal"
        ) // Include appoDate and serviceDate if needed
        .sort({ _id: -1 });

      if (data && data.length > 0) {
        const totalAmount = data.reduce(
          (acc, curr) => acc + parseFloat(curr.amount),
          0
        );
        return res
          .status(200)
          .json({ vendorTodaydata: data, totalAmount: totalAmount });
      } else {
        return res
          .status(404)
          .json({ error: "No data found for the provided ID" });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async findthetotalcountsofjobs(req, res) {
    const TechorPMorVendorID = req.params.id;

    const Today = moment().format("YYYY-MM-DD");
    const startOfWeek = moment().startOf("week").format("YYYY-MM-DD");
    const startOfMonth = moment().startOf("month").format("YYYY-MM-DD");

    try {
      const todayData = await addcallModel.countDocuments({
        TechorPMorVendorID: TechorPMorVendorID,
        serviceDate: Today,
      });

      const thisWeekData = await addcallModel.countDocuments({
        TechorPMorVendorID: TechorPMorVendorID,
        serviceDate: { $gte: startOfWeek, $lte: Today },
      });

      const thisMonthData = await addcallModel.countDocuments({
        TechorPMorVendorID: TechorPMorVendorID,
        serviceDate: { $gte: startOfMonth, $lte: Today },
      });

      return res.status(200).json({
        todayData: todayData,
        thisWeekData: thisWeekData,
        thisMonthData: thisMonthData,
      });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async findwithvendorAppThisWeekHistoryId(req, res) {
    const TechorPMorVendorID = req.params.id;

    // Get the start and end dates of the current week
    const startOfWeek = moment().startOf("week").format("YYYY-MM-DD");
    const endOfWeek = moment().endOf("week").format("YYYY-MM-DD");

    try {
      const data = await addcallModel
        .find({
          TechorPMorVendorID: TechorPMorVendorID,
          serviceDate: { $gte: startOfWeek, $lte: endOfWeek }, // Filter by serviceDate within this week
        })
        .select(
          "amount appoDate serviceDate endJobTime serviceInfo.service serviceInfo.desc serviceInfo.GrandTotal"
        ) // Include appoDate and serviceDate if needed
        .sort({ _id: -1 });

      if (data && data.length > 0) {
        const totalAmount = data.reduce(
          (acc, curr) => acc + parseFloat(curr.amount),
          0
        );
        return res
          .status(200)
          .json({ vendorThisWeekData: data, totalAmount: totalAmount });
      } else {
        return res
          .status(404)
          .json({ error: "No data found for the provided ID this week" });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async findwithvendorAppThisMonthHistoryId(req, res) {
    const TechorPMorVendorID = req.params.id;

    // Get the start and end dates of the current month
    const startOfMonth = moment().startOf("month").format("YYYY-MM-DD");
    const endOfMonth = moment().endOf("month").format("YYYY-MM-DD");

    try {
      const data = await addcallModel
        .find({
          TechorPMorVendorID: TechorPMorVendorID,
          serviceDate: { $gte: startOfMonth, $lte: endOfMonth }, // Filter by serviceDate within this month
        })
        .select(
          "amount appoDate serviceDate endJobTime serviceInfo.service serviceInfo.desc serviceInfo.GrandTotal"
        ) // Include appoDate and serviceDate if needed
        .sort({ _id: -1 });

      if (data && data.length > 0) {
        // Calculate the total amount
        const totalAmount = data.reduce(
          (acc, curr) => acc + parseFloat(curr.amount),
          0
        );
        return res
          .status(200)
          .json({ vendorThisMonthData: data, totalAmount: totalAmount });
      } else {
        return res
          .status(404)
          .json({ error: "No data found for the provided ID this month" });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async findwithvendorAppCustomMonthHistoryId(req, res) {
    const TechorPMorVendorID = req.params.id;
    const { startDate, endDate } = req.query;
    const formattedStartDate = startDate.replace(/\//g, "-");
    const formattedEndDate = endDate.replace(/\//g, "-");

    try {
      const data = await addcallModel
        .find({
          TechorPMorVendorID: TechorPMorVendorID,
          serviceDate: { $gte: formattedStartDate, $lte: formattedEndDate },
        })
        .select(
          "amount appoDate serviceDate endJobTime serviceInfo.service serviceInfo.desc serviceInfo.GrandTotal"
        )
        .sort({ _id: -1 });

      if (data && data.length > 0) {
        return res.status(200).json({ vendorThisMonthData: data });
      } else {
        return res
          .status(404)
          .json({ error: "No data found for the provided ID this month" });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async vendorcompletedhistroy(req, res) {
    let TechorPMorVendorID = req.params.id;

    try {
      const data = await addcallModel
        .find({ TechorPMorVendorID })
        .select(
          "appoDate appoTime serviceInfo.service serviceInfo.desc serviceInfo.GrandTotal endJobTime"
        )
        .sort({ _id: -1 });

      if (data) {
        return res.status(200).json({ data });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async getfindwithpmid(req, res) {
    const TechorPMorVendorID = req.params.id;

    try {
      const data = await addcallModel
        .find({ TechorPMorVendorID })
        .sort({ _id: -1 });

      if (data && data.length > 0) {
        return res.status(200).json({ addcall: data });
      } else {
        return res
          .status(404)
          .json({ error: "No data found for the provided ID" });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  async getfindwithtechidwithfilter(req, res) {
    const TechorPMorVendorID = req.params.id;

    try {
      const data = await addcallModel
        .find({ TechorPMorVendorID })
        .sort({ _id: -1 });

      if (data && data.length > 0) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const startOfWeek = new Date(today);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Start of the current week (Sunday)

        const filteredData = {
          todayData: data.filter((item) =>
            isSameDate(new Date(item.serviceDate), today)
          ),
          tomorrowData: data.filter((item) =>
            isSameDate(new Date(item.serviceDate), tomorrow)
          ),
          yesterdayData: data.filter((item) =>
            isSameDate(new Date(item.serviceDate), yesterday)
          ),
          thisWeekData: data.filter((item) =>
            isSameWeek(new Date(item.serviceDate), startOfWeek)
          ),
          // Add other filters for this week, etc.
        };

        return res.status(200).json({ techservicedata: filteredData });
      } else {
        return res.status(404).json({ techservicedata: [] });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async findtodayservicesoutvendor(req, res) {
    const TechorPMorVendorID = req.params.id;
    const today = moment().format("YYYY-MM-DD");
    const tomorrow = moment().add(1, "days").format("YYYY-MM-DD");

    try {
      const todayData = await addcallModel
        .find({ TechorPMorVendorID, serviceDate: today })
        .select("serviceDate")
        .sort({ _id: -1 });

      const tomorrowData = await addcallModel
        .find({ TechorPMorVendorID, serviceDate: tomorrow })
        .select("serviceDate")
        .sort({ _id: -1 });

      const responseData = {
        today: todayData && todayData.length > 0 ? todayData : [],
        tomorrow: tomorrowData && tomorrowData.length > 0 ? tomorrowData : [],
      };

      return res.status(200).json({ techservicedata: responseData });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async schedulejob(req, res) {
    let callId = req.params.id;
    try {
      const updatedCall = await addcallModel.findByIdAndUpdate(
        callId,
        {
          $set: {
            rescheduledate: req.body.rescheduledate,
            reschedulereason: req.body.reschedulereason,
            Tname: req.body.Tname,
            rescheduletime: req.body.rescheduletime,
          },
        },
        { new: true }
      );

      if (!updatedCall) {
        return res.status(404).json({ error: "Call not found." });
      }

      res.status(200).json(updatedCall);
    } catch (error) {
      res.status(500).json({ error: "Error updating the call data." });
    }
  }

  async Tcancelproject(req, res) {
    let callId = req.params.id;
    try {
      const updatedCall = await addcallModel.findByIdAndUpdate(
        callId,
        {
          $set: {
            Tcancelreason: req.body.Tcancelreason,
            Tcanceldate: req.body.Tcanceldate,
            Tcancelname: req.body.Tcancelname,
          },
        },
        { new: true }
      );

      if (!updatedCall) {
        return res.status(404).json({ error: "Call not found." });
      }

      res.status(200).json(updatedCall);
    } catch (error) {
      res.status(500).json({ error: "Error updating the call data." });
    }
  }
  async postcategory(req, res) {
    let { category } = req.body;
    let data = await addcallModel.find({ category }).sort({ _id: -1 });

    if (data) {
      return res.json({ addcall: data });
    }
  }

  async startproject(req, res) {
    let callId = req.params.id;
    let { startPMDate } = req.body;
    try {
      const updatedCall = await addcallModel.findByIdAndUpdate(
        callId,
        { $set: { startproject: "start", startPMDate } },
        { new: true }
      );

      if (!updatedCall) {
        return res.status(404).json({ error: "Call not found." });
      }

      res.status(200).json(updatedCall);
    } catch (error) {
      res.status(500).json({ error: "Error updating the call data." });
    }
  }

  async getallagreedata(req, res) {
    try {
      let data = await addcallModel.aggregate([
        {
          $lookup: {
            from: "servicedetails",
            localField: "serviceId",
            foreignField: "_id",
            as: "servicedetails",
          },
        },
        {
          $lookup: {
            from: "customers",
            localField: "cardNo",
            foreignField: "cardNo",
            as: "customer",
          },
        },
        {
          $lookup: {
            from: "quotes",
            localField: "cardNo",
            foreignField: "cardNo",
            as: "quotedata",
          },
        },
        {
          $lookup: {
            from: "technicians",
            localField: "TechorPMorVendorID",
            foreignField: "_id",
            as: "techdata",
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

  async getallagreedata1(req, res) {
    try {
      let data = await addcallModel.aggregate([
        {
          $lookup: {
            from: "servicedetails",
            localField: "cardNo",
            foreignField: "cardNo",
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

  async getservicedatadate(req, res) {
    const serviceDate = req.params.serviceDate; // Assuming the ID is provided in the request parameters

    try {
      const data = await addcallModel.find({ serviceDate }).sort({ _id: -1 });

      if (data && data.length > 0) {
        return res.status(200).json({ filterwithservicedata: data });
      } else {
        return res
          .status(404)
          .json({ error: "No data found for the provided ID" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async filterwithtectandservicedate(req, res) {
    const serviceDate = req.params.serviceDate;
    const TechorPMorVendorID = req.params.techid;

    try {
      let query = { serviceDate };

      if (TechorPMorVendorID) {
        query.TechorPMorVendorID = TechorPMorVendorID;
      }

      const data = await addcallModel.find(query).sort({ _id: -1 });

      if (data && data.length > 0) {
        return res.status(200).json({ techfilterid: data });
      } else {
        return res
          .status(404)
          .json({ error: "No data found for the provided parameters" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async getserviceIDanddate(req, res) {
    const serviceDate = req.params.serviceDate;
    const serviceId = req.params.serviceId;

    try {
      let query = { serviceDate };

      if (serviceId) {
        query.serviceId = serviceId;
      }

      const data = await addcallModel.find(query).sort({ _id: -1 });

      if (data && data.length > 0) {
        return res.status(200).json({ filterwithservicedata: data });
      } else {
        return res.status(404).json({ filterwithservicedata: [] });
      }
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async getalldsrcall(req, res) {
    const id = req.params.id;
    try {
      const data = await addcallModel.find({ TechorPMorVendorID: id });
      if (!data) {
        return res.status(401).json({ error: "Something went wrong" });
      }
      return res.status(200).json({ addcall: data });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getfilteredrunningdataforpm(req, res) {
    const id = req.params.id;
    try {
      let data = await servicedetailsmodel.aggregate([
        {
          $match: {
            serviceId: id,
            category: "Painting",
          },
        },
        {
          $lookup: {
            from: "customers",
            localField: "serviceInfo.userId",
            foreignField: "_id",
            as: "customer",
          },
        },
        {
          $lookup: {
            from: "enquiryadds",
            localField: "EnquiryId",
            foreignField: "EnquiryId",
            as: "enquiryData",
          },
        },
        {
          $lookup: {
            from: "enquiryfollowups",
            localField: "EnquiryId",
            foreignField: "EnquiryId",
            as: "enquiryFollowupData",
          },
        },
        {
          $lookup: {
            from: "payments",
            localField: "userId",
            foreignField: "customer",
            as: "paymentData",
          },
        },
        {
          $lookup: {
            from: "treatments",
            localField: "EnquiryId",
            foreignField: "EnquiryId",
            as: "treatmentData",
          },
        },
        {
          $lookup: {
            from: "quotes",
            localField: "EnquiryId",
            foreignField: "EnquiryId",
            as: "quotedata",
          },
        },
        {
          $lookup: {
            from: "manpowers",
            localField: "serviceId",
            foreignField: "serviceId",
            as: "manpowerdata",
          },
        },
        {
          $lookup: {
            from: "materials",
            localField: "serviceId",
            foreignField: "serviceId",
            as: "materialdata",
          },
        },
        {
          $lookup: {
            from: "works",
            localField: "serviceId",
            foreignField: "serviceId",
            as: "materialdetails",
          },
        },

        {
          $sort: {
            _id: -1,
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

  //Delete customer
  async deletecustomer(req, res) {
    let id = req.params.id;
    const data = await addcallModel.deleteOne({ _id: id });
    return res.json({ success: "Delete Successf" });
  }
}
const addcallcontroller = new addcall();
module.exports = addcallcontroller;
