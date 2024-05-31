const responsemodel = require("../../model/master/response");

class response {
  async addresponse(req, res) {
    let { response,template } = req.body;
    if(!response ){
        return res.status(500).json({error:"Field doestn't empty"})
    }
    let add = new responsemodel({
        response: response,
        template:template
    });
    let save = add.save();
    if (save) {
      return res.json({ sucess: "added successfully" });
    }
  }

  //edit 
  async editresponse(req,res){
    let id=req.params.id;
    let{response,template}=req.body;
    
    let data=await responsemodel.findOneAndUpdate(
        {_id:id},
        {response,template}
    );
    if (data) {
        return res.json({ success: "Updated" });
      }

  }

  async getresponse(req, res) {
    let response = await responsemodel.find({}).sort({ _id: -1 });
    if (response) {
      return res.json({ response: response });
    }
  }

  

  async postresponse(req, res) {
    let id = req.params.id;
    const data = await responsemodel.deleteOne({ _id: id });

    return res.json({ success: "Successfully" });
  }
}

const responsecontroller = new response();
module.exports = responsecontroller;
