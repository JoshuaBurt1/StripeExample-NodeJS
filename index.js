//server-side code
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

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Test 1" }],
  [2, { priceInCents: 2000, name: "Test 2" }],
  [3, { priceInCents: 300, name: "Test 3" }],
]);

app.post("/checkout", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({ //Stripe checkout function
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map(item => {
        const storeItem = storeItems.get(item.id)
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        }
      }),
      success_url: `http://localhost:3000/success.html`, // on Stripe page after successful form input requirements
      cancel_url: `http://localhost:3000/index.html`, // on Stripe page: back to index
    })
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message }); 
  }
})

app.listen(3000);
