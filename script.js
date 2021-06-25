const cart = document.querySelector("#cart-number");
const itemNames = document.querySelectorAll(".item");
const cartBtn = document.querySelectorAll(".addCart");
const prices = document.querySelectorAll(".overlay");
const itemInfo = document.querySelector("#item-info");
const checkoutBtn = document.querySelector(".checkout")
const pricesArray = Array.from(prices);
const cartBtnArray = Array.from(cartBtn);
const itemNamesArray = Array.from(itemNames);

let numberInCart = 0;
let inCart = [];

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function removeItem(sn, name, price, ) {
  let product = document.getElementById(`${name} button`)
  product.innerHTML = "ADD TO CART";
  product.style.backgroundColor = "#ff7a00";
  product.style.color = "#ffffff";
  numberInCart--;
  let qnty = document.getElementById(name).innerHTML
  if (qnty > 1) {
    updateCartPrice((qnty * price * (-1)))
  } else {
    updateCartPrice(price * (-1))
  }
  inCart = inCart.filter(product => product.name !== name);
  cart.innerHTML = numberInCart;
  document.getElementById(sn).remove()
}


function updateCartPrice(price) {
  let oldPrice = document.getElementById("total-amount").innerHTML;
  priceWithoutDollarSign = oldPrice.slice(1);
  document.getElementById("total-amount").innerHTML = ("$" + (Number(priceWithoutDollarSign) + Number(price)))
}

function incrementQuantity(name, price) {
  let qnty = document.getElementById(name).innerHTML;
  document.getElementById(name).innerHTML = ++qnty;
  updateCartPrice(price)

}
function decrementQuantity(name, price) {
  let qnty = document.getElementById(name).innerHTML;
  if (qnty > 1) {
    document.getElementById(name).innerHTML = --qnty;
    updateCartPrice(price * (-1))
  }
  else alert("cannot reduce quantity")
}

cartBtnArray.forEach((product, index) => {
  product.addEventListener("click", () => {
    if (product.style.color === "black") {
      product.innerHTML = "ADD TO CART";
      product.style.backgroundColor = "#ff7a00";
      product.style.color = "#ffffff";
      numberInCart--;
      inCart = inCart.filter(products => products.name !== itemNamesArray[index].textContent)
    } else {
      const obj = {
        sn: inCart.length + 1,
        name: itemNamesArray[index].textContent,
        price: pricesArray[index].textContent.split("$")[1],
        quantity: `<button style='background-color:orange; border:none;' onclick='incrementQuantity("${itemNamesArray[index].textContent}"
                      ,${pricesArray[index].textContent.split("$")[1]})'>+</button>
              <span id="${itemNamesArray[index].textContent}" id='quantity' style='font-size:16px;'>1</span>
            <button style='background-color:orange; border:none;' onclick='decrementQuantity("${itemNamesArray[index].textContent}",
              ${pricesArray[index].textContent.split("$")[1]})'>-</button>`,
      };
      inCart.push(obj);
      product.innerHTML = "REMOVE FROM CART";
      product.style.backgroundColor = "orange";
      product.style.color = "black";
      numberInCart++;
    }
    cart.innerHTML = numberInCart;
    itemInfo.innerHTML = "";
    inCart.forEach((info) => {
      const ul = document.createElement("ol");
      ul.id = info.sn;
      Object.keys(info).forEach((productKey, ind) => {
        const li = document.createElement("li");
        li.innerHTML = Object.values(info)[ind];
        ul.appendChild(li);
        itemInfo.appendChild(ul);
      });
      const button = document.createElement("button");
      button.style.backgroundColor = "orange";
      button.style.border = "none";
      button.style.padding = "10px";
      button.style.fontSize = "14px";
      button.style.borderRadius = "5px";
      button.style.margin = "10px";
      button.style.color = "#ffffff";
      button.onclick = () => removeItem(info.sn, info.name, info.price)
      button.innerHTML = "Remove";
      ul.appendChild(button)
    });

  });
});


function validateName() {
  if (nameInput.value === String) {
    console.log("Valid name input");
    return;
  }
}

function validateEmail() {
  if (emailInput.value.includes("@")) {
    console.log("valid email input");
    return;
  }
}

function validateTel() {
  if (telInput.value <= 11) {
    console.log("valid telephone number");
    return;
  }
}


//validates user inputs upon check out.
function checkout() {
  validateName()
  validateEmail()
  validateTel()  //numbers must not be above eleven numbers

  console.log(7654567);

  var nameInput = document.getElementById("user_name");
  var emailInput = document.getElementByid("user_email");
  var telInput = document.getElementById("user_tel");

  user_name = nameInput.value;
  user_email = emailInput.value;
  user_tel = telInput.value;
  user_cart = numberInCart;
  user_totalAmount = total-amount;

  if (numberInCart === 0) {
    alert("Please select a product");
    return;
  }
  payWithPaystack()
}

function showSummary() {
  let summary = document.getElementById("summary-box");
  summary.innerHTML = `<div>
                          <table>
                            <th>
                              Thank you ${user_name}, you order has been received
                              <div><img src="check.gif"></div>
                              <p>Success</p>
                            </th>
                            <tr>S/N</tr>
                            <td>${sn}</td>
                            <tr>Item</tr>
                            <td>${itemNamesArray[index].textContent}</td>
                            <tr>Quantity</tr>
                            <td>${quantity}</td>
                          </table>
                          <button type="button">Ok</button>
                      </div>`; 
}

function payWithPaystack(e) {
  e.preventDefault();
  let handler = PaystackPop.setup({
    key: 'pk_test_5a8c047a4f07bbc2e762ddd8a4486fee27a1e91d',
    email: document.getElementById("user_email").value,
    amount: document.getElementById("total-amount").innerHTML.slice(1) * 100,
    ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference.
    onClose: function(){
      alert('Window closed.');
    },
    callback: function(response){
      showSummary();
    }
  });
  handler.openIframe();
}

checkoutBtn.addEventListener("click", payWithPaystack, false);