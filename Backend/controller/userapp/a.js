const serviceManagementModel = require("../../model/userapp/serviceMangament");

class serviceManagement {
  async addserviceManagement(req, res) {
    let {
      serviceName,
      category,
      serviceCategory,
      NofServiceman,
      serviceHour,
      serviceDesc,
      servicePrice,
      serviceGst,
      Subcategory,
      offerPrice,
      sub_subcategory,
      serviceExcludes,
      serviceIncludes,
      serviceDirection,
      sAddons,
      servicebelow,
      servicetitle,
      homepagetitle,
      Inimg,
      Eximg,
      qty,
      quantity,
      rating
    } = req.body;



    const parsedServiceDesc = JSON.parse(serviceDesc);

    const parsedServiceExcludes = JSON.parse(serviceExcludes);
    const parsedServiceIncludes = JSON.parse(serviceIncludes);
    let file = req.files[0]?.filename;
    let file1 = req.files[1]?.filename;
    let file2 = req.files[2]?.filename;
    let file3 = req.files[3]?.filename;

  

    let add = new serviceManagementModel({
      serviceImg: file,
      serviceName: serviceName,
      category: category,
      serviceCategory: serviceCategory,
      NofServiceman: NofServiceman,
      serviceHour: serviceHour,
      serviceDesc: parsedServiceDesc,
      servicePrice: servicePrice,
      serviceGst: serviceGst,
      Subcategory: Subcategory,
      offerPrice: offerPrice,
      sub_subcategory: sub_subcategory,
      serviceExcludes: parsedServiceExcludes, // Use the parsed objects
      serviceIncludes: parsedServiceIncludes, // Use the parsed objects
      serviceDirection: serviceDirection,
      quantity: quantity,
      servicebelow: servicebelow,
      servicetitle: servicetitle,
      homepagetitle: homepagetitle,
      Desimg: file1,
      Inimg: file2,
      Eximg: file3,
      qty,
      quantity,
      sAddons: sAddons,
      rating
    });
    // let save = add.save();
    // Save the user
    add.save().then((data) => {
      return res
        .status(200)
        .json({ success: "User added successfully", service: data });
    });
    // if (save) {
    //   console.log(save);
    //   return res.json({ sucess: "service added successfully" ,service:save});
    // }
  }

  async deteleindexvalue(req, res) {
    const { index } = req.params;

    if (index < 0 || index >= data.length) {
      return res.status(404).json({ message: "Index not found" });
    }

    data.splice(index, 1);
    saveDataToFile(); // Save the updated data to the file

    res.json({ message: "Data deleted successfully" });
  }

  async addadvance(req, res) {
    const id = req.params.id;
    const {
        plans,
        Plansdetails,
        store_slots,
  
        morepriceData,
      } = req.body;
  
      try {
        const existingData = await serviceManagementModel.findById(id);
  
        if (!existingData) {
          return res
            .status(404)
            .json({ success: false, message: "Data not found" });
        }
  
        // Update specific fields if new data is provided, otherwise keep existing data
        existingData.plans = plans || existingData.plans;
        existingData.Plansdetails = Plansdetails || existingData.Plansdetails;
        existingData.store_slots = store_slots || existingData.store_slots;
  
        existingData.morepriceData = morepriceData || existingData.morepriceData;
  
        const updatedData = await existingData.save();
  
        return res.json({ success: true, data: updatedData });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server error" });
      }
    }
  
    //edit serviceManagement
    async editserviceManagement(req, res) {
      let id = req.params.id;
      let {
        serviceName,
        category,
        serviceCategory,
        NofServiceman,
        serviceHour,
        serviceDesc,
        servicePrice,
        serviceGst,
        Subcategory,
        offerPrice,
        sub_subcategory,
        serviceExcludes,
        serviceIncludes,
        serviceDirection,
        quantity,
        servicebelow,
        servicetitle,
        sAddons,
        homepagetitle,
      } = req.body;
  
      // let file = req.file.filename;
      try {
        let data = await serviceManagementModel.findOneAndUpdate(
          { _id: id },
          {
            // serviceImg: file,
            serviceName,
            category,
            serviceCategory,
            NofServiceman,
            serviceHour,
            serviceDesc,
            servicePrice,
            serviceGst,
            Subcategory,
            offerPrice,
            sub_subcategory,
            serviceExcludes,
            serviceIncludes,
            serviceDirection,
            quantity,
            servicebelow,
            servicetitle,
            homepagetitle,
            sAddons,
          },
          { new: true } // Make sure to include this to return the updated document
          );

          if (data) {
            return res.json({ success: "Updated", service: data });
          } else {
            return res
              .status(404)
              .json({ success: false, message: "Data not found" });
          }
        } catch (error) {
          console.error(error);
          return res.status(500).json({ success: false, message: "Server error" });
        }
      }
    
