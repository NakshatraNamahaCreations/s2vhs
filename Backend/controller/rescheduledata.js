const recheduledatasmodel = require("../model/rescheduledata");

class recheduledata {
  async addrecheduledata(req, res) {
    let { serviceDate,serviceId,name,number,reason} = req.body;
    // let file = req.file.filename;
    if (!reason ) {
      return res.status(500).json({ error: "Please enter the reason" });
    } else {
      let add = new recheduledatasmodel({
        serviceDate:serviceDate,
        serviceId:serviceId,
        name:name,
        number:number,
        reason:reason
        
      });
      let save = add.save();
      if (save) {
        return res.json({ sucess: "Added successfully" });
      }
    }
  }

   
  
  async getrecheduledata(req, res) {
    let recheduledata = await recheduledatasmodel.find({}).sort({ _id: -1 });
    if (recheduledata) {
      return res.json({ recheduledata: recheduledata });
    }
  }

  async getRechedulewithidData(req, res) {
    const  serviceId  = req.params.id;
  
    try {
      const recheduledata = await recheduledatasmodel.find({ serviceId }).sort({ _id: -1 });
  
      if (recheduledata && recheduledata.length > 0) {
        return res.json({ recheduledata: recheduledata });
      } else {
        return res.json({ recheduledata:[] });
      }
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  



  async deleterecheduledata(req, res) {
    let id = req.params.id;
    let data = await recheduledatasmodel.deleteOne({ _id: id });
    return res.json({ sucess: "Successfully deleted" });
  }
}

const recheduledatacontroller = new recheduledata();
module.exports = recheduledatacontroller;
