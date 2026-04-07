// src/pages/Checkout.jsx
import { useState } from "react";
import { useCart } from "../cart/CartContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase"; // update path if different

export default function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const finalTotal = totalPrice >= 999 ? totalPrice : totalPrice + 99;

  const handlePayment = () => {
    if (!form.name || !form.email || !form.phone || !form.address) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: finalTotal * 100, // paise
      currency: "INR",
      name: "Petal & Co.",
      description: "Fresh Flowers Order",
      image: "/logo.png",

      // Force all payment methods including UPI
      method: {
        upi: true,
        card: true,
        netbanking: true,
        wallet: true,
      },

      config: {
        display: {
          blocks: {
            upi: {
              name: "Pay via UPI",
              instruments: [{ method: "upi" }],
            },
          },
          sequence: ["block.upi"],
          preferences: { show_default_blocks: true },
        },
      },

      prefill: {
        name: form.name,
        email: form.email,
        contact: form.phone,
      },

      theme: { color: "#c4957a" },

      handler: async function (response) {
        const { error } = await supabase.from("orders").insert([
          {
            payment_id: response.razorpay_payment_id,
            customer_name: form.name,
            customer_email: form.email,
            customer_phone: form.phone,
            address: `${form.address}, ${form.city} - ${form.pincode}`,
            items: cartItems,
            total: finalTotal,
            status: "paid",
            created_at: new Date(),
          },
        ]);

        setLoading(false);

        if (error) {
          console.error("Supabase error:", error);
          alert("Payment done but order save failed. Contact support.");
          return;
        }

        clearCart();
        navigate("/order-success", {
          state: {
            paymentId: response.razorpay_payment_id,
            name: form.name,
            email: form.email,
            total: finalTotal,
          },
        });
      },

      modal: {
        ondismiss: () => {
          setLoading(false);
        },
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function (response) {
      setLoading(false);
      alert(`Payment failed: ${response.error.description}`);
    });

    rzp.open();
  };

  // Empty cart guard
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#fdf6f0] font-[Jost] flex flex-col
        items-center justify-center gap-4">
        <p className="font-[Cormorant_Garamond] text-3xl text-[#5c3d35]">
          Your basket is empty 🌸
        </p>
        <button
          onClick={() => navigate("/shop")}
          className="text-xs tracking-widest uppercase text-white bg-[#c4957a]
            hover:bg-[#b0806a] px-6 py-2.5 rounded-sm transition-colors"
        >
          Go to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdf6f0] font-[Jost]">
      <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-2 gap-12">

        {/* ── Left: Delivery Form ── */}
        <div>
          <h2 className="font-[Cormorant_Garamond] text-3xl text-[#5c3d35] mb-8">
            Delivery Details
          </h2>

          <div className="flex flex-col gap-4">
            {[
              { label: "Full Name *", name: "name", type: "text" },
              { label: "Email *", name: "email", type: "email" },
              { label: "Phone *", name: "phone", type: "tel" },
              { label: "Address *", name: "address", type: "text" },
              { label: "City", name: "city", type: "text" },
              { label: "Pincode", name: "pincode", type: "text" },
            ].map(({ label, name, type }) => (
              <div key={name} className="flex flex-col gap-1">
                <label className="text-[11px] tracking-[0.14em] uppercase text-[#8b5e52]">
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  className="border border-[#e8d5c4] bg-white px-4 py-2.5 rounded-sm
                    text-sm text-[#5c3d35] outline-none focus:border-[#c4957a] transition-colors"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Order Summary ── */}
        <div>
          <h2 className="font-[Cormorant_Garamond] text-3xl text-[#5c3d35] mb-8">
            Order Summary
          </h2>

          <div className="bg-white border border-[#e8d5c4] rounded-md p-5
            flex flex-col gap-3 mb-6">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-sm shrink-0"
                    style={{ background: item.bg }} />
                  <div>
                    <p className="text-[13px] text-[#5c3d35]">{item.name}</p>
                    <p className="text-[11px] text-[#b09088]">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="text-[13px] text-[#5c3d35]">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}

            {/* Delivery */}
            <div className="border-t border-[#e8d5c4] pt-3 flex justify-between">
              <span className="text-[13px] text-[#7a5c52]">Delivery</span>
              <span className="text-[13px] text-[#5c3d35]">
                {totalPrice >= 999 ? "Free 🎉" : "₹99"}
              </span>
            </div>

            {/* Total */}
            <div className="flex justify-between">
              <span className="font-medium text-[#5c3d35]">Total</span>
              <span className="font-[Cormorant_Garamond] text-xl text-[#5c3d35]">
                ₹{finalTotal}
              </span>
            </div>
          </div>

          {/* Free delivery nudge */}
          {totalPrice < 999 && (
            <p className="text-[11px] text-[#b09088] tracking-wide text-center mb-4">
              Add <span className="text-[#c4957a] font-medium">
                ₹{999 - totalPrice}
              </span> more for free delivery 🚚
            </p>
          )}

          {/* Pay Button */}
          <button
            onClick={handlePayment}
            disabled={loading}
            className={`w-full text-xs tracking-widest uppercase text-white
              py-4 rounded-sm transition-colors
              ${loading
                ? "bg-[#d4b5a8] cursor-not-allowed"
                : "bg-[#c4957a] hover:bg-[#b0806a]"}`}
          >
            {loading ? "Processing..." : `Pay ₹${finalTotal}`}
          </button>

          <p className="text-[11px] text-[#b09088] text-center mt-3 tracking-wide">
            🔒 Secured by Razorpay · UPI, Cards, Netbanking, Wallets accepted
          </p>

          {/* Test mode helper */}
          <div className="mt-6 p-4 bg-rose-50 border border-rose-200 rounded-sm">
            <p className="text-[11px] font-medium text-[#8b5e52] mb-2 tracking-wide uppercase">
              Test Mode Credentials
            </p>
            <p className="text-[11px] text-[#b09088]">Card: 4111 1111 1111 1111</p>
            <p className="text-[11px] text-[#b09088]">Expiry: Any future date · CVV: Any 3 digits</p>
            <p className="text-[11px] text-[#b09088]">OTP: 1234</p>
            <p className="text-[11px] text-[#b09088] mt-1">UPI: success@razorpay</p>
          </div>
        </div>
      </div>
    </div>
  );
}