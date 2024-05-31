const b2bmodel = require("../../model/master/b2b");

class b2b {
  async addb2b(req, res) {
    let { customertype } = req.body;
    if(!customertype){
 return res.status(500).json({error:"Field must not be empty"})
    }else{
      let add = new b2bmodel({
        customertype: customertype,
    });
    let save = add.save();
    if (save) {
      return res.json({ sucess: "added successfully" });
    }
    }
   
  }

  //edit category
  async editb2b(req,res){
    let id=req.params.id;
    let{customertype}=req.body;
    
    let data=await b2bmodel.findOneAndUpdate(
        {_id:id},
        {customertype}
    );
    if (data) {
        return res.json({ success: "Updated" });
      }

  }
  async getb2b(req, res) {
    let customertype = await b2bmodel.find({}).sort({ _id: -1 });
    if (customertype) {
      return res.json({ masterb2b: customertype });
    }
  }

  

  async postdeleteb2b(req, res) {
    let id = req.params.id;
    const data = await b2bmodel.deleteOne({ _id: id });

    return res.json({ success: "Successfully" });
  }
}

const b2bcontroller = new b2b();
module.exports = b2bcontroller;
