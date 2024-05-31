const cityymodel = require("../../model/master/city");
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

class city {
  async addcity(req, res) {
    let { city } = req.body;
    if (!city) {
      return res.status(500).json({ error: "field must not be empty" });
    } else {
      let addcity = new cityymodel({ city: city });
      try {
        let save = await addcity.save();
        if (save) {
          // Invalidate cache after adding a new city
          cache.del("allCities");
          return res.json({ success: "city name added successfully" });
        }
      } catch (error) {
        return res.status(500).json({ error: "Failed to add city" });
      }
    }
  }

  async editcity(req, res) {
    let id = req.params.id;
    let { city } = req.body;
    try {
      let data = await cityymodel.findOneAndUpdate({ _id: id }, { city });
      if (data) {
        // Invalidate cache after editing a city
        cache.del("allCities");
        return res.json({ success: "Updated" });
      } else {
        return res.status(404).json({ error: "City not found" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Failed to update city" });
    }
  }

  async getcity(req, res) {
    let cachedCities = cache.get("allCities");
    if (cachedCities) {
      return res.status(200).json({ mastercity: cachedCities });
    } else {
      try {
        let city = await cityymodel.find({}).sort({ _id: -1 });
        if (city) {
          cache.set("allCities", city);
          return res.status(200).json({ mastercity: city });
        } else {
          return res.status(404).json({ error: "No cities found" });
        }
      } catch (error) {
        return res.status(500).json({ error: "Failed to retrieve cities" });
      }
    }
  }

  async postdeletecity(req, res) {
    let id = req.params.id;
    try {
      const data = await cityymodel.deleteOne({ _id: id });
      if (data.deletedCount > 0) {
        // Invalidate cache after deleting a city
        cache.del("allCities");
        return res.json({ success: "Successfully deleted" });
      } else {
        return res.status(404).json({ error: "City not found" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Failed to delete city" });
    }
  }
}

const citycontroller = new city();
module.exports = citycontroller;
