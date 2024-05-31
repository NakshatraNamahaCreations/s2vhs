const quotefollowupModel = require("../model/quotefollowup");

class addquoteflw {
  async Addquotefollowup(req, res) {
    try {
      // Generate the series number
      // const uniqueNumber = await generateSeriesNumber();
      let {
        EnquiryId,
        category,
        folldate,
        folltime,
        staffname,
        response,
        desc,
        nxtfoll,
        colorcode,
        techId

      } = req.body;
      const newVendor = new quotefollowupModel({
        EnquiryId,
        category,
        folldate,
        folltime,
        staffname,
        response,
        desc,
        nxtfoll,
        colorcode,
        techId
      });
      newVendor.save().then((data) => {
        return res
          .status(200)
          .json({ Success: "Account created. Please login" });
      });
    } catch (error) {
      console.error("Error enquiry add:", error);
    }
  }

  //Get all
  async getallquotefollowup(req, res) {
    let data = await quotefollowupModel.find({}).sort({ _id: -1 });
    if (data) {
      return res.status(200).json({ quotefollowup: data });
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async postquotecall(req, res) {
    let { category } = req.body;
    let data = await quotefollowupModel.find({ category }).sort({ _id: -1 });
    
    const data1=data.filter((i)=>i.response === "Call Later")

    if (data1) {
      return res.json({ quotefollowup: data1 });
    } else {
      return res.json({ error: "something went wrong" });
    }
  }
  //Get survey data
  async getquotedata(req, res) {
    let data = (await quotefollowupModel.find({})).filter(
      (i) => i.response === "Call Later"
    );
    if (data) {
      return res.status(200).json({ quotefollowup: data });
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }


  async getquoteagreegate(req, res) {
    let quote = await quotefollowupModel.aggregate([
      {
        $lookup: {
          from: "enquiryadds",
          localField: "EnquiryId",
          foreignField: "EnquiryId",
          as: "enquirydata",
        },
      },
      {
        $lookup: {
          from: "enquiryfollowups",
          localField: "EnquiryId",
          foreignField: "EnquiryId",
          as: "enquiryfollowupdata",
        },
      },
      {
        $lookup: {
          from: "quotes",
          localField: "EnquiryId",
          foreignField: "EnquiryId",
          as: "quotedata",
        },
      },
      {
        $lookup: {
          from: "quotefollowups",
          localField: "EnquiryId",
          foreignField: "EnquiryId",
          as: "quotefollowup",
        },
      },
      
    ]);
    if (quote) {
      return res.json({ quotefollowup: quote });
    }
  }
  
//   //Delete
//   async deleteenquiryfollowup(req, res) {
//     let id = req.params.id;
//     const data = await enquiryfollowupModel.deleteOne({ _id: id });
//     return res.json({ success: "Delete Successf" });
//   }
}
const quotefollowupcontroller = new addquoteflw();
module.exports = quotefollowupcontroller;
