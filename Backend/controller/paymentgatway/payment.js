const axios = require("axios");
const sha256 = require("sha256");
const Paymentgetwaymodel = require("../../model/paymentgatway/payment");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const sPaymentmodel = require("../../model/paymentgatway/servicePayment");
const technicianmodel = require("../../model/master/technician");
const servicedetailsmodel = require("../../model/servicedetails");

const customerModel = require("../../model/customer");

const generateQueryString = (obj, prefix = "") => {
  const queryStringArray = [];

  const serializeValue = (value, key) => {
    if (typeof value === "object" && value !== null) {
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          serializeValue(item, `${key}[${index}]`);
        });
      } else {
        Object.keys(value).forEach((subKey) => {
          serializeValue(value[subKey], `${key}.${subKey}`);
        });
      }
    } else {
      queryStringArray.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      );
    }
  };

  Object.keys(obj).forEach((key) => {
    serializeValue(obj[key], prefix ? `${prefix}.${key}` : key);
  });

  return queryStringArray.join("&");
};

const addServiceDetails = async (data) => {
  let {
    customerData,
    dCategory,
    cardNo,
    contractType,
    service,
    planName,
    slots, // this 03-10
    serviceId,
    serviceCharge,
    dateofService,
    desc,
    firstserviceDate,
    serviceFrequency,
    startDate,
    category,
    expiryDate,
    date,
    time,
    dividedDates,
    dividedCharges,
    dividedamtDates,
    dividedamtCharges,
    oneCommunity,
    communityId,
    BackofficeExecutive,
    deliveryAddress,
    type,
    userId,
    selectedSlotText,
    AddOns,
    TotalAmt,
    GrandTotal,
    totalSaved,
    discAmt,
    couponCode,
    city,
    paymentMode,
    status,
    customerName,
    email,
    EnquiryId,
    complaint,
    ctechName,
    markerCoordinate,
  } = data;

  console.log("customerData", customerData);
  try {
    let dividedDateObjects = [];
    let dividedamtDateObjects = [];
    let dividedamtChargeObjects = [];

    if (contractType === "AMC") {
      if (dividedDates) {
        dividedDateObjects = dividedDates.map((date) => {
          const uniqueId = uuidv4(); // Generate a UUID for the date
          return { id: uniqueId, date: date };
        });
      }

      if (dividedamtDates) {
        dividedamtDateObjects = dividedamtDates.map((date) => {
          const uniqueId = uuidv4(); // Generate a UUID for the date
          return { id: uniqueId, date: date };
        });
      }

      if (dividedamtCharges) {
        dividedamtChargeObjects = dividedamtCharges.map((charge) => {
          const uniqueId = uuidv4(); // Generate a UUID for the charge
          return { id: uniqueId, charge };
        });
      }
    } else {
      if (dividedDates) {
        dividedDateObjects = dividedDates.map((date) => {
          const uniqueId = uuidv4(); // Generate a UUID for the date
          return { id: uniqueId, date: date };
        });
      }
      if (dividedamtDates) {
        dividedamtDateObjects = dividedamtDates.map((date) => {
          const uniqueId = uuidv4(); // Generate a UUID for the date
          return { id: uniqueId, date: date };
        });
      }
      if (dividedamtCharges) {
        dividedamtChargeObjects = dividedamtCharges.map((charge) => {
          const uniqueId = uuidv4(); // Generate a UUID for the charge
          return { id: uniqueId, charge };
        });
      }
    }
    const userUpdate = {};

    if (customerName) {
      userUpdate.customerName = customerName;
    }

    if (city) {
      userUpdate.city = city;
    }

    if (category) {
      userUpdate.category = category;
    }

    if (email) {
      userUpdate.email = email;
    }

    let discAmtNumber = 0;

    let percentage = 0;

    if (GrandTotal >= 1500) {
      percentage = GrandTotal * 0.02;
    }
    if (discAmt) {
      discAmtNumber = parseFloat(discAmt) - percentage;
    }

    const user = await customerModel.findOneAndUpdate(
      { _id: userId },
      {
        $set: userUpdate,
        $inc: { wAmount: discAmt ? -discAmtNumber : percentage },
      },
      { new: true }
    );

    let add = new servicedetailsmodel({
      customerData: {
        _id: user?._id,
        EnquiryId: user?.EnquiryId,
        customerName: user?.customerName,
        category: user?.category,
        mainContact: user?.mainContact,
        email: user?.email,
        approach: user?.approach,
      },
      cardNo: cardNo,
      dCategory,
      planName: planName,
      category: category,
      contractType: contractType,
      service: service,
      serviceId: serviceId,
      slots: slots,
      serviceCharge: serviceCharge,
      dateofService: dateofService,
      desc: desc,
      serviceFrequency: serviceFrequency,
      startDate: startDate,
      expiryDate: expiryDate,
      firstserviceDate: firstserviceDate,
      date: date,
      time: time,
      dividedDates: dividedDateObjects, // Store the array of objects with IDs and dates
      dividedCharges,
      dividedamtDates: dividedamtDateObjects,
      dividedamtCharges: dividedamtChargeObjects,
      oneCommunity,
      communityId,
      BackofficeExecutive,
      deliveryAddress,
      type,
      userId,
      selectedSlotText,

      AddOns,
      GrandTotal,
      totalSaved,
      discAmt,
      couponCode,
      city,
      paymentMode: "online",
      TotalAmt,
      status,
      EnquiryId,
      complaint,
      ctechName,
      markerCoordinate,
    });

    let save = await add.save();

    if (save) {
      // return res.json({
      //   success: "Added successfully",
      //   data: save,
      //   user: user,
      // });
    }
  } catch (error) {
    console.log("error", error.message);
    // return res.status(500).json({ error: "An error occurred" });
  }
};
class Paymentgetway {
  async yogipayment(req, res) {
    const merchantTransactionId = uuidv4();
    const { amount, number, MUID, transactionId } = req.body;

    const saltkey = "a01d076b-dc15-4c1f-bac8-c53852439d04";
    const MerchantId = "M1PX7BZG1R4G";
    console.log("merchantTransactionId", merchantTransactionId);

    // Ensure latitude and longitude are numbers
    if (req.body.markerCoordinate) {
      req.body.markerCoordinate.latitude = parseFloat(
        req.body.markerCoordinate.latitude
      );
      req.body.markerCoordinate.longitude = parseFloat(
        req.body.markerCoordinate.longitude
      );
    }
    if (req.body.deliveryAddress && req.body.deliveryAddress.markerCoordinate) {
      req.body.deliveryAddress.markerCoordinate.latitude = parseFloat(
        req.body.deliveryAddress.markerCoordinate.latitude
      );
      req.body.deliveryAddress.markerCoordinate.longitude = parseFloat(
        req.body.deliveryAddress.markerCoordinate.longitude
      );
    }

    const data = {
      merchantId: MerchantId,
      merchantTransactionId: transactionId,
      merchantUserId: MUID,
      amount: 100,
      redirectUrl: `http://localhost:8080/api/payment/yogistatus/${transactionId}?${generateQueryString(
        req.body
      )}`,
      redirectMode: "POST",
      mobileNumber: number,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const payload = JSON.stringify(data);
    const payloadMain = Buffer.from(payload).toString("base64");
    const keyIndex = 1;
    const string = payloadMain + "/pg/v1/pay" + saltkey;

    const sha256hash = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = sha256hash + "###" + keyIndex;

    const prodUrl = "https://api.phonepe.com/apis/hermes/pg/v1/pay";
    const options = {
      method: "POST",
      url: prodUrl,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
      data: {
        request: payloadMain,
      },
    };

    try {
      const response = await axios.request(options);
      const redirectUrl =
        response.data.data.instrumentResponse.redirectInfo.url;
      console.log(redirectUrl);
      return res.json({ redirectUrl });
    } catch (error) {
      console.error("Error initiating payment:", error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async yogiStatus(req, res) {
    const { transactionId } = req.params;

    const keyIndex = 1;
    const saltkey = "a01d076b-dc15-4c1f-bac8-c53852439d04";
    const string = `/pg/v1/status/M1PX7BZG1R4G/${transactionId}` + saltkey;
    const sha256hash = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = sha256hash + "###" + keyIndex;
    const options = {
      method: "GET",
      url: `https://api.phonepe.com/apis/hermes/pg/v1/status/M1PX7BZG1R4G/${transactionId}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
        "X-MERCHANT-ID": `M1PX7BZG1R4G`,
      },
    };
    try {
      const response = await axios.request(options);
      if (response.data.success === true) {
        addServiceDetails(req.query);

        const responseData = new sPaymentmodel({
          userId: req.query.userId,
          code: response.data.code,
          serviceId: req.query.serviceId,
          data: {
            ...response.data.data,
            paymentInstrument: JSON.stringify(
              response.data.data.paymentInstrument
            ),
          },
          message: response.data.message,
          success: response.data.success,
        });

        await responseData.save();
        return res.redirect("http://localhost:3000/Paymentsuccess");
      } else {
        console.log("payemnt failure");
        return res.redirect("http://localhost:3000/Paymentfailure");
      }
    } catch (error) {
      console.error("Error checking payment status:", error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async initiatePaymentforvendor(req, res) {
    const transactionId = uuidv4();

    try {
      const { amount, vendorId, number } = req.body;

      if (!vendorId) {
        return res.status(400).json({ error: "Please try again later" });
      }

      // Ensure amount is a valid number
      if (isNaN(amount) || amount <= 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid amount. Please provide a valid positive number.",
        });
      }

      const base64 = Buffer.from(
        JSON.stringify({
          merchantId: "M1PX7BZG1R4G",
          merchantTransactionId: transactionId,
          merchantUserId: "asfnjk212",
          amount,
          redirectUrl: "",
          redirectMode: "POST",
          callbackUrl: `https://api.vijayhomeservicebengaluru.in/api/payment/vendorstatus/M1PX7BZG1R4G/${transactionId}/${vendorId}/${amount}`,
          mobileNumber: number,
          paymentInstrument: {
            type: "PAY_PAGE",
          },
        })
      ).toString("base64");

      const sha256encode =
        sha256(base64 + "/pg/v1/paya01d076b-dc15-4c1f-bac8-c53852439d04") +
        "###1";

      // Save payment details to the database
      const newPayment = new Paymentgetwaymodel({
        amount,
        serviceId,
      });

      await newPayment.save();

      return res.status(200).json({
        success: true,
        message: "Payment initiated successfully",
        base64,
        sha256encode,
        merchantId: "M1PX7BZG1R4G",
        merchantTransactionId: transactionId,
      });
    } catch (error) {
      console.error("Error initiating payment:", error);
      return res.status(500).json({
        success: false,
        message: "Payment initiation failed. Please try again.",
      });
    }
  }

  async checkTransactionStatusinvendor(req, res) {
    const { merchantId, merchantTransactionId, vendorId, vendorAmt } =
      req.params;
    const convertedAmount = Number(vendorAmt / 100);

    const saltKey = "a01d076b-dc15-4c1f-bac8-c53852439d04";
    const url = `/pg/v1/status/${merchantId}/${merchantTransactionId}`;
    const xVerify =
      crypto
        .createHash("sha256")
        .update(url + saltKey)
        .digest("hex") +
      "###" +
      1;

    try {
      const response = await axios.get(
        `https://api.phonepe.com/apis/hermes${url}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-VERIFY": xVerify,
            "X-MERCHANT-ID": "M1PX7BZG1R4G", // Remove the space before "X-MERCHANT-ID"
          },
        }
      );

      response.data.data.paymentInstrument = JSON.stringify(
        response.data.data.paymentInstrument
      );

      // Save the responseData to MongoDB
      if (response.data.code === "PAYMENT_SUCCESS") {
        const vendorData = await technicianmodel.findOneAndUpdate(
          { _id: vendorId },
          { $inc: { vendorAmt: convertedAmount } },
          { new: true }
        );

        const responseData = new sPaymentmodel({
          userId: vendorId,
          code: response.data.code,

          data: response.data.data,
          message: response.data.message,
          success: response.data.success,
        });
        await responseData.save();
        return res.status(200).json({
          success: true,
          responseData: response.data,
        });
      }
    } catch (error) {
      console.error("Error checking transaction status:", error);
      res.status(500).json({
        success: false,
        message: "Failed to check transaction status.",
      });
    }
  }

  async initiatePayment(req, res) {
    const transactionId = uuidv4();

    try {
      const { amount, serviceId } = req.body;

      // Ensure amount is a valid number
      if (isNaN(amount) || amount <= 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid amount. Please provide a valid positive number.",
        });
      }

      const base64 = Buffer.from(
        JSON.stringify({
          merchantId: "M1PX7BZG1R4G",
          merchantTransactionId: transactionId,
          merchantUserId: "pankaj123",
          amount,
          redirectUrl: "",
          redirectMode: "POST",
          callbackUrl: `https://api.vijayhomeservicebengaluru.in/api/payment/status/M1PX7BZG1R4G/${transactionId}`,
          mobileNumber: "8951592630",
          paymentInstrument: {
            type: "PAY_PAGE",
          },
        })
      ).toString("base64");

      const sha256encode =
        sha256(base64 + "/pg/v1/paya01d076b-dc15-4c1f-bac8-c53852439d04") +
        "###1";

      // Save payment details to the database
      const newPayment = new Paymentgetwaymodel({
        amount,
        serviceId,
      });

      await newPayment.save();

      return res.status(200).json({
        success: true,
        message: "Payment initiated successfully",
        base64,
        sha256encode,
        merchantId: "M1PX7BZG1R4G",
        merchantTransactionId: transactionId,
      });
    } catch (error) {
      console.error("Error initiating payment:", error);
      return res.status(500).json({
        success: false,
        message: "Payment initiation failed. Please try again.",
      });
    }
  }

  async checkTransactionStatus(req, res) {
    const { merchantId, merchantTransactionId, userId, serviceId } = req.params;
    const saltKey = "a01d076b-dc15-4c1f-bac8-c53852439d04";
    const url = `/pg/v1/status/${merchantId}/${merchantTransactionId}`;
    const xVerify =
      crypto
        .createHash("sha256")
        .update(url + saltKey)
        .digest("hex") +
      "###" +
      1;

    try {
      const response = await axios.get(
        `https://api.phonepe.com/apis/hermes${url}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-VERIFY": xVerify,
            " X-MERCHANT-ID": "M1PX7BZG1R4G",
          },
        }
      );

      response.data.data.paymentInstrument = JSON.stringify(
        response.data.data.paymentInstrument
      );

      // Save the responseData to MongoDB
      if (response.data.code === "PAYMENT_SUCCESS") {
        const responseData = new sPaymentmodel({
          userId: userId,
          code: response.data.code,
          serviceId: serviceId,
          data: response.data.data,
          message: response.data.message,
          success: response.data.success,
        });
        await responseData.save();
      }

      return res.status(200).json({
        success: true,
        responseData: response.data,
      });
    } catch (error) {
      console.error("Error checking transaction status:", error);
      res.status(500).json({
        success: false,
        message: "Failed to check transaction status.",
      });
    }
  }

  async initiatePaymentforvendor(req, res) {
    const transactionId = uuidv4();

    try {
      const { amount, serviceId, vendorId } = req.body;

      // Ensure amount is a valid number
      if (isNaN(amount) || amount <= 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid amount. Please provide a valid positive number.",
        });
      }

      const base64 = Buffer.from(
        JSON.stringify({
          merchantId: "M1PX7BZG1R4G",
          merchantTransactionId: transactionId,
          merchantUserId: "asfnjk212",
          amount,
          redirectUrl: "",
          redirectMode: "POST",
          callbackUrl: `https://api.vijayhomeservicebengaluru.in/api/payment/status/M1PX7BZG1R4G/${transactionId}/${vendorId}/${amount}`,
          mobileNumber: "8951592630",
          paymentInstrument: {
            type: "PAY_PAGE",
          },
        })
      ).toString("base64");

      const sha256encode =
        sha256(base64 + "/pg/v1/paya01d076b-dc15-4c1f-bac8-c53852439d04") +
        "###1";

      // Save payment details to the database
      const newPayment = new Paymentgetwaymodel({
        amount,
        serviceId,
      });

      await newPayment.save();

      return res.status(200).json({
        success: true,
        message: "Payment initiated successfully",
        base64,
        sha256encode,
        merchantId: "M1PX7BZG1R4G",
        merchantTransactionId: transactionId,
      });
    } catch (error) {
      console.error("Error initiating payment:", error);
      return res.status(500).json({
        success: false,
        message: "Payment initiation failed. Please try again.",
      });
    }
  }

  async checkTransactionStatusinvendor(req, res) {
    const { merchantId, merchantTransactionId, vendorId, vendorAmt } =
      req.params;
    const convertedAmount = vendorAmt / 100;
    const saltKey = "a01d076b-dc15-4c1f-bac8-c53852439d04";
    const url = `/pg/v1/status/${merchantId}/${merchantTransactionId}`;
    const xVerify =
      crypto
        .createHash("sha256")
        .update(url + saltKey)
        .digest("hex") +
      "###" +
      1;

    try {
      const response = await axios.get(
        `https://api.phonepe.com/apis/hermes${url}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-VERIFY": xVerify,
            "X-MERCHANT-ID": "M1PX7BZG1R4G", // Remove the space before "X-MERCHANT-ID"
          },
        }
      );

      response.data.data.paymentInstrument = JSON.stringify(
        response.data.data.paymentInstrument
      );

      // Save the responseData to MongoDB
      if (response.data.code === "PAYMENT_SUCCESS") {
        const vendorData = await technicianmodel.findOneAndUpdate(
          { _id: vendorId },
          { $inc: { vendorAmt: convertedAmount } },
          { new: true }
        );

        const responseData = new sPaymentmodel({
          userId: vendorId,
          code: response.data.code,

          data: response.data.data,
          message: response.data.message,
          success: response.data.success,
        });
        await responseData.save();
        return res.status(200).json({
          success: true,
          responseData: response.data,
        });
      }
    } catch (error) {
      console.error("Error checking transaction status:", error);
      res.status(500).json({
        success: false,
        message: "Failed to check transaction status.",
      });
    }
  }

  async getpaymentstatusByUserId(req, res) {
    let userId = req.params.userId;
    try {
      const status = await Paymentgetwaymodel.find({
        userId: userId,
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
      const payment = await Paymentgetwaymodel.find({});
      if (payment) {
        res.status(200).json({ success: payment });
      } else {
        res.status(404).json({ error: "something went wrong" });
      }
    } catch (error) {
      console.log("error:", error);
    }
  }
}

const paymentgetwaycontroller = new Paymentgetway();
module.exports = paymentgetwaycontroller;
