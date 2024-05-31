const slotsmodel = require("../../model/userapp/slots");

class slots {
  async addslots(req, res) {
    let { startTime, endTime } = req.body;
   
  
      let add = new slotsmodel({
        startTime: startTime,
        endTime: endTime,
      });
      let save = add.save();
      if (save) {
        return res.json({ sucess: "subcategory name added successfully" });
      }
    
  }

  //edit user   
  async editslots(req, res) {
    let id = req.params.id;
    let { startTime, endTime } = req.body;

    let data = await slotsmodel.findOneAndUpdate(
      { _id: id },
      { startTime, endTime }
    );
    if (data) {
      return res.json({ success: "Updated" });
    }
  }

  async getslots(req, res) {
    let slots = await slotsmodel.find({}).sort({ _id: -1 });
    if (slots) {
      return res.json({ slots: slots });
    }
  }



  async deleteslots(req, res) {
    let id = req.params.id;
    let data = await slotsmodel.deleteOne({ _id: id });
    return res.json({ sucess: "Successfully deleted" });
  }
}

const slotscontroller = new slots();
module.exports = slotscontroller;
