const newqtmodel = require("../../model/master/newqt");

class newqt {
  async addnewqt(req, res) {
    let { category,region,material,benefits,desc,rate,seqno,termsgroup,terms } = req.body;

    if(!category |!region | !material |!desc |!rate ){
      return res.status(500).json({error:"Field must not be empty"})
    }else{
      let add = new newqtmodel({
        category: category,
        region:region,
        material:material,
        benefits:benefits,
        desc:desc,
        rate:rate,
        // seqno:seqno,
        // termsgroup:termsgroup,
        // terms:terms
      });
      let save = add.save();
      if (save) {
        return res.json({ sucess: "Added successfully" });
      }
    }
   
  }

  //edit 
  async editnewqt(req, res) {
    let id = req.params.id;
    let  { category,region,material,benefits,desc,rate} = req.body;

    let data = await newqtmodel.findOneAndUpdate(
      { _id: id },
      { category,region,material,benefits,desc,rate,seqno,termsgroup,terms }
    );
    if (data) {
      return res.json({ success: "Updated" });
    }
  }

  async getnewqt(req, res) {
    let qf = await newqtmodel.find({}).sort({ _id: -1 });
    if (qf) {
      return res.json({ newqt: qf });
    }
  }

 

  async postdeletenewqt(req, res) {
    let id = req.params.id;
    const data = await newqtmodel.deleteOne({ _id: id });

    return res.json({ success: "Successfully" });
  }
}

const newqtcontroller = new newqt();
module.exports = newqtcontroller;
