const superloginmodel = require("../../model/userapp/superlogin");
const bcrypt = require("bcryptjs");

class superlogin {
  // add
  async supersignup(req, res) {
    try {
      let { emailorphone, password, cpassword } = req.body;

      if (!password || !emailorphone || !cpassword) {
        return res.status(500).json({ error: "All fields must not be empty" });
      } else if (emailorphone.length < 3) {
        return res
          .status(500)
          .json({ error: "Name must be at least 3 characters long" });
      } else if (password != cpassword) {
        return res.status(500).json({ error: "Password mismatch" });
      } else if (password.length < 1) {
        return res
          .status(500)
          .json({ error: "Password should be at least 8 characters long" });
      }

      // Check if the email or name already exists
      const emailOrNameExists = await superloginmodel.findOne({
        $or: [
          { emailorphone: emailorphone },
          // { email: loginnameOrEmail },
        ],
      });
      if (emailOrNameExists) {
        return res.status(500).json({ error: "Name or Email already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      let NewUser = new superloginmodel({
        emailorphone,
        password:hashedPassword,
         cpassword
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

  async loginSuperadmin(req, res) {
    const { emailorphone, password } = req.body;
    try {
      if (!emailorphone) {
        return res
          .status(400)
          .json({ error: "Please enter your loginname or email" });
      }
      if (!password) {
        return res.status(400).json({ error: "Please enter your password" });
      }
      const user = await superloginmodel.findOne({ emailorphone });
      if (!user) {
        return res
          .status(404)
          .json({ error: "User not found or invalid password" });
      }
      const passwordmatch = bcrypt.compareSync(password, user.password);
      if (!passwordmatch) {
        return res.status(401).json({ error: "Invalid password" });
      }
      await superloginmodel.findOneAndUpdate(
        { emailorphone },
        { status: "Online" }
      );
      return res.json({ success: "Login successful", user });
    } catch (error) {
      console.error("Something went wrong", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

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
      const existingLoginnameOrEmail = await superloginmodel.findOne({
        loginnameOrEmail: loginnameOrEmail,
      });
      if (existingLoginnameOrEmail) {
        return res
          .status(400)
          .json({ error: "Loginname or Email already exists" });
      }

      // check if displayname is already exists
      const existingDisplayName = await superloginmodel.findOne({
        displayname: displayname,
      });
      if (existingDisplayName) {
        return res.status(400).json({ error: "Displayname already exists" });
      }

      // check if contact is already exists
      const existingContactno = await superloginmodel.findOne({
        contactno: contactno,
      });
      if (existingContactno) {
        return res.status(400).json({ error: "Contactno already exists" });
      }

      // Check if the user exists
      const user = await superloginmodel.findOne({ _id: userData });
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
      await superloginmodel.findByIdAndUpdate(userData, user);
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

  //change password
  async changePassword(req, res) {
    try {
      // Get the user ID from the request parameters
      const adminData = req.params.userId;

      // Get the old password, new password, and confirm password from the request body
      const { oldPassword, newPassword, newcPassword } = req.body;

      // Check if the user exists
      const user = await superloginmodel.findById(adminData);
      if (!user) {
        return res.status(404).json({ error: "admin not found" });
      }

      // Check if the old password matches the stored password
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid old password" });
      }

      // Check if the new password and confirm password match
      if (newPassword !== newcPassword) {
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
    let data = await superloginmodel.find({}).sort({ _id: -1 });
    if (data) {
      return res.json({ masteruser: data });
    }
  }

  

  async getsignout(req, res) {
    let id = req.params.id;
    try {
      const data = await superloginmodel.findOneAndUpdate(
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

const superloginController = new superlogin();
module.exports = superloginController;
