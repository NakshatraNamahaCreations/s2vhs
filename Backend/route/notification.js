const express = require("express");
const { firebase } = require("../firebase"); // Check if firebase is correctly imported
const router = express.Router();
const technicianmodel = require("../model/master/technician");

const sendNotificationToMultipleDevices = async (title, body) => {
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
            title: title,
            body: body,
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
  const { title, body } = req.body;
  await sendNotificationToMultipleDevices(title, body); // Make sure to await the function call
  res.status(200).send("Notifications sent successfully");
});

module.exports = router; // Export the router
