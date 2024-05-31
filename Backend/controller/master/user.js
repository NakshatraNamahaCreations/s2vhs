const usermodel = require("../../model/master/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class masteruser {
  // add
  async adduser(req, res) {
    try {
      let {
        displayname,
        contactno,
        loginnameOrEmail,
        password,
        confirmPassword,
      } = req.body;

      // Validate the input
      if (
        !displayname ||
        !contactno ||
        !loginnameOrEmail ||
        !password ||
        !confirmPassword
      ) {
        return res.status(500).json({ error: "All fields must not be empty" });
      } else if (loginnameOrEmail.length < 3) {
        return res
          .status(500)
          .json({ error: "Name must be at least 3 characters long" });
      } else if (password != confirmPassword) {
        return res.status(500).json({ error: "Password mismatch" });
      } else if (password.length < 1) {
        return res
          .status(500)
          .json({ error: "Password should be at least 8 characters long" });
      }

      // Check if the email or name already exists
      const emailOrNameExists = await usermodel.findOne({
        $or: [
          { loginnameOrEmail: loginnameOrEmail },
          // { email: loginnameOrEmail },
        ],
      });
      if (emailOrNameExists) {
        return res.status(500).json({ error: "Name or Email already exists" });
      }

      // Check if the contact already exists
      const contactnoExists = await usermodel.findOne({
        $or: [
          { contactno: contactno },
          // { email: loginnameOrEmail },
        ],
      });
      if (contactnoExists) {
        return res.status(500).json({ error: "Conatct Number already exists" });
      }

      // Check if the display name already exists
      const displaynameExists = await usermodel.findOne({
        $or: [
          { displayname: displayname },
          // { email: loginnameOrEmail },
        ],
      });
      if (displaynameExists) {
        return res
          .status(500)
          .json({ error: `Try another name!` + displayname + `already exits` });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      let NewUser = new usermodel({
        displayname,
        contactno,
        loginnameOrEmail,
        password: hashedPassword,
      });

      // Save the user
      NewUser.save().then((data) => {
        console.log(data);
        return res.status(200).json({ success: "User added successfully" });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // login user

  async loginUser(req, res) {
    const { loginnameOrEmail, password } = req.body;
    try {
      if (!loginnameOrEmail) {
        return res
          .status(400)
          .json({ error: "Please enter your loginname or email" });
      }
      if (!password) {
        return res.status(400).json({ error: "Please enter your password" });
      }
      const user = await usermodel.findOne({ loginnameOrEmail });

      if (!user) {
        return res
          .status(404)
          .json({ error: "User not found or invalid password" });
      }

      const passwordmatch = bcrypt.compareSync(password, user.password);

      if (!passwordmatch) {
        return res.status(401).json({ error: "Invalid password" });
      }

      await usermodel.findOneAndUpdate(
        { loginnameOrEmail },
        { status: "Online" }
      );
      return res.json({ success: "Login successful", user });
    } catch (error) {
      console.error("Something went wrong", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // async loginUser(req, res) {
  //   const { loginnameOrEmail, password } = req.body;
  //   try {
  //     if (!loginnameOrEmail) {
  //       return res
  //         .status(400)
  //         .json({ error: "Please enter your loginname or email" });
  //     }
  //     if (!password) {
  //       return res.status(400).json({ error: "Please enter your password" });
  //     }
  //     const user = await usermodel.findOne({ loginnameOrEmail });
  //     if (!user) {
  //       return res
  //         .status(404)
  //         .json({ error: "User not found or invalid password" });
  //     }
  //     const passwordmatch = bcrypt.compareSync(password, user.password);
  //     if (!passwordmatch) {
  //       return res.status(401).json({ error: "Invalid password" });
  //     }

  //     // Generate JWT token
  //     const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
  //       expiresIn: "1h",
  //     });

  //     // Update user status to "Online"
  //     await usermodel.findOneAndUpdate(
  //       { loginnameOrEmail },
  //       { status: "Online" }
  //     );

  //     return res.json({ success: "Login successful", user, token });
  //   } catch (error) {
  //     console.error("Something went wrong", error);
  //     return res.status(500).json({ error: "Internal server error" });
  //   }
  // }
  //edit user

  async edituser(req, res) {
    try {
      const userData = req.params.userId;
      const {
        displayname,
        contactno,
        loginnameOrEmail,
        password,
        confirmPassword,
        // oldPassword,
        // newPassword,
        // newConfirmPassword,
      } = req.body;

      // check if loginname is already exists
      const existingLoginnameOrEmail = await usermodel.findOne({
        loginnameOrEmail: loginnameOrEmail,
      });
      if (existingLoginnameOrEmail) {
        return res
          .status(400)
          .json({ error: "Loginname or Email already exists" });
      }

      // check if displayname is already exists
      const existingDisplayName = await usermodel.findOne({
        displayname: displayname,
      });
      if (existingDisplayName) {
        return res.status(400).json({ error: "Displayname already exists" });
      }

      // check if contact is already exists
      const existingContactno = await usermodel.findOne({
        contactno: contactno,
      });
      if (existingContactno) {
        return res.status(400).json({ error: "Contactno already exists" });
      }

      // Check if the user exists
      const user = await usermodel.findOne({ _id: userData });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Update the user
      user.displayname = displayname || user.displayname;
      user.contactno = contactno || user.contactno;
      user.loginnameOrEmail = loginnameOrEmail || user.loginnameOrEmail;
      user.password = password
        ? await bcrypt.hash(password, 10)
        : user.password;
      user.confirmPassword = confirmPassword;
      // user.oldPassword = oldPassword;
      // user.newPassword = newPassword;
      // user.newConfirmPassword = newConfirmPassword;
      await usermodel.findByIdAndUpdate(userData, user);
      return res
        .status(200)
        .json({ message: "Updated successfully", data: user });
    } catch (error) {
      console.log("Error in updateprofile: ", error);
      return res.status(500).send({
        message:
          "Something went wrong while updating your details. Please try again later.",
      });
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
        paymentReport,
      } = req.body;
      let obj = {};
      // Check if the user exists
      const user = await usermodel.findOne({ _id: userData });
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
      if (typeof paymentReport !== "undefined") {
        obj["paymentReport"] = paymentReport;
      }

      // if (typeof cityId !== "undefined") {
      //   obj["cityId"] = cityId;
      // }
      // if (typeof category !== "undefined") {
      //   obj["category"] = category;
      // }
      // Update category if provided
      if (typeof category !== "undefined") {
        obj["category"] = category;
      }

      // Update city if provided
      if (typeof city !== "undefined") {
        // Save city data
        // const cityData = await cityymodel.create(city);
        obj["city"] = city;
      }
      let isData = await usermodel.findOneAndUpdate(
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
  //change password
  async changePassword(req, res) {
    try {
      // Get the user ID from the request parameters
      const userData = req.params.userId;

      // Get the old password, new password, and confirm password from the request body
      const { oldPassword, newPassword, newConfirmPassword } = req.body;

      // Check if the user exists
      const user = await usermodel.findById(userData);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Check if the old password matches the stored password
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid old password" });
      }

      // Check if the new password and confirm password match
      if (newPassword !== newConfirmPassword) {
        return res
          .status(400)
          .json({ error: "New password and confirm password do not match" });
      }

      // Update the password
      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();

      // Return a success message
      return res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      console.log("Error in changePassword: ", error);
      return res.status(500).send({
        message:
          "Something went wrong while changing the password. Please try again later.",
      });
    }
  }

  //get all master added user

  async getuser(req, res) {
    let data = await usermodel.find({}).sort({ _id: -1 });
    if (data) {
      return res.json({ masteruser: data });
    }
  }

  async postdeleteuser(req, res) {
    let id = req.params.id;
    const data = await usermodel.deleteOne({ _id: id });

    return res.json({ success: "Successfully" });
  }

  async getsignout(req, res) {
    let id = req.params.id;
    try {
      const data = await usermodel.findOneAndUpdate(
        { _id: id },
        { status: "offline" }
      );
      if (!data) {
        return res.status(403).json({
          error: "Cannot able to find the user",
        });
      } else {
        return res.json({ success: "Sign Out Successful" });
      }
    } catch (err) {
      console.log(err);
    }
  }
}

const userController = new masteruser();
module.exports = userController;
