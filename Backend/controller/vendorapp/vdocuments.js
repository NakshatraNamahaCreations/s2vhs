const vdocumentsmodel = require("../../model/vendorapp/vdocuments");
const technicianmodel = require("../../model/master/technician");

class vdocuments {

  async addIDProof(req, res) {
    try {
      const { IDProoftype, IDProofNo, VendorId } = req.body;
      const file = req.file?.filename;

      const add = new vdocumentsmodel({
        IDProoftype,
        IDProofNo,
        VendorId,
        IDproofImg: file,
      });

      const savedDocument = await add.save();

      if (savedDocument) {
        const vendor = await technicianmodel.findOneAndUpdate({ _id: VendorId }, { $set: { IDProof: true } });
        return res.status(200).json({ success: "IDproof added successfully", vendor });
      } else {
        return res.status(500).json({ error: "Error saving IDproof" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async addAddressProof(req, res) {
    try {
      const { addressProoftype, addressProofNo, VendorId } = req.body;
      const file = req.file?.filename;

      const add = new vdocumentsmodel({
        addressProoftype,
        addressProofNo,
        VendorId,
        addressProofImg: file,
      });

      const savedDocument = await add.save();

      if (savedDocument) {
        await technicianmodel.findOneAndUpdate({ _id: VendorId }, { $set: { AddressProof: true } });
        return res.status(200).json({ success: "Address proof added successfully" });
      } else {
        return res.status(500).json({ error: "Error saving address proof" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  async addbankProof(req, res) {
    try {
      const { bankName,IFSCcode, accountNumber, confirmAccountNumber, branch, VendorId } = req.body;
      const file = req.file?.filename;

      const add = new vdocumentsmodel({
        bankName,
        accountNumber,
        confirmAccountNumber,
        branch,
        VendorId,
        IFSCcode,
        bankProofImg: file,
      });

      const savedDocument = await add.save();

      if (savedDocument) {
       const vendor= await technicianmodel.findOneAndUpdate({ _id: VendorId }, { $set: { BankProof: true } });
        return res.status(200).json({ success: "Bank proof added successfully",vendor });
      } else {
        return res.status(500).json({ error: "Error saving bank proof" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }


  async findWithVendorId(req, res) {
    const vendorId = req.params.vendorId; // Assuming vendorId is part of the request parameters
  
    try {
      let vdocuments = await vdocumentsmodel.find({ VendorId: vendorId }).sort({ _id: -1 });
  
      if (vdocuments) {
        return res.json({ vdocuments: vdocuments });
      } else {
        return res.json({ message: 'No documents found for the specified vendorId' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  



  async getvdocuments(req, res) {
    let vdocuments = await vdocumentsmodel.find({}).sort({ _id: -1 });
    if (vdocuments) {
      return res.json({ vdocuments: vdocuments });
    }
  }

  async getallvdocuments(req, res) {
    let vdocuments = await vdocumentsmodel.aggregate([
      {
        $lookup: {
          from: "subcategories",
          localField: "vdocuments",
          foreignField: "vdocuments",
          as: "subcategories",
        },
      },
    ]);
    if (vdocuments) {
      return res.json({ vdocuments: vdocuments });
    }
  }

  async postdeletevdocuments(req, res) {
    let id = req.params.id;
    const data = await vdocumentsmodel.deleteOne({ _id: id });

    return res.json({ success: "Successfully" });
  }
}

const vdocumentsController = new vdocuments();
module.exports = vdocumentsController;
