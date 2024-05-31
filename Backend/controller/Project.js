const projectmodel = require("../model/Project");

class project {

 

  //Get all
  async getproject(req, res) {
    let data = await projectmodel.find({});
    if (data) {
      return res.status(200).json({ project: data });
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }


  
}
const projectcontroller = new project();
module.exports = projectcontroller;
