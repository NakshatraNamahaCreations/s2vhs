const referralCodemodel = require("../../model/userapp/referral");
const customerModel = require("../../model/customer");

class referral {

    async addreferral(req, res) {
        try {
            const { referralCode, count, userId } = req.body;
            const amt = 200;
            console.log("type", typeof amt)
            // Check if the referral code already exists in referralCodemodel
            const prevReferral = await referralCodemodel.find({ referralCode ,userId});
            if (prevReferral) {
                return res.status(400).json({ error: "This referral code is already used" });
            }

            // Check if the referral code exists in customerModel
            const prevReferralInCus = await customerModel.find({ referralCode });
            if (!prevReferralInCus) {
                return res.status(400).json({ error: "Referral code does not exist for any customer" });
            }

            const user = await customerModel.findOneAndUpdate(
                { _id: userId },
                { $inc: { wAmount: amt } },
                { new: true }
            );
            
            // Create a new referral code document in referralCodemodel
            const newReferral = new referralCodemodel({ referralCode, count, userId });
            await newReferral.save();

            return res.status(201).json({ success: "Referral code added successfully", user });
        } catch (error) {
            console.error("Error adding referral code:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }





}

const referralController = new referral();
module.exports = referralController;
