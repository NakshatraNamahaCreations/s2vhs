const customerModel = require("../model/customer");

class addcustomer {


  async getallcustomercount(req, res) {
    try {
      const totalCustomers = await customerModel.countDocuments({});
    
  
      return res.status(200).json({ customers: totalCustomers });
    } catch (error) {
      console.error("Error fetching all customers:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  
  //add customer
  async addcustomer(req, res) {
    let {
      customerName,
      EnquiryId,
      contactPerson,
      category,
      mainContact,
      alternateContact,
      email,
      gst,
      rbhf,
      cnap,
      lnf,
      mainArea,
      deliveryAddress,
      city,
      pinCode,
      customerType,
      size,
      color,
      instructions,
      approach,
      password,
      cpassword,
      type,
      serviceExecute,
      selectedSlotText,
    } = req.body;
    try {
      // Get the latest card number from the database
      const latestCustomer = await customerModel
        .findOne()
        .sort({ cardNo: -1 })
        .exec();
      const latestCardNo = latestCustomer ? latestCustomer.cardNo : 0;

      // Increment the card number by 1
      const newCardNo = latestCardNo + 1;

      // check if contact is already exists
      const existingContactno = await customerModel.findOne({
        mainContact: mainContact,
      });
      if (existingContactno) {
        return res.status(400).json({ error: "Contactno already exists" });
      }

      // Create a new customer instance with the generated card number
      const customer = new customerModel({
        cardNo: newCardNo,
        EnquiryId,
        customerName,
        contactPerson,
        category,
        mainContact,
        alternateContact,
        email,
        gst,
        deliveryAddress,
        rbhf,
        cnap,
        lnf,
        mainArea,
        city,
        pinCode,
        customerType,
        size,
        color,
        instructions,
        approach,
        password,
        cpassword,
        type,
        serviceExecute,
        selectedSlotText,
      });
      // Save the customer data to the database
      const savedCustomer = await customer.save();

      if (savedCustomer) {
        return res.json({
          success: "Customer added successfully",
          user: savedCustomer,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async usersignin(req, res) {
    const { email, password } = req.body;

    try {
      if (!email) {
        return res
          .status(400)
          .json({ error: "Please enter your loginname or email" });
      }
      if (!password) {
        return res.status(400).json({ error: "Please enter your password" });
      }
      const user = await customerModel.findOne({ email });
      console.log(user);
      if (!user) {
        return res.status(404).json({ error: "User not found " });
      }
      // const passwordMatch = bcrypt.compareSync(password, user.password);
      console.log(user.password);
      console.log(password);
      if (password !== user.password) {
        return res.status(401).json({ error: "Invalid password" });
      }
      await customerModel.findOneAndUpdate({ email }, { status: "Online" });
      return res.json({ success: "Login successful", user });
    } catch (error) {
      console.error("Something went wrong", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async editcustomer(req, res) {
    try {
      let id = req.params.id;
      let {
        cardNo,
        EnquiryId,
        customerName,
        contactPerson,
        category,
        mainContact,
        alternateContact,
        email,
        gst,
        rbhf,
        cnap,
        lnf,
        mainArea,
        city,
        pinCode,
        customerType,
        size,
        color,
        instructions,
        approach,
        serviceExecute,
      } = req.body;

      let data = await customerModel.findOneAndUpdate(
        { _id: id },
        {
          cardNo,
          EnquiryId,
          customerName,
          contactPerson,
          category,
          mainContact,
          alternateContact,
          email,
          gst,
          rbhf,
          cnap,
          lnf,
          mainArea,
          city,
          pinCode,
          customerType,
          size,
          color,
          instructions,
          approach,
          serviceExecute,
        },
        { new: true }
      );

      if (data) {
        return res.status(200).json({ success: "Updated" ,user: data, });
      } else {
        return res.status(401).send("Not Updated");
      }
    } catch (error) {
      console.error("Error editing customer:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async userupdate(req, res) {
    let id = req.params.id;
    let {
      cardNo,
      EnquiryId,
      customerName,
      contactPerson,
      category,
      mainContact,
      alternateContact,
      email,
      gst,
      rbhf,
      cnap,
      lnf,
      mainArea,
      city,
      pinCode,
      customerType,
      size,
      color,
      instructions,
      approach,
      serviceExecute,
    } = req.body;
    try {
      const updatedUser = await customerModel.findByIdAndUpdate(
        id,
        {
          cardNo,
          EnquiryId,
          customerName,
          contactPerson,
          category,
          mainContact,
          alternateContact,
          email,
          gst,
          rbhf,
          cnap,
          lnf,
          mainArea,
          city,
          pinCode,
          customerType,
          size,
          color,
          instructions,
          approach,
          serviceExecute,
        },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      return res
        .status(200)
        .json({ success: "Profile updated successfully", user: updatedUser });
    } catch (error) {
      console.log("Error updating profile:", error);
      return res.status(500).json({ error: "An error occurred" });
    }
  }

  async addCustomersViaExcelSheet(req, res) {
    const data = req.body;

    try {
      // Get the latest card number from the database
      const latestCustomer = await customerModel
        .findOne()
        .sort({ cardNo: -1 })
        .exec();
      const latestCardNo = latestCustomer ? latestCustomer.cardNo : 0;

      // Increment the card number by 1
      const customersWithCardNo = data.map((customer, index) => ({
        ...customer,
        cardNo: latestCardNo + index + 1,
      }));
      const inserteCustomer = await customerModel.insertMany(
        customersWithCardNo
      );

      if (inserteCustomer.length > 0) {
        return res.json({ success: "Customer added successfully" });
      } else {
        return res.status(400).json({ error: "Failed to add Customers" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async addservicedetails(req, res) {
    try {
      const id = req.params.id;
      const { treatmentdetails } = req.body;

      const doc = await customerModel.findByIdAndUpdate(
        id,
        { $push: { treatmentdetails: treatmentdetails } },
        { new: true } // Optional: To return the updated document
      );

      res.json(doc);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  //Get all customer
  async getallcustomer(req, res) {
    let data = await customerModel.find({}).sort({ _id: -1 });
    if (data) {
      return res.status(200).json({ customers: data });
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async getCustomerById(req, res) {
    const customerId = req.params.id; // Assuming the ID is passed as a route parameter

    try {
      const customer = await customerModel.findById(customerId);

      if (customer) {
        return res.status(200).json({ customer: customer });
      } else {
        return res.status(404).json({ customer: [] });
      }
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async getCustomerByPhoneNumber(req, res) {
    const { number } = req.params; // Corrected to match the route parameter
    console.log(number);
    try {
      const customer = await customerModel.findOne({ mainContact: number });
      console.log(customer);
      if (customer) {
        return res.status(200).json({ customer: customer });
      } else {
        return res.status(404).json({ message: "Customer not found" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  //Delete customer
  async deletecustomer(req, res) {
    let id = req.params.id;
    const data = await customerModel.deleteOne({ _id: id });
    return res.json({ success: "Delete Successf" });
  }

  async getlastcustomer(req, res) {
    let data = await customerModel.find({}).sort({ _id: -1 }).limit(1);
    if (data) {
      return res.status(200).json({ customers: data });
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async addDeliveryAddress(req, res) {
    try {
      const cardNo = req.params.cardNo;
      const deliveryAddressData = req.body.deliveryAddress;

      // Find the customer by ID
      const customer = await customerModel.findOne({ cardNo });

      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }

      // Add the delivery address to the customer's deliveryAddress array
      customer.deliveryAddress.push(deliveryAddressData);

      // Save the updated customer
      await customer.save();

      res.status(200).json({ success: "Delivery address added successfully" });
    } catch (error) {
      console.error("Error adding delivery address:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getFilteredCustomers(req, res) {
    const { customername, city, customertype, maincontact } = req.query;

    const filter = {};

    if (customername)
      filter.customerName = { $regex: new RegExp(customername, "i") };
    if (city) filter.city = { $regex: new RegExp(city, "i") };
    if (customertype)
      filter.customerType = { $regex: new RegExp(customertype, "i") };
    if (maincontact) filter.mainContact = maincontact;

    try {
      const data = await customerModel
        .find(filter)
        .select("customerName city customerType mainContact rbhf cnap lnf")
        .sort({ _id: -1 })
        .limit(50); // Limit the number of results for performance
      return res.status(200).json({ customers: data });
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async getcustomerdatapagewise(req, res) {
    try {
      const page = req.query.page || 1;
      const pageSize = 25;
      const skip = (page - 1) * pageSize;
      const searchQuery = req.query.search || "";

      // Set initial filter for type === "userapp"
      const filter = { type: { $in: ["userapp", "website"] } };

      if (searchQuery) {
        // Add additional conditions for customerName and email
        const searchCondition = {
          $or: [
            { customerName: { $regex: searchQuery, $options: "i" } },
            { email: { $regex: searchQuery, $options: "i" } },
          ],
        };
        // Combine the type condition and search condition using $and
        filter.$and = [filter, searchCondition];
      }

      const totalRecords = await customerModel.countDocuments(filter);
      const customer = await customerModel
        .find(filter)
        .sort({ _id: -1 })
        .skip(skip)
        .limit(pageSize);

      if (customer.length > 0) {
        return res
          .status(200)
          .json({ customer, totalRecords, currentPage: page });
      } else {
        return res.status(404).json({ message: "No customer found." });
      }
    } catch (error) {
      console.log("errorcustomersearch ", error.message);
      return res
        .status(500)
        .json({ message: "Internal server error.", error: error.message });
    }
  }
}
const customercontroller = new addcustomer();
module.exports = customercontroller;
