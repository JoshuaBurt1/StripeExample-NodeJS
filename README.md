# eCommerce Example 1a (Express)
basic store - multi-option product - payment via Stripe <br>
https://pizza-store-example.onrender.com/index.html

# To Start: <br>
* Download zip, open in code editor
* Download node.js
* In terminal: npm init -y
* Download dependencies: npm i cors dotenv express nodemon stripe
* add .env file at root <br>
STRIPE_SECRET_KEY="YOUR_SECRET_KEY" <br>
* In terminal: node index.js

# Deployment to hosting site: <br>
- when deploying to render, all instances of "http://localhost:3000" --> https://pizza-store-example.onrender.com
- when deploying on a local instance, all instances of "https://pizza-store-example.onrender.com" --> "http://localhost:3000"
- enter STRIPE_SECRET_KEY in deployment step --> no quotes around secret key

# Capabilities <br>
~Stripe Payments <br>

# To be Added: <br>
* more content
* more modular codebase
