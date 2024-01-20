require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(express.static("public"));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

//const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const stripe = require("stripe")(STRIPE_SECRET_KEY);

app.post("/checkout", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map(item => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name, // Assuming your client-side sends the name
          },
          unit_amount: item.priceInCents,
        },
        quantity: item.quantity,
      })),
      success_url: `http://localhost:3000/success.html`,
      cancel_url: `http://localhost:3000/index.html`,
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});