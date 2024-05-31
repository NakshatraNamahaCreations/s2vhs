const adminloginmodel = require("../model/adminlogin");

class adminlogin {
  async signup(req, res) {
    let { email, createpassword, confirmpassword } = req.body;
    try {
      if (!email || !createpassword || !confirmpassword) {
        return res.status(500).json({ error: "fill all the fields" });
      } else if (createpassword !== confirmpassword) {
        return res.status(500).json({ error: " password mismatch" });
      } else {
        let admin = new adminloginmodel({
          email,
          createpassword,
          confirmpassword,
        });
        let save = admin.save();
        if (save) {
          return res.json({ success: "Account created" });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async postSignin(req, res) {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        error: "Fields must not be empty",
      });
    }
    try {
      const data = await adminloginmodel.findOneAndUpdate(
        { email: email },
        { status: "online" }
      );
      if (data.email !== email) {
        return res.status(500).json({
          error: "Invalid Email ",
        });
      } else if (data.createpassword !== password) {
        return res.status(500).json({
          error: "Invalid password ",
        });
      } else {
        if (data.createpassword === password || data.email === email) {
          return res.status(200).json({
            success: "Login Success",
            user: {	
              email: data.email,
              id: data._id,
            },
          });
        } else {
          return res.status(500).json({
            error: "Invalid Password",
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}

const adminlogincontroller = new adminlogin();
module.exports = adminlogincontroller;
