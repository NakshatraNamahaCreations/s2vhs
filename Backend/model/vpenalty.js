const mongoose = require("mongoose");

const vPenaltySchema = new mongoose.Schema(
    {

        vendorId: {
            type: mongoose.Schema.Types.ObjectId,
        },

        serviceId: {
            type: mongoose.Schema.Types.ObjectId,
        },
        vPenalty: {
            type: String,
        },

    },
    {
        timestamps: true,
    }
);

const vPenaltymodel = mongoose.model("vPenalty", vPenaltySchema);
module.exports = vPenaltymodel;
