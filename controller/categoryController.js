const categoryModel = require("../models/categoryModel");
const slugify = require("slugify");

const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category already exists.",
      });
    }

    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();

    res.status(201).send({
      success: true,
      message: "Category has been successfully created.",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in category",
    });
  }
};

const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    if (!name || !id) {
      return res.status(500).send({
        success: false,
        message: "ID or name missing.",
      });
    }

    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Category updated successfully.",
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: "Error while updating category.",
    });
  }
};

const getAllCategoryController = async (req, res) => {
  try {
    const categories = await categoryModel.find();

    if (categories.length > 0) {
      return res.status(200).send({
        success: true,
        message: "Categories sent successfully.",
        categories,
      });
    } else {
      return res.status(404).send({
        success: true,
        message: "No category was found in database.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: "An error has occurred.",
    });
  }
};

const getSingleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });

    if (category) {
      return res.status(200).send({
        success: true,
        message: "Category sent successfully.",
        category,
      });
    } else {
      return res.status(404).send({
        success: false,
        message: "No category was found in database.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: "An error has occurred.",
    });
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findByIdAndDelete(req.params.id);

    if (category) {
      return res.status(200).send({
        success: true,
        message: "Category deleted successfully.",
        category,
      });
    } else {
      return res.status(404).send({
        success: false,
        message: "No category was found in database.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: "An error has occurred.",
    });
  }
};

module.exports = {
  createCategoryController,
  updateCategoryController,
  getAllCategoryController,
  getSingleCategoryController,
  deleteCategoryController,
};
