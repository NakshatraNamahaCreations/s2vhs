const technicianmodel = require("../../model/master/technician");
const multer = require("multer");
const express = require("express");
const { firebase } = require("../../firebase");
const router = express.Router();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/vendorImg");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// const sendNotification = async () => {
//   try {
//     let res = await firebase.messaging().send({
//       token:
//         "fWG1T899S6GqC2KyKafdTG:APA91bGk8_YOk9mijGkQJdhP0ipzqK4a2CUCnXMVDEs7dVsZMI5yohAJoQHUX5SRNxF2m4rXlL-EjsBuXEH6guFA4lhm_2fuzFFBblk1AqRgE5ewmeZtgYdxD3_P8xeA23ZnW4oxyZUn",
//       notification: {
//         title: "Hey you earned money",
//         body: "hey suman love you",
//       },
//       data: {
//         navigationId: "login",
//         chatId: "12345",
//       },
//     });
//     console.log("notifincatiojn send succesfully", res);
//   } catch (error) {
//     console.log("erro fcm send noification", error);
//   }
// };

const sendNotificationToMultipleDevices = async () => {
  try {
    // Fetch FCM tokens from the database
    const vendors = await technicianmodel.find({}).select("fcmtoken");
    console.log(
      "vendors--",
      vendors.filter((i) => i.fcmtoken)
    );

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
            title: "Hey you earned money",
            body: "hey suman love you",
          },
          data: {
            navigationId: "login",
            chatId: "12345",
          },
        });
        console.log(
          `Notification sent successfully to vendor with FCM token: ${vendor.fcmtoken}`
        );
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

//Outside vendor
router.route("/fcmpushnotificationoutvendor").post(async (req, res) => {
  sendNotificationToMultipleDevices();
});
//Outside vendor
router.route("/outvendor").post(async (req, res) => {
  const { number, password, fcmtoken } = req.body;
  try {
    if (!number) {
      return res.status(400).json({ error: "Please enter your Mobile Number" });
    }
    if (!password) {
      return res.status(400).json({ error: "Please enter your password" });
    }

    const user = await technicianmodel.findOne({ number });
    if (!user) {
      return res
        .status(404)
        .json({ error: "User not found or invalid password" });
    }

    if (user.Type !== "outVendor") {
      return res
        .status(403)
        .json({ error: "Access denied. You're type is not 'PM'" });
    }

    const passwordCheck = await technicianmodel.findOne({ password });
    if (!passwordCheck) {
      return res.status(403).json({ error: "Invalid password" });
    }
    sendNotification(user);
    await technicianmodel.findOneAndUpdate(
      { number },
      { status: "Online", fcmtoken }
    );
    return res.json({ success: "Login successful", user });
  } catch (error) {
    console.error("Error", error);
    return res.status(500).json({ error: "An error occurred" });
  }
});

//add technician
router.route("/addtechnician").post(async (req, res) => {
  let {
    Type,
    servicetype,
    vhsname,
    smsname,
    number,
    password,
    experiance,
    city,
    category,
    languagesknow,
    walletBalance,
  } = req.body;

  // Check if the contact already exists
  const contactnoExists = await technicianmodel.findOne({
    $or: [
      { number: number },
      // { email: loginnameOrEmail },
    ],
  });
  if (contactnoExists) {
    return res.status(500).json({ error: "Conatct Number already exists" });
  }
  let technician = new technicianmodel({
    Type,
    servicetype,
    vhsname,
    smsname,
    number,
    password,
    experiance,
    city,
    languagesknow,
    category,
    walletBalance,
  });
  let save = technician.save();
  if (save) {
    return res.json({ success: "food created successfully" });
  }
});

//edit technician
router.route("/edittechnician/:id").post(async (req, res) => {
  let id = req.params.id;
  let {
    Type,
    servicetype,
    vhsname,
    smsname,
    number,
    password,
    experiance,
    city,
    category,
    languagesknow,
    walletBalance,
  } = req.body;

  let data = await technicianmodel.findOneAndUpdate(
    { _id: id },
    {
      Type,
      servicetype,
      vhsname,
      smsname,
      number,
      password,
      experiance,
      city,
      category,
      languagesknow,
      walletBalance,
    }
  );
  if (data) {
    return res.json({ success: "Updated" });
  }
});