    async getserviceNameManagement(req, res) {
        try {
          let services = await serviceManagementModel.find({}, 'serviceName Subcategory').sort({ _id: -1 });
          if (services) {
            return res.json({ services: services });
          }
        } catch (error) {
          // Handle any potential errors
          return res.status(500).json({ error: error.message });
        }
      }
    
      async activeStatusenble(req, res) {
        let serviceId = req.params.id;
        let {activeStatus}=req.body;
        try {
          const updatedCall = await serviceManagementModel.findByIdAndUpdate(
            serviceId,
            { $set: { activeStatus: activeStatus } },
            { new: true }
          );
    
          if (!updatedCall) {
            return res.status(404).json({ error: "Service  not found." });
          }
    
          res.status(200).json(updatedCall);
        } catch (error) {
          res.status(500).json({ error: "Error updating the Service data." });
        }
      }
    
    
      async updateServices(req, res) {
        try {
          const serviceId = req.params.id;
          const {
            serviceName,
            category,
            Subcategory,
            sub_subcategory,
            serviceDesc,
            servicetitle,
            servicebelow,
            serviceIncludes,
            serviceExcludes,
            homepagetitle,
            serviceGst,
            serviceDirection,
            serviceHour,
            sAddons,
            NofServiceman,
            rating
          } = req.body;
          const file = req.file?.filename;
    
          const findService = await serviceManagementModel.findOne({
            _id: serviceId,
          });
          if (!findService) {
            return res.json({ error: "No such record found" });
          }
          //
          findService.serviceName = serviceName || findService.serviceName;
          findService.category = category || findService.category;
          findService.Subcategory = Subcategory || findService.Subcategory;
          findService.rating = rating || findService.rating;
          findService.sub_subcategory =
            sub_subcategory || findService.sub_subcategory;
            findService.servicetitle =servicetitle||findService.servicetitle;
            findService.servicebelow = servicebelow||findService.servicebelow;
    
            findService.serviceDesc = Array.isArray(serviceDesc)
            ? serviceDesc.map((i) => (i ? JSON.parse(i) : null)).filter(Boolean)
            : serviceDesc
              ? [JSON.parse(serviceDesc)]
              : findService.serviceDesc;
          
         
          
          findService.serviceIncludes = Array.isArray(serviceIncludes)
            ? serviceIncludes.map((i) => (i ? JSON.parse(i) : null)).filter(Boolean)
            : serviceIncludes
              ? [JSON.parse(serviceIncludes)]
              : findService.serviceIncludes;
          
          findService.serviceExcludes = Array.isArray(serviceExcludes)
            ? serviceExcludes.map((i) => (i ? JSON.parse(i) : null)).filter(Boolean)
            : serviceExcludes
            ? [JSON.parse(serviceExcludes)]
            : findService.serviceExcludes;
        
  
        findService.homepagetitle = homepagetitle || findService.homepagetitle;
        findService.serviceGst = serviceGst || findService.serviceGst;
        findService.serviceDirection =
          serviceDirection || findService.serviceDirection;
        findService.serviceHour = serviceHour || findService.serviceHour;
        findService.NofServiceman = NofServiceman || findService.NofServiceman;
        findService.sAddons = sAddons;
        if (file) {
          findService.serviceImg = file;
        }
  
        const updateCategory = await serviceManagementModel.findOneAndUpdate(
          { _id: serviceId },
          findService,
          { new: true }
        );
        return res.json({
          message: "Updated successfully",
          date: updateCategory,
        });
      } catch (error) {
        console.log("error", error);
        return res.status(500).json({ error: "Unable to update the Category" });
      }
    }
  
