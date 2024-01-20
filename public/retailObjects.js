//fields
const output = document.querySelector("#output");
const message = document.querySelector("#message");
const view = document.querySelector(".view");
const clear = document.querySelector(".clear");
const pay = document.querySelector(".pay");

var pizzaCostArray = [];
var sum = 0;
var totalSales = 0;
var averageSale = 0;

/* Pizza constructor*/
class Pizza {
  customer;
  size;
  toppingC;
  dip;
  constructor(customer, size, toppingC, dip) {
    this.customer = customer;
    this.size = size;
    this.toppingC = toppingC;
    this.dip = dip;
  }
  consoleVal() {
    // Output all object member values
    for (const [key, value] of Object.entries(this)) {
      console.log(`${key}: ${value}`);
    }
  }
}

/* Creates an instance of Pizza with user selected values  */
class CustomPizza extends Pizza {
  side;
  constructor(customer, size, toppingC, dip, side) {
    super(customer, size, toppingC, dip);
    this.side = side;
  }
  //helper messages to complete order
  description() {
    if (this.customer == "") {
      message.textContent = "Please enter your name";
      //console.log(message.textContent);
    } else if (this.size == "") {
      message.textContent = "Please select a size";
      //console.log(message.textContent);
      // } else if (this.topping == "") {
      //   message.textContent = "Please select a topping";
      //   console.log(message.textContent);
    } else if (this.toppingC == "") {
      message.textContent = "Please select a topping";
      //console.log(message.textContent);
    } else if (this.dip == "") {
      message.textContent = "Please select a dip";
      //console.log(message.textContent);
    } else if (this.side == "") {
      message.textContent = "Please select a side";
      //console.log(message.textContent);
    } else {
      message.textContent = "";

      for (let i = 0; i < items.length; i += 1) {
        sum += items[i];
      }
      if (sum == 0) {
        output.textContent =
          "You ordered nothing. Check your order and try again";
      } else {
        output.textContent = `${this.customer}'s order: a ${this.size} ${this.toppingC} pizza with ${this.dip} dip, & a ${this.side} side.`;
      }
      price.textContent = "Total cost: $" + sum;
    }
  }
}

function viewOrder(){
  let customerPizza = new CustomPizza(
    customers.textContent.replace(/[0-9$.]+/i, ""),
    size.textContent.replace(/[0-9$.]+/i, ""),
    toppingsC.textContent.replace(/[\d$,]+/g, ""),
    dips.textContent.replace(/[0-9$.]+/i, ""),
    sides.textContent.replace(/[0-9$.]+/i, "")
  );
  
  customerPizza.consoleVal();
  customerPizza.description();
}

//function that creates an instance of CustomPizza using user selected values
function enterOrder() {
  let customerPizza = new CustomPizza(
    customers.textContent.replace(/[0-9$.]+/i, ""),
    size.textContent.replace(/[0-9$.]+/i, ""),
    toppingsC.textContent.replace(/[\d$,]+/g, ""),
    dips.textContent.replace(/[0-9$.]+/i, ""),
    sides.textContent.replace(/[0-9$.]+/i, "")
  );
  // ORDER DATA
  pizzaCostArray = [
    customers.textContent,
    items[0], // pizza size cost
    items[1], // topping cost
    items[2], // dip cost
    items[3], // side cost
    sum,
  ];
  // Call handlePayment and pass pizzaCostArray as an argument
  handlePayment(pizzaCostArray);
}

// Define handlePayment to accept an argument
// Define handlePayment to accept an argument
function handlePayment(pizzaCostArray) {
  console.log("Inside handlePayment - pizzaCostArray:", pizzaCostArray);

  if (!pizzaCostArray || pizzaCostArray.length < 6) {
    console.error("Error: Complete the form before placing your order.");
    return;
  }

  // Map the pizzaCostArray elements to the correct orderItems format
  const orderItems = [
    { id: 1, name: "Pizza Size", priceInCents: pizzaCostArray[1] * 100, quantity: 1 }, // pizza size cost
    { id: 2, name: "Topping", priceInCents: pizzaCostArray[2] * 100, quantity: 1 }, // topping cost
    { id: 3, name: "Dip", priceInCents: pizzaCostArray[3] * 100, quantity: 1 }, // dip cost
    { id: 4, name: "Side", priceInCents: pizzaCostArray[4] * 100, quantity: 1 }, // side cost
  ];

  console.log("Formatted orderItems:", orderItems);

  // Log the request payload before sending it
  console.log("Request payload:", JSON.stringify({ items: orderItems }));

  // Continue with the rest of your code
  fetch("https://cult-of-pizza.onrender.com/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: orderItems,
    }),
  })
    .then(res => {
      if (res.ok) return res.json();
      return res.json().then(json => Promise.reject(json));
    })
    .then(({ url }) => {
      window.location = url;
    })
    .catch(e => {
      console.error(e.error);
    });
}

function clearOrder() {
  customers.textContent = "";
  size.textContent = "";
  toppingsC.textContent = "";
  ToppingCB0.checked = false;
  ToppingCB1.checked = false;
  ToppingCB2.checked = false;
  ToppingCB3.checked = false;
  ToppingCB4.checked = false;
  ToppingCB5.checked = false;
  ToppingCB6.checked = false;
  ToppingCB7.checked = false;
  dips.textContent = "";
  sides.textContent = "";
  output.textContent = "";
  price.textContent = "";
  console.log(size.textContent);
}

// event listeners for on click event of buttons and select
view.addEventListener("click", viewOrder);
clear.addEventListener("click", clearOrder);
pay.addEventListener("click", enterOrder);
