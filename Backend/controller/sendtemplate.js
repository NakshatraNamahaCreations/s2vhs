
const sendtemplatemodel = require("../model/sendtemplate");

class sendtemplate {
  //add sendtemplate
  async sendtemplate(req, res) {
    let { customertype, templateid, smstemplate } = req.body;
    let add = new sendtemplatemodel({
      customertype: customertype,
      templateid: templateid,
      smstemplate: smstemplate,
    });
    let save = add.save();
    if (save) {
      return res.json({ sucess: "Added successfully" });
    }
  }
}

const sendtemplatecontroller=new sendtemplate();
module.exports=sendtemplatecontroller
