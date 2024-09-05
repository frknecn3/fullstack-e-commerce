import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe,
  Elements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { getCart } from "../utils/helpers";

type Props = {};

const stripePromise = loadStripe(
  "pk_test_51NZggZFaYJZ7BzM06QPnwdE8QbQA39Dur49zjfWpIRQb3ajZNXqT0sRCaWYEn4LsX2apExFKNj9B1AXFZavuSF5y0059hjIdy7"
);

const PaymentForm = ({ total }: { total: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const cart = getCart();

  useEffect(() => {}, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardNumber = elements.getElement(CardNumberElement);
    const cardExpiry = elements.getElement(CardExpiryElement);
    const cardCvc = elements.getElement(CardCvcElement);

    if (!cardNumber || !cardExpiry || !cardCvc) {
      console.error("Card elements not found");
      return;
    }

    var order;

    try {
      // Create an order
      let orderRes = await axios.post("/api/v1/order/create", {
        clientID: auth?.user?._id,
        products: cart.map((item) => item._id),
      });

      order = { ...orderRes.data.order };

      // Check if the response contains the order ID
      console.log("Order response:", orderRes.data.order);

      // Proceed with payment
      const { data } = await axios.post("/api/stripe/create-payment-intent", {
        amount: total,
      });

      const { clientSecret } = data;

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardNumber,
            billing_details: {},
          },
        }
      );

      if (error) {
        console.error(error);
        alert("Payment failed");
      } else if (paymentIntent.status === "succeeded") {
        alert("Payment successful");

        // Check order._id before navigating

        navigate(`/thankyou/${order._id}`);
      }
    } catch (error) {
      console.error(error);
      alert("Payment failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full gap-4 text-center"
    >
      <CardNumberElement id="card-number" className="border p-1 rounded-md" />
      <CardExpiryElement id="card-expiry" className="border p-1 rounded-md" />
      <CardCvcElement id="card-cvc" className="border p-1 rounded-md" />
      <label htmlFor="billing-address">Address Info:</label>
      <textarea name="address" id="billing-address"></textarea>
      <div className="">
        <button
          type="submit"
          className="bg-black text-white rounded-md p-2"
          disabled={!stripe}
        >
          PURCHASE
        </button>
      </div>
    </form>
  );
};

const Payment = ({ total }: { total: number }) => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  return auth?.user ? (
    <Elements stripe={stripePromise}>
      <PaymentForm total={total} />
    </Elements>
  ) : (
    <div>
      <button onClick={() => navigate("/login")}>LOG IN</button>
    </div>
  );
};

export default Payment;
