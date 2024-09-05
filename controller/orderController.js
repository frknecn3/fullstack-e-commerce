const orderModel = require("../models/orderModel.js");
const userModel = require("../models/userModel.js");

const orderCreateController = async (req, res) => {
  try {
    const { clientID, products } = req.body;

    const user = await userModel.findById(clientID);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user with the specified ID was not found.",
      });
    }

    const order = new orderModel({
      client: clientID,
      products,
      fulfilled: false,
    });

    await order.save();

    return res.status(201).send({
      success: true,
      message: "Order created successfully.",
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
    });
  }
};

const getAllOrdersController = async (req, res) => {
  try {
    const { userid } = req.params;

    const orders = await orderModel
      .find({ client: userid })
      .populate({ path: "products", select: "-photo" })
      .select("-client");

    if (orders.length > 0) {
      return res.status(200).send({
        success: true,
        message: "Fetched all orders of the specified user.",
        orders,
      });
    } else {
      return res.status(404).send({
        success: false,
        message: "Specified user has no listed orders.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("serverside error");
  }
};

const getSingleOrderController = async (req, res) => {
  try {
    const { orderid } = req.params;

    const order = await orderModel
      .findById(orderid)
      .populate({ path: "client", select: "-password -role" })
      .populate({ path: "products", select: "-photo" });

    if (order) {
      return res.status(200).send({
        success: true,
        message: "Order fetched successfully.",
        order,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Order with specified ID was not found.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while fetching order",
      error,
    });
  }
};

const orderFulfilledController = async (req, res) => {};

module.exports = {
  orderCreateController,
  getAllOrdersController,
  getSingleOrderController,
  orderFulfilledController,
};
