const btnCart=document.querySelector('#cart-icon');
const cart1=document.querySelector('.cart');
const btnClose=document.querySelector('#cart-close');

btnCart.addEventListener('click',()=>{
  cart1.classList.add('cart-active');
});

btnClose.addEventListener('click',()=>{
  cart1.classList.remove('cart-active');
});

document.addEventListener('DOMContentLoaded',loadFood);

function loadFood(){
  loadContent();

}

function loadContent(){
  //Remove Food Items  From Cart
  let btnRemove=document.querySelectorAll('.cart-remove');
  btnRemove.forEach((btn)=>{
    btn.addEventListener('click',removeItem);
  });

  //Product Item Change Event
  let qtyElements=document.querySelectorAll('.cart-quantity');
  qtyElements.forEach((input)=>{
    input.addEventListener('change',changeQty);
  });

 
  
 

 
}




// JavaScript

const cart = [];
let total = 0;
let itemCount = 0;

function addToCart(product) {
  itemCount++;
  cart.push(product);
  total += product.price ;
  
  document.getElementById("item-count").textContent  = itemCount;
  
  updateCartDisplay();
  
}


function removeFromCart(productId) {
  const index = cart.findIndex(item => item.id === productId);

  if (index !== -1) {
    const removedItem = cart[index];
    const removedCost = removedItem.price * removedItem.quantity;
    
    // Subtract the removed item's cost from the cart total
    total -= removedCost;
    
    cart.splice(index, 1); // Remove the item from the cart
  }
  
}
function updateItemQuantity(productId, quantity) {
  const index = cart.findIndex(item => item.id === productId);

  if (index !== -1) {
    const item = cart[index];
    const oldQuantity = item.quantity;
    
    // Update the item's quantity
    item.quantity = quantity;
    
    // Update the cart total by the price difference
    cartTotal += (item.price * quantity) - (item.price * oldQuantity);
  }
}




function updateCartDisplay() {
 
  const cartItemsElement = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");

  cartItemsElement.innerHTML = "";
  cartTotalElement.textContent = total.toFixed(2);

  cart.forEach(item => {
    const li = document.createElement("div");
   
    li.innerHTML +=  `
  
        <img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px;">
      <div class="item-details">
        <p style="width:200px">${item.title}</p>
        <p>Price: $${item.price}</p>
     
     <input type="number" value="1" class="cart-quantity">
        
    <ion-icon name="trash" class="cart-remove"></ion-icon>
    `;
    
    cartItemsElement.appendChild(li);
   
  });
}





document.addEventListener("DOMContentLoaded", () => {
  const productListElement = document.getElementById("product-list");

  // Fetch products from the API
  fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
      // Loop through the product data and generate HTML for each product
      data.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.innerHTML = `
        <div class="main1">
        <img src=${product.image} style="width:150px; heigth:80px;">
          <p style="width:230px">${product.title}</p>
          <p>Price: $${product.price.toFixed(2)}</p>
          <button class="add-to-cart">  <ion-icon name="cart" ></ion-icon> </button>
          <span class="wish-list"><img src="image/Wish List.png" class="main2"></span>
          </div>
        `;

        // Attach an event listener to the "Add to Cart" button for each product
        const addToCartButton = productDiv.querySelector(".add-to-cart");
        addToCartButton.addEventListener("click", () => {
          addToCart(product);
        });

        productListElement.appendChild(productDiv);
      });
    })
    .catch(error => {
      console.error('Error fetching products:', error);
    });
});








