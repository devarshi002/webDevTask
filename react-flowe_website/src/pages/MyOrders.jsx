import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../auth/AuthContext";
import { Package, ChevronDown, ChevronUp } from "lucide-react";

export default function MyOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("customer_email", user.email)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching orders:", error);
      } else {
        setOrders(data);
      }
      setLoading(false);
    };

    fetchOrders();
  }, [user]);

  const toggleExpand = (id) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fdf6f0] flex items-center justify-center">
        <p className="text-[#b09088] font-[Jost] text-sm tracking-wide animate-pulse">
          Loading your orders...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdf6f0] font-[Jost]">
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-10 md:py-16">
        {/* Header */}
        <div className="mb-10">
          <p
            className="text-[11px] tracking-[0.22em] uppercase text-[#c4957a] mb-2
            flex items-center gap-3"
          >
            <span className="w-8 h-px bg-[#c4957a] inline-block" />
            Your Account
          </p>
          <h1 className="font-[Cormorant_Garamond] text-3xl md:text-4xl text-[#5c3d35]">
            My Orders
          </h1>
          <p className="text-sm font-light text-[#a08878] mt-2">
            {orders.length} order{orders.length !== 1 ? "s" : ""} placed
          </p>
        </div>

        {/* Empty state */}
        {orders.length === 0 ? (
          <div className="text-center py-20 flex flex-col items-center gap-4">
            <Package size={48} strokeWidth={1} className="text-[#e8d5c4]" />
            <p className="font-[Cormorant_Garamond] text-2xl text-[#8b5e52]">
              No orders yet
            </p>
            <p className="text-sm font-light text-[#b09088]">
              Your flower orders will appear here 🌸
            </p>
            <Link
              to="/shop"
              className="mt-4 text-xs tracking-widest uppercase text-white
                bg-[#c4957a] hover:bg-[#b0806a] px-8 py-3 rounded-sm transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-[#e8d5c4] rounded-md overflow-hidden"
              >
                {/* Order Header */}
                <div
                  className="flex items-center justify-between px-5 py-4 cursor-pointer
                    hover:bg-[#fdf6f0] transition-colors"
                  onClick={() => toggleExpand(order.id)}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-full bg-[#f0e0d6] flex items-center
                      justify-center shrink-0"
                    >
                      <Package
                        size={16}
                        strokeWidth={1.5}
                        className="text-[#c4957a]"
                      />
                    </div>
                    <div>
                      <p className="text-[13px] font-medium text-[#5c3d35]">
                        Order #{order.payment_id?.slice(-8).toUpperCase()}
                      </p>
                      <p className="text-[11px] text-[#b09088] mt-0.5">
                        {formatDate(order.created_at)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Status badge */}
                    <span
                      className={`text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-sm
                      ${
                        order.status === "paid"
                          ? "bg-green-50 text-green-600 border border-green-200"
                          : "bg-rose-50 text-rose-600 border border-rose-200"
                      }`}
                    >
                      {order.status}
                    </span>

                    {/* Total */}
                    <span className="font-[Cormorant_Garamond] text-lg text-[#5c3d35]">
                      ₹{order.total}
                    </span>

                    {/* Expand toggle */}
                    {expanded === order.id ? (
                      <ChevronUp
                        size={16}
                        strokeWidth={1.5}
                        className="text-[#b09088]"
                      />
                    ) : (
                      <ChevronDown
                        size={16}
                        strokeWidth={1.5}
                        className="text-[#b09088]"
                      />
                    )}
                  </div>
                </div>

                {/* Order Details — expanded */}
                {expanded === order.id && (
                  <div className="border-t border-[#e8d5c4] px-5 py-4 bg-[#fdf6f0]">
                    {/* Items */}
                    <p className="text-[11px] tracking-[0.14em] uppercase text-[#8b5e52] mb-3">
                      Items
                    </p>
                    <div className="flex flex-col gap-3 mb-5">
                      {Array.isArray(order.items) &&
                        order.items.map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center gap-3">
                              {/* <div className="w-8 h-8 rounded-sm shrink-0"
                              style={{ background: item.bg }} /> */}

                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-8 h-8 rounded-sm shrink-0 object-cover"
                              />
                              <div>
                                <p className="text-[13px] text-[#5c3d35]">
                                  {item.name}
                                </p>
                                <p className="text-[11px] text-[#b09088]">
                                  Qty: {item.quantity}
                                </p>
                              </div>
                            </div>
                            <span className="text-[13px] text-[#5c3d35]">
                              ₹{item.price * item.quantity}
                            </span>
                          </div>
                        ))}
                    </div>

                    {/* Delivery info */}
                    <div className="flex flex-col gap-2 pt-4 border-t border-[#e8d5c4]">
                      <div className="flex justify-between text-[12px]">
                        <span className="text-[#b09088]">Delivery Address</span>
                        <span className="text-[#5c3d35] text-right max-w-[60%]">
                          {order.address}
                        </span>
                      </div>
                      <div className="flex justify-between text-[12px]">
                        <span className="text-[#b09088]">Payment ID</span>
                        <span className="text-[#c4957a] font-mono text-[11px]">
                          {order.payment_id}
                        </span>
                      </div>
                      <div className="flex justify-between text-[12px]">
                        <span className="text-[#b09088]">Phone</span>
                        <span className="text-[#5c3d35]">
                          {order.customer_phone}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
