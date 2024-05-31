const moment = require("moment");
const quotemodel = require("../model/quote");

class addequote {

  async QUOTEFilterdata(req, res) {
    try {
      const {
        fromdate,
        todate,
      } = req.body;


      const formattedFromDate = moment(fromdate, "YYYY/MM/DD").format("MM/DD/YYYY");
      const formattedToDate = todate
        ? moment(todate, "YYYY/MM/DD").format("MM/DD/YYYY")
        : moment().format("MM/DD/YYYY");
      const filter = {
        date:
          fromdate && todate
            ? { $gte: formattedFromDate, $lte: formattedToDate }
            : undefined,
      };
      // Remove undefined properties from the filter
      const cleanedFilter = Object.fromEntries(
        Object.entries(filter).filter(([_, v]) => v !== undefined)
      );
      const data = await quotemodel.aggregate([
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
            from: "quotefollowups",
            localField: "EnquiryId",
            foreignField: "EnquiryId",
            as: "quotefollowup",
          },
        },
        {
          $match: cleanedFilter,
        },

        { $sort: { _id: -1 } },
      ]);
      if (data) {
        return res.status(200).json({ enquiryadd: data });

      }

    } catch (error) {
      console.error("Error in getallenquiryadd:", error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  //add
  async addquote(req, res) {
    let {
      userId,
      EnquiryId,
      projectType,
      SUM,
      GST,
      total,
      adjustments,
      netTotal,
      date,
      time,
      Bookedby,
      salesExecutive,
      type,
      exeId,
      number,
      exenumber
    } = req.body;

    if (!total) {
      return res.status(500).json({ error: "Fill all fields" });
    } else {
      try {
        const latestCustomer = await quotemodel
          .findOne()
          .sort({ quoteId: -1 })
          .exec();
        const latestCardNo = latestCustomer ? latestCustomer.quoteId : 0;
        // if (typeof GST !== "undefined") {
        //   return GST;
        // }
        // Increment the card number by 1
        const newCardNo = latestCardNo + 1;
        let quote = new quotemodel({
          quoteId: newCardNo,
          userId,
          EnquiryId,
          projectType,
          SUM,
          GST,
          total,
          adjustments,
          netTotal,
          date,
          time,
          Bookedby,
          salesExecutive,
          type,
          exeId,
          exenumber,
          number
        });

        let save = quote.save();
        if (save) {
          return res.json({ success: "enquiry added successfully" });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async updatequoteDetails(req, res) {
    try {
      let id = req.params.id;
      let {
        quoteId,
        userId,
        EnquiryId,
        projectType,
        SUM,
        GST,
        total,
        adjustments,
        netTotal,
        date,
        time,
        Bookedby,
        salesExecutive,
        type,
        exeId,
        exenumber,
        number
      } = req.body;
      if (typeof GST !== "undefined") {
        GST = GST;
      }
      let newData = await quotemodel.findOneAndUpdate(
        { _id: id },
        {
          quoteId,
          userId,
          EnquiryId,
          projectType,
          SUM,
          GST,
          total,
          adjustments,
          netTotal,
          date,
          time,
          Bookedby,
          salesExecutive,
          type,
          exeId,
          exenumber,
          number
        }
      );
      if (newData) {
        return res.status(200).json({ Success: "Added" });
      } else {
        return res.status(500).json({ error: "Something went wrong" });
      }
    } catch (error) {
      console.log("error:", error);
    }
  }

  async getallagreegatequote(req, res) {
    try {
      const result = await quotemodel.aggregate([
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
            from: "quotefollowups",
            localField: "EnquiryId",
            foreignField: "EnquiryId",
            as: "quotefollowup",
          },
        },
        {
          $lookup: {
            from: "enquiryfollowups",
            localField: "EnquiryId",
            foreignField: "EnquiryId",
            as: "enquiryfollowups",
          },
        },
      ]).sort({ _id: -1 });

      return res.json({ quote: result });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getallagreegatequoteall(req, res) {
    try {
      const result = await quotemodel.aggregate([
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
            from: "quotefollowups",
            localField: "EnquiryId",
            foreignField: "EnquiryId",
            as: "quotefollowup",
          },
        },
        {
          $lookup: {
            from: "enquiryfollowups",
            localField: "EnquiryId",
            foreignField: "EnquiryId",
            as: "enquiryfollowups",
          },
        },
        {
          $match:{
            quotefollowup:{$eq:[]}
          }
        }
      ]).sort({ _id: -1 });

      return res.json({ quote: result });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getallaggregatequotewwithexeid(req, res) {
    try {
      const exeId = req.params.id;

      const result = await quotemodel.aggregate([
        {
          $match: { exeId: exeId }, // Filter based on the ExeId
        },
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
            from: "quotefollowups",
            localField: "EnquiryId",
            foreignField: "EnquiryId",
            as: "quotefollowup",
          },
        },
        {
          $lookup: {
            from: "enquiryfollowups",
            localField: "EnquiryId",
            foreignField: "EnquiryId",
            as: "enquiryfollowups",
          },
        },
      ]).sort({ _id: -1 }); // Assuming you want to sort by the _id field in descending order

      return res.json({ quote: result });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  //Get all
  async getallquote(req, res) {
    let data = await quotemodel.find({}).sort({ _id: -1 });
    if (data) {
      return res.status(200).json({ quote: data });
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async findwithidupdatetype(req, res) {
    try {
      const id = req.params.id;
      let { type } = req.body;
      const data = await quotemodel.findByIdAndUpdate(id, { type }, { new: true }).sort({ _id: -1 });

      if (data) {
        return res.status(200).json({ quote: data });
      } else {
        return res.status(500).json({ error: "Something went wrong" });
      }
    } catch (error) {
      console.log(error)
    }

  }

  async findWithEnquiryID(req, res) {
    try {
      let EnquiryId = req.params.id;

      const data = await quotemodel.find({ EnquiryId }).sort({ _id: -1 }).exec();

      if (data && data.length > 0) {
        return res.status(200).json({ quote: data });
      } else {
        return res.json({ quote: [] });
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }


  //Delete
  async deletequote(req, res) {
    let id = req.params.id;
    const data = await quotemodel.deleteOne({ _id: id });
    return res.json({ success: "Delete Successf" });
  }
}


const quoteaddcontroller = new addequote();
module.exports = quoteaddcontroller;
