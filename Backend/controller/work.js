const WorkModal = require("../model/work");

class Work {
  async addWork(req, res) {
    try {
      let {
        workDate,
        workMileStone,
        workMaterialUse,
        workDetails,
        workRemark,
        customerId,
        serviceId
      } = req.body;
      if (
        !workDate ||
        !workMileStone ||
        !workMaterialUse
        
       
      ) {
        return res.status(500).json({ error: "Field must not be empty" });
      } else {
        let add = new WorkModal({
          workDate,
          workMileStone,
          workMaterialUse,
          workDetails,
          workRemark,
          customer: customerId,
          serviceId
        });
        const savedWorks = await add.save();
        if (savedWorks) {
          return res
            .status(200)
            .json({ success: "Work added successfully" });
        }
      }
    } catch (error) {
      console.log("error matweril--",error.message)
      return res
        .status(500)
        .json({ error: "An error occurred while adding work" });
    }
  }

  async getWorkByCustomerId(req, res) {
    try {
      const customerId = req.params.customerId;
      const works = await WorkModal.find({ customer: customerId });

      if (!works) {
        return res.status(404).json({ error: "Payment details not found" });
      }

      return res.status(200).json({ works });
    } catch (error) {
      return res.status(500).json({ error: "An error occurred" });
    }
  }
}

const workController = new Work();
module.exports = workController;
