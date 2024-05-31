const whatsappmodel = require("../../model/master/whatsapptemplate");

class response {
  async addwhatsapptemplate(req, res) {
    let { templatename, template } = req.body;
    if (!templatename || !template) {
      return res.status(500).json({ error: "Field doestn't empty" });
    }
    let add = new whatsappmodel({
      templatename: templatename,
      template: template,
    });
    let save = add.save();
    if (save) {
      return res.json({ sucess: "added successfully" });
    }
  }

  //edit
  async editwhatsapptemplate(req, res) {
    try {
      let id = req.params.id;
      let { template } = req.body;
  
      // Using { new: true } to return the modified document
      let data = await whatsappmodel.findOneAndUpdate({ _id: id }, { template }, { new: true });
  
      if (data) {
        return res.json({ success: "Updated", data });
      } else {
        return res.status(404).json({ error: "Template not found" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  

  async getwhatsapptemplate(req, res) {
    let whatsapptemplate = await whatsappmodel.find({}).sort({ _id: -1 });
    if (whatsapptemplate) {
      return res.json({ whatsapptemplate: whatsapptemplate });
    }
  }

  async postwhatsapptemplate(req, res) {
    let id = req.params.id;
    const data = await whatsappmodel.deleteOne({ _id: id });

    return res.json({ success: "Successfully" });
  }
}

const whatsapptemplatecontroller = new response();
module.exports = whatsapptemplatecontroller;
