const customertypemodel = require("../../model/master/customertype");

class customertype {
  async addcustomertype(req, res) {
    let { customertype } = req.body;
    let add = new customertypemodel({
        customertype: customertype,
    });
    let save = add.save();
    if (save) {
      return res.json({ sucess: "added successfully" });
    }
  }

  //edit category
  async editcustomertype(req,res){
    let id=req.params.id;
    let{customertype}=req.body;
    
    let data=await customertypemodel.findOneAndUpdate(
        {_id:id},
        {customertype}
    );
    if (data) {
        return res.json({ success: "Updated" });
      }

  }
  async getcustomertype(req, res) {
    let customertype = await customertypemodel.find({}).sort({ _id: -1 });
    if (customertype) {
      return res.json({ mastercustomertype: customertype });
    }
  }

  

  async postdeletecustomertype(req, res) {
    let id = req.params.id;
    const data = await customertypemodel.deleteOne({ _id: id });

    return res.json({ success: "Successfully" });
  }
}

const customertypecontroller = new customertype();
module.exports = customertypecontroller;
