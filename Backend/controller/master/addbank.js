const bankmodel = require("../../model/master/addbank");

class bankdetails {
  async addbank(req, res) {
    let { accno,accname,branch,ifsccode,bankname,upinumber,} = req.body;

    if(!accno |!accname | !branch |!ifsccode |!bankname ){
      return res.status(500).json({error:"Field must not be empty"})
    }else{
      let add = new bankmodel({
        accno: accno,
        accname:accname,
        branch:branch,
        ifsccode:ifsccode,
        bankname:bankname,
        upinumber:upinumber,
       
      });
      let save = add.save();
      if (save) {
        return res.json({ sucess: "Added successfully" });
      }
    }
   
  }

  //edit 
  async editbank(req, res) {
    let id = req.params.id;
    let  { accno,accname,branch,ifsccode,bankname,upinumber,}= req.body;

    let data = await bankmodel.findOneAndUpdate(
      { _id: id },
      { accno,accname,branch,ifsccode,bankname,upinumber,}
    );
    if (data) {
      return res.json({ success: "Updated" });
    }
  }

  async getbank(req, res) {
    let qf = await bankmodel.find({}).sort({ _id: -1 });
    if (qf) {
      return res.json({ bankacct: qf });
    }
  }

 

  async postdeletebank(req, res) {
    let id = req.params.id;
    const data = await bankmodel.deleteOne({ _id: id });

    return res.json({ success: "Successfully" });
  }
}

const bankcontroller = new bankdetails();
module.exports = bankcontroller;
