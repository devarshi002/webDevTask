// Cart setup
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add to cart
function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();
  alert(name + " added to cart 🌸");
}

// Update cart UI
function updateCartCount() {
  let cartElement = document.getElementById("cart");
  if (cartElement) {
    cartElement.innerText = "Cart: " + cart.length;
  }
}

// Run on load
updateCartCount();

// Go to cart
function goToCart() {
  window.location.href = "cart.html";
}

// Contact form
let form = document.querySelector(".contact-form");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Message sent successfully! 📩");
  });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    let target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ✅ Supabase (ONLY ONCE)
const supabaseUrl = "https://hlluvxjbfvrwbjqsqano.supabase.co";
const supabaseKey = "sb_publishable_Q-3IIbikdS47zx1knIxvfQ_-XC1dNXS";

const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);