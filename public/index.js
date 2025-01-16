//tags
const price = document.getElementById("price");
const items = [0, 0, 0, 0];
//fields
const pizzaForm = document.querySelector("#pizzaForm");
const sizeSelect = document.querySelector("#sizeSelect");
const dipSelect = document.querySelector("#dipSelect");
const sideSelect = document.querySelector("#sideSelect");

const toppingSelectC = document.getElementById("toppingSelectC");
const toppingArray = [];
const toppingListC = [
  "none : $0",
  "olive : $1",
  "pepper : $2",
  "pineapple : $2",
  "ham : $3",
  "pepperoni : $3",
  "bacon : $4",
  "extra cheese : $5",
];


//SIZE: function to populate size drop-down menu
function addSize() {
  var sizeList = [
    "none : $0",
    "small : $10",
    "medium : $12",
    "large : $15",
    "extra large : $20",
    "panzerotti : $14",
  ];
  if (sizeSelect.length <= sizeList.length) {
    for (let i = 0; i < sizeList.length; i++) {
      var option = document.createElement("option");
      option.textContent = sizeList[i];
      option.id = sizeList[i];
      sizeSelect.appendChild(option);
    }
  }
}

// Toppings: Create and append checkBox buttons
toppingListC.forEach((topping, index) => {
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.value = topping.toLowerCase();
  checkBox.id = index;

  const label = document.createElement("label");
  label.textContent = topping;

  toppingSelectC.appendChild(checkBox);
  toppingSelectC.appendChild(label);
  toppingSelectC.appendChild(document.createElement("br"));
});

// Get references to checkBox elements
const toppingCBs = Array.from({ length: toppingListC.length }, (_, index) =>
  document.getElementById(index.toString())
);

// Add or remove toppings from the array
function addToppingC() {
  toppingArray.length = 0; // Clear the array
  for (let i = 0; i < toppingCBs.length; i++) {
    if (toppingCBs[i].checked) {
      toppingArray.push(" " + toppingCBs[i].value);
    }
  }
  console.log("ToppingArray: " + toppingArray);
  // String manipulations
  const toppingString = toppingArray.toString().replace(/[:]+/g, "");
  // Topping sum calculation
  const numArray = toppingString.split(/[a-zA-Z$\s.]+/).filter(Boolean);
  const toppingSum = numArray.reduce((acc, num) => acc + parseInt(num), 0);
  items[1] = toppingSum;
}

//DIPLIST: function to populate dipList
function addDip() {
  var dipList = [
    "none : $0",
    "jalapeno : $0.50",
    "habanero : $0.50",
    "ghost pepper : $0.50",
    "ranch : $0.50",
    "three cheese : $0.50",
    "sweet & sour : $0.50",
    "plum : $0.50",
  ];
  if (dipSelect.length <= dipList.length) {
    for (let j = 0; j < dipList.length; j++) {
      var option = document.createElement("option");
      option.textContent = dipList[j];
      option.id = dipList[j];
      dipSelect.appendChild(option);
    }
  }
}

//SIDELIST: function to populate sideList
function addSide() {
  var sideList = [
    "none : $0",
    "chicken wings : $10",
    "chicken bites : $12",
    "garlic bread : $6",
    "cheese bread : $7",
    "mozarella sticks : $8",
    "apple pie : $4",
  ];
  if (sideSelect.length <= sideList.length) {
    for (let k = 0; k < sideList.length; k++) {
      var option = document.createElement("option");
      option.textContent = sideList[k];
      option.id = sideList[k];
      sideSelect.appendChild(option);
    }
  }
}

// Part 6: Create a class for the Pizza object, using the parameters from the order form you just created.
sizeSelect.addEventListener("click", addSize);
dipSelect.addEventListener("click", addDip);
sideSelect.addEventListener("click", addSide);

sizeSelect.addEventListener("change", function () {
  const selectedSize = sizeSelect.value.split(" : $");
  //console.log(size.textContent);
  items[0] = Number(selectedSize[1]);
});

toppingCBs.forEach((checkBox) => {
  checkBox.addEventListener("click", addToppingC);
});

dipSelect.addEventListener("change", function () {
  const selectedDip = dipSelect.value.split(" : $");
  items[2] = Number(selectedDip[1]);
});
sideSelect.addEventListener("change", function () {
  const selectedSide = sideSelect.value.split(" : $");
  items[3] = Number(selectedSide[1]);
});

