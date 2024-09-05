const express = require("express");
const { isAdmin, requireSignIn } = require("../middlewares/authMiddleware");
const {
  createCategoryController,
  updateCategoryController,
  getAllCategoryController,
  getSingleCategoryController,
  deleteCategoryController,
} = require("../controller/categoryController");

const router = express.Router();

router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

// update category

router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//get all categories

router.get("/", getAllCategoryController);

// get single category
router.get("/:slug", getSingleCategoryController);

// delete category
router.get("/delete/:id", requireSignIn, isAdmin, deleteCategoryController);

module.exports = router;
