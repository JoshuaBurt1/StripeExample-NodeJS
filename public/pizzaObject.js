//tags
const history = document.getElementById("history");
const toggleButton = document.getElementById("toggleButton");
//fields
const output = document.querySelector("#output");
const message = document.querySelector("#message");
const order = document.querySelector(".order");
const clear = document.querySelector(".clear");
const button = document.querySelector("#pay");

var pizzaCostArray = [];
var orderCount = 0;
var sum = 0;
var totalSales = 0;
var averageSale = 0;
var filledOrder = false;

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
        filledOrder = true;
        orderCount++;
      }
      price.textContent = "Total cost: $" + sum;
    }
  }
}

//function that creates an instance of CustomPizza using user selected values
//textContent is filtered to only letters via regex
function enterOrder() {
  let customerPizza = new CustomPizza(
    customers.textContent.replace(/[0-9$.]+/i, ""),
    size.textContent.replace(/[0-9$.]+/i, ""),
    toppingsC.textContent.replace(/[\d$,]+/g, ""),
    dips.textContent.replace(/[0-9$.]+/i, ""),
    sides.textContent.replace(/[0-9$.]+/i, "")
  );

  customerPizza.consoleVal();
  customerPizza.description();

  // ORDER HISTORY DATA - on each Order button click, add to table (database)
  pizzaCostArray = [
    orderCount,
    customers.textContent,
    items[0], // pizza size cost
    items[1], // topping cost
    items[2], // dip cost
    items[3], // side cost
    sum,
  ];

  if (filledOrder === true) {
    const tableBody = document.getElementById("orderTableBody");
    const row = tableBody.insertRow();

    const orderNumberCell = row.insertCell();
    orderNumberCell.textContent = pizzaCostArray[0];

    const date = row.insertCell();
    const currentDate = new Date();
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    date.textContent = currentDate.toLocaleDateString(undefined, options);

    const customerCell = row.insertCell();
    customerCell.textContent = pizzaCostArray[1];

    const pizzaSize = row.insertCell();
    pizzaSize.textContent = pizzaCostArray[2];

    const pizzaToppings = row.insertCell();
    pizzaToppings.textContent = pizzaCostArray[3];

    const pizzaDip = row.insertCell();
    pizzaDip.textContent = pizzaCostArray[4];

    const pizzaSide = row.insertCell();
    pizzaSide.textContent = pizzaCostArray[5];

    const pizzaSum = row.insertCell();
    pizzaSum.textContent = pizzaCostArray[6];

    const pizzaTotal = row.insertCell();
    totalSales += pizzaCostArray[6];
    pizzaTotal.textContent = totalSales;

    const pizzaAverage = row.insertCell();
    averageSale = totalSales / orderCount;
    pizzaAverage.textContent = averageSale;
    sum = 0;
    filledOrder = false;
  }
  // Call handlePayment and pass pizzaCostArray as an argument

  handlePayment(pizzaCostArray);
}

// Define handlePayment to accept an argument
// Define handlePayment to accept an argument
function handlePayment(pizzaCostArray) {
  console.log("Inside handlePayment - pizzaCostArray:", pizzaCostArray);

  if (!pizzaCostArray || pizzaCostArray.length < 7) {
    console.error("Error: Complete the form before placing your order.");
    return;
  }

  // Map the pizzaCostArray elements to the correct orderItems format
  const orderItems = [
    { id: 2, name: "Pizza Size", priceInCents: pizzaCostArray[2] * 100, quantity: 1 }, // pizza size cost
    { id: 3, name: "Topping", priceInCents: pizzaCostArray[3] * 100, quantity: 1 }, // topping cost
    { id: 4, name: "Dip", priceInCents: pizzaCostArray[4] * 100, quantity: 1 }, // dip cost
    { id: 5, name: "Side", priceInCents: pizzaCostArray[5] * 100, quantity: 1 }, // side cost
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

toggleButton.addEventListener("click", () => {
  if (history.style.display === "block") {
    history.style.display = "none";
  } else {
    history.style.display = "block";
  }
});

// event listeners for on click event of buttons and select
order.addEventListener("click", enterOrder);
clear.addEventListener("click", clearOrder);
button.addEventListener("click", handlePayment);
