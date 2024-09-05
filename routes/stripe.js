const express = require("express");
const stripe = require("../config/stripeConfig");
const router = express.Router();

// Route to create a payment intent
router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body; // Amount in cents

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
