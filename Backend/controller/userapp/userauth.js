const userModel = require("../../model/userapp/userauth");
const bcrypt = require("bcryptjs");

class userauth {
  // add
  async usersignup(req, res) {
    try {
      let {
        username,
        number,
        email,
        password,
        cpassword,
      } = req.body;

      // Validate the input
      if (
        !username ||
        !number ||
        !email ||
        !password ||
        !cpassword
      ) {
        return res.status(500).json({ error: "All fields must not be empty" });
      } else if (email.length < 3) {
        return res
          .status(500)
          .json({ error: "Name must be at least 3 characters long" });
      } else if (password != cpassword) {
        return res.status(500).json({ error: "Password mismatch" });
      } else if (password.length < 8) {
        return res
          .status(500)
          .json({ error: "Password should be at least 8 characters long" });
      }

      // Check if the email or name already exists
      const emailOrNameExists = await userModel.findOne({
        $or: [
          { email: email },
          // { email: loginnameOrEmail },
        ],
      });
      if (emailOrNameExists) {
        return res.status(500).json({ error: "The email already exists." });
      }

      // Check if the contact already exists
      const contactnoExists = await userModel.findOne({
        $or: [
          { number: number },
          // { email: loginnameOrEmail },
        ],
      });
      if (contactnoExists) {
        return res.status(500).json({ error: "Conatct Number already exists" });
      }

     

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      let NewUser = new userModel({
        username,
        number,
        email,
        password: hashedPassword,
        cpassword
      });

      // Save the user
      NewUser.save().then((data) => {
        console.log(data);
        return res.status(200).json({ success: "User added successfully",user: data  });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // login user

  async usersignin(req, res) {
    const { email, password } = req.body;
    try {
      if (!email) {
        return res
          .status(400)
          .json({ error: "Please enter your loginname or email" });
      }
      if (!password) {
        return res.status(400).json({ error: "Please enter your password" });
      }
      const user = await userModel.findOne({ email });
      if (!user) {
        return res
          .status(404)
          .json({ error: "User not found " });
      }
      const passwordMatch = bcrypt.compareSync(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid password" });
      }
      await userModel.findOneAndUpdate(
        { email },
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
        username,
        number,
        email,
        password,
        cpassword,
       
      } = req.body;

      // check if loginname is already exists
      const existingLoginnameOrEmail = await userModel.findOne({
        email: email,
      });
      if (existingLoginnameOrEmail) {
        return res
          .status(400)
          .json({ error: "Loginname or Email already exists" });
      }

      // check if displayname is already exists
     

      // check if contact is already exists
      const existingContactno = await userModel.findOne({
        number: number,
      });
      if (existingContactno) {
        return res.status(400).json({ error: "Contactno already exists" });
      }

      // Check if the user exists
      const user = await userModel.findOne({ _id: userData });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Update the user
      user.username = username || user.username;
      user.number = number || user.number;
      user.email = email || user.email;
      user.password = password
        ? await bcrypt.hash(password, 10)
        : user.password;
      user.cpassword = cpassword;

      await userModel.findByIdAndUpdate(userData, user);
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
      const userData = req.params.userId;

      // Get the old password, new password, and confirm password from the request body
      const { oldPassword, newPassword, newConfirmPassword } = req.body;

      // Check if the user exists
      const user = await userModel.findById(userData);
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
    let data = await userModel.find({}).sort({ _id: -1 });
    if (data) {
      return res.json({ userdata: data });
    }
  }

  async postdeleteuser(req, res) {
    let id = req.params.id;
    const data = await userModel.deleteOne({ _id: id });

    return res.json({ success: "Successfully" });
  }

  async getsignout (req,res){
    let id = req.params.id;
    try {
    const data = await  userModel.findOneAndUpdate({ _id: id },{status:"offline"});
    if(!data){
      return res.status(403).json({
        error: "Cannot able to find the user",
      });
    }
    else{
      return res.json({success:"Sign Out Successful"});
    }
  } catch (err) {
    console.log(err);
  }
  }
}

const userauthController = new userauth();
module.exports = userauthController;