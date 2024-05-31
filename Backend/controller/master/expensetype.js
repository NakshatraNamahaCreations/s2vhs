const expensetypemodel = require("../../model/master/expensetype");

class expensetype {
  async addexpensetype(req, res) {
    let { expensetype } = req.body;
    let add = new expensetypemodel({
        expensetype: expensetype,
    });
    let save = add.save();
    if (save) {
      return res.json({ sucess: "added successfully" });
    }
  }

  //edit category
  async editexpensetype(req,res){
    let id=req.params.id;
    let{expensetype}=req.body;
    
    let data=await expensetypemodel.findOneAndUpdate(
        {_id:id},
        {expensetype}
    );
    if (data) {
        return res.json({ success: "Updated" });
      }

  }
  async getexpensetype(req, res) {
    let expensetype = await expensetypemodel.find({}).sort({ _id: -1 });
    if (expensetype) {
      return res.json({ masterexpensetype: expensetype });
    }
  }

  

  async postdeleteexpensetype(req, res) {
    let id = req.params.id;
    const data = await expensetypemodel.deleteOne({ _id: id });

    return res.json({ success: "Successfully" });
  }
}

const expensetypecontroller = new expensetype();
module.exports = expensetypecontroller;
