const moment = require("moment");
const enquiryaddmodel = require("../model/enquiryadd");
const enquiryfollowupModel = require("../model/enquiryfollowup");


class addenquiry {


  async getallenquirycount(req, res) {
    try {
      // Get the start and end dates for today
      const todayStart = moment().startOf('day').toDate();
      const todayEnd = moment().endOf('day').toDate();

      // Get the start and end dates for this week
      const thisWeekStart = moment().startOf('isoWeek').toDate();
      const thisWeekEnd = moment().endOf('isoWeek').toDate();

      // Count the documents for today
      const totalEnquiriesToday = await enquiryaddmodel.countDocuments({
        createdAt: {
          $gte: todayStart,
          $lt: todayEnd,
        },
      });

      // Count the documents for this week
      const totalEnquiriesThisWeek = await enquiryaddmodel.countDocuments({
        createdAt: {
          $gte: thisWeekStart,
          $lt: thisWeekEnd,
        },
      });

      return res.status(200).json({
        enquirycountToday: totalEnquiriesToday,
        enquirycountThisWeek: totalEnquiriesThisWeek,
      });
    } catch (error) {
      console.error("Error fetching enquiry count:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async Addenquiry(req, res) {
    try {
      let {
        date,
        executive,
        name,
        Time,
        email,
        mobile,
        contact2,
        address,
        category,
        reference1,
        reference2,
        city,
        // reference3,
        comment,
        intrestedfor,
        serviceID,
        responseType,
        deliveryAddress,
        Area,
        company,
        brancharea,
        // counter,
      } = req.body;
      const reference3 = req.query.reference3 || "";

      const latestCustomer = await enquiryaddmodel
        .findOne()
        .sort({ EnquiryId: -1 })
        .exec();
      const latestEquiry = latestCustomer ? latestCustomer.EnquiryId : 0;
      const newEquiry = latestEquiry + 1;

      const newVendor = new enquiryaddmodel({
        EnquiryId: newEquiry,
        date,
        executive,
        name,
        Time,
        email,
        mobile,
        contact2,
        address,
        category,
        reference1,
        reference2,
        city,
        reference3,
        comment,
        intrestedfor,
        serviceID, //05-10
        responseType,
        deliveryAddress,
        Area,
        company,
        brancharea,
      });
      newVendor.save().then((data) => {
        return res
          .status(200)
          .json({ Success: "Account created. Please login", data: newVendor });
      });
    } catch (error) {
      console.error("Error enquiry add:", error);
    }
  }

  async Addjdenquiry(req, res) {
    try {
      let {
        date,
        executive,
        name,
        Time,
        email,
        mobile,
        contact2,
        address,
        category,

        reference2,
        city,
        // reference3,
        comment,
        intrestedfor,
        serviceID,
        responseType,
        deliveryAddress,
        Area,
        company,
        brancharea,
        // counter,
      } = req.body;
      const reference1 = req.query.reference1 || "";

      const latestCustomer = await enquiryaddmodel
        .findOne()
        .sort({ EnquiryId: -1 })
        .exec();
      const latestEquiry = latestCustomer ? latestCustomer.EnquiryId : 0;
      const newEquiry = latestEquiry + 1;

      const newVendor = new enquiryaddmodel({
        EnquiryId: newEquiry,
        date,
        executive,
        name,
        Time,
        email,
        mobile,
        contact2,
        address,

        reference1,
        reference2,
        city,

        comment,
        intrestedfor: category,
        serviceID, //05-10
        responseType,
        deliveryAddress,
        Area,
        company,
        brancharea,
      });
      newVendor.save().then((data) => {
        return res
          .status(200)
          .json({ Success: "Account created. Please login", data: newVendor });
      });
    } catch (error) {
      console.error("Error enquiry add:", error);
    }
  }
  //edit
  async editenquiry(req, res) {
    let id = req.params.id;

    let {
      enquiryid,
      date,
      executive,
      name,
      Time,
      email,
      mobile,
      contact2,
      address,
      category,
      reference1,
      reference2,
      city,
      reference3,
      comment,
      intrestedfor,
      serviceID, //05-10
      responseType,
    } = req.body;
    let data = await enquiryaddmodel.findOneAndUpdate(
      { _id: id },
      {
        enquiryid,
        date,
        executive,
        name,
        Time,
        email,
        mobile,
        contact2,
        address,
        category,
        reference1,
        reference2,
        city,
        reference3,
        comment,
        intrestedfor,
        serviceID, //05-10
        responseType,
      }
    );
    if (data) {
      return res.json({ success: "Updated" });
    }
  }

  async updatequote(req, res) {
    let id = req.params.id;
    let { projecttype, qamt, bookedby } = req.body;
    let newData = await enquiryaddmodel.findOneAndUpdate(
      { _id: id },
      {
        projecttype,
        qamt,
        bookedby,
      }
    );
    if (newData) {
      return res.status(200).json({ Success: "Added" });
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async postsubcategory(req, res) {
    let { category } = req.body;
    let data = await enquiryaddmodel.find({ category }).sort({ _id: -1 });

    if (data) {
      return res.json({ enquiryadd: data });
    } else {
      return res.json({ error: "something went wrong" });
    }
  }

  async getallagreegate(req, res) {
    const enquiryid = req.params.id;

    try {
      let quote = await enquiryaddmodel.aggregate([
        {
          $match: {
            EnquiryId: {
              $eq: parseInt(enquiryid, 10) // Convert string to integer
            }
          }
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
            from: "treatments",
            localField: "EnquiryId",
            foreignField: "EnquiryId",
            as: "treatmentdetails",
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

        return res.json({ enquiryadd: quote });
      }
    } catch (error) {
      console.log(error)
    }


  }

  async getEnquiryAndAggregate(req, res) {
    try {
      let EnquiryId = req.params.id;

      let aggregatedData = await enquiryaddmodel.aggregate([
        {
          $match: { EnquiryId: EnquiryId }, // Match the EnquiryId obtained from the enquiry
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
            from: "treatments",
            localField: "EnquiryId",
            foreignField: "EnquiryId",
            as: "treatmentdetails",
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

      return res.json({ enquiryadd: aggregatedData });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getallnewfollow(req, res) {
    try {
      let result = await enquiryaddmodel.aggregate([
        {
          $lookup: {
            from: "enquiryfollowups",
            localField: "EnquiryId",
            foreignField: "EnquiryId",
            as: "enquiryFollow",
          },
        },
        {
          $match: {
            enquiryFollow: { $eq: [] },
          },
        },
      ]).exec(); // Add exec here
  
      if (result) {
        return res.json({ enquiryadd: result });
      }
      console.log(result, "result");
    } catch (error) {
      console.error("Error in getallnewfollow:", error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  

  async findWithEnquiryID(req, res) {
    try {
      let EnquiryId = req.params.id;

      const data = await enquiryaddmodel
        .find({ EnquiryId })
        .sort({ _id: -1 })
        .exec();

      if (data && data.length > 0) {
        return res.status(200).json({ enquiryadd: data });
      } else {
        return res.json({ enquiryadd: [] });
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  //Get all
  async getallenquiryadd(req, res) {
    let data = await enquiryaddmodel.find({}).sort({ _id: -1 });
    if (data) {
      return res.status(200).json({ enquiryadd: data });
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async getLatestEnquiryAdd(req, res) {
    try {
      let data = await enquiryaddmodel.findOne({}).sort({ _id: -1 }).limit(1);

      if (data) {
        return res.status(200).json({ enquiryadd: data });
      } else {
        return res.status(404).json({ error: "No data found" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async getenquiryfilter(req, res) {
    try {
      const {
        name,
        city,
        fromdate,
        todate,
        executive,
        contact,
        status,
        category,
        serviceName,
        reference1,
        reference2,
        response,
      } = req.body;

      const formattedFromDate = moment(fromdate, "YYYY-MM-DD").format(
        "MM-DD-YYYY"
      );
      const formattedToDate = todate
        ? moment(todate, "YYYY-MM-DD").format("MM-DD-YYYY")
        : moment().format("MM-DD-YYYY");

      const filter = {
        name: name ? { $regex: new RegExp(name, "i") } : undefined,
        city: city || undefined,
        date:
          fromdate && todate
            ? { $gte: formattedFromDate, $lte: formattedToDate }
            : undefined,
        executive: executive
          ? { $regex: new RegExp(executive, "i") }
          : undefined,
        mobile: contact ? { $regex: new RegExp(contact, "i") } : undefined,
        status: status || undefined,
        reference1: reference1 || undefined,
        reference2: reference2 || undefined,
        category: category || undefined,
        intrestedfor: serviceName || undefined,
      };

      // Remove undefined properties from the filter
      const cleanedFilter = Object.fromEntries(
        Object.entries(filter).filter(([_, v]) => v !== undefined)
      );

      const data = await enquiryaddmodel.aggregate([
        {
          $lookup: {
            from: "enquiryfollowups",
            localField: "EnquiryId",
            foreignField: "EnquiryId",
            as: "enquiryFollow",
          },
        },
        {
          $match: cleanedFilter, // This filters the main collection (enquiryaddmodel)
        },

        { $sort: { _id: -1 } },
      ]);

      if (response) {
        let edta;

        if (data && data.enquiryFollow && Array.isArray(data.enquiryFollow)) {
          // Check if data and data.enquiryFollow are defined and if enquiryFollow is an array
          edta = data.enquiryFollow.filter((i) => i.response === "response");
        } else {
          // Handle the case where data or data.enquiryFollow is undefined
          edta = [];
        }
      }

      if (data && data.length > 0) {
        return res.status(200).json({ enquiryadd: data });
      } else {
        return res.status(404).json({ error: "No data found" });
      }
    } catch (error) {
      console.error("Error in getallenquiryadd:", error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }


  async getenquiryfilter1(req, res) {
    try {
      const {
        name,
        city,
        fromdate,
        todate,
        executive,
        contact,
        status,
        category,
        serviceName,
        reference1,
        reference2,
        response,
      } = req.body;

      const formattedFromDate = moment(fromdate, "YYYY-MM-DD").format(
        "MM-DD-YYYY"
      );
      const formattedToDate = todate
        ? moment(todate, "YYYY-MM-DD").format("MM-DD-YYYY")
        : moment().format("MM-DD-YYYY");

      const filter = {
        name: name ? { $regex: new RegExp(name, "i") } : undefined,
        city: city || undefined,
        date:
          fromdate && todate
            ? { $gte: formattedFromDate, $lte: formattedToDate }
            : undefined,
        executive: executive
          ? { $regex: new RegExp(executive, "i") }
          : undefined,
        mobile: contact ? { $regex: new RegExp(contact, "i") } : undefined,
        status: status || undefined,
        reference1: reference1 || undefined,
        reference2: reference2 || undefined,
        category: category || undefined,
        intrestedfor: serviceName || undefined,
      };

      // Remove undefined properties from the filter
      const cleanedFilter = Object.fromEntries(
        Object.entries(filter).filter(([_, v]) => v !== undefined)
      );

      const data = await enquiryaddmodel.aggregate([
        {
          $lookup: {
            from: "enquiryfollowups",
            localField: "EnquiryId",
            foreignField: "EnquiryId",
            as: "enquiryFollow",
          },
        },
        {
          $match: cleanedFilter, // This filters the main collection (enquiryaddmodel)
        },

        { $sort: { _id: -1 } },
      ]);



      if (response) {
        let edta;
        if (data) {
          const filteredData = data.filter(entry => entry.enquiryFollow.some(item => item.response.includes(response)));
          console.log("first---")
          return res.status(200).json({ enquiryadd: filteredData });
        } else {
          console.log("seconde---")
          return res.status(200).json({ enquiryadd: data });

        }
      } else {
        return res.status(200).json({ enquiryadd: data });
      }

      // if (data && data.length > 0) {
      //   return res.status(200).json({ enquiryadd: data });
      // } else {
      //   return res.status(404).json({ error: "No data found" });
      // }
    } catch (error) {
      console.error("Error in getallenquiryadd:", error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  //Get all
  async getallenquiryid(req, res) {
    let { id } = req.body;
    let data = await enquiryaddmodel.find({ EnquiryId: id });
    if (data) {
      return res.status(200).json({ enquiryadd: data });
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  //Delete
  async deleteenquiryadd(req, res) {
    let id = req.params.id;
    const data = await enquiryaddmodel.deleteOne({ _id: id });
    return res.json({ success: "Delete Successf" });
  }


  async getallenquiryadd12(req, res) {
    try {
      const data = await enquiryaddmodel.aggregate([
        {
          $lookup: {
            from: "enquiryfollowups",
            localField: "EnquiryId",
            foreignField: "EnquiryId",
            as: "enquiryfollowData",
          },
        },
        {
          $sort: {
            date: 1, // 1 for ascending order, -1 for descending order
          },
        },
      ]);

      // Filter data for today's date
      const filteringTodaysData = data.filter(
        (item) =>
          moment(item.date).format("DD-MM-YYYY") ===
          moment(new Date()).format("DD-MM-YYYY")
      );

      // Return the filtered and sorted data
      return res.json({ enquiryadd: filteringTodaysData });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }








}
const enquiryaddcontroller = new addenquiry();
module.exports = enquiryaddcontroller;
