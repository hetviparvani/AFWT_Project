import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

function Orders() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders/my", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setOrders(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);

  const statusColor = {
    Delivered: "bg-teal-100/80 text-teal-800",
    Processing: "bg-amber-100/80 text-amber-800",
    Pending: "bg-sky-100/80 text-sky-800",
    Cancelled: "bg-rose-100/80 text-rose-800",
  };

  const totalSpent = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  return (
    <div>
      <h2 className="text-xl font-medium text-stone-700 mb-0.5">My Orders</h2>
      <p className="text-stone-400 text-xs mb-6">Product orders history</p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-rose-50/60 border border-rose-100 rounded-2xl p-4 shadow-xs">
          <p className="text-[11px] text-stone-400 mb-1">Total Orders</p>
          <p className="text-xl font-semibold text-rose-700">{orders.length}</p>
        </div>
        <div className="bg-teal-50/60 border border-teal-100 rounded-2xl p-4 shadow-xs">
          <p className="text-[11px] text-stone-400 mb-1">Total Spent</p>
          <p className="text-xl font-semibold text-teal-700">₹{totalSpent.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white/80 border border-stone-100 rounded-2xl shadow-xs overflow-hidden">
        <table className="w-full text-xs">
          <thead className="bg-stone-50 text-stone-500 border-b border-stone-100">
            <tr>
              <th className="text-left p-3.5 font-medium">Order ID</th>
              <th className="text-left p-3.5 font-medium">Items</th>
              <th className="text-left p-3.5 font-medium">Total</th>
              <th className="text-left p-3.5 font-medium">Date</th>
              <th className="text-left p-3.5 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-stone-400">
                  Loading orders...
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-stone-400">
                  No orders placed yet.
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr
                  key={o._id}
                  className="border-b border-stone-100/60 last:border-0 hover:bg-rose-50/30"
                >
                  <td className="p-3.5 font-medium text-stone-700">#{o._id.slice(-6)}</td>
                  <td className="p-3.5 text-stone-500">
                    {o.items?.map((item) => `${item.product?.name || "Product"} (x${item.quantity})`).join(", ") ||
                      "Items"}
                  </td>
                  <td className="p-3.5 font-semibold text-teal-800">₹{o.totalAmount}</td>
                  <td className="p-3.5 text-stone-500">
                    {o.createdAt ? new Date(o.createdAt).toLocaleDateString() : "—"}
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`text-[10px] px-2.5 py-0.5 rounded-full font-medium ${
                        statusColor[o.status] || "bg-stone-100 text-stone-600"
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;