//get alltechnicain
router.route("/getalltechnician").get(async (req, res) => {
  let technician = await technicianmodel.find({}).sort({ _id: -1 });
  if (technician) {
    return res.status(200).json({ technician: technician });
  } else {
    return res.status(500).json({ error: "Something went wrong" });
  }
});

router.route("/findwithexexutivefromcrm").get(async (req, res) => {
  try {
    let { category, city } = req.query;

    // Convert category to an array if it's not already one
    if (!Array.isArray(category)) {
      category = [category];
    }

    console.log("category, city", category, city);

    let exe = await technicianmodel.find({
      Type: "executive",
      "category.name": { $in: category }, // Match any category name in the array
      city: city,
    });

    if (exe.length > 0) {
      return res.status(200).json({ technician: exe });
    } else {
      return res.status(404).json({ message: "No technicians found." });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

router.route("/gettechnicianbyid/:id").get(async (req, res) => {
  try {
    const technicianId = req.params.id;
    let technician = await technicianmodel.findById({ _id: technicianId });
    if (technician) {
      return res.status(200).json({ technician: technician });
    } else {
      return res.status(404).json({ error: "Technician not found" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
});

//delete vendors
router.route("/deletetechnician/:id").post(async (req, res) => {
  let id = req.params.id;
  const data = await technicianmodel.deleteOne({ _id: id });
  return res.json({ sucess: "Delete successfuly" });
});

router.route("/technicianlogin").post(async (req, res) => {
  const { number, password } = req.body;
  try {
    if (!number) {
      return res.status(400).json({ error: "Please enter your Mobile Number" });
    }
    if (!password) {
      return res.status(400).json({ error: "Please enter your password" });
    }
    // Find the user by mobile number
    const user = await technicianmodel.findOne({ number });
    if (!user) {
      return res
        .status(404)
        .json({ error: "User not found or invalid password" });
    }
    // Check if the user type is "technician"
    if (user.Type !== "technician") {
      return res
        .status(403)
        .json({ error: "Access denied. You're type is not 'Technician'" });
    }
    // Check the password
    const passwordCheck = await technicianmodel.findOne({ password });
    if (!passwordCheck) {
      return res.status(403).json({ error: "Invalid password" });
    }
    // Update the technician's status to "Online"
    await technicianmodel.findOneAndUpdate({ number }, { status: "Online" });
    return res.json({ success: "Login successful", user });
  } catch (error) {
    console.error("Error", error);
    return res.status(500).json({ error: "An error occurred" });
  }
});

// signout

router.route("/technicianlogout/:id").get(async (req, res) => {
  const signoutId = req.params.id;
  if (!signoutId) {
    return res.status(400).json({ error: "Invalid signout ID" });
  }
  technicianmodel
    .findOneAndUpdate({ _id: signoutId }, { status: "Offline" })
    .then(() => {
      res.status(200).json({ Success: "Signout Successfully" });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Something went wrong" });
    });
});

router.route("/changepassword/:id").post(async (req, res) => {
  const { password, newPassword, confirmPassword } = req.body;
  try {
    if (!password || !confirmPassword || !newPassword) {
      return res.status(400).json({
        error: "Please enter old password, new password, and confirm password",
      });
    }
    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ error: "New password and confirm password do not match" });
    }

    const passwordMatch = await technicianmodel.findOne(password, password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid old password" });
    }
    await technicianmodel.findOneAndUpdate({
      password,
      newPassword,
    });
    return res.status(200).json({ success: "Password Changed Successfully" });
  } catch (error) {
    console.error("Something went wrong", error);
    // return res.status(500).json({ error: "Internal server error" });
  }
});

router.route("/pmlogin").post(async (req, res) => {
  const { number, password } = req.body;
  try {
    if (!number) {
      return res.status(400).json({ error: "Please enter your Mobile Number" });
    }
    if (!password) {
      return res.status(400).json({ error: "Please enter your password" });
    }

    const user = await technicianmodel.findOne({ number });
    if (!user) {
      return res
        .status(404)
        .json({ error: "User not found or invalid password" });
    }

    if (user.Type !== "pm") {
      return res
        .status(403)
        .json({ error: "Access denied. You're type is not 'PM'" });
    }

    const passwordCheck = await technicianmodel.findOne({ password });
    if (!passwordCheck) {
      return res.status(403).json({ error: "Invalid password" });
    }

    await technicianmodel.findOneAndUpdate({ number }, { status: "Online" });
    return res.json({ success: "Login successful", user });
  } catch (error) {
    console.error("Error", error);
    return res.status(500).json({ error: "An error occurred" });
  }
});

router.route("/pmlogout/:id").get(async (req, res) => {
  const signoutId = req.params.id;
  if (!signoutId) {
    return res.status(400).json({ error: "Invalid signout ID" });
  }
  technicianmodel
    .findOneAndUpdate({ _id: signoutId }, { status: "Offline" })
    .then(() => {
      res.status(200).json({ Success: "Signout Successfully" });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Something went wrong" });
    });
});

// excutive
router.route("/executivelogin").post(async (req, res) => {
  const { number, password } = req.body;
  try {
    if (!number) {
      return res.status(400).json({ error: "Please enter your Mobile Number" });
    }
    if (!password) {
      return res.status(400).json({ error: "Please enter your password" });
    }

    const user = await technicianmodel.findOne({ number });
    if (!user) {
      return res
        .status(404)
        .json({ error: "User not found or invalid password" });
    }

    if (user.Type !== "executive") {
      return res
        .status(403)
        .json({ error: "Access denied. You're type is not 'Technician'" });
    }

    const passwordCheck = await technicianmodel.findOne({ password });
    if (!passwordCheck) {
      return res.status(403).json({ error: "Invalid password" });
    }

    await technicianmodel.findOneAndUpdate({ number }, { status: "Online" });
    return res.json({ success: "Login successful", user });
  } catch (error) {
    console.error("Error", error);
    return res.status(500).json({ error: "An error occurred" });
  }
});

// executive signout

router.route("/executivelogout/:id").get(async (req, res) => {
  const signoutId = req.params.id;
  if (!signoutId) {
    return res.status(400).json({ error: "Invalid signout ID" });
  }
  technicianmodel
    .findOneAndUpdate({ _id: signoutId }, { status: "Offline" })
    .then(() => {
      res.status(200).json({ Success: "Signout Successfully" });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Something went wrong" });
    });
});

router.route("/outvendorlogout/:id").get(async (req, res) => {
  const signoutId = req.params.id;
  if (!signoutId) {
    return res.status(400).json({ error: "Invalid signout ID" });
  }
  technicianmodel
    .findOneAndUpdate({ _id: signoutId }, { status: "Offline" })
    .then(() => {
      res.status(200).json({ Success: "Signout Successfully" });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Something went wrong" });
    });
});

//findwithvendor id
router.route("/findbyoutvendorid/:id").get(async (req, res) => {
  const vendorId = req.params.id;
  if (!vendorId) {
    return res.status(400).json({ error: "Invalid signout ID" });
  }

  try {
    const vendorData = await technicianmodel.findById(vendorId);

    if (vendorData) {
      res
        .status(200)
        .json({ data: vendorData, Success: "Signout Successfully" });
    } else {
      res.status(404).json({ error: "Technician not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.route("/updatevendorAmt/:id").post(async (req, res) => {
  try {
    let id = req.params.id;
    let { vendorAmt } = req.body;
    const vendorData = await technicianmodel.findOneAndUpdate(
      { _id: id },
      { $inc: { vendorAmt: vendorAmt } },
      { new: true }
    );

    if (vendorData) {
      return res.status(200).json({ success: "Updated" });
    } else {
      return res.status(404).json({ error: "Vendor not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
