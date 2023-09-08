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

  //Product Cart
  
  let cartBtns=document.appendChild('.add-cart');
  cartBtns.forEach((btn)=>{
    btn.addEventListener('click',addCart);
  });

  updateTotal();
}



// JavaScript

const cart = [];
let total = 0;

function addToCart(product) {
  cart.push(product);
  

  total += product.price ;
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartItemsElement = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");
  
  cartItemsElement.innerHTML = "";
  cartTotalElement.textContent = total.toFixed(2);

  cart.forEach(item => {
    const li = document.createElement("div");
   
    li.innerHTML =  `
  
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
        <div class="main1" style="width:250px; heigth:250px;">
        <img src=${product.image} style="width:200px; heigth:80px;">
          <p style="width:250px">${product.title}</p>
          <p>Price: $${product.price.toFixed(2)}</p>
          <button class="add-to-cart">  <ion-icon name="cart" ></ion-icon> </button>
          <span class="wish-list"><img src="image/Wish List.png"></span>
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



