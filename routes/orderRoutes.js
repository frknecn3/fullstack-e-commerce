const express = require("express");
const {
  orderCreateController,
  getSingleOrderController,
  getAllOrdersController,
} = require("../controller/orderController");
const {
  requireSignIn,
  checkOwnership,
} = require("../middlewares/authMiddleware");
const orderModel = require("../models/orderModel");

const router = express.Router();

//create an order

router.post("/create", requireSignIn, orderCreateController);

// get a specific order
router.get(
  "/:orderid",
  requireSignIn,
  checkOwnership(orderModel),
  getSingleOrderController
);

// get all orders of user
router.get(
  "/user/:userid",
  requireSignIn,
  checkOwnership(orderModel),
  getAllOrdersController
);

module.exports = router;
