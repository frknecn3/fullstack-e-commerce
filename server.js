const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const { connectDB } = require("./config/db");
const authRoutes = require("./routes/authRoutes.js");
const categoryRoutes = require("./routes/categoryRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");
const stripeRoutes = require("./routes/stripe.js");
const cors = require("cors");

dotenv.config({ path: "" });

// db config

connectDB();

const app = express();

// middlewares

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/stripe", stripeRoutes);

//

app.get("/", (req, res) => {
  res.send("<h1>Welcome to e-commerce App.</h1>");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(
    `Server running on ${process.env.DEV_MODE} mode ${PORT}`.bgCyan.white
  );
});
