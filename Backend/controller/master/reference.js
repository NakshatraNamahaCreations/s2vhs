const referencemodel = require("../../model/master/reference");
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

class reference {
  async addreferencetype(req, res) {
    let { referencetype } = req.body;
    let add = new referencemodel({
      referencetype: referencetype,
    });

    try {
      let save = await add.save();
      if (save) {
        // Invalidate cache after adding a new reference type
        cache.del("allReferenceTypes");
        return res.json({ success: "added successfully" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Failed to add reference type" });
    }
  }

  async editreferencetype(req, res) {
    let id = req.params.id;
    let { referencetype } = req.body;

    try {
      let data = await referencemodel.findOneAndUpdate(
        { _id: id },
        { referencetype },
        { new: true } // Return the updated document
      );
      if (data) {
        // Invalidate cache after editing a reference type
        cache.del("allReferenceTypes");
        return res.json({ success: "Updated" });
      } else {
        return res.status(404).json({ error: "Reference type not found" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Failed to update reference type" });
    }
  }

  async getreferencetype(req, res) {
    let cachedReferenceTypes = cache.get("allReferenceTypes");
    if (cachedReferenceTypes) {
      return res.json({ masterreference: cachedReferenceTypes });
    } else {
      try {
        let referencetype = await referencemodel.find({}).sort({ _id: -1 });
        if (referencetype) {
          cache.set("allReferenceTypes", referencetype);
          return res.json({ masterreference: referencetype });
        } else {
          return res.status(404).json({ error: "No reference types found" });
        }
      } catch (error) {
        return res
          .status(500)
          .json({ error: "Failed to retrieve reference types" });
      }
    }
  }

  async postdeletereferencetype(req, res) {
    let id = req.params.id;
    try {
      const data = await referencemodel.deleteOne({ _id: id });
      if (data.deletedCount > 0) {
        // Invalidate cache after deleting a reference type
        cache.del("allReferenceTypes");
        return res.json({ success: "Successfully deleted" });
      } else {
        return res.status(404).json({ error: "Reference type not found" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Failed to delete reference type" });
    }
  }
}

const referencetypecontroller = new reference();
module.exports = referencetypecontroller;