//fields
const message = document.querySelector("#message");
const view = document.querySelector(".view");
const clear = document.querySelector(".clear");

var pizzaCostArray = [];

/* Pizza constructor*/
class Pizza {
  customer;
  size;
  toppingC;
  dip;
  side;

  constructor(customer, size, toppingC, dip, side) {
    this.customer = customer;
    this.size = size;
    this.toppingC = toppingC;
    this.dip = dip;
    this.side = side;
  }
  //messages to assist customer
  description() {
    let sum = 0;

    if (this.customer == "") {
      message.textContent = "Please enter your name";
    } else if (this.size == "") {
      message.textContent = "Please select a size";
    } else if (this.toppingC == "") {
      message.textContent = "Please select a topping";
    } else if (this.dip == "") {
      message.textContent = "Please select a dip";
    } else if (this.side == "") {
      message.textContent = "Please select a side";
    } else {
      message.textContent = "";
      for (let i = 0; i < items.length; i += 1) {
        sum += items[i];
      }
      if (sum == 0) {
        message.textContent = "You ordered nothing. Check your order and try again";
      } else {
        message.textContent = `${this.customer}'s order: a ${this.size} ${this.toppingC} pizza with ${this.dip} dip, & a ${this.side} side.`;
      }
      price.textContent = "Total cost: $" + sum;
    }
  }
}

var customerPizza;
//this Pizza object needs to be instantiated for description() messages to occur in <p id="message"></p>
function viewOrder() {
  let customerName = document.getElementById("customerSelect").value;
  let pizzaSize = document.getElementById("sizeSelect").value;
  // Retrieve selected toppings
  let selectedToppings = [];
  let toppingSelectC = document.getElementById("toppingSelectC");
  let toppingOptions = toppingSelectC.querySelectorAll('input[type="checkbox"]:checked');
  toppingOptions.forEach(option => {
    // Remove amounts from toppings
    let toppingLabel = option.nextElementSibling.textContent;
    let toppingName = toppingLabel.replace(/:\s*\$[\d.]+/, "");
    selectedToppings.push(toppingName);
  });
  let pizzaToppings = selectedToppings.join(", ");
  let pizzaDip = document.getElementById("dipSelect").value;
  let pizzaSide = document.getElementById("sideSelect").value;
  // Remove amounts from other values
  customerName = customerName.replace(/:\s*\$[\d.]+/, "");
  pizzaSize = pizzaSize.replace(/:\s*\$[\d.]+/, "");
  pizzaDip = pizzaDip.replace(/:\s*\$[\d.]+/, "");
  pizzaSide = pizzaSide.replace(/:\s*\$[\d.]+/, "");
  customerPizza = new Pizza(customerName, pizzaSize, pizzaToppings, pizzaDip, pizzaSide);
  customerPizza.description();
}

//function that creates an instance of Pizza using user selected values
function enterOrder() {
  pizzaCostArray = [
    items[0], // pizza size cost
    items[1], // topping cost
    items[2], // dip cost
    items[3], // side cost
  ];
  // Map the pizzaCostArray elements to the correct orderItems format
  const orderItems = [
    { id: 1, name: "Pizza Size", priceInCents: pizzaCostArray[0] * 100, quantity: 1 }, // pizza size cost
    { id: 2, name: "Topping", priceInCents: pizzaCostArray[1] * 100, quantity: 1 }, // topping cost
    { id: 3, name: "Dip", priceInCents: pizzaCostArray[2] * 100, quantity: 1 }, // dip cost
    { id: 4, name: "Side", priceInCents: pizzaCostArray[3] * 100, quantity: 1 }, // side cost
  ];

  // Continue with the rest of your code
  fetch("https://pizza-store-example.onrender.com/checkout", {
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
  toppingCBs.forEach((checkBox) => {
    checkBox.checked = false;
  });
  message.textContent = "";
  price.textContent = "";
}

// event listeners for on click event of buttons and select
view.addEventListener("click", viewOrder);
clear.addEventListener("click", clearOrder);
pizzaForm.addEventListener("submit", function (event) {
  // Prevent the default form submission behavior
  event.preventDefault();
  // Call enterOrder function to create the Pizza instance
  enterOrder();
});
