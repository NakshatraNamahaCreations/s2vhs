const vendormodel = require("../../model/master/vendor");
const bcrypt = require("bcryptjs");

class mastervendor {
  //add user
  async addvendor(req, res) {
    let {
      vendorname,
      contactperson,
      vendornumber,
      maincontact,
      alternateno,
      email,
      gstid,
      address,
      city,
      pincode,
      LNF,
      color,
      instructions,
    } = req.body;
    if (
      !vendorname |
      !contactperson |
      !maincontact |
      !alternateno |
      !color |
      !instructions
    ) {
      return res.status(500).json({ error: "Filed must not be empty" });
    } else {
      let add = new vendormodel({
        vendorname: vendorname,
        contactperson: contactperson,
        vendornumber: vendornumber,
        maincontact: maincontact,
        alternateno: alternateno,
        email: email,
        gstid: gstid,
        address: address,
        city: city,
        pincode: pincode,
        LNF: LNF,
        color: color,
        instructions: instructions,
      });
      let save = add.save();
      if (save) {
        return res.json({ sucess: "Vendor data added successfully" });
      }
    }
  }


  async editvendor(req, res) {
    try {
      const vendorData = req.params.vendorid;
      const {
        vendorname,
        contactperson,
        vendornumber,
        maincontact,
        alternateno,
        email,
        gstid,
        address,
        city,
        pincode,
        LNF,
        color,
        instructions,
      } = req.body;

      // Check if the user exists
      const newVendor = await vendormodel.findOne({ _id: vendorData });
      if (!newVendor) {
        return res.status(404).json({ error: "User not found" });
      }

      //update user
      newVendor.vendorname = vendorname || newVendor.vendorname;
      newVendor.contactperson = contactperson || newVendor.contactperson;
      newVendor.vendornumber = vendornumber || newVendor.vendornumber;
      newVendor.maincontact = maincontact || newVendor.maincontact;
      newVendor.alternateno = alternateno || newVendor.alternateno;
      newVendor.email = email || newVendor.email;
      newVendor.gstid = gstid || newVendor.gstid;
      newVendor.address = address || newVendor.address;
      newVendor.city = city || newVendor.city;
      newVendor.pincode = pincode || newVendor.pincode;
      newVendor.LNF = LNF || newVendor.LNF;
      newVendor.color = color || newVendor.color;
      newVendor.instructions = instructions || newVendor.instructions;
      await vendormodel.findByIdAndUpdate(vendorData, newVendor);
      return res
        .status(200)
        .json({ message: "Updated successfully", data: newVendor });
    } catch (error) {
      console.log("Error in updateprofile: ", error);
      return res.status(500).send({
        message:
          "Something went wrong while updating your details. Please try again later.",
      });
    }
  }





  //get all m

  async getvendor(req, res) {
    let data = await vendormodel.find({}).sort({ _id: -1 });
    if (data) {
      return res.json({ vendors: data });
    }
  }

  async postdeletevendor(req, res) {
    try {
      const vendorId = req.params.id;
      const data = await vendormodel.deleteOne({ _id: vendorId });

      if (data) {
        return res.json({ success: "Successfully deleted" });
      } else {
        return res.json({ error: "Vendor not found or unable to delete" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
const vendorController = new mastervendor();
module.exports = vendorController;