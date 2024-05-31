const homepagetitlemodel = require("../../model/userapp/homepagetitle");

class homepagetitle {
  
  async addhomepagetitle(req, res) {
    let { title } = req.body;
  

    let add = new homepagetitlemodel({
        title:title
    });
    let save = add.save();
    if (save) {
      return res.json({ sucess: "homepagetitle name added successfully" });
    }
  }

  //edit homepagetitle
  async edithomepagetitle(req,res){
    let id=req.params.id;
    let {title}=req.body;

    
    let data=await homepagetitlemodel.findOneAndUpdate(
        {_id:id},
        {title}
    );
    if (data) {
        return res.json({ success: "Updated" });
      }

  }
  async gethomepagetitle(req, res) {
    let homepagetitle = await homepagetitlemodel.find({}).sort({ _id: -1 });
    if (homepagetitle) {
      return res.json({ homepagetitle: homepagetitle });
    }
  }

  

  async postdeletehomepagetitle(req, res) {
    let id = req.params.id;
    const data = await homepagetitlemodel.deleteOne({ _id: id });

    return res.json({ success: "Successfully" });
  }
}

const homepagetitleController = new homepagetitle();
module.exports = homepagetitleController;
