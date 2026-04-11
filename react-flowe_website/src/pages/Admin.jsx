import { useEffect, useState, useMemo } from "react";
import { supabase } from "../lib/supabase";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar
} from "recharts";

const TABS = ["Overview", "Orders", "Subscriptions", "Users"];

const statusColors = {
  paid: "bg-green-50 text-green-700 border-green-200",
  pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  failed: "bg-red-50 text-red-700 border-red-200",
  delivered: "bg-blue-50 text-blue-700 border-blue-200",
  cancelled: "bg-gray-50 text-gray-700 border-gray-200",
};

// ─── PIN Gate ─────────────────────────────────────────────────────────
function PinGate({ onUnlocked }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const ADMIN_PIN = import.meta.env.VITE_ADMIN_PIN;

  const handleUnlock = () => {
    if (pin === ADMIN_PIN) {
      sessionStorage.setItem("admin_verified", "true");
      onUnlocked();
    } else {
      setError(true);
      setShake(true);
      setPin("");
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf6f0] font-[Jost] flex items-center justify-center px-4">
      <div className={`bg-white border border-[#e8d5c4] rounded-md p-8 md:p-10
        w-full max-w-sm text-center ${shake ? "animate-bounce" : ""}`}>

        <div className="font-[Cormorant_Garamond] text-3xl text-[#5c3d35] mb-2">
          ✿ Admin Access
        </div>
        <p className="text-[12px] text-[#b09088] font-light tracking-wide mb-8">
          Enter your PIN to continue
        </p>

        {/* PIN dots */}
        <div className="flex items-center justify-center gap-3 mb-6">
          {[...Array(6)].map((_, i) => (
            <div key={i}
              className={`w-3 h-3 rounded-full border transition-all duration-200
                ${i < pin.length
                  ? "bg-[#c4957a] border-[#c4957a]"
                  : "bg-transparent border-[#e8d5c4]"}`}
            />
          ))}
        </div>

        <input
          type="password"
          inputMode="numeric"
          maxLength={6}
          value={pin}
          onChange={e => { setPin(e.target.value.replace(/\D/g, "")); setError(false); }}
          onKeyDown={e => e.key === "Enter" && handleUnlock()}
          placeholder="······"
          className="w-full border border-[#e8d5c4] focus:border-[#c4957a] bg-white
            px-4 py-3 rounded-sm text-center text-[#5c3d35] outline-none
            tracking-[0.4em] text-xl mb-3 transition-colors
            placeholder:text-[#e8d5c4] placeholder:tracking-widest"
        />

        {error && (
          <p className="text-[11px] text-red-400 mb-3 tracking-wide">
            Incorrect PIN. Try again.
          </p>
        )}

        <button
          onClick={handleUnlock}
          className="w-full text-xs tracking-widest uppercase text-white
            bg-[#c4957a] hover:bg-[#b0806a] py-3 rounded-sm transition-colors mt-1">
          Unlock Dashboard
        </button>
      </div>
    </div>
  );
}

// ─── CSV Export ───────────────────────────────────────────────────────
function exportToCSV(orders) {
  const headers = ["Payment ID", "Customer Name", "Email", "Phone", "Address", "Items", "Total", "Status", "Date"];
  const rows = orders.map(o => [
    o.payment_id,
    o.customer_name,
    o.customer_email,
    o.customer_phone,
    `"${o.address}"`,
    `"${(o.items ?? []).map(i => `${i.name} x${i.quantity}`).join(", ")}"`,
    o.total,
    o.status,
    new Date(o.created_at).toLocaleDateString("en-IN"),
  ]);
  const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `petal-orders-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Send Email Modal ─────────────────────────────────────────────────
function SendEmailModal({ order, onClose }) {
  const [subject, setSubject] = useState(`Your Petal & Co. Order — ${order.payment_id}`);
  const [message, setMessage] = useState(
    `Hi ${order.customer_name},\n\nThank you for your order of ₹${order.total}.\n\nYour flowers are being prepared with love and will be delivered soon!\n\nWith love,\nPetal & Co. 🌸`
  );
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    const mailtoLink = `mailto:${order.customer_email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.open(mailtoLink);
    setSent(true);
    setTimeout(onClose, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white border border-[#e8d5c4] rounded-md p-6 w-full max-w-lg">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-[Cormorant_Garamond] text-[22px] text-[#5c3d35]">
            Email to {order.customer_name}
          </h3>
          <button onClick={onClose} className="text-[#b09088] hover:text-[#5c3d35] text-xl">✕</button>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[11px] tracking-[0.14em] uppercase text-[#8b5e52]">To</label>
            <input value={order.customer_email} readOnly
              className="border border-[#e8d5c4] bg-[#fdf6f0] px-4 py-2.5
                rounded-sm text-sm text-[#b09088] outline-none" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] tracking-[0.14em] uppercase text-[#8b5e52]">Subject</label>
            <input value={subject} onChange={e => setSubject(e.target.value)}
              className="border border-[#e8d5c4] focus:border-[#c4957a] bg-white px-4 py-2.5
                rounded-sm text-sm text-[#5c3d35] outline-none transition-colors" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] tracking-[0.14em] uppercase text-[#8b5e52]">Message</label>
            <textarea value={message} onChange={e => setMessage(e.target.value)} rows={6}
              className="border border-[#e8d5c4] focus:border-[#c4957a] bg-white px-4 py-2.5
                rounded-sm text-sm text-[#5c3d35] outline-none transition-colors resize-none" />
          </div>

          {/* Quick templates */}
          <div className="flex flex-wrap gap-2">
            <p className="text-[11px] text-[#b09088] w-full">Quick templates:</p>
            {[
              { label: "Order Confirmed", msg: `Hi ${order.customer_name},\n\nYour order of ₹${order.total} has been confirmed! We're preparing your flowers with love.\n\nExpected delivery: Today.\n\nWith love,\nPetal & Co. 🌸` },
              { label: "Out for Delivery", msg: `Hi ${order.customer_name},\n\nGreat news! Your flowers are out for delivery and will arrive shortly.\n\nOrder total: ₹${order.total}\n\nWith love,\nPetal & Co. 🌸` },
              { label: "Delivered", msg: `Hi ${order.customer_name},\n\nYour flowers have been delivered! We hope they bring you joy.\n\nThank you for choosing Petal & Co.\n\nWith love 🌸` },
            ].map(t => (
              <button key={t.label} onClick={() => setMessage(t.msg)}
                className="text-[11px] bg-[#f0e0d6] text-[#8b5e52] px-2.5 py-1
                  rounded-sm hover:bg-[#e8d5c4] transition-colors">
                {t.label}
              </button>
            ))}
          </div>

          <div className="flex gap-3 mt-2">
            <button onClick={onClose}
              className="flex-1 text-xs tracking-widest uppercase text-[#8b5e52]
                border border-[#e8d5c4] py-3 rounded-sm hover:bg-[#f0e0d6] transition-colors">
              Cancel
            </button>
            <button onClick={handleSend}
              className={`flex-1 text-xs tracking-widest uppercase text-white
                py-3 rounded-sm transition-colors
                ${sent ? "bg-green-500" : "bg-[#c4957a] hover:bg-[#b0806a]"}`}>
              {sent ? "✓ Opening Mail..." : "Send Email"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Admin Dashboard ─────────────────────────────────────────────
export default function Admin() {
  const [unlocked, setUnlocked] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");
  const [orders, setOrders] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [emailModal, setEmailModal] = useState(null);

  useEffect(() => {
    if (sessionStorage.getItem("admin_verified") === "true") {
      setUnlocked(true);
      fetchAll();
    }
  }, []);

  const handleUnlocked = () => {
    setUnlocked(true);
    fetchAll();
  };

  const handleSignOut = () => {
    sessionStorage.removeItem("admin_verified");
    setUnlocked(false);
  };

  const fetchAll = async () => {
    setLoading(true);
    const [{ data: o }, { data: s }] = await Promise.all([
      supabase.from("orders").select("*").order("created_at", { ascending: false }),
      supabase.from("subscription_inquiries").select("*").order("created_at", { ascending: false }),
    ]);
    setOrders(o ?? []);
    setSubscriptions(s ?? []);
    const uniqueUsers = [...new Map(
      (o ?? []).map(order => [order.customer_email, {
        name: order.customer_name,
        email: order.customer_email,
        phone: order.customer_phone,
        totalOrders: (o ?? []).filter(x => x.customer_email === order.customer_email).length,
        totalSpent: (o ?? []).filter(x => x.customer_email === order.customer_email)
          .reduce((sum, x) => sum + x.total, 0),
        lastOrder: order.created_at,
      }])
    ).values()];
    setUsers(uniqueUsers);
    setLoading(false);
  };

  const updateOrderStatus = async (id, status) => {
    await supabase.from("orders").update({ status }).eq("id", id);
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const revenueData = useMemo(() => {
    const map = {};
    orders.forEach(o => {
      const date = new Date(o.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
      map[date] = (map[date] ?? 0) + (o.total ?? 0);
    });
    return Object.entries(map).slice(-14).map(([date, revenue]) => ({ date, revenue }));
  }, [orders]);

  const topProducts = useMemo(() => {
    const map = {};
    orders.forEach(o => {
      (o.items ?? []).forEach(item => {
        if (!map[item.name]) map[item.name] = { name: item.name, quantity: 0, revenue: 0 };
        map[item.name].quantity += item.quantity ?? 1;
        map[item.name].revenue += (item.price ?? 0) * (item.quantity ?? 1);
      });
    });
    return Object.values(map).sort((a, b) => b.quantity - a.quantity).slice(0, 6);
  }, [orders]);

  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q ||
        o.customer_name?.toLowerCase().includes(q) ||
        o.customer_email?.toLowerCase().includes(q) ||
        o.payment_id?.toLowerCase().includes(q) ||
        o.address?.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "all" || o.status === statusFilter;
      const orderDate = new Date(o.created_at);
      const matchesFrom = !dateFrom || orderDate >= new Date(dateFrom);
      const matchesTo = !dateTo || orderDate <= new Date(dateTo + "T23:59:59");
      return matchesSearch && matchesStatus && matchesFrom && matchesTo;
    });
  }, [orders, searchQuery, statusFilter, dateFrom, dateTo]);

  if (!unlocked) return <PinGate onUnlocked={handleUnlocked} />;

  const totalRevenue = orders.reduce((s, o) => s + (o.total ?? 0), 0);
  const paidOrders = orders.filter(o => o.status === "paid").length;
  const pendingSubscriptions = subscriptions.filter(s => s.status === "pending").length;

  return (
    <div className="min-h-screen bg-[#fdf6f0] font-[Jost]">

      {emailModal && <SendEmailModal order={emailModal} onClose={() => setEmailModal(null)} />}

      {/* Header */}
      <div className="bg-[#3d2820] px-5 md:px-8 py-5 flex items-center justify-between">
        <div>
          <h1 className="font-[Cormorant_Garamond] text-[24px] md:text-[28px] text-[#f5e6de]">
            ✿ Admin Dashboard
          </h1>
          <p className="text-[11px] text-[#a08878] font-light mt-0.5 hidden md:block">
            Petal &amp; Co. — Admin Panel
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={fetchAll}
            className="text-xs tracking-widest uppercase text-[#c4957a] border border-[#c4957a]
              px-3 md:px-4 py-2 rounded-sm hover:bg-[#c4957a] hover:text-white transition-colors">
            Refresh
          </button>
          <button onClick={handleSignOut}
            className="text-xs tracking-widest uppercase text-[#a08878] border border-[#5c3d35]
              px-3 md:px-4 py-2 rounded-sm hover:border-[#a08878] transition-colors">
            Lock
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-[#e8d5c4] px-5 md:px-8 overflow-x-auto">
        <div className="flex gap-0 min-w-max">
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`text-xs tracking-widest uppercase px-5 md:px-6 py-4
                border-b-2 transition-all whitespace-nowrap
                ${activeTab === tab
                  ? "border-[#c4957a] text-[#c4957a]"
                  : "border-transparent text-[#a08878] hover:text-[#5c3d35]"}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-6 md:py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <p className="font-[Cormorant_Garamond] text-2xl text-[#c4957a]">Loading... 🌸</p>
          </div>
        ) : (
          <>
            {/* ── Overview ── */}
            {activeTab === "Overview" && (
              <div>
                {/* Stat Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
                  {[
                    { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}`, color: "#c4957a" },
                    { label: "Total Orders", value: orders.length, color: "#5c3d35" },
                    { label: "Paid Orders", value: paidOrders, color: "#8fb87a" },
                    { label: "Pending Subs", value: pendingSubscriptions, color: "#d07070" },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="bg-white border border-[#e8d5c4] rounded-md p-4 md:p-6">
                      <p className="text-[10px] md:text-[11px] tracking-widest uppercase
                        text-[#b09088] mb-2">{label}</p>
                      <p className="font-[Cormorant_Garamond] text-[26px] md:text-[36px]
                        font-medium leading-none" style={{ color }}>{value}</p>
                    </div>
                  ))}
                </div>

                {/* Revenue Chart */}
                <div className="bg-white border border-[#e8d5c4] rounded-md p-5 md:p-6 mb-6">
                  <h3 className="font-[Cormorant_Garamond] text-[20px] text-[#5c3d35] mb-5">
                    Revenue — Last 14 Days
                  </h3>
                  {revenueData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={220}>
                      <LineChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0e0d6" />
                        <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#b09088" }} />
                        <YAxis tick={{ fontSize: 11, fill: "#b09088" }}
                          tickFormatter={v => `₹${v.toLocaleString()}`} />
                        <Tooltip
                          formatter={v => [`₹${v.toLocaleString()}`, "Revenue"]}
                          contentStyle={{ fontFamily: "Jost", fontSize: 12,
                            border: "0.5px solid #e8d5c4", borderRadius: 4 }} />
                        <Line type="monotone" dataKey="revenue" stroke="#c4957a"
                          strokeWidth={2} dot={{ fill: "#c4957a", r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <p className="text-[13px] text-[#b09088] text-center py-10">
                      No revenue data yet.
                    </p>
                  )}
                </div>

                {/* Top Products */}
                <div className="bg-white border border-[#e8d5c4] rounded-md p-5 md:p-6 mb-6">
                  <h3 className="font-[Cormorant_Garamond] text-[20px] text-[#5c3d35] mb-5">
                    Top Selling Products
                  </h3>
                  {topProducts.length > 0 ? (
                    <>
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={topProducts}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0e0d6" />
                          <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#b09088" }} />
                          <YAxis tick={{ fontSize: 11, fill: "#b09088" }} />
                          <Tooltip contentStyle={{ fontFamily: "Jost", fontSize: 12,
                            border: "0.5px solid #e8d5c4", borderRadius: 4 }} />
                          <Bar dataKey="quantity" fill="#c4957a" radius={[3, 3, 0, 0]} name="Units Sold" />
                        </BarChart>
                      </ResponsiveContainer>
                      <div className="mt-4 flex flex-col gap-2">
                        {topProducts.map((p, i) => (
                          <div key={p.name}
                            className="flex items-center justify-between text-[13px]
                              border-b border-[#f0e0d6] pb-2 last:border-0">
                            <div className="flex items-center gap-2">
                              <span className="font-[Cormorant_Garamond] text-[16px] text-[#c4957a]">
                                #{i + 1}
                              </span>
                              <span className="text-[#5c3d35]">{p.name}</span>
                            </div>
                            <div className="flex items-center gap-4 text-[12px]">
                              <span className="text-[#b09088]">{p.quantity} sold</span>
                              <span className="text-[#c4957a] font-medium">
                                ₹{p.revenue.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <p className="text-[13px] text-[#b09088] text-center py-10">
                      No product data yet.
                    </p>
                  )}
                </div>

                {/* Recent Orders */}
                <h3 className="font-[Cormorant_Garamond] text-[22px] text-[#5c3d35] mb-4">
                  Recent Orders
                </h3>
                <div className="bg-white border border-[#e8d5c4] rounded-md overflow-x-auto">
                  <table className="w-full min-w-[500px]">
                    <thead className="bg-[#f0e0d6]">
                      <tr>
                        {["Customer", "Amount", "Status", "Date"].map(h => (
                          <th key={h} className="text-left text-[11px] tracking-widest uppercase
                            text-[#8b5e52] px-4 md:px-5 py-3 font-medium">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 5).map((order, i) => (
                        <tr key={order.id}
                          className={`border-t border-[#e8d5c4]
                            ${i % 2 === 0 ? "bg-white" : "bg-[#fdf6f0]"}`}>
                          <td className="px-4 md:px-5 py-3">
                            <p className="text-[13px] text-[#5c3d35]">{order.customer_name}</p>
                            <p className="text-[11px] text-[#b09088]">{order.customer_email}</p>
                          </td>
                          <td className="px-4 md:px-5 py-3 text-[13px] text-[#5c3d35]">
                            ₹{order.total}
                          </td>
                          <td className="px-4 md:px-5 py-3">
                            <span className={`text-[10px] tracking-widest uppercase px-2.5 py-1
                              rounded-sm border font-medium
                              ${statusColors[order.status] ?? statusColors.pending}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-4 md:px-5 py-3 text-[12px] text-[#b09088]">
                            {new Date(order.created_at).toLocaleDateString("en-IN")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── Orders ── */}
            {activeTab === "Orders" && (
              <div>
                {/* Search + Filter + Export */}
                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Search by name, email, payment ID, address..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full border border-[#e8d5c4] focus:border-[#c4957a] bg-white
                        px-4 py-2.5 rounded-sm text-sm text-[#5c3d35] outline-none
                        transition-colors placeholder:text-[#d4b8a8]"
                    />
                  </div>
                  <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                    className="font-[Jost] text-xs text-[#5c3d35] bg-white border border-[#e8d5c4]
                      px-3 py-2.5 rounded-sm outline-none cursor-pointer">
                    <option value="all">All Statuses</option>
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="delivered">Delivered</option>
                    <option value="failed">Failed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)}
                    className="font-[Jost] text-xs text-[#5c3d35] bg-white border border-[#e8d5c4]
                      px-3 py-2.5 rounded-sm outline-none cursor-pointer" />
                  <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)}
                    className="font-[Jost] text-xs text-[#5c3d35] bg-white border border-[#e8d5c4]
                      px-3 py-2.5 rounded-sm outline-none cursor-pointer" />
                  <button onClick={() => exportToCSV(filteredOrders)}
                    className="text-xs tracking-widest uppercase text-white bg-[#5c3d35]
                      hover:bg-[#3d2820] px-4 py-2.5 rounded-sm transition-colors whitespace-nowrap">
                    ↓ Export CSV
                  </button>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-[Cormorant_Garamond] text-[26px] text-[#5c3d35]">
                    Orders ({filteredOrders.length})
                  </h3>
                  {(searchQuery || statusFilter !== "all" || dateFrom || dateTo) && (
                    <button onClick={() => {
                      setSearchQuery(""); setStatusFilter("all");
                      setDateFrom(""); setDateTo("");
                    }} className="text-[11px] tracking-widest uppercase text-[#c4957a]
                      hover:text-[#8b5e52] transition-colors">
                      Clear Filters
                    </button>
                  )}
                </div>

                <div className="flex flex-col gap-4">
                  {filteredOrders.length === 0 ? (
                    <div className="bg-white border border-[#e8d5c4] rounded-md p-12 text-center">
                      <p className="font-[Cormorant_Garamond] text-2xl text-[#c4957a] mb-2">
                        No orders found 🌸
                      </p>
                      <p className="text-[13px] text-[#b09088]">
                        Try adjusting your search or filters.
                      </p>
                    </div>
                  ) : filteredOrders.map(order => (
                    <div key={order.id}
                      className="bg-white border border-[#e8d5c4] rounded-md p-4 md:p-5">
                      <div className="flex items-start justify-between flex-wrap gap-4">
                        <div>
                          <p className="text-[11px] tracking-widest uppercase text-[#c4957a] mb-1">
                            {order.payment_id}
                          </p>
                          <p className="font-[Cormorant_Garamond] text-[20px] text-[#5c3d35]">
                            {order.customer_name}
                          </p>
                          <p className="text-[12px] text-[#b09088] font-light">
                            {order.customer_email} · {order.customer_phone}
                          </p>
                          <p className="text-[12px] text-[#8b6e66] mt-1 font-light">
                            📍 {order.address}
                          </p>
                        </div>
                        <div className="text-right flex flex-col items-end gap-2">
                          <p className="font-[Cormorant_Garamond] text-[26px] text-[#5c3d35]">
                            ₹{order.total}
                          </p>
                          <p className="text-[11px] text-[#b09088]">
                            {new Date(order.created_at).toLocaleDateString("en-IN")}
                          </p>
                          <select value={order.status}
                            onChange={e => updateOrderStatus(order.id, e.target.value)}
                            className={`text-[11px] tracking-widest uppercase px-3 py-1.5
                              rounded-sm border outline-none cursor-pointer font-medium
                              ${statusColors[order.status] ?? statusColors.pending}`}>
                            <option value="paid">Paid</option>
                            <option value="pending">Pending</option>
                            <option value="failed">Failed</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          <button onClick={() => setEmailModal(order)}
                            className="text-[11px] tracking-widest uppercase text-[#c4957a]
                              border border-[#c4957a] px-3 py-1.5 rounded-sm
                              hover:bg-[#c4957a] hover:text-white transition-colors">
                            ✉ Email Customer
                          </button>
                        </div>
                      </div>
                      {order.items && (
                        <div className="mt-4 pt-4 border-t border-[#e8d5c4] flex flex-wrap gap-2">
                          {order.items.map((item, i) => (
                            <span key={i} className="text-[11px] bg-[#f0e0d6] text-[#8b5e52]
                              px-2.5 py-1 rounded-sm">
                              {item.name} x{item.quantity}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Subscriptions ── */}
            {activeTab === "Subscriptions" && (
              <div>
                <h3 className="font-[Cormorant_Garamond] text-[26px] text-[#5c3d35] mb-6">
                  Subscription Inquiries ({subscriptions.length})
                </h3>
                <div className="bg-white border border-[#e8d5c4] rounded-md overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead className="bg-[#f0e0d6]">
                      <tr>
                        {["Name", "Contact", "Plan", "Billing", "Price", "Date"].map(h => (
                          <th key={h} className="text-left text-[11px] tracking-widest uppercase
                            text-[#8b5e52] px-4 md:px-5 py-3 font-medium">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {subscriptions.map((sub, i) => (
                        <tr key={sub.id}
                          className={`border-t border-[#e8d5c4]
                            ${i % 2 === 0 ? "bg-white" : "bg-[#fdf6f0]"}`}>
                          <td className="px-4 md:px-5 py-3 text-[13px] text-[#5c3d35]">
                            {sub.name}
                          </td>
                          <td className="px-4 md:px-5 py-3">
                            <p className="text-[12px] text-[#5c3d35]">{sub.email}</p>
                            <p className="text-[11px] text-[#b09088]">{sub.phone}</p>
                          </td>
                          <td className="px-4 md:px-5 py-3">
                            <span className="text-[11px] bg-[#f0e0d6] text-[#8b5e52]
                              px-2.5 py-1 rounded-sm">{sub.plan_name}</span>
                          </td>
                          <td className="px-4 md:px-5 py-3 text-[12px] text-[#5c3d35] capitalize">
                            {sub.billing}
                          </td>
                          <td className="px-4 md:px-5 py-3 text-[13px] text-[#5c3d35]">
                            ₹{sub.price}/mo
                          </td>
                          <td className="px-4 md:px-5 py-3 text-[12px] text-[#b09088]">
                            {new Date(sub.created_at).toLocaleDateString("en-IN")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── Users ── */}
            {activeTab === "Users" && (
              <div>
                <h3 className="font-[Cormorant_Garamond] text-[26px] text-[#5c3d35] mb-6">
                  Customers ({users.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {users.map(u => (
                    <div key={u.email}
                      className="bg-white border border-[#e8d5c4] rounded-md p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[#f0e0d6] border border-[#c4957a]
                          flex items-center justify-center shrink-0">
                          <span className="font-[Cormorant_Garamond] text-[16px] text-[#8b5e52]">
                            {u.name?.[0] ?? "?"}
                          </span>
                        </div>
                        <div>
                          <p className="text-[14px] text-[#5c3d35] font-medium">{u.name}</p>
                          <p className="text-[11px] text-[#b09088]">{u.email}</p>
                        </div>
                      </div>
                      <div className="border-t border-[#e8d5c4] pt-3 flex justify-between">
                        <div className="text-center">
                          <p className="font-[Cormorant_Garamond] text-[22px] text-[#5c3d35]">
                            {u.totalOrders}
                          </p>
                          <p className="text-[10px] tracking-widest uppercase text-[#b09088]">
                            Orders
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="font-[Cormorant_Garamond] text-[22px] text-[#c4957a]">
                            ₹{u.totalSpent.toLocaleString()}
                          </p>
                          <p className="text-[10px] tracking-widest uppercase text-[#b09088]">
                            Spent
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-[12px] text-[#5c3d35]">
                            {new Date(u.lastOrder).toLocaleDateString("en-IN")}
                          </p>
                          <p className="text-[10px] tracking-widest uppercase text-[#b09088]">
                            Last Order
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}