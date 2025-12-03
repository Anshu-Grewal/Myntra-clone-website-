// ================= PAGE LOAD =================




// ================= ON LOAD =================
document.addEventListener("DOMContentLoaded", function () {
  loadWishlist();
  loadCart();
  updateCartCount();
  wishlistButtonHandler();

  const hamburger = document.getElementById("mobileHamburger");
  const navMenu = document.querySelector("header nav");

  if (!hamburger || !navMenu) {
    console.log("Hamburger or Nav NOT found");
    return;
  }

  hamburger.addEventListener("click", function () {
    navMenu.classList.toggle("mobile-open");
    console.log("Menu toggled");
  });
});

// ================= MOBILE HAMBURGER MENU =================
function hamburgerMenuHandler() {
  const hamburger = document.querySelector(".mobile-hamburger"); //  FIX
  const navMenu = document.querySelector("header nav");

  if (!hamburger || !navMenu) return;

  hamburger.addEventListener("click", function () {
    navMenu.classList.toggle("mobile-open");
  });
}

// ================= SEARCH =================
function searchPage() {
  const mobileInput  = document.getElementById("searchInputMobile");
  const desktopInput = document.getElementById("searchInputDesktop");

  // Jo visible / filled hai uska value le lo
  let value = "";

  if (window.innerWidth < 992 && mobileInput) {
    value = mobileInput.value;
  } else if (desktopInput) {
    value = desktopInput.value;
  }

  // safety: agar upar se bhi empty aaye to dono check kar lo
  if (!value && mobileInput)  value = mobileInput.value;
  if (!value && desktopInput) value = desktopInput.value;

  const input = value.toLowerCase().trim();
  if (!input) {
    alert("Please type something to search");
    return;
  }

  if (input.includes("men"))         window.location.href = "men.html";
  else if (input.includes("women"))  window.location.href = "women.html";
  else if (input.includes("kids"))   window.location.href = "kids.html";
  else if (input.includes("home"))   window.location.href = "home&living.html";
  else if (input.includes("beauty")) window.location.href = "beauty.html";
  else if (input.includes("genz"))   window.location.href = "GENZ.html";
  else if (input.includes("profile")) window.location.href = "profile.html";
  else if (input.includes("cart") || input.includes("bag")) 
    window.location.href = "card.html";
  else if (input.includes("wish")) 
    window.location.href = "wishlist.html";
  else
    alert("No page found!");
}

// ================= WISHLIST =================
function wishlistButtonHandler() {
  const wishlistButtons = document.querySelectorAll(".wishlist-btn");

  wishlistButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const productCard = btn.closest(".product-card");
      const image = productCard.querySelector("img").src;
      const name = productCard.querySelector(".product-name").textContent;
      const price = productCard
        .querySelector(".product-price")
        .textContent.replace("₹", "")
        .replace("Rs.", "")
        .trim();

      let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      const exists = wishlist.some((item) => item.name === name);

      if (exists) {
        alert("Already in wishlist");
        return;
      }

      wishlist.push({ image, name, price });
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      alert("Added to wishlist!");
    });
  });
}

function loadWishlist() {
  const container = document.getElementById("wishlist-container");
  if (!container) return;

  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  if (wishlist.length === 0) {
    container.innerHTML = "<p>No items in wishlist.</p>";
    return;
  }

  container.innerHTML = wishlist
    .map(
      (item, index) => `
      <div class="wishlist-item">
        <img src="${item.image}">
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
        <button onclick="removeFromWishlist(${index})">Remove</button>
        <button onclick="addToCartFromWishlist(${index})">Add to Cart</button>
      </div>
    `
    )
    .join("");
}

function removeFromWishlist(index) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlist.splice(index, 1);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  loadWishlist();
}

function addToCartFromWishlist(index) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({ ...wishlist[index], quantity: 1 });
  localStorage.setItem("cart", JSON.stringify(cart));

  wishlist.splice(index, 1);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  updateCartCount();
  loadWishlist();
}

// ================= CART =================
function loadCart() {
  const container = document.getElementById("cart-container");
  if (!container) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    container.innerHTML = "<p>No items in cart.</p>";
    return;
  }

  container.innerHTML = cart
    .map(
      (item, index) => `
      <div class="cart-item">
        <img src="${item.image}">
        <div>
          <h3>${item.name}</h3>
          <p>₹${item.price}</p>

          <select onchange="updateQuantity(${index}, this.value)">
            ${[1, 2, 3, 4, 5]
              .map(
                (q) =>
                  `<option ${
                    item.quantity == q ? "selected" : ""
                  }>${q}</option>`
              )
              .join("")}
          </select>

          <button onclick="removeFromCart(${index})">Remove</button>
        </div>
      </div>
    `
    )
    .join("");
}

function updateQuantity(index, qty) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity = qty;
  localStorage.setItem("cart", JSON.stringify(cart));
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  updateCartCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const countSpan = document.getElementById("cart-count");
  if (countSpan) countSpan.innerText = cart.length;
}


function toggleMobileAccount() {
  const sidebar = document.querySelector(".desktop-sidebar");
  const toggle = document.querySelector(".mobile-account-toggle");

  sidebar.classList.toggle("mobile-show");
  toggle.classList.toggle("active");
}



