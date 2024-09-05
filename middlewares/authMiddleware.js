const JWT = require("jsonwebtoken");
const userModel = require("../models/userModel");
const { ObjectId } = require("mongoose").Types;

const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;

    console.log("req user:", req.user);

    next();
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "invalid token",
    });
  }
};

// admin access / yönetici erişimi

const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);

    if (user) {
      if (user.role !== 1) {
        return res.status(401).send({
          success: false,
          message: "Unauthorized Access",
        });
      } else {
        next();
      }
    } else {
      return res.status(404).send({
        success: false,
        message: "No such user is registered in the database.",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const checkOwnership = (model) => async (req, res, next) => {
  try {
    const { _id } = req.user; // assuming userId is set in req by authentication middleware
    const orderId = req.params.orderid; // assuming order ID is in route params
    const userId = req.params.userid; // assuming user ID is in route params

    if (orderId) {
      // If orderId is provided, we check for order ownership
      if (!ObjectId.isValid(orderId)) {
        return res.status(400).json({ message: "Invalid order ID" });
      }

      const order = await model.findById(orderId);

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Check if the client has admin privileges or owns the order
      const client = await userModel.findById(order.client._id);
      if (client && client.role === 1) {
        return next(); // Admin can access
      }

      if (order.client._id.toString() !== _id) {
        return res
          .status(403)
          .json({ message: "Not authorized to access this order" });
      }
    } else if (userId) {
      // If no orderId, check if the user is accessing their own orders
      if (userId !== _id) {
        return res
          .status(403)
          .json({ message: "Not authorized to access these orders" });
      }
    } else {
      return res.status(400).json({ message: "Invalid request parameters" });
    }

    next(); // Proceed to the next middleware if all checks pass
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { requireSignIn, isAdmin, checkOwnership };
