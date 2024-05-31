const treatmentmodel = require("../model/treatment");

class treatment {
  async addtreatment(req, res) {
    let {
      region,
      material,
      job,
      qty,
      rate,
      userid,
      subtotal,
      category,
      EnquiryId,
      note,
      number,
    } = req.body;
    // let file = req.file.filename;
    if (!region) {
      return res.status(500).json({ error: "Field must not be empty" });
    } else {
      let add = new treatmentmodel({
        userid: userid,
        EnquiryId: EnquiryId,
        region: region,
        material: material,
        job: job,
        qty: qty,
        rate: rate,
        subtotal: subtotal,
        category: category,
        note: note,
        number,
      });
      let save = add.save();
      if (save) {
        return res.json({ sucess: "Added successfully" });
      }
    }
  }

  async gettreatment(req, res) {
    let treatment = await treatmentmodel.find({}).sort({ _id: -1 });
    if (treatment) {
      return res.json({ treatment: treatment });
    }
  }

  async  findWithEnquiryID(req, res) {
    try {
      let EnquiryId = req.params.id;
  
      const data = await treatmentmodel.find({ EnquiryId }).sort({ _id: -1 }).exec();
  
      if (data && data.length > 0) {
        return res.status(200).json({ treatment: data });
      } else {
        return res.json({ treatment: [] });
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
  

  async deletetreatment(req, res) {
    let id = req.params.id;
    let data = await treatmentmodel.deleteOne({ _id: id });
    return res.json({ sucess: "Successfully deleted" });
  }
}

const treatmentcontroller = new treatment();
module.exports = treatmentcontroller;
