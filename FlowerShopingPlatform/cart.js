// Get cart data
let cart = JSON.parse(localStorage.getItem("cart")) || [];

let container = document.getElementById("cart-items");
let totalElement = document.getElementById("cart-total");

// Render cart items
function renderCart() {
  container.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty 😢</p>";
    totalElement.innerText = "Total: ₹0";
    return;
  }

  cart.forEach((item, index) => {
    total += item.price;

    container.innerHTML += `
      <div class="cart-item">
        <span>${item.name} - ₹${item.price}</span>
        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });

  totalElement.innerText = "Total: ₹" + total;
}

// Remove item
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Load cart on page open
renderCart();



// Supabase setup (add if not already present)
const supabaseUrl = "https://hlluvxjbfvrwbjqsqano.supabase.co";
const supabaseKey = "sb_publishable_Q-3IIbikdS47zx1knIxvfQ_-XC1dNXS";

const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

// Checkout form handling
const form = document.getElementById("checkout-form");

if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;

    let total = cart.reduce((sum, item) => sum + item.price, 0);

    // 🔥 Insert into Supabase
    const { data, error } = await supabaseClient
      .from("orders")
      .insert([
        { name, phone, address, total }
      ]);

    if (error) {
      console.error(error);
      alert("Error placing order ❌");
    } else {
      alert("Order placed successfully 🎉");

      // Clear cart
      localStorage.removeItem("cart");

      // Redirect
      window.location.href = "index.html";
    }
  });
}