const customerAddressmodel = require("../model/customeraddress");

class customerAddress {
  async addaddress(req, res) {
    let { userId, address, landmark, otherData, platNo, saveAs,markerCoordinate } = req.body;

    let add = new customerAddressmodel({
      userId: userId,
      address: address,
      saveAs: saveAs,
      landmark: landmark,
      otherData: otherData,
      platNo: platNo,
      markerCoordinate:markerCoordinate
    });
    let save = add.save();
    if (save) {
      return res.json({ sucess: "Customer address added successfully" });
    }
  }

//   async addaddress(req, res) {
//     const { userId, address, landmark, otherData, platNo, saveAs } = req.body;
  
//     // Check the count of existing entries for the user
//     const userAddressCount = await customerAddressmodel.countDocuments({ userId: userId });
  
//     if (userAddressCount >= 3) {
//       return res.status(400).json({ error: "User can only have a maximum of 3 addresses." });
//     }
  
//     const add = new customerAddressmodel({
//       userId: userId,
//       address: address,
//       saveAs: saveAs,
//       landmark: landmark,
//       otherData: otherData,
//       platNo: platNo,
//     });
  
//     try {
//       const savedAddress = await add.save();
//       if (savedAddress) {
//         return res.json({ success: "Customer address added successfully" });
//       }
//     } catch (error) {
//       return res.status(500).json({ error: "Error saving address", message: error.message });
//     }
//   }
  

  async getaddress(req, res) {
    let customerAddress = await customerAddressmodel.find({}).sort({ _id: -1 });
    if (customerAddress) {
      return res.json({ customerAddress: customerAddress });
    }
  }

  async getaddresswithuserid(req, res) {

    const userId = req.params.id; // Assuming the userId is passed in the request parameters
    try {
      let customerAddress = await customerAddressmodel
        .find({ userId: userId })
        .sort({ _id: -1 });

      if (customerAddress.length>0) {
        return res.json({ customerAddress: customerAddress });
      } else {
        return res
          .status(404)
          .json({ message: "Addresses not found for this user." });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error retrieving addresses", error: error.message });
    }
  }

  async postdeleteaddress(req, res) {
    let id = req.params.id;
    const data = await customerAddressmodel.deleteOne({ _id: id });

    return res.json({ success: "Successfully" });
  }
}

const customerAddressController = new customerAddress();
module.exports = customerAddressController;