    // 27-09
    async getServiceByCategory(req, res) {
      try {
        let { category } = req.body;
        console.log(category);
  
        let data = await serviceManagementModel
          .find({ category })
          .sort({ _id: -1 });
  
        if (category) {
          return res.status(200).json({ serviceData: data });
        } else {
          return res.status(400).send("No Data Found");
        }
      } catch (error) {
        console.log(error, "Error in Service Management Controller");
        return res.status(500).json({ error: "something went wrong" });
      }
    }
    // 03-10
    async getSlotsByService(req, res) {
      try {
        let { serviceId } = req.body;
        console.log(serviceId);
  
        let data = await serviceManagementModel
          .findById(serviceId)
          .select("store_slots")
          .sort({ _id: -1 });
  
        if (data) {
          return res.status(200).json({ success: data });
        } else {
          return res.status(400).send("No Data Found");
        }
      } catch (error) {
        console.log(error, "Error in Service Management Controller");
        return res.status(500).json({ error: "something went wrong" });
      }
    }
  
    // 04-10
    async addVideo(req, res) {
      let serviceId = req.params.id;
      let { category, serviceName, videoLink } = req.body;
  
      
      let findService = await serviceManagementModel.findOne({
        _id: serviceId,
      });
      if (!findService) {
        return res.status(404).send("Not found");
      }
      findService.videoLink = videoLink || findService.videoLink;
      findService.category = category || findService.category;
      findService.serviceName = serviceName || findService.serviceName;
  
      const saveLink = await serviceManagementModel.findOneAndUpdate(
        {
          _id: serviceId,
        },
        findService,
        { new: true }
      );
      return res
        .status(200)
        .json({ message: "Link added to this serive", saveLink });
    }
        async  getserviceManagement(req, res) {
            try {
              let service = await serviceManagementModel.find({}).sort({ _id: -1 });
              if (service.length > 0) {
                return res.json({ service: service });
              } else {
                return res.json({ service:[] });
              }
            } catch (error) {
              return res.status(500).json({ message: 'Internal server error.', error: error.message });
            }
          }
        
           async postsubcategory(req, res) {
            let { Subcategory } = req.body;
        
            let data = await serviceManagementModel
              .find({ Subcategory })
              .sort({ _id: -1 });
        
            if (data) {
              return res.json({ subcatdata: data });
            }
          }
          async postcategory(req, res) {
            let { category } = req.body;
            let data = await serviceManagementModel
              .find({ category })
              .sort({ _id: -1 });
        
            if (data) {
              return res.json({ categorydata: data });
            }
          }
        
          async deletebyindex(req, res) {
            const { serviceId, storeSlotId } = req.params;    try {
              // Find the service document by ID
              const serviceDocument = await serviceManagementModel.findById(serviceId);
        
              if (!serviceDocument) {
                return res.status(404).json({ message: "Service not found" });
              }
        
              // Assuming that `store_slots` is an array within the document
              // Remove the item from the sub-collection
              const storeSlotsArray = serviceDocument.store_slots;
              const removedSlotIndex = storeSlotsArray.findIndex(
                (slot) => slot.id.toString() === storeSlotId
              );
        
              if (removedSlotIndex === -1) {
                return res
                  .status(404)
                  .json({ message: "Store slot not found in the document" });
              }
        
              // Remove the item from the array
              storeSlotsArray.splice(removedSlotIndex, 1);
        
              // Save the parent document to update the sub-collection
              await serviceDocument.save();
        
              res.status(200).json({ message: "Store slot deleted successfully" });
            } catch (error) {
              console.error(error);
              res.status(500).json({ error: "Internal server error" });
            }
          }
        
          async deletebyindexofprice(req, res) {
            try {
              const { id, index } = req.params;
        
              const data = await serviceManagementModel.findById(id);
        
              if (!data) {
                return res.status(404).json({ message: "Data not found" });
              }
        
              // Remove the item at the specified index from store_slots
              data.morepriceData.splice(index, 1);
        
              // Save the updated document
              await data.save();
        
              res.json({ message: "Item deleted successfully" });
            } catch (error) {
              console.error(error);
              res.status(500).json({ message: "Server error" });
            }
          }
          async postdeleteserviceManagement(req, res) {
            let id = req.params.id;
            const data = await serviceManagementModel.deleteOne({ _id: id });
        
            return res.json({ success: "Successfully" });

        }
    }
        const ServiceManagemntController = new serviceManagement();
        module.exports = ServiceManagemntController;