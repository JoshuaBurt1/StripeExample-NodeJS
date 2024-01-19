//tags
const customers = document.getElementById("customer");
const size = document.getElementById("size");
//const toppings = document.getElementById("toppings");
const toppingsC = document.getElementById("toppingsC");
const dips = document.getElementById("dips");
const sides = document.getElementById("sides");
const details = document.getElementById("details");
const price = document.getElementById("price");
const items = [0, 0, 0, 0];
//fields
const customerSelect = document.querySelector("#customerSelect");
const sizeSelect = document.querySelector("#sizeSelect");
const sizeSelectP = document.querySelector("#sizeSelectP");
const toppingSelect = document.querySelector("#toppingSelect");
const dipSelect = document.querySelector("#dipSelect");
const sideSelect = document.querySelector("#sideSelect");


//Client-side JS Functions
function customerF() {
  console.log(customers.value);
}

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

//TOPPINGLIST: function to populate toppingListC checkBoxes
const toppingSelectC = document.getElementById("toppingSelectC");
const toppingArray = [];
var label = document.getElementById("label");

var toppingListC = [
  "none : $0",
  "olive : $1",
  "pepper : $2",
  "pineapple : $2",
  "ham : $3",
  "pepperoni : $3",
  "bacon : $4",
  "extra cheese : $5",
];
// Create a new checkBox button element
if (toppingListC.length <= toppingListC.length) {
  for (let i = 0; i < toppingListC.length; i++) {
    var checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.value = toppingListC[i].toLowerCase(); // Use the lowercase of the fruit name as the value
    checkBox.id = i;
    // Create a label for the checkBox button
    label = document.createElement("label");
    label.textContent = toppingListC[i];
    // Add the checkBox button and label to the container
    toppingSelectC.appendChild(checkBox);
    toppingSelectC.appendChild(label);
    toppingSelectC.appendChild(document.createElement("br")); // Line break
  }
}
//these are createElement checkBoxes, constants must be defined here after they are created via previous code
const ToppingCB0 = document.getElementById("0");
const ToppingCB1 = document.getElementById("1");
const ToppingCB2 = document.getElementById("2");
const ToppingCB3 = document.getElementById("3");
const ToppingCB4 = document.getElementById("4");
const ToppingCB5 = document.getElementById("5");
const ToppingCB6 = document.getElementById("6");
const ToppingCB7 = document.getElementById("7");
//adding to and from topping array
function addToppingC() {
  //remove from array if box not checked
  for (let i = 0; i < toppingListC.length; i++) {
    //if unchecked boxes exist
    if (!document.getElementById(i).checked) {
      toppingArray.splice(document.getElementById(i), toppingArray.length); //removes unchecked elements (id's) from toppingArray
    } // if all are checked
    else {
      toppingArray.splice(document.getElementById(i), toppingListC.length); //prevents double adding, as previous if statement will be skipped without else
    }
  }
  //add to array if box checked
  for (let j = 0; j < toppingListC.length; j++) {
    if (document.getElementById(j).checked) {
      toppingArray.push(" " + document.getElementById(j).value); //adds all checked boxes to constant array (at end)
    }
  }
  console.log(toppingArray.length);
  console.log("ToppingArray: " + toppingArray);
  //String & number manipulations
  var toppingString = toppingArray.toString();
  //Topping web page string
  var toppingWebP = [];
  for (let k = 0; k < toppingString.length; k++) {
    toppingWebP += toppingString[k].replace(/[:]+/i, "");
  }
  //console.log(toppingWebP);
  toppingsC.textContent = toppingWebP;
  //Topping sum calculation
  var toppingNumArray = []; //numbers
  var toppingSum = 0;
  for (let m = 0; m < toppingString.length; m++) {
    toppingNumArray += toppingString[m].replace(/[a-zA-Z$\s/g.:]+/i, "");
  }
  var numArray = toppingNumArray.split(",");
  for (let m2 = 0; m2 < numArray.length; m2++) {
    toppingSum += parseInt(numArray[m2]);
  }
  //console.log(toppingSum);
  items[1] = toppingSum;
  //console.log(items);
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
// event listeners for on click event of buttons and select
sizeSelect.addEventListener("click", addSize);
//toppingSelect.addEventListener("click", addTopping);
dipSelect.addEventListener("click", addDip);
sideSelect.addEventListener("click", addSide);
//displayOrders.addEventListener("click", displayHistory//);

customerSelect.addEventListener("change", function () {
  const selectedCustomer = customerSelect.value;
  //console.log(selectedCustomer);
  customers.textContent = selectedCustomer;
});
sizeSelect.addEventListener("change", function () {
  const selectedSize = sizeSelect.value.split(" : $");
  size.textContent = selectedSize[0] + " $" + selectedSize[1];
  //console.log(size.textContent);
  items[0] = Number(selectedSize[1]);
});

//USE IF DEVELOPER WANTS TOPPING DROP DOWN MENU
// toppingSelect.addEventListener("change", function () {
//   const selectedTopping = toppingSelect.value.split(" : $");
//   toppings.textContent = selectedTopping[0] + " $" + selectedTopping[1];
//   console.log(toppings.textContent);
//   items[1] = Number(selectedTopping[1]);
//   console.log(items);
// });

//topping checkBox event listeners
ToppingCB0.addEventListener("click", addToppingC);
ToppingCB1.addEventListener("click", addToppingC);
ToppingCB2.addEventListener("click", addToppingC);
ToppingCB3.addEventListener("click", addToppingC);
ToppingCB4.addEventListener("click", addToppingC);
ToppingCB5.addEventListener("click", addToppingC);
ToppingCB6.addEventListener("click", addToppingC);
ToppingCB7.addEventListener("click", addToppingC);

dipSelect.addEventListener("change", function () {
  const selectedDip = dipSelect.value.split(" : $");
  dips.textContent = selectedDip[0] + " $" + selectedDip[1];
  //console.log(dips.textContent);
  items[2] = Number(selectedDip[1]);
});
sideSelect.addEventListener("change", function () {
  const selectedSide = sideSelect.value.split(" : $");
  sides.textContent = selectedSide[0] + " $" + selectedSide[1];
  //console.log(sides.textContent);
  items[3] = Number(selectedSide[1]);
});
