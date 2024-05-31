const categorymodel = require("../model/category");
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

class Category {
  async addcategory(req, res) {
    let { category } = req.body;
    let file = req.file?.filename;

    let add = new categorymodel({
      category: category,
      categoryImg: file,
    });
    try {
      let save = await add.save();
      if (save) {
        // Invalidate cache after adding a new category
        cache.del("allCategories");
        return res.json({ success: "Category name added successfully" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Failed to add category" });
    }
  }

  async updateCategory(req, res) {
    try {
      const categoryId = req.params.ccid;
      const { category } = req.body;
      const file = req.file?.filename;

      const findCategory = await categorymodel.findOne({ _id: categoryId });
      if (!findCategory) {
        return res.json({ error: "No such record found" });
      }

      findCategory.category = category || findCategory.category;
      if (file) {
        findCategory.categoryImg = file;
      }

      const updateCategory = await categorymodel.findOneAndUpdate(
        { _id: categoryId },
        findCategory,
        { new: true } // Return the updated document
      );

      // Invalidate cache after updating a category
      cache.del("allCategories");

      return res.json({
        message: "Updated successfully",
        data: updateCategory,
      });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({ error: "Unable to update the Category" });
    }
  }

  async getcategory(req, res) {
    let cachedCategories = cache.get("allCategories");
    if (cachedCategories) {
      console.log("fetch from cache");
      return res.json({ category: cachedCategories });
    } else {
      try {
        let category = await categorymodel.find({}).sort({ _id: -1 });
        if (category) {
          cache.set("allCategories", category);
          return res.json({ category: category });
        } else {
          return res.status(404).json({ error: "No categories found" });
        }
      } catch (error) {
        return res.status(500).json({ error: "Failed to retrieve categories" });
      }
    }
  }

  async getallcategory(req, res) {
    let cachedAllCategories = cache.get("allCategoriesWithSubcategories");
    if (cachedAllCategories) {
      return res.json({ category: cachedAllCategories });
    } else {
      try {
        let category = await categorymodel.aggregate([
          {
            $lookup: {
              from: "subcategories",
              localField: "category",
              foreignField: "category",
              as: "subcategories",
            },
          },
        ]);
        if (category) {
          cache.set("allCategoriesWithSubcategories", category);
          return res.json({ category: category });
        } else {
          return res.status(404).json({ error: "No categories found" });
        }
      } catch (error) {
        return res.status(500).json({ error: "Failed to retrieve categories" });
      }
    }
  }

  async postdeletecategory(req, res) {
    let id = req.params.id;
    try {
      const data = await categorymodel.deleteOne({ _id: id });
      if (data.deletedCount > 0) {
        // Invalidate cache after deleting a category
        cache.del("allCategories");
        cache.del("allCategoriesWithSubcategories");
        return res.json({ success: "Successfully deleted" });
      } else {
        return res.status(404).json({ error: "Category not found" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Failed to delete category" });
    }
  }
}

const categoryController = new Category();
module.exports = categoryController;
