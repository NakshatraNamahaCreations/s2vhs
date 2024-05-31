const footerimgmodel = require("../../model/master/quotationfooter");

class footerimg {
	
  async addfooterimg(req, res) {
    let file = req.file.filename;

		try {
			if (!file) {
				return res.status(500).json({ error: "Please select images" });
			} else {
				let footerimg = new footerimgmodel({
					footerimg: file,
				});
				let save = footerimg.save();
				if (save) {
					return res.json({ success: "image saved" });
				}
			}
		} catch (error) {
			console.log(error);
		}
  }

  async getfooterimg(req, res) {
		let footerimg = await footerimgmodel.find({});
		if (footerimg) {
			return res.status(200).json({ footerimg: footerimg });
		} else {
			return res.status(500).json({ error: "something went wrong" });
		}
	}

  async deletefooterimg(req, res) {
    let id = req.params.id;
    const data = await footerimgmodel.deleteOne({ _id: id });
    return res.json({ success: "Successfully" });
  }
}

const footerimgcontroller=new footerimg();
module.exports=footerimgcontroller;
