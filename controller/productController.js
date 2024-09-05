const productModel = require("../models/productModel");
const fs = require("fs");
const slugify = require("slugify");

const createProductController = async (req, res) => {
  try {
    const { name, slug, description, category, price, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    // validation

    switch (true) {
      case !name:
        return res
          .status(500)
          .send({ success: false, message: "Name field cannot be empty" });
      case !description:
        return res.status(500).send({
          success: false,
          message: "Desscription field cannot be empty",
        });
      case !price:
        return res
          .status(500)
          .send({ success: false, message: "Price field cannot be empty" });
      case !category:
        return res
          .status(500)
          .send({ success: false, message: "Category field cannot be empty" });
      case !quantity:
        return res
          .status(500)
          .send({ success: false, message: "Quantity field cannot be empty" });
      case !photo:
        return res
          .status(500)
          .send({ success: false, message: "Image field cannot be empty" });
      case photo && photo.size > 1000000:
        return res.status(500).send({
          success: false,
          message: "Photo is required and cannot be larger than 1 MB.",
        });
    }

    const product = new productModel({ ...req.fields, slug: slugify(name) });

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();
    return res.status(201).send({
      success: true,
      message: "Product created successfully.",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while creating product.",
      error,
    });
  }
};

const getAllProductsController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });

    if (products && products.length > 0) {
      return res.status(200).send({
        success: true,
        message: "Products fetched successfully.",
        total: products.length,
        products,
      });
    } else {
      return res.status(404).send({
        success: false,
        message: "No products exist in database.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while getting all products.",
    });
  }
};

const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");

    if (product) {
      return res.status(200).send({
        success: true,
        message: "Successfully fetched product.",
        product,
      });
    } else {
      return res.status(404).send({
        success: false,
        message: "Product doesn't exist in database.",
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "An error has occurred." });
  }
};

// WIP

const getRandomProductController = async (req, res) => {
  try {
    // Use the aggregation pipeline to sample a random product
    const product = await productModel.aggregate([
      { $sample: { size: 1 } },
      { $project: { photo: 0 } }, // Exclude the "photo" field
    ]);

    if (product && product.length > 0) {
      // Populate category manually
      const populatedProduct = await productModel.populate(product, {
        path: "category",
      });

      return res.status(200).send({
        success: true,
        message: "Successfully fetched random product.",
        product: populatedProduct[0], // Since product is an array, use the first element
      });
    } else {
      return res.status(404).send({
        success: false,
        message: "Product doesn't exist in database.",
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "An error has occurred." });
  }
};

const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id).select("photo");
    if (product?.photo?.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "An error has occurred during photo fetching.",
      error,
    });
  }
};

const deleteProductController = async (req, res) => {
  try {
    const product = await productModel
      .findByIdAndDelete(req.params.id)
      .select("-photo");

    if (product) {
      return res.status(200).send({
        success: true,
        message: "Product was successfully deleted from database.",
      });
    } else {
      return res.status(404).send({
        success: false,
        message: "Product was not found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error deleting product",
      error,
    });
  }
};

const updateProductController = async (req, res) => {
  try {
    if (!req.fields) {
      return res
        .status(400)
        .send({ success: false, message: "No fields provided" });
    }

    const { name, slug, description, category, price, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    // validation
    switch (true) {
      case !name:
        return res
          .status(400)
          .send({ success: false, message: "Name field cannot be empty" });
      case !description:
        return res.status(400).send({
          success: false,
          message: "Description field cannot be empty",
        });
      case !price:
        return res
          .status(400)
          .send({ success: false, message: "Price field cannot be empty" });
      case !category:
        return res
          .status(400)
          .send({ success: false, message: "Category field cannot be empty" });
      case !quantity:
        return res
          .status(400)
          .send({ success: false, message: "Quantity field cannot be empty" });
      case photo && photo.size > 1000000:
        return res.status(400).send({
          success: false,
          message: "Photo cannot be larger than 1 MB.",
        });
    }

    // Update other fields
    let updatedProduct = await productModel.findByIdAndUpdate(
      req.params.id,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .send({ success: false, message: "Product not found" });
    }

    // Update photo only if a new photo is provided
    if (photo) {
      updatedProduct.photo = {
        data: fs.readFileSync(photo.path),
        contentType: photo.type,
      };
    }
    await updatedProduct.save();

    return res.status(200).send({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error updating product",
      error,
    });
  }
};

const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;

    const result = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    return res.json(result);
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
    });
  }
};

module.exports = {
  createProductController,
  getAllProductsController,
  getSingleProductController,
  productPhotoController,
  deleteProductController,
  updateProductController,
  getRandomProductController,
  searchProductController,
};
