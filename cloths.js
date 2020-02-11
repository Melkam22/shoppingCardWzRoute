/* to delete items inside basket */
let deleteItem = document.getElementsByClassName("btn-remove");
for (let a = 0; a < deleteItem.length; a++) {
  let deletedBasket = deleteItem[a];
  deletedBasket.addEventListener("click", function(event) {
    let eraser = event.target;
    eraser.parentElement.parentElement.remove();
    updateTotalPrice();
  });
}
/*function to find total price of items inside basket */
function updateTotalPrice() {
  let basketFrame = document.getElementsByClassName("basket-products")[0];
  let insideBasketFrame = basketFrame.getElementsByClassName(
    "basket-products-list"
  );
  let totalPrice = 0;
  for (let b = 0; b < insideBasketFrame.length; b++) {
    let newPrice = insideBasketFrame[b];
    let PriceF = newPrice.getElementsByClassName("basket-products-price")[0];
    let quantityF = newPrice.getElementsByClassName(
      "basket-products-quantity"
    )[0];
    let netPrice = parseFloat(PriceF.innerText.replace("$", ""));
    let givenQuantity = quantityF.value;
    totalPrice = totalPrice + netPrice * givenQuantity;
  }
  total = Math.round(totalPrice * 100) / 100; //trim after 2 decimal
  document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}
/* update total when quantity changes */
let quantChanges = document.getElementsByClassName("basket-products-quantity");
for (let c = 0; c < quantChanges.length; c++) {
  let updateQuantity = quantChanges[0];
  updateQuantity.addEventListener("change", quantFunction);
}
function quantFunction(event) {
  let newQuantity = event.target;
  if (isNaN(newQuantity.value) || newQuantity.value <= 0) {
    newQuantity.value = 1;
  }
  updateTotalPrice();
}
/* add to basket function, push it to console not to page */
let addToBasket = document.getElementsByClassName("add-btn");
for (let d = 0; d < addToBasket.length; d++) {
  let buyIt = addToBasket[d];
  buyIt.addEventListener("click", addItToBasket);
}
function addItToBasket(event) {
  let buyIt = event.target;
  let electron = buyIt.parentElement.parentElement;
  let pushedTitle = electron.getElementsByClassName("prod-title")[0].innerText;
  let pushedPrice = electron.getElementsByClassName("price")[0].innerText;
  let pushedImage = electron.getElementsByClassName("img1")[0].src;
  console.log(pushedTitle, pushedPrice, pushedImage);
  pushItemToBasket(pushedTitle, pushedPrice, pushedImage);
  updateTotalPrice();
}
/* print it not to console but to DOM */
function pushItemToBasket(pushedTitle, pushedPrice, pushedImage) {
  let createDiv = document.createElement("div");
  let divFrame = document.getElementsByClassName("basket-products")[0];
  let alreadyBasketed = document.getElementsByClassName(
    "basket-products-title"
  );
  for (let e = 0; e < alreadyBasketed.length; e++) {
    if (alreadyBasketed[e].innerText == pushedTitle) {
      alert("this Item is already in basket!");
      return;
    }
  }
  let divFrameContents = `
            <div class="basket-products-list">
            <img src=${pushedImage} alt="shirt2" width="50" height="50" />
            <span class="basket-products-title">${pushedTitle}</span>
            <span class="basket-products-price">${pushedPrice}</span>
            <div class="basket-products-delete-frame">
              <input class="basket-products-quantity" type="number" value="1" />
              <button class="btn-remove" type="button">REMOVE</button>
            </div>
          </div> 
  `;
  createDiv.innerHTML = divFrameContents;
  divFrame.append(createDiv);
  /* to delete each pushed item */
  createDiv
    .getElementsByClassName("btn-remove")[0]
    .addEventListener("click", function(event) {
      let erasePushed = event.target;
      erasePushed.parentElement.parentElement.remove();
      updateTotalPrice;
    });
  /* quantity to price auto-update */
  createDiv
    .getElementsByClassName("basket-products-quantity")[0]
    .addEventListener("change", quantFunction);
}
/* purchase button */
let purchaseIt = document.getElementsByClassName("purchase-btn")[0];
purchaseIt.addEventListener("click", updatePrice);
function updatePrice() {
  alert("purchase cloths clicked");
  let updateTotalFunc = document.getElementsByClassName("basket-products")[0];
  while (updateTotalFunc.hasChildNodes()) {
    updateTotalFunc.removeChild(updateTotalFunc.firstChild);
  }
  updateTotalPrice();
}
/* one function for all contacts is not working so I do it individually */
/* contact address 1 */
let contactBtn1 = document.getElementsByClassName("pText");
for (let j = 0; j < contactBtn1.length; j++) {
  let myContactBtn1 = contactBtn1[j];
  myContactBtn1.addEventListener("click", contactFunc1);
}
let contShow = true;
function contactFunc1(event) {
  myContactBtn1 = event.target;
  contShow = !contShow;
  if (!contShow) {
    myContactBtn1.style.color = "black";
    //myContactBtn1.style.display = "block";
  } else if (contShow) {
    //myContactBtn1.style.display = "none";
    myContactBtn1.style.color = "white";
  }
}
