const countermodel = require("../model/counter");

class counter {
  //add
  async addcounter(req, res) {
    const counterName = req.params.counterName;

    try {
      // Find and increment the counter by 1
      const updatedCounter = await countermodel.findOneAndUpdate(
        { name: counterName },
        { $inc: { count: 1 } },
        { new: true, upsert: true }
      );
  
      res.json(updatedCounter.count);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while generating the serial number.' });
    }
  }

  async addupdate(req, res) {
    let id = req.params.id;

    let data = await countermodel.findByIdAndUpdate({ _id: id }, { counter1 });
    if (data) {
      return res.json({ success: "Updated" });
    }
  }

  //Get all
  async getcounter(req, res) {
    let data = await countermodel.find({}).sort({ _id: -1 });
    if (data) {
      return res.status(200).json({ B2B: data });
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
}
const countercontroller = new counter();
module.exports = countercontroller;
