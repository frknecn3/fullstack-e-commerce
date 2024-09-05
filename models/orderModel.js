const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.ObjectId,
      ref: "users",
      required: true,
    },
    products: [
      {
        type: mongoose.ObjectId,
        ref: "Products",
        required: true,
      },
    ],
    fulfilled: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Orders", orderSchema);
