const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const key =
  "sk_test_51Paprl2KyLB1jJT24LulFd6Yod3Ue2dg7vK1LfbIMQoBddqEhfsWiqVmHJGjY5lQ4Obc4pzvAJQJ01ePVx00BRME00uJN1vnBN";
const stripe = require("stripe")(key);
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to handle payment
app.post("/create-payment-session", async (req, res) => {
  try {
    const { orderMetas } = req.body;
    const lineItems = orderMetas.map((item) => {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      };
    });
    console.log("Create lineItems", lineItems);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/response",
      cancel_url: "http://localhost:3000/failer",
    });

    res.status(200).send({
      id: session.id,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
