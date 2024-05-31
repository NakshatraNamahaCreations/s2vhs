const headerimgmodel = require("../../model/master/quotationheader");

class headerimg {
	
  async addheaderimg(req, res) {
    let file = req.file.filename;

		try {
			if (!file) {
				return res.status(500).json({ error: "Please select images" });
			} else {
				let headerimg = new headerimgmodel({
					headerimg: file,
				});
				let save = headerimg.save();
				if (save) {
					return res.json({ success: "image saved" });
				}
			}
		} catch (error) {
			console.log(error);
		}
  }

  async getheaderimg(req, res) {
		let headerimg = await headerimgmodel.find({});
		if (headerimg) {
			return res.status(200).json({ headerimg: headerimg });
		} else {
			return res.status(500).json({ error: "something went wrong" });
		}
	}

  async deleteheaderimg(req, res) {
    let id = req.params.id;
    const data = await headerimgmodel.deleteOne({ _id: id });
    return res.json({ success: "Successfully" });
  }
}

const headerimgcontroller=new headerimg();
module.exports=headerimgcontroller;
