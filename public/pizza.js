//tags
const history = document.getElementById("history");
const toggleButton = document.getElementById("toggleButton");
//fields
const output = document.querySelector("#output");
const message = document.querySelector("#message");
const order = document.querySelector(".order");
const clear = document.querySelector(".clear");
var dataArray = [];
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
    // toppings.textContent.replace(/[0-9$.]+/i, ""),
    toppingsC.textContent.replace(/[\d$,]+/g, ""),
    dips.textContent.replace(/[0-9$.]+/i, ""),
    sides.textContent.replace(/[0-9$.]+/i, "")
  );
  //uses constant variable from index.js
  customerPizza.consoleVal(); //prints to console
  customerPizza.description(); //prints to webpage

  //ORDER HISTORY DATA - on each Order button click, add to table (database)
  dataArray = [
    orderCount,
    customers.textContent,
    items[0],
    items[1],
    items[2],
    items[3],
    sum,
  ];
  //console.log(items.textContent);
  //console.log(dataArray.textContent);
  if (filledOrder === true) {
    const tableBody = document.getElementById("orderTableBody");
    const row = tableBody.insertRow();

    const orderNumberCell = row.insertCell();
    orderNumberCell.textContent = dataArray[0];

    const date = row.insertCell();
    const currentDate = new Date();
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    date.textContent = currentDate.toLocaleDateString(undefined, options);

    const customerCell = row.insertCell();
    customerCell.textContent = dataArray[1];

    const pizzaSize = row.insertCell();
    pizzaSize.textContent = dataArray[2];

    const pizzaToppings = row.insertCell();
    pizzaToppings.textContent = dataArray[3];

    const pizzaDip = row.insertCell();
    pizzaDip.textContent = dataArray[4];

    const pizzaSide = row.insertCell();
    pizzaSide.textContent = dataArray[5];

    const pizzaSum = row.insertCell();
    pizzaSum.textContent = dataArray[6];

    const pizzaTotal = row.insertCell();
    totalSales += dataArray[6];
    pizzaTotal.textContent = totalSales;

    const pizzaAverage = row.insertCell();
    averageSale = totalSales / orderCount;
    pizzaAverage.textContent = averageSale;
    sum = 0;
    filledOrder = false;

    //calculate regression equation (multiple linear regression for each variable: size, topping, dip, side)
    const pizzaSaleFormula = row.insertCell();
    pizzaSaleFormula.textContent = 0;

    //projected sales for day based on regression equation & historical data
    const projectedSales = row.insertCell();
    projectedSales.textContent = 0;

    //Daily Sale Rate of change --> value & sign (+ or -)
    const pizzaRate = row.insertCell();
    pizzaRate.textContent = 0;

    //variance

    //Other variables:
    //Price Variance inflation factor (VIF): https://www.investopedia.com/terms/v/variance-inflation-factor.asp
    //Topping popularity
    //Orders per day, Hourly rate of production

    //javascript --> node.js --> MySQL (to save data) https://hevodata.com/learn/javascript-mysql/
  }
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
