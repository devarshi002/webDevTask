// src/cart/CartDrawer.jsx
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
export default function CartDrawer({ isOpen, onClose }) {
  const {
    cartItems,
    increaseQty,
    decreaseQty,
    removeFromCart,
    totalItems,
    totalPrice,
  } = useCart();
  const navigate = useNavigate();
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[400px] bg-[#fdf6f0] z-50 shadow-2xl
        flex flex-col transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#e8d5c4]">
          <div className="flex items-center gap-2">
            <ShoppingBag
              size={18}
              strokeWidth={1.5}
              className="text-[#8b5e52]"
            />
            <span className="font-[Cormorant_Garamond] text-xl text-[#5c3d35]">
              Your Basket
            </span>
            {totalItems > 0 && (
              <span
                className="bg-[#c4957a] text-white text-[10px] w-5 h-5 rounded-full
                flex items-center justify-center"
              >
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-[#8b5e52] hover:text-[#c4957a] transition-colors"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Empty State */}
        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center px-8">
            <ShoppingBag size={40} strokeWidth={1} className="text-[#e8d5c4]" />
            <p className="font-[Cormorant_Garamond] text-2xl text-[#8b5e52]">
              Your basket is empty
            </p>
            <p className="text-[12px] font-light text-[#b09088] tracking-wide">
              Add some beautiful flowers to get started 🌸
            </p>
            <button
              onClick={onClose}
              className="mt-4 text-xs tracking-widest uppercase text-white bg-[#c4957a]
                hover:bg-[#b0806a] px-6 py-2.5 rounded-sm transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 bg-white border border-[#e8d5c4] rounded-md p-3"
                >
                  {/* Color swatch instead of image */}
                  <div
                    className="w-[64px] h-[64px] rounded-sm shrink-0"
                    style={{ background: item.bg }}
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] tracking-[0.12em] uppercase text-[#b09088] mb-0.5">
                      {item.tag}
                    </p>
                    <p className="font-[Cormorant_Garamond] text-[17px] text-[#5c3d35] leading-tight truncate">
                      {item.name}
                    </p>
                    <p className="font-serif text-[15px] text-[#c4957a] mt-1">
                      ₹{item.price}
                    </p>
                  </div>

                  {/* Qty + Remove */}
                  <div className="flex flex-col items-end justify-between shrink-0">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#d4b5a8] hover:text-[#c4957a] transition-colors"
                    >
                      <Trash2 size={13} strokeWidth={1.5} />
                    </button>

                    <div
                      className="flex items-center gap-2 border border-[#e8d5c4]
                      rounded-sm px-2 py-1"
                    >
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="text-[#8b5e52] hover:text-[#c4957a] transition-colors"
                      >
                        <Minus size={11} strokeWidth={2} />
                      </button>
                      <span className="text-[13px] font-light text-[#5c3d35] w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="text-[#8b5e52] hover:text-[#c4957a] transition-colors"
                      >
                        <Plus size={11} strokeWidth={2} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-5 border-t border-[#e8d5c4] bg-white">
              {/* Free delivery nudge */}
              {totalPrice < 999 && (
                <p className="text-[11px] text-[#b09088] tracking-wide text-center mb-3">
                  Add{" "}
                  <span className="text-[#c4957a] font-medium">
                    ₹{999 - totalPrice}
                  </span>{" "}
                  more for free delivery 🚚
                </p>
              )}
              {totalPrice >= 999 && (
                <p className="text-[11px] text-[#8b5e52] tracking-wide text-center mb-3">
                  🎉 You've unlocked free delivery!
                </p>
              )}

              {/* Subtotal */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[13px] font-light text-[#7a5c52] tracking-wide">
                  Subtotal
                </span>
                <span className="font-[Cormorant_Garamond] text-xl text-[#5c3d35]">
                  ₹{totalPrice}
                </span>
              </div>

              {/* Checkout */}
              <button
                onClick={() => {
                  onClose();
                  navigate("/checkout");
                }}
                className="w-full text-xs tracking-widest uppercase text-white
    bg-[#c4957a] hover:bg-[#b0806a] py-3.5 rounded-sm transition-colors"
              >
                Proceed to Checkout
              </button>
              <button
                onClick={onClose}
                className="w-full text-[11px] tracking-widest uppercase text-[#c4957a]
                  hover:text-[#8b5e52] py-2.5 transition-colors bg-transparent border-none cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
