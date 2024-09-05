const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const {
  createProductController,
  getAllProductsController,
  getSingleProductController,
  productPhotoController,
  deleteProductController,
  updateProductController,
  getRandomProductController,
  searchProductController,
} = require("../controller/productController");
const formidable = require("express-formidable");

const router = express.Router();

// create product

router.post(
  "/create",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// get all products

router.get("/", getAllProductsController);

// get single product
router.get("/:slug", getSingleProductController);

// get random product
router.get("/random", getRandomProductController);

// get photo

router.get("/photo/:id", productPhotoController);

// delete product
router.get("/delete/:id", requireSignIn, isAdmin, deleteProductController);

//update product
router.put("/update/:id", formidable(), updateProductController);

// search product

router.post("/search/:keyword", searchProductController);

module.exports = router;
